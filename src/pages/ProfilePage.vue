<template>
  <div class="profile-page">
    <header class="page-header">
      <div>
        <p class="eyebrow">
          {{ $t("profile.eyebrow") }}
        </p>

        <h1>
          👤 {{ $t("profile.title") }}
        </h1>

        <p>
          {{ $t("profile.description") }}
        </p>
      </div>
    </header>

    <p
      v-if="successMessage"
      class="message success"
    >
      {{ successMessage }}
    </p>

    <p
      v-if="errorMessage"
      class="message error"
    >
      {{ errorMessage }}
    </p>

    <div class="profile-grid">
      <section class="card">
        <div class="section-heading">
          <div>
            <h2>
              {{ $t("profile.personal.title") }}
            </h2>

            <p>
              {{ $t("profile.personal.description") }}
            </p>
          </div>
        </div>

        <form
          class="profile-form"
          @submit.prevent="saveProfile"
        >
          <label>
            {{ $t("profile.fields.displayName") }}

            <input
              v-model.trim="form.displayName"
              type="text"
              maxlength="100"
            />
          </label>

          <label>
            {{ $t("profile.fields.firstName") }}

            <input
              v-model.trim="form.firstName"
              type="text"
              maxlength="80"
            />
          </label>

          <label>
            {{ $t("profile.fields.lastName") }}

            <input
              v-model.trim="form.lastName"
              type="text"
              maxlength="80"
            />
          </label>

          <div class="actions">
            <button
              class="primary"
              type="submit"
              :disabled="saving"
            >
              {{
                saving
                  ? $t("common.saving")
                  : $t("profile.actions.save")
              }}
            </button>

            <button
              type="button"
              class="secondary"
              :disabled="saving"
              @click="resetForm"
            >
              {{ $t("common.cancel") }}
            </button>
          </div>
        </form>
      </section>

      <section class="card">
        <div class="section-heading">
          <div>
            <h2>
              {{ $t("profile.account.title") }}
            </h2>

            <p>
              {{ $t("profile.account.description") }}
            </p>
          </div>
        </div>

        <dl class="account-list">
          <div>
            <dt>
              {{ $t("profile.fields.email") }}
            </dt>

            <dd>
              {{ user?.email || profile?.email || "—" }}
            </dd>
          </div>

          <div>
            <dt>
              {{ $t("profile.fields.userId") }}
            </dt>

            <dd class="technical-value">
              {{ user?.uid || profile?.id || "—" }}
            </dd>
          </div>

          <div>
            <dt>
              {{ $t("profile.fields.activeSchool") }}
            </dt>

            <dd>
              {{
                profile?.activeSchool ||
                $t("profile.account.notAvailable")
              }}
            </dd>
          </div>
        </dl>

        <p class="account-note">
          {{ $t("profile.account.emailNote") }}
        </p>
      </section>
    </div>
  </div>
</template>

<script>
import {
  updateCurrentUserProfile,
} from "../services/userService";

export default {
  name: "ProfilePage",

  props: {
    user: {
      type: Object,
      required: true,
    },

    profile: {
      type: Object,
      default: null,
    },
  },

  emits: ["profile-updated"],

  data() {
    return {
      form: {
        displayName: "",
        firstName: "",
        lastName: "",
      },

      saving: false,
      successMessage: "",
      errorMessage: "",
    };
  },

  watch: {
    profile: {
      immediate: true,

      handler() {
        this.resetForm();
      },
    },
  },

  methods: {
    resetForm() {
      this.form = {
        displayName:
          this.profile?.displayName ||
          this.profile?.name ||
          this.user?.displayName ||
          "",

        firstName:
          this.profile?.firstName ||
          "",

        lastName:
          this.profile?.lastName ||
          "",
      };

      this.successMessage = "";
      this.errorMessage = "";
    },

    async saveProfile() {
      this.saving = true;
      this.successMessage = "";
      this.errorMessage = "";

      try {
        await updateCurrentUserProfile(
          this.user.uid,
          this.form,
        );

        this.successMessage = this.$t(
          "profile.messages.saved",
        );

        this.$emit(
          "profile-updated",
          {
            ...this.form,
          },
        );
      } catch (error) {
        this.errorMessage = this.$t(
          "profile.messages.saveError",
          {
            error: error.message,
          },
        );
      } finally {
        this.saving = false;
      }
    },
  },
};
</script>

<style scoped>
.profile-page {
  padding: 30px;
  max-width: 1050px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  margin: 4px 0 8px;
}

.page-header p {
  color: #666;
}

.eyebrow {
  margin: 0;
  color: #667085;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.profile-grid {
  display: grid;
  grid-template-columns:
    minmax(320px, 1.15fr)
    minmax(280px, 0.85fr);
  gap: 24px;
  align-items: start;
}

.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 24px;
}

.section-heading h2 {
  margin: 0 0 6px;
}

.section-heading p {
  margin: 0 0 20px;
  color: #666;
}

.profile-form {
  display: grid;
  gap: 16px;
}

label {
  display: grid;
  gap: 7px;
  font-weight: 600;
}

input {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #bbb;
  border-radius: 8px;
  font: inherit;
}

.actions {
  display: flex;
  gap: 10px;
}

button {
  border: 0;
  border-radius: 8px;
  padding: 10px 14px;
  cursor: pointer;
}

.primary {
  background: #42b883;
  color: white;
}

.secondary {
  background: #e8eaed;
  color: #333;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.account-list {
  margin: 0;
}

.account-list div {
  padding: 14px 0;
  border-bottom: 1px solid #eee;
}

.account-list div:first-child {
  padding-top: 0;
}

.account-list dt {
  margin-bottom: 5px;
  color: #667085;
  font-size: 0.85rem;
}

.account-list dd {
  margin: 0;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.technical-value {
  font-family: monospace;
  font-size: 0.85rem;
}

.account-note {
  margin: 18px 0 0;
  color: #666;
  font-size: 0.9rem;
}

.message {
  padding: 11px 14px;
  border-radius: 8px;
  margin-bottom: 18px;
}

.message.success {
  background: #e7f7ed;
  color: #18794e;
}

.message.error {
  background: #fde8e8;
  color: #b42318;
}

@media (max-width: 800px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }
}
</style>