<template>
  <div
    class="page"
    :class="{ embedded: isEmbedded }"
  >
    <header
      v-if="!isEmbedded"
      class="page-header"
    >
      <h1>👥 {{ $t("enrollments.title") }}</h1>
      <p>{{ $t("enrollments.description") }}</p>
    </header>

    <section
      v-if="!isEmbedded"
      class="panel"
    >
      <label class="class-select">
        {{ $t("enrollments.fields.class") }}

        <select v-model="selectedClassId">
          <option value="">
            {{ $t("enrollments.placeholders.class") }}
          </option>

          <option
            v-for="item in activeClasses"
            :key="item.id"
            :value="item.id"
          >
            {{ item.code }} — {{ item.name }}
          </option>
        </select>
      </label>

      <p
        v-if="classes.length === 0"
        class="error"
      >
        {{ $t("enrollments.messages.classRequired") }}
      </p>
    </section>

    <p
      v-if="errorMessage"
      class="feedback error"
    >
      {{ errorMessage }}
    </p>

    <p
      v-if="message"
      class="feedback success"
    >
      {{ message }}
    </p>

    <template v-if="selectedClassId">
      <section class="panel">
        <div class="section-heading">
          <div>
            <h2>
              {{ $t("enrollments.available.title") }}
            </h2>

            <p>
              {{
                $t("enrollments.available.count", {
                  count: availableStudents.length,
                })
              }}
            </p>
          </div>

          <input
            v-model.trim="search"
            class="search"
            :placeholder="$t('enrollments.placeholders.search')"
          />
        </div>

        <p v-if="loadingStudents || loadingEnrollments">
          {{ $t("enrollments.available.loading") }}
        </p>

        <p v-else-if="filteredAvailableStudents.length === 0">
          {{ $t("enrollments.available.empty") }}
        </p>

        <article
          v-for="student in filteredAvailableStudents"
          :key="student.id"
          class="card"
        >
          <div>
            <h3>#{{ student.id }} — {{ student.name }}</h3>

            <p>
              {{ student.hiragana }}

              <span v-if="student.country">
                · {{ student.country }}
              </span>
            </p>
          </div>

          <button
            class="primary"
            :disabled="savingStudentId === String(student.id)"
            @click="addStudent(student)"
          >
            {{
              savingStudentId === String(student.id)
                ? $t("enrollments.actions.adding")
                : $t("enrollments.actions.add")
            }}
          </button>
        </article>
      </section>

      <section class="panel">
        <div class="section-heading">
          <div>
            <h2>
              {{ $t("enrollments.enrolled.title") }}
            </h2>

            <p>
              {{
                $t("enrollments.enrolled.summary", {
                  active: activeEnrollments.length,
                  archived: archivedEnrollments.length,
                })
              }}
            </p>
          </div>

          <label class="archived-toggle">
            <input
              v-model="showArchived"
              type="checkbox"
            />

            {{ $t("enrollments.enrolled.showArchived") }}
          </label>
        </div>

        <p v-if="visibleEnrollments.length === 0">
          {{ $t("enrollments.enrolled.empty") }}
        </p>

        <article
          v-for="enrollment in visibleEnrollments"
          :key="enrollment.id"
          class="card"
          :class="{ archived: !enrollment.active }"
        >
          <div>
            <h3>
              {{ studentLabel(enrollment.studentId) }}
            </h3>

            <p>
              {{
                enrollment.active
                  ? $t("enrollments.status.active")
                  : $t("enrollments.status.archived")
              }}
            </p>
          </div>

          <div class="actions">
            <button
              v-if="!enrollment.active"
              class="primary"
              @click="reactivateStudent(enrollment)"
            >
              {{ $t("enrollments.actions.reactivate") }}
            </button>

            <button
              v-else
              class="archive"
              @click="confirmArchive(enrollment)"
            >
              {{ $t("common.archive") }}
            </button>
          </div>
        </article>
      </section>
    </template>
  </div>
</template>

<script>
import {
  watchClasses,
} from "../services/classService";
import {
  watchStudents,
} from "../services/studentService";
import {
  archiveEnrollment,
  enrollStudent,
  watchEnrollments,
} from "../services/enrollmentService";

