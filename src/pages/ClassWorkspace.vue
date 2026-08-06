<template>
  <div class="workspace">
    <header class="workspace-header">
      <button
        type="button"
        class="back-button"
        @click="$emit('back')"
      >
        ← {{ $t("classWorkspace.actions.back") }}
      </button>

      <div v-if="selectedClass">
        <div class="title-row">
          <div>
            <p class="eyebrow">
              {{ $t("classWorkspace.eyebrow") }}
            </p>

            <h1>
              🏷️ {{ selectedClass.code }} — {{ selectedClass.name }}
            </h1>
          </div>

          <span
            class="status"
            :class="
              selectedClass.active !== false
                ? 'active'
                : 'archived'
            "
          >
            {{
              selectedClass.active !== false
                ? $t("common.active")
                : $t("common.archived")
            }}
          </span>
        </div>

        <p class="description">
          {{ $t("classWorkspace.description") }}
        </p>
      </div>
    </header>

    <p
      v-if="errorMessage"
      class="message error"
    >
      {{ errorMessage }}
    </p>

    <section
      v-if="loading"
      class="panel"
    >
      <p>{{ $t("classWorkspace.loading") }}</p>
    </section>

    <section
      v-else-if="!selectedClass"
      class="panel empty-state"
    >
      <h2>{{ $t("classWorkspace.notFound.title") }}</h2>
      <p>{{ $t("classWorkspace.notFound.description") }}</p>

      <button
        type="button"
        class="primary"
        @click="$emit('back')"
      >
        {{ $t("classWorkspace.actions.returnToClasses") }}
      </button>
    </section>

    <template v-else>
      <nav class="workspace-tabs">
        <button
          type="button"
          :class="{ active: activeTab === 'overview' }"
          @click="activeTab = 'overview'"
        >
          📋 {{ $t("classWorkspace.tabs.overview") }}
        </button>

        <button
          type="button"
          :class="{ active: activeTab === 'students' }"
          @click="activeTab = 'students'"
        >
          👥 {{ $t("classWorkspace.tabs.students") }}
        </button>

        <button
          type="button"
          :class="{ active: activeTab === 'seating-plans' }"
          @click="activeTab = 'seating-plans'"
        >
          🪑 {{ $t("classWorkspace.tabs.seatingPlans") }}
        </button>
      </nav>

      <section
        v-if="activeTab === 'overview'"
        class="panel"
      >
        <div class="section-heading">
          <div>
            <h2>{{ $t("classWorkspace.overview.title") }}</h2>
            <p>{{ $t("classWorkspace.overview.description") }}</p>
          </div>
        </div>

        <div class="overview-grid">
          <article class="info-card">
            <span class="info-label">
              {{ $t("classWorkspace.overview.course") }}
            </span>

            <strong>{{ courseLabel }}</strong>
          </article>

          <article class="info-card">
            <span class="info-label">
              {{ $t("classWorkspace.overview.room") }}
            </span>

            <strong>{{ roomLabel }}</strong>
          </article>

          <article class="info-card">
            <span class="info-label">
              {{ $t("classWorkspace.overview.academicYear") }}
            </span>

            <strong>{{ selectedClass.academicYear }}</strong>
          </article>

          <article class="info-card">
            <span class="info-label">
              {{ $t("classWorkspace.overview.semester") }}
            </span>

            <strong>{{ selectedClass.semester }}</strong>
          </article>

          <article class="info-card">
            <span class="info-label">
              {{ $t("classWorkspace.overview.roomCapacity") }}
            </span>

            <strong>{{ roomCapacity }}</strong>
          </article>

          <article class="info-card">
            <span class="info-label">
              {{ $t("classWorkspace.overview.status") }}
            </span>

            <strong>
              {{
                selectedClass.active !== false
                  ? $t("common.active")
                  : $t("common.archived")
              }}
            </strong>
          </article>
        </div>
      </section>

      <section
        v-if="activeTab === 'students'"
        class="workspace-content"
      >
        <EnrollmentManager
          :school-id="schoolId"
          :class-id="classId"
        />
      </section>

      <section
        v-if="activeTab === 'seating-plans'"
        class="workspace-content"
      >
        <SeatingPlanManager
          :school-id="schoolId"
          :class-id="classId"
        />
      </section>
    </template>
  </div>
</template>

<script>
import {
  watchClasses,
} from "../services/classService";
import {
  watchCourses,
} from "../services/courseService";
import {
  watchRooms,
} from "../services/roomService";
import EnrollmentManager from "./EnrollmentManager.vue";
import SeatingPlanManager from "./SeatingPlanManager.vue";

