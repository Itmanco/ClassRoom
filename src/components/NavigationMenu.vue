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

    <SchoolSelector
      v-if="!collapsed"
      class="school-selector"
      :schools="schools"
      :active-school="activeSchool"
      @change-school="
        $emit('change-school', $event)
      "
    />    

    <div class="navigation-links">
      <button
        @click="$emit('change-page', 'dashboard')"
        :class="{ active: currentPage === 'dashboard' }"
        :title="
          collapsed
            ? $t('navigation.dashboard')
            : ''
        "
      >
        <span class="nav-icon">
          📊
        </span>

        <span v-if="!collapsed">
          {{ $t("navigation.dashboard") }}
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

      <button
        v-if="isSystemAdmin"
        @click="$emit('change-page', 'admin')"
        :class="{ active: currentPage === 'admin' }"
        :title="
          collapsed
            ? $t('navigation.admin')
            : ''
        "
      >
        <span class="nav-icon">
          🛠️
        </span>

        <span v-if="!collapsed">
          {{ $t("navigation.admin") }}
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
import SchoolSelector from "./SchoolSelector.vue";
import UserProfileCard from "./UserProfileCard.vue";

export default {
  name: "NavigationMenu",

  components: {
    UserProfileCard,
    SchoolSelector,
  },

  props: {
    currentPage: {
      type: String,
      required: true,
    },

    schools: {
      type: Array,
      default: () => [],
    },

    activeSchool: {
      type: String,
      default: "",
    },

    user: {
      type: Object,
      default: null,
    },

    profile: {
      type: Object,
      default: null,
    },

    isSystemAdmin: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    "change-page",
    "change-school",
    "open-profile",
    "sign-out",
  ],

  data() {
    return {
      collapsed: false,
      autoCollapsed: false,
    };
  },

  mounted() {
    this.updateResponsiveState();

    window.addEventListener(
      "resize",
      this.updateResponsiveState,
    );
  },

  beforeUnmount() {
    window.removeEventListener(
      "resize",
      this.updateResponsiveState,
    );
  },

  methods: {
    updateResponsiveState() {
      const shouldCollapse =
        window.innerWidth <= 900;

      if (
        shouldCollapse &&
        !this.autoCollapsed
      ) {
        this.collapsed = true;
        this.autoCollapsed = true;
      }

      if (
        !shouldCollapse &&
        this.autoCollapsed
      ) {
        this.collapsed = false;
        this.autoCollapsed = false;
      }
    },
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
  margin-bottom: 14px;
}

.sidebar-header h2 {
  margin: 0;
  min-width: 0;
}

.school-selector {
  margin-bottom: 18px;
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

.sidebar.collapsed .sidebar-header {
  justify-content: center;
}
</style>