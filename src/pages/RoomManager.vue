<template>
  <div class="page">
    <header class="page-header">
      <div>
        <h1>🚪 Room Management</h1>
        <p>Create physical rooms and connect each one to a school building.</p>
      </div>
    </header>

    <section class="panel">
      <h2>{{ isEditing ? "Edit room" : "Add room" }}</h2>

      <p v-if="activeBuildings.length === 0" class="notice">
        Create an active building before adding rooms.
      </p>

      <form class="room-form" @submit.prevent="submitRoom">
        <label>
          Building
          <select
            v-model="form.buildingId"
            :disabled="saving || activeBuildings.length === 0"
            required
            @change="handleBuildingChange"
          >
            <option disabled value="">Select a building</option>
            <option
              v-for="building in activeBuildings"
              :key="building.id"
              :value="building.id"
            >
              {{ building.code }} — {{ building.name }}
            </option>
          </select>
        </label>

        <label>
          Floor
          <input
            v-model.number="form.floor"
            type="number"
            min="1"
            :max="selectedBuilding ? selectedBuilding.floorCount : undefined"
            step="1"
            required
          />
        </label>

        <label>
          Room number
          <input
            v-model.number="form.roomNumber"
            type="number"
            min="1"
            step="1"
            required
          />
        </label>

        <label>
          Room code
          <input
            v-model.trim="form.code"
            type="text"
            placeholder="A1F1C1"
            :disabled="isEditing"
            required
          />
          <small v-if="suggestedCode">Suggested: {{ suggestedCode }}</small>
        </label>

        <label>
          Room name
          <input
            v-model.trim="form.name"
            type="text"
            placeholder="Building A1 - Floor 1 - Classroom 1"
            required
          />
        </label>

        <label>
          Number of desks
          <input
            v-model.number="form.deskCount"
            type="number"
            min="0"
            step="1"
            required
          />
        </label>

        <label>
          Seats per desk
          <input
            v-model.number="form.seatsPerDesk"
            type="number"
            min="1"
            step="1"
            required
          />
        </label>

        <label>
          Capacity
          <input :value="calculatedCapacity" type="number" disabled />
          <small>Calculated from desks × seats per desk.</small>
        </label>

        <label class="checkbox-label">
          <input v-model="form.active" type="checkbox" />
          Active
        </label>

        <div class="form-actions">
          <button
            class="primary-button"
            type="submit"
            :disabled="saving || activeBuildings.length === 0"
          >
            {{ saving ? "Saving..." : isEditing ? "Update room" : "Add room" }}
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
        <h2>Rooms</h2>
        <span>{{ rooms.length }} total</span>
      </div>

      <label class="filter-label">
        Filter by building
        <select v-model="buildingFilter">
          <option value="">All buildings</option>
          <option v-for="building in buildings" :key="building.id" :value="building.id">
            {{ building.code }} — {{ building.name }}
          </option>
        </select>
      </label>

      <p v-if="loading">Loading rooms...</p>
      <p v-else-if="filteredRooms.length === 0" class="empty-state">
        No rooms match the current selection.
      </p>

      <div v-else class="room-list">
        <article
          v-for="room in filteredRooms"
          :key="room.id"
          class="room-card"
          :class="{ archived: !room.active }"
        >
          <div>
            <div class="room-title-row">
              <h3>{{ room.code }} — {{ room.name }}</h3>
              <span class="status" :class="room.active ? 'active' : 'inactive'">
                {{ room.active ? "Active" : "Archived" }}
              </span>
            </div>
            <p>
              {{ room.buildingId }} · Floor {{ room.floor }} · Room {{ room.roomNumber }}
            </p>
            <p>
              {{ room.deskCount }} desks · {{ room.seatsPerDesk }} seats per desk ·
              Capacity {{ room.capacity }}
            </p>
          </div>

          <div class="card-actions">
            <button type="button" @click="editRoom(room)">Edit</button>
            <button
              v-if="room.active"
              type="button"
              class="archive-button"
              @click="confirmArchive(room)"
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
import { watchBuildings } from "../services/buildingService";
import { archiveRoom, saveRoom, watchRooms } from "../services/roomService";

function createEmptyForm() {
  return {
    code: "",
    name: "",
    buildingId: "",
    floor: 1,
    roomNumber: 1,
    deskCount: 9,
    seatsPerDesk: 2,
    active: true,
  };
}

