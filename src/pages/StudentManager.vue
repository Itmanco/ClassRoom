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
          {{ $t("students.fields.firstName") }}

          <input
            v-model.trim="form.firstName"
            type="text"
            maxlength="80"
            autocomplete="given-name"
            :placeholder="$t('students.placeholders.firstName')"
            required
          />
        </label>

        <label>
          {{ $t("students.fields.lastName") }}

          <input
            v-model.trim="form.lastName"
            type="text"
            maxlength="80"
            autocomplete="family-name"
            :placeholder="$t('students.placeholders.lastName')"
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
                <span
                  v-if="canManageStudentAccounts"
                  class="status account-status-badge"
                  :class="
                    `account-${studentAccountStatus(student)}`
                  "
                >
                  {{
                    studentAccountStatus(student) === "enabled"
                      ? `🔐 ${$t("students.account.badgeEnabled")}`
                      : studentAccountStatus(student) === "disabled"
                        ? `🔒 ${$t("students.account.badgeDisabled")}`
                        : studentAccountStatus(student) === "unknown"
                          ? `⚠ ${$t("students.account.badgeUnknown")}`
                          : studentAccountStatus(student) === "loading"
                            ? $t("students.account.badgeLoading")
                            : $t("students.account.badgeNone")
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

              <button
                v-if="
                  canManageStudentStatus &&
                  student.isActive === false
                "
                type="button"
                class="secondary"
                @click="handleReactivate(student)"
              >
                {{ $t("common.reactivate") }}
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

              <small>
                {{
                  linkedAccountActive
                    ? $t("students.account.statusEnabled")
                    : $t("students.account.statusDisabled")
                }}
              </small>
            </template>

            <small v-else>
              {{ accountStudent.userUid }}
            </small>
          </div>

          <button
            v-if="linkedAccount"
            type="button"
            :class="{
              danger: linkedAccountActive,
            }"
            :disabled="accountSaving"
            @click="
              handleSetStudentAccountActive(
                !linkedAccountActive
              )
            "
          >
            {{
              accountSaving
                ? $t("common.saving")
                : linkedAccountActive
                  ? $t("students.account.disable")
                  : $t("students.account.enable")
            }}
          </button>
        </template>

        <template v-else>
          <div class="account-status">
            <strong>
              {{ $t("students.account.createTitle") }}
            </strong>

            <small>
              {{ $t("students.account.createDescription") }}
            </small>
          </div>

          <form
            class="account-form"
            @submit.prevent="handleCreateStudentAccount"
          >
            <label>
              {{ $t("students.account.email") }}

              <input
                v-model.trim="accountForm.email"
                type="email"
                autocomplete="email"
                :class="{ 'input-error': accountErrors.email }"
                :disabled="accountSaving"
                @input="accountErrors.email = ''"
              />

              <small
                v-if="accountErrors.email"
                class="field-error"
              >
                {{ accountErrors.email }}
              </small>
            </label>

            <label>
              {{ $t("students.account.password") }}

              <input
                v-model="accountForm.password"
                type="password"
                autocomplete="new-password"
                :class="{ 'input-error': accountErrors.password }"
                :disabled="accountSaving"
                @input="accountErrors.password = ''"
              />

              <small
                v-if="accountErrors.password"
                class="field-error"
              >
                {{ accountErrors.password }}
              </small>
            </label>

            <label>
              {{ $t("students.account.language") }}

              <select
                v-model="accountForm.language"
                :disabled="accountSaving"
              >
                <option value="en">
                  {{ $t("students.account.languageEnglish") }}
                </option>

                <option value="ja">
                  {{ $t("students.account.languageJapanese") }}
                </option>
              </select>
            </label>

            <button
              type="submit"
              :disabled="accountSaving"
            >
              {{
                accountSaving
                  ? $t("common.saving")
                  : $t("students.account.create")
              }}
            </button>
          </form>
        </template>
      </section>
    </div>
  </section>
</template>

<script>
import {
  archiveStudent,
  getNextStudentId,
  reactivateStudent,
  saveStudent,
  watchStudents,
} from "../services/studentService";

import {
  getManagedSchoolUsers,
} from "../services/adminUserService";

import {
  createStudentAccount,
  setStudentAccountActive,
} from "../services/studentAccountService";

function emptyForm() {
  return {
    id: 1,
    firstName: "",
    lastName: "",
    hiragana: "",
    country: "",
    gender_id: 1,
    isActive: true,
  };
}

function emptyAccountForm() {
  return {
    email: "",
    password: "",
    language: "en",
  };
}

function emptyAccountErrors() {
  return {
    email: "",
    password: "",
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
      accountStatusesLoaded: false,
      accountStatusesLoading: false,
      accountLoading: false,
      accountSaving: false,
      accountForm: emptyAccountForm(),
      accountErrors: emptyAccountErrors(),
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

    linkedAccountActive() {
      return (
        this.linkedAccount?.active !== false &&
        this.linkedAccount?.membershipActive !== false
      );
    },
  },

  watch: {
    schoolId() {
      this.startStudentListener();
      this.resetForm();
      this.loadStudentAccountStatuses();
    },
  },

  mounted() {
    this.startStudentListener();
    this.prepareNextStudentId();
    this.loadStudentAccountStatuses();
  },

  beforeUnmount() {
    this.stopStudentListener();
  },

  methods: {
    async loadStudentAccountStatuses() {
      if (
        !this.canManageStudentAccounts ||
        !this.schoolId
      ) {
        this.schoolUsers = [];
        this.accountStatusesLoaded = false;
        this.accountStatusesLoading = false;
        return;
      }

      this.accountStatusesLoading = true;
      this.accountStatusesLoaded = false;

      try {
        this.schoolUsers =
          await getManagedSchoolUsers(
            this.schoolId,
          );

        this.accountStatusesLoaded = true;
      } catch (error) {
        console.error(
          "Unable to load Student account statuses:",
          error,
        );

        this.schoolUsers = [];
        this.accountStatusesLoaded = false;
      } finally {
        this.accountStatusesLoading = false;
      }
    },

    studentAccountStatus(student) {
      if (!student.userUid) {
        return "none";
      }

      if (
        this.accountStatusesLoading ||
        !this.accountStatusesLoaded
      ) {
        return "loading";
      }

      const account =
        this.schoolUsers.find(
          (user) =>
            user.id === student.userUid,
        );

      if (!account) {
        return "unknown";
      }

      if (
        account.active !== false &&
        account.membershipActive !== false
      ) {
        return "enabled";
      }

      return "disabled";
    },

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
      const studentName = [
        this.form.firstName,
        this.form.lastName,
      ]
          .filter(Boolean)
          .join(" ")
          .trim();

      try {
        const studentData = {
          ...this.form,
        };

        /*
        * Academic status is not editable through the
        * normal Student form. Existing Students keep
        * their current status; Archive/Reactivate use
        * the dedicated trusted lifecycle operation.
        */
        if (!isCreating) {
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

      const hasStructuredName =
        Boolean(
          student.firstName ||
          student.lastName,
        );

      this.form = {
        id: student.id,

        firstName:
          hasStructuredName
            ? student.firstName || ""
            : student.name || "",

        lastName:
          student.lastName || "",

        hiragana:
          student.hiragana || "",

        country:
          student.country || "",

        gender_id:
          Number(student.gender_id) || 1,

        isActive:
          student.isActive !== false,
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
        );

        this.successMessage = this.$t(
          "students.messages.archived",
          {
            name: student.name,
          },
        );
        await this.loadStudentAccountStatuses();

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

    async handleReactivate(student) {
      if (!this.canManageStudentStatus) {
        return;
      }

      const confirmed = window.confirm(
        this.$t(
          "students.messages.reactivateConfirm",
          {
            name: student.name,
          },
        ),
      );

      if (!confirmed) {
        return;
      }

      this.errorMessage = "";
      this.successMessage = "";

      try {
        await reactivateStudent(
          this.schoolId,
          student.id,
        );

        this.successMessage = this.$t(
          "students.messages.reactivated",
          {
            name: student.name,
          },
        );

        /*
        * Refresh the privileged account directory so
        * the login badge reflects the disabled state.
        */
        await this.loadStudentAccountStatuses();

        if (
          this.editingStudentId ===
          student.id
        ) {
          await this.resetForm();
        }
      } catch (error) {
        this.errorMessage = this.$t(
          "students.messages.reactivateError",
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
      this.accountForm =
        emptyAccountForm();
      this.accountErrors =
        emptyAccountErrors();
      this.errorMessage = "";
      this.successMessage = "";

      await this.loadStudentAccountStatuses();

      this.accountLoading = false;
    },

    closeStudentAccount() {
      this.accountStudent = null;
      this.accountForm =
        emptyAccountForm();
      this.accountLoading = false;
      this.accountErrors =
      emptyAccountErrors();
    },

    validateStudentAccountForm() {
      this.accountErrors =
        emptyAccountErrors();

      const email =
        this.accountForm.email.trim();

      const password =
        this.accountForm.password;

      if (!email) {
        this.accountErrors.email =
          this.$t(
            "students.account.validation.emailRequired",
          );
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ) {
        this.accountErrors.email =
          this.$t(
            "students.account.validation.emailInvalid",
          );
      }

      if (!password) {
        this.accountErrors.password =
          this.$t(
            "students.account.validation.passwordRequired",
          );
      } else if (password.length < 6) {
        this.accountErrors.password =
          this.$t(
            "students.account.validation.passwordShort",
          );
      }

      return (
        !this.accountErrors.email &&
        !this.accountErrors.password
      );
    },

    async handleCreateStudentAccount() {
      if (
        !this.canManageStudentAccounts ||
        !this.accountStudent
      ) {
        return;
      }

      if (!this.validateStudentAccountForm()) {
        return;
      }

      this.accountSaving = true;
      this.errorMessage = "";
      this.successMessage = "";

      const studentName =
        this.accountStudent.name;

      try {
        await createStudentAccount({
          schoolId: this.schoolId,
          studentId: String(
            this.accountStudent.id,
          ),
          email:
            this.accountForm.email,
          password:
            this.accountForm.password,
          language:
            this.accountForm.language,
        });

        this.successMessage = this.$t(
          "students.account.created",
          {
            name: studentName,
          },
        );

        /*
        * Refresh the managed account directory before
        * closing the modal so the Student list can
        * immediately resolve the newly linked account.
        */
        await this.loadStudentAccountStatuses();

        this.closeStudentAccount();
      } catch (error) {
        const message =
          String(error.message || "");

        if (message.includes("INVALID_EMAIL")) {
          this.accountErrors.email =
            this.$t(
              "students.account.validation.emailInvalid",
            );
          return;
        }

        if (
          message.includes("EMAIL_ALREADY_EXISTS")
        ) {
          this.accountErrors.email =
            this.$t(
              "students.account.validation.emailExists",
            );
          return;
        }

        if (
          message.includes("INVALID_PASSWORD")
        ) {
          this.accountErrors.password =
            this.$t(
              "students.account.validation.passwordInvalid",
            );
          return;
        }

        this.errorMessage = this.$t(
          "students.account.createError",
          {
            error: error.message,
          },
        );
      } finally {
        this.accountSaving = false;
      }
    },

    async handleSetStudentAccountActive(active) {
      if (
        !this.canManageStudentAccounts ||
        !this.accountStudent?.userUid ||
        !this.linkedAccount
      ) {
        return;
      }

      const studentName =
        this.accountStudent.name;

      const confirmed =
        window.confirm(
          this.$t(
            active
              ? "students.account.enableConfirm"
              : "students.account.disableConfirm",
            {
              name: studentName,
            },
          ),
        );

      if (!confirmed) {
        return;
      }

      this.accountSaving = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        await setStudentAccountActive(
          this.schoolId,
          String(
            this.accountStudent.id,
          ),
          active,
        );

        this.successMessage = this.$t(
          active
            ? "students.account.enabled"
            : "students.account.disabled",
          {
            name: studentName,
          },
        );

        /*
        * Refresh the managed account data so
        * the modal immediately reflects the
        * new account state.
        */
        await this.loadStudentAccountStatuses();

      } catch (error) {
        this.errorMessage = this.$t(
          active
            ? "students.account.enableError"
            : "students.account.disableError",
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

.account-form {
  display: grid;
  gap: 16px;
  margin-bottom: 20px;
}

.account-form label {
  margin: 0;
}

.account-card input,
.account-card select {
  width: 100%;
}

.account-form input:user-invalid {
  border-color: #dc3545;
  box-shadow: 0 0 0 1px #dc3545;
}

.account-form input:user-valid {
  border-color: #ced4da;
  box-shadow: none;
}

.account-form .field-error {
  color: #dc3545;
  font-size: 0.82rem;
  font-weight: 500;
  margin-top: 2px;
}

.account-form input.input-error {
  border-color: #dc3545;
  box-shadow: 0 0 0 1px #dc3545;
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