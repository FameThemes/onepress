# spec-conventions — Coding Conventions & Gotchas

Cross-cutting rules. Each one has bitten someone before.

## Sanitize input, escape output

- All Customizer settings **must** declare `sanitize_callback` — see helper list in [spec-customizer.md](spec-customizer.md#sanitizers).
- Output uses:
  - `esc_html()` for text
  - `esc_attr()` for HTML attributes
  - `esc_url()` for URLs
  - `wp_kses( $val, onepress_allowed_tags() )` for limited inline HTML (`div`, `span`, `p`, `b`, `i`, `em`, `a`)
  - `wp_kses_post()` for richer content (post-content allow-list)
- The repeater control hands raw rows to PHP — sanitize through `onepress_sanitize_repeatable_data_field()` (SVG-aware, see [../inc/sanitize.php](../inc/sanitize.php)).

## i18n

- Text domain: **`onepress`**.
- Translation files live in [../languages/](../languages/) (POT + locale files).
- WPML config: [../wpml-config.xml](../wpml-config.xml).
- Don't introduce strings without `__()` / `esc_html__()` / `_x()`.
- Plurals: `_n()`, `_nx()`.
- For machine-readable headers (font subsets, etc.) the codebase uses `_x( 'on', 'Open Sans font: on or off', 'onepress' )` so translators can disable a Google Font for unsupported scripts — keep this pattern.

## RTL

- Generated automatically by `rtlcss-webpack-plugin` (`*-rtl.css`, `*.minified-rtl.css`).
- **Do not hand-author RTL CSS** — it will be overwritten on next build.
- `body` gets `is_rtl` exposed to JS via `onepress_js_settings`.

## Customizer preview gating

Every `section-parts/section-*.php` short-circuits on `onepress_*_disable`. **Always** un-disable in the preview so editors can re-enable hidden sections:

```php
if ( onepress_is_selective_refresh() ) {
    $disable = false;
}
```

See [`onepress_is_selective_refresh()`](../inc/template-tags.php) ~line 1686.

## WooCommerce gating

- Use [`onepress_is_wc_active()`](../inc/extras.php) (~line 161) for "is WC active?" checks.
- Use `onepress_is_wc_archive()` for "are we on a WC archive?".
- The shop layout is resolved by [`onepress_get_layout()`](../inc/extras.php) (~line 189) — overridable via the `onepress_get_layout` filter.
- The shop page respects the page meta `_hide_breadcrumb` and `_hide_footer` ([../woocommerce.php](../woocommerce.php), [../footer.php](../footer.php)).
- **Never call WC functions unconditionally** — wrap them in `if ( onepress_is_wc_active() ) { … }`.

## Plus integration

- Detect Plus via `defined('ONEPRESS_PLUS_PATH')` (path constant) and `class_exists('OnePress_Plus')` (runtime).
- Plus contributes:
  - Extra front-page sections (see [spec-sections.md](spec-sections.md#plus-only-sections)).
  - Selective-refresh template parts (fallback lookup in [../inc/customizer-selective-refresh.php](../inc/customizer-selective-refresh.php)).
  - Typography render (`onepress_typography_render_style()`).
  - Extra gallery script load ([../functions.php](../functions.php) ~line 396).
- Use `onepress_add_upsell_for_section()` to add a "Get Plus" message inside a Customizer section.

## Backward Compatibility

> **OnePress has 60,000+ active installs on WordPress.org.** Every change ships to live customer sites with no staged rollout. The single most important rule of this codebase: **assume any name, key, default, hook, class, or CSS selector is depended on by someone**, and design every change around that assumption.

### Additive-only mandate

**The single hard rule: never delete or remove anything that has shipped.** Add new code alongside the old. The old code path must keep working with its original behavior.

This rule applies to:

- PHP functions (including helpers inside `if ( ! function_exists() )` blocks)
- PHP classes and methods
- Template files (`page.php`, `template-*.php`, `section-parts/section-*.php`, `template-parts/*.php`, `woocommerce.php`, `header.php`, `footer.php`, etc.)
- Customizer settings, panels, sections, controls
- Theme mods (`onepress_*`)
- Options (`onepress_*`)
- Post meta keys (`_hide_*`)
- Action and filter hooks
- Image size slugs
- Menu locations, sidebar IDs, widget areas
- CSS class names emitted by shipped templates
- JS globals (`onepress_js_settings` keys), localized objects
- Recommended plugin slugs

**Why this matters for a 60k-install theme:** removed code = silent fatal errors on customer sites if a child theme called the function, dead Customizer settings that orphan saved data, vanished hooks that child themes had hooked into, broken CSS overrides in user "Additional CSS", and broken JS in third-party integrations. None of these surface in any test we can run before release.

### The four patterns for "improving" without removing

When you'd normally reach for delete/rename/refactor, use one of these instead:

**Pattern 1 — New helper, old delegates to new** (preferred for refactors)

```php
// New, improved implementation.
if ( ! function_exists( 'onepress_get_logo_v2' ) ) {
    function onepress_get_logo_v2( $args = array() ) {
        // …new logic…
    }
}

// Old helper stays. Internally calls the new one with legacy arg shape.
if ( ! function_exists( 'onepress_get_logo' ) ) {
    function onepress_get_logo() {
        return onepress_get_logo_v2( array( 'mode' => 'legacy' ) );
    }
}
```

**Pattern 2 — Old helper untouched, new helper for new callers** (preferred when old behavior is awkward to reproduce)

Leave the old function exactly as-is. Document the new function as the recommended path going forward. Old callers (child themes, the rest of the theme) keep using the old one until they're individually migrated.

**Pattern 3 — Read both keys** (for theme mods / options / post meta)

```php
function onepress_get_hero_title() {
    // Prefer new canonical key.
    $val = get_theme_mod( 'onepress_hero_title', null );
    if ( $val !== null && $val !== '' ) {
        return $val;
    }
    // Fall back to legacy key — kept readable forever.
    return get_theme_mod( 'onepress_header_title', '' );
}
```

Never delete the old `get_theme_mod()` read. The legacy key remains in user databases.

**Pattern 4 — Fire both hooks** (for renamed actions/filters)

```php
// New hook name for new integrators.
$value = apply_filters( 'onepress_section_data', $value, $section_id );

// Old hook still fires so existing child themes keep working.
$value = apply_filters_deprecated(
    'onepress_section_args',
    array( $value, $section_id ),
    '2.4.0',
    'onepress_section_data'
);
```

### What "additive" forbids in practice

| ❌ Don't | ✅ Do instead |
|---|---|
| `unlink( section-parts/section-foo.php )` | Leave the file; if the section is gone from defaults, just stop registering it (file still loadable by child themes via `onepress_load_section`) |
| Delete `onepress_old_helper()` | Leave it. If unused inside the theme, it's still callable by child themes. |
| Rename `onepress_setup` → `onepress_init` | Add `onepress_init` that calls `onepress_setup`. Keep `onepress_setup` hooked to `after_setup_theme`. |
| Drop the `onepress-blog-small` image size | Keep registering it. Stop using it in new templates if you want, but old galleries/thumbnails depend on the slug. |
| Remove a Customizer control | Re-register it (even if hidden via `active_callback`) so saved data still validates and the setting stays readable. |
| Change a default from `'fadeIn'` to `'slideUp'` | Add a new mod `onepress_*_animation_v2` with the new default; old mod keeps its old default. |
| Delete a CSS class from a template | Keep emitting it alongside the new class (`<div class="hero-section hero-section-v2">`). |
| Remove a key from `onepress_js_settings` | Keep the key; add new ones additively. |

### When you genuinely must remove

Removals are a **last resort** and only happen in major-version releases with:

1. A **deprecation period of at least one prior major release** where the symbol is marked deprecated but still functional (uses `_deprecated_function()`, `apply_filters_deprecated()`, etc.).
2. A **migration shim** that backfills new keys from old values (see "Migrations" below).
3. An explicit **changelog entry** under "Breaking changes" naming every removed symbol.
4. A **major-version bump** of the theme (`X.0.0`, not `X.Y.Z`).
5. Sign-off documented in the commit message (`BC: breaking — removes deprecated …, migration in …`).

If any of these five conditions cannot be met, **the removal does not ship**. Add new behavior alongside the old instead.

### Naming is API

Every name you ship — function, class, hook, theme mod, CSS class, image size slug — becomes part of the public API and falls under the additive-only mandate. Pick the right name on first ship; once shipped, it's frozen.

Full conventions, prefix matrix, and the list of known frozen inconsistencies: [spec-naming.md](spec-naming.md).

### What counts as public API

All of the following are **stable public API** — renaming or removing any of them is a **breaking change** that requires a major-version bump and a migration. Treat them as immutable in normal day-to-day work:

| Surface | Examples |
|---|---|
| Theme mod keys | `onepress_hero_disable`, `onepress_gallery_display`, `onepress_disable_g_font`, every `onepress_*` setting |
| Section IDs | `hero`, `about`, `services`, `videolightbox`, `gallery`, `counter`, `features`, `team`, `news`, `contact` |
| Option keys | `onepress_sections_settings`, `onepress_actions_dismiss`, `onepress_dismiss_switch_theme_notice` |
| Post meta keys | `_hide_page_title`, `_hide_header`, `_hide_footer`, `_hide_breadcrumb` |
| Action names | `onepress_header_end`, `onepress_before_section_{id}`, `onepress_frontpage_section_parts`, etc. |
| Filter names | `onepress_get_sections`, `onepress_frontpage_sections_order`, `onepress_js_settings`, `onepress_get_layout`, etc. |
| Public function names | `onepress_*` helpers (any function defined inside `if ( ! function_exists( 'onepress_*' ) )` is **explicitly pluggable** — child themes may have redefined it) |
| Class names | `Onepress_Config`, `Onepress_Dashboard`, `OnePress_MetaBox`, `OnePress_Editor`, all `OnePress_*_Control` |
| Image size slugs | `onepress-blog-small`, `onepress-small`, `onepress-medium` — renaming orphans every thumbnail generated on user installs |
| CSS class names in templates | `.site-header`, `.hero-section`, `.section-{id}`, `.footer-social`, etc. — users target these in Additional CSS |
| Customizer panel/section IDs | Used by `wp_customize->get_section('…')` from child themes and Plus |
| Recommended plugin slugs | Surfaced in dashboard; changing the slug breaks "already installed?" detection |

### Default values are also API

A default that has shipped is part of the visual contract:

```php
// Wrong: silently changes hero animation for every existing site
get_theme_mod( 'onepress_hero_option_animation', 'fadeIn' );
// Was: 'flipInX'

// Right: keep the historical default; add a new mod if you want a new default for fresh installs
get_theme_mod( 'onepress_hero_option_animation', 'flipInX' );
```

If you genuinely need to change a default, gate it on a version marker so existing sites keep the old value:

```php
function onepress_hero_animation_default() {
    // Sites that existed before 2.4 keep the old default.
    if ( get_option( 'onepress_installed_before_2_4' ) ) {
        return 'flipInX';
    }
    return 'fadeIn';
}
```

### Pluggable functions

Any function wrapped in `if ( ! function_exists( 'onepress_*' ) )` is a **pluggable** function — child themes are expected to redefine it. Treat its **signature** (name, parameter list, return type, side effects) as a contract. You can refactor the body, but you cannot change the signature without breaking child themes that override it.

Audit for pluggable surface:

```bash
grep -rn "if ( ! function_exists( 'onepress_" inc/ functions.php
```

### Deprecation pattern

When you genuinely need to retire something, deprecate first, remove in a **far-future** major (2+ majors away):

**For a theme mod / option** — read both keys for at least one major cycle:

```php
function onepress_get_hero_title() {
    // New canonical key.
    $val = get_theme_mod( 'onepress_hero_title' );
    if ( $val !== false && $val !== '' ) {
        return $val;
    }
    // Legacy key — still honored.
    return get_theme_mod( 'onepress_header_title', '' );
}
```

**For a function:**

```php
function onepress_old_helper( $arg ) {
    _deprecated_function( __FUNCTION__, '2.4.0', 'onepress_new_helper()' );
    return onepress_new_helper( $arg );
}
```

**For a filter / action:**

```php
$value = apply_filters_deprecated(
    'onepress_old_filter',
    array( $value ),
    '2.4.0',
    'onepress_new_filter'
);
```

**For a CSS class:** keep emitting both the old and new class on the same element for at least one major.

### Migrations

If a rename is truly unavoidable, ship a one-time migration:

```php
function onepress_migrate_2_4() {
    if ( get_option( 'onepress_migrated_2_4' ) ) {
        return;
    }
    $old = get_theme_mod( 'onepress_old_key' );
    if ( $old !== false ) {
        set_theme_mod( 'onepress_new_key', $old );
        remove_theme_mod( 'onepress_old_key' );
    }
    update_option( 'onepress_migrated_2_4', 1 );
}
add_action( 'after_setup_theme', 'onepress_migrate_2_4', 20 );
```

Migrations must be **idempotent** and **safe to run on a site that never had the old value**.

### Mandatory BC check on every change

Before opening a PR or pushing a commit, answer these:

1. **Did I delete any line that defines a public symbol** (function, class, method, hook, theme mod, option, template file, CSS class, image size, JS global key)? → **Stop. Restore it. Use Pattern 1–4 above.**
2. Did I rename anything from the public-API table below? → **Stop. Rename = remove + add. Add the new name, keep the old as a delegating shim.**
3. Did I change a default that affects rendered output? → **Stop. Gate it on a version marker, or add a new setting.**
4. Did I change a pluggable function's signature? → **Stop. Add a new function; leave the old one with its original signature.**
5. Did I change HTML structure or CSS class names in shipped templates? → Keep the old classes as aliases on the same elements.
6. Did I bump the JS interface (`onepress_js_settings` shape, etc.)? → Add fields additively, never remove or repurpose.

State the BC impact explicitly in the commit message — see [spec-commits.md](spec-commits.md).

## WordPress Studio environment

This site runs via WordPress Studio (PHP WASM + SQLite). When acting on the install via CLI:

- Prefix `wp` commands with `studio wp` (see [../../../../STUDIO.md](../../../../STUDIO.md)).
- DB is SQLite — never reference `DB_NAME` / `DB_HOST` / `DB_USER` / `DB_PASSWORD` constants.
- No `FULLTEXT` indexes (use a search plugin or `LIKE`).
- Don't edit `wp-includes/` or `wp-admin/` — core changes don't persist.

## Never edit `assets/`

[../assets/](../assets/) is build output. Edit `src/`, run `npm run build`, commit both together. See [spec-build.md](spec-build.md) and [spec-commits.md](spec-commits.md).

## Never edit `node_modules/`

Even if a dep ships CRLF or has a bug — leave it. The webpack normalizer handles line endings. For bugs, patch via the build (alias, swizzle) or fork upstream.

## Release checklist

For user-visible releases:

1. Bump `Version` in [../style.css](../style.css).
2. Bump `version` in [../package.json](../package.json).
3. Add an entry to [../changelog.md](../changelog.md).
4. Run `npm run build`.
5. Commit `src/`, `assets/`, version bumps, and changelog **in one commit** (see [spec-commits.md](spec-commits.md)).
