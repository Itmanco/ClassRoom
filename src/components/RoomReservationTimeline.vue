
<template>
  <section class="timeline">
    <div class="timeline-scroll">
      <div
        class="timeline-grid"
        :style="{
          '--timeline-width': `${timelineWidth}px`,
        }"
      >
        <div class="timeline-header">
          <div class="room-heading">
            {{ $t("reservations.timeline.room") }}
          </div>

          <div class="time-heading">
            <span
              v-for="hour in hours"
              :key="hour"
              class="hour-label"
              :style="{left: `${hourPosition(hour)}px`}"
            >
              {{ formatTime(hour) }}
            </span>
          </div>
        </div>

        <div
          v-for="room in activeRooms"
          :key="room.id"
          class="timeline-row"
        >
          <div class="room-label">
            <strong>{{ room.name || room.code || room.id }}</strong>
            <small v-if="room.name && room.code">
              {{ room.code }}
            </small>
          </div>

          <div class="time-track">
            <div
              v-for="segment in closedSegments"
              :key="`${segment.start}-${segment.end}`"
              class="closed-segment"
              :style="segmentStyle(segment)"
            />

            <div
              v-for="hour in hours"
              :key="hour"
              class="hour-line"
              :style="{left: `${hourPosition(hour)}px`}"
            />

            <button
              v-for="reservation in reservationsForRoom(room.id)"
              :key="reservation.id"
              type="button"
              class="reservation-block"
              :style="reservationStyle(reservation)"
              :title="reservationTitle(reservation)"
              @click="$emit('select-reservation', reservation)"
            >
              <strong>{{ reservationClassLabel(reservation) }}</strong>
              <small>
                {{ reservation.localStartTime }}–{{ reservation.localEndTime }}
              </small>
            </button>
          </div>
        </div>
      </div>
    </div>

    <p v-if="activeRooms.length === 0" class="empty-state">
      {{ $t("reservations.timeline.noRooms") }}
    </p>
  </section>
</template>

<script>
const MINUTES_PER_HOUR = 60;
const PIXELS_PER_HOUR = 110;

function timeToMinutes(time) {
  if (typeof time !== "string" ||
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
    return null;
  }

  const [hours, minutes] = time.split(":").map(Number);
  return hours * MINUTES_PER_HOUR + minutes;
}

