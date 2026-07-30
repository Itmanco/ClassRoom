<template>
  <div class="page">
    <header class="page-header">
      <div>
        <h1>🏫 Building Management</h1>
        <p>Create and maintain the physical buildings that belong to this school.</p>
      </div>
    </header>

    <section class="panel">
      <h2>{{ isEditing ? "Edit building" : "Add building" }}</h2>

      <form class="building-form" @submit.prevent="submitBuilding">
        <label>
          Building code
          <input
            v-model.trim="form.code"
            type="text"
            placeholder="A1"
            :disabled="isEditing"
            required
          />
        </label>

        <label>
          Building name
          <input
            v-model.trim="form.name"
            type="text"
            placeholder="Building A1"
            required
          />
        </label>

        <label>
          Number of floors
          <input
            v-model.number="form.floorCount"
            type="number"
            min="1"
            step="1"
            required
          />
        </label>

        <label class="checkbox-label">
          <input v-model="form.active" type="checkbox" />
          Active
        </label>

        <div class="form-actions">
          <button class="primary-button" type="submit" :disabled="saving">
            {{ saving ? "Saving..." : isEditing ? "Update building" : "Add building" }}
          </button>

          <button
            v-if="isEditing"
            class="secondary-button"
            type="button"
            :disabled="saving"
            @click="resetForm"
          >
            Cancel
          </button>
        </div>
      </form>

      <p v-if="message" class="success-message">{{ message }}</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </section>

    <section class="panel">
      <div class="section-heading">
        <h2>Buildings</h2>
        <span>{{ buildings.length }} total</span>
      </div>

      <p v-if="loading">Loading buildings...</p>
      <p v-else-if="buildings.length === 0" class="empty-state">
        No buildings have been created yet.
      </p>

      <div v-else class="building-list">
        <article
          v-for="building in buildings"
          :key="building.id"
          class="building-card"
          :class="{ archived: !building.active }"
        >
          <div>
            <div class="building-title-row">
              <h3>{{ building.code }} — {{ building.name }}</h3>
              <span class="status" :class="building.active ? 'active' : 'inactive'">
                {{ building.active ? "Active" : "Archived" }}
              </span>
            </div>
            <p>{{ building.floorCount }} floor{{ building.floorCount === 1 ? "" : "s" }}</p>
          </div>

          <div class="card-actions">
            <button type="button" @click="editBuilding(building)">Edit</button>
            <button
              v-if="building.active"
              type="button"
              class="archive-button"
              @click="confirmArchive(building)"
            >
              Archive
            </button>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import {
  archiveBuilding,
  saveBuilding,
  watchBuildings,
} from "../services/buildingService";

function createEmptyForm() {
  return {
    code: "",
    name: "",
    floorCount: 1,
    active: true,
  };
}

export default {
  name: "BuildingManager",

  props: {
    schoolId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      buildings: [],
      form: createEmptyForm(),
      editingBuildingId: null,
      loading: true,
      saving: false,
      message: "",
      errorMessage: "",
      unsubscribeBuildings: null,
    };
  },

  computed: {
    isEditing() {
      return Boolean(this.editingBuildingId);
    },
  },

  mounted() {
    this.startBuildingsListener();
  },

  beforeUnmount() {
    this.stopBuildingsListener();
  },

  watch: {
    schoolId() {
      this.resetForm();
      this.startBuildingsListener();
    },
  },

  methods: {
    startBuildingsListener() {
      this.stopBuildingsListener();
      this.loading = true;
      this.errorMessage = "";

      this.unsubscribeBuildings = watchBuildings(
        this.schoolId,
        (buildings) => {
          this.buildings = buildings;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.errorMessage = `Unable to load buildings: ${error.message}`;
        },
      );
    },

    stopBuildingsListener() {
      if (this.unsubscribeBuildings) {
        this.unsubscribeBuildings();
        this.unsubscribeBuildings = null;
      }
    },

    editBuilding(building) {
      this.editingBuildingId = building.id;
      this.form = {
        code: building.code,
        name: building.name,
        floorCount: building.floorCount,
        active: building.active !== false,
      };
      this.message = "";
      this.errorMessage = "";
    },

    resetForm() {
      this.form = createEmptyForm();
      this.editingBuildingId = null;
      this.message = "";
      this.errorMessage = "";
    },

    async submitBuilding() {
      this.saving = true;
      this.message = "";
      this.errorMessage = "";

      try {
        const buildingId = await saveBuilding(this.schoolId, this.form);
        this.message = `Building ${buildingId} saved successfully.`;
        this.form = createEmptyForm();
        this.editingBuildingId = null;
      } catch (error) {
        this.errorMessage = error.message;
      } finally {
        this.saving = false;
      }
    },

    async confirmArchive(building) {
      const confirmed = window.confirm(
        `Archive ${building.code} — ${building.name}?`,
      );

      if (!confirmed) {
        return;
      }

      this.message = "";
      this.errorMessage = "";

      try {
        await archiveBuilding(this.schoolId, building.id);
        this.message = `Building ${building.code} archived.`;

        if (this.editingBuildingId === building.id) {
          this.resetForm();
        }
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
  },
};
</script>

<style scoped>
.page {
  padding: 30px;
  max-width: 960px;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1,
.panel h2,
.building-card h3,
.building-card p {
  margin-top: 0;
}

.panel {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 22px;
  margin-bottom: 24px;
}

.building-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  align-items: end;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 600;
}

input[type="text"],
input[type="number"] {
  border: 1px solid #bbb;
  border-radius: 6px;
  padding: 10px;
  font: inherit;
}

.checkbox-label {
  flex-direction: row;
  align-items: center;
  padding-bottom: 10px;
}

.form-actions,
.card-actions,
.building-title-row,
.section-heading {
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-heading,
.building-title-row {
  justify-content: space-between;
}

button {
  border: none;
  border-radius: 6px;
  padding: 10px 14px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.primary-button {
  background: #42b883;
  color: #fff;
}

.secondary-button,
.card-actions button {
  background: #eee;
}

.archive-button {
  color: #9b1c1c;
}

.success-message {
  color: #176b3a;
}

.error-message {
  color: #a51d1d;
}

.building-list {
  display: grid;
  gap: 12px;
}

.building-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
}

.building-card.archived {
  background: #f7f7f7;
  opacity: 0.75;
}

.status {
  border-radius: 999px;
  padding: 4px 9px;
  font-size: 0.8rem;
  font-weight: 700;
}

.status.active {
  background: #dff5e8;
  color: #176b3a;
}

.status.inactive {
  background: #eee;
  color: #555;
}

.empty-state {
  color: #666;
}

@media (max-width: 700px) {
  .page {
    padding: 18px;
  }

  .building-card,
  .building-title-row,
  .section-heading {
    align-items: flex-start;
  }

  .building-card {
    flex-direction: column;
  }
}
</style>
