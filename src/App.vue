<template>
  <!-- Wait until Firebase finishes checking the session -->
  <div v-if="loading" class="loading-screen">
    <h2>Loading...</h2>
  </div>

  <!-- Show login if no user is authenticated -->
  <LoginModal
    v-else-if="!user"
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
            v-if="currentPage==='classroom'"
        />

        <StudentManager
            v-if="currentPage==='students'"
        />

        <CourseManager
            v-if="currentPage==='courses'"
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
import SettingsPage from "./pages/SettingsPage.vue"

export default{
name: "App",

components:{
NavigationMenu,
LoginModal,
ClassroomPage,
StudentManager,
CourseManager,
SettingsPage
},

data(){
    return {
      user: null,
      userProfile: null,
      loading: true,
      currentPage: "classroom"
    };  
},

mounted() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      this.loading = false;

      if (user) {
        console.log("Logged in:", user.email);
      } else {
        console.log("No authenticated user.");
      }
    });
  },

  methods: {
    async onLoginSuccess() {
        this.user = auth.currentUser;

        console.log("UID:", auth.currentUser.uid);
        console.log("Email:", auth.currentUser.email);

        const profile = await getCurrentUserProfile(
            auth.currentUser.uid
        );

        console.log("User profile:", profile);
        this.userProfile = profile;

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