<template>
  <div class="no-school-page">
    <section class="no-school-card">
      <div class="school-icon">
        🏫
      </div>

      <h1>
        {{ $t("noSchool.title") }}
      </h1>

      <p class="description">
        {{ $t("noSchool.description") }}
      </p>

      <p class="help-text">
        {{ $t("noSchool.help") }}
      </p>

      <div
        v-if="user"
        class="account"
      >
        <strong>
          {{
            profile?.displayName ||
            user.displayName ||
            user.email
          }}
        </strong>

        <span v-if="user.email">
          {{ user.email }}
        </span>
      </div>

      <button
        type="button"
        class="sign-out"
        @click="$emit('sign-out')"
      >
        🚪 {{ $t("noSchool.actions.signOut") }}
      </button>
    </section>
  </div>
</template>

<script>
export default {
  name: "NoSchoolPage",

  props: {
    user: {
      type: Object,
      default: null,
    },

    profile: {
      type: Object,
      default: null,
    },
  },

  emits: ["sign-out"],
};
</script>

<style scoped>
.no-school-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 32px;
  background: #f5f7f8;
}

.no-school-card {
  width: 100%;
  max-width: 520px;
  box-sizing: border-box;
  padding: 42px;
  border: 1px solid #ddd;
  border-radius: 16px;
  background: white;
  text-align: center;
}

.school-icon {
  margin-bottom: 18px;
  font-size: 3rem;
}

h1 {
  margin: 0 0 14px;
  color: #222;
}

.description {
  margin: 0 auto 12px;
  color: #555;
  line-height: 1.6;
}

.help-text {
  margin: 0 auto 26px;
  color: #667085;
  line-height: 1.5;
  font-size: 0.92rem;
}

.account {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 24px;
  padding: 14px;
  border-radius: 10px;
  background: #f7f8f9;
}

.account span {
  color: #667085;
  font-size: 0.88rem;
  overflow-wrap: anywhere;
}

.sign-out {
  padding: 10px 18px;
  border: 0;
  border-radius: 8px;
  background: #e8eaed;
  color: #333;
  cursor: pointer;
  font: inherit;
}

.sign-out:hover {
  background: #dde0e3;
}

@media (max-width: 600px) {
  .no-school-page {
    padding: 18px;
  }

  .no-school-card {
    padding: 30px 22px;
  }
}
</style>