# spec-customizer — Customizer, Theme Supports, Sidebars

Settings live in the WordPress Customizer (no separate options page outside the dashboard form). Everything is a `theme_mod` with the `onepress_` prefix.

## Registration

Entrypoint: [`onepress_customize_register()`](../inc/customizer.php) — hooked on `customize_register`. It:

1. Loads custom control classes via [../inc/customizer-controls.php](../inc/customizer-controls.php).
2. Switches `blogname`, `blogdescription`, `header_textcolor` to `postMessage` transport.
3. Fires `onepress_customize_before_register` action.
4. Loads each global option file under [../inc/customize-configs/](../inc/customize-configs/): `site-identity`, `options`, `options-global`, `options-colors`, `options-header`, `options-navigation`, `options-sections-navigation`, `options-page`, `options-blog-posts`, `options-single`, `options-footer`.
5. For each active section ([`Onepress_Config::is_section_active()`](../inc/class-config.php)), loads `inc/customize-configs/section-{id}.php`.
6. Loads `section-upsell.php` (Plus marketing).
7. Fires `onepress_customize_after_register` action.
8. If WooCommerce is active, bumps the WC panel priority to 300 (sits at the bottom).

## Reading settings

All theme options use `get_theme_mod( 'onepress_*' )`:

```php
$disable = get_theme_mod( 'onepress_hero_disable' );
$style   = get_theme_mod( 'onepress_gallery_display', 'grid' ); // with default
```

## Custom controls

Located in [../inc/customize-controls/](../inc/customize-controls/):

| Class | File | Use case |
|---|---|---|
| `OnePress_Alpha_Color_Control` | `control-color-alpha.php` | Color picker with alpha channel |
| `OnePress_Category_Control` | `control-category.php` | Category checkboxes (for news section) |
| `OnePress_Editor_Custom_Control` | `control-editor.php` | TinyMCE / wp.editor field |
| `OnePress_Media_Control` | `control-media.php` | Image/video media picker |
| `OnePress_Media_Url_Control` | `control-media.php` | Media picker returning URL only |
| `OnePress_Misc_Control` | `control-misc.php` | Custom HTML messages, upsells, dividers |
| `OnePress_Pages_Control` | `control-pages.php` | Page selector |
| `Onepress_Customize_Repeatable_Control` | `control-repeater.php` | Repeatable rows (team members, features, slides) — SVG/icon-aware |
| `OnePress_Theme_Support` | `control-theme-support.php` | Read-only "feature available?" notice |
| `One_Press_Textarea_Custom_Control` | `control-custom-textarea.php` | Multi-line textarea |
| `OnePress_Section_Plus` | `section-plus.php` | Customizer **section** subclass that shows a Plus upsell badge |

Plus a helper [`onepress_add_upsell_for_section($wp_customize, $section_id)`](../inc/customizer.php) that injects a "Upgrade to Plus" message at the bottom of a section. Suppress globally with filter `onepress_add_upsell_for_section`.

## Sanitizers

All settings must declare `sanitize_callback`. Common helpers (in [../inc/sanitize.php](../inc/sanitize.php)):

| Function | For |
|---|---|
| `onepress_sanitize_text` | Plain text |
| `onepress_sanitize_html_input` | Limited inline HTML |
| `onepress_sanitize_checkbox` | Checkbox (0/1) |
| `onepress_sanitize_select` | Select (validates against control choices) |
| `onepress_sanitize_number` | Numeric |
| `onepress_sanitize_hex_color` | `#rrggbb` |
| `onepress_sanitize_color_alpha` | `rgba()`/`hsla()` with alpha |
| `onepress_sanitize_css_color` | Any safe CSS `<color>` (incl. `var()`, modern color funcs) — XSS-hardened |
| `onepress_sanitize_css` | CSS code blob |
| `onepress_sanitize_image` | Attachment URL/ID |
| `onepress_sanitize_file_url` | File URL |
| `onepress_sanitize_repeatable_data_field` | Rows from repeater control (handles SVG icons) |
| `onepress_sanitize_news_layout` / `onepress_sanitize_news_grid_columns` | News section layout/columns |

Validators (`validate_callback`):

- `onepress_hero_fullscreen_callback`
- `onepress_gallery_source_validate`

## Selective refresh

[../inc/customizer-selective-refresh.php](../inc/customizer-selective-refresh.php) registers partials so the preview re-renders without a full reload. Two things to remember:

1. In any section template, wrap "is this disabled?" checks with:

   ```php
   if ( onepress_is_selective_refresh() ) {
       $disable = false;
   }
   ```

2. Template-part lookup falls back to `ONEPRESS_PLUS_PATH` if the template isn't in the theme (Plus integration).

Live preview JS: `src/admin/customizer-liveview.js` → `assets/admin/customizer-liveview.js`, enqueued by `onepress_customize_preview_js()` with deps `customize-preview`, `customize-selective-refresh`.

Customizer-only controls JS: `src/admin/customizer.js` + `src/admin/customizer/*` (alpha color, repeater, icon picker, modal editor, plus-section upsell).

## Icon picker

`customize_controls_enqueue_scripts` localizes `C_Icon_Picker` with FontAwesome 6 metadata read from [../inc/list-icon-v6.php](../inc/list-icon-v6.php). Filter `c_icon_picker_js_setup` to add fonts or change behavior.

---

## Theme supports

Declared in [`onepress_setup()`](../functions.php):

- `title-tag`
- `post-thumbnails`
- `automatic-feed-links`
- `html5` (search-form, comment-form, comment-list, gallery, caption)
- `custom-logo` (flex, 160×36)
- `customize-selective-refresh-widgets`
- `editor-styles`, `align-wide`, `wp-block-styles`
- `woocommerce` + `wc-product-gallery-zoom`, `wc-product-gallery-lightbox`, `wc-product-gallery-slider`
- `recommend-plugins` (see below)
- `post-type-support('page', 'excerpt')` — adds excerpt box on pages

## Recommended plugins

Surfaced on the admin dashboard:

- `wpforms-lite`
- `famethemes-demo-importer`
- When WooCommerce is active: `currency-switcher-for-woocommerce`, `bulk-edit-for-woocommerce`

## Image sizes

Registered in [`onepress_setup()`](../functions.php):

- `onepress-blog-small` — 300×150 cropped
- `onepress-small` — 480×300 cropped
- `onepress-medium` — 640×400 cropped

## Menu locations

- `primary`

## Sidebars

Registered in [`onepress_widgets_init()`](../functions.php):

- `sidebar-1` — main sidebar
- `sidebar-shop` — only when WooCommerce is active
- `footer-1` … `footer-4` — footer columns

## Dynamic `$content_width`

Default 800, driven by theme mod `single_layout_content_width`. Filter with `onepress_content_width`.
