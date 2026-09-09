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

        <div class="teacher-assignment full">
          <div class="assigned-teachers-panel">
            <div class="assigned-teachers-header">
              <strong>
                {{ $t("classes.fields.teachers") }}
                ({{ assignedTeachers.length }})
              </strong>

              <button
                type="button"
                class="assigned-teacher-add"
                :disabled="
                  availableTeachersToAdd.length === 0
                "
                @click="openTeacherModal"
              >
                {{
                  $t(
                    "classes.actions.addTeacher"
                  )
                }}
              </button>
            </div>

            <div
              v-if="assignedTeachers.length === 0"
              class="assigned-teachers-empty"
            >
              {{
                $t(
                  "classes.messages.noAssignedTeachers"
                )
              }}
            </div>

            <div
              v-else
              class="assigned-teacher-list"
            >
              <div
                v-for="teacher in assignedTeachers"
                :key="teacher.id"
                class="assigned-teacher-row"
              >
                <div class="assigned-teacher-profile">
                  <div
                    class="assigned-teacher-avatar"
                    aria-hidden="true"
                  >
                    {{
                      teacherInitials(
                        teacher
                      )
                    }}
                  </div>

                  <div class="assigned-teacher-info">
                    <div class="assigned-teacher-name">
                      <strong>
                        {{
                          teacherLabel(
                            teacher
                          )
                        }}
                      </strong>

                      <span
                        v-if="
                          form.mainTeacherUid ===
                          teacher.id
                        "
                        class="main-teacher-badge"
                      >
                        {{
                          $t(
                            "classes.fields.mainTeacher"
                          )
                        }}
                      </span>
                    </div>

                    <span
                      v-if="teacher.email"
                      class="assigned-teacher-email"
                    >
                      {{ teacher.email }}
                    </span>
                  </div>
                </div>

                <div class="assigned-teacher-actions">
                  <button
                    v-if="
                      form.mainTeacherUid !==
                      teacher.id
                    "
                    type="button"
                    class="assigned-teacher-main-button"
                    @click="
                      setMainTeacher(
                        teacher.id
                      )
                    "
                  >
                    {{
                      $t(
                        "classes.actions.setMainTeacher"
                      )
                    }}
                  </button>

                  <button
                    type="button"
                    class="assigned-teacher-remove-button"
                    @click="
                      removeTeacher(
                        teacher.id
                      )
                    "
                  >
                    {{
                      $t(
                        "classes.actions.removeTeacher"
                      )
                    }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

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
          <button
            v-if="item.active !== false"
            class="primary"
            @click="$emit('manage-class', item.id)"
          >
            {{ $t("classes.actions.manage") }}
          </button>
          
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
    <div
      v-if="teacherModalOpen"
      class="teacher-modal-backdrop"
      @click.self="closeTeacherModal"
    >
      <div class="teacher-modal">
        <div class="teacher-modal-header">
          <div>
            <h3>
              {{
                $t(
                  "classes.actions.addTeacher"
                )
              }}
            </h3>

            <p class="teacher-modal-description">
              {{
                $t(
                  "classes.messages.addTeacherDescription"
                )
              }}
            </p>
          </div>

          <button
            type="button"
            class="teacher-modal-close"
            :aria-label="$t('common.close')"
            @click="closeTeacherModal"
          >
            ×
          </button>
        </div>

        <div class="teacher-search">
          <span class="teacher-search-icon">
            ⌕
          </span>

          <input
            v-model="teacherSearch"
            type="search"
            :placeholder="
              $t(
                'classes.placeholders.searchTeachers'
              )
            "
          />
        </div>

        <div
          v-if="
            filteredAvailableTeachers.length
          "
          class="teacher-modal-list"
        >
          <label
            v-for="
              teacher in
              filteredAvailableTeachers
            "
            :key="teacher.id"
            class="teacher-option"
            :class="{
              selected:
                pendingTeacherUids.includes(
                  teacher.id
                ),
            }"
          >
            <input
              v-model="
                pendingTeacherUids
              "
              type="checkbox"
              :value="teacher.id"
            />

            <div class="teacher-avatar">
              {{
                teacherInitials(teacher)
              }}
            </div>

            <div class="teacher-option-info">
              <strong>
                {{
                  teacherLabel(
                    teacher
                  )
                }}
              </strong>

              <span v-if="teacher.email">
                {{ teacher.email }}
              </span>
            </div>
          </label>
        </div>

        <p
          v-else
          class="teacher-empty"
        >
          {{
            teacherSearch
              ? $t(
                  "classes.messages.noMatchingTeachers"
                )
              : $t(
                  "classes.messages.noAvailableTeachers"
                )
          }}
        </p>

        <div class="teacher-modal-footer">
          <strong class="teacher-selection-count">
            {{
              $t(
                "classes.messages.teachersSelected",
                {
                  count:
                    pendingTeacherUids.length,
                }
              )
            }}
          </strong>

          <div class="teacher-modal-actions">
            <button
              type="button"
              class="teacher-cancel-button"
              @click="closeTeacherModal"
            >
              {{ $t("common.cancel") }}
            </button>

            <button
              type="button"
              class="teacher-add-button"
              :disabled="
                pendingTeacherUids.length === 0
              "
              @click="addSelectedTeachers"
            >
              {{
                $t(
                  "classes.actions.addSelectedTeachers"
                )
              }}
            </button>
          </div>
        </div>
      </div>
    </div>
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
import {
  getSchoolMemberships,
  isTeacherMembership,
} from "../services/membershipService";

