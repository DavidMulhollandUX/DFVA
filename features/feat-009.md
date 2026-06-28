---
id: feat-009
name: API Maturity as Competitive Differentiator — Developer Experience Layer
status: draft
created: 2026-06-29
project: DFVA
priority: medium
score: 7
type: competitor_weakness
source: research-loop forums
---

# Feature: API Maturity as Competitive Differentiator

## Description

Coursedog's API is a documented disaster: inaccurate endpoint docs (wrong field names), a dual-ID system that confuses developers, undocumented required parameters (`doIntegration=true`), and non-standard response formats that force developers to reverse-engineer from browser network tabs. This is not an isolated failure — it's a structural weakness across the curriculum management market, where vendors treat APIs as internal plumbing rather than a product surface. DFVA can ship a clean, well-documented, developer-first API experience that serves as a visible competitive differentiator. This feature builds the developer experience layer — portal, docs, playground, SDKs, status page, and competitive comparison — around the API endpoints scoped in feat-007 Phase 3.

## Vibe

Polished, trustworthy, developer-delighting — the API experience that makes a university architect think "these people get it" within 5 minutes of landing on the developer portal.

## User Stories

- As a **university IT architect evaluating DFVA against Coursedog**, I want to see a side-by-side API quality comparison (docs accuracy, response consistency, auth simplicity, SDK availability) so that DFVA's technical maturity is self-evident before I write a single line of code.
- As a **developer integrating DFVA into our university's analytics pipeline**, I want an interactive API playground where I can test endpoints with my API key, see live responses, and copy working code snippets (curl, TypeScript, Python) so that my first API call succeeds in under 2 minutes.
- As a **DFVA product manager**, I want a public API status page showing endpoint health, uptime, and incident history so that institutional customers trust DFVA as production-grade infrastructure.
- As a **developer maintaining an integration with DFVA**, I want an API changelog with deprecation notices, migration guides, and 90-day sunset windows so that I'm never surprised by breaking changes.
- As a **university procurement officer**, I want to download a clean OpenAPI 3.1 spec that accurately describes every endpoint, parameter, and response schema so that our security review team can audit the API surface without access to the application.

## Technical Design

### Architecture

The API maturity layer sits atop the REST API endpoints (feat-007 Phase 3) and the MCP server (existing). It adds four new surface areas: Developer Portal, API Playground, Status Dashboard, and Competitive Comparison Page.

```
┌──────────────────────────────────────────────────────────────┐
│                COURSEDOG API (REALITY)                        │
│  • Docs say `password` field → actual field is `password1`    │
│  • Dual-ID: `id` + `uuid` — neither alone identifies a record │
│  • Missing required param `doIntegration=true` (undocumented) │
│  • Non-standard response wrapping: `{data: {data: {}}}`       │
│  • Developers must open Chrome DevTools to use the API        │
│  → TRUST COST: every integration starts with reverse-eng.     │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                   DFVA API MATURITY LAYER                     │
│                                                              │
│  ┌──────────────────────┐   ┌─────────────────────────────┐  │
│  │   Developer Portal   │   │     API Playground           │  │
│  │   /developers        │   │     /developers/playground   │  │
│  │   • Quickstart guide │   │     • Interactive endpoint   │  │
│  │   • API key mgmt     │   │       tester                 │  │
│  │   • SDK downloads    │   │     • Live request/response  │  │
│  │   • Code snippets    │   │     • Code generation        │  │
│  │   • Changelog        │   │       (curl, TS, Python)     │  │
│  └──────────────────────┘   └─────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────┐   ┌─────────────────────────────┐  │
│  │   Status Dashboard   │   │   Competitive Comparison     │  │
│  │   /developers/status │   │   /developers/compare        │  │
│  │   • Endpoint health  │   │   • Side-by-side API quality │  │
│  │   • Uptime %         │   │     DFVA vs Coursedog vs    │  │
│  │   • Incident history │   │     CourseLoop vs Modern     │  │
│  │   • Latency graphs   │   │   • Cited evidence           │  │
│  └──────────────────────┘   └─────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────────┐│
│  │              SDK Generation Pipeline                     ││
│  │  OpenAPI 3.1 spec → openapi-generator → TS SDK, Py SDK  ││
│  │              → npm publish, pip publish                  ││
│  └──────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────┘
```

