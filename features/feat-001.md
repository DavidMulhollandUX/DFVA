---
id: feat-001
name: Auth on Assess
status: draft
created: 2026-06-11
project: DFVA
---

# Feature: Auth on Assess

## Description
Ensure only authenticated users can access the `/assess` route and submit program URLs for analysis. Currently the AssessorPage has `authRequired: true` on the Wasp page declaration and the `assessProgram` action has a 401 guard, but `getAssessmentJobs` and `getAssessmentJob` are unauthenticated and return all jobs globally. This spec covers hardening all operations and verifying the full auth surface.

## Vibe
Secure, invisible — authentication that protects resources without adding friction for legitimate users. Auth failures should redirect cleanly to `/login` with a path back to `/assess` after login.

## User Stories
- As an **unauthenticated visitor**, I should be redirected to `/login` when I visit `/assess` so that I cannot access the assessment tool without an account.
- As an **authenticated user**, I should be able to submit handbook URLs and see only my own assessment jobs so that my assessment history stays private.
- As an **authenticated user**, I should not see other users' assessment jobs in my job list.
- As a **user on `/login`**, I should be redirected back to `/assess` after successful authentication so that my workflow is uninterrupted.

## Technical Design

### Architecture
Wasp provides `authRequired: true` on page declarations, which triggers a redirect to `onAuthFailedRedirectTo` (configured as `/login` in `main.wasp`) when an unauthenticated user hits the route. On the server side, each operation used by the AssessorPage must independently verify `context.user` and scope queries to the authenticated user.

```
Browser → GET /assess → Wasp auth check → /login (if no session)
                                          → AssessorPage (if authenticated)
AssessorPage → useAction(assessProgram) → 401 if !context.user
AssessorPage → useQuery(getAssessmentJobs) → [TBD: scoped to userId]
```

### Current State (as of 2026-06-11)

| Component | Auth Status | Details |
|-----------|-------------|---------|
| `AssessorPage` (Wasp declaration) | ✅ `authRequired: true` | Line 307 of `main.wasp` |
| `assessProgram` (action) | ✅ 401 guard | Line 23 of `operations.ts`: `if (!context.user) throw new HttpError(401, 'Authentication required')` |
| `getAssessmentJobs` (query) | ❌ No auth | Line 70-78: Returns all jobs, no user filter, no 401 guard |
| `getAssessmentJob` (query) | ❌ No auth | Line 83-90: Returns any job by ID, no ownership check |

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Auth model | Wasp built-in `authRequired` + server-side 401 guards | Wasp handles redirects; 401 guards protect against direct API calls and server-side bypass |
| Job scoping | `getAssessmentJobs` filtered by `userId: context.user.id` | Simple, performant, no extra database columns needed |
| Job ownership check | `getAssessmentJob` returns 404 if job belongs to another user | Prevents ID enumeration; 404 leaks less info than 403 |
| Login redirect back | Standard Wasp behavior — `onAuthSucceededRedirectTo: "/assess"` already set | No code changes needed for this path |
| Dummy auth in dev | No redirect with Dummy provider (known Wasp limitation) | E2e tests must account for this — page loads without auth in dev mode. Operations still return 401. |

### Dependencies
- **Wasp 0.22** built-in auth (`authRequired`, `onAuthFailedRedirectTo`) — already configured
- None external — no third-party auth services needed

## Scope

### In Scope (MVP)
- [ ] Add `context.user` 401 guard to `getAssessmentJobs` in `operations.ts`
- [ ] Add `context.user` 401 guard + ownership check to `getAssessmentJob` in `operations.ts`
- [ ] Filter `getAssessmentJobs` to return only the current user's jobs
- [ ] Verify `authRequired: true` redirects to `/login` in production provider (not Dummy)
- [ ] Handle error states in the AssessorPage UI when operations return 401

### Out of Scope (Future)
- Per-job access control (sharing assessment results with other users)
- Admin dashboard showing all jobs across users (exists as separate admin routes)
- Rate limiting on the assess endpoint
- Anonymous assessment with CAPTCHA

## Acceptance Criteria
- [ ] Unauthenticated `GET /assess` redirects to `/login` (verified with a non-Dummy auth provider)
- [ ] `assessProgram` returns 401 for unauthenticated requests (already done)
- [ ] `getAssessmentJobs` returns 401 for unauthenticated requests
- [ ] `getAssessmentJobs` only returns jobs where `userId === context.user.id`
- [ ] `getAssessmentJob` returns 401 for unauthenticated requests
- [ ] `getAssessmentJob` returns 404 (not 403) when the requested job belongs to another user
- [ ] Authenticated users can still submit URLs and see their job history
- [ ] Post-login redirect returns user to `/assess` (already configured)

## Open Questions
- [ ] Is there a `getAssessmentJob` consumer in the AssessorPage that might break if we change the return to 404 for unowned jobs? Check if any UI polls by job ID.
- [ ] Do we need a `getMyAssessmentJobs` query for admin users who also need access to all-jobs queries elsewhere? (Admin routes use separate operations — verify no conflict.)
- [ ] Should we add a `useQuery(getAssessmentJobs)` loading state that shows "Login required" instead of an empty list when the 401 hits?

## Implementation Tasks
1. Add `if (!context.user) throw new HttpError(401, 'Authentication required')` to `getAssessmentJobs` in `compass/app/src/compass/operations.ts`
2. Add `where: { userId: context.user.id }` to the `findMany` call in `getAssessmentJobs`
3. Add `if (!context.user) throw new HttpError(401, 'Authentication required')` to `getAssessmentJob`
4. In `getAssessmentJob`, after fetching the job, check `job.userId !== context.user.id` → throw 404
5. Test: run Vitest unit tests for operations
6. Test: verify the AssessorPage UI handles 401 from queries gracefully (empty state, not crash)
7. Commit with message: `feat: harden auth on assess — scope queries to current user`
