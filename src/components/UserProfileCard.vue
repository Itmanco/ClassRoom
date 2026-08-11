<template>
  <section
    class="user-card"
    :class="{ collapsed }"
  >
    <template v-if="!collapsed">
      <div class="user-header">
        <div class="avatar">
          {{ initials }}
        </div>

        <button
          type="button"
          class="sign-out-icon"
          :title="$t('userProfile.actions.signOut')"
          :aria-label="$t('userProfile.actions.signOut')"
          @click="$emit('sign-out')"
        >
          🚪
        </button>
      </div>

      <div class="user-info">
        <strong class="user-name">
          {{ displayName }}
        </strong>

        <span class="user-email">
          {{ email }}
        </span>
      </div>

      <button
        type="button"
        class="profile-button"
        :class="{ active }"
        @click="$emit('open-profile')"
      >
        {{ $t("userProfile.actions.open") }}
        <span>›</span>
      </button>
    </template>

    <template v-else>
      <button
        type="button"
        class="avatar compact-action"
        :title="displayName"
        @click="$emit('open-profile')"
      >
        {{ initials }}
      </button>

      <button
        type="button"
        class="sign-out-icon compact-sign-out"
        :title="$t('userProfile.actions.signOut')"
        :aria-label="$t('userProfile.actions.signOut')"
        @click="$emit('sign-out')"
      >
        🚪
      </button>
    </template>
  </section>
</template>

<script>
export default {
  name: "UserProfileCard",

  props: {
    user: {
      type: Object,
      default: null,
    },

    profile: {
      type: Object,
      default: null,
    },

    active: {
      type: Boolean,
      default: false,
    },

    collapsed: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    "open-profile",
    "sign-out",
  ],

  computed: {
    displayName() {
      return (
        this.profile?.displayName ||
        this.profile?.name ||
        this.user?.displayName ||
        this.$t("userProfile.fallbackName")
      );
    },

    email() {
      return (
        this.profile?.email ||
        this.user?.email ||
        ""
      );
    },

    initials() {
      const source = this.displayName.trim();

      if (!source) {
        return "?";
      }

      const parts = source
        .split(/\s+/)
        .filter(Boolean);

      if (parts.length === 1) {
        return parts[0]
          .slice(0, 2)
          .toUpperCase();
      }

      return `${parts[0][0]}${parts[parts.length - 1][0]}`
        .toUpperCase();
    },
  },
};
</script>

<style scoped>
.user-card {
  padding-top: 14px;
  border-top: 1px solid #ddd;
}

.user-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.avatar {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #42b883;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}


.user-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-email {
  color: #666;
  font-size: 0.78rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sign-out-icon {
  flex-shrink: 0;
  padding: 4px;
  border: none;
  background: transparent;
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  border-radius: 6px;
}

.sign-out-icon:hover {
  background: #fde8e8;
}

.profile-button {
  width: 100%;
  padding: 9px 10px;
  border: none;
  border-radius: 7px;
  background: #e8eaed;
  color: #333;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.profile-button:hover {
  background: #ddd;
}

.profile-button.active {
  background: #42b883;
  color: white;
}

.user-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.user-header .avatar {
  margin-bottom: 0;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
  margin-bottom: 12px;
  min-width: 0;
}

.user-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-email {
  color: #666;
  font-size: 0.82rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sign-out-icon {
  padding: 5px;
  border: none;
  border-radius: 6px;
  background: transparent;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
}

.sign-out-icon:hover {
  background: #fde8e8;
}

.user-card.collapsed {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.compact-action {
  cursor: pointer;
  border: none;
}

.compact-sign-out {
  font-size: 1.35rem;
}
</style>