### Current State

| Component | Status | Details |
|-----------|--------|---------|
| MCP server (`compass/mcp/`) | ✅ Built | 6 tools for agent consumers. No human-facing API. No auth. Local-only. |
| `ApiKey` Prisma model | ✅ Defined | `schema.prisma` lines 198-213. `keyHash`, `keyPrefix`, `isActive`, `lastUsedAt`. Designed for cross-institutional access. |
| REST API endpoints | ❌ Not built | Scoped in feat-007 Phase 3. 4 endpoints planned (`/api/v1/programs`, `/:code`, `/:code/syllabus`, `/compare`). |
| OpenAPI spec | ❌ Not written | feat-007 Phase 3 scopes `docs/dfva-api.yaml`. Not yet created. |
| API key middleware | ❌ Not built | No `Authorization: Bearer` validation middleware for Wasp `api` routes. |
| Rate limiting | ❌ Not built | No request throttling. Feat-007 Phase 3 scopes 100 req/min per key. |
| Developer portal page | ❌ Not built | No `/developers` route. No quickstart guide, no API docs page. |
| API playground | ❌ Not built | No interactive endpoint tester. |
| Status dashboard | ❌ Not built | No endpoint health monitoring, no public status page. |
| SDK generation | ❌ Not built | No TypeScript SDK, no Python SDK. No OpenAPI-generator pipeline. |
| API changelog | ❌ Not built | No versioned changelog, no deprecation policy. |
| Competitive API comparison | ❌ Not built | No page comparing DFVA's API quality to competitors. The competitive intel in feat-007 (`competitiveData.ts`) covers data architecture, not API DX. |
| `competitiveData.ts` (feat-007) | ❌ Not built | Scoped in feat-007 Phase 1. Covers data model comparison, not API quality. |
| Wasp `api` declarations | ⚠️ Partially available | `main.wasp` supports `api` declarations (e.g., `paymentsWebhook` on line 210). Pattern is established. No DFVA API routes declared yet. |
| `Institution` / `InstitutionalAssessment` models | ✅ Defined | `schema.prisma` lines 144-176. Ready for multi-tenant API key usage. |
| `AssessmentSnapshot` model | ✅ Defined | `schema.prisma` lines 178-196. Versioned assessment data — API can expose snapshot history. |

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Developer portal tech | New Wasp page at `/developers` (React + Tailwind), not a separate static site | Keeps auth, API key management, and session state in the same app. The portal is not a marketing microsite — it's a functional tool for API consumers. Static docs (OpenAPI spec, SDK reference) are served as static assets from the same domain. |
| API playground implementation | Client-side fetch with CORS + API key input (not server-side proxy) | Keeps latency honest (the playground shows real API response times). CORS headers on the API endpoints enable this. No additional server cost. |
| Status dashboard data source | New `ApiHealthCheck` Prisma model + cron job (not external service like Statuspage) | Self-contained, free, and dogfoods DFVA's own infrastructure. A cron job pings each API endpoint every 5 minutes and records response time, status code, and body validation result. |
| SDK generation pipeline | OpenAPI Generator (`openapi-generator-cli`) via GitHub Actions, published to npm/PyPI | Industry standard. Generates typed clients from the OpenAPI spec. TypeScript SDK published as `@unimelb/dfva-sdk`, Python as `dfva-sdk`. Manual trigger for now; automate on spec changes post-MVP. |
| Competitive comparison data | New `apiCompetitiveData.ts` static config (separate from feat-007's `competitiveData.ts`) | API quality data is a different domain from data architecture comparison. Separate file keeps each focused. Both can share a `CompetitorData` base interface if needed. |
| API changelog format | `CHANGELOG.md` in repo root + rendered at `/developers/changelog` (keepachangelog.com format) | Standard format recognized by developers. Served as static markdown rendered through the app. No database needed for changelog entries. |
| API versioning strategy | URL path versioning (`/api/v1/`) with 90-day deprecation windows | Already decided in feat-007. This feature enforces the policy with changelog entries and sunset headers. |
| Auth for developer portal pages | `authRequired: false` for docs/playground/compare/status (public). `authRequired: true` for API key management. | The portal itself is public (competitive positioning). API key management requires login. The playground accepts API keys via header, not session — so it works for anonymous trial users who paste a key. |
| Rate limiting implementation | In-memory token bucket (per API key) with Redis optional for multi-instance | Simple for MVP. Token bucket with 100 tokens/minute, refill 1 token/0.6s. If DFVA scales to multiple server instances, swap to Redis-backed bucket. The `ApiKey` model's `lastUsedAt` is updated on each authenticated request regardless. |

### Dependencies

- **feat-007 Phase 3** — REST API endpoints (`/api/v1/programs`, etc.) must exist before the playground, SDK, and status dashboard can reference them. The developer portal can be built independently (docs, quickstart, comparison page don't need live endpoints).
- **OpenAPI Generator CLI** (`@openapitools/openapi-generator-cli`) — for SDK generation. Docker-based or npm install. Used in CI, not at runtime.
- **`@swagger-api/swagger-ui`** or **Scalar** — for rendering the OpenAPI spec as interactive docs. Scalar is lighter (~50KB) and more modern than Swagger UI (~1MB). Decision: Scalar for the API reference page.
- **`react-syntax-highlighter`** — for code snippet rendering in the playground and quickstart. Already commonly used in React projects.
- **No new external services** — the status dashboard is self-hosted, the playground is client-side, the comparison page is static data. This feature is entirely self-contained.
- **`ApiKey` model** (existing) — used for playground auth and SDK key management.
- **`Logs` model** (existing) — used for rate limit hit logging and API error tracking.

## Scope

### In Scope (MVP — Phase 1: Developer Portal Foundation)

- [ ] Create `/developers` route and landing page with: quickstart guide (5-minute integration), API key management UI, code snippet library (curl, TypeScript, Python)
- [ ] Build API key self-service: generate, name, revoke keys from the developer portal (uses existing `ApiKey` Prisma model)
- [ ] Create `/developers/reference` page rendering the OpenAPI 3.1 spec with Scalar interactive docs
- [ ] Write `docs/dfva-api.yaml` — complete OpenAPI 3.1 spec for all 4 endpoints (if feat-007 spec exists; otherwise document the planned endpoints with `x-not-yet-implemented` extensions)
- [ ] Build `/developers/compare` — competitive API quality comparison page with cited evidence for Coursedog, CourseLoop, Modern Campus
- [ ] Create `apiCompetitiveData.ts` — static config with API quality metrics for each competitor (docs accuracy, auth complexity, response consistency, SDK availability, parameter documentation)
- [ ] Write unit tests for API key generation/hashing/validation middleware
- [ ] Add `/developers` link to landing page footer and main navigation

### In Scope (MVP — Phase 2: API Playground + SDK)

- [ ] Build `/developers/playground` — interactive API tester with: endpoint selector, parameter inputs, API key field, live request/response viewer, code snippet generator (curl, TS, Python)
- [ ] Generate TypeScript SDK (`@unimelb/dfva-sdk`) from OpenAPI spec using `openapi-generator-cli`
- [ ] Generate Python SDK (`dfva-sdk`) from OpenAPI spec
- [ ] Write SDK quickstart guides in the developer portal
- [ ] Add CORS headers to all API endpoints (for playground cross-origin requests)
- [ ] Write integration tests for playground → API endpoint flow

### In Scope (MVP — Phase 3: Status Dashboard + Changelog)

- [ ] Create `ApiHealthCheck` Prisma model (endpoint, statusCode, responseTimeMs, checkedAt, bodyValid)
- [ ] Build cron job (`apiHealthCheckJob`) that pings all API endpoints every 5 minutes and records results
- [ ] Build `/developers/status` — public status dashboard showing: endpoint health (green/yellow/red), 24h uptime %, 7-day latency graph, recent incidents
- [ ] Write `CHANGELOG.md` in keepachangelog.com format with initial v1.0.0 entry
- [ ] Build `/developers/changelog` — rendered changelog page with version filter
- [ ] Implement deprecation sunset headers (`Sunset`, `Deprecation`) on API responses when a version is being phased out
- [ ] Write unit tests for health check cron job logic

### In Scope (Phase 4: Polish + DX)

- [ ] Add "API Quality" badge to landing page (links to comparison page)
- [ ] Add API status badge to developer portal header (live indicator)
- [ ] Implement API error standardization: consistent JSON error format `{ error: { code, message, docs_url } }` across all endpoints
- [ ] Write `docs/api-quality-whitepaper.md` — a public document framing DFVA's API quality as a competitive advantage
- [ ] Add Postman Collection export to developer portal
- [ ] Write Playwright e2e tests for developer portal flows (key generation, playground test, status page load)

### Out of Scope (Future)

- GraphQL API (REST is the strategic choice — GraphQL adds complexity without clear curriculum-data use case)
- Webhook subscriptions for assessment completion events (valuable, but separate feature)
- Multi-instance rate limiting with Redis (in-memory token bucket for MVP)
- API monetization / usage-based billing (requires payment integration maturity)
- gRPC or streaming API endpoints (REST JSON is sufficient for curriculum data)
- Automated SDK publishing on spec change (manual trigger for now; CI automation post-MVP)
- Integration with external status page providers (Statuspage, Checkly) — self-hosted for MVP
- API analytics dashboard (request volume, popular endpoints, error rates per key) — valuable but separate feature
- Multi-language SDKs beyond TypeScript and Python (Java, Go, C# can follow if demand exists)
- OAuth2 / OIDC authentication for API (API keys are sufficient for machine-to-machine curriculum data access)
- Mock server from OpenAPI spec (Prism or similar) for integration testing without live endpoints

## Acceptance Criteria

- [ ] `/developers` page loads without auth and displays: quickstart guide, API key management section (auth-gated), and code snippet library
- [ ] User can generate a new API key with a name, see the key once (with copy button), and revoke keys from the portal
- [ ] API key middleware rejects requests with missing/invalid/revoked keys (401 with `{ error: { code: "UNAUTHORIZED", message: "...", docs_url: "/developers/reference#authentication" } }`)
- [ ] `/developers/reference` renders the full OpenAPI 3.1 spec as interactive docs with Scalar — all endpoints, parameters, and schemas visible
- [ ] `/developers/compare` shows at least 3 competitors (Coursedog, CourseLoop, Modern Campus) with cited evidence for each API quality claim
- [ ] `/developers/playground` lets a user select an endpoint, fill parameters, paste an API key, and see a live response with timing
- [ ] Playground generates correct curl, TypeScript, and Python code snippets for the executed request
- [ ] TypeScript SDK published to npm with typed methods for all 4 API endpoints
- [ ] Python SDK published to PyPI with typed methods for all 4 API endpoints
- [ ] `/developers/status` shows each endpoint's health (200 = green, 4xx/5xx = red, timeout = yellow) with 24h uptime percentage
- [ ] `apiHealthCheckJob` runs every 5 minutes and records response time + status code to `ApiHealthCheck` table
- [ ] `/developers/changelog` renders `CHANGELOG.md` entries with version badges (Added, Changed, Deprecated, Removed, Fixed, Security)
- [ ] Deprecated API endpoints include `Sunset` and `Deprecation` HTTP headers with dates
- [ ] All API error responses use the standardized `{ error: { code, message, docs_url } }` format
- [ ] "API Quality" badge on landing page links to `/developers/compare`
- [ ] Playwright e2e tests pass for: key generation → playground request → status page load → comparison page evidence links

## Open Questions

- [ ] **Should the developer portal be rebranded under `evidura.ai/developers` when the Evidura brand launches?** The portal is currently scoped as `/developers` on the COMPASS domain. Post-rebrand, it should move to `evidura.ai/developers` with a redirect. Decision: build at `/developers` for now; add a `config.api.baseUrl` that makes the rebrand a one-line change.
- [ ] **Should the API playground require a valid API key to function, or allow anonymous trial with mock data?** Anonymous trial lowers friction but risks the playground being used for scraping. Decision: require a valid API key (generated from the portal) for live requests. Add a "Try with sample data" button that returns mock responses for anonymous users — lets prospects evaluate the API shape without signup.
- [ ] **What's the SLA for the status dashboard?** "5-minute check interval, 24h uptime calculation" is scoped. Should we define a public SLA (e.g., "99.5% uptime")? Decision: no public SLA for MVP — the status dashboard shows actuals, not commitments. An SLA creates legal obligations that a university pilot project shouldn't take on yet.
- [ ] **Should SDK packages be scoped under `@unimelb` or `@evidura`?** `@unimelb/dfva-sdk` ties the SDK to the university brand, which may change if DFVA spins out. `@evidura/dfva-sdk` uses the product brand. Decision: use `dfva-sdk` (unscoped) for Python (PyPI convention) and `@unimelb/dfva-sdk` for TypeScript (npm scoped packages require org ownership). Revisit when Evidura brand is finalized.
- [ ] **How do we source competitive API quality evidence?** The Coursedog API failures are documented in GitHub issues and forum posts from the coursedog-importer project. For CourseLoop and Modern Campus, we need primary research (sign up for developer accounts, test their APIs). Decision: Coursedog evidence is solid (cited in feat-009 detail). For other competitors, start with what's available from research-loop output and mark unverified claims as "Reported by developers" with source links.
- [ ] **Should the API changelog be auto-generated from conventional commits or manually maintained?** Auto-generation from `feat:`, `fix:`, `BREAKING CHANGE:` commits is appealing but produces noisy changelogs. Decision: manually maintained `CHANGELOG.md` for public-facing entries. Internal commits can use conventional commits for internal tracking. The changelog is a curated product document, not a git log dump.
- [ ] **How do we handle the dependency on feat-007 Phase 3 (REST API endpoints)?** The developer portal, comparison page, and API key management can be built independently. The playground and SDK require live endpoints. Decision: Phase 1 (portal + comparison + keys) ships regardless of feat-007 status. Phase 2 (playground + SDK) gates on feat-007 Phase 3 completion. This keeps the competitive positioning value unlockable early.
- [ ] **What auth mechanism for the developer portal's API key management section?** The portal is public but key management requires login. Use the existing Wasp email auth. Any logged-in user can generate keys? Or admin-only? Decision: any logged-in user can generate keys for MVP. The keys are tied to the user's account. This aligns with the self-serve developer experience. Add admin-only key approval if abuse becomes a concern.

## Implementation Tasks

### Phase 1: Developer Portal Foundation (Week 1-2)

**1.1 — API key management backend**
1. Create `compass/app/src/compass/api/auth.ts` — API key middleware: validate `Authorization: Bearer <key>` against `ApiKey` table by hashing and comparing to `keyHash`
2. Implement `validateApiKey(key: string): Promise<{ valid: boolean; institutionId?: string; keyId?: string }>` — returns institution context for multi-tenant queries
3. Add Wasp `action generateApiKey` — creates a new `ApiKey` record, returns the raw key once (never stored — only `keyHash` persisted)
4. Add Wasp `action revokeApiKey` — sets `isActive: false` on the key
5. Add Wasp `query listApiKeys` — returns user's API keys (prefix only, not the secret)
6. Write unit tests for key generation (verify hash matches, raw key not stored), validation (valid, invalid, revoked), and rate limiting
7. Create `compass/app/src/compass/__tests__/apiAuth.test.ts`

**1.2 — Developer portal pages**
8. Add routes to `main.wasp`: `DevPortalRoute`, `DevPortalReferenceRoute`, `DevPortalCompareRoute`, `DevPortalPlaygroundRoute`, `DevPortalStatusRoute`, `DevPortalChangelogRoute`
9. Create `compass/app/src/compass/DevPortalPage.tsx` — landing page with quickstart guide, code snippet library, and auth-gated API key management section
10. Create `compass/app/src/compass/components/ApiKeyManager.tsx` — generate, name, list, revoke keys
11. Create `compass/app/src/compass/components/CodeSnippetLibrary.tsx` — tabbed code examples (curl, TypeScript, Python) for common operations (list programs, get assessment, compare programs)
12. Write unit tests for `ApiKeyManager` component (key generation flow, revocation confirmation)

**1.3 — API reference docs**
13. Write `docs/dfva-api.yaml` — OpenAPI 3.1 spec with all endpoints, parameters, request/response schemas, auth scheme, and error formats
14. Create `compass/app/src/compass/DevPortalReferencePage.tsx` — renders OpenAPI spec with Scalar (`@scalar/api-reference-react`)
15. Install `@scalar/api-reference-react`: `cd compass/app && npm install @scalar/api-reference-react`
16. Serve `docs/dfva-api.yaml` as a static asset from the Wasp app (copy to `compass/app/public/` or serve via Wasp `api` route)

**1.4 — Competitive API comparison**
17. Create `compass/app/src/compass/apiCompetitiveData.ts` — static config with `CompetitorApiData` type: `{ name, logoUrl?, endpoints: { documented, actual, accuracy }, authMechanism, responseFormat, sdkLanguages, hasPlayground, hasStatusPage, painPoints: string[], sourceUrls: string[] }`
18. Add Coursedog entry with 5 cited pain points from GitHub coursedog-importer project
19. Add CourseLoop entry (research to confirm — mark as "under investigation" if evidence is incomplete)
20. Add Modern Campus entry (zero API export confirmed from feat-008 research)
21. Create `compass/app/src/compass/DevPortalComparePage.tsx` — side-by-side comparison table with DFVA in the leftmost column (green highlights)
22. Create `compass/app/src/compass/components/ApiQualityMatrix.tsx` — visual matrix: rows = quality dimensions (docs, auth, consistency, SDKs, playground, status), columns = competitors, cells = ✅/⚠️/❌ with tooltip evidence
23. Add "View API Quality Comparison" CTA to landing page and developer portal header

**1.5 — Integration + commit**
24. Add `/developers` link to landing page footer and main nav
25. Write Playwright e2e test: visit `/developers`, verify quickstart renders, verify comparison page loads with 3+ competitors
26. Commit: `feat: add developer portal foundation — API key management, OpenAPI reference, competitive comparison`

### Phase 2: API Playground + SDK (Week 3-4)

**2.1 — API playground**
27. Create `compass/app/src/compass/DevPortalPlaygroundPage.tsx` — interactive API tester
28. Build endpoint selector dropdown (populated from OpenAPI spec paths)
29. Build parameter input form (dynamic fields based on selected endpoint's parameters)
30. Build API key input field with "Use my key" button (reads from logged-in user's keys)
31. Build request/response viewer: sent request (method, URL, headers, body), received response (status, headers, body, timing)
32. Build code snippet generator: after a successful request, show equivalent curl, TypeScript (using SDK), and Python (using SDK) code
33. Add "Try with sample data" button that returns mock responses for anonymous users
34. Write unit tests for playground request building and code generation logic

**2.2 — SDK generation**
35. Set up OpenAPI Generator in `compass/sdks/` directory with config files for TypeScript and Python
36. Generate TypeScript SDK: `openapi-generator-cli generate -i docs/dfva-api.yaml -g typescript-fetch -o compass/sdks/typescript/`
37. Generate Python SDK: `openapi-generator-cli generate -i docs/dfva-api.yaml -g python -o compass/sdks/python/`
38. Write SDK READMEs with installation and quickstart examples
39. Add SDK quickstart guides to developer portal (TypeScript tab, Python tab)
40. Commit generated SDKs to repo (they're source artifacts, not build artifacts — regenerated on spec change)
41. Write unit tests for SDK client wrapper (verify typed methods exist, request building correct)

**2.3 — CORS + integration**
42. Add CORS headers to all API endpoints (`Access-Control-Allow-Origin: *` for GET, restricted for POST)
43. Write integration test: playground → real API call → verify response matches direct API call
44. Commit: `feat: add API playground + TypeScript and Python SDKs`

### Phase 3: Status Dashboard + Changelog (Week 5-6)

**3.1 — Health check infrastructure**
45. Add `ApiHealthCheck` model to `schema.prisma`:
```
model ApiHealthCheck {
  id             String   @id @default(uuid())
  endpoint       String   // e.g. "/api/v1/programs"
  statusCode     Int      // HTTP status code
  responseTimeMs Int      // Response time in milliseconds
  bodyValid      Boolean  // Whether response body matches expected schema
  errorMessage   String?  // Error details if request failed
  checkedAt      DateTime @default(now())
  @@index([endpoint, checkedAt])
}
```
46. Run migration: `DATABASE_URL=… npx prisma migrate dev --name add_api_health_check`
47. Create `compass/app/src/compass/apiHealthCheck.ts` — function that pings all registered endpoints, validates response schema against OpenAPI spec, records to `ApiHealthCheck`
48. Add `apiHealthCheckJob` to `main.wasp` — Wasp job, runs every 5 minutes (`cron: "*/5 * * * *"`), calls `apiHealthCheck.ts`
49. Add endpoint registration config — list of endpoints to monitor (read from OpenAPI spec paths)
50. Write unit tests for health check logic (success case, 4xx case, timeout case, schema mismatch case)

**3.2 — Status dashboard page**
51. Create `compass/app/src/compass/DevPortalStatusPage.tsx` — public status dashboard
52. Build endpoint health grid: each endpoint as a row with current status (green/yellow/red dot), 24h uptime %, 7-day avg latency, last checked time
53. Build 7-day latency graph (simple bar chart using CSS or a lightweight chart library — avoid heavy deps)
54. Build recent incidents list (last 10 non-200 checks)
55. Add auto-refresh every 60 seconds
56. Add Wasp `query getApiHealthSummary` — returns current health, 24h uptime, recent incidents for all endpoints

**3.3 — Changelog**
57. Write `CHANGELOG.md` in repo root following keepachangelog.com format with `[1.0.0] - 2026-07-15` initial entry
58. Create `compass/app/src/compass/DevPortalChangelogPage.tsx` — renders `CHANGELOG.md` with version filter and category badges
59. Implement `Deprecation` and `Sunset` HTTP headers on API responses when a version is deprecated (config-driven — add `deprecatedOn` and `sunsetOn` fields to endpoint config)
60. Add deprecation notice component to developer portal header (banner when a version is in sunset window)
61. Write unit tests for changelog parsing and sunset header logic
62. Commit: `feat: add API status dashboard + changelog with deprecation policy`

### Phase 4: Polish + DX (Week 7)

**4.1 — Error standardization**
63. Create `compass/app/src/compass/api/errorFormatter.ts` — standardizes all API error responses to `{ error: { code: string, message: string, docs_url: string } }`
64. Apply to all 4 API endpoints — replace raw HTTP errors with standardized format
65. Add error code catalog to developer portal reference docs
66. Write unit tests for error formatter (all error types produce correct shape)

**4.2 — Landing page integration**
67. Add "API Quality" badge to landing page hero section (links to `/developers/compare`)
68. Add live API status indicator to developer portal header (green dot with "All Systems Operational" or yellow/red with issue count)
69. Add Postman Collection export link to developer portal (generate from OpenAPI spec using `openapi-to-postman`)
70. Write `docs/api-quality-whitepaper.md` — public document framing DFVA's API quality as competitive advantage

**4.3 — E2e tests**
71. Write Playwright e2e test: generate API key → use in playground → successful request → copy code snippet
72. Write Playwright e2e test: visit status page → verify endpoint health indicators render → click incident for details
73. Write Playwright e2e test: visit comparison page → verify all competitor rows have cited evidence links
74. Commit: `feat: polish API developer experience — standardized errors, landing badge, whitepaper`
