# spec-commits — Commit Conventions

How to commit to this theme.

## Hard rules

- **English only** in commit messages and any new file content.
- **Stage files by name** (`git add <file> <file>`); never `git add -A` / `git add .`. This avoids sweeping in unrelated work-in-progress and accidentally created files (`.env`, large binaries, OS metadata).
- **No `Co-Authored-By:` trailer** on commits made for this project.
- **Never `--amend`** a published commit. Add a new commit instead.
- **Never `--no-verify`** to bypass hooks. If a hook fails, fix the underlying issue.

## Commit anatomy

Follow [Conventional Commits](https://www.conventionalcommits.org/) with an explicit OnePress scope:

```
<type>(<scope>)!: <subject>          ← line 1, ≤ 72 chars, no trailing period
                                     ← line 2 blank (required)
<body — explain WHY, not what>       ← multi-line, wrap at ~72 chars
                                     ← blank line
BC: <category> — <one-line note>     ← footer (mandatory, see below)
Refs: #123                           ← optional: issue/PR refs
```

- `!` after the scope is the **breaking-change marker** (Conventional Commits standard) — equivalent to `BC: breaking`. Only allowed in major-version commits that satisfy the 5 conditions in [spec-conventions.md → When you genuinely must remove](spec-conventions.md#when-you-genuinely-must-remove).
- `<scope>` is optional in the spec but **required here** — it makes git history greppable and changelog generation trivial.

### Subject-line rules

- Active voice, imperative mood (`add`, `fix`, `wire`, not `added`, `fixes`, `wiring`).
- Lowercase after the colon.
- No trailing period.
- ≤ 72 characters **including the prefix**.
- One change per commit. If the subject needs `+` / `and` / `,` to glue unrelated changes, split into separate commits.

### Type

| Type | Use for |
|---|---|
| `feat` | New user-facing feature or new public API symbol |
| `fix` | Bug fix |
| `refactor` | Internal change, no behavior delta, no public surface change |
| `perf` | Performance improvement, no behavior delta |
| `chore` | Maintenance — line endings, formatting, deps housekeeping |
| `docs` | Docs-only (AGENTS.md, `docs/spec-*.md`, inline `@param` blocks) |
| `style` | Code formatting only (no logic, no behavior) |
| `test` | Test additions or fixes |
| `build` | Build/config changes (`webpack.config.js`, `package.json` deps, Gruntfile) |
| `ci` | CI pipeline changes (`.github/`, workflow files) |
| `revert` | Reverts a previous commit (subject = `revert: <original subject>`) |

### Scope

OnePress-specific scopes — pick the **narrowest** one that fits:

| Scope | Use for |
|---|---|
| `hero` / `about` / `services` / `gallery` / `counter` / `team` / `news` / `contact` / `videolightbox` / `features` | A specific front-page section (markup, settings, partial) |
| `sections` | Section loop machinery (`Onepress_Config`, frontpage template, `onepress_load_section`) |
| `customizer` | Customizer registration, panels, sections, settings (cross-cutting) |
| `controls` | Custom Customizer controls (`OnePress_*_Control`) |
| `sanitize` | `inc/sanitize.php` — sanitizers/validators |
| `dashboard` | Admin info page (`Onepress_Dashboard`, recommended actions) |
| `metabox` | Page meta box (`OnePress_MetaBox`, `_hide_*` keys) |
| `editor` | Block editor integration (`OnePress_Editor`, editor styles) |
| `wc` | WooCommerce integration (`woocommerce.php`, shop sidebar, WC gating) |
| `header` / `footer` | Site header / footer templates and helpers |
| `nav` | Primary menu, sticky header, sections-navigation dots |
| `blog` | Blog/home/archive/single post templates and loop |
| `palette` / `colors` | Color settings, alpha controls, CSS color variables |
| `typography` / `fonts` | Google Fonts, font loading, font disable |
| `gallery-lib` | `src/frontend/libs/gallery/*` |
| `lightgallery` | Lightgallery integration |
| `parallax` | Jarallax/backstretch parallax effects |
| `i18n` | Translations, `.pot` generation, WPML config |
| `rtl` | RTL-specific changes |
| `a11y` | Accessibility (ARIA, skip links, focus management) |
| `build` | Webpack, npm scripts, Gruntfile |
| `assets` | Built artifacts — rarely commit alone, see [build-artifact rule](#build-artifact-rule) |
| `deps` | Bump npm dependencies |
| `docs` | AGENTS.md, `docs/spec-*.md`, changelog |
| `release` | Version bump + changelog (paired with a release tag) |

### Examples

**Additive feature** — the default, safest type of change:

```
feat(hero): wire title color to Customizer color var + add per-slide override

Adds new theme mod `onepress_hero_title_color` (default null = inherit from
global palette) and a per-slide override stored in the existing slides
repeater under the `title_color` row key. Old slides without the key fall
back to the global color, preserving current rendering.

BC: none — additive theme mod + additive repeater row key, defaults preserve old look
```

**Bug fix** with no public surface change:

```
fix(hero): autoplay not triggering when slider has only one slide

The early-return in section-parts/section-hero.php was bailing on
count(images) === 1, suppressing autoplay even though owl.carousel handles
single-slide loops fine. Removed the early-return; left the empty-images
guard untouched.

BC: none — fixes regression, no public surface changed
```

**Internal refactor** with a new helper alongside the old:

```
refactor(sections): introduce onepress_get_section_data, delegate old helper

Adds onepress_get_section_data() with a cleaner signature. The old
onepress_get_section_args() now delegates to the new helper with legacy
arg shape — signature unchanged, behavior unchanged for callers.

BC: deprecation — onepress_get_section_args() still works; marked
@deprecated since 2.4, will continue to function indefinitely per
additive-only mandate
```

**Chore** with no shipped-code impact:

```
chore(build): bump @wordpress/scripts to 30.20.1

BC: none — patch bump, no API change
```

**Docs-only**:

```
docs: split AGENTS.md into spec-* files under docs/

BC: none — docs only
```

**Breaking change** (extremely rare, major-version only):

```
feat(image-sizes)!: drop onepress-blog-small after 2-major deprecation

Removes the onepress-blog-small (300×150) image size registered since 1.0.
Marked deprecated since 2.4. Migration in inc/migrations/3-0-0.php
regenerates thumbnails at onepress-small (480×300) for affected sites.

BC: breaking — removes deprecated image size; migration provided;
changelog entry under "Breaking changes"
Refs: #842
```

### Grep recipes

```bash
git log --grep="^BC: breaking"      # All breaking changes ever shipped
git log --grep="^BC: deprecation"   # Audit deprecation history
git log --grep="^feat(hero)"        # Everything that touched the hero section
git log --grep="^.*!:"              # All commits flagged with the ! marker
```

## Build-artifact rule

`assets/` is build output. If `assets/` changes, the matching `src/` change must be in the **same commit** (or land first). Never commit a stale `assets/` against newer `src/`, and never commit `assets/`-only changes without their source origin.

## Release commits

For user-visible releases, bundle these in one commit:

1. Bump `Version` in [../style.css](../style.css).
2. Bump `version` in [../package.json](../package.json).
3. Add an entry to [../changelog.md](../changelog.md).
4. Include the freshly built `assets/` (from `npm run build`).

## Don't include

- `.env`, `.env.*` (secrets)
- `node_modules/`
- `.DS_Store`, `Thumbs.db`
- `*.zip` build artifacts (e.g. `onepress-2.3.18.zip` in the theme root — that's a packaging artifact, not source)
- Any file you can't explain in a sentence

## The `BC:` footer (mandatory)

OnePress has **60,000+ active installs**. Every commit must end with a `BC:` footer line in the body, stating the backward-compatibility impact in one phrase.

### Format

```
BC: <category> — <one-line explanation>
```

### Categories

| Tag | When to use | Example |
|---|---|---|
| `BC: none` | 100% safe — no user, child theme, or integrator can observe the change. Pure refactor, additive helper, comment fix, build/deps housekeeping, docs. | `BC: none — additive theme mod, defaults preserve old look` <br> `BC: none — internal refactor, all old symbols preserved` <br> `BC: none — comment-only change` |
| `BC: visual` | Changes default rendered output for **fresh installs**, with a back-compat shim that keeps existing sites looking the same. | `BC: visual — new fresh-install default; sites with saved settings keep old look via version-gated default` |
| `BC: deprecation` | Adds a deprecation warning, but old code path still works indefinitely (or until a documented future major). | `BC: deprecation — onepress_old_filter still fires via apply_filters_deprecated()` <br> `BC: deprecation — old theme mod key still read as fallback` |
| `BC: breaking` | Removes or repurposes a public symbol. Allowed **only** in a major-version commit that satisfies the 5 conditions in [spec-conventions.md → When you genuinely must remove](spec-conventions.md#when-you-genuinely-must-remove). Must include `!` in the subject and a migration reference. | `BC: breaking — removes onepress_legacy_helper deprecated since 2.0; migration in inc/migrations/3-0-0.php` |

### Why this is mandatory

1. **Forces analysis.** If you can't write the `BC:` line, you haven't thought through the change — go re-read [spec-conventions.md → Backward Compatibility](spec-conventions.md#backward-compatibility).
2. **Reviewer signal.** One line tells a reviewer the risk envelope before they read the diff.
3. **Greppable history.** `git log --grep="^BC: breaking"` produces the full list of every breaking change ever shipped.
4. **Required for `must remove` sign-off.** Condition #5 of the removal contract is a `BC: breaking` line referencing the migration.

If you can't state BC impact, **do not commit** — go read [spec-conventions.md → Backward Compatibility](spec-conventions.md#backward-compatibility) first.

## Pre-commit checklist

Before pressing commit:

- [ ] **BC impact analyzed and stated in the commit body** (see above)
- [ ] **No deletion of any existing public PHP function, class, method, template file, hook, theme mod, option, post meta, image size, or CSS class** — old code stays as a fallback (see [spec-conventions.md → Additive-only mandate](spec-conventions.md#additive-only-mandate)); a removal, if truly necessary, requires the 5 conditions in "When you genuinely must remove"
- [ ] No rename of public API names — additive only (rename = remove + add)
- [ ] No silent default-value change that alters rendered output
- [ ] Diff was reviewed with `git diff --stat` and red (`-`) lines on shipped files are justified (formatting / dead local var / etc., never a public symbol)
- [ ] `npm run lint:js` clean (if JS changed)
- [ ] `npm run lint:css` clean (if CSS/SCSS changed)
- [ ] `npm run build` run and `assets/` is in the staged set (if `src/` changed)
- [ ] Line endings audit clean (see [spec-line-endings.md](spec-line-endings.md))
- [ ] No `wp-includes/` or `wp-admin/` edits in the diff (core is off-limits)
- [ ] Commit subject in English, prefixed, ≤ 72 chars
