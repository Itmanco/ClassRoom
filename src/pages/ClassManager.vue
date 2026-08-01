<template>
  <div class="page">
    <header class="page-header">
      <h1>🏷️ {{ $t("classes.title") }}</h1>
      <p>{{ $t("classes.description") }}</p>
    </header>

    <section class="panel">
      <h2>
        {{
          isEditing
            ? $t("classes.form.editTitle")
            : $t("classes.form.addTitle")
        }}
      </h2>

      <form
        class="class-form"
        @submit.prevent="submitClass"
      >
        <label>
          {{ $t("classes.fields.code") }}

          <input
            v-model.trim="form.code"
            :placeholder="$t('classes.placeholders.code')"
            :disabled="isEditing"
            required
          />
        </label>

        <label>
          {{ $t("classes.fields.name") }}

          <input
            v-model.trim="form.name"
            :placeholder="$t('classes.placeholders.name')"
            required
          />
        </label>

        <label>
          {{ $t("classes.fields.course") }}

          <select
            v-model="form.courseId"
            required
          >
            <option
              value=""
              disabled
            >
              {{ $t("classes.placeholders.course") }}
            </option>

            <option
              v-for="course in availableCourses"
              :key="course.id"
              :value="course.id"
            >
              {{ course.code }} — {{ course.name }}
            </option>
          </select>
        </label>

        <label>
          {{ $t("classes.fields.room") }}

          <select
            v-model="form.roomId"
            required
          >
            <option
              value=""
              disabled
            >
              {{ $t("classes.placeholders.room") }}
            </option>

            <option
              v-for="room in availableRooms"
              :key="room.id"
              :value="room.id"
            >
              {{ room.code || room.id }} —
              {{ room.name || $t("classes.list.unnamedRoom") }}
            </option>
          </select>
        </label>

        <label>
          {{ $t("classes.fields.academicYear") }}

          <input
            v-model.number="form.academicYear"
            type="number"
            min="2000"
            max="2100"
            required
          />
        </label>

        <label>
          {{ $t("classes.fields.semester") }}

          <select
            v-model.number="form.semester"
            required
          >
            <option :value="1">1</option>
            <option :value="2">2</option>
            <option :value="3">3</option>
            <option :value="4">4</option>
          </select>
        </label>

        <label class="checkbox full">
          <input
            v-model="form.active"
            type="checkbox"
          />

          {{ $t("common.active") }}
        </label>

        <div class="actions full">
          <button
            class="primary"
            type="submit"
            :disabled="saving || !dependenciesReady"
          >
            {{
              saving
                ? $t("common.saving")
                : isEditing
                  ? $t("classes.actions.update")
                  : $t("classes.actions.add")
            }}
          </button>

          <button
            v-if="isEditing"
            type="button"
            @click="resetForm"
          >
            {{ $t("common.cancel") }}
          </button>
        </div>
      </form>

      <p
        v-if="!dependenciesReady"
        class="error"
      >
        {{ $t("classes.form.dependenciesRequired") }}
      </p>

      <p
        v-if="message"
        class="success"
      >
        {{ message }}
      </p>

      <p
        v-if="errorMessage"
        class="error"
      >
        {{ errorMessage }}
      </p>
    </section>

    <section class="panel">
      <div class="section-heading">
        <h2>{{ $t("classes.list.title") }}</h2>

        <span>
          {{
            $t("classes.list.total", {
              count: classes.length,
            })
          }}
        </span>
      </div>

      <p v-if="loading">
        {{ $t("classes.list.loading") }}
      </p>

      <p v-else-if="classes.length === 0">
        {{ $t("classes.list.empty") }}
      </p>

      <article
        v-for="item in classes"
        :key="item.id"
        class="card"
        :class="{ archived: !item.active }"
      >
        <div>
          <div class="title-row">
            <h3>{{ item.code }} — {{ item.name }}</h3>

            <span>
              {{
                item.active
                  ? $t("common.active")
                  : $t("common.archived")
              }}
            </span>
          </div>

          <p>
            <strong>{{ $t("classes.list.courseLabel") }}</strong>
            {{ courseLabel(item.courseId) }}
          </p>

          <p>
            <strong>{{ $t("classes.list.roomLabel") }}</strong>
            {{ roomLabel(item.roomId) }}
          </p>

          <p>
            <strong>{{ $t("classes.list.periodLabel") }}</strong>
            {{
              $t("classes.list.period", {
                year: item.academicYear,
                semester: item.semester,
              })
            }}
          </p>
        </div>

        <div class="card-actions">
          <button @click="editClass(item)">
            {{ $t("common.edit") }}
          </button>

          <button
            v-if="item.active"
            class="archive"
            @click="confirmArchive(item)"
          >
            {{ $t("common.archive") }}
          </button>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import {
  archiveClass,
  saveClass,
  watchClasses,
} from "../services/classService";
import {
  watchCourses,
} from "../services/courseService";
import {
  watchRooms,
} from "../services/roomService";

