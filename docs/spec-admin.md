# spec-admin — Page Meta Box & Theme Dashboard

Admin-side surfaces shipped by the theme: a per-page meta box and the theme info page.

## Page meta box

[`OnePress_MetaBox`](../inc/metabox.php) adds a **Page Settings** sidebar metabox to the `page` post type with three flags. Values are stored as post meta. Nonce action: `onepress_page_settings`.

| Meta key | Effect |
|---|---|
| `_hide_page_title` | Adds body class `hiding-page-title`; templates respect it when rendering the page title |
| `_hide_header` | Suppresses the site header (read by [`onepress_header()`](../inc/template-tags.php) ~line 255) |
| `_hide_footer` | Suppresses the site footer (read by [../footer.php](../footer.php), also honored for the WC shop page) |
| `_hide_breadcrumb` | Suppresses the WC breadcrumb on the shop page (read by [../woocommerce.php](../woocommerce.php)) |

When adding template behavior that should respect "hide" toggles, read these meta keys directly.

## Theme dashboard

[`Onepress_Dashboard`](../inc/admin/dashboard.php) (singleton) registers an info page under **Appearance → About OnePress** at `themes.php?page=ft_onepress`.

### Responsibilities

- Renders tabs incl. **Recommended Actions** (dismissable; persisted in option `onepress_actions_dismiss`).
- Handles the **section toggle form** — nonce field `onepress_settings_nonce`, action `onepres_save_settings`. On submit it calls [`Onepress_Config::save_settings()`](../inc/class-config.php), which writes the option `onepress_sections_settings`.
- Shows the **"switch theme" admin notice** (dismissal stored in option `onepress_dismiss_switch_theme_notice`).
- Resets recommended-action dismissals when the theme is switched (`switch_theme` hook).
- Exposes recommended-action counts to the Customizer via the localized `onepress_customizer_settings` object:

  ```js
  {
    number_action: <int>,                       // remaining actions
    is_plus_activated: 'y' | 'n',               // class_exists('OnePress_Plus')
    action_url: '<admin>/themes.php?page=ft_onepress&tab=recommended_actions'
  }
  ```

### Saving options safely

- Nonces are checked on every POST handler. **Never POST to dashboard endpoints without `wp_nonce_field( 'onepres_save_settings', 'onepress_settings_nonce' )`.**
- Inputs are sanitized through [../inc/sanitize.php](../inc/sanitize.php) helpers — see [spec-customizer.md](spec-customizer.md#sanitizers).

## Block editor integration

[`OnePress_Editor`](../inc/admin/class-editor.php) adds:

- An `editor.css` injected into the block editor via `block_editor_settings_all` (or `block_editor_settings` for WP < 5.8). Source: `src/frontend/styles/editor.scss`.
- An admin-ajax action `onepress_load_editor_style` that returns the CSS file (used by the iframe-rendered post editor).
- Typography (when `onepress_typography_render_style()` exists, provided by Plus) — registers the font stylesheet and inlines per-element CSS via `wp_add_inline_style( 'wp-edit-post', … )`.
- Block-editor assets registered on `enqueue_block_editor_assets`.

## Hooks/options reference (admin side)

| Option / hook | Purpose |
|---|---|
| Option `onepress_sections_settings` | Active section flags (managed by `Onepress_Config`) |
| Option `onepress_actions_dismiss` | Dismissed recommended actions |
| Option `onepress_dismiss_switch_theme_notice` | "Switch theme" notice dismissed |
| Nonce `onepres_save_settings` | Dashboard section-toggle form |
| Nonce `onepress_page_settings` | Page meta box save |
| Admin URL | `themes.php?page=ft_onepress` |
