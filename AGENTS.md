# OnePress — Agent Guide

OnePress is a Bootstrap-4–based, one-page WordPress theme by FameThemes, derived from Underscores. It targets PHP ≥ 7.4 and WP ≤ 6.9, text domain `onepress`. The front page is composed of independently toggleable **sections** wired through the Customizer; the rest of the site uses a conventional `_s`-style template hierarchy. WooCommerce is first-class.

## ⚠️ Production theme — 60,000+ active installs

OnePress is published on WordPress.org with **60,000+ active installations**. **Every code change must be evaluated against the installed base.** A "small cleanup" that renames a theme mod, drops a default value, changes default CSS, or removes a hook can silently break tens of thousands of live customer sites — there is no staged rollout and no recall mechanism.

**Default operating mode is additive-only and conservative:**

- **Additive-only.** Do not delete, rename, or repurpose any existing PHP function, class, method, template file, section, hook, theme mod, option, post meta, image size, or CSS class shipped in any prior release. Add new code alongside old code. The old code path must keep working with its original behavior — forever, or at minimum until an explicit major-version removal that ships a migration. See [spec-conventions.md → Additive-only mandate](docs/spec-conventions.md#additive-only-mandate).
- **New supersedes old via delegation, not replacement.** When you introduce an improved version of a helper, the old helper stays and either (a) calls the new one with the legacy arguments, or (b) is left untouched and the new helper is what new callers use. Either way: **the old symbol still resolves and still does what it always did.**
- **Do not change defaults** that affect visual output without a back-compat shim that preserves the old behavior on existing sites (use a version-gated migration if you must).
- **Every PR/commit message must state the BC impact** in one line: `BC: none — additive helper`, `BC: none — internal refactor, all old symbols preserved`, `BC: deprecation — old key still read indefinitely`, etc.

The full BC contract and deprecation patterns are in [spec-conventions.md → Backward Compatibility](docs/spec-conventions.md#backward-compatibility). Read it before any non-trivial change.

---

This file is an **index**. Detailed specs live under [docs/](docs/) — open the one matching your task.

> Site-level rules (WP Studio CLI, SQLite, do-not-edit-core, etc.) live in [/CLAUDE.md](../../../CLAUDE.md) and [/STUDIO.md](../../../STUDIO.md). The specs below only cover the theme.

## Spec index

| Spec | Read when you need to … |
|---|---|
| [spec-architecture.md](docs/spec-architecture.md) | Find where any concern lives — file map with deep links |
| [spec-build.md](docs/spec-build.md) | Understand `npm` scripts, webpack entries, RTL, asset enqueuing, line-ending normalizer plugin |
| [spec-sections.md](docs/spec-sections.md) | Add/modify a front-page section, understand activation state, render flow, dots-nav |
| [spec-customizer.md](docs/spec-customizer.md) | Add a Customizer setting, pick the right custom control or sanitizer, wire selective refresh, register sidebars, theme supports, image sizes |
| [spec-hooks.md](docs/spec-hooks.md) | Look up an action/filter, use loop props, copy a hook recipe |
| [spec-admin.md](docs/spec-admin.md) | Touch the page meta box, the theme dashboard, recommended actions, or block-editor styles |
| [spec-naming.md](docs/spec-naming.md) | Pick the right name for a function, class, theme mod, hook, CSS class, image size, etc. — also lists known frozen inconsistencies |
| [spec-conventions.md](docs/spec-conventions.md) | Check sanitize/escape rules, i18n, RTL, WC gating, Plus detection, public API stability, additive-only mandate |
| [spec-line-endings.md](docs/spec-line-endings.md) | Audit / fix CRLF — LF-only policy and playbook |
| [spec-commits.md](docs/spec-commits.md) | Commit rules — anatomy, scopes, BC footer, release checklist |

## First-time orientation (60 seconds)

1. Read this file + [spec-architecture.md](docs/spec-architecture.md).
2. Before naming **anything new** (function, class, hook, theme mod, CSS class, …): [spec-naming.md](docs/spec-naming.md).
3. If working on the front page: [spec-sections.md](docs/spec-sections.md).
4. If adding settings: [spec-customizer.md](docs/spec-customizer.md).
5. If editing JS/CSS: [spec-build.md](docs/spec-build.md) — never edit `assets/` directly.
6. Before committing: [spec-line-endings.md](docs/spec-line-endings.md) + [spec-commits.md](docs/spec-commits.md).

## Hard rules (must-know, always)

- **Treat every change as touching 60,000+ live sites.** See banner above and [spec-conventions.md → Backward Compatibility](docs/spec-conventions.md#backward-compatibility).
- **Additive-only: never delete or remove** an existing public PHP function, class, method, template, hook, theme mod, option, post meta, image size, or CSS class. Add new code; leave old code in place as a working fallback. See [spec-conventions.md → Additive-only mandate](docs/spec-conventions.md#additive-only-mandate).
- **Never rename** any of the above — rename = remove + add, which violates the additive rule.
- **Never change a default value** that alters rendered output without a back-compat shim or version-gated upgrade.
- **Never edit `wp-includes/` or `wp-admin/`** — see [/STUDIO.md](../../../STUDIO.md).
- **Never edit `assets/`** — it's build output. Edit `src/` and rebuild. See [spec-build.md](docs/spec-build.md).
- **Never edit `node_modules/`** — CRLF is normalized at bundle time. See [spec-line-endings.md](docs/spec-line-endings.md).
- **Never use `sed -i`** for normalization — use `perl -i -pe`. See [spec-line-endings.md](docs/spec-line-endings.md).
- **Never `git add -A`** — stage files by name. See [spec-commits.md](docs/spec-commits.md).
- **Never bypass nonces** on admin POST handlers. See [spec-admin.md](docs/spec-admin.md).
