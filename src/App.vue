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

  <div
    v-else
    class="layout"
  >
    <NavigationMenu
      :current-page="navigationPage"
      @change-page="changePage"
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

      <EnrollmentManager
        v-if="currentPage === 'enrollments'"
        :school-id="session.activeSchool"
      />

      <SeatingPlanManager
        v-if="currentPage === 'seating-plans'"
        :school-id="session.activeSchool"
      />

      <SettingsPage
        v-if="currentPage === 'settings'"
      />
    </main>
  </div>
</template>

<script>
import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  auth,
} from "./firebase-init";

import {
  getCurrentUserProfile,
} from "./services/userService";

import NavigationMenu from "./components/NavigationMenu.vue";
import LoginModal from "./components/LoginModal.vue";

import ClassroomPage from "./pages/ClassroomPage.vue";
import StudentManager from "./pages/StudentManager.vue";
import CourseManager from "./pages/CourseManager.vue";
import BuildingManager from "./pages/BuildingManager.vue";
import RoomManager from "./pages/RoomManager.vue";
import ClassManager from "./pages/ClassManager.vue";
import ClassWorkspace from "./pages/ClassWorkspace.vue";
import EnrollmentManager from "./pages/EnrollmentManager.vue";
import SeatingPlanManager from "./pages/SeatingPlanManager.vue";
import SettingsPage from "./pages/SettingsPage.vue";

export default {
  name: "App",

  components: {
    NavigationMenu,
    LoginModal,
    ClassroomPage,
    StudentManager,
    CourseManager,
    BuildingManager,
    RoomManager,
    ClassManager,
    ClassWorkspace,
    EnrollmentManager,
    SeatingPlanManager,
    SettingsPage,
  },

  data() {
    return {
      loading: true,
      currentPage: "classroom",
      selectedClassId: "",

      session: {
        firebaseUser: null,
        profile: null,
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
        console.log("No authenticated user.");
        this.session.firebaseUser = null;
        return;
      }

      console.log("Logged in:", user.email);

      await this.initializeSession(user);
    });
  },

  methods: {
    async initializeSession(firebaseUser) {
      console.log("Initializing session...");

      const profile = await getCurrentUserProfile(
        firebaseUser.uid,
      );

      this.session.firebaseUser = firebaseUser;
      this.session.profile = profile;

      if (profile) {
        this.session.activeSchool =
          profile.activeSchool;
      }

      this.session.initialized = true;

      console.log(
        "Session ready:",
        this.session,
      );
    },

    async onLoginSuccess() {
      console.log("Login successful.");
    },

    changePage(page) {
      this.currentPage = page;

      if (page !== "class-workspace") {
        this.selectedClassId = "";
      }
    },

    openClassWorkspace(classId) {
      this.selectedClassId = classId;
      this.currentPage = "class-workspace";
    },

    closeClassWorkspace() {
      this.selectedClassId = "";
      this.currentPage = "classes";
    },

    handleSchoolChange(schoolId) {
      this.session.activeSchool = schoolId;
      this.selectedClassId = "";
      this.currentPage = "classes";
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