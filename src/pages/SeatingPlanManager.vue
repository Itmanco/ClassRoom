<template>
  <div
    class="page"
    :class="{ embedded: isEmbedded }"
  >
    <header
      v-if="!isEmbedded"
      class="page-header"
    >
      <h1>🪑 {{ $t("seatingPlans.title") }}</h1>

      <p>
        {{ $t("seatingPlans.description") }}
      </p>
    </header>

    <section
      v-if="!isEmbedded"
      class="panel controls"
    >
      <label>
        {{ $t("seatingPlans.fields.class") }}

        <select v-model="selectedClassId">
          <option value="">
            {{ $t("seatingPlans.placeholders.class") }}
          </option>

          <option
            v-for="item in activeClasses"
            :key="item.id"
            :value="item.id"
          >
            {{ item.code }} — {{ item.name }}
          </option>
        </select>
      </label>
    </section>

    <p
      v-if="errorMessage"
      class="feedback error"
    >
      {{ errorMessage }}
    </p>

    <p
      v-if="message"
      class="feedback success"
    >
      {{ message }}
    </p>

    <template v-if="selectedClass">
      <section class="panel summary">
        <div>
          <strong>
            {{ $t("seatingPlans.fields.room") }}:
          </strong>

          {{
            selectedRoom
              ? `${selectedRoom.code} — ${selectedRoom.name}`
              : selectedClass.roomId
          }}
        </div>

        <div>
          <strong>
            {{ $t("seatingPlans.fields.capacity") }}:
          </strong>

          {{ roomCapacity }}
        </div>

        <div>
          <strong>
            {{ $t("seatingPlans.fields.activeEnrollments") }}:
          </strong>

          {{ enrolledStudents.length }}
        </div>
      </section>

      <section
        v-if="selectedRoom"
        class="panel"
      >
        <div class="section-heading">
          <div>
            <h2>
              {{
                editingPlanId
                  ? $t("seatingPlans.form.edit")
                  : $t("seatingPlans.form.new")
              }}
            </h2>

            <p>
              {{ $t("seatingPlans.form.assignmentHelp") }}
            </p>
          </div>

          <button
            v-if="editingPlanId"
            type="button"
            @click="resetForm"
          >
            {{ $t("seatingPlans.form.cancelEdit") }}
          </button>
        </div>

        <form @submit.prevent="savePlan">
          <div class="form-grid">
            <label>
              {{ $t("seatingPlans.fields.title") }}

              <input
                v-model.trim="form.title"
                required
                :placeholder="$t('seatingPlans.placeholders.title')"
              />
            </label>

            <label>
              {{ $t("seatingPlans.fields.date") }}

              <input
                v-model="form.planDate"
                type="date"
                required
              />
            </label>
          </div>

          <p
            v-if="enrolledStudents.length > roomCapacity"
            class="error"
          >
            {{ $t("seatingPlans.form.capacityWarning") }}
          </p>

          <!--
            Planning Engine internationalization is intentionally
            deferred to the next commit.
          -->
          <section class="generator-box">
            <div class="section-heading">
              <div>
                <h3>{{ $t("planningEngine.title") }}</h3>

                <p>
                  {{ $t("planningEngine.description") }}
                </p>
              </div>

              <label>
                {{ $t("planningEngine.fields.attempts") }}

                <select v-model.number="generatorOptions.attempts">
                  <option :value="100">100</option>
                  <option :value="500">500</option>
                  <option :value="1000">1,000</option>
                  <option :value="2500">2,500</option>
                  <option :value="5000">5,000</option>
                </select>
              </label>
            </div>

            <div class="constraint-grid">
              <label>
                <input
                  v-model="generatorOptions.avoidPreviousPartners"
                  type="checkbox"
                />

                {{ $t("planningEngine.preferences.avoidPartners") }}
              </label>

              <label>
                <input
                  v-model="generatorOptions.avoidPreviousDesks"
                  type="checkbox"
                />

                {{ $t("planningEngine.preferences.avoidDesks") }}
              </label>

              <label>
                <input
                  v-model="generatorOptions.avoidPreviousSeat"
                  type="checkbox"
                />

                {{ $t("planningEngine.preferences.avoidSeats") }}
              </label>
            </div>

            <div class="actions generator-actions">
              <button
                type="button"
                class="primary"
                :disabled="
                  enrolledStudents.length === 0 ||
                  enrolledStudents.length > roomCapacity
                "
                @click="generateRecommendations"
              >
                {{
                  generationResult
                    ? $t("planningEngine.actions.regenerate")
                    : $t("planningEngine.actions.generate")
                }}
              </button>

              <span v-if="generationResult">
                {{
                  $t("planningEngine.results.summary", {
                    candidates:
                      generationResult.uniqueCandidatesEvaluated,
                    plans:
                      generationResult.historyPlansConsidered,
                  })
                }}
              </span>
            </div>

            <div
              v-if="generationResult"
              class="candidate-grid"
            >
              <article
                v-for="(candidate, index) in generationResult.candidates"
                :key="candidateKey(candidate)"
                class="candidate-card"
                :class="{
                  selected: selectedCandidateIndex === index,
                }"
              >
                <div class="candidate-heading">
                  <div>
                    <strong>
                      {{
                        $t("planningEngine.results.layout", {
                          rank: candidate.rank,
                        })
                      }}
                    </strong>

                    <span class="quality">
                      {{ qualityLabel(candidate.quality) }}
                    </span>
                  </div>

                  <button
                    type="button"
                    @click="selectCandidate(index)"
                  >
                    {{
                      selectedCandidateIndex === index
                        ? $t("planningEngine.actions.selected")
                        : $t("planningEngine.actions.preview")
                    }}
                  </button>
                </div>

                <dl>
                  <div>
                    <dt>
                      {{
                        $t(
                          "planningEngine.objectives.repeatedPartners",
                        )
                      }}
                    </dt>

                    <dd>
                      {{ candidate.objectives.repeatedPartners }}
                    </dd>
                  </div>

                  <div>
                    <dt>
                      {{
                        $t(
                          "planningEngine.objectives.repeatedDesks",
                        )
                      }}
                    </dt>

                    <dd>
                      {{ candidate.objectives.repeatedDesks }}
                    </dd>
                  </div>

                  <div>
                    <dt>
                      {{
                        $t(
                          "planningEngine.objectives.repeatedSeats",
                        )
                      }}
                    </dt>

                    <dd>
                      {{ candidate.objectives.repeatedSeats }}
                    </dd>
                  </div>
                </dl>

                <details v-if="candidate.violations.length">
                  <summary>
                    {{ $t("planningEngine.results.tradeoffs") }}
                  </summary>

                  <ul>
                    <li
                      v-for="(
                        violation,
                        violationIndex
                      ) in candidate.violations"
                      :key="`${violation.type}-${violationIndex}`"
                    >
                      {{ violationText(violation) }}
                    </li>
                  </ul>
                </details>

                <p
                  v-else
                  class="success"
                >
                  {{ $t("planningEngine.results.noConflicts") }}
                </p>
              </article>
            </div>
          </section>

          <section class="classroom-layout">
            <div class="front-zone">
              <div
                v-if="teacherPosition === 'front-left'"
                class="teacher-desk"
              >
                {{ $t("seatingPlans.classroom.teacherDesk") }}
              </div>

              <div class="classroom-front">
                <span class="front-label">
                  {{ $t("seatingPlans.classroom.front") }}
                </span>

                <div class="whiteboard">
                  {{ $t("seatingPlans.classroom.whiteboard") }}
                </div>
              </div>

              <div
                v-if="teacherPosition === 'front-right'"
                class="teacher-desk"
              >
                {{ $t("seatingPlans.classroom.teacherDesk") }}
              </div>
            </div>

            <div class="student-zone">
              <div class="desk-grid">
                <article
                  v-for="desk in groupedDesks"
                  :key="desk.deskNumber"
                  class="desk"
                >
                  <div class="desk-number">
                    {{
                      $t("seatingPlans.classroom.desk", {
                        number: desk.deskNumber,
                      })
                    }}
                  </div>

                  <div
                    class="desk-seats"
                    :style="{
                      gridTemplateColumns:
                        `repeat(${desk.seats.length}, minmax(0, 1fr))`,
                    }"
                  >
                    <div
                      v-for="seat in desk.seats"
                      :key="seat.key"
                      class="desk-seat"
                    >
                      <span class="seat-number">
                        {{
                          $t("seatingPlans.classroom.seat", {
                            number: seat.seatNumber,
                          })
                        }}
                      </span>

                      <strong
                        v-if="seat.studentId"
                        class="student-preview"
                      >
                        {{ studentName(seat.studentId) }}
                      </strong>

                      <span
                        v-else
                        class="student-preview empty"
                      >
                        {{ $t("seatingPlans.placeholders.emptySeat") }}
                      </span>

                      <select
                        v-model="seat.studentId"
                        @change="generationResult = null"
                      >
                        <option value="">
                          {{ $t("seatingPlans.placeholders.emptySeat") }}
                        </option>

                        <option
                          v-for="student in availableForSeat(seat)"
                          :key="student.id"
                          :value="String(student.id)"
                        >
                          #{{ student.id }} — {{ student.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <div
              v-if="
                teacherPosition === 'back-left' ||
                teacherPosition === 'back-right'
              "
              class="back-teacher-zone"
              :class="{
                left: teacherPosition === 'back-left',
                right: teacherPosition === 'back-right',
              }"
            >
              <div class="teacher-desk">
                {{ $t("seatingPlans.classroom.teacherDesk") }}
              </div>
            </div>
          </section>

          <div class="actions">
            <button
              type="button"
              @click="assignSequentially"
            >
              {{ $t("seatingPlans.actions.fill") }}
            </button>

            <button
              type="button"
              @click="clearAssignments"
            >
              {{ $t("seatingPlans.actions.clear") }}
            </button>

            <button
              class="primary"
              :disabled="
                saving ||
                enrolledStudents.length > roomCapacity
              "
            >
              {{
                saving
                  ? $t("common.saving")
                  : editingPlanId
                    ? $t("seatingPlans.actions.update")
                    : $t("seatingPlans.actions.save")
              }}
            </button>
          </div>
        </form>
      </section>

      <section class="panel">
        <div class="section-heading">
          <div>
            <h2>
              {{ $t("seatingPlans.list.title") }}
            </h2>

            <p>
              {{
                $t("seatingPlans.list.summary", {
                  active: activePlans.length,
                  archived: archivedPlans.length,
                })
              }}
            </p>
          </div>

          <label>
            <input
              v-model="showArchived"
              type="checkbox"
            />

            {{ $t("seatingPlans.list.showArchived") }}
          </label>
        </div>

        <p v-if="loadingPlans">
          {{ $t("seatingPlans.list.loading") }}
        </p>

        <p v-else-if="visiblePlans.length === 0">
          {{ $t("seatingPlans.list.empty") }}
        </p>

        <article
          v-for="plan in visiblePlans"
          :key="plan.id"
          class="plan-card"
          :class="{ archived: plan.active === false }"
        >
          <div>
            <h3>{{ plan.title }}</h3>

            <p>
              {{
                $t("seatingPlans.list.planSummary", {
                  date: plan.planDate,
                  assigned: plan.assignments
                    ? plan.assignments.length
                    : 0,
                  room: plan.roomId,
                })
              }}
            </p>
          </div>

          <div class="actions">

            <button
              type="button"
              @click="exportPlan(plan)"
            >
              📊 {{ $t("seatingPlans.actions.exportExcel") }}
            </button>
            
            <button @click="editPlan(plan)">
              {{ $t("common.edit") }}
            </button>

            <button
              v-if="plan.active !== false"
              class="archive"
              @click="confirmArchive(plan)"
            >
              {{ $t("common.archive") }}
            </button>
          </div>
        </article>
      </section>
    </template>
  </div>
