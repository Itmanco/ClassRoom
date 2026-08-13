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

        <div class="security-section">
          <div class="security-heading">
            <div>
              <h3>
                {{ $t("profile.security.title") }}
              </h3>

              <p>
                {{ $t("profile.security.description") }}
              </p>
            </div>

            <button
              v-if="!showPasswordForm"
              type="button"
              class="secondary"
              @click="openPasswordForm"
            >
              {{ $t("profile.security.actions.changePassword") }}
            </button>
          </div>

          <p
            v-if="passwordSuccessMessage"
            class="message success security-message"
          >
            {{ passwordSuccessMessage }}
          </p>

          <p
            v-if="passwordErrorMessage"
            class="message error security-message"
          >
            {{ passwordErrorMessage }}
          </p>

          <form
            v-if="showPasswordForm"
            class="security-form"
            @submit.prevent="changePassword"
          >
            <label>
              {{ $t("profile.security.fields.currentPassword") }}

              <input
                v-model="securityForm.currentPassword"
                type="password"
                autocomplete="current-password"
                required
              />
            </label>

            <label>
              {{ $t("profile.security.fields.newPassword") }}

              <input
                v-model="securityForm.newPassword"
                type="password"
                autocomplete="new-password"
                minlength="6"
                required
              />
            </label>

            <label>
              {{ $t("profile.security.fields.confirmPassword") }}

              <input
                v-model="securityForm.confirmPassword"
                type="password"
                autocomplete="new-password"
                minlength="6"
                required
              />
            </label>

            <p class="password-help">
              {{ $t("profile.security.passwordHelp") }}
            </p>

            <div class="actions">
              <button
                class="primary"
                type="submit"
                :disabled="changingPassword"
              >
                {{
                  changingPassword
                    ? $t("profile.security.actions.changing")
                    : $t("profile.security.actions.savePassword")
                }}
              </button>

              <button
                type="button"
                class="secondary"
                :disabled="changingPassword"
                @click="closePasswordForm"
              >
                {{ $t("common.cancel") }}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
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

      securityForm: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },

      saving: false,
      changingPassword: false,

      successMessage: "",
      errorMessage: "",

      passwordSuccessMessage: "",
      passwordErrorMessage: "",

      showPasswordForm: false,
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

    openPasswordForm() {
      this.resetPasswordForm();
      this.passwordSuccessMessage = "";
      this.passwordErrorMessage = "";
      this.showPasswordForm = true;
    },

    closePasswordForm() {
      this.resetPasswordForm();
      this.passwordErrorMessage = "";
      this.showPasswordForm = false;
    },

    resetPasswordForm() {
      this.securityForm = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      };
    },

    async changePassword() {
      this.passwordSuccessMessage = "";
      this.passwordErrorMessage = "";

      if (
        this.securityForm.newPassword !==
        this.securityForm.confirmPassword
      ) {
        this.passwordErrorMessage = this.$t(
          "profile.security.messages.passwordMismatch",
        );
        return;
      }

      if (this.securityForm.newPassword.length < 6) {
        this.passwordErrorMessage = this.$t(
          "profile.security.messages.passwordTooShort",
        );
        return;
      }

      if (
        this.securityForm.currentPassword ===
        this.securityForm.newPassword
      ) {
        this.passwordErrorMessage = this.$t(
          "profile.security.messages.samePassword",
        );
        return;
      }

      this.changingPassword = true;

      try {
        const credential =
          EmailAuthProvider.credential(
            this.user.email,
            this.securityForm.currentPassword,
          );

        await reauthenticateWithCredential(
          this.user,
          credential,
        );

        await updatePassword(
          this.user,
          this.securityForm.newPassword,
        );

        this.passwordSuccessMessage = this.$t(
          "profile.security.messages.changed",
        );

        this.resetPasswordForm();
        this.showPasswordForm = false;
      } catch (error) {
        this.passwordErrorMessage =
          this.passwordErrorText(error);
      } finally {
        this.changingPassword = false;
      }
    },

    passwordErrorText(error) {
      switch (error.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
          return this.$t(
            "profile.security.messages.currentPasswordInvalid",
          );

        case "auth/weak-password":
          return this.$t(
            "profile.security.messages.passwordTooShort",
          );

        case "auth/requires-recent-login":
          return this.$t(
            "profile.security.messages.reauthenticationRequired",
          );

        case "auth/too-many-requests":
          return this.$t(
            "profile.security.messages.tooManyRequests",
          );

        default:
          return this.$t(
            "profile.security.messages.changeError",
            {
              error: error.message,
            },
          );
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

.security-section {
  margin-top: 26px;
  padding-top: 22px;
  border-top: 1px solid #ddd;
}

.security-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.security-heading h3 {
  margin: 0 0 6px;
}

.security-heading p {
  margin: 0;
  color: #666;
}

.security-form {
  display: grid;
  gap: 16px;
  margin-top: 20px;
}

.security-message {
  margin-top: 18px;
  margin-bottom: 0;
}

.password-help {
  margin: -4px 0 0;
  color: #666;
  font-size: 0.85rem;
}

@media (max-width: 600px) {
  .security-heading {
    flex-direction: column;
  }
}
</style>