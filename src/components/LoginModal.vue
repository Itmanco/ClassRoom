<template>
  <div
    v-if="isVisible"
    class="login-page"
  >
    <div class="login-shell">
      <section class="brand-panel">
        <div class="brand-content">
          <div class="brand-icon">
            📚
          </div>

          <p class="eyebrow">
            {{ $t("login.brand.eyebrow") }}
          </p>

          <h1>
            {{ $t("app.name") }}
          </h1>

          <p class="brand-description">
            {{ $t("login.brand.description") }}
          </p>

          <div class="feature-list">
            <div class="feature">
              <span>👨‍🎓</span>
              <span>
                {{ $t("login.brand.students") }}
              </span>
            </div>

            <div class="feature">
              <span>🏷️</span>
              <span>
                {{ $t("login.brand.classes") }}
              </span>
            </div>

            <div class="feature">
              <span>🪑</span>
              <span>
                {{ $t("login.brand.seating") }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section class="login-panel">
        <div class="login-card">
          <div class="login-heading">
            <div class="mobile-brand">
              📚 {{ $t("app.name") }}
            </div>

            <p class="eyebrow">
              {{ $t("login.eyebrow") }}
            </p>

            <h2>
              {{ $t("login.title") }}
            </h2>

            <p>
              {{ $t("login.description") }}
            </p>
          </div>

          <form
            class="login-form"
            @submit.prevent="loginUser"
          >
            <label>
              {{ $t("login.fields.email") }}

              <input
                id="authEmail"
                v-model.trim="authEmail"
                type="email"
                autocomplete="email"
                :placeholder="$t('login.placeholders.email')"
                :disabled="loggingIn"
                required
              />
            </label>

            <label>
              {{ $t("login.fields.password") }}

              <div class="password-field">
                <input
                  id="authPassword"
                  v-model="authPassword"
                  :type="
                    passwordVisible
                      ? 'text'
                      : 'password'
                  "
                  autocomplete="current-password"
                  :placeholder="
                    $t('login.placeholders.password')
                  "
                  :disabled="loggingIn"
                  required
                />

                <button
                  type="button"
                  class="password-toggle"
                  :title="passwordToggleLabel"
                  :aria-label="passwordToggleLabel"
                  :disabled="loggingIn"
                  @click="togglePasswordVisibility"
                >
                  {{ passwordVisible ? "🙈" : "👁️" }}
                </button>
              </div>
            </label>

            <p
              v-if="authError"
              class="error-message"
              role="alert"
            >
              {{ authError }}
            </p>

            <button
              type="submit"
              class="submit-button"
              :disabled="loggingIn"
            >
              {{
                loggingIn
                  ? $t("login.actions.signingIn")
                  : $t("login.actions.signIn")
              }}
            </button>
          </form>

          <p class="login-note">
            🔒 {{ $t("login.securityNote") }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  auth,
} from "../firebase-init";

export default {
  name: "LoginModal",

  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    "close",
    "login-success",
  ],

  data() {
    return {
      authEmail: "",
      authPassword: "",
      authError: "",
      passwordVisible: false,
      loggingIn: false,
    };
  },

  watch: {
    isVisible(newValue) {
      if (newValue) {
        this.resetForm();
      }
    },
  },

  computed: {
    passwordToggleLabel() {
      return this.passwordVisible
        ? this.$t("login.actions.hidePassword")
        : this.$t("login.actions.showPassword");
    },
  },

  methods: {
    resetForm() {
      this.authEmail = "";
      this.authPassword = "";
      this.authError = "";
      this.passwordVisible = false;
      this.loggingIn = false;
    },

    closeModal() {
      this.resetForm();
      this.$emit("close");
    },

    togglePasswordVisibility() {
      this.passwordVisible =
        !this.passwordVisible;
    },

    async loginUser() {
      this.authError = "";
      this.loggingIn = true;

      try {
        await signInWithEmailAndPassword(
          auth,
          this.authEmail,
          this.authPassword,
        );

        this.$emit("login-success");
      } catch (error) {
        this.authError =
          this.loginErrorText(error);
      } finally {
        this.loggingIn = false;
      }
    },

    loginErrorText(error) {
      switch (error.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          return this.$t(
            "login.messages.invalidCredentials",
          );

        case "auth/invalid-email":
          return this.$t(
            "login.messages.invalidEmail",
          );

        case "auth/user-disabled":
          return this.$t(
            "login.messages.userDisabled",
          );

        case "auth/too-many-requests":
          return this.$t(
            "login.messages.tooManyRequests",
          );

        case "auth/network-request-failed":
          return this.$t(
            "login.messages.networkError",
          );

        default:
          return this.$t(
            "login.messages.loginError",
          );
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  position: fixed;
  inset: 0;
  z-index: 1000;
  min-height: 100vh;
  overflow-y: auto;
  background: #f5f7f6;
}

.login-shell {
  display: grid;
  grid-template-columns:
    minmax(320px, 0.9fr)
    minmax(420px, 1.1fr);
  min-height: 100vh;
}

.brand-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  background:
    linear-gradient(
      145deg,
      #2f8f68,
      #42b883
    );
  color: white;
}

.brand-content {
  width: 100%;
  max-width: 440px;
}

.brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 68px;
  margin-bottom: 28px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.16);
  font-size: 2rem;
}

