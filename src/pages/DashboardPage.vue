<template>
  <div class="dashboard-page">
    <header class="dashboard-header">
      <div>
        <p class="eyebrow">
          {{ $t("dashboard.eyebrow") }}
        </p>

        <h1>
          {{ $t("dashboard.title") }}
        </h1>

        <p>
          {{ $t("dashboard.description") }}
        </p>
      </div>
    </header>

    <p
      v-if="errorMessage"
      class="error"
    >
      {{ errorMessage }}
    </p>

    <section class="summary-grid">
      <article class="summary-card">
        <span class="summary-icon">
          👨‍🎓
        </span>

        <div>
          <strong>
            {{ activeStudents.length }}
          </strong>

          <span>
            {{ $t("dashboard.summary.students") }}
          </span>
        </div>
      </article>

      <article class="summary-card">
        <span class="summary-icon">
          🏷️
        </span>

        <div>
          <strong>
            {{ activeClasses.length }}
          </strong>

          <span>
            {{ $t("dashboard.summary.classes") }}
          </span>
        </div>
      </article>

      <article class="summary-card">
        <span class="summary-icon">
          📐
        </span>

        <div>
          <strong>
            {{ activeRooms.length }}
          </strong>

          <span>
            {{ $t("dashboard.summary.rooms") }}
          </span>
        </div>
      </article>

      <article class="summary-card">
        <span class="summary-icon">
          📚
        </span>

        <div>
          <strong>
            {{ activeCourses.length }}
          </strong>

          <span>
            {{ $t("dashboard.summary.courses") }}
          </span>
        </div>
      </article>
    </section>

    <section class="dashboard-grid">
      <article class="dashboard-card">
        <h2>
          {{ $t("dashboard.activity.title") }}
        </h2>

        <p class="section-description">
          {{ $t("dashboard.activity.description") }}
        </p>

        <div class="empty-state">
          <span>📋</span>

          <p>
            {{ $t("dashboard.activity.empty") }}
          </p>
        </div>
      </article>

      <article class="dashboard-card">
        <h2>
          {{ $t("dashboard.messages.title") }}
        </h2>

        <p class="section-description">
          {{ $t("dashboard.messages.description") }}
        </p>

        <div class="empty-state">
          <span>💬</span>

          <p>
            {{ $t("dashboard.messages.empty") }}
          </p>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import {
  watchStudents,
} from "../services/studentService";

import {
  watchClasses,
} from "../services/classService";

import {
  watchRooms,
} from "../services/roomService";

import {
  watchCourses,
} from "../services/courseService";

export default {
  name: "DashboardPage",

  props: {
    schoolId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      students: [],
      classes: [],
      rooms: [],
      courses: [],
      errorMessage: "",
      unsubscribers: [],
    };
  },

  computed: {
    activeStudents() {
      return this.students.filter(
        (student) =>
          student.isActive !== false,
      );
    },

    activeClasses() {
      return this.classes.filter(
        (item) =>
          item.active !== false,
      );
    },

    activeRooms() {
      return this.rooms.filter(
        (room) =>
          room.active !== false,
      );
    },

    activeCourses() {
      return this.courses.filter(
        (course) =>
          course.active !== false,
      );
    },
  },

  mounted() {
    this.startListeners();
  },

  beforeUnmount() {
    this.stopListeners();
  },

  watch: {
    schoolId() {
      this.startListeners();
    },
  },

  methods: {
    startListeners() {
      this.stopListeners();

      this.students = [];
      this.classes = [];
      this.rooms = [];
      this.courses = [];
      this.errorMessage = "";

      try {
        this.unsubscribers = [
          watchStudents(
            this.schoolId,
            (items) => {
              this.students = items;
            },
            this.handleLoadError,
          ),

          watchClasses(
            this.schoolId,
            (items) => {
              this.classes = items;
            },
            this.handleLoadError,
          ),

          watchRooms(
            this.schoolId,
            (items) => {
              this.rooms = items;
            },
            this.handleLoadError,
          ),

          watchCourses(
            this.schoolId,
            (items) => {
              this.courses = items;
            },
            this.handleLoadError,
          ),
        ];
      } catch (error) {
        this.handleLoadError(error);
      }
    },

    stopListeners() {
      this.unsubscribers.forEach(
        (unsubscribe) => {
          if (unsubscribe) {
            unsubscribe();
          }
        },
      );

      this.unsubscribers = [];
    },

    handleLoadError(error) {
      this.errorMessage =
        error?.message ||
        this.$t(
          "dashboard.messages.loadError",
        );
    },
  },
};
</script>

<style scoped>
.dashboard-page {
  max-width: 1180px;
  margin: 0 auto;
  padding: 30px;
}

.dashboard-header {
  margin-bottom: 28px;
}

.dashboard-header h1 {
  margin: 4px 0 8px;
}

.dashboard-header p {
  margin: 0;
  color: #667085;
}

.eyebrow {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.summary-grid {
  display: grid;
  grid-template-columns:
    repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 24px;
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 22px;
  background: white;
  border: 1px solid #e4e7ec;
  border-radius: 12px;
}

.summary-icon {
  font-size: 1.8rem;
}

.summary-card div {
  display: flex;
  flex-direction: column;
}

.summary-card strong {
  font-size: 1.7rem;
}

.summary-card span:last-child {
  color: #667085;
  font-size: 0.9rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns:
    repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.dashboard-card {
  min-height: 250px;
  padding: 22px;
  background: white;
  border: 1px solid #e4e7ec;
  border-radius: 12px;
}

.dashboard-card h2 {
  margin: 0 0 6px;
}

.section-description {
  margin: 0;
  color: #667085;
}

.empty-state {
  min-height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #98a2b3;
  text-align: center;
}

.empty-state span {
  font-size: 2rem;
}

.error {
  color: #b00020;
  margin-bottom: 18px;
}

@media (max-width: 900px) {
  .summary-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 650px) {
  .dashboard-page {
    padding: 20px 14px;
  }

  .summary-grid,
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>