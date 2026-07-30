# TODO

## High Priority

- [x] Migrate students to `schools/school_japan/students`
- [x] Verify all legacy student IDs exist at the destination
- [x] Verify the application loads after student migration
- [x] Define rooms, courses, classes, enrollments, and seating plans
- [x] Revise the migration target for legacy seating plans
- [x] Define field-level schemas for buildings, rooms, courses, and classes
- [ ] Add the Building service and validation
- [ ] Create Building A1
- [ ] Add the Room service and validation
- [ ] Create the initial A1 rooms
- [ ] Add the Course service and validation
- [ ] Create the course associated with the historical class, if known
- [ ] Add the Class service and validation
- [ ] Create `legacy_class_2025` with truthful course and room references
- [ ] Create `scripts/migrateLegacySeatingPlans.js`
- [ ] Migrate six legacy seating-plan documents
- [ ] Verify historical seating layouts
- [ ] Verify saving a new seating plan
- [ ] Add a compatibility seating-plan service

## Medium Priority

- [ ] Add building, room, course, and class management UI
- [ ] Add enrollments
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
- [ ] Add Room service
- [ ] Add Course service
- [ ] Add Class service

## Room management

- [x] Add school-scoped room service
- [x] Add Room Management page
- [x] Validate room floors against building floor count
- [ ] Create Building A1 room records
- [ ] Add courses after room verification

- [x] Implement Course service and Course Management UI.
- [ ] Implement Classes that connect courses, rooms, and students.
