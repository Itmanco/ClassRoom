<template>
  <AdminSchoolManager
    v-if="section === 'schools'"
    @back="section = ''"
  />

  <AdminUserManager
    v-else-if="section === 'users'"
    @back="section = ''"
  />

  <AdminAuditLog
    v-else-if="section === 'audit'"
    :school-id="schoolId"
    :is-system-admin="isSystemAdmin"
    @back="section = ''"
  />

  <div
    v-else
    class="admin-page"
  >
    <header class="page-header">
      <p class="eyebrow">
        {{ $t("admin.eyebrow") }}
      </p>

      <h1>
        🛠️ {{ $t("admin.title") }}
      </h1>

      <p>
        {{ $t("admin.description") }}
      </p>
    </header>

    <section class="admin-grid">
      <article class="admin-card">
        <h2>
          🏫
          {{ $t("admin.sections.schools.title") }}
        </h2>

        <p>
          {{
            $t(
              "admin.sections.schools.description",
            )
          }}
        </p>

        <button
          type="button"
          @click="section = 'schools'"
        >
          {{
            $t(
              "admin.sections.schools.action",
            )
          }}
        </button>
      </article>

      <article class="admin-card">
        <h2>
          👥
          {{ $t("admin.sections.users.title") }}
        </h2>

        <p>
          {{
            $t(
              "admin.sections.users.description",
            )
          }}
        </p>

        <button
          type="button"
          @click="section = 'users'"
        >
          {{
            $t(
              "admin.sections.users.action",
            )
          }}
        </button>
      </article>

      <article class="admin-card">
        <h2>
          🧾
          {{
            $t(
              "admin.sections.audit.title",
            )
          }}
        </h2>

        <p>
          {{
            $t(
              "admin.sections.audit.description",
            )
          }}
        </p>

        <button
          type="button"
          @click="section = 'audit'"
        >
          {{
            $t(
              "admin.sections.audit.action",
            )
          }}
        </button>
      </article>

      <article class="admin-card disabled">
        <h2>
          👩‍🏫
          {{
            $t(
              "admin.sections.teachers.title",
            )
          }}
        </h2>

        <p>
          {{
            $t(
              "admin.sections.teachers.description",
            )
          }}
        </p>
      </article>
    </section>
  </div>
</template>

<script>
import AdminSchoolManager from "./AdminSchoolManager.vue";
import AdminUserManager from "./AdminUserManager.vue";
import AdminAuditLog from "./AdminAuditLog.vue";

export default {
  name: "AdminPage",

  components: {
    AdminSchoolManager,
    AdminUserManager,
    AdminAuditLog,
  },

  props: {
    schoolId: {
      type: String,
      required: true,
    },
    isSystemAdmin: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      section: "",
    };
  },
};
</script>

<style scoped>
.admin-page {
  max-width: 1180px;
  margin: 0 auto;
  padding: 30px;
}

.page-header {
  margin-bottom: 28px;
}

.page-header h1 {
  margin: 4px 0 8px;
}

.page-header p {
  color: #667085;
}

.eyebrow {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.admin-grid {
  display: grid;
  grid-template-columns:
    repeat(
      auto-fit,
      minmax(260px, 1fr)
    );
  gap: 20px;
}

.admin-card {
  padding: 22px;
  background: white;
  border: 1px solid #e4e7ec;
  border-radius: 12px;
}

.admin-card h2 {
  margin-top: 0;
}

.admin-card p {
  color: #667085;
}

.admin-card button {
  border: 0;
  border-radius: 8px;
  padding: 10px 14px;
  cursor: pointer;
  background: #42b883;
  color: white;
}

.admin-card.disabled {
  opacity: 0.6;
}

@media (max-width: 700px) {
  .admin-page {
    padding: 20px 14px;
  }
}
</style>