<template>
  <div
    v-if="loading"
    class="loading-screen"
  >
    <h2>{{ $t("common.loading") }}</h2>
  </div>

  <LoginModal
    v-else-if="!session.firebaseUser"
    :is-visible="true"
    @login-success="onLoginSuccess"
  />

  <NoSchoolPage
    v-else-if="
      session.initialized &&
      !isSystemAdmin &&
      session.schools.length === 0
    "
    :user="session.firebaseUser"
    :profile="session.profile"
    @sign-out="handleSignOut"
  />

  <div
    v-else
    class="layout"
  >
    <NavigationMenu
      :current-page="navigationPage"
      :user="session.firebaseUser"
      :profile="session.profile"
      :schools="session.schools"
      :active-school="session.activeSchool" 
      :is-system-admin="isSystemAdmin" 
      @change-page="changePage"
      @change-school="handleSchoolChange"
      @open-profile="openProfile"
      @sign-out="handleSignOut"
    />

    <main>
      <DashboardPage
        v-if="currentPage === 'dashboard'"
        :school-id="session.activeSchool"
      />

      <StudentManager
        v-if="currentPage === 'students'"
        :school-id="session.activeSchool"
        :actor-role="
          isSystemAdmin
            ? 'system-admin'
            : session.membership?.role || ''
        "
      />

      <CourseManager
        v-if="currentPage === 'courses'"
        :school-id="session.activeSchool"
      />

      <BuildingManager
        v-if="currentPage === 'buildings'"
        :school-id="session.activeSchool"
      />

      <RoomManager
        v-if="currentPage === 'rooms'"
        :school-id="session.activeSchool"
      />

      <ClassManager
        v-if="currentPage === 'classes'"
        :school-id="session.activeSchool"
        @manage-class="openClassWorkspace"
      />

      <ClassWorkspace
        v-if="currentPage === 'class-workspace'"
        :school-id="session.activeSchool"
        :class-id="selectedClassId"
        @back="closeClassWorkspace"
      />

      <SettingsPage
        v-if="currentPage === 'settings'"
      />

      <ProfilePage
        v-if="currentPage === 'profile'"
        :user="session.firebaseUser"
        :profile="session.profile"
        @profile-updated="handleProfileUpdated"
      />

      <AdminPage
        v-if="
          currentPage === 'admin' &&
          isSystemAdmin
        "
        :school-id="session.activeSchool"
      />
    </main>
  </div>
</template>

<script>
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  auth,
} from "./firebase-init";

import {
  getCurrentUserProfile,
  updateActiveSchool,
} from "./services/userService";
import {
  getUserSchools,
  watchSchools,
} from "./services/schoolService";
import {
  getSchoolMembership,
  getUserSchoolMemberships,
} from "./services/membershipService";

import NavigationMenu from "./components/NavigationMenu.vue";
import LoginModal from "./components/LoginModal.vue";

import NoSchoolPage from "./pages/NoSchoolPage.vue";
import DashboardPage from "./pages/DashboardPage.vue";
import StudentManager from "./pages/StudentManager.vue";
import CourseManager from "./pages/CourseManager.vue";
import BuildingManager from "./pages/BuildingManager.vue";
import RoomManager from "./pages/RoomManager.vue";
import ClassManager from "./pages/ClassManager.vue";
import ClassWorkspace from "./pages/ClassWorkspace.vue";
import SettingsPage from "./pages/SettingsPage.vue";
import ProfilePage from "./pages/ProfilePage.vue";
import AdminPage from "./pages/AdminPage.vue";

