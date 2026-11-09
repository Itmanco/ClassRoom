<template>
  <section class="reservation-calendar" :aria-label="$t('reservationCalendar.title')">
    <header class="calendar-toolbar">
      <button type="button" @click="moveMonth(-1)" :aria-label="$t('reservationCalendar.previousMonth')">‹</button>
      <div class="calendar-month-picker">
        <button type="button" @click="pickerOpen = !pickerOpen" :aria-expanded="pickerOpen">
          {{ monthLabel }} ▾
        </button>
        <div v-if="pickerOpen" class="calendar-picker">
          <div class="calendar-picker-year">
            <button type="button" @click="pickerYear--" :aria-label="$t('reservationCalendar.previousYear')">‹</button>
            <strong>{{ pickerYear }}</strong>
            <button type="button" @click="pickerYear++" :aria-label="$t('reservationCalendar.nextYear')">›</button>
          </div>
          <div class="calendar-month-grid">
            <button v-for="(name, index) in monthNames" :key="index" type="button"
              :class="{selected: pickerYear === year && index === month}"
              @click="chooseMonth(index)">{{ name }}</button>
          </div>
        </div>
      </div>
      <button type="button" @click="moveMonth(1)" :aria-label="$t('reservationCalendar.nextMonth')">›</button>
      <button type="button" @click="goToday">{{ $t('reservationCalendar.today') }}</button>
    </header>

    <div class="calendar-grid" role="grid">
      <div v-for="day in weekdayNames" :key="day" class="calendar-weekday">{{ day }}</div>
      <template v-for="(cell, index) in cells" :key="index">
        <div v-if="!cell" class="calendar-empty" aria-hidden="true"></div>
        <button v-else type="button" class="calendar-day"
          :class="{selected: selectedDate === cell, 'outside-period': outsidePeriod(cell)}"
          :aria-label="cell" :aria-pressed="selectedDate === cell"
          @click="$emit('update:selectedDate', cell)">
          <span class="calendar-day-number">{{ Number(cell.slice(-2)) }}</span>
          <span v-for="reservation in reservationsForDate(cell).slice(0, 3)" :key="reservation.id"
            class="calendar-interval" :class="reservation.calendarStatus">
            {{ reservation.localStartTime }}–{{ reservation.localEndTime }}
          </span>
          <span v-if="reservationsForDate(cell).length > 3" class="calendar-more">
            +{{ reservationsForDate(cell).length - 3 }} {{ $t('reservationCalendar.more') }}
          </span>
        </button>
      </template>
    </div>
  </section>
</template>

<script>
function zonedToday(timeZone) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone, year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(new Date());
  const value = (type) => parts.find((part) => part.type === type).value;
  return `${value("year")}-${value("month")}-${value("day")}`;
}

