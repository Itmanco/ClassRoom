
<template>
  <section class="availability-viewer">
    <h2>{{ $t("rooms.availability.title") }}</h2>

    <p v-if="!roomId">
      {{ $t("rooms.availability.selectRoom") }}
    </p>

    <p v-else-if="loading">
      {{ $t("rooms.availability.loading") }}
    </p>

    <p v-else-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>

    <p v-else-if="!availability">
      {{ $t("rooms.availability.notConfigured") }}
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

        <div class="time-windows">
          <span
            v-for="(window, index) in availability.weeklyHours?.[day] || []"
            :key="index"
            class="time-window"
          >
            {{ window.start }}–{{ window.end }}
          </span>

          <span
            v-if="!availability.weeklyHours?.[day]?.length"
            class="unavailable"
          >
            {{ $t("rooms.availability.unavailable") }}
          </span>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import {
  watchRoomAvailability,
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

export default {
  name: "RoomAvailabilityViewer",

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
      availability: null,
      loading: false,
      errorMessage: "",
      unsubscribeAvailability: null,
      schoolTimeZone: "Asia/Tokyo",
    };
  },

  watch: {
    schoolId() {
      this.startListener();
    },
    roomId() {
      this.startListener();
    },
  },

  mounted() {
    this.startListener();
  },

  beforeUnmount() {
    this.stopListener();
  },

  methods: {
    stopListener() {
      if (this.unsubscribeAvailability) {
        this.unsubscribeAvailability();
        this.unsubscribeAvailability = null;
      }
    },

    startListener() {
      this.stopListener();

      this.availability = null;
      this.errorMessage = "";
      this.loading = Boolean(this.schoolId && this.roomId);

      if (!this.schoolId || !this.roomId) {
        return;
      }
      this.loadSchoolTimeZone();

      this.unsubscribeAvailability = watchRoomAvailability(
        this.schoolId,
        this.roomId,
        (availability) => {
          this.availability = availability;
          this.loading = false;
        },
        (error) => {
          this.errorMessage = error.message;
          this.loading = false;
        },
      );
    },

    async loadSchoolTimeZone() {
      const schoolId = this.schoolId;

      try {
        const timeZone = await getSchoolTimeZone(schoolId);

        if (schoolId === this.schoolId) {
          this.schoolTimeZone = timeZone;
        }
      } catch (error) {
        if (schoolId === this.schoolId) {
          this.errorMessage = error.message;
        }
      }
    },
  },
};
</script>

<style scoped>
.availability-viewer {
  margin-top: 16px;
}

.timezone {
  color: #667085;
  font-size: 0.9rem;
}

.day-row {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.time-windows {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.time-window {
  padding: 5px 10px;
  border-radius: 6px;
  background: #e6f6ee;
  color: #176b49;
}

.unavailable {
  color: #777;
}

.error-message {
  color: #b42318;
}

@media (max-width: 600px) {
  .day-row {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}
</style>