export default {
  name: "App",

  components: {
    NavigationMenu,
    LoginModal,
    NoSchoolPage,
    DashboardPage,
    StudentManager,
    CourseManager,
    BuildingManager,
    RoomManager,
    ClassManager,
    ClassWorkspace,
    SettingsPage,
    ProfilePage,
    AdminPage,
  },

  data() {
    return {
      loading: true,
      currentPage: "dashboard",
      selectedClassId: "",
      schoolUnsubscribe: null,

      session: {
        firebaseUser: null,
        profile: null,
        schools: [],
        activeSchool: null,
        membership: null,
        initialized: false,
      },
    };
  },

  computed: {
    navigationPage() {
      if (this.currentPage === "class-workspace") {
        return "classes";
      }

      return this.currentPage;
    },

    isSystemAdmin() {
      const result =
        this.session.profile?.systemRole ===
        "system-admin";

      return result;
    },
  },

  beforeUnmount() {
    if (this.schoolUnsubscribe) {
      this.schoolUnsubscribe();
    }
  },
  mounted() {
    onAuthStateChanged(auth, async (user) => {
      this.loading = false;

      if (!user) {
        this.session.firebaseUser = null;
        return;
      }

      await this.initializeSession(user);
    });
  },

  methods: {
    async initializeSession(firebaseUser) {
      try {
        const profile =
          await getCurrentUserProfile(
            firebaseUser.uid,
          );

        const isSystemAdmin =
          profile?.systemRole ===
          "system-admin";

        let schools = [];
        let memberships = [];

        if (isSystemAdmin) {
          schools =
            await getUserSchools(
              profile?.schools || [],
            );
        } else {
          memberships =
            await getUserSchoolMemberships(
              firebaseUser.uid,
            );
            //TODO: remove
            console.log(
              "Firebase UID:",
              firebaseUser.uid,
            );

            console.log(
              "Memberships found:",
              memberships,
            );

          const schoolIds =
            memberships
              .map(
                (membership) =>
                  membership.schoolId,
              )
              .filter(Boolean);
              //TODO: remove
              console.log(
                "School IDs from memberships:",
                schoolIds,
              );

          
          schools =
            await getUserSchools(
              schoolIds,
            );
          console.log(
            "Schools loaded:",
            schools,
          );
        }

        let activeSchool =
          profile?.activeSchool || null;

        const activeSchoolExists =
          schools.some(
            (school) =>
              school.id === activeSchool,
          );

        if (!activeSchoolExists) {
          activeSchool =
            schools.length > 0
              ? schools[0].id
              : null;
        }

        let membership = null;

        if (
          activeSchool &&
          !isSystemAdmin
        ) {
          membership =
            memberships.find(
              (item) =>
                item.schoolId ===
                activeSchool,
            ) || null;
        }

        if (
          !membership &&
          !isSystemAdmin &&
          profile?.role
        ) {
          membership = {
            role: profile.role,
            active: true,
            legacyFallback: true,
          };
        }

        this.session.firebaseUser = firebaseUser;
        this.session.profile = profile;
        this.session.schools = schools;
        this.session.activeSchool = activeSchool;
        this.session.membership = membership;
        this.startSchoolListener();
        this.session.initialized = true;

      } catch (error) {
        console.error(
          "Unable to initialize session:",
          error,
        );

        this.session.firebaseUser =
          firebaseUser;

        this.session.profile = null;
        this.session.schools = [];
        this.session.activeSchool = null;
        this.session.membership = null;
        this.session.initialized = true;        
      }
    },

    async onLoginSuccess() {
    },

    changePage(page) {
      this.selectedClassId = "";
      this.currentPage = page;
    },

    openClassWorkspace(classId) {
      this.selectedClassId = classId;
      this.currentPage = "class-workspace";
    },

    closeClassWorkspace() {
      this.selectedClassId = "";
      this.currentPage = "classes";
    },

    async handleSchoolChange(schoolId) {
      if (
        !schoolId ||
        schoolId === this.session.activeSchool
      ) {
        return;
      }

      const schoolExists =
        this.session.schools.some(
          (school) =>
            school.id === schoolId,
        );

      if (!schoolExists) {
        return;
      }

      const previousSchool =
        this.session.activeSchool;

      const previousMembership =
        this.session.membership;

      try {
        const membership =
          await getSchoolMembership(
            schoolId,
            this.session.firebaseUser.uid,
          );

        if (
          !this.isSystemAdmin &&
          (
            !membership ||
            membership.active === false
          )
        ) {
          return;
        }

        await updateActiveSchool(
          this.session.firebaseUser.uid,
          schoolId,
        );

        this.session.activeSchool =
          schoolId;

        this.session.membership =
          this.isSystemAdmin
            ? null
            : membership;
        this.session.profile = {
          ...this.session.profile,
          activeSchool: schoolId,
        };

        this.selectedClassId = "";
        this.currentPage = "dashboard";
      } catch (error) {
        console.error(
          "Unable to change school:",
          error,
        );

        this.session.activeSchool =
          previousSchool;

        this.session.membership =
          previousMembership;
      }
    },

    openProfile() {
      this.selectedClassId = "";
      this.currentPage = "profile";
    },

    handleProfileUpdated(updatedProfile) {
      this.session.profile = {
        ...this.session.profile,
        ...updatedProfile,
      };
    },

    async handleSignOut() {
      try {

        if (this.schoolUnsubscribe) {
          this.schoolUnsubscribe();
          this.schoolUnsubscribe = null;
        }
        await signOut(auth);

        this.selectedClassId = "";
        this.currentPage = "dashboard";

        this.session = {
          firebaseUser: null,
          profile: null,
          schools: [],
          activeSchool: null,
          membership: null,
          initialized: false,
        };
      } catch (error) {
        console.error("Unable to sign out:", error);
      }
    },

    startSchoolListener() {
      if (this.schoolUnsubscribe) {
        this.schoolUnsubscribe();
        this.schoolUnsubscribe = null;
      }

      if (!this.isSystemAdmin) {
        return;
      }

      this.schoolUnsubscribe =
        watchSchools(
          (items) => {
            const activeSchools =
              items.filter(
                (school) =>
                  school.active !== false,
              );

            this.session.schools =
              activeSchools;

            const activeSchoolStillExists =
              activeSchools.some(
                (school) =>
                  school.id ===
                  this.session.activeSchool,
              );

            if (!activeSchoolStillExists) {
              this.session.activeSchool =
                activeSchools.length > 0
                  ? activeSchools[0].id
                  : null;
            }
          },

          (error) => {
            console.error(
              "Unable to watch schools:",
              error,
            );
          },
        );
    },
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.layout {
  display: flex;
}

main {
  flex: 1;
  min-width: 0;
}

.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>