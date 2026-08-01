<template>
  <div class="page">
    <header class="page-header">
      <div>
        <h1>📚 {{ $t("courses.title") }}</h1>
        <p>{{ $t("courses.description") }}</p>
      </div>
    </header>

    <section class="panel">
      <h2>
        {{
          isEditing
            ? $t("courses.form.editTitle")
            : $t("courses.form.addTitle")
        }}
      </h2>

      <form class="course-form" @submit.prevent="submitCourse">
        <label>
          {{ $t("courses.fields.code") }}

          <input
            v-model.trim="form.code"
            type="text"
            :placeholder="$t('courses.placeholders.code')"
            :disabled="isEditing"
            required
          />
        </label>

        <label>
          {{ $t("courses.fields.name") }}

          <input
            v-model.trim="form.name"
            type="text"
            :placeholder="$t('courses.placeholders.name')"
            required
          />
        </label>

        <label class="full-width">
          {{ $t("courses.fields.description") }}

          <textarea
            v-model.trim="form.description"
            rows="4"
            :placeholder="$t('courses.placeholders.description')"
          ></textarea>
        </label>

        <label class="checkbox-label full-width">
          <input v-model="form.active" type="checkbox" />
          {{ $t("common.active") }}
        </label>

        <div class="form-actions full-width">
          <button
            class="primary-button"
            type="submit"
            :disabled="saving"
          >
            {{
              saving
                ? $t("common.saving")
                : isEditing
                  ? $t("courses.actions.update")
                  : $t("courses.actions.add")
            }}
          </button>

          <button
            v-if="isEditing"
            class="secondary-button"
            type="button"
            :disabled="saving"
            @click="resetForm"
          >
            {{ $t("common.cancel") }}
          </button>
        </div>
      </form>

      <p v-if="message" class="success-message">
        {{ message }}
      </p>

      <p v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </p>
    </section>

    <section class="panel">
      <div class="section-heading">
        <h2>{{ $t("courses.list.title") }}</h2>

        <span>
          {{ $t("courses.list.total", { count: courses.length }) }}
        </span>
      </div>

      <p v-if="loading">
        {{ $t("courses.list.loading") }}
      </p>

      <p
        v-else-if="courses.length === 0"
        class="empty-state"
      >
        {{ $t("courses.list.empty") }}
      </p>

      <div v-else class="course-list">
        <article
          v-for="course in courses"
          :key="course.id"
          class="course-card"
          :class="{ archived: !course.active }"
        >
          <div>
            <div class="course-title-row">
              <h3>
                {{ course.code }} — {{ course.name }}
              </h3>

              <span
                class="status"
                :class="course.active ? 'active' : 'inactive'"
              >
                {{
                  course.active
                    ? $t("common.active")
                    : $t("common.archived")
                }}
              </span>
            </div>

            <p v-if="course.description">
              {{ course.description }}
            </p>

            <p v-else class="muted">
              {{ $t("courses.list.noDescription") }}
            </p>
          </div>

          <div class="card-actions">
            <button
              type="button"
              @click="editCourse(course)"
            >
              {{ $t("common.edit") }}
            </button>

            <button
              v-if="course.active"
              type="button"
              class="archive-button"
              @click="confirmArchive(course)"
            >
              {{ $t("common.archive") }}
            </button>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import {
  archiveCourse,
  saveCourse,
  watchCourses,
} from "../services/courseService";

function createEmptyForm() {
  return {
    code: "",
    name: "",
    description: "",
    active: true,
  };
}

