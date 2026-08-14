# Architecture and Product Decisions

## D001 --- School-scoped domain data

**Decision:** Store school-owned data under `schools/{schoolId}`.

**Reason:** Prevent ambiguous ownership and prepare the application for
users who can access more than one school.

## D002 --- Keep school and class context separate

**Decision:** `schoolId` identifies organization context; `classId`
identifies the selected class workflow.

**Reason:** A class selection must never replace or imply school
authorization.

## D003 --- Profile-based available schools

**Decision:** User profiles contain available school IDs and an active
school.

**Status:** Implemented for UI/application context.

**Caveat:** This is not the final server-side authorization model.

## D004 --- Dedicated no-school state

**Decision:** An authenticated user with no assigned school sees
`NoSchoolPage.vue`.

**Reason:** Rendering school managers with a null/invalid school ID
creates confusing failures and accidental assumptions.

## D005 --- Class-owned enrollments and seating plans

**Decision:** Enrollments and seating plans live inside Class Workspace
rather than as primary top-level workflows.

**Reason:** Both require a selected class to be meaningful.

## D006 --- Archive instead of destructive deletion

**Decision:** Preserve referenced records using active/archive state.

**Reason:** Historical enrollment and seating-plan data must remain
understandable.

## D007 --- Framework-independent seating engine

**Decision:** Keep the recommendation algorithm under
`src/engine/seating/` independent from Vue/Firebase.

**Reason:** Improves testability, reuse, and separation of concerns.

## D008 --- Lexicographic seating objectives

**Decision:** Prioritize repeated partners, then repeated desks, then
repeated exact seats.

**Reason:** Higher-priority fairness goals should not be traded away by
a weighted aggregate score.

## D009 --- Recommend, don't decide

**Decision:** Generated seating arrangements remain teacher
recommendations.

**Reason:** Classroom context contains human factors that the current
data model cannot fully represent.

## D010 --- Internationalization at the presentation layer

**Decision:** Engine/services return structured/domain information;
components translate it.

**Reason:** Prevent language concerns from contaminating domain logic.

## D011 --- Browser language with persisted override

**Decision:** Use saved language first, otherwise browser language,
otherwise English.

**Reason:** Gives sensible first-load behavior while respecting explicit
user choice.

## D012 --- Room owns teacher position

**Decision:** Store teacher position on the room.

Supported values:

``` text
front-left
front-right
back-left
back-right
```

**Reason:** Teacher-desk placement is a physical room property and
should be reused by room preview, seating-plan display, and export.

## D013 --- Classroom-style seating visualization

**Decision:** Display seats grouped by physical desks, with a
whiteboard/front-of-room reference.

**Reason:** A seating plan is spatial information; a generic card/list
layout is less useful to teachers.

## D014 --- Excel export as a separate service

**Decision:** Generate `.xlsx` seating plans in
`seatingPlanExportService.js`.

**Reason:** Keeps print/export concerns out of Firestore persistence and
the recommendation engine.

## D015 --- Responsive sidebar

**Decision:** Navigation can collapse and should adapt automatically on
smaller screens.

**Reason:** Preserve usable classroom/seating workspace width.

## D016 --- Retire legacy Classroom page

**Decision:** Do not continue expanding `ClassroomPage.vue`.

**Target:** Replace it with a Dashboard/Home page containing useful
summaries and, later, messages/activity.

**Reason:** Modern domain workflows have superseded the original page
architecture.

## D017 --- Controlled modernization

**Decision:** Avoid forced dependency upgrades during feature work.

**Reason:** Vue CLI and older dependency chains can produce breaking
changes. Modernization should occur on a dedicated branch with
regression testing.
