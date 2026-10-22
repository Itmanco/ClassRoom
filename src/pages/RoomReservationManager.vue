<template>
  <div class="page">
    <header class="page-header">
      <div>
        <h1>📅 {{ $t("reservations.title") }}</h1>
        <p>{{ $t("reservations.description") }}</p>
      </div>
    </header>

    <section class="panel">
      <h2>{{ $t("reservations.form.title") }}</h2>

      <p v-if="loadingClasses">
        {{ $t("reservations.messages.loadingClasses") }}
      </p>

      <p
        v-else-if="eligibleClasses.length === 0"
        class="notice"
      >
        {{ $t("reservations.messages.noEligibleClasses") }}
      </p>

      <form
        v-else
        class="reservation-form"
        @submit.prevent="submitReservation"
      >
        <label>
          {{ $t("reservations.form.class") }}

          <select
            v-model="form.classId"
            :disabled="saving"
            required
          >
            <option disabled value="">
              {{ $t("reservations.form.selectClass") }}
            </option>

            <option
              v-for="item in eligibleClasses"
              :key="item.id"
              :value="item.id"
            >
              {{ classLabel(item) }}
            </option>
          </select>
        </label>

        <label>
          {{ $t("reservations.form.room") }}

          <input
            :value="roomLabel"
            type="text"
            disabled
          />
        </label>

        <label class="full-width">
          {{ $t("reservations.form.date") }}

          <input
            v-model="form.localDate"
            type="date"
            :disabled="saving"
            required
          />
        </label>

        <label>
          {{ $t("reservations.form.startTime") }}

          <input
            v-model="form.localStartTime"
            type="time"
            :disabled="saving"
            required
          />
        </label>

        <label>
          {{ $t("reservations.form.endTime") }}

          <input
            v-model="form.localEndTime"
            type="time"
            :disabled="saving"
            required
          />
        </label>

        <p class="timezone-info">
          {{ $t("rooms.availability.timezone") }}:

          <span v-if="loadingTimeZone">
            ...
          </span>

          <strong v-else-if="schoolTimeZone">
            {{ schoolTimeZone }}
          </strong>

          <span v-else>
            —
          </span>
        </p>

        <p
          v-if="timeZoneError"
          class="error-message"
        >
          {{ timeZoneError }}
        </p>

        <div class="form-actions">
          <button
            class="primary-button"
            type="submit"
            :disabled="
              saving ||
              !selectedClass ||
              !selectedRoom ||
              selectedRoom.active === false ||
              loadingTimeZone ||
              loadingClasses ||
              loadingRooms ||
              !schoolTimeZone
            "
          >
            {{
              saving
                ? $t("reservations.form.creating")
                : $t("reservations.form.create")
            }}
          </button>
        </div>
      </form>

      <p
        v-if="message"
        class="success-message"
      >
        {{ message }}
      </p>

      <p
        v-if="errorMessage"
        class="error-message"
      >
        {{ errorMessage }}
      </p>
    </section>
    <section class="panel">
      <h2>{{ $t("reservations.list.title") }}</h2>

      <p v-if="loadingReservations">
        {{ $t("reservations.list.loading") }}
      </p>

      <p
        v-else-if="reservationsError"
        class="error-message"
      >
        {{ reservationsError }}
      </p>

      <p
        v-else-if="reservations.length === 0"
        class="empty-state"
      >
        {{ $t("reservations.list.empty") }}
      </p>

      <div
        v-else
        class="table-wrapper"
      >
        <table class="reservations-table">
          <thead>
            <tr>
              <th>{{ $t("reservations.list.date") }}</th>
              <th>{{ $t("reservations.list.class") }}</th>
              <th>{{ $t("reservations.list.room") }}</th>
              <th>{{ $t("reservations.list.time") }}</th>
              <th>{{ $t("reservations.list.status") }}</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="reservation in reservations"
              :key="reservation.id"
            >
              <td>{{ reservation.localDate }}</td>

              <td>
                {{ reservationClassLabel(reservation) }}
              </td>

              <td>
                {{ reservationRoomLabel(reservation) }}
              </td>

              <td>
                {{ reservation.localStartTime }}–{{ reservation.localEndTime }}
              </td>

              <td>
                {{ reservation.status }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import {
  watchClasses,
} from "../services/classService";

import {
  watchRooms,
} from "../services/roomService";

import {
  createRoomReservation,
  watchRoomReservations,
} from "../services/roomReservationService";

import {
  getSchoolTimeZone,
} from "../services/schoolSettingsService";

export default {
  name: "RoomReservationManager",

  props: {
    schoolId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      classes: [],
      rooms: [],
      reservations: [],
      loadingClasses: false,
      loadingRooms: false,
      loadingReservations: false,
      reservationsError: "",
      unsubscribeReservations: null,
      saving: false,
      message: "",
      errorMessage: "",
      unsubscribeClasses: null,
      unsubscribeRooms: null,
      schoolTimeZone: "",
      loadingTimeZone: true,
      timeZoneError: "",

      form: {
        classId: "",
        localDate: "",
        localStartTime: "",
        localEndTime: "",
      },
    };
  },

  computed: {
    eligibleClasses() {
      return this.classes.filter(
        (item) =>
          item.active !== false &&
          typeof item.roomId === "string" &&
          item.roomId,
      );
    },

    selectedClass() {
      return (
        this.eligibleClasses.find(
          (item) => item.id === this.form.classId,
        ) || null
      );
    },

    selectedRoom() {
      if (!this.selectedClass?.roomId) {
        return null;
      }

      return (
        this.rooms.find(
          (room) =>
            room.id === this.selectedClass.roomId,
        ) || null
      );
    },

    roomLabel() {
      if (!this.selectedClass) {
        return "";
      }

      if (this.loadingRooms) {
        return this.$t("reservations.form.loadingRoom");
      }

      if (!this.selectedRoom) {
        return this.selectedClass.roomId;
      }

      return `${this.selectedRoom.code} — ${this.selectedRoom.name}`;
    },
  },

  watch: {
    schoolId() {
      this.startListeners();
    },
  },

  mounted() {
    this.startListeners();
  },

  beforeUnmount() {
    this.stopClassesListener();
    this.stopRoomsListener();
    this.stopReservationsListener();
  },

  methods: {
    stopClassesListener() {
      if (this.unsubscribeClasses) {
        this.unsubscribeClasses();
        this.unsubscribeClasses = null;
      }
    },

    stopRoomsListener() {
      if (this.unsubscribeRooms) {
        this.unsubscribeRooms();
        this.unsubscribeRooms = null;
      }
    },

    stopReservationsListener() {
      if (this.unsubscribeReservations) {
        this.unsubscribeReservations();
        this.unsubscribeReservations = null;
      }
    },

    startListeners() {
      this.stopClassesListener();
      this.stopRoomsListener();
      this.stopReservationsListener();
      this.saving = false;

      this.reservations = [];
      this.loadingReservations = false;
      this.reservationsError = "";

      this.classes = [];
      this.rooms = [];
      this.form = {
        classId: "",
        localDate: "",
        localStartTime: "",
        localEndTime: "",
      };
      this.message = "";
      this.errorMessage = "";

      if (!this.schoolId) {
        this.loadingClasses = false;
        this.loadingRooms = false;
        this.schoolTimeZone = "";
        this.loadingTimeZone = false;
        this.timeZoneError = "";
        this.saving = false;
        return;
      }

      this.loadSchoolTimeZone();

      this.loadingClasses = true;
      this.loadingRooms = true;

      this.loadingReservations = true;

      const schoolId = this.schoolId;

      this.unsubscribeReservations = watchRoomReservations(
        schoolId,
        (items) => {
          if (this.schoolId !== schoolId) {
            return;
          }

          this.reservations = items;
          this.loadingReservations = false;
        },
        (error) => {
          if (this.schoolId !== schoolId) {
            return;
          }

          this.reservationsError = error.message;
          this.loadingReservations = false;
        },
      );

      this.unsubscribeClasses = watchClasses(
        this.schoolId,
        (items) => {
          this.classes = items;
          this.loadingClasses = false;
        },
        (error) => {
          this.errorMessage = this.$t(
            "reservations.messages.classesLoadError",
            {error: error.message},
          );
          this.loadingClasses = false;
        },
      );
      this.unsubscribeRooms = watchRooms(
        this.schoolId,
        (items) => {
          this.rooms = items;
          this.loadingRooms = false;
        },
        (error) => {
          this.errorMessage = this.$t(
            "reservations.messages.roomsLoadError",
            {error: error.message},
          );
          this.loadingRooms = false;
        },
      );
    },

    classLabel(item) {
      return (
        item.name ||
        item.code ||
        item.id
      );
    },

    reservationClassLabel(reservation) {
      const item = this.classes.find(
        (entry) => entry.id === reservation.classId,
      );

      return item ? this.classLabel(item) : reservation.classId;
    },

    reservationRoomLabel(reservation) {
      const room = this.rooms.find(
        (entry) => entry.id === reservation.roomId,
      );

      return room ?
        `${room.code} — ${room.name}` :
        reservation.roomId;
    },

    async submitReservation() {
      if (this.saving) {
        return;
      }
      this.message = "";
      this.errorMessage = "";

      if (this.loadingTimeZone || !this.schoolTimeZone) {
        this.errorMessage =
          this.timeZoneError ||
          this.$t("reservations.messages.timeZoneUnavailable");
        return;
      }

      if (!this.selectedClass) {
        this.errorMessage = this.$t(
          "reservations.messages.selectClass",
        );
        return;
      }

      if (!this.selectedRoom) {
        this.errorMessage = this.$t(
          "reservations.messages.roomNotFound",
        );
        return;
      }

      if (this.selectedRoom.active === false) {
        this.errorMessage = this.$t(
          "reservations.messages.roomInactive",
        );
        return;
      }

      const schoolId = this.schoolId;

      const reservation = {
        classId: this.selectedClass.id,
        roomId: this.selectedRoom.id,
        localDate: this.form.localDate,
        localStartTime: this.form.localStartTime,
        localEndTime: this.form.localEndTime,
      };

      this.saving = true;

      try {
        await createRoomReservation(
          schoolId,
          reservation,
        );

        if (this.schoolId !== schoolId) {
          return;
        }

        this.message = this.$t(
          "reservations.messages.created",
        );

        this.form.localDate = "";
        this.form.localStartTime = "";
        this.form.localEndTime = "";
      } catch (error) {
        if (this.schoolId === schoolId) {
          this.errorMessage = this.$t(
            "reservations.messages.createError",
            {error: error.message},
          );
        }
      } finally {
        if (this.schoolId === schoolId) {
          this.saving = false;
        }
      }
    },

    async loadSchoolTimeZone() {
      const schoolId = this.schoolId;

      this.schoolTimeZone = "";
      this.loadingTimeZone = true;
      this.timeZoneError = "";

      if (!schoolId) {
        this.loadingTimeZone = false;
        return;
      }

      try {
        const timeZone = await getSchoolTimeZone(schoolId);

        if (this.schoolId !== schoolId) {
          return;
        }

        if (!timeZone) {
          throw new Error("School timezone is not configured.");
        }

        this.schoolTimeZone = timeZone;
      } catch (error) {
        if (this.schoolId !== schoolId) {
          return;
        }

        this.timeZoneError = error.message;
      } finally {
        if (this.schoolId === schoolId) {
          this.loadingTimeZone = false;
        }
      }
    },
  },
};
</script>


