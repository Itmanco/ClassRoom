<template>
  <nav
    class="sidebar"
    :class="{ collapsed }"
  >
    <div class="sidebar-header">
      <h2 v-if="!collapsed">
        📚 {{ $t("app.name") }}
      </h2>

      <button
        type="button"
        class="toggle-button"
        :title="
          collapsed
            ? $t('navigation.expand')
            : $t('navigation.collapse')
        "
        :aria-label="
          collapsed
            ? $t('navigation.expand')
            : $t('navigation.collapse')
        "
        @click="collapsed = !collapsed"
      >
        ☰
      </button>
    </div>

    <div class="navigation-links">
      <button
        @click="$emit('change-page', 'classroom')"
        :class="{ active: currentPage === 'classroom' }"
        :title="collapsed ? $t('navigation.classroom') : ''"
      >
        <span class="nav-icon">🏠</span>
        <span v-if="!collapsed">
          {{ $t("navigation.classroom") }}
        </span>
      </button>

      <button
        @click="$emit('change-page', 'students')"
        :class="{ active: currentPage === 'students' }"
        :title="collapsed ? $t('navigation.students') : ''"
      >
        <span class="nav-icon">👨‍🎓</span>
        <span v-if="!collapsed">
          {{ $t("navigation.students") }}
        </span>
      </button>

      <button
        @click="$emit('change-page', 'courses')"
        :class="{ active: currentPage === 'courses' }"
        :title="collapsed ? $t('navigation.courses') : ''"
      >
        <span class="nav-icon">📚</span>
        <span v-if="!collapsed">
          {{ $t("navigation.courses") }}
        </span>
      </button>

      <button
        @click="$emit('change-page', 'buildings')"
        :class="{ active: currentPage === 'buildings' }"
        :title="collapsed ? $t('navigation.buildings') : ''"
      >
        <span class="nav-icon">🏫</span>
        <span v-if="!collapsed">
          {{ $t("navigation.buildings") }}
        </span>
      </button>

      <button
        @click="$emit('change-page', 'rooms')"
        :class="{ active: currentPage === 'rooms' }"
        :title="collapsed ? $t('navigation.rooms') : ''"
      >
        <span class="nav-icon">📐</span>
        <span v-if="!collapsed">
          {{ $t("navigation.rooms") }}
        </span>
      </button>

      <button
        @click="$emit('change-page', 'classes')"
        :class="{ active: currentPage === 'classes' }"
        :title="collapsed ? $t('navigation.classes') : ''"
      >
        <span class="nav-icon">🏷️</span>
        <span v-if="!collapsed">
          {{ $t("navigation.classes") }}
        </span>
      </button>

      <button
        @click="$emit('change-page', 'settings')"
        :class="{ active: currentPage === 'settings' }"
        :title="collapsed ? $t('navigation.settings') : ''"
      >
        <span class="nav-icon">⚙️</span>
        <span v-if="!collapsed">
          {{ $t("navigation.settings") }}
        </span>
      </button>
    </div>

    <UserProfileCard
      class="profile-card"
      :user="user"
      :profile="profile"
      :active="currentPage === 'profile'"
      :collapsed="collapsed"
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

  data() {
    return {
      collapsed: false,
    };
  },
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
  transition: width 0.2s ease;
}

.sidebar.collapsed {
  width: 76px;
  padding: 16px 10px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
}

.sidebar-header h2 {
  margin: 0;
  min-width: 0;
}

.toggle-button {
  flex-shrink: 0;
  width: auto;
  padding: 8px;
  text-align: center;
  background: transparent;
  font-size: 1.1rem;
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

.navigation-links button {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar.collapsed .navigation-links button {
  justify-content: center;
  padding: 12px 8px;
}

.nav-icon {
  flex-shrink: 0;
}

button.active {
  background: #42b883;
  color: white;
}

.profile-card {
  margin-top: auto;
}
</style>