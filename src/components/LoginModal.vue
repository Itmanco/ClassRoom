<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>ログイン</h2>

      <form @submit.prevent="loginUser()">

        <div class="form-group">
          <label for="authEmail">メールアドレス:</label>
          <input type="email" id="authEmail" v-model="authEmail" required />
        </div>

        <div class="form-group">
          <label for="authPassword">パスワード:</label>
          <div class="input-with-button-wrapper"> 
            <input
              :type="passwordVisible ? 'text' : 'password'"
              id="authPassword"
              v-model="authPassword"
              required
              autocomplete="current-password"
              class="password-input-field" 
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="password-toggle-button"
            >
              <svg v-if="passwordVisible" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a1.012 1.012 0 010 .639C20.773 16.338 16.756 19.5 12 19.5c-.993 0-1.953-.138-2.863-.395M9.75 18.802l-1.5-1.5M15.75 5.25l-1.5-1.5" />
              </svg>
            </button>
          </div>
        </div>
        <!-- END MODIFIED -->

        <button type="submit" class="submit-btn">
          {{ "ログイン" }}
        </button>
      </form>
      <p v-if="authError" class="error-message">{{ authError }}</p>
    </div>
  </div>
</template>

<script>
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase-init"; // Assuming auth is exported from firebaseConfig

export default {
  props: {
    isVisible: Boolean,
  },
  data() {
    return {
      authEmail: "",
      authPassword: "",
      authName: "",
      authError: null,
      passwordVisible: false, // New data property to control password visibility
    };
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        // Reset form and error when modal becomes visible
        this.resetForm();
      }
    },
  },
  methods: {
    resetForm() {
      this.authEmail = "";
      this.authPassword = "";
      this.authName = "";
      this.authError = null;
      this.passwordVisible = false; // Reset password visibility
    },
    closeModal() {
      this.resetForm();
      this.$emit("close");
    },
    togglePasswordVisibility() { // New method to toggle password visibility
      this.passwordVisible = !this.passwordVisible;
    },
    async loginUser() {
      this.authError = null;
      try {
        await signInWithEmailAndPassword(
          auth,
          this.authEmail,
          this.authPassword
        );
        alert("ログインしました！");
        this.$emit("login-success"); // Emit event to parent
        this.closeModal();
      } catch (error) {
        console.error("Error logging in:", error.message);
        this.authError = error.message;
      }
    },
  },
};
</script>

<style scoped>
/* Reusing modal styles from other modals for consistency */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 450px; /* Adjusted for a typical login form */
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-content h2 {
  text-align: center;
  color: #007bff;
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

/* General input styling, applies to email/name inputs */
.form-group input[type="text"],
.form-group input[type="email"] { /* MODIFIED: Removed input[type="password"] from here */
  width: calc(100% - 22px); /* Default width for inputs (100% minus padding/border) */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box; /* Crucial for consistent width calculation */
}

/* NEW: Styles for the wrapper holding password input and button */
.input-with-button-wrapper {
  display: flex; /* Make it a flex container */
  align-items: center; /* Vertically center items */
  width: calc(100% - 22px); /* MODIFIED: Set to match other inputs' calculated width */
  box-sizing: border-box; /* Ensure consistent box model */
  border: 1px solid #ddd; /* ADDED: Apply border to the wrapper */
  border-radius: 4px; /* ADDED: Apply border-radius to the wrapper */
  padding-right: 10px; /* ADDED: Padding inside wrapper, before the button */
}

/* NEW: Specific styling for the password input inside the container */
.input-with-button-wrapper .password-input-field {
  flex-grow: 1; /* Allow the input to grow and take available space */
  width: auto; /* IMPORTANT: Override any default 100% width for flex behavior */
  padding: 10px; /* Keep padding for text inside the input */
  border: none; /* MODIFIED: Remove border from the input itself */
  border-radius: 0; /* MODIFIED: Remove border-radius from the input itself */
  font-size: 16px; /* Keep font-size */
  box-sizing: border-box; /* Keep box-sizing */
  outline: none; /* ADDED: Remove outline on focus, as wrapper will handle visual focus */
}

/* MODIFIED: Styling for the eye icon button */
.password-toggle-button {
  background: none;
  border: none;
  padding: 0;
  height: auto;
  width: auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem; /* MODIFIED: Small margin to separate from input text */
  flex-shrink: 0; /* Prevent button from shrinking */
  width: 24px; /* Fixed size for the button area */
  height: 24px;
}

.password-toggle-button svg {
  width: 100%; /* Make SVG fill the button area */
  height: 100%; /* Make SVG fill the button area */
  color: #6b7280; /* text-gray-500 */
}


.submit-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%; /* Make submit button full width */
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.toggle-mode {
  margin-top: 20px;
  font-size: 0.9em;
  color: #666;
  text-align: center;
}

.toggle-mode span {
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}

.toggle-mode span:hover {
  color: #0056b3;
}

.error-message {
  color: #dc3545;
  margin-top: 15px;
  font-size: 0.9em;
  text-align: center;
}
</style>