export default {
  name: "ReservationCalendar",
  props: {
    reservations: {type: Array, default: () => []},
    selectedDate: {type: String, default: ""},
    timeZone: {type: String, required: true},
    startDate: {type: String, default: ""},
    endDate: {type: String, default: ""},
  },
  emits: ["update:selectedDate", "month-change"],
  data() {
    const today = zonedToday(this.timeZone);
    return {
      year: Number(today.slice(0, 4)),
      month: Number(today.slice(5, 7)) - 1,
      pickerYear: Number(today.slice(0, 4)),
      pickerOpen: false,
    };
  },
  computed: {
    locale() { return this.$i18n.locale === "ja" ? "ja-JP" : "en-US"; },
    monthNames() {
      return Array.from({length: 12}, (_, i) => new Intl.DateTimeFormat(this.locale, {
        month: "short", timeZone: "UTC",
      }).format(new Date(Date.UTC(2020, i, 1))));
    },
    weekdayNames() {
      return Array.from({length: 7}, (_, i) => new Intl.DateTimeFormat(this.locale, {
        weekday: "short", timeZone: "UTC",
      }).format(new Date(Date.UTC(2020, 5, i + 1))));
    },
    monthLabel() {
      return new Intl.DateTimeFormat(this.locale, {month: "long", year: "numeric", timeZone: "UTC"})
        .format(new Date(Date.UTC(this.year, this.month, 1)));
    },
    cells() {
      const first = (new Date(Date.UTC(this.year, this.month, 1)).getUTCDay() + 6) % 7;
      const count = new Date(Date.UTC(this.year, this.month + 1, 0)).getUTCDate();
      return Array.from({length: Math.ceil((first + count) / 7) * 7}, (_, i) => {
        const day = i - first + 1;
        return day < 1 || day > count ? null :
          `${this.year}-${String(this.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      });
    },
    groupedReservations() {
      const groups = {};
      for (const reservation of this.reservations) {
        if (!reservation.localDate) continue;
        (groups[reservation.localDate] ||= []).push(reservation);
      }
      for (const group of Object.values(groups)) {
        group.sort((a, b) => (a.localStartTime || "").localeCompare(b.localStartTime || ""));
      }
      return groups;
    },
  },
  watch: {
    timeZone() { this.goToday(); },
  },
  mounted() { this.emitMonth(); },
  methods: {
    reservationsForDate(date) { return this.groupedReservations[date] || []; },
    outsidePeriod(date) {
      return Boolean((this.startDate && date < this.startDate) ||
        (this.endDate && date > this.endDate));
    },
    emitMonth() {
      const first = `${this.year}-${String(this.month + 1).padStart(2, "0")}-01`;
      const lastDay = new Date(Date.UTC(this.year, this.month + 1, 0)).getUTCDate();
      this.$emit("month-change", {first, last: `${first.slice(0, 8)}${lastDay}`});
    },
    moveMonth(delta) {
      const date = new Date(Date.UTC(this.year, this.month + delta, 1));
      this.year = date.getUTCFullYear();
      this.month = date.getUTCMonth();
      this.pickerYear = this.year;
      this.pickerOpen = false;
      this.emitMonth();
    },
    chooseMonth(month) {
      this.year = this.pickerYear;
      this.month = month;
      this.pickerOpen = false;
      this.emitMonth();
    },
    goToday() {
      const today = zonedToday(this.timeZone);
      this.year = Number(today.slice(0, 4));
      this.month = Number(today.slice(5, 7)) - 1;
      this.pickerYear = this.year;
      this.pickerOpen = false;
      this.$emit("update:selectedDate", today);
      this.emitMonth();
    },
  },
};
</script>

<style scoped>
.reservation-calendar {width: 100%; min-width: 0;}
.calendar-toolbar {display: flex; gap: 8px; align-items: center; justify-content: center; flex-wrap: wrap; margin-bottom: 16px;}
.calendar-toolbar button, .calendar-picker button {cursor: pointer; padding: 7px 10px; border: 1px solid #cbd5e1; border-radius: 6px; background: #fff; color: #1e293b;}
.calendar-month-picker {position: relative;}
.calendar-picker {position: absolute; z-index: 20; top: 100%; left: 50%; transform: translateX(-50%); width: 260px; padding: 12px; background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; box-shadow: 0 8px 25px #0002;}
.calendar-picker-year {display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;}
.calendar-month-grid {display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px;}
.calendar-month-grid .selected {background: #dbeafe;}
.calendar-grid {display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 3px;}
.calendar-weekday {text-align: center; font-size: 12px; font-weight: 600; padding: 8px 0;}
.calendar-day, .calendar-empty {min-width: 0; min-height: 86px;}
.calendar-day {display: flex; flex-direction: column; align-items: stretch; gap: 3px; padding: 5px; border: 1px solid #dbe1e8; border-radius: 5px; background: #fff; text-align: left; cursor: pointer;}
.calendar-day.selected {outline: 2px solid #2563eb; outline-offset: -2px;}
.calendar-day.outside-period {background: #f1f5f9;}
.calendar-day-number {font-weight: 600; font-size: 12px;}
.calendar-interval {display: block; padding: 3px; border-radius: 3px; font-size: 10px; overflow-wrap: anywhere; background: #dcfce7; color: #166534;}
.calendar-interval.past {background: #e2e8f0; color: #475569;}
.calendar-interval.cancelled {background: #fee2e2; color: #991b1b; text-decoration: line-through;}
.calendar-more {font-size: 10px; color: #475569;}
@media (max-width: 600px) {.calendar-day, .calendar-empty {min-height: 66px;} .calendar-day {padding: 2px;} .calendar-interval {font-size: 9px;}}
</style>
