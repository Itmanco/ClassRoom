<template>
  <div class="page">
    <header class="page-header">
      <h1>🪑 Seating Plan Management</h1>
      <p>Create new seating plans from a class's enrolled students and assigned room.</p>
    </header>

    <section class="panel controls">
      <label>
        Class
        <select v-model="selectedClassId">
          <option value="">Select a class</option>
          <option v-for="item in activeClasses" :key="item.id" :value="item.id">
            {{ item.code }} — {{ item.name }}
          </option>
        </select>
      </label>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="message" class="success">{{ message }}</p>
    </section>

    <template v-if="selectedClass">
      <section class="panel summary">
        <div><strong>Room:</strong> {{ selectedRoom ? `${selectedRoom.code} — ${selectedRoom.name}` : selectedClass.roomId }}</div>
        <div><strong>Capacity:</strong> {{ roomCapacity }}</div>
        <div><strong>Active enrollments:</strong> {{ enrolledStudents.length }}</div>
      </section>

      <section v-if="selectedRoom" class="panel">
        <div class="section-heading">
          <div>
            <h2>{{ editingPlanId ? "Edit seating plan" : "New seating plan" }}</h2>
            <p>Assign each enrolled student to no more than one seat.</p>
          </div>
          <button v-if="editingPlanId" type="button" @click="resetForm">Cancel edit</button>
        </div>

        <form @submit.prevent="savePlan">
          <div class="form-grid">
            <label>Title <input v-model.trim="form.title" required placeholder="August seating plan" /></label>
            <label>Date <input v-model="form.planDate" type="date" required /></label>
          </div>

          <p v-if="enrolledStudents.length > roomCapacity" class="error">
            This class has more active students than the room can seat.
          </p>

          <div class="seat-grid">
            <article v-for="seat in seats" :key="seat.key" class="seat-card">
              <strong>Desk {{ seat.deskNumber }} · Seat {{ seat.seatNumber }}</strong>
              <select v-model="seat.studentId">
                <option value="">Empty</option>
                <option
                  v-for="student in availableForSeat(seat)"
                  :key="student.id"
                  :value="String(student.id)"
                >
                  #{{ student.id }} — {{ student.name }}
                </option>
              </select>
            </article>
          </div>

          <div class="actions">
            <button type="button" @click="assignSequentially">Fill automatically</button>
            <button type="button" @click="clearAssignments">Clear</button>
            <button class="primary" :disabled="saving || enrolledStudents.length > roomCapacity">
              {{ saving ? "Saving..." : editingPlanId ? "Update plan" : "Save plan" }}
            </button>
          </div>
        </form>
      </section>

      <section class="panel">
        <div class="section-heading">
          <div><h2>Saved plans</h2><p>{{ activePlans.length }} active · {{ archivedPlans.length }} archived</p></div>
          <label><input v-model="showArchived" type="checkbox" /> Show archived</label>
        </div>
        <p v-if="loadingPlans">Loading seating plans...</p>
        <p v-else-if="visiblePlans.length === 0">No seating plans have been saved for this class.</p>
        <article v-for="plan in visiblePlans" :key="plan.id" class="plan-card" :class="{ archived: plan.active === false }">
          <div>
            <h3>{{ plan.title }}</h3>
            <p>{{ plan.planDate }} · {{ plan.assignments ? plan.assignments.length : 0 }} assigned · {{ plan.roomId }}</p>
          </div>
          <div class="actions">
            <button @click="editPlan(plan)">Edit</button>
            <button v-if="plan.active !== false" class="archive" @click="confirmArchive(plan)">Archive</button>
          </div>
        </article>
      </section>
    </template>
  </div>
</template>

<script>
import { watchClasses } from "../services/classService";
import { watchEnrollments } from "../services/enrollmentService";
import { watchRooms } from "../services/roomService";
import { watchStudents } from "../services/studentService";
import { archiveSeatingPlan, saveSeatingPlan, watchSeatingPlans } from "../services/seatingPlanService";

function today() { return new Date().toISOString().slice(0, 10); }

