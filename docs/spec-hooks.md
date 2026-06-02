# spec-hooks — Actions, Filters, Loop Props

Use this as the canonical hook reference for child themes and integrations.

## Custom actions

| Action | Where it fires |
|---|---|
| `onepress_before_site_start` / `onepress_after_site_end` | Outside `#page` in [../header.php](../header.php) / [../footer.php](../footer.php) |
| `onepress_header_end` | After the site header; default callback `onepress_load_hero_section` loads the hero |
| `onepress_frontpage_before_section_parts` | Before the front-page section loop |
| `onepress_frontpage_section_parts` | **Replaces** the default loop if anything hooks it |
| `onepress_frontpage_after_section_parts` | After the front-page section loop |
| `onepress_before_section_{id}` / `onepress_after_section_{id}` | Around a specific section |
| `onepress_before_section_part` / `onepress_after_section_part` | Around any non-hero section |
| `onepress_page_before_content` | Before page/WC content; default callback prints page title via `onepress_display_page_title` |
| `onepress_before_site_info` | Before footer site-info block |
| `onepress_footer_site_info` | Inside footer site-info block; renders the credit line |
| `onepress_site_end` | At the very end of `#page` |
| `onepress_customize_before_register` / `onepress_customize_after_register` | Customizer wiring extension points |

## Custom filters

| Filter | Purpose |
|---|---|
| `onepress_frontpage_sections_order` | Reorder or restrict front-page sections |
| `onepress_get_sections` | Add/remove section definitions |
| `onepress_sections_navigation_get_sections` | Add/remove dots-nav entries |
| `onepress_content_width` | Override the dynamic `$content_width` |
| `onepress_js_settings` | Extend the localized `onepress_js_settings` object |
| `onepress_loop_get_prop` | Intercept loop-scoped properties (excerpt type/length, etc.) |
| `onepress_get_layout` | Override page/WC layout (`right-sidebar`, `left-sidebar`, `no-sidebar`, `fullwidth`) |
| `c_icon_picker_js_setup` | Customize icon-picker fonts/icons |
| `onepress_add_upsell_for_section` | Suppress Plus upsell rows per section |

## Loop properties

Use these to pass per-loop / per-section render hints without polluting globals:

- [`onepress_loop_set_prop( $prop, $value )`](../functions.php) — ~line 525
- [`onepress_loop_get_prop( $prop, $default = false )`](../functions.php) — ~line 542
- `onepress_loop_remove_prop( $prop )`

Common props read by partials:

- `excerpt_type` — `excerpt` / `more_tag` / `content` / `''` (uses post excerpt or trimmed content)
- `excerpt_length` — integer word count

Set in section templates before calling `the_post()` / template parts, then remove after the loop.

## Hook recipes

**Replace the default front-page loop entirely:**

```php
add_action( 'onepress_frontpage_section_parts', function () {
    onepress_load_section( 'hero' );
    onepress_load_section( 'about' );
    onepress_load_section( 'contact' );
} );
```

**Inject extra markup after the hero:**

```php
add_action( 'onepress_after_section_hero', function () {
    echo '<div class="hero-promo">…</div>';
} );
```

**Force a specific layout on the shop page:**

```php
add_filter( 'onepress_get_layout', function ( $layout ) {
    return is_shop() ? 'no-sidebar' : $layout;
} );
```
