<template>
  <section class="user-card">
    <div class="avatar">
      {{ initials }}
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
  },

  emits: ["open-profile"],

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

.avatar {
  width: 42px;
  height: 42px;
  margin-bottom: 10px;
  border-radius: 50%;
  background: #42b883;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 10px;
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
</style>