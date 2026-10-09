
<template>
  <div class="student-seating-map">
    <div class="front-zone">
      <div
        v-if="teacherPosition === 'front-left'"
        class="teacher-desk"
      >
        {{ $t("seatingPlans.classroom.teacherDesk") }}
      </div>

      <div class="classroom-front">
        <span>
          {{ $t("seatingPlans.classroom.front") }}
        </span>

        <div class="whiteboard">
          {{ $t("seatingPlans.classroom.whiteboard") }}
        </div>
      </div>

      <div
        v-if="teacherPosition === 'front-right'"
        class="teacher-desk"
      >
        {{ $t("seatingPlans.classroom.teacherDesk") }}
      </div>
    </div>

    <div
      class="desk-grid"
      :style="{
        gridTemplateColumns:
          `repeat(${columns}, minmax(0, 1fr))`,
      }"
    >
      <div
        v-for="deskNumber in deskCount"
        :key="deskNumber"
        class="desk"
        :class="{
          'assigned-desk':
            deskNumber === Number(seating.deskNumber),
        }"
      >
        <div class="desk-label">
          {{
            $t("seatingPlans.classroom.desk", {
              number: deskNumber,
            })
          }}
        </div>

        <div
          class="seat-grid"
          :style="{
            gridTemplateColumns:
              `repeat(${seatsPerDesk}, minmax(0, 1fr))`,
          }"
        >
          <div
            v-for="seatNumber in seatsPerDesk"
            :key="seatNumber"
            class="seat"
            :class="{
              'assigned-seat':
                deskNumber === Number(seating.deskNumber) &&
                seatNumber === Number(seating.seatNumber),
            }"
            :aria-label="
              $t('dashboard.studentSeating.assignment', {
                desk: deskNumber,
                seat: seatNumber,
              })
            "
          >
            <span class="seat-number">
              {{ seatNumber }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="
        teacherPosition === 'back-left' ||
        teacherPosition === 'back-right'
      "
      class="back-teacher-zone"
      :class="{
        right: teacherPosition === 'back-right',
      }"
    >
      <div class="teacher-desk">
        {{ $t("seatingPlans.classroom.teacherDesk") }}
      </div>
    </div>

    <p class="seat-legend">
      <span class="legend-marker"></span>
      {{ $t("dashboard.studentSeating.yourSeat") }}
    </p>
  </div>
</template>

<script>
export default {
  name: "StudentSeatingMiniMap",

  props: {
    seating: {
      type: Object,
      required: true,
    },
  },

  computed: {
    deskCount() {
      return Math.max(
        1,
        Number(this.seating.deskCount) || 1,
      );
    },

    seatsPerDesk() {
      return Math.max(
        1,
        Number(this.seating.seatsPerDesk) || 1,
      );
    },

    columns() {
      return Math.max(
        1,
        Number(this.seating.desksPerRow) || 2,
      );
    },

    teacherPosition() {
      return this.seating.teacherPosition || "front-left";
    },
  },
};
</script>

<style scoped>
.student-seating-map {
  margin-top: 12px;
  padding: 14px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}

.front-zone {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.classroom-front {
  flex: 1;
  min-width: 0;
  text-align: center;
  font-size: 0.75rem;
  color: #64748b;
}

.whiteboard {
  margin-top: 5px;
  padding: 6px;
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 5px;
}

.teacher-desk {
  padding: 8px 5px;
  background: #dbeafe;
  border: 1px solid #93c5fd;
  border-radius: 6px;
  font-size: 0.65rem;
  text-align: center;
}

.desk-grid {
  display: grid;
  gap: 10px;
}

.desk {
  min-width: 0;
  padding: 8px 5px;
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
}

.assigned-desk {
  border-color: #2563eb;
}

.desk-label {
  margin-bottom: 6px;
  font-size: 0.7rem;
  text-align: center;
  color: #475569;
}

.seat-grid {
  display: grid;
  gap: 4px;
}

.seat {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding: 5px 0;
  border-radius: 4px;
  background: #e2e8f0;
  color: #94a3b8;
}

.assigned-seat {
  background: #2563eb;
  color: #fff;
}

.back-teacher-zone {
  display: flex;
  justify-content: flex-start;
  margin-top: 16px;
}

.back-teacher-zone.right {
  justify-content: flex-end;
}

.seat-legend {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin: 14px 0 0;
  font-size: 0.8rem;
  color: #475569;
}

.legend-marker {
  width: 12px;
  height: 12px;
  background: #2563eb;
  border-radius: 3px;
}

.seat-number {
  font-size: 0.8rem;
  font-weight: 600;
}

.assigned-seat .seat-number {
  color: #fff;
}
</style>