</template>

<script>
import {
  exportSeatingPlan,
} from "../services/seatingPlanExportService";
import {
  watchClasses,
} from "../services/classService";
import {
  watchEnrollments,
} from "../services/enrollmentService";
import {
  watchRooms,
} from "../services/roomService";
import {
  watchStudents,
} from "../services/studentService";
import {
  archiveSeatingPlan,
  saveSeatingPlan,
  watchSeatingPlans,
} from "../services/seatingPlanService";
import {
  generateSeatingCandidates,
} from "../engine/seating/SeatingEngine";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default {
  name: "SeatingPlanManager",

  props: {
    schoolId: {
      type: String,
      required: true,
    },
      classId: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      classes: [],
      rooms: [],
      students: [],
      enrollments: [],
      plans: [],
      seats: [],
      selectedClassId: this.classId || "",
      editingPlanId: "",
      showArchived: false,
      loadingPlans: false,
      saving: false,
      message: "",
      errorMessage: "",

      form: {
        title: "",
        planDate: today(),
      },

      generatorOptions: {
        avoidPreviousPartners: true,
        avoidPreviousDesks: true,
        avoidPreviousSeat: true,
        attempts: 1000,
        resultCount: 3,
      },

      generationResult: null,
      selectedCandidateIndex: 0,
      unsubscribers: [],
      enrollmentUnsubscribe: null,
      plansUnsubscribe: null,
    };
  },

  computed: {
    isEmbedded() {
      return Boolean(this.classId);
    },

    activeClasses() {
      return this.classes.filter(
        (item) => item.active !== false,
      );
    },

    selectedClass() {
      return (
        this.classes.find(
          (item) => item.id === this.selectedClassId,
        ) || null
      );
    },

    selectedRoom() {
      if (!this.selectedClass) {
        return null;
      }

      return (
        this.rooms.find(
          (room) =>
            room.id === this.selectedClass.roomId,
        ) || null
      );
    },

    roomCapacity() {
      if (!this.selectedRoom) {
        return 0;
      }

      return (
        Number(this.selectedRoom.deskCount) *
        Number(this.selectedRoom.seatsPerDesk)
      );
    },

    groupedDesks() {
      const desks = new Map();

      this.seats.forEach((seat) => {
        if (!desks.has(seat.deskNumber)) {
          desks.set(seat.deskNumber, []);
        }

        desks
          .get(seat.deskNumber)
          .push(seat);
      });

      return Array.from(
        desks.entries(),
      ).map(([deskNumber, seats]) => ({
        deskNumber,
        seats: seats.sort(
          (a, b) =>
            a.seatNumber - b.seatNumber,
        ),
      }));
    },

    enrolledStudents() {
      const ids = new Set(
        this.enrollments
          .filter((item) => item.active !== false)
          .map((item) => String(item.studentId)),
      );

      return this.students.filter(
        (student) =>
          student.isActive !== false &&
          ids.has(String(student.id)),
      );
    },

    activePlans() {
      return this.plans.filter(
        (plan) => plan.active !== false,
      );
    },

    archivedPlans() {
      return this.plans.filter(
        (plan) => plan.active === false,
      );
    },

    visiblePlans() {
      return this.plans.filter(
        (plan) =>
          this.showArchived ||
          plan.active !== false,
      );
    },

    teacherPosition() {
      return (
        this.selectedRoom?.teacherPosition ||
        "front-right"
      );
    },

  },

  mounted() {
    this.startBaseListeners();

    if (this.selectedClassId) {
      this.startClassListeners();
    }
  },

  beforeUnmount() {
    this.stopListeners();
  },

  watch: {
    schoolId() {
      this.selectedClassId = this.classId || "";
      this.resetWorkspaceState();
      this.startBaseListeners();
    },

    classId(newClassId) {
      this.selectedClassId = newClassId || "";
      this.resetWorkspaceState();
    },

    selectedClassId() {
      this.startClassListeners();
      this.resetForm();
    },

    selectedRoom() {
      this.buildSeats();
    },
  },

  methods: {
    startBaseListeners() {
      this.stopListeners();

      try {
        this.unsubscribers = [
          watchClasses(
            this.schoolId,
            (items) => {
              this.classes = items;

              if (
                !this.isEmbedded &&
                this.selectedClassId &&
                !items.some(
                  (item) =>
                    item.id === this.selectedClassId &&
                    item.active !== false,
                )
              ) {
                this.selectedClassId = "";
              }
            },
            (error) => {
              this.errorMessage = this.$t(
                "seatingPlans.messages.classesLoadError",
                {
                  error: error.message,
                },
              );
            },
          ),

          watchRooms(
            this.schoolId,
            (items) => {
              this.rooms = items;
            },
            (error) => {
              this.errorMessage = this.$t(
                "seatingPlans.messages.roomsLoadError",
                {
                  error: error.message,
                },
              );
            },
          ),

          watchStudents(
            this.schoolId,
            (items) => {
              this.students = items;
            },
            (error) => {
              this.errorMessage = this.$t(
                "seatingPlans.messages.studentsLoadError",
                {
                  error: error.message,
                },
              );
            },
          ),
        ];
      } catch (error) {
        this.errorMessage = this.$t(
          "seatingPlans.messages.loadError",
          {
            error: error.message,
          },
        );
      }
    },

    startClassListeners() {
      if (this.enrollmentUnsubscribe) {
        this.enrollmentUnsubscribe();
      }

      if (this.plansUnsubscribe) {
        this.plansUnsubscribe();
      }

      this.enrollments = [];
      this.plans = [];

      if (!this.selectedClassId) {
        return;
      }

      this.loadingPlans = true;

      this.enrollmentUnsubscribe = watchEnrollments(
        this.schoolId,
        this.selectedClassId,
        (items) => {
          this.enrollments = items;
        },
        (error) => {
          this.errorMessage = this.$t(
            "seatingPlans.messages.enrollmentsLoadError",
            {
              error: error.message,
            },
          );
        },
      );

      this.plansUnsubscribe = watchSeatingPlans(
        this.schoolId,
        this.selectedClassId,
        (items) => {
          this.plans = items;
          this.loadingPlans = false;
        },
        (error) => {
          this.loadingPlans = false;

          this.errorMessage = this.$t(
            "seatingPlans.messages.plansLoadError",
            {
              error: error.message,
            },
          );
        },
      );
    },

    stopListeners() {
      this.unsubscribers.forEach((unsubscribe) => {
        if (unsubscribe) {
          unsubscribe();
        }
      });

      if (this.enrollmentUnsubscribe) {
        this.enrollmentUnsubscribe();
      }

      if (this.plansUnsubscribe) {
        this.plansUnsubscribe();
      }

      this.unsubscribers = [];
      this.enrollmentUnsubscribe = null;
      this.plansUnsubscribe = null;
    },

    buildSeats(assignments = []) {
      if (!this.selectedRoom) {
        this.seats = [];
        return;
      }

      const assignmentMap = new Map(
        assignments.map((item) => [
          `${item.deskNumber}:${item.seatNumber}`,
          String(item.studentId),
        ]),
      );

      const seats = [];

      for (
        let deskNumber = 1;
        deskNumber <= Number(this.selectedRoom.deskCount);
        deskNumber += 1
      ) {
        for (
          let seatNumber = 1;
          seatNumber <=
          Number(this.selectedRoom.seatsPerDesk);
          seatNumber += 1
        ) {
          const key = `${deskNumber}:${seatNumber}`;

          seats.push({
            key,
            deskNumber,
            seatNumber,
            studentId: assignmentMap.get(key) || "",
          });
        }
      }

      this.seats = seats;
    },

    availableForSeat(currentSeat) {
      const used = new Set(
        this.seats
          .filter(
            (seat) =>
              seat.key !== currentSeat.key &&
              seat.studentId,
          )
          .map((seat) => String(seat.studentId)),
      );

      return this.enrolledStudents.filter(
        (student) =>
          !used.has(String(student.id)) ||
          String(student.id) ===
            String(currentSeat.studentId),
      );
    },

    assignSequentially() {
      this.clearAssignments();

      this.enrolledStudents
        .slice(0, this.seats.length)
        .forEach((student, index) => {
          this.seats[index].studentId =
            String(student.id);
        });
    },

    clearAssignments() {
      this.seats.forEach((seat) => {
        seat.studentId = "";
      });

      this.generationResult = null;
    },

    // Planning Engine messages stay in English
    // until the next dedicated commit.
    generateRecommendations() {
      this.errorMessage = "";
      this.message = "";

      try {
        this.generationResult =
          generateSeatingCandidates({
            students: this.enrolledStudents,
            positions: this.seats,
            historyPlans: this.plans.filter(
              (plan) => plan.active !== false,
            ),
            options: this.generatorOptions,
          });

        this.selectedCandidateIndex = 0;

        this.applyCandidate(
          this.generationResult.candidates[0],
        );

        this.message = this.$t(
          "planningEngine.messages.generated",
        );
      } catch (error) {
        this.generationResult = null;

        this.errorMessage = this.$t(
          "planningEngine.messages.generationError",
          {
            error: error.message,
          },
        );
      }
    },

    candidateKey(candidate) {
      return candidate.assignments
        .map(
          (item) =>
            `${item.studentId}:${item.deskNumber}:${item.seatNumber}`,
        )
        .join("|");
    },

    applyCandidate(candidate) {
      if (!candidate) {
        return;
      }

      const assignmentMap = new Map(
        candidate.assignments.map((item) => [
          `${item.deskNumber}:${item.seatNumber}`,
          String(item.studentId),
        ]),
      );

      this.seats.forEach((seat) => {
        seat.studentId =
          assignmentMap.get(seat.key) || "";
      });
    },

    selectCandidate(index) {
      this.selectedCandidateIndex = index;

      this.applyCandidate(
        this.generationResult?.candidates[index],
      );

      this.message = this.$t(
        "planningEngine.messages.selected",
        {
          rank: index + 1,
        },
      );
    },

    studentName(studentId) {
      const student = this.students.find(
        (item) =>
          String(item.id) === String(studentId),
      );

      return student
        ? student.name
        : this.$t(
            "planningEngine.students.unknown",
            {
              id: studentId,
            },
          );
    },


    violationText(violation) {
      if (violation.type === "previous-partner") {
        return this.$t(
          "planningEngine.violations.previousPartner",
          {
            studentA: this.studentName(
              violation.studentA,
            ),
            studentB: this.studentName(
              violation.studentB,
            ),
          },
        );
      }

      if (violation.type === "previous-desk") {
        return this.$t(
          "planningEngine.violations.previousDesk",
          {
            student: this.studentName(
              violation.studentId,
            ),
            desk: violation.deskNumber,
          },
        );
      }

      if (violation.type === "previous-seat") {
        return this.$t(
          "planningEngine.violations.previousSeat",
          {
            student: this.studentName(
              violation.studentId,
            ),
            desk: violation.deskNumber,
            seat: violation.seatNumber,
          },
        );
      }

      return this.$t(
        "planningEngine.violations.unknown",
      );
    },

    resetForm() {
      this.editingPlanId = "";

      this.form = {
        title: "",
        planDate: today(),
      };

      this.generationResult = null;
      this.selectedCandidateIndex = 0;

      this.buildSeats();
    },

    editPlan(plan) {
      this.editingPlanId = plan.id;

      this.form = {
        title: plan.title,
        planDate: plan.planDate,
      };

      this.generationResult = null;
      this.selectedCandidateIndex = 0;

      this.buildSeats(plan.assignments || []);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    async savePlan() {
      if (!this.selectedRoom) {
        this.errorMessage = this.$t(
          "seatingPlans.messages.invalidRoom",
        );

        return;
      }

      this.saving = true;
      this.errorMessage = "";
      this.message = "";

      try {
        await saveSeatingPlan(
          this.schoolId,
          this.selectedClassId,
          {
            id: this.editingPlanId || undefined,
            title: this.form.title,
            planDate: this.form.planDate,
            roomId: this.selectedRoom.id,
            deskCount: Number(
              this.selectedRoom.deskCount,
            ),
            seatsPerDesk: Number(
              this.selectedRoom.seatsPerDesk,
            ),
            assignments: this.seats
              .filter((seat) => seat.studentId)
              .map((seat) => ({
                studentId: seat.studentId,
                deskNumber: seat.deskNumber,
                seatNumber: seat.seatNumber,
              })),
            active: true,
          },
        );

        this.message = this.editingPlanId
          ? this.$t("seatingPlans.messages.updated")
          : this.$t("seatingPlans.messages.saved");

        this.resetForm();
      } catch (error) {
        this.errorMessage = this.$t(
          "seatingPlans.messages.saveError",
          {
            error: error.message,
          },
        );
      } finally {
        this.saving = false;
      }
    },

    async confirmArchive(plan) {
      const confirmed = window.confirm(
        this.$t(
          "seatingPlans.messages.archiveConfirm",
          {
            title: plan.title,
          },
        ),
      );

      if (!confirmed) {
        return;
      }

      this.message = "";
      this.errorMessage = "";

      try {
        await archiveSeatingPlan(
          this.schoolId,
          this.selectedClassId,
          plan.id,
        );

        this.message = this.$t(
          "seatingPlans.messages.archived",
          {
            title: plan.title,
          },
        );
      } catch (error) {
        this.errorMessage = this.$t(
          "seatingPlans.messages.archiveError",
          {
            error: error.message,
          },
        );
      }
    },

    qualityLabel(quality) {
      if (!quality) {
        return "";
      }

      const normalizedQuality = String(quality)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "");

      const key =
        `planningEngine.quality.${normalizedQuality}`;

      return this.$te(key)
        ? this.$t(key)
        : quality;
    },

    resetWorkspaceState() {
      this.showArchived = false;
      this.message = "";
      this.errorMessage = "";
      this.generationResult = null;
      this.selectedCandidateIndex = 0;
    },

    exportPlan(plan) {
      const room =
        this.rooms.find(
          (item) =>
            item.id === plan.roomId,
        ) || this.selectedRoom;

      try {
        exportSeatingPlan({
          plan,
          classroom: this.selectedClass,
          room,
          students: this.students,
        });

        this.message = this.$t(
          "seatingPlans.messages.exported",
        );
      } catch (error) {
        this.errorMessage = this.$t(
          "seatingPlans.messages.exportError",
          {
            error: error.message,
          },
        );
      }
    },
    
  },
};
</script>

