# Theme migrations (`inc/migrate/`)

## Layout

- **`inc/migrate/bootstrap.php`** — loads migration scripts and registers hooks.
- **`inc/migrate/typography-from-onepress-plus.php`** — Plus typography → theme theme mods: **copy runs every request** (priority 5) until each destination is non-empty; **color promotion + completion option** run once (priority 6) when `onepress_migrate_from_onepress_plus` is not yet the done value.

Add new one-shot migrations as separate PHP files under `inc/migrate/` and load them from the bootstrap (or a small loader pattern).

## Copy-only policy (no erasing source data)

- **Do not** remove or clear **source** theme mods or options when moving to new keys. Use **`set_theme_mod` / `update_option` on destinations only**; keep legacy keys intact so nothing is lost and rollbacks remain possible.
- **Destination normalization** is allowed: after copying a value into a new key, you may adjust the **destination** payload to match the new schema (e.g. copy `color` from typography JSON into a Site Colors theme mod, then remove the `color` key from **that same destination** typography JSON — not from Plus source mods).

## One option for “already migrated”

For the **OnePress Plus → theme** typography migration bundle, use exactly one WordPress option:

- **Name:** `onepress_migrate_from_onepress_plus`
- **Value when done:** **`'2'`** (see `onepress_migrate_from_onepress_plus_done_value()` in `typography-from-onepress-plus.php`). Bump this when adding new copy rows. A legacy **`'1'`** value is treated as incomplete so the bundle runs once more.

**Plus → theme typography theme mod map** (single source of truth: `onepress_migrate_typography_plus_copy_rows()`). **Sources** must match `plugins/onepress-plus/inc/typography/auto-apply.php` only (not `onepress_typo_section_*`).

| Plus (source, auto-apply order) | Theme (destination) |
|--------------------------------|---------------------|
| `onepress_typo_p` | `onepress_typo_paragraphs` |
| `onepress_typo_site_title` | `onepress_typo_branding_title` |
| `onepress_typo_site_tagline` | `onepress_typo_branding_tagline` |
| `onepress_typo_menu` | `onepress_typo_nav` |
| `onepress_hero_heading` | `onepress_typo_hero_heading` |
| `onepress_typo_heading` | `onepress_typo_headings` |
| `onepress_slider_slide_typo_title` | `onepress_typo_slider_slide_title` |
| `onepress_slider_slide_typo_content` | `onepress_typo_slider_slide_content` |

Rows with a linked Site Colors key promote embedded `color` into `onepress_typo_*_color` mods (see the same function).

Do not add parallel flags for the same flow.

To **force re-migration**, remove `onepress_migrate_from_onepress_plus` from the options table.

To **skip** the migration (e.g. local tooling), use:

```php
add_filter( 'onepress_migrate_enable_from_onepress_plus', '__return_false' );
```

## `functions.php`

The theme should `require` **`inc/migrate/bootstrap.php`** after dependencies the migrations need (e.g. typography sanitize in `inc/customize-controls/typography/fonts.php`).
