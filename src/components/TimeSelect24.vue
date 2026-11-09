
<template>
  <div class="time-select">
    <select
      :value="selectedHour"
      :disabled="disabled"
      :required="required"
      :aria-label="`${label} — hour`"
      @change="updateHour($event.target.value)"
    >
      <option value="" disabled>HH</option>
      <option
        v-for="hour in hourOptions"
        :key="hour"
        :value="hour"
      >
        {{ hour }}
      </option>
    </select>

    <span aria-hidden="true">:</span>

    <select
      :value="selectedMinute"
      :disabled="disabled"
      :required="required"
      :aria-label="`${label} — minute`"
      @change="updateMinute($event.target.value)"
    >
      <option value="" disabled>MM</option>
      <option
        v-for="minute in minuteOptions"
        :key="minute"
        :value="minute"
      >
        {{ minute }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "TimeSelect24",

  props: {
    modelValue: {
      type: String,
      default: "",
    },
    allowedTimes: {
      type: Array,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "Time",
    },
  },

  emits: ["update:modelValue"],

  computed: {
    allowedStartTimes() {
      if (this.reservationMode !== "single") {
        return [];
      }

      const intervals = this.getOperatingIntervalsForDate(
        this.form.localDate,
      );

      const allowed = new Set();

      for (const interval of intervals) {
        const [startHour, startMinute] =
          interval.startTime.split(":").map(Number);

        const [endHour, endMinute] =
          interval.endTime.split(":").map(Number);

        const opening = startHour * 60 + startMinute;
        const closing = endHour * 60 + endMinute;

        const firstSlot = Math.ceil(opening / 5) * 5;
        const lastSlot = closing - 30;

        for (
          let minute = firstSlot;
          minute <= lastSlot;
          minute += 5
        ) {
          const hour = Math.floor(minute / 60);
          const minutes = minute % 60;

          allowed.add(
            `${String(hour).padStart(2, "0")}:` +
            `${String(minutes).padStart(2, "0")}`,
          );
        }
      }

      return [...allowed].sort();
    },

    hours() {
      if (this.allowedTimes !== null) {
        return [...new Set(
          this.allowedTimes.map((time) => time.split(":")[0]),
        )].sort();
      }

      return Array.from(
        {length: 24},
        (_, i) => String(i).padStart(2, "0"),
      );
    },

    hourOptions() {
      const options = [...this.hours];

      if (
        this.selectedHour &&
        !options.includes(this.selectedHour)
      ) {
        options.push(this.selectedHour);
        options.sort();
      }

      return options;
    },

    minutes() {
      return Array.from(
        {length: 12},
        (_, i) => String(i * 5).padStart(2, "0"),
      );
    },

    selectedHour() {
      return this.modelValue.split(":")[0] || "";
    },

    selectedMinute() {
      return this.modelValue.split(":")[1] || "";
    },

    minuteOptions() {
      let options = [...this.minutes];

      if (this.allowedTimes !== null) {
        options = this.allowedTimes
          .filter((time) => time.startsWith(`${this.selectedHour}:`))
          .map((time) => time.split(":")[1]);

        options = [...new Set(options)].sort();
      }

      // Preserve existing reservation times when editing.
      if (
        this.selectedMinute &&
        !options.includes(this.selectedMinute)
      ) {
        options.push(this.selectedMinute);
        options.sort();
      }

      return options;
    },
  },

  methods: {
    updateHour(hour) {
      let minute = this.selectedMinute || "00";

      if (this.allowedTimes !== null) {
        const validMinutes = this.allowedTimes
          .filter((time) => time.startsWith(`${hour}:`))
          .map((time) => time.split(":")[1])
          .sort();

        if (validMinutes.length === 0) {
          return;
        }

        if (!validMinutes.includes(minute)) {
          minute = validMinutes[0];
        }
      }

      this.$emit("update:modelValue", `${hour}:${minute}`);
    },

    updateMinute(minute) {
      const hour = this.selectedHour || "00";
      const newTime = `${hour}:${minute}`;

      if (
        this.allowedTimes !== null &&
        !this.allowedTimes.includes(newTime)
      ) {
        return;
      }

      this.$emit("update:modelValue", newTime);
    },
  },
};
</script>

<style scoped>
.time-select {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.time-select select {
  flex: 1;
  min-width: 0;
}

.time-select span {
  font-weight: 600;
}
</style>