<style scoped>
.page {
  padding: 24px;
  max-width: 1180px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 20px;
}

.panel {
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 18px;
  margin-bottom: 18px;
}

.controls select,
input,
select {
  padding: 9px;
  border: 1px solid #bbb;
  border-radius: 6px;
}

.form-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
  margin-bottom: 18px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.summary {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.section-heading,
.plan-card,
.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.plan-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
}

.generator-box {
  border: 1px solid #c9d7e6;
  background: #f7fbff;
  border-radius: 8px;
  padding: 14px;
  margin-bottom: 18px;
}

.constraint-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(230px, 1fr));
  gap: 10px;
  margin: 12px 0;
}

.constraint-grid label {
  flex-direction: row;
  align-items: center;
}

.generator-actions {
  justify-content: flex-start;
  flex-wrap: wrap;
}

.candidate-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.candidate-card {
  border: 2px solid #d7e1ea;
  border-radius: 8px;
  padding: 14px;
  background: white;
}

.candidate-card.selected {
  border-color: #2767a7;
  box-shadow:
    0 0 0 2px rgba(39, 103, 167, 0.12);
}

.candidate-heading {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
}

.candidate-heading > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.quality {
  font-size: 0.9rem;
  color: #46627a;
}

.candidate-card dl {
  margin: 14px 0;
}

