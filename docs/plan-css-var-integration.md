# Plan: theme.json Global Attributes Integration (one-shot)

**Status:** Drafted, awaiting review. Not started.
**Target release:** OnePress `2.4.0` (single bundle with the block-editor parity work, or a separate `2.4.x` tag — TBD).
**Owner:** TBD.
**Last updated:** 2026-05-26.
**Scope decision:** **One-shot all applicable global attributes** (layout + colors + font sizes + font families + spacing). Confirmed by user 2026-05-26. Other categories with no current OnePress integration (gradients, duotones, shadows, aspect ratios) are intentionally untouched — they aren't declared in theme.json and present no divergence.
**Supersedes:** the original layout-only draft of this same file.

---

## The bigger problem in one paragraph

OnePress ships [`theme.json`](../theme.json) (since pre-2.4) declaring layout sizes, colors, font sizes, font families, and spacing scale. WP transforms these into CSS custom properties (`--wp--style--global--*`, `--wp--preset--*`) and utility classes (`.has-{slug}-color`, `.has-{slug}-font-size`, …). Block content authored in the editor relies on these vars and classes to render. **But the SCSS bundle ignores almost all of them** — it hardcodes literal values from `_variables.scss` (`$primary`, `$grid`, `$font_text`, etc.), and the Customizer color mods (`onepress_primary_color`, `onepress_secondary_color`) are wired through ad-hoc inline CSS that doesn't touch theme.json's preset slugs at all. The result: theme.json is decorative; block content can visually diverge from the rest of the theme; and Customizer color changes don't propagate into block content.

This plan refactors OnePress so theme.json is the **single source of truth** for all applicable global presets, with Customizer mods feeding theme.json values via the `wp_theme_json_data_theme` filter and SCSS consuming `var(...)` with SCSS literals as fallbacks.

## Approved decisions

