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
      <article
        v-if="canViewStudentSummary"
        class="summary-card"
      >
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

      <article
        v-if="canViewClassSummary"
        class="summary-card"
      >
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

      <article
        v-if="canViewRoomSummary"
        class="summary-card"
      >
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

      <article
        v-if="canViewCourseSummary"
        class="summary-card"
      >
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

      <article
        v-if="isStudent"
        class="dashboard-card"
      >
        <h2>
          {{ $t("dashboard.studentClasses.title") }}
        </h2>

        <p class="section-description">
          {{ $t("dashboard.studentClasses.description") }}
        </p>

        <div
          v-if="studentClassesLoading"
          class="empty-state loading-state"
        >
          <span>🏫</span>

          <p>
            {{ $t("dashboard.studentClasses.loading") }}
          </p>
        </div>

        <div
          v-else-if="studentClasses.length === 0"
          class="empty-state"
        >
          <span>🏫</span>

          <p>
            {{ $t("dashboard.studentClasses.empty") }}
          </p>
        </div>

        <div
          v-else
          class="student-class-list"
        >
          <div
            v-for="item in studentClasses"
            :key="item.id"
            class="student-class-item"
          >
            <strong>
              {{ item.name }}
            </strong>

            <span v-if="item.room?.name">
              📍 {{ item.room.name }}
            </span>

            <span v-if="item.mainTeacher?.displayName">
              👨‍🏫 {{ item.mainTeacher.displayName }}
            </span>
          </div>
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

      <article
        v-if="canViewActivity"
        class="dashboard-card"
      >
        <h2>
          {{ $t("dashboard.activity.title") }}
        </h2>

        <p class="section-description">
          {{ $t("dashboard.activity.description") }}
        </p>

        <div
          v-if="activityLoading"
          class="empty-state loading-state"
        >
          <span>📋</span>

          <p>
            {{ $t("dashboard.activity.loading") }}
          </p>
        </div>

        <div
          v-else-if="activity.length === 0"
          class="empty-state"
        >
          <span>📋</span>

          <p>
            {{ $t("dashboard.activity.empty") }}
          </p>
        </div>

        <div
          v-else
          class="activity-list"
        >
          <div
            v-for="item in activity"
            :key="item.id"
            class="activity-item"
          >
            <div class="activity-content">
              <strong>
                {{ activityLabel(item) }}
              </strong>

              <span
                v-if="item.entityName"
                class="activity-entity"
              >
                {{ item.entityName }}
              </span>

              <span
                v-if="activityChangeLabel(item)"
                class="activity-change"
              >
                {{ activityChangeLabel(item) }}
              </span>

              <span
                v-if="item.actorName"
                class="activity-actor"
              >
                {{
                  $t(
                    "dashboard.activity.by",
                    {
                      name: item.actorName,
                    },
                  )
                }}
              </span>
            </div>

            <time
              v-if="item.createdAt"
              class="activity-time"
            >
              {{ formatActivityDate(item.createdAt) }}
            </time>
          </div>
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
  watchTeacherClasses,
} from "../services/classService";

import {
  watchRooms,
} from "../services/roomService";

import {
  watchCourses,
} from "../services/courseService";

import {
  getDashboardActivity,
} from "../services/activityService";

import {
  getStudentClassInfo,
} from "../services/studentClassService";

