<template>
  <div class="page">
    <header class="page-header">
      <h1>🏷️ Class Management</h1>
      <p>Connect a course, a physical room, and an academic period.</p>
    </header>

    <section class="panel">
      <h2>{{ isEditing ? "Edit class" : "Add class" }}</h2>
      <form class="class-form" @submit.prevent="submitClass">
        <label>Class code<input v-model.trim="form.code" placeholder="ENG2026-AM" :disabled="isEditing" required /></label>
        <label>Class name<input v-model.trim="form.name" placeholder="English - Morning" required /></label>
        <label>Course
          <select v-model="form.courseId" required>
            <option value="" disabled>Select a course</option>
            <option v-for="course in availableCourses" :key="course.id" :value="course.id">{{ course.code }} — {{ course.name }}</option>
          </select>
        </label>
        <label>Room
          <select v-model="form.roomId" required>
            <option value="" disabled>Select a room</option>
            <option v-for="room in availableRooms" :key="room.id" :value="room.id">{{ room.code || room.id }} — {{ room.name || 'Unnamed room' }}</option>
          </select>
        </label>
        <label>Academic year<input v-model.number="form.academicYear" type="number" min="2000" max="2100" required /></label>
        <label>Semester<select v-model.number="form.semester" required><option :value="1">1</option><option :value="2">2</option><option :value="3">3</option><option :value="4">4</option></select></label>
        <label class="checkbox full"><input v-model="form.active" type="checkbox" /> Active</label>
        <div class="actions full">
          <button class="primary" type="submit" :disabled="saving || !dependenciesReady">{{ saving ? "Saving..." : isEditing ? "Update class" : "Add class" }}</button>
          <button v-if="isEditing" type="button" @click="resetForm">Cancel</button>
        </div>
      </form>
      <p v-if="!dependenciesReady" class="error">Create at least one active course and one active room before adding a class.</p>
      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </section>

    <section class="panel">
      <div class="section-heading"><h2>Classes</h2><span>{{ classes.length }} total</span></div>
      <p v-if="loading">Loading classes...</p>
      <p v-else-if="classes.length === 0">No classes have been created yet.</p>
      <article v-for="item in classes" :key="item.id" class="card" :class="{ archived: !item.active }">
        <div>
          <div class="title-row"><h3>{{ item.code }} — {{ item.name }}</h3><span>{{ item.active ? "Active" : "Archived" }}</span></div>
          <p><strong>Course:</strong> {{ courseLabel(item.courseId) }}</p>
          <p><strong>Room:</strong> {{ roomLabel(item.roomId) }}</p>
          <p><strong>Period:</strong> {{ item.academicYear }}, semester {{ item.semester }}</p>
        </div>
        <div class="card-actions"><button @click="editClass(item)">Edit</button><button v-if="item.active" class="archive" @click="confirmArchive(item)">Archive</button></div>
      </article>
    </section>
  </div>
</template>

<script>
import { archiveClass, saveClass, watchClasses } from "../services/classService";
import { watchCourses } from "../services/courseService";
import { watchRooms } from "../services/roomService";

function emptyForm() { return { code: "", name: "", courseId: "", roomId: "", academicYear: new Date().getFullYear(), semester: 1, active: true }; }

export default {
  name: "ClassManager",
  props: { schoolId: { type: String, required: true } },
  data() { return { classes: [], courses: [], rooms: [], form: emptyForm(), editingClassId: null, loading: true, saving: false, message: "", errorMessage: "", unsubscribers: [] }; },
  computed: {
    isEditing() { return Boolean(this.editingClassId); },
    availableCourses() { return this.courses.filter((item) => item.active !== false || item.id === this.form.courseId); },
    availableRooms() { return this.rooms.filter((item) => item.active !== false || item.id === this.form.roomId); },
    dependenciesReady() { return this.availableCourses.length > 0 && this.availableRooms.length > 0; },
  },
  mounted() { this.startListeners(); },
  beforeUnmount() { this.stopListeners(); },
  watch: { schoolId() { this.resetForm(); this.startListeners(); } },
  methods: {
    startListeners() {
      this.stopListeners(); this.loading = true; this.errorMessage = "";
      try {
        this.unsubscribers = [
          watchClasses(this.schoolId, (items) => { this.classes = items; this.loading = false; }, (e) => { this.loading = false; this.errorMessage = `Unable to load classes: ${e.message}`; }),
          watchCourses(this.schoolId, (items) => { this.courses = items; }, (e) => { this.errorMessage = `Unable to load courses: ${e.message}`; }),
          watchRooms(this.schoolId, (items) => { this.rooms = items; }, (e) => { this.errorMessage = `Unable to load rooms: ${e.message}`; }),
        ];
      } catch (e) { this.loading = false; this.errorMessage = e.message; }
    },
    stopListeners() { this.unsubscribers.forEach((unsubscribe) => unsubscribe && unsubscribe()); this.unsubscribers = []; },
    courseLabel(id) { const item = this.courses.find((course) => course.id === id); return item ? `${item.code} — ${item.name}` : id; },
    roomLabel(id) { const item = this.rooms.find((room) => room.id === id); return item ? `${item.code || item.id} — ${item.name || 'Unnamed room'}` : id; },
    editClass(item) { this.editingClassId = item.id; this.form = { code: item.code || item.id, name: item.name, courseId: item.courseId, roomId: item.roomId, academicYear: item.academicYear, semester: item.semester, active: item.active !== false }; this.message = ""; this.errorMessage = ""; },
    resetForm() { this.form = emptyForm(); this.editingClassId = null; this.message = ""; this.errorMessage = ""; },
    async submitClass() { this.saving = true; this.message = ""; this.errorMessage = ""; try { const id = await saveClass(this.schoolId, this.form); this.message = `Class ${id} saved successfully.`; this.form = emptyForm(); this.editingClassId = null; } catch (e) { this.errorMessage = e.message; } finally { this.saving = false; } },
    async confirmArchive(item) { if (!window.confirm(`Archive ${item.code} — ${item.name}?`)) return; try { await archiveClass(this.schoolId, item.id); this.message = `Class ${item.code} archived.`; if (this.editingClassId === item.id) this.resetForm(); } catch (e) { this.errorMessage = e.message; } },
  },
};
</script>

<style scoped>
.page{padding:30px;max-width:1100px;margin:0 auto}.page-header{margin-bottom:24px}.page-header h1,.panel h2{margin-top:0}.page-header p{color:#666}.panel{background:#fff;border:1px solid #ddd;border-radius:12px;padding:24px;margin-bottom:24px}.class-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}label{display:flex;flex-direction:column;gap:7px;font-weight:600}input,select{box-sizing:border-box;width:100%;border:1px solid #bbb;border-radius:8px;padding:10px 12px;font:inherit}.checkbox{flex-direction:row;align-items:center}.checkbox input{width:auto}.full{grid-column:1/-1}.actions,.card-actions,.section-heading,.title-row{display:flex;gap:10px;align-items:center}.section-heading,.title-row{justify-content:space-between}.primary{background:#42b883;color:#fff}.archive{background:#b63b3b;color:#fff}button{border:0;border-radius:8px;padding:10px 14px;cursor:pointer}.success{color:#18794e}.error{color:#b42318}.card{display:flex;justify-content:space-between;gap:20px;border-top:1px solid #eee;padding:18px 0}.card h3,.card p{margin:4px 0}.archived{opacity:.65}@media(max-width:700px){.class-form{grid-template-columns:1fr}.full{grid-column:auto}.card{flex-direction:column}}
</style>