.candidate-card dl div {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 5px 0;
  border-bottom: 1px solid #edf1f4;
}

.candidate-card dt,
.candidate-card dd {
  margin: 0;
}

.candidate-card dd {
  font-weight: 700;
}

.candidate-card details ul {
  padding-left: 20px;
}

.plan-card {
  margin-top: 10px;
}

button {
  padding: 9px 14px;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}

.primary {
  background: #42b883;
  color: white;
}

.archive {
  background: #d9534f;
  color: white;
}

.archived {
  opacity: 0.6;
}

.error {
  color: #b00020;
}

.success {
  color: #167c3a;
}

.page.embedded {
  max-width: none;
  padding: 0;
}

.feedback {
  padding: 11px 14px;
  border-radius: 8px;
  margin-bottom: 18px;
}

.feedback.success {
  background: #e7f7ed;
}

.feedback.error {
  background: #fde8e8;
}

.classroom-layout {
  margin: 24px 0;
  padding: 28px;
  border: 1px solid #d9dee3;
  border-radius: 12px;
  background: #fafbfc;
}

.classroom-front {
  max-width: 620px;
  margin: 0 auto 34px;
  text-align: center;
}

.front-label {
  display: block;
  margin-bottom: 8px;
  color: #667085;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.whiteboard {
  padding: 11px 20px;
  border: 2px solid #555;
  border-radius: 4px;
  background: white;
  color: #333;
  font-weight: 700;
  box-shadow:
    0 2px 3px rgba(0, 0, 0, 0.08);
}