export default {
  name: "DashboardPage",

  props: {
    schoolId: {
      type: String,
      required: true,
    },

    actorRole: {
      type: String,
      default: "",
    },

    actorUid: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      students: [],
      classes: [],
      rooms: [],
      courses: [],
      activity: [],
      activityLoading: false,
      studentClasses: [],
      studentClassesLoading: false,
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

    isTeacher() {
      return this.actorRole === "teacher";
    },

    isStudent() {
      return this.actorRole === "student";
    },

    canViewStudentSummary() {
      return (
        this.actorRole === "system-admin" ||
        this.actorRole === "school-admin" ||
        this.actorRole === "teacher"
      );
    },

    canViewClassSummary() {
      return (
        this.actorRole === "system-admin" ||
        this.actorRole === "school-admin" ||
        this.actorRole === "teacher"
      );
    },

    canViewRoomSummary() {
      return (
        this.actorRole === "system-admin" ||
        this.actorRole === "school-admin" ||
        this.actorRole === "teacher"
      );
    },

    canViewCourseSummary() {
      return (
        this.actorRole === "system-admin" ||
        this.actorRole === "school-admin"
      );
    },

    canViewActivity() {
      return (
        this.actorRole === "system-admin" ||
        this.actorRole === "school-admin" ||
        this.actorRole === "teacher"
      );
    },

    canViewAllClasses() {
      return (
        this.actorRole === "system-admin" ||
        this.actorRole === "school-admin"
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

    actorRole() {
      this.startListeners();
    },

    actorUid() {
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
      this.activity = [];
      this.studentClasses = [];
      this.errorMessage = "";

      if (this.isTeacher && !this.actorUid) {
        return;
      }

      try {
        const listeners = [];

        if (this.canViewStudentSummary) {
          listeners.push(
            watchStudents(
              this.schoolId,
              (items) => {
                this.students = items;
              },
              this.handleLoadError,
            ),
          );
        }

        if (this.canViewRoomSummary) {
          listeners.push(
            watchRooms(
              this.schoolId,
              (items) => {
                this.rooms = items;
              },
              this.handleLoadError,
            ),
          );
        }

        if (this.isTeacher) {
          listeners.push(
            watchTeacherClasses(
              this.schoolId,
              this.actorUid,
              (items) => {
                this.classes = items;
              },
              this.handleLoadError,
            ),
          );
        } else if (this.canViewAllClasses) {
          listeners.push(
            watchClasses(
              this.schoolId,
              (items) => {
                this.classes = items;
              },
              this.handleLoadError,
            ),
          );
        }

        if (this.canViewCourseSummary) {
          listeners.push(
            watchCourses(
              this.schoolId,
              (items) => {
                this.courses = items;
              },
              this.handleLoadError,
            ),
          );
        }

        this.unsubscribers = listeners;

        if (this.isStudent) {
          this.loadStudentClasses();
        }

        if (this.canViewActivity) {
          this.loadActivity();
        }
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

    async loadStudentClasses() {
      if (!this.schoolId) {
        return;
      }

      this.studentClassesLoading = true;

      try {
        const result =
          await getStudentClassInfo(
            this.schoolId,
          );

        this.studentClasses =
          result.classes;
      } catch (error) {
        this.handleLoadError(error);
      } finally {
        this.studentClassesLoading = false;
      }
    },

    async loadActivity() {
      if (!this.schoolId) {
        return;
      }

      this.activityLoading = true;

      try {
        this.activity =
          await getDashboardActivity(
            this.schoolId,
          );
      } catch (error) {
        this.handleLoadError(error);
      } finally {
        this.activityLoading = false;
      }
    },

    activityLabel(item) {
      const key =
        `adminAudit.actions.${item.action}`;

      const translated =
        this.$t(key);

      return translated === key ?
        item.action :
        translated;
    },

    activityChangeLabel(item) {
      const lifecycleActions = [
        "enrollment.created",
        "enrollment.reactivated",
        "enrollment.archived",
      ];

      if (
        lifecycleActions.includes(
          item.action,
        )
      ) {
        return "";
      }

      if (
        !Array.isArray(
          item.changedFields,
        ) ||
        item.changedFields.length === 0
      ) {
        return "";
      }


      if (
        !Array.isArray(
          item.changedFields,
        ) ||
        item.changedFields.length === 0
      ) {
        return "";
      }

      return item.changedFields
          .map((field) => {
            const key =
              `dashboard.activity.changes.${field}`;

            const translated =
              this.$t(key);

            return translated === key ?
              "" :
              translated;
          })
          .filter(Boolean)
          .join(" · ");
    },

    formatActivityDate(value) {
      const timestamp =
        Number(value);

      if (!Number.isFinite(timestamp)) {
        return "";
      }

      return new Intl.DateTimeFormat(
          this.$i18n.locale,
          {
            dateStyle: "medium",
            timeStyle: "short",
          },
      ).format(
          new Date(timestamp),
      );
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

.student-class-list {
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.student-class-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 14px;
  border: 1px solid #eaecf0;
  border-radius: 10px;
}

.student-class-item span {
  color: #667085;
  font-size: 0.9rem;
}

.activity-list {
  margin-top: 18px;
  max-height: 330px;
  overflow-y: auto;
  padding-right: 6px;
}

.activity-item {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding: 14px 0;
  border-bottom: 1px solid #eaecf0;
}

.activity-item:last-child {
  border-bottom: 0;
}

.activity-content {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.activity-entity {
  color: #344054;
}

.activity-actor,
.activity-time {
  color: #667085;
  font-size: 0.82rem;
}

.activity-time {
  flex-shrink: 0;
  white-space: nowrap;
}

.activity-change {
  color: #475467;
  font-size: 0.88rem;
  font-weight: 600;
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

.loading-state {
  color: #475467;
}

.loading-state p {
  font-weight: 600;
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

  .activity-item {
    flex-direction: column;
    gap: 8px;
  }

  .activity-content {
    gap: 4px;
  }

  .activity-time {
    white-space: normal;
  }
}

@media (max-width: 600px) {
  .dashboard-page {
    padding: 20px 14px;
  }

  .summary-grid,
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

</style>