<template>
  <AdminSchoolManager
    v-if="section === 'schools'"
    @back="section = ''"
  />
  <div v-else class="admin-page">
    <header class="page-header">
      <p class="eyebrow">
        System Administration
      </p>

      <h1>
        🛠️ Admin Console
      </h1>

      <p>
        Manage schools, users, and platform data.
      </p>
    </header>

    <section class="admin-grid">
      <article class="admin-card">
        <h2>🏫 Schools</h2>

        <p>
          Create, edit, archive, and eventually
          permanently delete schools.
        </p>

        <button
          type="button"
          @click="section = 'schools'"
        >
          Manage Schools
        </button>
      </article>

      <article class="admin-card disabled">
        <h2>👥 Users</h2>

        <p>
          User and role management will be added next.
        </p>
      </article>

      <article class="admin-card disabled">
        <h2>👩‍🏫 Teachers</h2>

        <p>
          Teacher management will be added after users.
        </p>
      </article>
    </section>
  </div>
</template>

<script>
import AdminSchoolManager from "./AdminSchoolManager.vue";

export default {
  name: "AdminPage",

  components: {
    AdminSchoolManager,
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
</style>