.eyebrow {
  margin: 0 0 8px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.brand-panel .eyebrow {
  color: rgba(255, 255, 255, 0.75);
}

.brand-panel h1 {
  margin: 0 0 18px;
  font-size: clamp(2.2rem, 4vw, 3.4rem);
}

.brand-description {
  max-width: 390px;
  margin: 0;
  color: rgba(255, 255, 255, 0.86);
  font-size: 1.05rem;
  line-height: 1.7;
}

.feature-list {
  display: grid;
  gap: 14px;
  margin-top: 38px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
}

.feature > span:first-child {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.14);
}

.login-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
}

.login-card {
  width: 100%;
  max-width: 430px;
}

.mobile-brand {
  display: none;
  margin-bottom: 30px;
  font-size: 1.15rem;
  font-weight: 700;
}

.login-heading {
  margin-bottom: 28px;
}

.login-heading .eyebrow {
  color: #2f8f68;
}

.login-heading h2 {
  margin: 4px 0 10px;
  color: #222;
  font-size: 2rem;
}

.login-heading > p:last-child {
  margin: 0;
  color: #667085;
  line-height: 1.55;
}

.login-form {
  display: grid;
  gap: 18px;
}

.login-form label {
  display: grid;
  gap: 8px;
  color: #333;
  font-weight: 600;
}

.login-form input {
  box-sizing: border-box;
  width: 100%;
  min-height: 46px;
  padding: 11px 13px;
  border: 1px solid #c9ced6;
  border-radius: 8px;
  background: white;
  font: inherit;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.login-form input:focus {
  border-color: #42b883;
  outline: none;
  box-shadow:
    0 0 0 3px rgba(66, 184, 131, 0.14);
}

.password-field {
  position: relative;
}

.password-field input {
  padding-right: 48px;
}

.password-toggle {
  position: absolute;
  top: 50%;
  right: 7px;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transform: translateY(-50%);
}

.password-toggle:hover {
  background: #f1f3f2;
}

.submit-button {
  width: 100%;
  min-height: 46px;
  margin-top: 4px;
  padding: 11px 16px;
  border: 0;
  border-radius: 8px;
  background: #42b883;
  color: white;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.15s ease,
    transform 0.1s ease;
}

.submit-button:hover:not(:disabled) {
  background: #369d70;
}

.submit-button:active:not(:disabled) {
  transform: translateY(1px);
}

.submit-button:disabled,
.password-toggle:disabled,
.login-form input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  margin: 0;
  padding: 11px 13px;
  border-radius: 8px;
  background: #fde8e8;
  color: #b42318;
  font-size: 0.9rem;
}

.login-note {
  margin: 24px 0 0;
  color: #667085;
  font-size: 0.82rem;
  text-align: center;
}

@media (max-width: 800px) {
  .login-shell {
    display: block;
  }

  .brand-panel {
    display: none;
  }

  .login-panel {
    min-height: 100vh;
    box-sizing: border-box;
    padding: 30px 22px;
  }

  .mobile-brand {
    display: block;
  }
}

@media (max-width: 480px) {
  .login-panel {
    padding: 24px 18px;
  }

  .login-heading h2 {
    font-size: 1.7rem;
  }
}
</style>