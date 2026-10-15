
<template>
  <section class="availability-editor">
    <h3>{{ $t("rooms.availability.editTitle") }}</h3>

    <p v-if="!roomId">
      {{ $t("rooms.availability.selectRoom") }}
    </p>

    <template v-else>
      <p class="timezone">
        {{ $t("rooms.availability.timezone") }}:
        {{ schoolTimeZone }}
      </p>

      <div
        v-for="day in days"
        :key="day"
        class="day-row"
      >
        <strong>
          {{ $t(`rooms.availability.days.${day}`) }}
        </strong>

        <div class="day-windows">
          <div
            v-for="(window, index) in form.weeklyHours[day]"
            :key="index"
            class="window-row"
          >
            <input
              v-model="window.start"
              type="time"
              :aria-label="$t('rooms.availability.startTime')"
            />

            <span>–</span>

            <input
              v-model="window.end"
              type="time"
              :aria-label="$t('rooms.availability.endTime')"
            />

            <button
              type="button"
              :disabled="saving"
              @click="removeWindow(day, index)"
            >
              {{ $t("rooms.availability.removeWindow") }}
            </button>
          </div>

          <button
            type="button"
            :disabled="saving || form.weeklyHours[day].length >= 20"
            @click="addWindow(day)"
          >
            {{ $t("rooms.availability.addWindow") }}
          </button>
        </div>
      </div>

      <p v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </p>

      <p v-if="successMessage" class="success-message">
        {{ successMessage }}
      </p>

      <button
        type="button"
        class="save-button"
        :disabled="saving || loading"
        @click="save"
      >
        {{
          saving
            ? $t("common.saving")
            : $t("rooms.availability.save")
        }}
      </button>
    </template>
  </section>
</template>

<script>
import {
  getRoomAvailability,
  saveRoomAvailability,
  validateRoomAvailability,
} from "../services/roomAvailabilityService";
import {
  getSchoolTimeZone,
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

function emptyAvailability() {
  return {
    weeklyHours: Object.fromEntries(
      DAYS.map((day) => [day, []]),
    ),
  };
}

export default {
  name: "RoomAvailabilityEditor",

  props: {
    schoolId: {
      type: String,
      required: true,
    },
    roomId: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      days: DAYS,
      form: emptyAvailability(),
      loading: false,
      saving: false,
      errorMessage: "",
      successMessage: "",
      loadVersion: 0,
      schoolTimeZone: "Asia/Tokyo",
    };
  },

  watch: {
    schoolId() {
      this.load();
    },
    roomId() {
      this.load();
    },
  },

  mounted() {
    this.load();
  },

  methods: {
    async load() {
      const version = ++this.loadVersion;
      this.form = emptyAvailability();
      this.schoolTimeZone = "Asia/Tokyo";
      this.errorMessage = "";
      this.successMessage = "";

      if (!this.schoolId || !this.roomId) {
        this.loading = false;
        return;
      }

      this.loading = true;

      try {
        const [availability, timeZone] = await Promise.all([
          getRoomAvailability(this.schoolId, this.roomId),
          getSchoolTimeZone(this.schoolId),
        ]);

        if (version !== this.loadVersion) return;

        this.schoolTimeZone = timeZone;

        if (availability) {
          const normalized = validateRoomAvailability(availability);

          this.form = {
            weeklyHours: normalized.weeklyHours,
          };
        }
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

    addWindow(day) {
      this.form.weeklyHours[day].push({
        start: "09:00",
        end: "10:00",
      });
      this.successMessage = "";
    },

    removeWindow(day, index) {
      this.form.weeklyHours[day].splice(index, 1);
      this.successMessage = "";
    },

    async save() {
      if (this.loading || this.saving) return;

      const schoolId = this.schoolId;
      const roomId = this.roomId;
      const version = this.loadVersion;

      this.errorMessage = "";
      this.successMessage = "";

      try {
        const normalized = validateRoomAvailability(this.form);

        this.saving = true;

        await saveRoomAvailability(
          schoolId,
          roomId,
          normalized,
        );

        if (version === this.loadVersion) {
          this.form = normalized;
          this.successMessage = this.$t(
            "rooms.availability.saved",
          );
        }
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
.availability-editor {
  margin-top: 24px;
  border-top: 1px solid #ddd;
  padding-top: 20px;
}

.timezone {
  color: #667085;
}

.day-row {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.day-windows {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.window-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

input {
  padding: 8px;
  border: 1px solid #bbb;
  border-radius: 6px;
}

button {
  padding: 8px 12px;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.save-button {
  margin-top: 20px;
  background: #42b883;
  color: white;
}

.error-message {
  color: #b42318;
}

.success-message {
  color: #167347;
}

@media (max-width: 600px) {
  .day-row {
    grid-template-columns: 1fr;
  }
}
</style>
