<template>
  <div class="school-manager">
    <header class="page-header">
      <div>
        <p class="eyebrow">
          System Administration
        </p>

        <h1>
          🏫 Schools
        </h1>

        <p>
          Manage schools available in the platform.
        </p>
      </div>

      <button
        type="button"
        class="secondary"
        @click="$emit('back')"
      >
        ← Back
      </button>
    </header>

    <p
      v-if="message"
      class="message success"
    >
      {{ message }}
    </p>

    <p
      v-if="errorMessage"
      class="message error"
    >
      {{ errorMessage }}
    </p>

    <section class="panel">
      <h2>
        {{
          isEditing
            ? "Edit School"
            : "Create School"
        }}
      </h2>

      <form
        class="school-form"
        @submit.prevent="submitSchool"
      >
        <label>
          School ID

          <input
            v-model.trim="form.id"
            type="text"
            required
            :disabled="isEditing"
          />
        </label>

        <label>
          School name

          <input
            v-model.trim="form.name"
            type="text"
            required
          />
        </label>

        <label>
          Country

          <input
            v-model.trim="form.country"
            type="text"
            required
          />
        </label>

        <label>
          City

          <input
            v-model.trim="form.city"
            type="text"
            required
          />
        </label>

        <label>
          Owner UID

          <input
            v-model.trim="form.ownerUid"
            type="text"
            placeholder="Optional"
          />
        </label>

        <label class="checkbox-label">
          <input
            v-model="form.active"
            type="checkbox"
          />

          Active
        </label>

        <div class="actions">
          <button
            class="primary"
            type="submit"
            :disabled="saving"
          >
            {{
              saving
                ? "Saving..."
                : isEditing
                  ? "Save Changes"
                  : "Create School"
            }}
          </button>

          <button
            v-if="isEditing"
            type="button"
            class="secondary"
            :disabled="saving"
            @click="resetForm"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>

    <section class="panel">
      <div class="section-heading">
        <div>
          <h2>
            Existing Schools
          </h2>

          <p>
            {{ schools.length }} school(s)
          </p>
        </div>
      </div>

      <p v-if="loading">
        Loading schools...
      </p>

      <div
        v-else
        class="school-list"
      >
        <article
          v-for="school in schools"
          :key="school.id"
          class="school-card"
          :class="{
            archived:
              school.active === false,
          }"
        >
          <div>
            <div class="school-heading">
              <h3>
                {{ school.name }}
              </h3>

              <span
                class="status"
                :class="{
                  inactive:
                    school.active === false,
                }"
              >
                {{
                  school.active === false
                    ? "Archived"
                    : "Active"
                }}
              </span>
            </div>

            <p>
              <strong>
                {{ school.id }}
              </strong>
            </p>

            <p>
              {{ school.city }},
              {{ school.country }}
            </p>

            <p
              v-if="school.ownerUid"
              class="technical-value"
            >
              Owner: {{ school.ownerUid }}
            </p>
          </div>

          <div class="card-actions">
            <button
              type="button"
              @click="editSchool(school)"
            >
              Edit
            </button>

            <button
              v-if="school.active !== false"
              type="button"
              class="archive"
              @click="
                confirmArchive(
                  school,
                )
              "
            >
              Archive
            </button>

            <button
              v-else
              type="button"
              class="reactivate"
              @click="
                confirmReactivate(
                  school,
                )
              "
            >
              Reactivate
            </button>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import {
  archiveSchool,
  reactivateSchool,
  saveSchool,
  watchSchools,
} from "../services/schoolService";

function createEmptyForm() {
  return {
    id: "",
    name: "",
    country: "",
    city: "",
    ownerUid: "",
    active: true,
  };
}