export default {
  name: "EnrollmentManager",

  props: {
    schoolId: {
      type: String,
      required: true,
    },

    classId: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      classes: [],
      students: [],
      enrollments: [],
      selectedClassId: this.classId || "",
      search: "",
      showArchived: false,
      loadingStudents: true,
      loadingEnrollments: false,
      savingStudentId: "",
      message: "",
      errorMessage: "",
      unsubscribeClasses: null,
      unsubscribeStudents: null,
      unsubscribeEnrollments: null,
    };
  },

  computed: {
    isEmbedded() {
      return Boolean(this.classId);
    },

    activeClasses() {
      return this.classes.filter(
        (item) => item.active !== false,
      );
    },

    enrollmentByStudentId() {
      return new Map(
        this.enrollments.map((item) => [
          String(item.studentId),
          item,
        ]),
      );
    },

    availableStudents() {
      return this.students.filter((student) => {
        const enrollment =
          this.enrollmentByStudentId.get(
            String(student.id),
          );

        return (
          student.isActive !== false &&
          !enrollment
        );
      });
    },

    filteredAvailableStudents() {
      const query = this.search.toLowerCase();

      if (!query) {
        return this.availableStudents;
      }

      return this.availableStudents.filter(
        (student) =>
          [
            student.id,
            student.name,
            student.hiragana,
            student.country,
          ].some((value) =>
            String(value || "")
              .toLowerCase()
              .includes(query),
          ),
      );
    },

    activeEnrollments() {
      return this.enrollments.filter(
        (item) => item.active !== false,
      );
    },

    archivedEnrollments() {
      return this.enrollments.filter(
        (item) => item.active === false,
      );
    },

    visibleEnrollments() {
      return this.enrollments.filter(
        (item) =>
          this.showArchived ||
          item.active !== false,
      );
    },
  },

  watch: {
    schoolId() {
      this.selectedClassId = this.classId || "";
      this.search = "";
      this.showArchived = false;
      this.startBaseListeners();
    },

    classId(newClassId) {
      this.selectedClassId = newClassId || "";
      this.search = "";
      this.showArchived = false;
      this.message = "";
      this.errorMessage = "";
    },

    selectedClassId(classId) {
      this.startEnrollmentListener(classId);
      this.message = "";
      this.errorMessage = "";
    },
  },

  mounted() {
    this.startBaseListeners();

    if (this.selectedClassId) {
      this.startEnrollmentListener(
        this.selectedClassId,
      );
    }
  },

  beforeUnmount() {
    this.stopAllListeners();
  },

  methods: {
    startBaseListeners() {
      this.stopAllListeners();
      this.loadingStudents = true;
      this.errorMessage = "";

      try {
        this.unsubscribeClasses = watchClasses(
          this.schoolId,
          (items) => {
            this.classes = items;

            if (
              !this.isEmbedded &&
              this.selectedClassId &&
              !items.some(
                (item) =>
                  item.id === this.selectedClassId &&
                  item.active !== false,
              )
            ) {
              this.selectedClassId = "";
            }
          },
          (error) => {
            this.errorMessage = this.$t(
              "enrollments.messages.classesLoadError",
              {
                error: error.message,
              },
            );
          },
        );

        this.unsubscribeStudents = watchStudents(
          this.schoolId,
          (items) => {
            this.students = items;
            this.loadingStudents = false;
          },
          (error) => {
            this.loadingStudents = false;

            this.errorMessage = this.$t(
              "enrollments.messages.studentsLoadError",
              {
                error: error.message,
              },
            );
          },
        );
      } catch (error) {
        this.loadingStudents = false;

        this.errorMessage = this.$t(
          "enrollments.messages.loadError",
          {
            error: error.message,
          },
        );
      }
    },

    startEnrollmentListener(classId) {
      if (this.unsubscribeEnrollments) {
        this.unsubscribeEnrollments();
      }

      this.unsubscribeEnrollments = null;
      this.enrollments = [];
      this.loadingEnrollments = false;

      if (!classId) {
        return;
      }

      this.loadingEnrollments = true;

      this.unsubscribeEnrollments = watchEnrollments(
        this.schoolId,
        classId,
        (items) => {
          this.enrollments = items;
          this.loadingEnrollments = false;
        },
        (error) => {
          this.loadingEnrollments = false;

          this.errorMessage = this.$t(
            "enrollments.messages.enrollmentsLoadError",
            {
              error: error.message,
            },
          );
        },
      );
    },

    stopAllListeners() {
      [
        this.unsubscribeClasses,
        this.unsubscribeStudents,
        this.unsubscribeEnrollments,
      ].forEach((unsubscribe) => {
        if (unsubscribe) {
          unsubscribe();
        }
      });

      this.unsubscribeClasses = null;
      this.unsubscribeStudents = null;
      this.unsubscribeEnrollments = null;
    },

    studentLabel(studentId) {
      const student = this.students.find(
        (item) =>
          String(item.id) === String(studentId),
      );

      return student
        ? `#${student.id} — ${student.name}`
        : this.$t(
            "enrollments.enrolled.unknownStudent",
            {
              id: studentId,
            },
          );
    },

    async addStudent(student) {
      this.savingStudentId = String(student.id);
      this.message = "";
      this.errorMessage = "";

      try {
        await enrollStudent(
          this.schoolId,
          this.selectedClassId,
          student.id,
        );

        this.message = this.$t(
          "enrollments.messages.added",
          {
            name: student.name,
          },
        );
      } catch (error) {
        this.errorMessage = this.$t(
          "enrollments.messages.addError",
          {
            error: error.message,
          },
        );
      } finally {
        this.savingStudentId = "";
      }
    },

    async reactivateStudent(enrollment) {
      this.message = "";
      this.errorMessage = "";

      const student = this.studentLabel(
        enrollment.studentId,
      );

      try {
        await enrollStudent(
          this.schoolId,
          this.selectedClassId,
          enrollment.studentId,
        );

        this.message = this.$t(
          "enrollments.messages.reactivated",
          {
            student,
          },
        );
      } catch (error) {
        this.errorMessage = this.$t(
          "enrollments.messages.reactivateError",
          {
            error: error.message,
          },
        );
      }
    },

    async confirmArchive(enrollment) {
      const student = this.studentLabel(
        enrollment.studentId,
      );

      const confirmed = window.confirm(
        this.$t(
          "enrollments.messages.archiveConfirm",
          {
            student,
          },
        ),
      );

      if (!confirmed) {
        return;
      }

      this.message = "";
      this.errorMessage = "";

      try {
        await archiveEnrollment(
          this.schoolId,
          this.selectedClassId,
          enrollment.studentId,
        );

        this.message = this.$t(
          "enrollments.messages.archived",
          {
            student,
          },
        );
      } catch (error) {
        this.errorMessage = this.$t(
          "enrollments.messages.archiveError",
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

.page.embedded {
  max-width: none;
  padding: 0;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1,
.panel h2 {
  margin-top: 0;
}

.page-header p,
.section-heading p {
  color: #666;
}

.panel {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

.class-select {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 600;
}

.class-select select,
.search {
  box-sizing: border-box;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 10px 12px;
  font: inherit;
}

.section-heading,
.card,
.actions,
.archived-toggle {
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-heading,
.card {
  justify-content: space-between;
}

.section-heading {
  margin-bottom: 12px;
}

.section-heading h2,
.section-heading p,
.card h3,
.card p {
  margin: 4px 0;
}

.search {
  min-width: 260px;
}

.card {
  border-top: 1px solid #eee;
  padding: 16px 0;
}

.primary {
  background: #42b883;
  color: #fff;
}

.archive {
  background: #b63b3b;
  color: #fff;
}

button {
  border: 0;
  border-radius: 8px;
  padding: 10px 14px;
  cursor: pointer;
}

.archived {
  opacity: 0.62;
}

.feedback {
  padding: 11px 14px;
  border-radius: 8px;
}

.success {
  color: #18794e;
}

.feedback.success {
  background: #e7f7ed;
}

.error {
  color: #b42318;
}

.feedback.error {
  background: #fde8e8;
}

@media (max-width: 700px) {
  .section-heading,
  .card {
    align-items: stretch;
    flex-direction: column;
  }

  .search {
    min-width: 0;
    width: 100%;
  }
}
</style>