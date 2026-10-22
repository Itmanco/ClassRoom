
<template>
  <section class="hours-panel">
    <h2>{{ $t("schoolSettings.operatingHours.title") }}</h2>
    <p>{{ $t("schoolSettings.operatingHours.description") }}</p>

    <p v-if="loading">
      {{ $t("schoolSettings.loading") }}
    </p>

    <template v-else>
      <p v-if="!configured" class="notice">
        {{ $t("schoolSettings.operatingHours.notConfigured") }}
      </p>

      <div
        v-for="day in days"
        :key="day"
        class="day-row"
      >
        <div class="day-header">
          <strong>{{ $t(`schoolSettings.operatingHours.days.${day}`) }}</strong>

          <label class="day-toggle">
            <input
              type="checkbox"
              :checked="hours[day].length > 0"
              :disabled="saving || !loaded"
              @change="toggleDay(day, $event.target.checked)"
            >
            {{ hours[day].length ? $t("schoolSettings.operatingHours.open") :
              $t("schoolSettings.operatingHours.closed") }}
          </label>
        </div>

        <div
          v-for="(interval, index) in hours[day]"
          :key="`${day}-${index}`"
          class="interval-row"
        >
          <input
            v-model="interval.startTime"
            type="time"
            :disabled="saving || !loaded"
          >
          <span>–</span>
          <input
            v-model="interval.endTime"
            type="time"
            :disabled="saving || !loaded"
          >
          <button
            type="button"
            :disabled="saving || !loaded"
            @click="removeInterval(day, index)"
          >
            {{ $t("schoolSettings.operatingHours.remove") }}
          </button>
        </div>

        <button
          v-if="hours[day].length > 0"
          type="button"
          class="add-button"
          :disabled="saving || !loaded || hours[day].length >= 20"
          @click="addInterval(day)"
        >
          + {{ $t("schoolSettings.operatingHours.addInterval") }}
        </button>
      </div>

      <p v-if="errorMessage" class="error-message" role="alert">
        {{ errorMessage }}
      </p>

      <p v-if="successMessage" class="success-message" role="status">
        {{ successMessage }}
      </p>

      <button
        type="button"
        class="save-button"
        :disabled="saving || !loaded || !hasChanges"
        @click="save"
      >
        {{ saving ? $t("schoolSettings.saving") : $t("schoolSettings.save") }}
      </button>
    </template>
  </section>
</template>

<script>
import {
  getSchoolOperatingHours,
  saveSchoolOperatingHours,
} from "../services/schoolSettingsService";

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

function emptyHours() {
  return Object.fromEntries(DAYS.map((day) => [day, []]));
}

function cloneHours(hours) {
  return JSON.parse(JSON.stringify(hours));
}

function validateHours(hours) {
  const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

  for (const day of DAYS) {
    const intervals = [...hours[day]].sort(
        (a, b) => a.startTime.localeCompare(b.startTime),
    );

    for (let i = 0; i < intervals.length; i++) {
      const {startTime, endTime} = intervals[i];

      if (
        !timePattern.test(startTime) ||
        !timePattern.test(endTime) ||
        startTime >= endTime
      ) {
        return false;
      }

      if (i > 0 && intervals[i - 1].endTime > startTime) {
        return false;
      }
    }
  }

  return true;
}

export default {
  name: "SchoolOperatingHoursEditor",

  props: {
    schoolId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      days: DAYS,
      hours: emptyHours(),
      savedHours: null,
      configured: false,
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
      if (!this.configured) return true;

      return JSON.stringify(this.hours) !==
        JSON.stringify(this.savedHours);
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
        const existing = await getSchoolOperatingHours(schoolId);

        if (version !== this.loadVersion) return;

        this.configured = existing !== null;
        this.hours = cloneHours(existing ?? emptyHours());
        this.savedHours = cloneHours(this.hours);
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

    toggleDay(day, checked) {
      this.hours[day] = checked ?
        [{startTime: "09:00", endTime: "17:00"}] : [];

      this.successMessage = "";
    },

    addInterval(day) {
      const intervals = this.hours[day];

      if (intervals.length >= 20) return;

      const last = intervals[intervals.length - 1];
      const startTime = last?.endTime ?? "09:00";

      const [hours, minutes] = startTime.split(":").map(Number);
      const startMinutes = hours * 60 + minutes;

      if (startMinutes >= 23 * 60 + 59) {
        this.errorMessage = this.$t(
            "schoolSettings.operatingHours.noMoreTime",
        );
        return;
      }

      const endMinutes = Math.min(startMinutes + 60, 23 * 60 + 59);
      const endTime = [
        String(Math.floor(endMinutes / 60)).padStart(2, "0"),
        String(endMinutes % 60).padStart(2, "0"),
      ].join(":");

      intervals.push({startTime, endTime});

      this.errorMessage = "";
      this.successMessage = "";
    },

    removeInterval(day, index) {
      this.hours[day].splice(index, 1);
      this.successMessage = "";
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

      this.errorMessage = "";
      this.successMessage = "";

      if (!validateHours(this.hours)) {
        this.errorMessage = this.$t(
            "schoolSettings.operatingHours.invalid",
        );
        return;
      }

      const version = this.loadVersion;
      const schoolId = this.schoolId;
      const payload = cloneHours(this.hours);

      this.saving = true;

      try {
        await saveSchoolOperatingHours(schoolId, payload);

        if (version !== this.loadVersion) return;

        this.savedHours = cloneHours(payload);
        this.configured = true;
        this.successMessage = this.$t(
            "schoolSettings.operatingHours.saved",
        );
      } catch (error) {
        if (version === this.loadVersion) {
          this.errorMessage = error.message;
        }
      } finally {
        this.saving = false;
      }
    },

    confirmDiscardChanges() {
      if (!this.loaded || !this.hasChanges) return true;

      return window.confirm(
          this.$t("schoolSettings.operatingHours.unsavedChanges"),
      );
    },
  },
};
</script>

<style scoped>
.hours-panel {
  margin-top: 24px;
  padding: 24px;
  border: 1px solid #d0d5dd;
  border-radius: 12px;
}

.day-row {
  padding: 16px 0;
  border-bottom: 1px solid #eaecf0;
}

.day-header,
.interval-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.day-header {
  justify-content: space-between;
}

.day-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
}

.interval-row {
  margin-top: 12px;
}

.interval-row input {
  padding: 8px;
  border: 1px solid #98a2b3;
  border-radius: 8px;
}

button {
  padding: 8px 12px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.add-button {
  margin-top: 12px;
}

.save-button {
  margin-top: 20px;
}

.notice {
  color: #b54708;
}

.error-message {
  color: #b42318;
}

.success-message {
  color: #176b49;
}
</style>