export default {
  name: "RoomReservationTimeline",

  props: {
    rooms: {
      type: Array,
      default: () => [],
    },
    reservations: {
      type: Array,
      default: () => [],
    },
    operatingIntervals: {
      type: Array,
      default: () => [],
    },
    classes: {
      type: Array,
      default: () => [],
    },
  },

  emits: ["select-reservation"],

  computed: {
    activeRooms() {
      return this.rooms.filter((room) => room.active !== false);
    },

    timeBounds() {
      const intervals = this.operatingIntervals
        .map((interval) => ({
          start: timeToMinutes(interval.startTime),
          end: timeToMinutes(interval.endTime),
        }))
        .filter((interval) =>
          interval.start !== null &&
          interval.end !== null &&
          interval.start < interval.end,
        );

      if (intervals.length === 0) {
        return {start: 8 * 60, end: 18 * 60};
      }

      const start = Math.floor(
        Math.min(...intervals.map((item) => item.start)) / 60,
      ) * 60;

      const end = Math.ceil(
        Math.max(...intervals.map((item) => item.end)) / 60,
      ) * 60;

      return {
        start,
        end: Math.max(start + 60, end),
      };
    },

    timelineWidth() {
      return (this.timeBounds.end - this.timeBounds.start) /
        MINUTES_PER_HOUR * PIXELS_PER_HOUR;
    },

    hours() {
      const values = [];

      for (
        let minute = this.timeBounds.start;
        minute <= this.timeBounds.end;
        minute += MINUTES_PER_HOUR
      ) {
        values.push(minute);
      }

      return values;
    },

    closedSegments() {
      const intervals = this.operatingIntervals
        .map((item) => ({
          start: timeToMinutes(item.startTime),
          end: timeToMinutes(item.endTime),
        }))
        .filter((item) =>
          item.start !== null &&
          item.end !== null &&
          item.start < item.end,
        )
        .sort((a, b) => a.start - b.start);

      const segments = [];
      let cursor = this.timeBounds.start;

      for (const interval of intervals) {
        if (interval.start > cursor) {
          segments.push({
            start: cursor,
            end: interval.start,
          });
        }

        cursor = Math.max(cursor, interval.end);
      }

      if (cursor < this.timeBounds.end) {
        segments.push({
          start: cursor,
          end: this.timeBounds.end,
        });
      }

      return segments;
    },
  },

  methods: {
    hourPosition(minute) {
      return (minute - this.timeBounds.start) /
        MINUTES_PER_HOUR * PIXELS_PER_HOUR;
    },

    formatTime(minute) {
      const hours = Math.floor(minute / 60);
      return `${String(hours).padStart(2, "0")}:00`;
    },

    segmentStyle(segment) {
      return {
        left: `${this.hourPosition(segment.start)}px`,
        width: `${
          this.hourPosition(segment.end) -
          this.hourPosition(segment.start)
        }px`,
      };
    },

    reservationsForRoom(roomId) {
      return this.reservations.filter(
        (reservation) => reservation.roomId === roomId,
      );
    },

    reservationStyle(reservation) {
      const start = timeToMinutes(reservation.localStartTime);
      const end = timeToMinutes(reservation.localEndTime);

      if (start === null || end === null || end <= start) {
        return {display: "none"};
      }

      const left = Math.max(start, this.timeBounds.start);
      const right = Math.min(end, this.timeBounds.end);

      if (right <= left) {
        return {display: "none"};
      }

      return {
        left: `${this.hourPosition(left)}px`,
        width: `${Math.max(
          this.hourPosition(right) - this.hourPosition(left) - 4,
          8,
        )}px`,
      };
    },

    reservationClassLabel(reservation) {
      const item = this.classes.find(
        (entry) => entry.id === reservation.classId,
      );

      return item ?
        (item.name || item.code || item.id) :
        reservation.classId;
    },

    reservationTitle(reservation) {
      return `${this.reservationClassLabel(reservation)} — ` +
        `${reservation.localStartTime}–${reservation.localEndTime}`;
    },
  },
};
</script>

<style scoped>
.timeline-scroll {
  width: 100%;
  overflow-x: auto;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.timeline-grid {
  min-width: calc(170px + var(--timeline-width));
}

.timeline-header,
.timeline-row {
  display: grid;
  grid-template-columns: 170px var(--timeline-width);
}

.timeline-header {
  background: #f5f7f8;
  border-bottom: 1px solid #ddd;
}

.room-heading,
.room-label {
  padding: 14px;
  border-right: 1px solid #ddd;
}

.time-heading {
  position: relative;
  height: 48px;
}

.hour-label {
  position: absolute;
  top: 14px;
  transform: translateX(-50%);
  font-size: 12px;
  color: #555;
}

.timeline-row {
  min-height: 78px;
  border-bottom: 1px solid #eee;
}

.room-label {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.room-label small {
  color: #666;
}

.time-track {
  position: relative;
  min-height: 78px;
  background: #fff;
}

.closed-segment {
  position: absolute;
  top: 0;
  bottom: 0;
  background: #f0f0f0;
}

.hour-line {
  position: absolute;
  top: 0;
  bottom: 0;
  border-left: 1px solid #e5e7eb;
}

.reservation-block {
  position: absolute;
  top: 12px;
  height: 54px;
  padding: 6px 8px;
  overflow: hidden;
  text-align: left;
  background: #d8f3e6;
  border: 1px solid #42b883;
  border-radius: 6px;
  color: #175c3e;
  cursor: pointer;
  z-index: 1;
}

.reservation-block strong,
.reservation-block small {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.reservation-block small {
  margin-top: 4px;
  font-size: 11px;
}

.empty-state {
  padding: 16px;
  color: #666;
}

@media (max-width: 760px) {
  .timeline-header,
  .timeline-row {
    grid-template-columns: 120px var(--timeline-width);
  }

  .timeline-grid {
    min-width: calc(120px + var(--timeline-width));
  }
}
</style>