.desk-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(300px, 1fr));
  gap: 26px 46px;
  max-width: 960px;
  margin: 0 auto;
}

.desk {
  position: relative;
}

.desk-number {
  margin-bottom: 6px;
  color: #667085;
  font-size: 0.78rem;
  font-weight: 700;
  text-align: center;
}

.desk-seats {
  display: grid;
  border: 2px solid #777;
  border-radius: 9px;
  background: #fff;
  overflow: hidden;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.08);
}

.desk-seat {
  min-width: 0;
  padding: 12px;
  text-align: center;
}

.desk-seat + .desk-seat {
  border-left: 1px solid #bbb;
}

.seat-number {
  display: block;
  margin-bottom: 6px;
  color: #8a929d;
  font-size: 0.72rem;
}

.student-preview {
  display: block;
  min-height: 22px;
  margin-bottom: 9px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.student-preview.empty {
  color: #999;
  font-weight: 400;
}

.desk-seat select {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  font-size: 0.82rem;
}

.teacher-area {
  display: flex;
  justify-content: center;
  margin-top: 38px;
}

.teacher-desk {
  min-width: 130px;
  padding: 11px 20px;
  border: 2px solid #777;
  border-radius: 8px;
  background: #fff;
  font-weight: 700;
  text-align: center;
}

.front-zone {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 24px;
  max-width: 960px;
  margin: 0 auto 34px;
}

.classroom-front {
  flex: 1;
  max-width: 620px;
  margin: 0;
  text-align: center;
}

.teacher-desk {
  flex: 0 0 auto;
  width: 120px;
  min-width: 120px;
  box-sizing: border-box;
  padding: 11px 12px;
  border: 2px solid #777;
  border-radius: 8px;
  background: #fff;
  font-weight: 700;
  text-align: center;
}

.student-zone {
  display: flex;
  align-items: center;
  gap: 24px;
}

.student-zone .desk-grid {
  flex: 1;
}

.teacher-desk {
  min-width: 110px;
  padding: 11px 16px;
  border: 2px solid #777;
  border-radius: 8px;
  background: #fff;
  font-weight: 700;
  text-align: center;
}


.back-teacher-zone {
  display: flex;
  margin-top: 34px;
}

.back-teacher-zone.left {
  justify-content: flex-start;
}

.back-teacher-zone.right {
  justify-content: flex-end;
}

@media (max-width: 800px) {
  .front-zone {
    grid-template-columns: 1fr;
  }

  .student-zone {
    flex-direction: column;
  }

  .teacher-desk.side {
    width: 100%;
    box-sizing: border-box;
  }
}

@media (max-width: 800px) {
  .classroom-layout {
    padding: 20px 14px;
  }

  .desk-grid {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .desk-seats {
    overflow-x: auto;
  }
}

@media (max-width: 700px) {
  .section-heading,
  .plan-card {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>