| Decision | Value |
|---|---|
| Priority | Editor parity > frontend preservation; small frontend changes acceptable |
| Scope | One-shot: layout + colors + font sizes + font families + spacing |
| Release vehicle | Minor `2.4.0` (additive only) — may slip to `2.4.1` if scope balloons |
| BC contract | [Additive-only](spec-conventions.md#additive-only-mandate) — no rename/remove of public symbols |
| Layout architecture | Stay classic (not converting to block theme); use manual `.entry-content > X` rules consuming WP CSS vars; do **not** inject `.is-layout-constrained` |
| Existing 2.3.x sites | Must not see visual regression except where the change is "more correct" per theme.json's declared intent |
| `theme.json` `secondary = #333333` | **Frozen**, do not touch — see [Known inconsistencies](spec-block-editor.md#known-inconsistencies) |

## Global attributes coverage (one-shot)

| Category | theme.json key | CSS vars emitted | Status in this plan |
|---|---|---|---|
| Layout — content/wide | `settings.layout.contentSize/wideSize` | `--wp--style--global--{content,wide}-size` | **IN — Phase A** |
| Color palette | `settings.color.palette` (8 slugs) | `--wp--preset--color--{slug}` | **IN — Phase B** (primary syncs Customizer; secondary frozen) |
| Font sizes | `settings.typography.fontSizes` (6 slugs) | `--wp--preset--font-size--{slug}` | **IN — Phase C** (light refactor) |
| Font families | `settings.typography.fontFamilies` (4 slugs) | `--wp--preset--font-family--{slug}` | **IN — Phase D** (light refactor) |
| Spacing scale | `settings.spacing.spacingScale.steps:7` | `--wp--preset--spacing--{20..70}` | **IN — Phase E** (verification only) |
| Layout — root padding | `useRootPaddingAwareAlignments: true` | `--wp--style--root--padding-*` | **OUT** — inert on classic theme; documented |
| Gradients / Duotone / Shadow / Aspect ratio | (not declared in OnePress theme.json) | (none emitted) | **OUT** — no work needed |
| Element styles (`styles.elements.*`) | declared in theme.json | (WP auto-applies CSS rules) | **OUT** — already works |
| Block layout types (`.is-layout-{constrained,flex,…}`) | (WP core) | (WP CSS) | **OUT** — explicitly rejected (regression risk) |
| Text/vertical alignment utility classes | (WP block-library) | (WP CSS) | **OUT** — works automatically |

---

## Reference: WP canonical pattern

Verified for this site via `wp_get_global_stylesheet()` and authoritative docs:

### CSS variables emitted by theme.json (on `:root`)

```css
:root {
  --wp--style--global--content-size:  1110px;     /* layout.contentSize */
  --wp--style--global--wide-size:     1230px;     /* layout.wideSize    */
  --wp--style--root--padding-{...}:   …;          /* useRootPaddingAware */

  --wp--preset--color--primary:        #03c4eb;   /* color.palette[slug=primary]   */
  --wp--preset--color--secondary:      #333333;   /* color.palette[slug=secondary] */
  --wp--preset--color--heading:        #333333;
  --wp--preset--color--text:           #777777;
  --wp--preset--color--border:         #e9e9e9;
  --wp--preset--color--light:          #f8f9f9;
  --wp--preset--color--white:          #ffffff;
  --wp--preset--color--black:          #000000;

  --wp--preset--font-size--small:      12px;
  --wp--preset--font-size--normal:     14px;
  --wp--preset--font-size--medium:     18px;
  --wp--preset--font-size--large:      25px;
  --wp--preset--font-size--x-large:    33px;
  --wp--preset--font-size--xx-large:   40px;

  --wp--preset--font-family--open-sans:  "Open Sans", Helvetica, Arial, sans-serif;
  --wp--preset--font-family--raleway:    Raleway, Helvetica, Arial, sans-serif;
  --wp--preset--font-family--system:     system-ui, -apple-system, …;
  --wp--preset--font-family--monospace:  Monaco, Consolas, "Andale Mono", …;

  --wp--preset--spacing--20:           …;          /* via spacingScale.steps:7 */
  --wp--preset--spacing--30:           …;
  /* … through --70 */
}
```

### Utility classes WP auto-emits

- `.has-{slug}-color`, `.has-{slug}-background-color` — applied on blocks with explicit color
- `.has-{slug}-font-size`, `.has-{slug}-font-family`
- `.has-{slug}-padding-{top,bottom,left,right}`, `.has-{slug}-margin-{...}`
- `.has-text-align-{left,center,right}`, `.is-vertically-aligned-{top,center,bottom}`

### Idiomatic consumption pattern (classic theme)

```scss
// SCSS rules in .entry-content / .editor-styles-wrapper scope use CSS vars
// with SCSS literal as fallback. This way:
//   - theme.json updates propagate automatically
//   - Customizer-driven theme.json overrides (Phase B) propagate
//   - Sites that strip theme.json fall back to SCSS literal (no breakage)

.entry-content > .alignwide {
  max-width: var(--wp--style--global--wide-size, #{variables.$grid + 120px});
}

.entry-content blockquote {
  border-left: 3px solid var(--wp--preset--color--primary, #{variables.$primary});
}

.entry-content p {
  font-family: var(--wp--preset--font-family--open-sans, #{variables.$font_text});
}
```

### Customizer ↔ theme.json bridge

```php
add_filter( 'wp_theme_json_data_theme', function ( WP_Theme_JSON_Data $theme_json ) {
    $primary_mod = sanitize_hex_color( '#' . ltrim( get_theme_mod( 'onepress_primary_color', '' ), '#' ) );
    if ( ! $primary_mod ) {
        return $theme_json;
    }
    $data = $theme_json->get_data();
    foreach ( $data['settings']['color']['palette'] as &$color ) {
        if ( $color['slug'] === 'primary' ) {
            $color['color'] = $primary_mod;
        }
    }
    return $theme_json->update_with( $data );
} );
```

References:
- [Layout — Theme Handbook (WordPress.org)](https://developer.wordpress.org/themes/global-settings-and-styles/settings/layout/)
- [Global Settings & Styles (theme.json) — Block Editor Handbook](https://developer.wordpress.org/block-editor/how-to-guides/themes/global-settings-and-styles/)
- [Using The New Constrained Layout — CSS-Tricks](https://css-tricks.com/using-the-new-constrained-layout-in-wordpress-block-themes/)
- [WordPress Global Styles Reference Tables — CSS-Tricks](https://css-tricks.com/wordpress-global-styles-reference-tables/)
- `wp_get_global_stylesheet()` output captured live for this site

---

## Audit: current state

### Layout (Phase A)

| File | Line | Selector | Current value | Replace with |
|---|---|---|---|---|
| `src/frontend/styles/_gutenberg.scss` | ~684 | `.entry-content > .alignwide` | `1110px` (hard-coded) | `var(--wp--style--global--wide-size, 1230px)` — **note: theme.json says wide=1230, not 1110** |
| same | (editor block) | `.editor-styles-wrapper .wp-block.alignwide` | `variables.$grid` (=1110) | `var(--wp--style--global--wide-size, 1230px)` |
| same | (no rule today) | `.entry-content > *:not(.alignwide):not(.alignfull)` | n/a | `max-width: var(--wp--style--global--content-size, 800px)` |
| `inc/template-tags.php` | 1015 | inline content-width | theme mod value | also emit `:root { --wp--style--global--content-size: <value>px; }` so Phase A rule honors it |
| `inc/admin/class-editor.php` | `css()` | inline content-width | theme mod value | same pattern |

### Colors (Phase B)

**11 `$primary`/`$secondary` SCSS usages within content/block scope** (out of 42 total in the bundle). Audit:

| File | Line | Selector | Use |
|---|---|---|---|
| `_contents.scss` | 82 | `.highlight` | `color: $primary` |
| `_contents.scss` | 94 | `.entry-content blockquote` | `border-left: 3px solid $primary` |
| `_contents.scss` | 167 | `.nav-links a:hover` | `background: $primary` |
| `_contents.scss` | 351 | (comment-related) | `color: $primary` |
| `_gutenberg.scss` | 329 | `.editor-styles-wrapper blockquote` | `border-left: 3px solid $primary` (Phase 1 mirror) |
| `_gutenberg.scss` | 387 | `.editor-styles-wrapper a` | `color: $primary` |
| `_gutenberg.scss` | 460 | `.wp-block-button__link` | `background-color: $primary` |
| `_gutenberg.scss` | 474 | `.wp-block-button__link:hover` | `background-color: $secondary` |
| `_gutenberg.scss` | 482 | `.wp-block-button.is-style-outline` | `color: $primary` |
| `_gutenberg.scss` | 483 | same | `border: 2px solid $primary` |
| `_gutenberg.scss` | 487 | outline `:hover` | `background-color: $primary` |

The remaining 31 usages (out of 42) are in headers/footers/navigation/sections — not content-scoped and not affected by this plan.

**Inline CSS in `inc/template-tags.php`** also applies Customizer mods to ad-hoc selectors (~10 places). These are not currently bridged to theme.json — Customizer changes never reach block content. Phase B fixes this via the `wp_theme_json_data_theme` filter approach.

### Font sizes (Phase C)

`_document.scss` defines h1–h6 sizes inline (`33px`, `25px`, `20px`, etc.). theme.json has matching `fontSizes` entries (`x-large: 33px`, `large: 25px`, etc.). When a block author picks "X-Large" in the editor, `.has-x-large-font-size` is emitted on the element with `font-size: var(--wp--preset--font-size--x-large)` — works automatically via WP block-library CSS, but the values are duplicated.

Phase C scope: keep `_document.scss` h1–h6 declarations (additive-only — they're already shipping), but verify the utility classes (`.has-*-font-size`) flow through correctly and don't conflict.

### Font families (Phase D)

Same shape as Phase C — `_document.scss` `body { font-family: $font_text; }`, theme.json declares same font families with preset slugs. Block utility classes (`.has-open-sans-font-family`) work automatically. Phase D scope: verification + light refactor where the SCSS rule could consume the var.

### Spacing (Phase E)

theme.json declares `spacingScale.steps: 7`. WP auto-generates 7 spacing preset vars (`--wp--preset--spacing--20` through `--80`). Block authors can apply `.has-30-padding-top` etc. Currently OnePress SCSS doesn't reference these vars — block content gets the user-selected spacing via WP's own block-library CSS rules. Phase E is verification only.

---

## Phased refactor

### Phase A — Layout CSS vars + content-size constraint (~1.5h)

**Files:**
- `src/frontend/styles/_gutenberg.scss` — alignwide rules (frontend + editor), new `.entry-content > *:not(.alignwide):not(.alignfull)` content-size rule
- `inc/template-tags.php` — `onepress_custom_inline_style()` rewrite: emit `:root { --wp--style--global--content-size: …px; }` override + keep `.single-post .site-main` as legacy
- `inc/admin/class-editor.php` — `css()` method: same CSS-var override pattern

**Visual deltas:**
- alignwide: 1110 → 1230 (matches theme.json declaration; intentional)
- Regular `.entry-content > *`: now capped at content-size (1110 default). On default sites with no-sidebar single posts container is ~1110 → invisible. On fullwidth template pages → content visibly narrower.

**BC impact:** small, intentional, both deltas move toward theme.json's declared intent.

---

### Phase B — Color palette: Customizer → theme.json bridge + SCSS var consumption (~3h)

**B1. PHP: Customizer → theme.json filter**

New function `onepress_filter_theme_json_palette()` hooked on `wp_theme_json_data_theme`. Override only the `primary` slug from `onepress_primary_color` Customizer mod when set. **Do not** touch `secondary` (frozen at `#333333` per [Known inconsistencies](spec-block-editor.md#known-inconsistencies)).

Why only primary:
- theme.json `primary` default `#03c4eb` matches `onepress_primary_color` default → override is safe (same default).
- theme.json `secondary = #333333` ≠ `onepress_secondary_color` default `#00aeef` → override would visibly change `.has-secondary-background-color` on existing 60k sites (regression).

**B2. SCSS: refactor 11 in-scope `$primary` / `$secondary` references**

Replace pattern (one example):

```diff
- background-color: variables.$primary;
+ background-color: var(--wp--preset--color--primary, #{variables.$primary});
```

Apply to all 11 usages listed in the audit. SCSS literal remains as fallback for sites that strip theme.json.

The remaining 31 `$primary`/`$secondary` usages outside content scope are **not changed** — they continue to use the SCSS variable. Header/footer/nav are not block-content; their Customizer color story is handled by existing inline CSS in `template-tags.php`.

**B3. PHP: keep existing inline CSS color injection intact**

`inc/template-tags.php` continues emitting `onepress_primary_color` / `onepress_secondary_color` as ad-hoc inline CSS for non-content selectors (e.g. `.feature-item:hover`). No change there — additive-only.

**Files:**
- new file `inc/admin/class-theme-json-bridge.php` OR a new function inside `inc/admin/class-editor.php`
- `src/frontend/styles/_contents.scss` (4 lines)
- `src/frontend/styles/_gutenberg.scss` (7 lines)
- `functions.php` — require the new bridge file if separated out

**Visual deltas:**
- Sites that customized `onepress_primary_color`: block content (`.has-primary-color`, `.has-primary-background-color`, theme.json `styles.elements.button.color.background`) **now follows the Customizer value**. Most users will see this as "finally consistent". A minority may see a color shift on block content they hadn't intended.
- Sites that never customized: zero visual delta.

**BC impact:** the primary-color visual shift is intentional convergence. Documented loudly in changelog and `spec-block-editor.md`.

---

### Phase C — Font sizes verification + utility class audit (~1h)

**Goals:** confirm `.has-{slug}-font-size` utility classes work in both editor and frontend (they should — WP block-library CSS handles them). No SCSS refactor unless a conflict shows up.

**Test:**
- Add a paragraph with explicit font size "Large" (25px) → verify both surfaces show 25px
- Verify `var(--wp--preset--font-size--large)` resolves to `25px` (or its fluid value)
- Check for any specificity conflicts where `_document.scss` h1–h6 rule wins against `.has-large-font-size`

**Optional refactor (if no conflict surfaces):** make `.entry-content { font-size: var(--wp--preset--font-size--normal, 14px); }` to lock body text to theme.json normal size. Skip if it risks 60k-site regression.

**Files (probably):** none changed. Documentation update only.

---

### Phase D — Font families verification + utility class audit (~1h)

Same shape as Phase C, for fontFamily presets. Verify `.has-open-sans-font-family`, `.has-raleway-font-family` etc. apply correctly in content. Optional: refactor `_document.scss` body font-family to consume `var(--wp--preset--font-family--open-sans, …)`.

**Files:** likely none changed.

---

### Phase E — Spacing verification (~30 min)

`var(--wp--preset--spacing--N)` and `.has-{slug}-padding-X` utility classes are pure WP — verify they apply correctly inside `.entry-content` and `.editor-styles-wrapper`. No theme rules should override them in normal cases.

**Files:** none changed. Verification only.

---

### Phase F — Editor mirrors (~30 min)

For every Phase A–B rule added under `.entry-content`, add the editor mirror under `.editor-styles-wrapper`. Follow the pattern established by Phase 1 of the prior plan.

**Files:** `src/frontend/styles/_gutenberg.scss`

---

### Phase G — Documentation + changelog (~1h)

**Files:**
- `docs/spec-block-editor.md` — add "CSS Variable Integration" section with the consumption pattern + Customizer bridge mechanism
- `docs/plan-block-editor-parity.md` — link forward to this plan
- `changelog.md` — describe each phase
- `style.css` + `package.json` — version stays `2.4.0` (if shipping together) or bumps to `2.4.1`

---

### Phase H — Verification matrix (~1h)

| # | Scenario | Template | Customizer | theme.json | Expected |
|---|---|---|---|---|---|
| 1 | Default site | no-sidebar single | unset | shipping | regular ≤ 1110, alignwide = 1230, alignfull = 100vw, button bg = `#03c4eb` |
| 2 | With sidebar | right-sidebar single | unset | shipping | regular ≤ column (~680), alignwide = 1230 (overflows column — known limitation), alignfull = 100vw |
| 3 | Custom content width | no-sidebar single | `single_layout_content_width=700` | shipping | regular ≤ 700, alignwide = 1230, alignfull = 100vw |
| 4 | Custom theme.json widths | no-sidebar single | unset | `contentSize:900, wideSize:1400` | regular ≤ 900, alignwide = 1400, alignfull = 100vw |
| 5 | Custom primary color | no-sidebar single | `onepress_primary_color=#ff5500` | shipping | block button bg = `#ff5500`, `.has-primary-background-color` = `#ff5500`, frontend `.entry-content` button bg = `#ff5500` |
| 6 | Custom secondary color | no-sidebar single | `onepress_secondary_color=#00ff00` | shipping | `.has-secondary-*` still `#333333` (frozen); header secondary uses Customizer value; documented inconsistency |
| 7 | Font size picker | no-sidebar single | unset | shipping | `.has-large-font-size` para renders at 25px both surfaces |
| 8 | Font family picker | no-sidebar single | unset | shipping | `.has-raleway-font-family` para renders in Raleway both surfaces |
| 9 | Editor canvas | post.php | (any) | shipping | matches frontend visually within iframe constraints |
| 10 | Plus active | (any) | (any) | shipping | typography from Plus still wins; no regression from Phase A–B |

---

## Total effort: ~9–11 hours

| Phase | Estimate |
|---|---|
| A — Layout | 1.5h |
| B — Colors | 3h |
| C — Font sizes | 1h |
| D — Font families | 1h |
| E — Spacing | 0.5h |
| F — Editor mirrors | 0.5h |
| G — Docs + changelog | 1h |
| H — Verification | 1h |
| **Total** | **~9.5h** |

---

## BC analysis (combined)

| Change | Sites affected | Visual delta | Risk | Mitigation |
|---|---|---|---|---|
| alignwide widens 1110 → 1230 | sites using alignwide blocks | +120px width | low — matches theme.json intent | document in changelog |
| Regular `.entry-content > *` capped at 1110 | fullwidth-template sites with very wide hand-coded content | content narrows visibly | low — matches theme.json intent | document |
| `single_layout_content_width` mod → CSS var override | sites with mod set | none (same effective constraint) | none | n/a |
| Customizer primary color now reaches block content | sites that customized primary | block content rebrands to primary | low — most users expect this | document loudly + offer filter to opt out |
| Secondary color **NOT** touched | sites using `.has-secondary-*` | none | n/a | document the frozen inconsistency |
| 11 SCSS `$primary` usages replaced with `var()` + fallback | all sites | none | none — fallback covers no-theme.json case | n/a |
| Font sizes / families / spacing | all sites | none expected (verification only) | none | n/a |

**Verdict:** safe under additive-only. The two intentional visual deltas (alignwide widening, content-size capping on fullwidth templates) plus the primary-color convergence are the entire surface of change. Document all three.

---

## Out of scope (will not be touched)

- Converting to block theme (FSE).
- Changing theme.json's `secondary = #333333` (frozen).
- Changing theme.json `contentSize` (1110), `wideSize` (1230), or any palette/fontSize/fontFamily VALUE.
- Adding `.is-layout-constrained` class to `.entry-content` (would inherit WP `margin-block-start: 24px` rule — rejected).
- Refactoring the 31 out-of-content-scope `$primary`/`$secondary` SCSS usages (header/footer/nav).
- Adding new palette / fontSize / fontFamily / spacing entries to theme.json (no need for 2.4.0).
- `useRootPaddingAwareAlignments` work (inert on classic theme; leave declared).
- Block patterns (deferred from prior plan).

---

## Resolved decisions (locked 2026-05-26)

1. **Phase B Customizer bridge: override `primary` only.** `secondary` is frozen (`#333333` mismatch with `onepress_secondary_color`'s `#00aeef` default would regress `.has-secondary-*` on existing 60k sites).
2. **Phase C/D body text refactor: skip** unless a conflict is discovered during verification. Keep SCSS literals; `_document.scss` body/h1–h6 declarations stay.
3. **Release vehicle: `2.4.1` separate tag.** Block-editor parity work (Phase 0–6 of prior plan) ships first as `2.4.0`; this plan ships on top as `2.4.1` so the primary-color convergence has its own rollback boundary and changelog focus.
4. **Phase 3 defensive PHP palette: keep.** `OnePress_Editor::get_editor_color_palette()` / `get_editor_font_sizes()` remain as fallbacks for sites that strip theme.json. They are inert in normal operation.
5. **Customizer mod scope for bridge: `onepress_primary_color` only.** Footer/menu color mods have different intent (chrome-specific) and would clutter the block palette.

---

## References

- [Layout — Theme Handbook](https://developer.wordpress.org/themes/global-settings-and-styles/settings/layout/)
- [Color — Theme Handbook](https://developer.wordpress.org/themes/global-settings-and-styles/settings/color/)
- [Typography — Theme Handbook](https://developer.wordpress.org/themes/global-settings-and-styles/settings/typography/)
- [Spacing — Theme Handbook](https://developer.wordpress.org/themes/global-settings-and-styles/settings/spacing/)
- [Global Settings & Styles (theme.json) — Block Editor Handbook](https://developer.wordpress.org/block-editor/how-to-guides/themes/global-settings-and-styles/)
- [WordPress Global Styles Reference Tables — CSS-Tricks](https://css-tricks.com/wordpress-global-styles-reference-tables/)
- [`wp_theme_json_data_theme` filter — Block Editor Handbook](https://developer.wordpress.org/reference/hooks/wp_theme_json_data_theme/)
- Live capture: `wp_get_global_stylesheet()` output for this site
