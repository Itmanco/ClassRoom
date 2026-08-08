<template>
  <nav class="sidebar">
    <h2>📚 {{ $t("app.name") }}</h2>

    <div class="navigation-links">
      <button
        @click="$emit('change-page', 'classroom')"
        :class="{ active: currentPage === 'classroom' }"
      >
        🏠 {{ $t("navigation.classroom") }}
      </button>

      <button
        @click="$emit('change-page', 'students')"
        :class="{ active: currentPage === 'students' }"
      >
        👨‍🎓 {{ $t("navigation.students") }}
      </button>

      <button
        @click="$emit('change-page', 'courses')"
        :class="{ active: currentPage === 'courses' }"
      >
        📚 {{ $t("navigation.courses") }}
      </button>

      <button
        @click="$emit('change-page', 'buildings')"
        :class="{ active: currentPage === 'buildings' }"
      >
        🏫 {{ $t("navigation.buildings") }}
      </button>

      <button
        @click="$emit('change-page', 'rooms')"
        :class="{ active: currentPage === 'rooms' }"
      >
        🚪 {{ $t("navigation.rooms") }}
      </button>

      <button
        @click="$emit('change-page', 'classes')"
        :class="{ active: currentPage === 'classes' }"
      >
        🏷️ {{ $t("navigation.classes") }}
      </button>

      <button
        @click="$emit('change-page', 'settings')"
        :class="{ active: currentPage === 'settings' }"
      >
        ⚙️ {{ $t("navigation.settings") }}
      </button>
    </div>

    <UserProfileCard
      class="profile-card"
      :user="user"
      :profile="profile"
      :active="currentPage === 'profile'"
      @open-profile="$emit('open-profile')"
      @sign-out="$emit('sign-out')"
    />

  </nav>
</template>

<script>
import UserProfileCard from "./UserProfileCard.vue";

export default {
  name: "NavigationMenu",

  components: {
    UserProfileCard,
  },

  props: {
    currentPage: {
      type: String,
      required: true,
    },

    user: {
      type: Object,
      default: null,
    },

    profile: {
      type: Object,
      default: null,
    },
  },

  emits: [
    "change-page",
    "open-profile",
    "sign-out",
  ],
};
</script>

<style scoped>
.sidebar {
  width: 220px;
  background: #f5f5f5;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.sidebar h2 {
  margin: 0 0 20px;
}

.navigation-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  width: 100%;
  text-align: left;
  padding: 12px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}

button.active {
  background: #42b883;
  color: white;
}

.profile-card {
  margin-top: auto;
}
</style>