<template>
  <section class="student-manager">
    <header class="page-header">
      <div>
        <h1>👨‍🎓 {{ $t("students.title") }}</h1>

        <p>
          {{ $t("students.description") }}
        </p>
      </div>

      <div class="summary">
        <strong>{{ activeStudentCount }}</strong>
        {{
          $t("students.summary", {
            active: activeStudentCount,
            total: students.length,
          })
        }}
      </div>
    </header>

    <p v-if="errorMessage" class="message error">
      {{ errorMessage }}
    </p>

    <p v-if="successMessage" class="message success">
      {{ successMessage }}
    </p>

    <div class="content-grid">
      <form
        v-if="
          canCreateStudents ||
          (canEditStudents &&
            editingStudentId !== null)
        "
        class="card form-card"
        @submit.prevent="handleSave"
      >
        <h2>
          {{
            editingStudentId === null
              ? $t("students.form.addTitle")
              : $t("students.form.editTitle")
          }}
        </h2>

        <label>
          {{ $t("students.fields.id") }}

          <input
            v-model.number="form.id"
            type="number"
            min="1"
            disabled
            required
          />
        </label>

        <small>
          {{ $t("students.form.idHelp") }}
        </small>

        <label>
          {{ $t("students.fields.name") }}

          <input
            v-model.trim="form.name"
            type="text"
            maxlength="80"
            :placeholder="$t('students.placeholders.name')"
            required
          />
        </label>

        <label>
          {{ $t("students.fields.hiragana") }}

          <input
            v-model.trim="form.hiragana"
            type="text"
            maxlength="80"
            :placeholder="$t('students.placeholders.hiragana')"
            required
          />
        </label>

        <label>
          {{ $t("students.fields.country") }}

          <input
            v-model.trim="form.country"
            type="text"
            maxlength="80"
            :placeholder="$t('students.placeholders.country')"
          />
        </label>

        <label>
          {{ $t("students.fields.gender") }}

          <select v-model.number="form.gender_id" required>
            <option :value="1">
              {{ $t("students.gender.male") }}
            </option>

            <option :value="2">
              {{ $t("students.gender.female") }}
            </option>

            <option :value="3">
              {{ $t("students.gender.other") }}
            </option>
          </select>
        </label>

        <label
          v-if="canManageStudentStatus"
          class="checkbox-label"
        >
          <input v-model="form.isActive" type="checkbox" />

          {{ $t("students.fields.active") }}
        </label>

        <div class="form-actions">
          <button type="submit" :disabled="saving">
            {{
              saving
                ? $t("common.saving")
                : editingStudentId === null
                  ? $t("students.actions.add")
                  : $t("common.saveChanges")
            }}
          </button>

          <button
            v-if="editingStudentId !== null"
            type="button"
            class="secondary"
            @click="resetForm"
          >
            {{ $t("common.cancel") }}
          </button>
        </div>
      </form>

      <div class="card list-card">
        <div class="list-toolbar">
          <h2>{{ $t("students.list.title") }}</h2>

          <input
            v-model.trim="searchText"
            type="search"
            :placeholder="$t('students.list.searchPlaceholder')"
          />

          <label class="checkbox-label compact">
            <input v-model="showArchived" type="checkbox" />

            {{ $t("students.list.showArchived") }}
          </label>
        </div>

        <p v-if="loading">
          {{ $t("students.list.loading") }}
        </p>

        <p
          v-else-if="filteredStudents.length === 0"
          class="empty-state"
        >
          {{ $t("students.list.empty") }}
        </p>

        <div v-else class="student-list">
          <article
            v-for="student in filteredStudents"
            :key="student.id"
            class="student-row"
            :class="{ archived: student.isActive === false }"
          >
            <div class="student-details">
              <div class="student-title">
                <strong>{{ student.name }}</strong>

                <span class="student-id">
                  #{{ student.id }}
                </span>

                <span
                  class="status"
                  :class="
                    student.isActive === false
                      ? 'inactive'
                      : 'active'
                  "
                >
                  {{
                    student.isActive === false
                      ? $t("common.archived")
                      : $t("common.active")
                  }}
                </span>
              </div>

              <div>{{ student.hiragana }}</div>

              <small>
                {{ genderLabel(student.gender_id) }}

                <span v-if="student.country">
                  · {{ student.country }}
                </span>
              </small>
            </div>

            <div class="row-actions">
              <button
                v-if="canEditStudents"
                type="button"
                class="secondary"
                @click="editStudent(student)"
              >
                {{ $t("common.edit") }}
              </button>

              <button
                v-if="canManageStudentAccounts"
                type="button"
                class="secondary"
                @click="openStudentAccount(student)"
              >
                {{ $t("students.actions.account") }}
              </button>

              <button
                v-if="
                  canManageStudentStatus &&
                  student.isActive !== false
                "
                type="button"
                class="danger"
                @click="handleArchive(student)"
              >
                {{ $t("common.archive") }}
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>

    <div
      v-if="accountStudent"
      class="account-overlay"
      @click.self="closeStudentAccount"
    >
      <section class="card account-card">
        <div class="account-header">
          <div>
            <h2>
              {{ $t("students.account.title") }}
            </h2>

            <p>
              {{ accountStudent.name }}
              · #{{ accountStudent.id }}
            </p>
          </div>

          <button
            type="button"
            class="secondary"
            :disabled="accountSaving"
            @click="closeStudentAccount"
          >
            {{ $t("common.close") }}
          </button>
        </div>

        <p v-if="accountLoading">
          {{ $t("students.account.loading") }}
        </p>

        <template v-else-if="accountStudent.userUid">
          <div class="account-status linked">
            <strong>
              {{ $t("students.account.linkedTitle") }}
            </strong>

            <template v-if="linkedAccount">
              <span>
                {{
                  linkedAccount.displayName ||
                  linkedAccount.email
                }}
              </span>

              <small>
                {{ linkedAccount.email }}
              </small>
            </template>

            <small v-else>
              {{ accountStudent.userUid }}
            </small>
          </div>

          <button
            type="button"
            class="danger"
            :disabled="accountSaving"
            @click="handleUnlinkStudentAccount"
          >
            {{
              accountSaving
                ? $t("common.saving")
                : $t("students.account.unlink")
            }}
          </button>
        </template>

        <template v-else>
          <p>
            {{ $t("students.account.notLinked") }}
          </p>

          <label>
            {{ $t("students.account.selectAccount") }}

            <select
              v-model="selectedAccountUid"
              :disabled="accountSaving"
            >
              <option value="">
                {{ $t("students.account.selectPlaceholder") }}
              </option>

              <option
                v-for="user in eligibleStudentAccounts"
                :key="user.id"
                :value="user.id"
              >
                {{
                  user.displayName ||
                  user.email ||
                  user.id
                }}
                · {{ user.email }}
              </option>
            </select>
          </label>

          <p
            v-if="eligibleStudentAccounts.length === 0"
            class="empty-state"
          >
            {{ $t("students.account.noEligibleAccounts") }}
          </p>

          <button
            type="button"
            :disabled="
              accountSaving ||
              !selectedAccountUid
            "
            @click="handleLinkStudentAccount"
          >
            {{
              accountSaving
                ? $t("common.saving")
                : $t("students.account.link")
            }}
          </button>
        </template>
      </section>
    </div>
  </section>
