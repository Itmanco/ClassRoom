# CONTRIBUTING_AI.md

# Classroom Manager - AI Collaboration Guide

This document explains how ChatGPT should collaborate on this project.

The goal is to preserve consistency between conversations and avoid unnecessary rewrites.

---

# Project Philosophy

This is a real production-oriented project.

Priorities:

1. Stability
2. Readability
3. Small commits
4. Easy debugging
5. Incremental improvements

Never rewrite working code unless there is a strong reason.

---

# Development Style

Always prefer

✔ Small changes

instead of

✘ Large refactors

Every change should be easy to review.

---

# Explain Before Coding

For architectural changes:

1. Explain the idea.
2. Explain the impact.
3. Wait for approval.
4. Then implement.

Do not surprise the developer with massive changes.

---

# Preserve Existing Behavior

When introducing new features:

Prefer

Old Feature
↓

Compatibility Layer
↓

New Feature

instead of deleting old behavior immediately.

Migration happens only after verification.

---

# Firestore Rules

Current architecture

schools/{schoolId}

Old architecture

artifacts/{appId}

Until migration finishes:

Both may temporarily exist.

Never delete legacy support before confirming all data has been migrated.

---

# Authentication

Authentication flow

Firebase Auth

↓

User

↓

User Profile

↓

activeSchool

↓

Session

↓

Vue Components

↓

Services

↓

Firestore

No component should depend directly on Authentication.

Everything should use Session.

---

# Services

Service functions should only receive

schoolId

Never reintroduce appId.

Good

getStudents(schoolId)

Bad

getStudents(appId)

---

# Vue Style

Prefer

Composition API only if it clearly improves the code.

Otherwise keep the existing style.

Do not rewrite Options API components without reason.

---

# Coding Principles

Prefer

Simple code

over

Clever code

Prefer

Readable

over

Short

Avoid nested logic when possible.

---

# Debugging Strategy

When something breaks:

Step 1

Verify data exists.

Step 2

Verify service.

Step 3

Verify listener.

Step 4

Verify UI.

Never guess.

Use logs.

---

# Firestore Migration Strategy

Always migrate in this order.

1.
Students

2.
Domain-model documentation and field-level schemas

3.
Buildings and rooms

4.
Courses and classes

5.
Legacy class and historical seating plans

6.
Compatibility service

7.
Verification and enrollments

8.
Cleanup

Never skip steps.

---

# Git Strategy

Prefer commits like

Authentication

Session

Student Service

Firestore Rules

Migration

instead of one huge commit.

---

# Documentation

Whenever architecture changes:

Update

PROJECT_CONTEXT.md

FIRESTORE_SCHEMA.md

MIGRATION_PROGRESS.md

DECISIONS.md

before continuing.

Documentation is part of the project.

---

# Performance

Avoid suggesting unnecessary libraries.

Avoid introducing frameworks.

Keep dependencies minimal.

---

# Refactoring Rules

Allowed

✓ Rename variables

✓ Extract functions

✓ Remove duplication

✓ Improve readability

Avoid

✘ Rewriting everything

✘ New architecture without discussion

✘ Massive file reorganizations

---

# Error Handling

Always provide meaningful console messages.

Prefer

console.log("Loading students...")

instead of silent failures.

During migration:

Verbose logging is preferred.

After migration:

Reduce logging.

---

# Testing

For every important change provide

How to test

Expected result

Possible failure

This is more valuable than only providing code.

---

# Decision Log

Major architectural decisions belong in

DECISIONS.md

Do not hide important design decisions inside chat history.

---

# Communication Style

Assume the developer wants to understand.

Explain:

Why

before

How

Keep explanations concise.

Avoid unnecessary theory.

---

# Current Long-Term Goal

Transform Classroom Manager into a scalable multi-school platform while preserving compatibility with the original application.

---

# Current Migration Status

Current School

school_japan

Legacy App

classroom-b81c6

Current Task

Migrate the six legacy `classrooms` documents as historical seating plans under:

`schools/school_japan/classes/legacy_class_2025/seatingPlans`

Do not migrate those documents into the physical `rooms` collection.

---

# Important Rule

Every new ChatGPT conversation should begin by reading:

AI_CONTEXT.md

PROJECT_CONTEXT.md

MIGRATION_PROGRESS.md

FIRESTORE_SCHEMA.md

DECISIONS.md

CONTRIBUTING_AI.md

Only then should implementation begin.