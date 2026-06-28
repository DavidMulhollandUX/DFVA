# Dependabot Security Triage — DFVA

**Prepared by:** David Mulholland + Claude
**Date:** 2026-06-06
**Repository:** DavidMulhollandUX/DFVA
**Snapshot:** 80 alerts (79 open · 1 auto-dismissed) at `origin/main` commit `e15b87a`
**Source:** GitHub Dependabot Alerts API — `gh api --paginate /repos/DavidMulhollandUX/DFVA/dependabot/alerts`

---

## Executive summary

The raw count looks alarming — **79 open alerts (1 critical, 23 high, 44 medium, 11 low)** — but triage reframes the real exposure as **low and cheaply fixable**:

- **72 of 79 (91%) live in `compass/blog`** — the Astro static marketing blog, not the product. They are overwhelmingly Astro's **transitive build-time tooling** (ReDoS, path traversal in build tools, dev-server issues), which a statically generated site does not expose to end users at runtime.
- **The product app (`compass/app`) has only 4 alerts, all medium**, and all are minor-version patchable.
- **Every one of the 79 has a patched version available** — none are blocked on an upstream fix.
- The lone **critical** (`fast-xml-parser`) is a transitive dependency *in the blog*, not the app.
- One high (`semver` ReDoS) was already **auto-dismissed** by Dependabot as unreachable.

**Bottom line:** patch the 4 product-app alerts first (small, high-value), then the 3 static-site alerts, then clear the blog in bulk by bumping Astro. The "critical/high" headline is dominated by build-time tooling in a non-product blog.

---

## Counts

| Severity | Open |
|---|---|
| Critical | 1 |
| High | 23 |
| Medium | 44 |
| Low | 11 |
| **Total open** | **79** |

| Location | Open alerts | Nature |
|---|---|---|
| `compass/blog` | **72** (incl. the 1 critical + most highs) | Astro static blog + its dependency tree — mostly transitive build tooling |
| `compass/app` | **4** (all medium) | The product (Wasp server app) — runtime deps |
| `compass-static` | **3** (all medium) | Static site |

Scope: 77 runtime / 2 development. **Patched version available: 79 / 79.**

---

## Priority tiers

### 🔴 P0 — `compass/app` (the live product). 4 × medium, runtime/network-facing.
These matter most because this is the actual server users hit.

| Package | Current range | Fixed in | Issue |
|---|---|---|---|
| `ws` | ≥8.0.0, <8.20.1 | 8.20.1 | Uninitialized memory disclosure |
| `qs` | ≥6.11.1, ≤6.15.1 | 6.15.2 | Remotely triggerable DoS in `qs.stringify` |
| `protobufjs` | ≤7.5.7 | 7.5.8 | DoS via unbounded recursive JSON descriptor expansion |
| `uuid` | <11.1.1 | 11.1.1 | Missing buffer bounds check in v3/v5/v6 |

**Action:** `npm audit fix` in `compass/app` → **re-run the Wasp build/tests**. Do not blindly bulk-upgrade — `compass/app` is Wasp-managed; respect Wasp's dependency constraints.

### 🟠 P1 — `compass-static`. 3 × medium.
| Package | Fixed in | Issue | Real risk |
|---|---|---|---|
| `react-router` | 6.30.4 | Open redirect via protocol-relative `//` path | **Runtime** — the one to fix |
| `vite` | 6.4.2 | Path traversal in optimized-deps `.map` handling | Dev-server only |
| `esbuild` | 0.25.0 | Dev server accepts any site's requests | Dev-server only |

**Action:** `npm audit fix` in `compass-static`. Only `react-router` is a production concern; `vite`/`esbuild` are not exploitable in built output.

### 🟡 P2 — `compass/blog`. 72 alerts (incl. the lone critical).
Almost entirely Astro's transitive build/tooling tree. Real exposure for a *statically generated* blog is low, but all are cheaply cleared.

Top contributors: `astro` ×13, `vite` ×11, `devalue` ×6, `fast-xml-parser` ×6 (incl. the **critical**), `tar-fs` ×6, `picomatch` ×4, `lodash` ×3, `minimatch` ×3, plus singletons (`rollup`, `glob`, `cross-spawn`, `postcss`, `prismjs`, …).

**Action:** `npm update astro` (→ ≥5.15.8) + `npm audit fix` in `compass/blog`, then **rebuild the blog** to confirm. This single bump clears the bulk, including the critical.

---

## Detail

### Critical (1)
- **`fast-xml-parser`** — `GHSA-m7jm-9gc2-mpf2` / `CVE-2026-25896` — entity-encoding bypass via regex injection in DOCTYPE entity names. Range `≥4.1.3, <4.5.4` → **fixed 4.5.4**. Location: `compass/blog` (transitive).

### High (23), rolled up by package
| Count | Package | Fixed in | Issue |
|---|---|---|---|
| 6 | `tar-fs` | 2.1.4 | Symlink validation bypass with predictable destination dir |
| 3 | `minimatch` | 9.0.7 | ReDoS — combinatorial backtracking via non-adjacent GLOBSTAR |
| 2 | `astro` | 5.15.8 | Reflected XSS via server islands feature |
| 2 | `devalue` | 5.6.2 | DoS — memory/CPU exhaustion in `devalue.parse` |
| 2 | `fast-uri` | 3.1.2 | Host confusion via percent-encoded authority delimiters |
| 2 | `fast-xml-parser` | 4.5.5 | Numeric entity expansion bypass (incomplete fix for CVE-2026-26278) |
| 2 | `picomatch` | 2.3.2 | ReDoS via extglob quantifiers |
| 1 | `cross-spawn` | 7.0.5 | ReDoS |
| 1 | `glob` | 10.5.0 | Command injection via `-c/--cmd` (shell:true) |
| 1 | `lodash` | 4.18.0 | Code injection via `_.template` import key names |
| 1 | `rollup` | 4.59.0 | Arbitrary file write via path traversal |

All in `compass/blog` (transitive build tooling), except where noted; none in `compass/app`.

### Auto-dismissed (1)
- **`semver`** (high) — ReDoS. Dependabot auto-dismissed as unreachable; no action needed.

---

## Remediation plan

1. **`compass/app` (P0)** — `npm audit fix`; re-run the Wasp build + any tests. Verify the 4 alerts clear.
2. **`compass-static` (P1)** — `npm audit fix`; confirm `react-router` is at ≥6.30.4.
3. **`compass/blog` (P2)** — `npm update astro` + `npm audit fix`; rebuild the blog; spot-check output. Clears the bulk incl. the critical.
4. **Confirm** — re-run the alerts query and verify the open count drops to ~0:
   ```
   gh api --paginate /repos/DavidMulhollandUX/DFVA/dependabot/alerts \
     | jq '[.[]|select(.state=="open")] | length'
   ```

**Caveat:** `compass/app` is a Wasp project — Wasp pins/generates parts of the dependency tree (`.wasp/`). Prefer targeted upgrades + a clean Wasp build over a blanket `npm audit fix --force`, and commit the updated `package-lock.json` only after the build passes.

---

## How this snapshot was produced

```
gh api --paginate -H "Accept: application/vnd.github+json" \
  /repos/DavidMulhollandUX/DFVA/dependabot/alerts > alerts.json
# severity:   jq '[.[]|select(.state=="open")]|group_by(.security_advisory.severity)|map({severity:.[0].security_advisory.severity,count:length})'
# by manifest: jq '[.[]|select(.state=="open")]|group_by(.dependency.manifest_path)|map({path:.[0].dependency.manifest_path,count:length})'
```

*Re-review after each remediation pass, and at the next dependency refresh.*
