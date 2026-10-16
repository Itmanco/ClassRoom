
<template>
  <div class="school-settings">
    <header>
      <button type="button" @click="$emit('back')">
        ← {{ $t("common.back") }}
      </button>

      <h1>{{ $t("schoolSettings.title") }}</h1>
      <p>{{ $t("schoolSettings.description") }}</p>
    </header>

    <section class="settings-panel">
      <h2>{{ $t("schoolSettings.timeZone.title") }}</h2>

      <p>{{ $t("schoolSettings.timeZone.description") }}</p>

      <p class="school-id">
        {{ $t("schoolSettings.schoolId") }}: {{ schoolId }}
      </p>

      <p v-if="loading">
        {{ $t("schoolSettings.loading") }}
      </p>

      <form v-else @submit.prevent="save">
        <label for="school-time-zone">
          {{ $t("schoolSettings.timeZone.label") }}
        </label>

        <select
          id="school-time-zone"
          v-model="selectedTimeZone"
          :disabled="saving || !loaded"
          required
        >
          <option
            v-for="zone in timeZones"
            :key="zone"
            :value="zone"
          >
            {{ zone }}
          </option>
        </select>

        <p class="help-text">
          {{ $t("schoolSettings.timeZone.help") }}
        </p>

        <p v-if="errorMessage" class="error-message" role="alert">
          {{ errorMessage }}
        </p>

        <p v-if="successMessage" class="success-message" role="status">
          {{ successMessage }}
        </p>

        <button
          type="submit"
          :disabled="saving || !loaded || !hasChanges"
        >
          {{
            saving
              ? $t("schoolSettings.saving")
              : $t("schoolSettings.save")
          }}
        </button>
      </form>
    </section>
  </div>
</template>

<script>
import {
  getSchoolTimeZone,
  updateSchoolTimeZone,
} from "../services/schoolSettingsService";

const TIME_ZONES = [
  "Asia/Tokyo",
  "Asia/Seoul",
  "Asia/Shanghai",
  "Asia/Singapore",
  "Asia/Kolkata",
  "Asia/Dubai",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Madrid",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Bogota",
  "America/Mexico_City",
  "America/Sao_Paulo",
  "America/Toronto",
  "Australia/Sydney",
  "Pacific/Auckland",
  "UTC",
];

export default {
  name: "AdminSchoolSettings",

  props: {
    schoolId: {
      type: String,
      required: true,
    },
  },

  emits: ["back"],

  data() {
    return {
      timeZones: TIME_ZONES,
      selectedTimeZone: "Asia/Tokyo",
      savedTimeZone: "Asia/Tokyo",
      loading: false,
      loaded: false,
      saving: false,
      errorMessage: "",
      successMessage: "",
      loadVersion: 0,
    };
  },

  computed: {
    hasChanges() {
      return this.selectedTimeZone !== this.savedTimeZone;
    },
  },

  watch: {
    schoolId() {
      this.load();
    },
  },

  mounted() {
    this.load();
  },

  beforeUnmount() {
    this.loadVersion += 1;
  },

  methods: {
    async load() {
      const version = ++this.loadVersion;
      const schoolId = this.schoolId;

      this.loading = true;
      this.loaded = false;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        const timeZone = await getSchoolTimeZone(schoolId);

        if (version !== this.loadVersion) return;

        if (!this.timeZones.includes(timeZone)) {
          this.timeZones = [...TIME_ZONES, timeZone].sort();
        }

        this.selectedTimeZone = timeZone;
        this.savedTimeZone = timeZone;
        this.loaded = true;
      } catch (error) {
        if (version === this.loadVersion) {
          this.errorMessage = error.message;
        }
      } finally {
        if (version === this.loadVersion) {
          this.loading = false;
        }
      }
    },

    async save() {
      if (
        this.loading ||
        this.saving ||
        !this.loaded ||
        !this.hasChanges
      ) {
        return;
      }

      const version = this.loadVersion;
      const schoolId = this.schoolId;
      const timeZone = this.selectedTimeZone;

      this.saving = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        await updateSchoolTimeZone(schoolId, timeZone);

        if (version !== this.loadVersion) return;

        this.savedTimeZone = timeZone;
        this.successMessage = this.$t(
          "schoolSettings.saved",
        );
      } catch (error) {
        if (version === this.loadVersion) {
          this.errorMessage = error.message;
        }
      } finally {
        this.saving = false;
      }
    },
  },
};
</script>

<style scoped>
.school-settings {
  max-width: 1180px;
  margin: 0 auto;
  padding: 30px;
}

.settings-panel {
  margin-top: 24px;
  padding: 24px;
  border: 1px solid #d0d5dd;
  border-radius: 12px;
}

.school-id,
.help-text {
  color: #667085;
  font-size: 0.9rem;
}

label {
  display: block;
  margin: 20px 0 8px;
  font-weight: 600;
}

select {
  display: block;
  width: 100%;
  max-width: 440px;
  padding: 10px 12px;
  border: 1px solid #98a2b3;
  border-radius: 8px;
  background: white;
}

button {
  margin-top: 16px;
  padding: 10px 16px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.error-message {
  color: #b42318;
}

.success-message {
  color: #176b49;
}
</style>
