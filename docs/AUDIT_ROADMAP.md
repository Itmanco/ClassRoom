# Audit Roadmap

**Last reviewed:** 2026-09-06

## Core rule

Audit destination follows the **affected resource**, not the actor's privilege level.

```text
School-scoped resource/change → schools/{schoolId}/auditLogs/{logId}
System-only change           → systemAuditLogs/{logId}
```

For user profile/status changes, every current school membership is an affected school. A user with memberships in A/B/C produces one event in each school and no duplicate system event. A user with zero memberships produces one system event.

## Phase 1 — Audit Log foundation ✅

- [x] `student.created`
- [x] `student.updated`
- [x] `student.archived`
- [x] `student.reactivated`
- [x] changed fields
- [x] before → after values
- [x] friendly entity names
- [x] actor UID/email/role
- [x] expandable Activity Log UI

## Phase 2 — System vs School scope ✅

- [x] `schools/{schoolId}/auditLogs`
- [x] `systemAuditLogs`
- [x] System/School scope badges
- [x] All/System/School filters for System Admin
- [x] School Admin limited to authorized selected-school history
- [x] System Admin “All” = selected school + system, not every school

## Phase 3 — User administration audit ✅

- [x] `user.created`
- [x] `user.systemRoleChanged`
- [x] `user.updated`
- [x] `user.archived`
- [x] `user.reactivated`
- [x] before → after details
- [x] translated changed-field labels
- [x] server-side System Admin protection for system-role/account lifecycle operations
- [x] last active System Admin protection

### Current user-event distribution ✅

`user.updated`, `user.archived`, `user.reactivated`:

```text
Target memberships = A, B, C
→ A school audit event
→ B school audit event
→ C school audit event
→ no system duplicate
```

```text
Target memberships = none
→ one system audit event
```

This behavior has been emulator-tested for membership and zero-membership cases.

`user.created`:

- initial school supplied → one school event
- no initial school → one system event

## Phase 4 — School membership auditing ✅

- [x] `membership.created`
- [x] `membership.roleChanged`
- [x] `membership.deactivated`
- [x] `membership.reactivated`
- [x] `membership.removed`
- [x] friendly user name/email
- [x] membership change + audit write in the same client batch

Note: membership audit writes are currently allowed to authorized Admin clients. Moving privileged membership mutation/audit generation to trusted callable Functions remains a security-hardening goal.

## Phase 5 — School Admin Activity Log ✅

- [x] School Admin can open Admin module
- [x] School Admin sees school-scoped Users and Activity Log
- [x] System Admin additionally sees global Schools controls and System scope
- [x] Cross-school user discovery is backend-scoped
- [x] self-membership lockout protections

## Phase 6 — More domain audit coverage ⬜ NEXT COVERAGE

- [ ] `school.created`
- [ ] `school.updated`
- [ ] `school.archived`
- [ ] `school.reactivated`
- [ ] Course lifecycle events
- [ ] Building lifecycle events
- [ ] Room lifecycle events
- [ ] Class lifecycle events
- [ ] Additional high-value administrative changes

## Phase 7 — Server-side audit/security hardening ◐ IN PROGRESS

Already implemented:

- [x] trusted callable user create/profile/status/system-role operations
- [x] server-side System Admin / School Admin checks for those operations
- [x] system audit writes blocked from clients
- [x] audit history update/delete blocked

Remaining:

- [ ] move remaining privileged membership operations from browser → trusted callable Functions as appropriate
- [ ] enforce membership document identity and immutability
- [ ] harden school-domain Firestore rules against cross-school reads/writes
- [ ] reduce opportunities for authorized clients to forge school audit records

## Phase 8 — Security event logging ⬜ FUTURE

Only after normal authorization/audit integrity is hardened:

- meaningful denied privileged attempts
- cross-school attempts
- blocked last-admin operations
- repeated permission-denied behavior
- optional Security category/filter

Do not log routine validation noise as security events.

## Phase 9 — Audit operations/quality ⬜ FUTURE

- date range filtering
- actor/action/entity filtering
- entity search
- pagination
- larger history handling
- export/reporting
- retention strategy