<style scoped>
.page {
  max-width: 1050px;
  margin: 0 auto;
  padding: 32px;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  margin: 0 0 8px;
}

.page-header p {
  margin: 0;
  color: #5f6368;
}

.panel {
  margin-bottom: 24px;
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: white;
}

.reservation-form {
  display: grid;
  grid-template-columns:
    repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.reservation-form label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 600;
  min-width: 0;
}

.reservation-form input,
.reservation-form select {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #bbb;
  border-radius: 6px;
  font: inherit;
}

.reservation-form input:disabled {
  background: #f5f5f5;
  color: #555;
}

.form-actions {
  grid-column: 1 / -1;
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 14px;
  border: 0;
  border-radius: 7px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.primary-button {
  background: #42b883;
  color: white;
}

.success-message {
  color: #167347;
}

.error-message {
  color: #b42318;
}

.notice {
  padding: 12px;
  border-radius: 6px;
  background: #fff3cd;
  color: #664d03;
}

.timezone-info {
  grid-column: 1 / -1;
  margin: 0;
  color: #667;
  font-size: 0.9rem;
}

.reservation-form .full-width {
  grid-column: 1 / -1;
}

.empty-state {
  color: #666;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.reservations-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.reservations-table th,
.reservations-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

.reservations-table th {
  background: #f6f6f6;
  font-weight: 600;
}

.reservations-table td {
  vertical-align: middle;
}

@media (max-width: 760px) {
  .reservation-form {
    grid-template-columns: 1fr;
  }
}
</style>
