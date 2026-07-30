<template>
  <!-- Wait until Firebase finishes checking the session -->
  <div v-if="loading" class="loading-screen">
    <h2>Loading...</h2>
  </div>

  <!-- Show login if no user is authenticated -->
  <LoginModal
    v-else-if="!session.firebaseUser"
    :isVisible="true"
    @login-success="onLoginSuccess"
  />

  <!-- Show the application -->
<div v-else class="layout">

    <NavigationMenu
        :currentPage="currentPage"
        @change-page="currentPage=$event"
    />

    <main>

        <ClassroomPage
            v-if="currentPage==='classroom'" :schoolId="session.activeSchool"
        />

        <StudentManager
            v-if="currentPage==='students'"
            :schoolId="session.activeSchool"
        />

        <CourseManager
            v-if="currentPage==='courses'"
            :schoolId="session.activeSchool"
        />

        <BuildingManager
            v-if="currentPage==='buildings'"
            :schoolId="session.activeSchool"
        />

        <RoomManager
            v-if="currentPage==='rooms'"
            :schoolId="session.activeSchool"
        />

        <ClassManager
            v-if="currentPage==='classes'"
            :schoolId="session.activeSchool"
        />

        <EnrollmentManager
            v-if="currentPage==='enrollments'"
            :schoolId="session.activeSchool"
        />

        <SeatingPlanManager
            v-if="currentPage==='seating-plans'"
            :schoolId="session.activeSchool"
        />

        <SettingsPage
            v-if="currentPage==='settings'"
        />

    </main>

</div>

</template>

<script>
import { auth } from "./firebase-init";
import { onAuthStateChanged } from "firebase/auth";

import { getCurrentUserProfile } from "./services/userService";

import NavigationMenu from "./components/NavigationMenu.vue"
import LoginModal from "./components/LoginModal.vue";

import ClassroomPage from "./pages/ClassroomPage.vue"
import StudentManager from "./pages/StudentManager.vue"
import CourseManager from "./pages/CourseManager.vue"
import BuildingManager from "./pages/BuildingManager.vue"
import RoomManager from "./pages/RoomManager.vue"
import ClassManager from "./pages/ClassManager.vue"
import EnrollmentManager from "./pages/EnrollmentManager.vue"
import SeatingPlanManager from "./pages/SeatingPlanManager.vue"
import SettingsPage from "./pages/SettingsPage.vue"

export default{
name: "App",

components:{
NavigationMenu,
LoginModal,
ClassroomPage,
StudentManager,
CourseManager,
BuildingManager,
RoomManager,
ClassManager,
EnrollmentManager,
SeatingPlanManager,
SettingsPage
},

data(){
  return {
      loading: true,

      currentPage: "classroom",

      session: {
          firebaseUser: null,
          profile: null,
          activeSchool: null,
          initialized: false
      }
    };
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
            firebaseUser.uid
        );

        this.session.firebaseUser = firebaseUser;
        this.session.profile = profile;

        if (profile) {
            this.session.activeSchool = profile.activeSchool;
        }

        this.session.initialized = true;
        console.log("Session ready:", this.session);
    },

    async onLoginSuccess() {
      console.log("Login successful.");
    },
  },
};
</script>

<style>

body{
margin:0;
font-family:Arial;
}

.layout{
display:flex;
}

main{
flex:1;
}

.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>