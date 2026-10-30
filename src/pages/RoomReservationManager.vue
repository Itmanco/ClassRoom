<template>
  <div class="page">
    <header class="page-header">
      <div>
        <h1>📅 {{ $t("reservations.title") }}</h1>
        <p>{{ $t("reservations.description") }}</p>
      </div>
    </header>

    <section class="panel creation-panel"
      :class="{'creation-panel--expanded': showCreateForm}"
    >
      <div class="creation-header">
        <h2>{{ $t("reservations.form.title") }}</h2>

        <button
          type="button"
          class="primary-button"
          :aria-expanded="showCreateForm"
          @click="toggleCreateForm"
        >
          {{
            showCreateForm
              ? $t("reservations.timeline.hideForm")
              : $t("reservations.timeline.newReservation")
          }}
        </button>
      </div>

      <div v-if="showCreateForm" class="creation-content">
        <form
          v-if="!loadingClasses && eligibleClasses.length > 0"
          class="reservation-form"
          @submit.prevent="submitReservation"
        >
          <div class="full-width">
            <label for="reservation-mode">
              {{ $t("reservations.form.reservationType") }}
            </label>

            <select
              id="reservation-mode"
              v-model="reservationMode"
              :disabled="saving"
            >
              <option value="single">
                {{ $t("reservations.form.single") }}
              </option>
              <option value="weekly">
                {{ $t("reservations.form.weekly") }}
              </option>
            </select>
          </div>
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

          <label
            v-if="reservationMode === 'single'"
            class="full-width"
          >
            {{ $t("reservations.form.date") }}

            <input
              v-model="form.localDate"
              type="date"
              :disabled="saving"
              required
            />
          </label>

          <div
            v-if="reservationMode === 'weekly'"
            class="full-width"
          >
            <p>
              {{ $t("reservations.form.classPeriod") }}:
              <strong v-if="selectedClass?.startDate && selectedClass?.endDate">
                {{ selectedClass.startDate }} — {{ selectedClass.endDate }}
              </strong>
              <span v-else>
                {{ $t("reservations.messages.classPeriodRequired") }}
              </span>
            </p>

            <fieldset class="weekday-fieldset" :disabled="saving">
              <legend>
                {{ $t("reservations.form.weekdays") }}
              </legend>

              <label
                v-for="day in weekdayOptions"
                :key="day.value"
              >
                <input
                  v-model="selectedWeekdays"
                  type="checkbox"
                  :value="day.value"
                />
                {{ $t(`reservations.weekdays.${day.key}`) }}
              </label>
            </fieldset>

            <p>
              {{ $t("reservations.form.weeklyNotice") }}
            </p>
          </div>

          <label>
            {{ $t("reservations.form.startTime") }}

            <input
              v-model="form.localStartTime"
              type="time"
              step="900"
              :disabled="saving"
              required
            />
          </label>

          <label>
            {{ $t("reservations.form.endTime") }}

            <input
              v-model="form.localEndTime"
              type="time"
              step="900"
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
              !schoolTimeZone ||
              (reservationMode === 'weekly' &&
                (!selectedClass.startDate ||
                  !selectedClass.endDate ||
                  selectedWeekdays.length === 0))
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
      </div>

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
      <div class="timeline-toolbar">
        <h2>{{ $t("reservations.timeline.title") }}</h2>

        <div class="date-controls">
          <button type="button" @click="changeDate(-1)">
            {{ $t("reservations.timeline.previous") }}
          </button>

          <input
            v-model="selectedDate"
            type="date"
            :disabled="!schoolTimeZone"
            :aria-label="$t('reservations.timeline.date')"
          />

          <button type="button" @click="goToToday">
            {{ $t("reservations.timeline.today") }}
          </button>

          <button type="button" @click="changeDate(1)">
            {{ $t("reservations.timeline.next") }}
          </button>
        </div>
      </div>

      <div class="timeline-summary">
        <span>
          {{ $t("reservations.timeline.total") }}:
          <strong>{{ reservations.length }}</strong>
        </span>

        <span>
          {{ $t("reservations.timeline.occupied") }}:
          <strong>{{ occupiedRoomCount }}</strong>
        </span>

        <span>
          {{ $t("reservations.timeline.available") }}:
          <strong>{{ availableRoomCount }}</strong>
        </span>
      </div>

      <p v-if="loadingReservations || loadingOperatingHours">
        {{ $t("reservations.list.loading") }}
      </p>

      <p v-else-if="reservationsError" class="error-message">
        {{ reservationsError }}
      </p>

      <p v-else-if="operatingHoursError" class="error-message">
        {{ operatingHoursError }}
      </p>

      <p v-else-if="!operatingHours" class="notice">
        {{ $t("reservations.timeline.notConfigured") }}
      </p>

      <p v-else-if="dailyOperatingIntervals.length === 0" class="notice">
        {{ $t("reservations.timeline.closed") }}
      </p>

      <RoomReservationTimeline
        v-else
        :rooms="activeRooms"
        :classes="classes"
        :reservations="reservations"
        :operating-intervals="dailyOperatingIntervals"
        @select-reservation="selectReservation"
      />

      <div v-if="selectedReservation" class="reservation-async confirmReservationCancellation() {details">
        <h3>{{ $t("reservations.timeline.details") }}</h3>

        <p>
          <strong>{{ $t("reservations.list.class") }}:</strong>
          {{ reservationClassLabel(selectedReservation) }}
        </p>

        <p>
          <strong>{{ $t("reservations.list.room") }}:</strong>
          {{ reservationRoomLabel(selectedReservation) }}
        </p>

        <p>
          <strong>{{ $t("reservations.list.date") }}:</strong>
          {{ selectedReservation.localDate }}
        </p>

        <p>
          <strong>{{ $t("reservations.list.time") }}:</strong>
          {{ selectedReservation.localStartTime }}–
          {{ selectedReservation.localEndTime }}
          ({{ schoolTimeZone }})
        </p>

        <p>
          <strong>{{ $t("reservations.list.status") }}:</strong>
          {{ selectedReservation.status }}
        </p>

        <div
          v-if="canEditSelectedReservation"
          class="reservation-editing"
        >
          <h4>{{ $t("reservations.editing.title") }}</h4>

          <button
            v-if="!editingReservation"
            type="button"
            class="primary-button"
            :disabled="cancellingReservation || savingReservationEdit"
            @click="startReservationEdit"
          >
            {{ $t("reservations.editing.open") }}
          </button>

          <form
            v-else
            class="reservation-form"
            @submit.prevent="submitReservationEdit"
          >
            <div class="full-width">
              <label class="cancellation-option">
                <input
                  v-model="editScope"
                  type="radio"
                  value="single"
                  :disabled="savingReservationEdit"
                />
                {{ $t("reservations.editing.single") }}
              </label>

              <label
                v-if="selectedReservationHasSeries"
                class="cancellation-option"
              >
                <input
                  v-model="editScope"
                  type="radio"
                  value="future-series"
                  :disabled="savingReservationEdit"
                />
                {{ $t("reservations.editing.futureSeries") }}
              </label>
            </div>

            <label>
              {{ $t("reservations.form.startTime") }}
              <input
                v-model="editForm.startTime"
                type="time"
                step="900"
                :disabled="savingReservationEdit"
                required
              />
            </label>

            <label>
              {{ $t("reservations.form.endTime") }}
              <input
                v-model="editForm.endTime"
                type="time"
                step="900"
                :disabled="savingReservationEdit"
                required
              />
            </label>

            <p class="timezone-info full-width">
              {{ $t("rooms.availability.timezone") }}:
              <strong>{{ schoolTimeZone }}</strong>
            </p>

            <div class="form-actions full-width">
              <button
                type="submit"
                class="primary-button"
                :disabled="savingReservationEdit"
              >
                {{
                  savingReservationEdit
                    ? $t("reservations.editing.saving")
                    : $t("reservations.editing.save")
                }}
              </button>

              <button
                type="button"
                :disabled="savingReservationEdit"
                @click="editingReservation = false"
              >
                {{ $t("reservations.editing.discard") }}
              </button>
            </div>
          </form>

          <p v-if="editError" class="error-message">
            {{ editError }}
          </p>
        </div>

        <div
          v-if="canCancelSelectedReservation && !editingReservation"
          class="reservation-cancellation"
        >
          <h4>{{ $t("reservations.cancellation.title") }}</h4>

          <label class="cancellation-option">
            <input
              v-model="cancellationScope"
              type="radio"
              value="single"
              :disabled="cancellingReservation"
            />
            {{ $t("reservations.cancellation.single") }}
          </label>

          <label
            v-if="selectedReservationHasSeries"
            class="cancellation-option"
          >
            <input
              v-model="cancellationScope"
              type="radio"
              value="future-series"
              :disabled="cancellingReservation"
            />
            {{ $t("reservations.cancellation.futureSeries") }}
          </label>

          <button
            type="button"
            class="cancel-reservation-button"
            :disabled="cancellingReservation"
            @click="confirmReservationCancellation"
          >
            {{ $t("reservations.cancellation.submit") }}
          </button>
        </div>

        <p v-if="cancellationError" class="error-message">
          {{ cancellationError }}
        </p>

        <button
          type="button"
          :disabled="cancellingReservation || savingReservationEdit"
          @click="selectedReservation = null"
        >
          {{ $t("reservations.timeline.close") }}
        </button>
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
  createWeeklyRoomReservations,
  cancelRoomReservations,
  updateRoomReservations,
  watchDailyRoomReservations,
} from "../services/roomReservationService";

