# TODO

## High Priority

- [x] Migrate students to `schools/school_japan/students`
- [x] Verify all legacy student IDs exist at the destination
- [x] Verify the application loads after student migration
- [x] Define rooms, courses, classes, enrollments, and seating plans
- [x] Revise the migration target for legacy seating plans
- [x] Define field-level schemas for buildings, rooms, courses, and classes
- [x] Add the Building service and validation
- [ ] Create Building A1
- [x] Add the Room service and validation
- [ ] Create the initial A1 rooms
- [x] Add the Course service and validation
- [ ] Create the course associated with the historical class, if known
- [x] Add the Class service and validation
- [x] Cancel `legacy_class_2025`; legacy data was disposable sandbox data
- [x] Cancel legacy seating-plan migration script
- [x] Skip migration of six sandbox seating-plan documents
- [x] Historical sandbox layouts are not required
- [ ] Verify saving a new seating plan
- [x] Compatibility service is unnecessary for disposable sandbox data


## Student management

- [x] Add school-scoped Student service
- [x] Add Student Management CRUD page
- [x] Preserve immutable numeric student IDs
- [x] Add real-time updates and search
- [x] Archive students instead of deleting them
- [ ] Verify creating, editing, archiving, and reactivating students in Firebase

## Medium Priority

- [x] Add building, room, and course management UI
- [x] Add class management UI
- [x] Add enrollments
- [ ] Use seating history when generating new assignments
- [ ] Add multi-school selector
- [ ] Improve permissions

## Cleanup

- [ ] Remove remaining `artifacts` references
- [ ] Delete legacy collections after full verification
- [ ] Remove migration-only compatibility code

## Low Priority

- [ ] Dark mode
- [ ] Statistics
- [ ] Reports
- [ ] Export seating charts

## Domain foundation implementation

- [x] Add Building service
- [x] Add Building management UI
- [ ] Create the first building document (`A1`)
- [x] Add Room service
- [x] Add Course service
- [x] Add Class service

## Room management

- [x] Add school-scoped room service
- [x] Add Room Management page
- [x] Validate room floors against building floor count
- [ ] Create Building A1 room records
- [ ] Add courses after room verification

- [x] Implement Course service and Course Management UI.
- [x] Implement Classes that connect courses and rooms.
- [x] Implement class-scoped student enrollments.

## Class Management
- [x] Add `classService.js` with real-time CRUD operations.
- [x] Add Class Management UI.
- [x] Connect classes to courses and physical rooms.
- [x] Validate academic year and semester.
- [ ] Add student enrollments under each class.
- [x] Decide not to migrate disposable sandbox seating data.

## Enrollment Management
- [x] Add class-scoped enrollment service.
- [x] Add class selection and enrolled-student view.
- [x] Add active student search and enrollment action.
- [x] Archive and reactivate enrollments without deleting history.
- [ ] Add optional enrollment dates/status reasons if future requirements need them.

## Seating Plan Management
- [x] Add class-scoped seating-plan service.
- [x] Add manual seating-plan creation and editing.
- [x] Use class enrollments and the assigned room capacity.
- [x] Archive plans instead of deleting them.
- [ ] Verify create, edit, archive, and archived-plan display in Firebase.

## Next
- [ ] Build random seating generation.
- [ ] Use seating history to reduce repeated desk partners.
- [ ] Add visual classroom layout and export support.