</template>

<script>
import {
  archiveStudent,
  getNextStudentId,
  saveStudent,
  watchStudents,
} from "../services/studentService";

import {
  getManagedSchoolUsers,
} from "../services/adminUserService";

import {
  linkStudentAccount,
  unlinkStudentAccount,
} from "../services/studentAccountService";

function emptyForm() {
  return {
    id: 1,
    name: "",
    hiragana: "",
    country: "",
    gender_id: 1,
    isActive: true,
  };
}

export default {
  name: "StudentManager",

  props: {
    schoolId: {
      type: String,
      required: true,
    },
    actorRole: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      students: [],
      form: emptyForm(),
      editingStudentId: null,
      unsubscribeStudents: null,
      loading: true,
      saving: false,
      searchText: "",
      showArchived: false,
      errorMessage: "",
      successMessage: "",
      accountStudent: null,
      schoolUsers: [],
      accountLoading: false,
      accountSaving: false,
      selectedAccountUid: "",
    };
  },

  computed: {
    canCreateStudents() {
      return (
        this.actorRole === "system-admin" ||
        this.actorRole === "school-admin"
      );
    },

    canEditStudents() {
      return (
        this.actorRole === "system-admin" ||
        this.actorRole === "school-admin" ||
        this.actorRole === "teacher"
      );
    },

    canManageStudentStatus() {
      return (
        this.actorRole === "system-admin" ||
        this.actorRole === "school-admin"
      );
    },

    activeStudentCount() {
      return this.students.filter(
        (student) => student.isActive !== false,
      ).length;
    },

    filteredStudents() {
      const search = this.searchText.toLocaleLowerCase();

      return this.students.filter((student) => {
        if (
          !this.showArchived &&
          student.isActive === false
        ) {
          return false;
        }

        if (!search) {
          return true;
        }

        return [
          student.id,
          student.name,
          student.hiragana,
          student.country,
        ].some((value) =>
          String(value || "")
            .toLocaleLowerCase()
            .includes(search),
        );
      });
    },

    canManageStudentAccounts() {
      return (
        this.actorRole === "system-admin" ||
        this.actorRole === "school-admin"
      );
    },

    eligibleStudentAccounts() {
      return this.schoolUsers.filter(
        (user) =>
          user.schoolRole === "student" &&
          user.active !== false &&
          user.membershipActive !== false &&
          (
            !user.linkedStudentId ||
            user.linkedStudentId ===
              this.accountStudent?.id
          ),
      );
    },

    linkedAccount() {
      if (
        !this.accountStudent?.userUid
      ) {
        return null;
      }

      return (
        this.schoolUsers.find(
          (user) =>
            user.id ===
            this.accountStudent.userUid,
        ) || null
      );
    },
  },

  watch: {
    schoolId() {
      this.startStudentListener();
      this.resetForm();
    },
  },

  mounted() {
    this.startStudentListener();
    this.prepareNextStudentId();
  },

  beforeUnmount() {
    this.stopStudentListener();
  },

  methods: {
    startStudentListener() {
      this.stopStudentListener();
      this.loading = true;
      this.errorMessage = "";

      if (!this.schoolId) {
        this.loading = false;
        this.errorMessage = this.$t(
          "students.messages.noActiveSchool",
        );
        return;
      }

      try {
        this.unsubscribeStudents = watchStudents(
          this.schoolId,
          (students) => {
            this.students = students;
            this.loading = false;
          },
          (error) => {
            this.loading = false;
            this.errorMessage = this.$t(
              "students.messages.loadError",
              {
                error: error.message,
              },
            );
          },
        );
      } catch (error) {
        this.loading = false;
        this.errorMessage = this.$t(
          "students.messages.loadError",
          {
            error: error.message,
          },
        );
      }
    },

    stopStudentListener() {
      if (this.unsubscribeStudents) {
        this.unsubscribeStudents();
        this.unsubscribeStudents = null;
      }
    },

    async prepareNextStudentId() {
      if (
        !this.canCreateStudents ||
        !this.schoolId ||
        this.editingStudentId !== null
      ) {
        return;
      }

      try {
        this.form.id = await getNextStudentId(
          this.schoolId,
        );
      } catch (error) {
        this.errorMessage = this.$t(
          "students.messages.nextIdError",
          {
            error: error.message,
          },
        );
      }
    },

    async handleSave() {
      const isCreating =
        this.editingStudentId === null;

      if (
        (isCreating && !this.canCreateStudents) ||
        (!isCreating && !this.canEditStudents)
      ) {
        return;
      }

      this.saving = true;
      this.errorMessage = "";
      this.successMessage = "";

      const wasCreating = isCreating;
      const studentName = this.form.name;

      try {
        const studentData = {
          ...this.form,
        };

        if (
          !this.canManageStudentStatus &&
          !isCreating
        ) {
          const existingStudent =
            this.students.find(
              (student) =>
                student.id ===
                this.editingStudentId,
            );

          if (existingStudent) {
            studentData.isActive =
              existingStudent.isActive !== false;
          }
        }

        await saveStudent(
          this.schoolId,
          studentData,
          this.editingStudentId,
          {
            actorRole:
              this.actorRole,
          },
        );

        this.successMessage = wasCreating
          ? this.$t("students.messages.added", {
              name: studentName,
            })
          : this.$t("students.messages.updated", {
              name: studentName,
            });

        await this.resetForm();
      } catch (error) {
        this.errorMessage = this.$t(
          "students.messages.saveError",
          {
            error: error.message,
          },
        );
      } finally {
        this.saving = false;
      }
    },

    editStudent(student) {
      if (!this.canEditStudents) {
        return;
      }

      this.editingStudentId = student.id;

      this.form = {
        id: student.id,
        name: student.name || "",
        hiragana: student.hiragana || "",
        country: student.country || "",
        gender_id: Number(student.gender_id) || 1,
        isActive: student.isActive !== false,
      };

      this.successMessage = "";
      this.errorMessage = "";

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    async handleArchive(student) {
      if (!this.canManageStudentStatus) {
        return;
      }

      const confirmed = window.confirm(
        this.$t("students.messages.archiveConfirm", {
          name: student.name,
        }),
      );

      if (!confirmed) {
        return;
      }

      this.errorMessage = "";
      this.successMessage = "";

      try {
        await archiveStudent(
          this.schoolId,
          student.id,
          {
            actorRole:
              this.actorRole,
          },
        );

        this.successMessage = this.$t(
          "students.messages.archived",
          {
            name: student.name,
          },
        );

        if (this.editingStudentId === student.id) {
          await this.resetForm();
        }
      } catch (error) {
        this.errorMessage = this.$t(
          "students.messages.archiveError",
          {
            error: error.message,
          },
        );
      }
    },

    async resetForm() {
      this.editingStudentId = null;
      this.form = emptyForm();
      await this.prepareNextStudentId();
    },

    genderLabel(genderId) {
      const translationKeys = {
        1: "students.gender.male",
        2: "students.gender.female",
        3: "students.gender.other",
      };

      const key =
        translationKeys[Number(genderId)] ||
        "students.gender.notSpecified";

      return this.$t(key);
    },

    async openStudentAccount(student) {
      if (!this.canManageStudentAccounts) {
        return;
      }

      this.accountStudent = student;
      this.accountLoading = true;
      this.accountSaving = false;
      this.selectedAccountUid =
        student.userUid || "";
      this.errorMessage = "";
      this.successMessage = "";

      try {
        const users =
          await getManagedSchoolUsers(
            this.schoolId,
          );

        const linkedByUid =
          new Map();

        this.students.forEach(
          (existingStudent) => {
            if (existingStudent.userUid) {
              linkedByUid.set(
                existingStudent.userUid,
                existingStudent.id,
              );
            }
          },
        );

        this.schoolUsers =
          users.map((user) => ({
            ...user,
            linkedStudentId:
              linkedByUid.get(
                user.id,
              ) || null,
          }));
      } catch (error) {
        this.errorMessage = this.$t(
          "students.account.loadError",
          {
            error: error.message,
          },
        );
      } finally {
        this.accountLoading = false;
      }
    },

    closeStudentAccount() {
      this.accountStudent = null;
      this.schoolUsers = [];
      this.selectedAccountUid = "";
      this.accountLoading = false;
    },

    async handleLinkStudentAccount() {
      if (
        !this.canManageStudentAccounts ||
        !this.accountStudent ||
        !this.selectedAccountUid
      ) {
        return;
      }

      this.accountSaving = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        await linkStudentAccount(
          this.schoolId,
          String(
            this.accountStudent.id,
          ),
          this.selectedAccountUid,
        );

        this.successMessage = this.$t(
          "students.account.linked",
          {
            name:
              this.accountStudent.name,
          },
        );

        this.closeStudentAccount();
      } catch (error) {
        this.errorMessage = this.$t(
          "students.account.linkError",
          {
            error: error.message,
          },
        );
      } finally {
        this.accountSaving = false;
      }
    },

    async handleUnlinkStudentAccount() {
      if (
        !this.canManageStudentAccounts ||
        !this.accountStudent?.userUid
      ) {
        return;
      }

      const confirmed =
        window.confirm(
          this.$t(
            "students.account.unlinkConfirm",
            {
              name:
                this.accountStudent.name,
            },
          ),
        );

      if (!confirmed) {
        return;
      }

      this.accountSaving = true;
      this.errorMessage = "";
      this.successMessage = "";

      const studentName =
        this.accountStudent.name;

      try {
        await unlinkStudentAccount(
          this.schoolId,
          String(
            this.accountStudent.id,
          ),
        );

        this.successMessage = this.$t(
          "students.account.unlinked",
          {
            name: studentName,
          },
        );

        this.closeStudentAccount();
      } catch (error) {
        this.errorMessage = this.$t(
          "students.account.unlinkError",
          {
            error: error.message,
          },
        );
      } finally {
        this.accountSaving = false;
      }
    },
  },
};
</script>

