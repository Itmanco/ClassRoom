# Changelog

This changelog records major project milestones rather than every
individual commit.

## Unreleased --- August 2026 milestone

### Added

-   Multi-school application context
-   Available-school loading
-   School selector
-   Dedicated no-school state
-   Responsive/auto-collapsing navigation behavior
-   User profile improvements
-   Room teacher-position configuration
-   Room layout preview
-   Classroom-style seating-plan visualization
-   Physical desk grouping by seats-per-desk
-   Whiteboard/front-of-room representation
-   Teacher placement in seating-plan layout
-   Excel (`.xlsx`) seating-plan export
-   Print-oriented Excel layout and filename generation

### Changed

-   Browser language now initializes Japanese for Japanese browser
    locale and English otherwise, unless a saved locale exists.
-   School context and class context are reset more safely when
    navigation context changes.
-   Seating-plan presentation is more spatial and classroom-oriented.
-   Documentation has been rewritten to reflect the current
    architecture.

### Transitional

-   Legacy `ClassroomPage.vue` remains temporarily.
-   Dashboard/Home replacement is the next structural UI milestone.

## Previous milestone --- Class Workspace

### Added

-   `ClassWorkspace.vue`
-   Manage Class action
-   Overview tab
-   Embedded EnrollmentManager
-   Embedded SeatingPlanManager

### Changed

-   Enrollment and seating-plan workflows moved under selected class
    context.
-   Classes remain the navigation context while the workspace is open.

## Previous milestone --- Internationalization

-   Added Vue I18n
-   Added English/Japanese catalogs
-   Added language selector/settings
-   Localized modern management workflows
-   Added locale persistence

## Previous milestone --- Planning Engine v1

-   Added framework-independent seating engine
-   Added historical partner/desk/seat constraints
-   Added multiple candidate generation
-   Added structured violations and candidate selection

## Previous milestone --- School domain migration

-   Introduced school-scoped Firestore structure
-   Added buildings, rooms, courses, classes, enrollments, and seating
    plans
-   Migrated student data toward school ownership