export default {
  name: "ClassWorkspace",

  components: {
    EnrollmentManager,
    SeatingPlanManager,
  },
  props: {
    schoolId: {
      type: String,
      required: true,
    },

    classId: {
      type: String,
      required: true,
    },
  },

  emits: ["back"],

  data() {
    return {
      classes: [],
      courses: [],
      rooms: [],
      activeTab: "overview",
      loading: true,
      errorMessage: "",
      unsubscribers: [],
    };
  },

  computed: {
    selectedClass() {
      return (
        this.classes.find(
          (item) => item.id === this.classId,
        ) || null
      );
    },

    selectedCourse() {
      if (!this.selectedClass) {
        return null;
      }

      return (
        this.courses.find(
          (course) =>
            course.id === this.selectedClass.courseId,
        ) || null
      );
    },

    selectedRoom() {
      if (!this.selectedClass) {
        return null;
      }

      return (
        this.rooms.find(
          (room) =>
            room.id === this.selectedClass.roomId,
        ) || null
      );
    },

    courseLabel() {
      if (!this.selectedClass) {
        return "";
      }

      if (!this.selectedCourse) {
        return this.selectedClass.courseId;
      }

      return `${this.selectedCourse.code} — ${this.selectedCourse.name}`;
    },

    roomLabel() {
      if (!this.selectedClass) {
        return "";
      }

      if (!this.selectedRoom) {
        return this.selectedClass.roomId;
      }

      return `${
        this.selectedRoom.code ||
        this.selectedRoom.id
      } — ${
        this.selectedRoom.name ||
        this.$t("classWorkspace.overview.unnamedRoom")
      }`;
    },

    roomCapacity() {
      if (!this.selectedRoom) {
        return this.$t(
          "classWorkspace.overview.notAvailable",
        );
      }

      const deskCount =
        Number(this.selectedRoom.deskCount) || 0;

      const seatsPerDesk =
        Number(this.selectedRoom.seatsPerDesk) || 0;

      return deskCount * seatsPerDesk;
    },
  },

  watch: {
    schoolId() {
      this.activeTab = "overview";
      this.startListeners();
    },

    classId() {
      this.activeTab = "overview";
    },
  },

  mounted() {
    this.startListeners();
  },

  beforeUnmount() {
    this.stopListeners();
  },

  methods: {
    startListeners() {
      this.stopListeners();
      this.loading = true;
      this.errorMessage = "";

      let classesLoaded = false;
      let coursesLoaded = false;
      let roomsLoaded = false;

      const updateLoading = () => {
        this.loading = !(
          classesLoaded &&
          coursesLoaded &&
          roomsLoaded
        );
      };

      try {
        this.unsubscribers = [
          watchClasses(
            this.schoolId,
            (items) => {
              this.classes = items;
              classesLoaded = true;
              updateLoading();
            },
            (error) => {
              this.loading = false;

              this.errorMessage = this.$t(
                "classWorkspace.messages.classesLoadError",
                {
                  error: error.message,
                },
              );
            },
          ),

          watchCourses(
            this.schoolId,
            (items) => {
              this.courses = items;
              coursesLoaded = true;
              updateLoading();
            },
            (error) => {
              this.loading = false;

              this.errorMessage = this.$t(
                "classWorkspace.messages.coursesLoadError",
                {
                  error: error.message,
                },
              );
            },
          ),

          watchRooms(
            this.schoolId,
            (items) => {
              this.rooms = items;
              roomsLoaded = true;
              updateLoading();
            },
            (error) => {
              this.loading = false;

              this.errorMessage = this.$t(
                "classWorkspace.messages.roomsLoadError",
                {
                  error: error.message,
                },
              );
            },
          ),
        ];
      } catch (error) {
        this.loading = false;

        this.errorMessage = this.$t(
          "classWorkspace.messages.loadError",
          {
            error: error.message,
          },
        );
      }
    },

    stopListeners() {
      this.unsubscribers.forEach((unsubscribe) => {
        if (unsubscribe) {
          unsubscribe();
        }
      });

      this.unsubscribers = [];
    },
  },
};
</script>

<style scoped>
.workspace {
  max-width: 1180px;
  margin: 0 auto;
  padding: 30px;
}

.workspace-header {
  margin-bottom: 22px;
}

.back-button {
  margin-bottom: 18px;
  background: #e8eaed;
  color: #333;
}

.title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.title-row h1 {
  margin: 2px 0 8px;
}

.eyebrow {
  margin: 0;
  color: #667085;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.description {
  margin: 0;
  color: #666;
}

.workspace-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #f5f5f5;
}

.workspace-tabs button {
  flex: 1;
  background: transparent;
  color: #333;
}

.workspace-tabs button.active {
  background: #42b883;
  color: white;
}

.panel {
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: white;
}

.section-heading h2 {
  margin: 0 0 6px;
}

.section-heading p {
  margin: 0 0 20px;
  color: #666;
}

.overview-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(210px, 1fr));
  gap: 14px;
}

.info-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 72px;
  padding: 16px;
  border: 1px solid #e1e4e8;
  border-radius: 10px;
  background: #fafafa;
}

.info-label {
  color: #667085;
  font-size: 0.85rem;
}

.status {
  padding: 5px 10px;
  border-radius: 999px;
  white-space: nowrap;
  font-size: 0.82rem;
  font-weight: 700;
}

.status.active {
  background: #dff5e8;
  color: #176b3a;
}

.status.archived {
  background: #eee;
  color: #555;
}

.empty-state {
  text-align: center;
  color: #666;
}

.empty-state h2 {
  color: #222;
}

.message {
  padding: 12px 14px;
  border-radius: 8px;
}

.message.error {
  color: #b42318;
  background: #fde8e8;
}

button {
  padding: 10px 14px;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
}

.primary {
  background: #42b883;
  color: white;
}

@media (max-width: 700px) {
  .workspace {
    padding: 18px;
  }

  .title-row,
  .workspace-tabs {
    flex-direction: column;
  }

  .workspace-tabs button {
    width: 100%;
    text-align: left;
  }
}

.workspace-content {
  min-width: 0;
}
</style>