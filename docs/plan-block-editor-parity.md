# Plan: Block Editor ↔ Frontend Parity

**Status:** ✅ Phases 0–4, 6 complete in working tree. Phase 5 (patterns) deferred. Awaiting human review before commit/tag.
**Target release:** OnePress `2.4.0` (minor, additive-only).
**Owner:** TBD.
**Last updated:** 2026-05-26.

Tracks the work to make posts edited in the WP Block Editor (`wp-admin/post.php?action=edit&post=N`) render visually identical to the published frontend (`/?p=N`).

---

## Approved decisions

Locked in before work starts. Reopen only with a documented reason.

| Decision | Value | Notes |
|---|---|---|
| **Guiding priority** | **Editor parity > frontend preservation** | When there is a trade-off, change frontend to match the desired editor look — but keep frontend deltas small and only in the direction of "more correct" (better spacing, fixed alignment, etc.). |
| **Frontend regression tolerance** | Small visual changes acceptable | No structural / breaking changes. Each delta logged in changelog under "Visual". |
| **Color palette source** | Dynamic from theme mods | Resolved per-request via `block_editor_settings_all` filter; reflects user's Customizer settings live. Not `add_theme_support( 'editor-color-palette' )` (which is static). |
| **Block patterns (Phase 5)** | **Deferred** | Not in 2.4.0. Re-evaluate after 2.4 ships. |
| **Release vehicle** | Minor `2.4.0` | Additive-only, no rename/removal of public API. Existing 60k installs upgrade safely. |
| **Existing dead code in `OnePress_Editor`** | Keep, fix path only | Per [additive-only mandate](spec-conventions.md#additive-only-mandate): don't remove `load_style()` / `css_file()` / `editor_style_url()`. Fix `$editor_file` path so it stops returning empty. |

---

## Architecture findings (do not re-investigate)

1. **`editor.scss` already shares partials with `style.scss`:**

   ```scss
   // src/frontend/styles/editor.scss
   @use "variables";
   @use "document";
   @use "contents";
   @use "gutenberg";
   ```

   → any rule added to `_contents.scss` or `_gutenberg.scss` automatically applies to **both** editor and frontend. This is the leverage point.

2. **`_gutenberg.scss` is mostly comments** (~57 active lines, mostly `.single-post .content-inner` and `.entry-content ul/ol/li`). The bulk of `.wp-block-*` rules are commented-out scaffolding from the Underscores starter. **Un-commenting + tuning is the bulk of Phase 1–2 work.**

3. **Color theme mods available** for palette source:
   - `onepress_primary_color` (default `#03c4eb`)
   - `onepress_secondary_color` (default `#00aeef`)
   - Plus other section-specific color mods in `inc/customize-configs/options-colors.php`

4. **`OnePress_Editor` latent bug:** `$editor_file = 'assets/css/admin/editor.css'` points to a non-existent path. Actual file is at `assets/admin/editor.css`. The `load_style()` → `editor_settings()` chain currently returns empty. The actual editor CSS today is loaded by `add_editor_style('assets/admin/editor.css', …)` in `functions.php:184`.

5. **`add_editor_style()` in `functions.php:184`** is the real working channel — it loads `assets/admin/editor.css` + Google Fonts into the editor canvas. Keep working alongside it.

6. **Existing theme supports:** `editor-styles`, `align-wide`, `wp-block-styles`. Wide/full alignment already declared; styling needs work.

---

## Phases

### Phase 0 — Discovery, baseline, latent bug fix
**Effort:** ~30 min. **BC:** none. **Status:** ✅ completed.

**Goals:**
- Boot site via WP Studio and confirm editor renders without error today.
- Identify a **fixture set** containing in-scope blocks. (Updated: the site already ships the standard Gutenberg theme-test posts — reuse them instead of authoring our own.)
- Fix `OnePress_Editor::$editor_file` typo: `'assets/css/admin/editor.css'` → `'assets/admin/editor.css'`.

**Files touched:**
- `inc/admin/class-editor.php` — path fix + inline comment

**Reuse, do not create — existing fixture posts on `onepress.wp.local`:**

| ID | Title | Blocks covered |
|---|---|---|
| `94` | Gutenberg: Common Blocks | paragraph, heading, list, image, quote, gallery |
| `116` | Gutenberg: Embed Blocks | embeds (responsive) |
| `122` | Gutenberg: Formatting Blocks | code, preformatted, pullquote, table, verse |
| `125` | Gutenberg: Layout Element Blocks | columns, group, cover, separator, spacer, button |
| `79`, `1177` | Image Alignment | image left/right/center/wide/full |
| `90` | Widget Blocks | latest posts, search, archives, calendar |

**Per-phase verification opens both URLs (replace `<ID>`):**

```
editor:   https://onepress.wp.local/wp-admin/post.php?post=<ID>&action=edit
frontend: https://onepress.wp.local/?p=<ID>
```

**Effect of the path fix:** `OnePress_Editor::load_style()` now returns the actual `editor.css` content instead of an empty string. The file is now injected into the editor via two channels (existing `add_editor_style()` in `functions.php` + the newly-working `block_editor_settings_all` filter). Functionally identical CSS in both channels — benign duplication, ~few kb. **Do not** "fix" the duplication by removing either channel without a Phase 6 review (would violate additive-only for `add_editor_style` call sites that integrators may rely on).

**Done.**

---

### Phase 1 — Editor wrapper parity
**Effort:** ~2–3h. **BC:** visual on both editor + frontend (small).

**Goals:**
- Match typography exactly: font family, size, line-height, headings h1–h6.
- Constrain `.editor-styles-wrapper .wp-block` max-width to `single_layout_content_width` (default 800px) — already partially done by `OnePress_Editor::css()`; verify and refine.
- Style paragraph, links, headings, lists, code (inline + pre), blockquote in the wrapper context.

**Files touched:**
- `src/frontend/styles/_gutenberg.scss` (un-comment + tune typography section)
- `src/frontend/styles/_variables.scss` (only if extracting shared tokens; avoid renaming existing vars)

**Selector discipline:**
All new rules MUST scope to either:
- `.editor-styles-wrapper` (editor-only), or
- `.entry-content` / `.wp-block-*` (apply to both editor + frontend via shared partials).

**Never** add rules at higher-level selectors (e.g. `body`, `p`) that would leak into header/footer/widgets.

**Verification:**
- Rebuild: `npm run build`
- Re-screenshot editor + frontend; diff against baseline. Frontend deltas must be small (typography refinements OK; no layout shifts).

**Done when:** typography in editor matches frontend; frontend diff reviewed and acceptable.

---

### Phase 2 — Block-specific rules
**Effort:** ~4–6h. **BC:** visual on both (small, scoped to `.wp-block-*`).

**Goals:** Style each common block to match frontend appearance.

#### Block scope for Phases 1–2

| Block | Selector | Notes |
|---|---|---|
| Paragraph | `.wp-block-paragraph` | Inherits from `.entry-content p` |
| Headings | `.wp-block-heading` (h1–h6) | Use `$font_heading`, match `_contents.scss` h1–h6 |
| List | `.wp-block-list`, `.wp-block-list-item` | Honor existing `.entry-content ul/ol/li` rules in `_gutenberg.scss` |
| Image | `.wp-block-image` | Caption styling, alignment (left/right/center/wide/full) |
| Gallery | `.wp-block-gallery` | Cross-reference existing rules in `_contents.scss:482` |
| Button | `.wp-block-button`, `.wp-block-button__link` | Primary variant uses `onepress_primary_color`; add `.is-style-secondary` if useful |
| Quote | `.wp-block-quote` | Left border + italic; match frontend blockquote |
| Pullquote | `.wp-block-pullquote` | Larger emphasis, centered |
| Cover | `.wp-block-cover` | Full-bleed at `alignfull` |
| Columns | `.wp-block-columns`, `.wp-block-column` | Bootstrap-compatible gutters |
| Group | `.wp-block-group` | Container behavior |
| Table | `.wp-block-table` | Borders, alternating rows |
| Separator | `.wp-block-separator` | Subtle / wide / dots variants |
| Embed | `.wp-block-embed` | Responsive (`responsive-embeds` support in Phase 3) |
| Code | `.wp-block-code` | Use `$monaco` font, background |
| Preformatted | `.wp-block-preformatted` | Same monospace + background |
| Spacer | `.wp-block-spacer` | No-op visually; just respect height |

#### Alignment

`.alignwide` and `.alignfull` must:
- In editor: extend beyond `.editor-styles-wrapper` max-width (use negative margins or `:not()` exclusion as already done by `OnePress_Editor::css()`).
- In frontend: match the page template's container behavior. Test on `single.php` and `page.php` (right-sidebar layout) — alignfull should bleed to viewport edges.

**Files touched:**
- `src/frontend/styles/_gutenberg.scss` (main work, additive only)

**Verification:** rebuild, screenshot diff per block, log frontend deltas.

**Done when:** every block in scope renders ≈ identically in editor vs frontend.

---

### Phase 3 — Editor configuration (theme supports + filters)
**Effort:** ~1–2h. **BC:** additive (no CSS changed, only editor flags).

**Goals:** Register editor-side configuration so the UI surfaces the right tools.

**Add via filter (NOT `add_theme_support`)** in `OnePress_Editor`:

| Setting | Source | Why filter (not theme support) |
|---|---|---|
| `colors` (color palette) | Theme mods: `onepress_primary_color`, `onepress_secondary_color`, `$text` (#777), `$heading` (#333) | Dynamic per site — `add_theme_support()` requires static array |
| `fontSizes` | Match `$base` (20px) scale: small (14), medium (18), large (22), x-large (28) | Static OK, but keep filter for consistency |
| Responsive embeds | `add_theme_support( 'responsive-embeds' )` | Static — OK as theme support |
| `custom-line-height` | `add_theme_support( 'custom-line-height' )` | Static |
| `custom-spacing` | `add_theme_support( 'custom-spacing' )` | Static |
| `custom-units` | `add_theme_support( 'custom-units' )` | Static |

**Files touched:**
- `inc/admin/class-editor.php` — new method `register_block_editor_supports()` called from constructor; new method `filter_editor_settings()` returning palette/fontSizes
- `functions.php` — add the 4 static theme supports in `onepress_setup()`

**Do NOT add:**
- `disable-custom-colors` / `disable-custom-font-sizes` — too restrictive for users.

**Don't break Plus:** `onepress_typography_render_style()` already injects custom typography. Audit specificity to ensure Plus still wins.

**Verification:** open editor sidebar → Color → confirm palette swatches match Customizer; same for Font Sizes.

**Done when:** palette is dynamic, font-size picker has theme-relevant options, embed/spacing/line-height controls present.

---

### Phase 4 — Body class mirror
**Effort:** ~1h. **BC:** additive.

**Goals:** Editor canvas `<body>` element gets a class that cascades the same context as the frontend `.entry-content` wrapper, so any rule using `.entry-content > .wp-block-*` works without dual-selector hacks.

**Approach:**
- Filter `block_editor_settings_all` → add `body_class` (or use `admin_body_class` for the surrounding admin shell where appropriate).
- The editor iframe wrapper is `.editor-styles-wrapper`; add a class like `.entry-content` to it via filter, OR adjust SCSS selectors to handle both `.entry-content` and `.editor-styles-wrapper`.

**Decision point during implementation:** which approach is less invasive — adding a class vs duplicating selectors. Default to the SCSS approach (`.entry-content, .editor-styles-wrapper { … }`) since it doesn't depend on iframe internals that WP may change.

**Files touched:**
- `src/frontend/styles/_gutenberg.scss` (group selectors)
- Possibly `inc/admin/class-editor.php` (if class-injection approach chosen)

**Done when:** removing any `.entry-content` rule from frontend doesn't leave editor unstyled (or vice versa).

---

### Phase 5 — Block patterns
**Status:** **DEFERRED**. Not in 2.4.0.

Re-evaluate after 2.4 ships. When picked up, scope: hero, feature-grid, team-card, CTA, testimonial. Category: "OnePress".

---

### Phase 6 — Documentation update
**Effort:** ~1h. **BC:** docs only.

**Goals:**
- Update [spec-admin.md → Block editor integration](spec-admin.md#block-editor-integration) to reflect the new architecture: palette filter, font sizes, parity rule, fixture post location.
- Add a new spec if the editor surface grows beyond what fits in `spec-admin.md`: candidate file `docs/spec-block-editor.md`.
- Update [changelog.md](../changelog.md) with 2.4.0 entry listing:
  - "Added: block editor color palette and font sizes mirroring theme settings."
  - "Added: responsive embeds, custom line-height/spacing/units in block editor."
  - "Improved: block editor canvas now matches frontend typography and block styling."
  - "Visual: minor adjustments to `.entry-content` blockquote/list/code styling for consistency between editor and frontend."
  - "Fixed: dead editor stylesheet path in `OnePress_Editor`."

**Files touched:**
- `docs/spec-admin.md`
- `docs/spec-block-editor.md` (new, if needed)
- `changelog.md`
- `style.css` (version bump)
- `package.json` (version bump)

**Done when:** docs reflect shipped reality; version bumped; changelog entries staged in same release commit.

---

## Verification protocol

### Per-phase visual diff

```bash
# 1. Confirm site is up
studio site status

# 2. (Phase 0 only) Create fixture
studio wp post create \
    --post_title="Block parity fixture" \
    --post_content="$(cat tests/fixtures/block-parity-post.html)" \
    --post_status=publish --post_type=post

# 3. Rebuild after every SCSS change
npm run build

# 4. Open editor + frontend in two browser windows; screenshot at 1280px
#    editor:   https://onepress.wp.local/wp-admin/post.php?post=<FIXTURE_ID>&action=edit
#    frontend: https://onepress.wp.local/?p=<FIXTURE_ID>

# 5. Diff against baseline; log any frontend deltas in the phase's PR/commit body
```

### Pre-release smoke

Before tagging `2.4.0`:
- [ ] Deactivate OnePress Plus → editor still functional.
- [ ] Activate OnePress Plus → typography from Plus still wins.
- [ ] Deactivate WooCommerce → editor still functional.
- [ ] Activate WooCommerce → product editor unaffected.
- [ ] Toggle every section on/off in Customizer → no editor side-effects.
- [ ] Run the [line-endings audit](spec-line-endings.md#audit--normalize-playbook).
- [ ] Confirm `assets/` is in same commit as `src/` (see [build-artifact rule](spec-commits.md#build-artifact-rule)).

---

## Risks (logged)

| Risk | Likelihood | Mitigation |
|---|---|---|
| Un-commenting `_gutenberg.scss` rules leaks into header/footer/widgets | Medium | Strict selector scoping (`.wp-block-*`, `.entry-content`, `.editor-styles-wrapper` only); review every commit's selector list |
| Plus typography conflict | Low | Plus injects last via `enqueue_block_editor_assets` priority; theme styles loaded first; Plus wins by load order |
| Static color palette declared via `add_theme_support` cached before theme mod resolves | High if done wrong | Use filter `block_editor_settings_all` instead |
| Frontend `.entry-content` rules break sites with heavy custom CSS | Medium | Frontend changes scoped to selectors not present before; audit by grepping current rules in `_contents.scss` before adding |
| WP Studio PHP WASM behaves differently from prod | Low | All changes are PHP + CSS, no native deps; smoke-test on a real WP install before 2.4 tag if available |
| User's Customizer "Additional CSS" overrides break in editor (CSS not loaded in editor by default) | Medium | Out of scope for 2.4. Document the limitation in spec-admin.md. |

---

## BC contract for this work

Every commit in this plan must satisfy [additive-only mandate](spec-conventions.md#additive-only-mandate):

- ✅ Add new `OnePress_Editor` methods (`register_block_editor_supports`, `filter_editor_settings`, etc.).
- ✅ Add new `add_theme_support()` calls in `onepress_setup()`.
- ✅ Add new SCSS rules in `_gutenberg.scss`.
- ✅ Add new theme mods (`onepress_editor_*` if any introduced) with defaults that preserve existing behavior.
- ❌ Don't remove `OnePress_Editor::load_style()`, `css_file()`, `editor_style_url()` even though path fix may make them redundant.
- ❌ Don't rename existing CSS classes in `_contents.scss`.
- ❌ Don't change defaults of existing theme mods (`single_layout_content_width`, color mods, etc.).
- ❌ Don't drop any `add_theme_support()` already declared.

---

## Out of scope for 2.4.0

- Converting to a block theme (FSE / `theme.json` / `templates/` / `parts/`).
- Custom OnePress blocks (e.g. "hero slider as a block").
- Block patterns (deferred — Phase 5).
- `disable-custom-colors` / `disable-custom-font-sizes` lockdowns.
- Editor JS module with custom inspector controls / sidebar panels.
- Loading user's Customizer "Additional CSS" inside the editor.
- Migration of existing posts to new block markup.