export default {
  name: "SeatingPlanManager",
  props: { schoolId: { type: String, required: true } },
  data() {
    return {
      classes: [], rooms: [], students: [], enrollments: [], plans: [], seats: [],
      selectedClassId: "", editingPlanId: "", showArchived: false,
      loadingPlans: false, saving: false, message: "", errorMessage: "",
      form: { title: "", planDate: today() },
      unsubscribers: [], enrollmentUnsubscribe: null, plansUnsubscribe: null,
    };
  },
  computed: {
    activeClasses() { return this.classes.filter((item) => item.active !== false); },
    selectedClass() { return this.classes.find((item) => item.id === this.selectedClassId) || null; },
    selectedRoom() { return this.selectedClass ? this.rooms.find((room) => room.id === this.selectedClass.roomId) || null : null; },
    roomCapacity() { return this.selectedRoom ? Number(this.selectedRoom.deskCount) * Number(this.selectedRoom.seatsPerDesk) : 0; },
    enrolledStudents() {
      const ids = new Set(this.enrollments.filter((item) => item.active !== false).map((item) => String(item.studentId)));
      return this.students.filter((student) => student.isActive !== false && ids.has(String(student.id)));
    },
    activePlans() { return this.plans.filter((plan) => plan.active !== false); },
    archivedPlans() { return this.plans.filter((plan) => plan.active === false); },
    visiblePlans() { return this.plans.filter((plan) => this.showArchived || plan.active !== false); },
  },
  mounted() { this.startBaseListeners(); },
  beforeUnmount() { this.stopListeners(); },
  watch: {
    schoolId() { this.selectedClassId = ""; this.startBaseListeners(); },
    selectedClassId() { this.startClassListeners(); this.resetForm(); },
    selectedRoom() { this.buildSeats(); },
  },
  methods: {
    startBaseListeners() {
      this.stopListeners();
      try {
        this.unsubscribers = [
          watchClasses(this.schoolId, (items) => { this.classes = items; }, (e) => { this.errorMessage = e.message; }),
          watchRooms(this.schoolId, (items) => { this.rooms = items; }, (e) => { this.errorMessage = e.message; }),
          watchStudents(this.schoolId, (items) => { this.students = items; }, (e) => { this.errorMessage = e.message; }),
        ];
      } catch (error) { this.errorMessage = error.message; }
    },
    startClassListeners() {
      if (this.enrollmentUnsubscribe) this.enrollmentUnsubscribe();
      if (this.plansUnsubscribe) this.plansUnsubscribe();
      this.enrollments = []; this.plans = [];
      if (!this.selectedClassId) return;
      this.loadingPlans = true;
      this.enrollmentUnsubscribe = watchEnrollments(this.schoolId, this.selectedClassId, (items) => { this.enrollments = items; }, (e) => { this.errorMessage = e.message; });
      this.plansUnsubscribe = watchSeatingPlans(this.schoolId, this.selectedClassId, (items) => { this.plans = items; this.loadingPlans = false; }, (e) => { this.loadingPlans = false; this.errorMessage = e.message; });
    },
    stopListeners() {
      this.unsubscribers.forEach((fn) => fn && fn());
      if (this.enrollmentUnsubscribe) this.enrollmentUnsubscribe();
      if (this.plansUnsubscribe) this.plansUnsubscribe();
      this.unsubscribers = []; this.enrollmentUnsubscribe = null; this.plansUnsubscribe = null;
    },
    buildSeats(assignments = []) {
      if (!this.selectedRoom) { this.seats = []; return; }
      const assignmentMap = new Map(assignments.map((item) => [`${item.deskNumber}:${item.seatNumber}`, String(item.studentId)]));
      const seats = [];
      for (let deskNumber = 1; deskNumber <= Number(this.selectedRoom.deskCount); deskNumber += 1) {
        for (let seatNumber = 1; seatNumber <= Number(this.selectedRoom.seatsPerDesk); seatNumber += 1) {
          const key = `${deskNumber}:${seatNumber}`;
          seats.push({ key, deskNumber, seatNumber, studentId: assignmentMap.get(key) || "" });
        }
      }
      this.seats = seats;
    },
    availableForSeat(currentSeat) {
      const used = new Set(this.seats.filter((seat) => seat.key !== currentSeat.key && seat.studentId).map((seat) => String(seat.studentId)));
      return this.enrolledStudents.filter((student) => !used.has(String(student.id)) || String(student.id) === String(currentSeat.studentId));
    },
    assignSequentially() {
      this.clearAssignments();
      this.enrolledStudents.slice(0, this.seats.length).forEach((student, index) => { this.seats[index].studentId = String(student.id); });
    },
    clearAssignments() { this.seats.forEach((seat) => { seat.studentId = ""; }); },
    resetForm() { this.editingPlanId = ""; this.form = { title: "", planDate: today() }; this.buildSeats(); },
    editPlan(plan) {
      this.editingPlanId = plan.id;
      this.form = { title: plan.title, planDate: plan.planDate };
      this.buildSeats(plan.assignments || []);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    async savePlan() {
      if (!this.selectedRoom) { this.errorMessage = "The selected class does not have a valid room."; return; }
      this.saving = true; this.errorMessage = ""; this.message = "";
      try {
        await saveSeatingPlan(this.schoolId, this.selectedClassId, {
          id: this.editingPlanId || undefined,
          title: this.form.title,
          planDate: this.form.planDate,
          roomId: this.selectedRoom.id,
          deskCount: Number(this.selectedRoom.deskCount),
          seatsPerDesk: Number(this.selectedRoom.seatsPerDesk),
          assignments: this.seats.filter((seat) => seat.studentId).map((seat) => ({ studentId: seat.studentId, deskNumber: seat.deskNumber, seatNumber: seat.seatNumber })),
          active: true,
        });
        this.message = this.editingPlanId ? "Seating plan updated." : "Seating plan saved.";
        this.resetForm();
      } catch (error) { this.errorMessage = error.message; } finally { this.saving = false; }
    },
    async confirmArchive(plan) {
      if (!window.confirm(`Archive ${plan.title}?`)) return;
      try { await archiveSeatingPlan(this.schoolId, this.selectedClassId, plan.id); this.message = `${plan.title} was archived.`; }
      catch (error) { this.errorMessage = error.message; }
    },
  },
};
</script>

<style scoped>
.page { padding: 24px; max-width: 1180px; margin: 0 auto; }
.page-header { margin-bottom: 20px; }
.panel { background: white; border: 1px solid #ddd; border-radius: 10px; padding: 18px; margin-bottom: 18px; }
.controls select, input, select { padding: 9px; border: 1px solid #bbb; border-radius: 6px; }
.form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 18px; }
label { display: flex; flex-direction: column; gap: 6px; }
.summary { display: flex; flex-wrap: wrap; gap: 24px; }
.section-heading, .plan-card, .actions { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.seat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 12px; }
.seat-card, .plan-card { border: 1px solid #ddd; border-radius: 8px; padding: 12px; }
.seat-card { display: flex; flex-direction: column; gap: 8px; }
.plan-card { margin-top: 10px; }
button { padding: 9px 14px; border: 0; border-radius: 6px; cursor: pointer; }
.primary { background: #42b883; color: white; }
.archive { background: #d9534f; color: white; }
.archived { opacity: .6; }
.error { color: #b00020; }
.success { color: #167c3a; }
@media (max-width: 700px) { .section-heading, .plan-card { align-items: stretch; flex-direction: column; } }
</style>
