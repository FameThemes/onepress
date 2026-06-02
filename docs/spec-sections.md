# spec-sections — Front-Page Sections

The front-page template iterates a configurable, filterable list of **sections**, each a self-contained unit of **markup + customizer settings + on/off toggle**. This is the core feature of OnePress.

## Render flow

Entry: [../template-frontpage.php](../template-frontpage.php).

1. `onepress_frontpage_before_section_parts` action fires.
2. Section IDs come from `apply_filters('onepress_frontpage_sections_order', [...])`.
3. For each ID, [`Onepress_Config::is_section_active($id)`](../inc/class-config.php) is checked.
4. [`onepress_load_section($id)`](../inc/template-tags.php) (~line 1879) loads `section-parts/section-{id}.php`, wrapping it in `onepress_before_section_{id}` / `onepress_after_section_{id}` actions.
5. The `hero` section is loaded earlier — from `onepress_header_end` via `onepress_load_hero_section()`.
6. `onepress_frontpage_after_section_parts` action fires.

If anything hooks `onepress_frontpage_section_parts`, that hook **replaces** the default loop (the theme respects whoever hooks it).

## Built-in sections

From [`Onepress_Config::get_sections()`](../inc/class-config.php):

`hero`, `about`, `services`, `videolightbox`, `gallery`, `counter`, `features`, `team`, `news`, `contact`

Each section has:

- Markup at `section-parts/section-{id}.php`
- Customizer config at `inc/customize-configs/section-{id}.php` (loaded by [customizer.php](../inc/customizer.php) **only when active**)
- A title/label in `get_sections()` used by the dots navigation

## Plus-only sections

Registered by the OnePress Plus plugin via [`Onepress_Config::get_plus_sections()`](../inc/class-config.php):

`slider`, `clients`, `cta`, `map`, `pricing`, `projects`, `testimonials`

Plus is detected via `defined('ONEPRESS_PLUS_PATH')` and `class_exists('OnePress_Plus')`. Selective-refresh partials also fall back to `ONEPRESS_PLUS_PATH` when a template part isn't in the theme (see [customizer-selective-refresh.php](../inc/customizer-selective-refresh.php)).

## Activation state

Persisted as a **single option** `onepress_sections_settings` (managed by [`Onepress_Config::save_settings()`](../inc/class-config.php)). The form lives on the admin dashboard (nonce action `onepres_save_settings`); see [spec-admin.md](spec-admin.md).

When no setting exists yet, sections default to **active** (`is_section_active()` returns `1` for an empty config).

## Sections-navigation (dots)

[`Onepress_Dots_Navigation`](../inc/class-sections-navigation.php) (singleton) renders the right-side dot navigation on the front page. For each section, it injects a per-section checkbox `onepress_sections_nav___enable` into the Customizer (sanitizer `onepress_sanitize_text`).

Filter `onepress_sections_navigation_get_sections` to add/remove dots without touching the section list itself.

## Adding a new section (child theme)

1. Add markup at `section-parts/section-foo.php`.
2. Register controls at `inc/customize-configs/section-foo.php`.
3. Append the ID via `onepress_get_sections` filter (so it shows up in the dashboard toggle list + dots nav) **and/or** `onepress_frontpage_sections_order` (so it actually renders).

Example:

```php
add_filter( 'onepress_get_sections', function ( $sections ) {
    $sections['foo'] = [
        'label'   => __( 'Section: Foo', 'mychild' ),
        'title'   => __( 'Foo', 'mychild' ),
        'default' => false,
        'inverse' => false,
    ];
    return $sections;
} );

add_filter( 'onepress_frontpage_sections_order', function ( $order ) {
    $order[] = 'foo';
    return $order;
} );
```

## Section template conventions

Every section template should:

- Read its enable/disable mod (e.g. `get_theme_mod( 'onepress_foo_disable' )`) and short-circuit.
- Wrap the short-circuit so the Customizer preview can still re-enable it:

  ```php
  if ( onepress_is_selective_refresh() ) {
      $disable = false;
  }
  ```

  See [`onepress_is_selective_refresh()`](../inc/template-tags.php) ~line 1686.

- Pull all settings via `get_theme_mod( 'onepress_*' )`.
- Echo escaped output (`esc_html`, `esc_attr`, `esc_url`, `wp_kses($val, onepress_allowed_tags())`).

## Section IDs are public API

Section IDs and `onepress_*` theme-mod keys are **stable public API**. OnePress has 60,000+ active installs — every section ID is referenced in user databases under `onepress_sections_settings`, every theme mod is filled with user customizations, and child themes hook into both. **Renaming is a breaking change** that requires a major-version bump + a migration that backfills the new key from the old.

Full BC contract: [spec-conventions.md → Backward Compatibility](spec-conventions.md#backward-compatibility).

Practical rules when working on sections:

- Adding a new section ID = safe.
- Renaming `hero`/`about`/etc. = **breaks every existing site** (they vanish from the front page; user settings stay in the DB but no longer wire to anything).
- Removing a section = breaks sites that had it active.
- Changing the default `is_section_active()` return for an empty option (currently `1` = active) = retroactively hides sections on sites that never saved the dashboard form. **Never touch this default.**
- Reordering the default section order = changes the rendered front page on sites that never customized order. Avoid; if essential, gate on a version marker.
