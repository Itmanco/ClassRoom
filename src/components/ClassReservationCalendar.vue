<template>
  <div class="reservation-modal-backdrop" @click.self="$emit('close')">
    <section class="reservation-modal" role="dialog" aria-modal="true" :aria-label="$t('reservationCalendar.title')">
      <header class="reservation-modal-header">
        <div>
          <h2>{{ $t('reservationCalendar.title') }}</h2>
          <p>{{ classItem.name || classItem.code }}</p>
        </div>
        <button type="button" @click="$emit('close')">{{ $t('reservationCalendar.close') }}</button>
      </header>
      <p v-if="loadingZone || loading" role="status">{{ $t('reservationCalendar.loading') }}</p>
      <p v-if="error" role="alert" class="reservation-error">{{ $t('reservationCalendar.loadError') }}: {{ error }}</p>
      <template v-if="timeZone">
        <div class="reservation-filters">
          <label v-for="status in statuses" :key="status">
            <input type="checkbox" :checked="visibleStatuses.includes(status)" @change="toggleStatus(status, $event.target.checked)" />
            {{ $t(`reservationCalendar.${status}`) }} ({{ counts[status] }})
          </label>
        </div>
        <ReservationCalendar
          :reservations="visibleReservations"
          :selected-date="selectedDate"
          :time-zone="timeZone"
          :start-date="classItem.startDate || ''"
          :end-date="classItem.endDate || ''"
          @update:selected-date="selectedDate = $event"
          @month-change="onMonthChange"
        />
        <section class="reservation-day-details">
          <h3>{{ selectedDate || $t('reservationCalendar.selectDate') }}</h3>
          <p v-if="!selectedReservations.length">{{ $t('reservationCalendar.noReservations') }}</p>
          <ul v-else>
            <li v-for="item in selectedReservations" :key="item.id">
              <strong>{{ item.localStartTime }}–{{ item.localEndTime }}</strong>
              <span>{{ roomName(item.roomId) }}</span>
              <span>{{ $t(`reservationCalendar.${item.calendarStatus}`) }}</span>
              <span v-if="item.seriesId">{{ $t('reservationCalendar.weeklySeries') }}</span>
              <div class="calendar-reservation-notes">
                <strong>{{ $t('reservationCalendar.notes') }}:</strong>
                <span>{{ item.notes || $t('reservationCalendar.noNotes') }}</span>
              </div>
            </li>
          </ul>
        </section>
      </template>
    </section>
  </div>
</template>

<script>
import ReservationCalendar from "./ReservationCalendar.vue";
import {watchClassMonthlyRoomReservations} from "../services/roomReservationService";
import {getSchoolTimeZone} from "../services/schoolSettingsService";

export default {
  name: "ClassReservationCalendar",
  components: {ReservationCalendar},
  props: {
    schoolId: {type: String, required: true},
    classItem: {type: Object, required: true},
    rooms: {type: Array, default: () => []},
  },
  emits: ["close"],
  data() {
    return {
      timeZone: "",
      loadingZone: true,
      loading: false,
      error: "",
      selectedDate: "",
      reservations: [],
      monthRange: null,
      unsubscribe: null,
      visibleStatuses: ["upcoming", "past", "cancelled"],
      nowMillis: Date.now(),
      clock: null,
      requestId: 0,
    };
  },
  computed: {
    statuses() { return ["upcoming", "past", "cancelled"]; },
    classifiedReservations() {
      return this.reservations.map((reservation) => {
        const start = reservation.startsAt?.toMillis?.() ??
          (reservation.startsAt?.seconds != null ? reservation.startsAt.seconds * 1000 : NaN);
        const calendarStatus = reservation.status === "cancelled" ? "cancelled" :
          (Number.isFinite(start) && start <= this.nowMillis ? "past" : "upcoming");
        return {...reservation, calendarStatus};
      });
    },
    counts() {
      return this.classifiedReservations.reduce((result, item) => {
        result[item.calendarStatus]++;
        return result;
      }, {upcoming: 0, past: 0, cancelled: 0});
    },
    visibleReservations() {
      return this.classifiedReservations.filter((item) =>
        this.visibleStatuses.includes(item.calendarStatus));
    },
    selectedReservations() {
      return this.visibleReservations.filter((item) => item.localDate === this.selectedDate)
        .sort((a, b) => (a.localStartTime || "").localeCompare(b.localStartTime || ""));
    },
  },
  watch: {
    schoolId() { this.initialize(); },
    "classItem.id"() { this.initialize(); },
  },
  mounted() {
    this.initialize();
    this.clock = setInterval(() => { this.nowMillis = Date.now(); }, 30000);
  },
  beforeUnmount() {
    this.requestId++;
    this.stopListener();
    if (this.clock) clearInterval(this.clock);
  },
  methods: {
    stopListener() {
      if (this.unsubscribe) this.unsubscribe();
      this.unsubscribe = null;
    },
    async initialize() {
      const id = ++this.requestId;
      this.stopListener();
      this.timeZone = "";
      this.loadingZone = true;
      this.error = "";
      this.reservations = [];
      this.monthRange = null;
      try {
        const zone = await getSchoolTimeZone(this.schoolId);
        if (id !== this.requestId) return;
        if (!zone) throw new Error("School timezone unavailable");
        this.timeZone = zone;
      } catch (error) {
        if (id === this.requestId) this.error = error.message;
      } finally {
        if (id === this.requestId) this.loadingZone = false;
      }
    },
    onMonthChange(range) {
      this.monthRange = range;
      this.stopListener();
      this.loading = true;
      this.error = "";
      this.reservations = [];
      const id = ++this.requestId;
      try {
        this.unsubscribe = watchClassMonthlyRoomReservations(
          this.schoolId, this.classItem.id, range.first, range.last,
          (items) => {
            if (id !== this.requestId) return;
            this.reservations = items;
            this.loading = false;
          },
          (error) => {
            if (id !== this.requestId) return;
            this.error = error.message;
            this.loading = false;
          },
        );
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    toggleStatus(status, enabled) {
      this.visibleStatuses = enabled ? [...this.visibleStatuses, status] :
        this.visibleStatuses.filter((item) => item !== status);
    },
    roomName(id) {
      const room = this.rooms.find((item) => item.id === id);
      return room ? (room.name || room.code || id) : id;
    },
  },
};
</script>

<style scoped>
.reservation-modal-backdrop {position: fixed; inset: 0; z-index: 1000; background: #0009; display: flex; align-items: center; justify-content: center; padding: 16px;}
.reservation-modal {background: #fff; color: #1e293b; border-radius: 12px; width: min(1100px, 100%); max-height: 94vh; overflow-y: auto; padding: 20px;}
.reservation-modal-header {display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;}
.reservation-modal-header h2 {margin: 0;}
.reservation-modal-header p {margin: 5px 0 15px;}
.reservation-modal-header button {padding: 8px 12px; cursor: pointer;}
.reservation-filters {display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 14px;}
.reservation-filters label {display: flex; align-items: center; gap: 5px;}
.reservation-day-details {margin-top: 18px; border-top: 1px solid #cbd5e1; padding-top: 12px;}
.reservation-day-details ul {padding-left: 18px;}
.reservation-day-details li {display: flex; flex-wrap: wrap; gap: 12px; padding: 8px 0; border-bottom: 1px solid #e2e8f0;}
.calendar-reservation-notes {width: 100%; white-space: pre-wrap; overflow-wrap: anywhere;}
.reservation-error {color: #b91c1c;}
</style>