function emptyForm() {
  return {
    code: "",
    name: "",
    courseId: "",
    roomId: "",
    academicYear: new Date().getFullYear(),
    semester: 1,
    active: true,
  };
}

export default {
  name: "ClassManager",

  props: {
    schoolId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      classes: [],
      courses: [],
      rooms: [],
      form: emptyForm(),
      editingClassId: null,
      loading: true,
      saving: false,
      message: "",
      errorMessage: "",
      unsubscribers: [],
    };
  },

  computed: {
    isEditing() {
      return Boolean(this.editingClassId);
    },

    availableCourses() {
      return this.courses.filter(
        (item) =>
          item.active !== false ||
          item.id === this.form.courseId,
      );
    },

    availableRooms() {
      return this.rooms.filter(
        (item) =>
          item.active !== false ||
          item.id === this.form.roomId,
      );
    },

    dependenciesReady() {
      return (
        this.availableCourses.length > 0 &&
        this.availableRooms.length > 0
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
      this.resetForm();
      this.startListeners();
    },
  },

  methods: {
    startListeners() {
      this.stopListeners();
      this.loading = true;
      this.errorMessage = "";

      try {
        this.unsubscribers = [
          watchClasses(
            this.schoolId,
            (items) => {
              this.classes = items;
              this.loading = false;
            },
            (error) => {
              this.loading = false;
              this.errorMessage = this.$t(
                "classes.messages.loadError",
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
            },
            (error) => {
              this.errorMessage = this.$t(
                "classes.messages.coursesLoadError",
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
            },
            (error) => {
              this.errorMessage = this.$t(
                "classes.messages.roomsLoadError",
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
          "classes.messages.loadError",
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

    courseLabel(id) {
      const item = this.courses.find(
        (course) => course.id === id,
      );

      return item
        ? `${item.code} — ${item.name}`
        : id;
    },

    roomLabel(id) {
      const item = this.rooms.find(
        (room) => room.id === id,
      );

      if (!item) {
        return id;
      }

      return `${item.code || item.id} — ${
        item.name ||
        this.$t("classes.list.unnamedRoom")
      }`;
    },

    editClass(item) {
      this.editingClassId = item.id;

      this.form = {
        code: item.code || item.id,
        name: item.name,
        courseId: item.courseId,
        roomId: item.roomId,
        academicYear: item.academicYear,
        semester: item.semester,
        active: item.active !== false,
      };

      this.message = "";
      this.errorMessage = "";
    },

    resetForm() {
      this.form = emptyForm();
      this.editingClassId = null;
      this.message = "";
      this.errorMessage = "";
    },

    async submitClass() {
      this.saving = true;
      this.message = "";
      this.errorMessage = "";

      try {
        const id = await saveClass(
          this.schoolId,
          this.form,
        );

        this.message = this.$t(
          "classes.messages.saved",
          {
            code: id,
          },
        );

        this.form = emptyForm();
        this.editingClassId = null;
      } catch (error) {
        this.errorMessage = this.$t(
          "classes.messages.saveError",
          {
            error: error.message,
          },
        );
      } finally {
        this.saving = false;
      }
    },

    async confirmArchive(item) {
      const confirmed = window.confirm(
        this.$t(
          "classes.messages.archiveConfirm",
          {
            code: item.code,
            name: item.name,
          },
        ),
      );

      if (!confirmed) {
        return;
      }

      this.message = "";
      this.errorMessage = "";

      try {
        await archiveClass(
          this.schoolId,
          item.id,
        );

        this.message = this.$t(
          "classes.messages.archived",
          {
            code: item.code,
          },
        );

        if (this.editingClassId === item.id) {
          this.resetForm();
        }
      } catch (error) {
        this.errorMessage = this.$t(
          "classes.messages.archiveError",
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

.page-header p {
  color: #666;
}

.panel {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

.class-form {
  display: grid;
  grid-template-columns:
    repeat(2, minmax(0, 1fr));
  gap: 18px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 7px;
  font-weight: 600;
}

input,
select {
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 10px 12px;
  font: inherit;
}

.checkbox {
  flex-direction: row;
  align-items: center;
}

.checkbox input {
  width: auto;
}

.full {
  grid-column: 1 / -1;
}

.actions,
.card-actions,
.section-heading,
.title-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.section-heading,
.title-row {
  justify-content: space-between;
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

.success {
  color: #18794e;
}

.error {
  color: #b42318;
}

.card {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  border-top: 1px solid #eee;
  padding: 18px 0;
}

.card h3,
.card p {
  margin: 4px 0;
}

.archived {
  opacity: 0.65;
}

@media (max-width: 700px) {
  .class-form {
    grid-template-columns: 1fr;
  }

  .full {
    grid-column: auto;
  }

  .card {
    flex-direction: column;
  }
}
</style>