<style scoped>
.student-manager {
  padding: 30px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
  margin-bottom: 20px;
}

.page-header h1 {
  margin: 0 0 8px;
}

.page-header p {
  margin: 0;
  color: #555;
}

.summary {
  padding: 10px 14px;
  border-radius: 8px;
  background: #f1f3f5;
  white-space: nowrap;
}

.content-grid {
  display: grid;
  grid-template-columns:
    minmax(280px, 360px)
    minmax(420px, 1fr);
  gap: 24px;
  align-items: start;
}

.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  background: white;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.card h2 {
  margin-top: 0;
}

.form-card {
  display: grid;
  gap: 14px;
}

label {
  display: grid;
  gap: 6px;
  font-weight: 600;
}

input,
select {
  box-sizing: border-box;
  width: 100%;
  padding: 9px 10px;
  border: 1px solid #bbb;
  border-radius: 6px;
  font: inherit;
}

input:disabled {
  background: #eee;
}

small {
  color: #666;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 400;
}

.checkbox-label input {
  width: auto;
}

.compact {
  white-space: nowrap;
}

.form-actions,
.row-actions {
  display: flex;
  gap: 8px;
}

button {
  padding: 9px 14px;
  border: 0;
  border-radius: 6px;
  background: #1f6feb;
  color: white;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button.secondary {
  background: #6c757d;
}

button.danger {
  background: #b42318;
}

.message {
  padding: 10px 14px;
  border-radius: 7px;
}

.message.error {
  background: #fde8e8;
  color: #8a1c1c;
}

.message.success {
  background: #e7f7ed;
  color: #176c36;
}

.list-toolbar {
  display: grid;
  grid-template-columns:
    auto
    minmax(180px, 1fr)
    auto;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
}

.list-toolbar h2 {
  margin: 0;
}

.student-list {
  display: grid;
  gap: 10px;
}

.student-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.student-row.archived {
  opacity: 0.65;
  background: #f7f7f7;
}

.student-title {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.student-id {
  color: #666;
}

.status {
  font-size: 0.78rem;
  padding: 3px 7px;
  border-radius: 999px;
}

.status.active {
  background: #dff4e5;
  color: #176c36;
}

.status.inactive {
  background: #ececec;
  color: #555;
}

.empty-state {
  color: #666;
  text-align: center;
  padding: 30px 0;
}

.account-overlay {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.35);
}

.account-card {
  width: min(520px, 100%);
  max-height: calc(100vh - 48px);
  overflow-y: auto;
}

.account-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.account-header h2,
.account-header p {
  margin: 0;
}

.account-header p {
  margin-top: 4px;
}

.account-status {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 20px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.account-card label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 16px 0;
}

.account-card select {
  width: 100%;
}

@media (max-width: 850px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .list-toolbar {
    grid-template-columns: 1fr;
  }

  .page-header,
  .student-row {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>