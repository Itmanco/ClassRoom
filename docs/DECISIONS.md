# Architecture Decisions

## 001 — Use active school from the session

The application uses `activeSchool`, not a hardcoded app ID.

## 002 — Store school data under `schools/{schoolId}`

This supports future multi-school administration.

## 003 — Preserve referenced IDs

Student IDs remain stable because seating data references them.

## 004 — Separate rooms, classes, and seating plans

Rooms are physical spaces. Classes are enrolled teaching groups. Seating plans belong to classes.

## 005 — Archive instead of deleting history

Historical relationships must remain valid.

## 006 — Isolate the Planning Engine

The engine is independent of Vue and Firebase.

## 007 — Use soft seating objectives

Historical avoidance preferences should not prevent generation.

## 008 — Compare objectives by priority

1. Repeated desk partners
2. Repeated desks
3. Repeated exact seats
4. Random tie-breaker

## 009 — Recommend three arrangements

The teacher makes the final decision.

## 010 — Keep voting separate

Student voting is a future workflow, not an engine objective.

## 011 — Introduce internationalization before further expansion

This prevents more hardcoded strings and supports a Japanese interview demo.

## 012 — Put language selection in Settings

Language is global but does not need permanent header space.

## 013 — Keep English as development language

Code and technical documentation remain English; the UI supports English and Japanese.

## 014 — Defer localized validation

Keep existing HTML validation during v0.8.0. Build reusable localized validation in v0.8.1.