import {
  getSchoolTimeZone,
  getSchoolOperatingHours,
} from "../services/schoolSettingsService";

import RoomReservationTimeline from
  "../components/RoomReservationTimeline.vue";

export default {
  name: "RoomReservationManager",

  components: {
    RoomReservationTimeline,
  },

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
      operatingHours: null,
      loadingOperatingHours: false,
      operatingHoursError: "",
      selectedDate: "",
      showCreateForm: false,
      selectedReservation: null,
      reservationListenerVersion: 0,

      cancellingReservation: false,
      cancellationScope: "single",
      cancellationError: "",

      editingReservation: false,
      savingReservationEdit: false,
      editScope: "single",
      editError: "",
      editForm: {
        startTime: "",
        endTime: "",
      },

      reservationMode: "single",
      selectedWeekdays: [],

      weekdayOptions: [
        {value: 1, key: "monday"},
        {value: 2, key: "tuesday"},
        {value: 3, key: "wednesday"},
        {value: 4, key: "thursday"},
        {value: 5, key: "friday"},
        {value: 6, key: "saturday"},
        {value: 7, key: "sunday"},
      ],

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

    activeRooms() {
      return this.rooms.filter((room) => room.active !== false);
    },

    dailyOperatingIntervals() {
      if (!this.selectedDate || !this.operatingHours) {
        return [];
      }

      const [year, month, day] = this.selectedDate
        .split("-")
        .map(Number);

      const weekday = new Date(
        Date.UTC(year, month - 1, day),
      ).getUTCDay();

      const keys = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];

      return this.operatingHours[keys[weekday]] || [];
    },

    occupiedRoomCount() {
      return new Set(
        this.reservations.map((reservation) => reservation.roomId),
      ).size;
    },

    availableRoomCount() {
      return Math.max(
        0,
        this.activeRooms.length - this.occupiedRoomCount,
      );
    },

    canCancelSelectedReservation() {
      const reservation = this.selectedReservation;

      if (
        !reservation ||
        reservation.status !== "active"
      ) {
        return false;
      }

      const startsAt = reservation.startsAt?.toDate?.();

      return startsAt instanceof Date &&
        Number.isFinite(startsAt.getTime()) &&
        startsAt.getTime() > Date.now();
    },

    canEditSelectedReservation() {
      return this.canCancelSelectedReservation;
    },

    selectedReservationHasSeries() {
      return Boolean(
        this.selectedReservation?.seriesId,
      );
    },
  },

  watch: {
    schoolId() {
      this.startListeners();
    },

    selectedDate() {
      this.selectedReservation = null;
      this.cancellationScope = "single";
      this.cancellationError = "";
      this.editingReservation = false;
      this.editScope = "single";
      this.editError = "";

      if (this.selectedDate && !this.saving) {
        this.form.localDate = this.selectedDate;
      }

      this.startDailyReservationsListener();
    },

    "form.localDate"() {
      if (this.reservationMode === "single") {
        this.suggestReservationTimes();
      }
    },

    reservationMode(newMode) {
      this.message = "";
      this.errorMessage = "";

      if (newMode === "single") {
        this.form.localDate = this.selectedDate;
        this.suggestReservationTimes();
      } else {
        this.form.localStartTime = "";
        this.form.localEndTime = "";
      }
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
    selectReservation(reservation) {
      if (this.cancellingReservation || this.savingReservationEdit) {
        return;
      }

      this.selectedReservation = reservation;
      this.cancellationScope = "single";
      this.cancellationError = "";

      this.editingReservation = false;
      this.editScope = "single";
      this.editError = "";

      this.editForm = {
        startTime: reservation.localStartTime,
        endTime: reservation.localEndTime,
      };
    },

    startReservationEdit() {
      if (
        !this.canEditSelectedReservation ||
        this.cancellingReservation ||
        this.savingReservationEdit
      ) {
        return;
      }

      const reservation = this.selectedReservation;

      this.editForm = {
        startTime: reservation.localStartTime,
        endTime: reservation.localEndTime,
      };

      this.editScope = "single";
      this.editError = "";
      this.cancellationError = "";
      this.editingReservation = true;
    },

    async submitReservationEdit() {
      if (
        !this.editingReservation ||
        !this.canEditSelectedReservation ||
        !this.selectedReservation ||
        this.savingReservationEdit ||
        this.cancellingReservation
      ) {
        return;
      }

      const reservation = this.selectedReservation;
      const schoolId = this.schoolId;
      const reservationId = reservation.id;
      const scope = this.editScope;
      const startTime = this.editForm.startTime;
      const endTime = this.editForm.endTime;

      if (
        !schoolId ||
        !reservationId ||
        !["single", "future-series"].includes(scope) ||
        (scope === "future-series" && !reservation.seriesId)
      ) {
        return;
      }

      if (
        !startTime ||
        !endTime ||
        startTime >= endTime
      ) {
        this.editError = this.$t(
          "reservations.editing.invalidTime",
        );
        return;
      }

      const confirmed = window.confirm(
        this.$t(
          scope === "future-series" ?
            "reservations.editing.confirmFutureSeries" :
            "reservations.editing.confirmSingle",
          {
            date: reservation.localDate,
            startTime,
            endTime,
          },
        ),
      );

      if (!confirmed) {
        return;
      }

      this.savingReservationEdit = true;
      this.editError = "";
      this.message = "";

      try {
        const result = await updateRoomReservations(
          schoolId,
          reservationId,
          scope,
          startTime,
          endTime,
          reservation.localDate,
        );

        if (this.schoolId !== schoolId) {
          return;
        }

        this.editingReservation = false;
        this.selectedReservation = null;
        this.editScope = "single";

        this.message = this.$t(
          "reservations.editing.success",
          {count: result.updatedCount},
        );
      } catch (error) {
        if (this.schoolId === schoolId) {
          this.editError = error.message || String(error);
        }
      } finally {
        this.savingReservationEdit = false;
      }
    },

    async confirmReservationCancellation() {
      if (
        !this.canCancelSelectedReservation ||
        !this.selectedReservation ||
        this.savingReservationEdit ||
        this.editingReservation
      ) {
        return;
      }

      const scope = this.cancellationScope;

      if (
        scope !== "single" &&
        scope !== "future-series"
      ) {
        return;
      }

      if (
        scope === "future-series" &&
        !this.selectedReservationHasSeries
      ) {
        return;
      }

      const reservation = this.selectedReservation;
      const schoolId = this.schoolId;
      const reservationId = reservation.id;

      if (!schoolId || !reservationId) {
        return;
      }

      const confirmed = window.confirm(
        this.$t(
          scope === "future-series" ?
            "reservations.cancellation.confirmFutureSeries" :
            "reservations.cancellation.confirmSingle",
          {
            date: reservation.localDate,
            startTime: reservation.localStartTime,
            endTime: reservation.localEndTime,
          },
        ),
      );

      if (!confirmed) {
        return;
      }

      this.cancellingReservation = true;
      this.cancellationError = "";
      this.message = "";

      try {
        const result = await cancelRoomReservations(
          schoolId,
          reservationId,
          scope,
        );

        if (this.schoolId !== schoolId) {
          return;
        }

        this.selectedReservation = null;
        this.cancellationScope = "single";

        this.message = this.$t(
          "reservations.cancellation.success",
          {count: result.cancelledCount},
        );
      } catch (error) {
        if (this.schoolId === schoolId) {
          this.cancellationError =
            error.message || String(error);
        }
      } finally {
        this.cancellingReservation = false;
      }
    },

    schoolToday() {
      if (!this.schoolTimeZone) {
        return "";
      }

      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: this.schoolTimeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).formatToParts(new Date());

      const part = (type) =>
        parts.find((item) => item.type === type)?.value;

      return `${part("year")}-${part("month")}-${part("day")}`;
    },

    changeDate(days) {
      if (!this.selectedDate) {
        return;
      }

      const [year, month, day] = this.selectedDate
        .split("-")
        .map(Number);

      const date = new Date(Date.UTC(year, month - 1, day));
      date.setUTCDate(date.getUTCDate() + days);

      this.selectedDate = date.toISOString().slice(0, 10);
    },

    goToToday() {
      this.selectedDate = this.schoolToday();
    },

    startDailyReservationsListener() {
      this.stopReservationsListener();

      const version = ++this.reservationListenerVersion;
      const schoolId = this.schoolId;
      const date = this.selectedDate;

      this.reservations = [];
      this.reservationsError = "";

      if (!schoolId || !date) {
        this.loadingReservations = false;
        return;
      }

      this.loadingReservations = true;

      this.unsubscribeReservations = watchDailyRoomReservations(
        schoolId,
        date,
        (items) => {
          if (
            version !== this.reservationListenerVersion ||
            this.schoolId !== schoolId ||
            this.selectedDate !== date
          ) {
            return;
          }

          this.reservations = items;
          this.loadingReservations = false;
        },
        (error) => {
          if (
            version !== this.reservationListenerVersion ||
            this.schoolId !== schoolId ||
            this.selectedDate !== date
          ) {
            return;
          }

          this.reservationsError = error.message;
          this.loadingReservations = false;
        },
      );
    },

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
      this.reservationListenerVersion += 1;
      this.selectedDate = "";
      this.selectedReservation = null;
      this.showCreateForm = false;
      this.operatingHours = null;
      this.operatingHoursError = "";
      this.loadingOperatingHours = false;
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
      this.loadOperatingHours();

      this.loadingClasses = true;
      this.loadingRooms = true;

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

      const isWeekly = this.reservationMode === "weekly";

      if (isWeekly) {
        if (!this.selectedClass.startDate || !this.selectedClass.endDate) {
          this.errorMessage = this.$t(
            "reservations.messages.classPeriodRequired",
          );
          return;
        }

        if (this.selectedWeekdays.length === 0) {
          this.errorMessage = this.$t(
            "reservations.messages.selectWeekday",
          );
          return;
        }
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
        let result;

        if (isWeekly) {
          result = await createWeeklyRoomReservations(
            schoolId,
            {
              classId: reservation.classId,
              roomId: reservation.roomId,
              weekdays: [...this.selectedWeekdays],
              localStartTime: reservation.localStartTime,
              localEndTime: reservation.localEndTime,
            },
          );
        } else {
          result = await createRoomReservation(
            schoolId,
            reservation,
          );
        }

        if (this.schoolId !== schoolId) {
          return;
        }

        this.message = isWeekly
          ? this.$t("reservations.messages.weeklyCreated", {
            count: result.occurrenceCount,
          })
          : this.$t("reservations.messages.created");

        this.form.localDate = this.selectedDate;
        this.form.localStartTime = "";
        this.form.localEndTime = "";

        if (isWeekly) {
          this.selectedWeekdays = [];
        }
      } catch (error) {
        if (this.schoolId === schoolId) {
          this.errorMessage = this.reservationErrorMessage(error);
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
        this.selectedDate = this.schoolToday();
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

    async loadOperatingHours() {
      const schoolId = this.schoolId;

      this.loadingOperatingHours = true;
      this.operatingHoursError = "";

      try {
        const hours = await getSchoolOperatingHours(schoolId);

        if (this.schoolId !== schoolId) {
          return;
        }

        this.operatingHours = hours;
        if (this.showCreateForm &&
          this.reservationMode === "single" &&
          this.form.localDate
        ) {
          this.suggestReservationTimes();
        }
      } catch (error) {
        if (this.schoolId === schoolId) {
          this.operatingHoursError = error.message;
        }
      } finally {
        if (this.schoolId === schoolId) {
          this.loadingOperatingHours = false;
        }
      }
    },

    reservationErrorMessage(error) {
      const message = error?.message || "";

      const errorTranslations = {
        OUTSIDE_SCHOOL_OPERATING_HOURS:
          "reservations.messages.outsideOperatingHours",
        ROOM_RESERVATION_CONFLICT:
          "reservations.messages.reservationConflict",
        SCHOOL_OPERATING_HOURS_NOT_CONFIGURED:
          "reservations.messages.operatingHoursNotConfigured",
        INVALID_CLASS_PERIOD:
          "reservations.messages.invalidClassPeriod",
        INVALID_RESERVATION_WEEKDAYS:
          "reservations.messages.invalidWeekdays",
        RESERVATION_SERIES_TOO_LARGE:
          "reservations.messages.seriesTooLarge",
        NO_RESERVATION_OCCURRENCES:
          "reservations.messages.noOccurrences",
        "Start time must be before end time.":
          "reservations.messages.invalidTimeRange",
      };

      const matchingError = Object.entries(errorTranslations)
        .find(([code]) => message.includes(code));

      if (matchingError) {
        return this.$t(matchingError[1]);
      }

      return this.$t("reservations.messages.createError", {
        error: message,
      });
    },

    toggleCreateForm() {
      this.showCreateForm = !this.showCreateForm;

      if (this.showCreateForm) {
        if (this.selectedDate) {
          this.form.localDate = this.selectedDate;
        }

        if (this.reservationMode === "single") {
          this.suggestReservationTimes();
        }

        this.message = "";
        this.errorMessage = "";
      }
    },

    getOperatingIntervalsForDate(localDate) {
      if (!localDate || !this.operatingHours) {
        return [];
      }

      const [year, month, day] = localDate.split("-").map(Number);

      const weekday = new Date(
        Date.UTC(year, month - 1, day),
      ).getUTCDay();

      const weekdayKeys = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];

      return [...(this.operatingHours[weekdayKeys[weekday]] || [])]
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
    },

    suggestReservationTimes() {
      const intervals = this.getOperatingIntervalsForDate(
        this.form.localDate,
      );

      if (intervals.length === 0) {
        this.form.localStartTime = "";
        this.form.localEndTime = "";
        return;
      }

      const firstInterval = intervals[0];

      this.form.localStartTime = firstInterval.startTime;
      this.form.localEndTime = firstInterval.endTime;
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

.weekday-fieldset {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 14px;
  min-width: 0;
}

.weekday-fieldset legend {
  padding: 0 6px;
  font-weight: 600;
}

.reservation-form .weekday-fieldset label {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font-weight: 400;
  cursor: pointer;
}

.reservation-form .weekday-fieldset input[type="checkbox"] {
  width: auto;
  padding: 0;
  margin: 0;
  flex-shrink: 0;
  accent-color: #42b883;
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

.timeline-toolbar,
.date-controls,
.timeline-summary {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.timeline-toolbar {
  justify-content: space-between;
  margin-bottom: 18px;
}

.timeline-toolbar h2 {
  margin: 0;
}

.date-controls input {
  padding: 9px;
  border: 1px solid #bbb;
  border-radius: 6px;
}

.timeline-summary {
  margin-bottom: 18px;
  color: #444;
}

.timeline-summary span {
  padding: 8px 12px;
  background: #f5f7f8;
  border-radius: 6px;
}

.creation-content {
  margin-top: 20px;
}

.reservation-details {
  margin-top: 20px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f8faf9;
}

/* Compact reservation creation card */
.creation-panel {
  padding: 12px 16px;
  margin-bottom: 12px;
}

.creation-panel--expanded {
  padding: 20px 24px;
  margin-bottom: 24px;
}

.creation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.creation-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.creation-header .primary-button {
  flex-shrink: 0;
}

.creation-content {
  margin-top: 20px;
}

.reservation-cancellation {
  margin: 20px 0;
  padding: 16px;
  border: 1px solid #e4c7c7;
  border-radius: 8px;
  background: #fff9f9;
}

.reservation-cancellation h4 {
  margin: 0 0 12px;
  color: #8b2525;
}

.cancellation-option {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  cursor: pointer;
}

.cancellation-option input {
  margin: 0;
  accent-color: #b42318;
}

.cancel-reservation-button {
  margin-top: 8px;
  background: #b42318;
  color: white;
}

.cancel-reservation-button:hover:not(:disabled) {
  background: #912018;
}

@media (max-width: 480px) {
  .creation-header {
    flex-wrap: wrap;
  }

  .creation-header .primary-button {
    width: 100%;
  }
}

@media (max-width: 760px) {
  .reservation-form {
    grid-template-columns: 1fr;
  }
}
</style>
