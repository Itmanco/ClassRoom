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
      @change-page="changePage"
      @change-school="handleSchoolChange"
      @open-profile="openProfile"
      @sign-out="handleSignOut"
    />

    <main>
      <ClassroomPage
        v-if="currentPage === 'classroom'"
        :school-id="session.activeSchool"
      />

      <StudentManager
        v-if="currentPage === 'students'"
        :school-id="session.activeSchool"
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
} from "./services/schoolService";

import NavigationMenu from "./components/NavigationMenu.vue";
import LoginModal from "./components/LoginModal.vue";

import NoSchoolPage from "./pages/NoSchoolPage.vue";
import ClassroomPage from "./pages/ClassroomPage.vue";
import StudentManager from "./pages/StudentManager.vue";
import CourseManager from "./pages/CourseManager.vue";
import BuildingManager from "./pages/BuildingManager.vue";
import RoomManager from "./pages/RoomManager.vue";
import ClassManager from "./pages/ClassManager.vue";
import ClassWorkspace from "./pages/ClassWorkspace.vue";
import SettingsPage from "./pages/SettingsPage.vue";
import ProfilePage from "./pages/ProfilePage.vue";

export default {
  name: "App",

  components: {
    NavigationMenu,
    LoginModal,
    NoSchoolPage,
    ClassroomPage,
    StudentManager,
    CourseManager,
    BuildingManager,
    RoomManager,
    ClassManager,
    ClassWorkspace,
    SettingsPage,
    ProfilePage,
  },

  data() {
    return {
      loading: true,
      currentPage: "classroom",
      selectedClassId: "",

      session: {
        firebaseUser: null,
        profile: null,
        schools: [],
        activeSchool: null,
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

        const schoolIds =
          profile?.schools || [];

        const schools =
          await getUserSchools(
            schoolIds,
          );

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

        this.session.firebaseUser =
          firebaseUser;

        this.session.profile =
          profile;

        this.session.schools =
          schools;

        this.session.activeSchool =
          activeSchool;

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
          (school) => school.id === schoolId,
        );

      if (!schoolExists) {
        return;
      }

      const previousSchool =
        this.session.activeSchool;

      try {
        await updateActiveSchool(
          this.session.firebaseUser.uid,
          schoolId,
        );

        this.session.activeSchool =
          schoolId;

        this.session.profile = {
          ...this.session.profile,
          activeSchool: schoolId,
        };

        this.selectedClassId = "";
        this.currentPage = "classes";
      } catch (error) {
        console.error(
          "Unable to change school:",
          error,
        );

        this.session.activeSchool =
          previousSchool;
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
        await signOut(auth);

        this.selectedClassId = "";
        this.currentPage = "classroom";

        this.session = {
          firebaseUser: null,
          profile: null,
          schools: [],
          activeSchool: null,
          initialized: false,
        };
      } catch (error) {
        console.error("Unable to sign out:", error);
      }
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