export default {
  name: "AdminSchoolManager",

  emits: [
    "back",
  ],

  data() {
    return {
      schools: [],
      form:
        createEmptyForm(),
      editingSchoolId: null,
      loading: true,
      saving: false,
      message: "",
      errorMessage: "",
      unsubscribe: null,
    };
  },

  computed: {
    isEditing() {
      return Boolean(
        this.editingSchoolId,
      );
    },
  },

  mounted() {
    this.startListener();
  },

  beforeUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },

  methods: {
    startListener() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }

      this.loading = true;

      this.unsubscribe =
        watchSchools(
          (items) => {
            this.schools =
              items;

            this.loading =
              false;
          },

          (error) => {
            this.loading =
              false;

            this.errorMessage =
              error.message;
          },
        );
    },

    editSchool(school) {
      this.editingSchoolId =
        school.id;

      this.form = {
        id:
          school.id,

        name:
          school.name || "",

        country:
          school.country || "",

        city:
          school.city || "",

        ownerUid:
          school.ownerUid || "",

        active:
          school.active !== false,
      };

      this.message = "";
      this.errorMessage = "";

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    resetForm() {
      this.form =
        createEmptyForm();

      this.editingSchoolId =
        null;

      this.message = "";
      this.errorMessage = "";
    },

    async submitSchool() {
      this.saving = true;
      this.message = "";
      this.errorMessage = "";

      try {
        const schoolId =
          await saveSchool(
            this.form,
            this.editingSchoolId,
          );

        this.message =
          this.isEditing
            ? `School ${schoolId} updated.`
            : `School ${schoolId} created.`;

        this.form =
          createEmptyForm();

        this.editingSchoolId =
          null;
      } catch (error) {
        this.errorMessage =
          error.message;
      } finally {
        this.saving = false;
      }
    },

    async confirmArchive(
      school,
    ) {
      const confirmed =
        window.confirm(
          `Archive ${school.name}?`,
        );

      if (!confirmed) {
        return;
      }

      this.message = "";
      this.errorMessage = "";

      try {
        await archiveSchool(
          school.id,
        );

        this.message =
          `School ${school.name} archived.`;
      } catch (error) {
        this.errorMessage =
          error.message;
      }
    },

    async confirmReactivate(
      school,
    ) {
      const confirmed =
        window.confirm(
          `Reactivate ${school.name}?`,
        );

      if (!confirmed) {
        return;
      }

      this.message = "";
      this.errorMessage = "";

      try {
        await reactivateSchool(
          school.id,
        );

        this.message =
          `School ${school.name} reactivated.`;
      } catch (error) {
        this.errorMessage =
          error.message;
      }
    },
  },
};
</script>

<style scoped>
.school-manager {
  max-width: 1180px;
  margin: 0 auto;
  padding: 30px;
}

.page-header,
.section-heading,
.school-heading,
.card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  margin: 4px 0 8px;
}

.page-header p,
.section-heading p {
  color: #667085;
}

.eyebrow {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.panel {
  margin-bottom: 22px;
  padding: 22px;
  background: white;
  border: 1px solid #e4e7ec;
  border-radius: 12px;
}

.school-form {
  display: grid;
  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );
  gap: 16px;
}

label {
  display: grid;
  gap: 7px;
  font-weight: 600;
}

input {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #bbb;
  border-radius: 8px;
  font: inherit;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox-label input {
  width: auto;
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.school-list {
  display: grid;
  gap: 12px;
}

.school-card {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 18px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.school-card h3 {
  margin: 0;
}

.school-card p {
  margin: 6px 0 0;
}

.card-actions {
  flex-shrink: 0;
}

button {
  border: 0;
  border-radius: 8px;
  padding: 10px 14px;
  cursor: pointer;
}

.primary,
.reactivate {
  background: #42b883;
  color: white;
}

.secondary {
  background: #e8eaed;
  color: #333;
}

.archive {
  background: #d9534f;
  color: white;
}

.status {
  padding: 4px 8px;
  border-radius: 999px;
  background: #e7f7ed;
  color: #18794e;
  font-size: 0.8rem;
  font-weight: 700;
}

.status.inactive {
  background: #eee;
  color: #666;
}

.archived {
  opacity: 0.65;
}

.technical-value {
  font-family: monospace;
  font-size: 0.8rem;
  overflow-wrap: anywhere;
}

.message {
  padding: 11px 14px;
  border-radius: 8px;
  margin-bottom: 18px;
}

.message.success {
  background: #e7f7ed;
  color: #18794e;
}

.message.error {
  background: #fde8e8;
  color: #b42318;
}

@media (max-width: 700px) {
  .school-manager {
    padding: 20px 14px;
  }

  .page-header,
  .school-card {
    align-items: stretch;
    flex-direction: column;
  }

  .school-form {
    grid-template-columns: 1fr;
  }

  .card-actions {
    justify-content: flex-start;
  }
}
</style>