<template>
  <div class="school-selector">
    <label for="school-select">
      {{ $t("schoolSelector.label") }}
    </label>

    <select
      id="school-select"
      :value="activeSchool"
      :disabled="schools.length <= 1"
      @change="changeSchool"
    >
      <option
        v-for="school in schools"
        :key="school.id"
        :value="school.id"
      >
        {{ school.name || school.id }}
      </option>
    </select>

    <p
      v-if="selectedSchool"
      class="school-location"
    >
      {{
        [
          selectedSchool.city,
          selectedSchool.country,
        ]
          .filter(Boolean)
          .join(", ")
      }}
    </p>
  </div>
</template>

<script>
export default {
  name: "SchoolSelector",

  props: {
    schools: {
      type: Array,
      default: () => [],
    },

    activeSchool: {
      type: String,
      default: "",
    },
  },

  emits: ["change-school"],

  computed: {
    selectedSchool() {
      return (
        this.schools.find(
          (school) =>
            school.id === this.activeSchool,
        ) || null
      );
    },
  },

  methods: {
    changeSchool(event) {
      const schoolId = event.target.value;

      if (
        schoolId &&
        schoolId !== this.activeSchool
      ) {
        this.$emit(
          "change-school",
          schoolId,
        );
      }
    },
  },
};
</script>

<style scoped>
.school-selector {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #fff;
}

.school-selector label {
  display: block;
  margin-bottom: 7px;
  color: #667085;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.school-selector select {
  box-sizing: border-box;
  width: 100%;
  padding: 9px 10px;
  border: 1px solid #ccc;
  border-radius: 7px;
  background: #fff;
  font: inherit;
  cursor: pointer;
}

.school-selector select:disabled {
  color: #333;
  cursor: default;
  opacity: 1;
}

.school-location {
  margin: 7px 2px 0;
  color: #667085;
  font-size: 0.78rem;
}
</style>