export default {
  name: "CourseManager",

  props: {
    schoolId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      courses: [],
      form: createEmptyForm(),
      editingCourseId: null,
      loading: true,
      saving: false,
      message: "",
      errorMessage: "",
      unsubscribeCourses: null,
    };
  },

  computed: {
    isEditing() {
      return Boolean(this.editingCourseId);
    },
  },

  mounted() {
    this.startCoursesListener();
  },

  beforeUnmount() {
    this.stopCoursesListener();
  },

  watch: {
    schoolId() {
      this.resetForm();
      this.startCoursesListener();
    },
  },

  methods: {
    startCoursesListener() {
      this.stopCoursesListener();
      this.loading = true;
      this.errorMessage = "";

      this.unsubscribeCourses = watchCourses(
        this.schoolId,
        (courses) => {
          this.courses = courses;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.errorMessage = this.$t(
            "courses.messages.loadError",
            {
              error: error.message,
            },
          );
        },
      );
    },

    stopCoursesListener() {
      if (this.unsubscribeCourses) {
        this.unsubscribeCourses();
        this.unsubscribeCourses = null;
      }
    },

    editCourse(course) {
      this.editingCourseId = course.id;

      this.form = {
        code: course.code,
        name: course.name,
        description: course.description || "",
        active: course.active !== false,
      };

      this.message = "";
      this.errorMessage = "";
    },

    resetForm() {
      this.form = createEmptyForm();
      this.editingCourseId = null;
      this.message = "";
      this.errorMessage = "";
    },

    async submitCourse() {
      this.saving = true;
      this.message = "";
      this.errorMessage = "";

      try {
        const courseId = await saveCourse(
          this.schoolId,
          this.form,
        );

        this.message = this.$t(
          "courses.messages.saved",
          {
            code: courseId,
          },
        );

        this.form = createEmptyForm();
        this.editingCourseId = null;
      } catch (error) {
        this.errorMessage = this.$t(
          "courses.messages.saveError",
          {
            error: error.message,
          },
        );
      } finally {
        this.saving = false;
      }
    },

    async confirmArchive(course) {
      const confirmed = window.confirm(
        this.$t("courses.messages.archiveConfirm", {
          code: course.code,
          name: course.name,
        }),
      );

      if (!confirmed) {
        return;
      }

      this.message = "";
      this.errorMessage = "";

      try {
        await archiveCourse(
          this.schoolId,
          course.id,
        );

        this.message = this.$t(
          "courses.messages.archived",
          {
            code: course.code,
          },
        );

        if (this.editingCourseId === course.id) {
          this.resetForm();
        }
      } catch (error) {
        this.errorMessage = this.$t(
          "courses.messages.archiveError",
          {
            error: error.message,
          },
        );
      }
    },
  },
};
</script>

<style scoped>
.page {
  padding: 30px;
  max-width: 1100px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1,
.panel h2 {
  margin-top: 0;
}

.page-header p,
.muted {
  color: #666;
}

.panel {
  background: white;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

.course-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 7px;
  font-weight: 600;
}

input,
textarea {
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 10px 12px;
  font: inherit;
}

textarea {
  resize: vertical;
}

.full-width {
  grid-column: 1 / -1;
}

.checkbox-label {
  flex-direction: row;
  align-items: center;
}

.checkbox-label input {
  width: auto;
}

.form-actions,
.card-actions,
.section-heading,
.course-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-heading,
.course-title-row {
  justify-content: space-between;
}

.section-heading h2,
.course-title-row h3,
.course-card p {
  margin: 0;
}

button {
  border: 0;
  border-radius: 8px;
  padding: 10px 14px;
  cursor: pointer;
}

.primary-button {
  background: #42b883;
  color: white;
}

.secondary-button {
  background: #e7e7e7;
}

.archive-button {
  background: #f8d7da;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.course-list {
  display: grid;
  gap: 14px;
  margin-top: 18px;
}

.course-card {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 18px;
}

.course-card.archived {
  opacity: 0.65;
  background: #f7f7f7;
}

.status {
  border-radius: 999px;
  padding: 4px 9px;
  font-size: 0.8rem;
  white-space: nowrap;
}

.status.active {
  background: #d8f3e7;
}

.status.inactive {
  background: #e5e5e5;
}

.success-message {
  color: #18794e;
}

.error-message {
  color: #b42318;
}

.empty-state {
  color: #666;
}

@media (max-width: 700px) {
  .course-form {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: auto;
  }

  .course-card,
  .course-title-row {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>