export default {
  name: "RoomManager",

  props: {
    schoolId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      buildings: [],
      rooms: [],
      form: createEmptyForm(),
      editingRoomId: null,
      buildingFilter: "",
      loading: true,
      saving: false,
      message: "",
      errorMessage: "",
      unsubscribeBuildings: null,
      unsubscribeRooms: null,
    };
  },

  computed: {
    isEditing() {
      return Boolean(this.editingRoomId);
    },

    activeBuildings() {
      return this.buildings.filter((building) => building.active !== false);
    },

    selectedBuilding() {
      return this.buildings.find(
        (building) => building.id === this.form.buildingId,
      );
    },

    calculatedCapacity() {
      const deskCount = Number(this.form.deskCount) || 0;
      const seatsPerDesk = Number(this.form.seatsPerDesk) || 0;
      return deskCount * seatsPerDesk;
    },

    suggestedCode() {
      if (!this.form.buildingId || !this.form.floor || !this.form.roomNumber) {
        return "";
      }

      return `${this.form.buildingId}F${this.form.floor}C${this.form.roomNumber}`.toUpperCase();
    },

    filteredRooms() {
      if (!this.buildingFilter) {
        return this.rooms;
      }

      return this.rooms.filter(
        (room) => room.buildingId === this.buildingFilter,
      );
    },
  },

  watch: {
    schoolId() {
      this.resetForm();
      this.startListeners();
    },

    suggestedCode(newCode) {
      if (!this.isEditing) {
        this.form.code = newCode;
      }
    },
  },

  mounted() {
    this.startListeners();
  },

  beforeUnmount() {
    this.stopListeners();
  },

  methods: {
    startListeners() {
      this.stopListeners();
      this.loading = true;
      this.errorMessage = "";

      this.unsubscribeBuildings = watchBuildings(
        this.schoolId,
        (buildings) => {
          this.buildings = buildings;
        },
        (error) => {
          this.errorMessage = `Unable to load buildings: ${error.message}`;
        },
      );

      this.unsubscribeRooms = watchRooms(
        this.schoolId,
        (rooms) => {
          this.rooms = rooms;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.errorMessage = `Unable to load rooms: ${error.message}`;
        },
      );
    },

    stopListeners() {
      if (this.unsubscribeBuildings) {
        this.unsubscribeBuildings();
        this.unsubscribeBuildings = null;
      }

      if (this.unsubscribeRooms) {
        this.unsubscribeRooms();
        this.unsubscribeRooms = null;
      }
    },

    handleBuildingChange() {
      if (
        this.selectedBuilding &&
        this.form.floor > this.selectedBuilding.floorCount
      ) {
        this.form.floor = 1;
      }
    },

    editRoom(room) {
      this.editingRoomId = room.id;
      this.form = {
        code: room.code,
        name: room.name,
        buildingId: room.buildingId,
        floor: room.floor,
        roomNumber: room.roomNumber,
        deskCount: room.deskCount,
        seatsPerDesk: room.seatsPerDesk,
        active: room.active !== false,
      };
      this.message = "";
      this.errorMessage = "";
    },

    resetForm() {
      this.form = createEmptyForm();
      this.editingRoomId = null;
      this.message = "";
      this.errorMessage = "";
    },

    async submitRoom() {
      this.saving = true;
      this.message = "";
      this.errorMessage = "";

      try {
        const roomId = await saveRoom(this.schoolId, this.form);
        this.message = `Room ${roomId} saved successfully.`;
        this.form = createEmptyForm();
        this.editingRoomId = null;
      } catch (error) {
        this.errorMessage = error.message;
      } finally {
        this.saving = false;
      }
    },

    async confirmArchive(room) {
      const confirmed = window.confirm(`Archive ${room.code} — ${room.name}?`);

      if (!confirmed) {
        return;
      }

      this.message = "";
      this.errorMessage = "";

      try {
        await archiveRoom(this.schoolId, room.id);
        this.message = `Room ${room.code} archived.`;

        if (this.editingRoomId === room.id) {
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
.page { max-width: 1050px; margin: 0 auto; padding: 32px; }
.page-header { margin-bottom: 24px; }
.page-header h1 { margin: 0 0 8px; }
.page-header p { margin: 0; color: #5f6368; }
.panel { margin-bottom: 24px; padding: 24px; border: 1px solid #ddd; border-radius: 12px; background: white; }
.room-form { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
label { display: flex; flex-direction: column; gap: 6px; font-weight: 600; }
input, select { padding: 10px; border: 1px solid #bbb; border-radius: 6px; font: inherit; }
small { color: #667; font-weight: normal; }
.checkbox-label { flex-direction: row; align-items: center; }
.form-actions { grid-column: 1 / -1; display: flex; gap: 10px; }
button { padding: 10px 14px; border: 0; border-radius: 7px; cursor: pointer; }
button:disabled { cursor: not-allowed; opacity: 0.6; }
.primary-button { background: #42b883; color: white; }
.secondary-button { background: #e8eaed; }
.archive-button { background: #f8d7da; color: #842029; }
.success-message { color: #167347; }
.error-message { color: #b42318; }
.notice { padding: 12px; border-radius: 6px; background: #fff3cd; color: #664d03; }
.section-heading, .room-title-row { display: flex; justify-content: space-between; gap: 16px; align-items: center; }
.filter-label { max-width: 320px; margin-bottom: 16px; }
.room-list { display: grid; gap: 12px; }
.room-card { display: flex; justify-content: space-between; gap: 20px; padding: 16px; border: 1px solid #ddd; border-radius: 10px; }
.room-card.archived { opacity: 0.65; background: #f6f6f6; }
.room-card h3, .room-card p { margin: 0 0 8px; }
.status { padding: 4px 8px; border-radius: 999px; font-size: 0.85rem; }
.status.active { background: #d1e7dd; color: #0f5132; }
.status.inactive { background: #e2e3e5; color: #41464b; }
.card-actions { display: flex; gap: 8px; align-items: flex-start; }
.empty-state { color: #666; }
@media (max-width: 760px) {
  .room-form { grid-template-columns: 1fr; }
  .room-card, .room-title-row { align-items: flex-start; flex-direction: column; }
}
</style>
