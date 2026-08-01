<template>
  <div class="page">
    <header class="page-header">
      <div>
        <h1>🏫 {{ $t("buildings.title") }}</h1>
        <p>{{ $t("buildings.description") }}</p>
      </div>
    </header>

    <section class="panel">
      <h2>
        {{
          isEditing
            ? $t("buildings.form.editTitle")
            : $t("buildings.form.addTitle")
        }}
      </h2>

      <form
        class="building-form"
        @submit.prevent="submitBuilding"
      >
        <label>
          {{ $t("buildings.fields.code") }}

          <input
            v-model.trim="form.code"
            type="text"
            :placeholder="$t('buildings.placeholders.code')"
            :disabled="isEditing"
            required
          />
        </label>

        <label>
          {{ $t("buildings.fields.name") }}

          <input
            v-model.trim="form.name"
            type="text"
            :placeholder="$t('buildings.placeholders.name')"
            required
          />
        </label>

        <label>
          {{ $t("buildings.fields.floorCount") }}

          <input
            v-model.number="form.floorCount"
            type="number"
            min="1"
            step="1"
            required
          />
        </label>

        <label class="checkbox-label">
          <input
            v-model="form.active"
            type="checkbox"
          />

          {{ $t("common.active") }}
        </label>

        <div class="form-actions">
          <button
            class="primary-button"
            type="submit"
            :disabled="saving"
          >
            {{
              saving
                ? $t("common.saving")
                : isEditing
                  ? $t("buildings.actions.update")
                  : $t("buildings.actions.add")
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

      <p
        v-if="message"
        class="success-message"
      >
        {{ message }}
      </p>

      <p
        v-if="errorMessage"
        class="error-message"
      >
        {{ errorMessage }}
      </p>
    </section>

    <section class="panel">
      <div class="section-heading">
        <h2>{{ $t("buildings.list.title") }}</h2>

        <span>
          {{
            $t("buildings.list.total", {
              count: buildings.length,
            })
          }}
        </span>
      </div>

      <p v-if="loading">
        {{ $t("buildings.list.loading") }}
      </p>

      <p
        v-else-if="buildings.length === 0"
        class="empty-state"
      >
        {{ $t("buildings.list.empty") }}
      </p>

      <div
        v-else
        class="building-list"
      >
        <article
          v-for="building in buildings"
          :key="building.id"
          class="building-card"
          :class="{ archived: !building.active }"
        >
          <div>
            <div class="building-title-row">
              <h3>
                {{ building.code }} — {{ building.name }}
              </h3>

              <span
                class="status"
                :class="
                  building.active
                    ? 'active'
                    : 'inactive'
                "
              >
                {{
                  building.active
                    ? $t("common.active")
                    : $t("common.archived")
                }}
              </span>
            </div>

            <p>
              {{
                floorCountLabel(
                  building.floorCount,
                )
              }}
            </p>
          </div>

          <div class="card-actions">
            <button
              type="button"
              @click="editBuilding(building)"
            >
              {{ $t("common.edit") }}
            </button>

            <button
              v-if="building.active"
              type="button"
              class="archive-button"
              @click="confirmArchive(building)"
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
          this.errorMessage = this.$t(
            "buildings.messages.loadError",
            {
              error: error.message,
            },
          );
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
        const buildingId = await saveBuilding(
          this.schoolId,
          this.form,
        );

        this.message = this.$t(
          "buildings.messages.saved",
          {
            code: buildingId,
          },
        );

        this.form = createEmptyForm();
        this.editingBuildingId = null;
      } catch (error) {
        this.errorMessage = this.$t(
          "buildings.messages.saveError",
          {
            error: error.message,
          },
        );
      } finally {
        this.saving = false;
      }
    },

    async confirmArchive(building) {
      const confirmed = window.confirm(
        this.$t(
          "buildings.messages.archiveConfirm",
          {
            code: building.code,
            name: building.name,
          },
        ),
      );

      if (!confirmed) {
        return;
      }

      this.message = "";
      this.errorMessage = "";

      try {
        await archiveBuilding(
          this.schoolId,
          building.id,
        );

        this.message = this.$t(
          "buildings.messages.archived",
          {
            code: building.code,
          },
        );

        if (
          this.editingBuildingId === building.id
        ) {
          this.resetForm();
        }
      } catch (error) {
        this.errorMessage = this.$t(
          "buildings.messages.archiveError",
          {
            error: error.message,
          },
        );
      }
    },

    floorCountLabel(floorCount) {
      const count = Number(floorCount) || 0;

      const key =
        count === 1
          ? "buildings.list.floor"
          : "buildings.list.floors";

      return this.$t(key, {
        count,
      });
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
  grid-template-columns:
    repeat(auto-fit, minmax(180px, 1fr));
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