import {
  getManagedSchoolUsers,
} from "../services/adminUserService";

function emptyForm() {
  return {
    code: "",
    name: "",
    courseId: "",
    roomId: "",
    academicYear: new Date().getFullYear(),
    semester: 1,
    active: true,
    teacherUids: [],
    mainTeacherUid: "",
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

  emits: ["manage-class"],

  data() {
    return {
      classes: [],
      courses: [],
      rooms: [],
      teachers: [],
      teacherModalOpen: false,
      pendingTeacherUids: [],
      teacherSearch: "",
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

    assignedTeachers() {
      const selectedUids =
        new Set(this.form.teacherUids);

      return this.teachers.filter(
        (teacher) =>
          selectedUids.has(teacher.id)
      );
    },

    availableTeachersToAdd() {
      const selectedUids =
        new Set(this.form.teacherUids);

      return this.teachers.filter(
        (teacher) =>
          !selectedUids.has(teacher.id)
      );
    },

    filteredAvailableTeachers() {
      const search =
        this.teacherSearch
          .trim()
          .toLowerCase();

      if (!search) {
        return this.availableTeachersToAdd;
      }

      return this.availableTeachersToAdd.filter(
        (teacher) => {
          const label =
            this.teacherLabel(teacher)
              .toLowerCase();

          const email =
            String(teacher.email || "")
              .toLowerCase();

          return (
            label.includes(search) ||
            email.includes(search)
          );
        }
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
      this.teachers = [];

      try {
        Promise.all([
          getSchoolMemberships(
            this.schoolId
          ),
          getManagedSchoolUsers(
            this.schoolId
          ),
        ])
          .then(
            ([
              memberships,
              users,
            ]) => {
              const teacherUids =
                new Set(
                  memberships
                    .filter(
                      isTeacherMembership
                    )
                    .map(
                      (membership) =>
                        membership.userUid ||
                        membership.id
                    )
                );

              this.teachers =
                users.filter(
                  (user) =>
                    teacherUids.has(
                      user.id
                    ) &&
                    user.active !== false
                );
            }
          )
          .catch((error) => {
            this.errorMessage = this.$t(
              "classes.messages.teachersLoadError",
              {
                error: error.message,
              }
            );
          });

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

    teacherLabel(teacher) {
      const fullName = [
        teacher.firstName,
        teacher.lastName,
      ]
        .filter(Boolean)
        .join(" ")
        .trim();

      return (
        teacher.displayName ||
        fullName ||
        teacher.email ||
        teacher.id
      );
    },

    teacherInitials(teacher) {
      const firstName =
        String(
          teacher.firstName || ""
        ).trim();

      const lastName =
        String(
          teacher.lastName || ""
        ).trim();

      if (firstName || lastName) {
        return [
          firstName.charAt(0),
          lastName.charAt(0),
        ]
          .filter(Boolean)
          .join("")
          .toUpperCase();
      }

      const label =
        this.teacherLabel(teacher)
          .trim();

      const words =
        label.split(/\s+/);

      if (words.length > 1) {
        return (
          words[0].charAt(0) +
          words[1].charAt(0)
        ).toUpperCase();
      }

      return label
        .slice(0, 2)
        .toUpperCase();
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
        teacherUids: Array.isArray(item.teacherUids)
          ? [...item.teacherUids]
          : [],
        mainTeacherUid: item.mainTeacherUid || "",
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

    openTeacherModal() {
      this.pendingTeacherUids = [];
      this.teacherSearch = "";
      this.teacherModalOpen = true;
    },

    closeTeacherModal() {
      this.pendingTeacherUids = [];
      this.teacherSearch = "";
      this.teacherModalOpen = false;
    },

    addSelectedTeachers() {
      const teacherUids =
        [
          ...new Set([
            ...this.form.teacherUids,
            ...this.pendingTeacherUids,
          ]),
        ];

      this.form.teacherUids =
        teacherUids;

      if (
        !this.form.mainTeacherUid &&
        teacherUids.length === 1
      ) {
        this.form.mainTeacherUid =
          teacherUids[0];
      }

      this.closeTeacherModal();
    },

    removeTeacher(teacherUid) {
      this.form.teacherUids =
        this.form.teacherUids.filter(
          (uid) => uid !== teacherUid
        );

      if (
        this.form.mainTeacherUid ===
        teacherUid
      ) {
        this.form.mainTeacherUid = "";

        if (
          this.form.teacherUids.length === 1
        ) {
          this.form.mainTeacherUid =
            this.form.teacherUids[0];
        }
      }
    },

    setMainTeacher(teacherUid) {
      if (
        !this.form.teacherUids.includes(
          teacherUid
        )
      ) {
        return;
      }

      this.form.mainTeacherUid =
        teacherUid;
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

/* ---------------------------------
   Assigned teachers
--------------------------------- */

.teacher-assignment {
  width: 100%;
}

.assigned-teachers-panel {
  width: min(100%, 760px);

  overflow: hidden;

  border: 1px solid #dbe4ee;
  border-radius: 12px;

  background: #fff;
}


/* Header */

.assigned-teachers-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 16px;

  padding:
    10px
    14px;

  border-bottom: 1px solid #e5eaf0;

  background: #f8fafc;
}

.assigned-teachers-header strong {
  color: #0f172a;

  font-size: 0.95rem;
  font-weight: 700;
}

.assigned-teacher-add {
  padding:
    7px
    12px;

  border: 1px solid #e2e8f0;
  border-radius: 8px;

  background: #f1f5f9;
  color: #0f172a;

  font-size: 0.82rem;
  font-weight: 600;

  cursor: pointer;
}

.assigned-teacher-add:hover:not(
  :disabled
) {
  background: #e2e8f0;
}

.assigned-teacher-add:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}


/* Teacher rows */

.assigned-teacher-list {
  display: flex;
  flex-direction: column;
}

.assigned-teacher-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 16px;

  min-height: 58px;

  padding:
    7px
    12px;

  border-bottom: 1px solid #e8edf3;
}

.assigned-teacher-row:last-child {
  border-bottom: 0;
}

.assigned-teacher-row:hover {
  background: #fafbfc;
}


/* Teacher identity */

.assigned-teacher-profile {
  display: flex;
  align-items: center;

  min-width: 0;

  gap: 11px;
}

.assigned-teacher-avatar {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 38px;
  height: 38px;

  flex: 0 0 38px;

  border-radius: 50%;

  background: #e0f2fe;
  color: #0369a1;

  font-size: 0.8rem;
  font-weight: 700;
}

.assigned-teacher-row:nth-child(3n + 2)
  .assigned-teacher-avatar {
  background: #dcfce7;
  color: #15803d;
}

.assigned-teacher-row:nth-child(3n + 3)
  .assigned-teacher-avatar {
  background: #f3e8ff;
  color: #7e22ce;
}

.assigned-teacher-info {
  display: flex;
  flex-direction: column;

  min-width: 0;

  gap: 2px;
}

.assigned-teacher-name {
  display: flex;
  align-items: center;

  min-width: 0;

  gap: 9px;
}

.assigned-teacher-name strong {
  overflow: hidden;

  color: #0f172a;

  font-size: 0.9rem;
  font-weight: 650;

  text-overflow: ellipsis;
  white-space: nowrap;
}

.assigned-teacher-email {
  overflow: hidden;

  color: #64748b;

  font-size: 0.78rem;

  text-overflow: ellipsis;
  white-space: nowrap;
}


/* Main teacher */

.main-teacher-badge {
  display: inline-flex;
  align-items: center;

  flex: 0 0 auto;

  padding:
    3px
    8px;

  border-radius: 999px;

  background: #dbeafe;
  color: #1d4ed8;

  font-size: 0.7rem;
  font-weight: 700;
}


/* Row actions */

.assigned-teacher-actions {
  display: flex;
  align-items: center;

  flex: 0 0 auto;

  gap: 7px;
}

.assigned-teacher-main-button,
.assigned-teacher-remove-button {
  min-height: 32px;

  padding:
    0
    10px;

  border-radius: 7px;

  font-size: 0.78rem;
  font-weight: 600;

  cursor: pointer;
}

.assigned-teacher-main-button {
  border: 1px solid #e2e8f0;

  background: #f1f5f9;
  color: #1e293b;
}

.assigned-teacher-main-button:hover {
  background: #e2e8f0;
}

.assigned-teacher-remove-button {
  border: 1px solid #fecaca;

  background: #fff1f2;
  color: #b42318;
}

.assigned-teacher-remove-button:hover {
  background: #fee2e2;
}


/* Empty state */

.assigned-teachers-empty {
  padding:
    14px
    16px;

  color: #64748b;

  font-size: 0.85rem;
}

.teacher-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 24px;

  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(3px);
}

.teacher-modal {
  display: flex;
  flex-direction: column;

  width: min(560px, 100%);
  max-height: min(760px, 88vh);

  overflow: hidden;

  background: #fff;

  border: 1px solid #e2e8f0;
  border-radius: 18px;

  box-shadow:
    0 28px 70px
    rgba(15, 23, 42, 0.26);
}


/* Header */

.teacher-modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: 20px;

  padding:
    26px
    28px
    18px;
}

.teacher-modal-header h3 {
  margin: 0;

  color: #0f172a;

  font-size: 1.65rem;
  font-weight: 700;
  line-height: 1.2;
}

.teacher-modal-description {
  margin: 7px 0 0;

  color: #64748b;

  font-size: 0.95rem;
  line-height: 1.45;
}

.teacher-modal-close {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 38px;
  height: 38px;

  flex: 0 0 auto;

  padding: 0;

  border: 0;
  border-radius: 10px;

  background: #f1f5f9;
  color: #64748b;

  font-size: 1.3rem;
  line-height: 1;

  cursor: pointer;

  transition:
    background 0.15s ease,
    color 0.15s ease;
}

.teacher-modal-close:hover {
  background: #e2e8f0;
  color: #0f172a;
}


/* Search */

.teacher-search {
  position: relative;

  margin:
    0
    28px
    14px;
}

.teacher-search-icon {
  position: absolute;

  top: 50%;
  left: 16px;

  transform: translateY(-50%);

  color: #64748b;

  pointer-events: none;
}

.teacher-search input {
  width: 100%;

  box-sizing: border-box;

  padding:
    13px
    16px
    13px
    46px;

  border: 1px solid #cbd5e1;
  border-radius: 11px;

  background: #f8fafc;
  color: #0f172a;

  font: inherit;

  outline: none;

  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;
}

.teacher-search input::placeholder {
  color: #94a3b8;
}

.teacher-search input:focus {
  border-color: #94a3b8;

  background: #fff;

  box-shadow:
    0 0 0 3px
    rgba(148, 163, 184, 0.15);
}


/* Teacher list */

.teacher-modal-list {
  min-height: 120px;
  max-height: 420px;

  overflow-y: auto;

  padding:
    0
    18px
    0
    28px;

  scrollbar-width: thin;
  scrollbar-color:
    #cbd5e1
    transparent;
}

.teacher-modal-list::-webkit-scrollbar {
  width: 6px;
}

.teacher-modal-list::-webkit-scrollbar-track {
  background: transparent;
}

.teacher-modal-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 999px;
}


/* IMPORTANT:
   overrides the generic label flex-direction: column */

.teacher-option {
  display: grid;

  grid-template-columns:
    22px
    50px
    minmax(0, 1fr);

  align-items: center;

  flex-direction: row;

  gap: 16px;

  min-height: 76px;

  box-sizing: border-box;

  padding:
    8px
    14px;

  border-bottom:
    1px solid #e8edf3;

  font-weight: normal;

  cursor: pointer;

  transition:
    background 0.15s ease;
}

.teacher-option:last-child {
  border-bottom: 0;
}

.teacher-option:hover {
  background: #f8fafc;
}

.teacher-option.selected {
  background: #eff6ff;
}

.teacher-option input {
  width: 19px;
  height: 19px;

  margin: 0;
  padding: 0;

  cursor: pointer;

  accent-color: #2563eb;
}


/* Avatar */

.teacher-avatar {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  flex-shrink: 0;

  border-radius: 50%;

  background: #e0f2fe;
  color: #0369a1;

  font-size: 0.92rem;
  font-weight: 700;

  user-select: none;
}

.teacher-option:nth-child(3n + 2)
  .teacher-avatar {
  background: #dcfce7;
  color: #15803d;
}

.teacher-option:nth-child(3n + 3)
  .teacher-avatar {
  background: #f3e8ff;
  color: #7e22ce;
}


/* Teacher name/email */

.teacher-option-info {
  display: flex;
  flex-direction: column;

  min-width: 0;

  gap: 3px;
}

.teacher-option-info strong {
  overflow: hidden;

  color: #0f172a;

  font-size: 0.96rem;
  font-weight: 650;

  text-overflow: ellipsis;
  white-space: nowrap;
}

.teacher-option-info span {
  overflow: hidden;

  color: #64748b;

  font-size: 0.86rem;

  text-overflow: ellipsis;
  white-space: nowrap;
}


/* Empty state */

.teacher-empty {
  margin:
    10px
    28px
    24px;

  padding: 28px 18px;

  border-radius: 12px;

  background: #f8fafc;
  color: #64748b;

  text-align: center;

  font-size: 0.92rem;
}


/* Footer */

.teacher-modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 18px;

  margin-top: 0;

  padding:
    18px
    28px;

  border-top:
    1px solid #e2e8f0;

  background: #fff;
}

.teacher-selection-count {
  color: #0f172a;

  font-size: 0.92rem;
  font-weight: 600;
}

.teacher-modal-actions {
  display: flex;
  align-items: center;

  gap: 10px;
}


/* Buttons */

.teacher-cancel-button,
.teacher-add-button {
  min-height: 42px;

  padding:
    0
    18px;

  border-radius: 9px;

  font: inherit;
  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    opacity 0.15s ease;
}

.teacher-cancel-button {
  border: 1px solid #dbe2ea;

  background: #f8fafc;
  color: #0f172a;
}

.teacher-cancel-button:hover {
  background: #f1f5f9;
}

.teacher-add-button {
  border: 1px solid #2563eb;

  background: #2563eb;
  color: #fff;
}

.teacher-add-button:hover:not(
  :disabled
) {
  background: #1d4ed8;
  border-color: #1d4ed8;
}

.teacher-add-button:disabled {
  border-color: #e2e8f0;

  background: #e2e8f0;
  color: #94a3b8;

  cursor: not-allowed;
}


/* Mobile */

@media (max-width: 600px) {
  .teacher-modal-backdrop {
    padding: 12px;
  }

  .teacher-modal {
    max-height: 92vh;

    border-radius: 14px;
  }

  .teacher-modal-header {
    padding:
      20px
      20px
      14px;
  }

  .teacher-search {
    margin:
      0
      20px
      12px;
  }

  .teacher-modal-list {
    padding:
      0
      12px
      0
      20px;
  }

  .teacher-option {
    grid-template-columns:
      20px
      42px
      minmax(0, 1fr);

    gap: 12px;

    min-height: 68px;

    padding:
      7px
      8px;
  }

  .teacher-avatar {
    width: 42px;
    height: 42px;
  }

  .teacher-modal-footer {
    padding:
      14px
      20px;
  }
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

  .assigned-teachers-panel {
    width: 100%;
  }

  .assigned-teacher-row {
    align-items: flex-start;

    gap: 10px;

    padding:
      10px
      11px;
  }

  .assigned-teacher-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .assigned-teacher-main-button,
  .assigned-teacher-remove-button {
    white-space: nowrap;
  }
}
</style>