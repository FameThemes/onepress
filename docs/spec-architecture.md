# spec-architecture — File Map

Where each concern lives in the theme. Use this as a routing table before opening files.

| Concern | Location |
|---|---|
| Theme bootstrap, supports, enqueues | [../functions.php](../functions.php) |
| Template hierarchy roots | `../index.php`, `../home.php`, `../archive.php`, `../single.php`, `../page.php`, `../search.php`, `../404.php`, `../comments.php`, `../sidebar.php`, `../header.php`, `../footer.php` |
| Page templates | `../template-frontpage.php`, `../template-fullwidth.php`, `../template-fullwidth-stretched.php`, `../template-left-sidebar.php` |
| Loop partials | [../template-parts/](../template-parts/) — `content.php`, `content-single.php`, `content-page.php`, `content-list.php`, `content-search.php`, `content-none.php` |
| Front-page sections (markup) | [../section-parts/section-*.php](../section-parts/) |
| Customizer registration | [../inc/customizer.php](../inc/customizer.php) |
| Customizer panels/sections/settings | [../inc/customize-configs/](../inc/customize-configs/) — one file per section + global option files |
| Custom controls (alpha color, repeater, editor, …) | [../inc/customize-controls/](../inc/customize-controls/), bootstrapped by [../inc/customizer-controls.php](../inc/customizer-controls.php) |
| Customizer selective refresh | [../inc/customizer-selective-refresh.php](../inc/customizer-selective-refresh.php) |
| Template tags / rendering helpers | [../inc/template-tags.php](../inc/template-tags.php) |
| Section toggle registry | [../inc/class-config.php](../inc/class-config.php) (`Onepress_Config`) |
| Sections navigation (dots) | [../inc/class-sections-navigation.php](../inc/class-sections-navigation.php) |
| Sanitizers used by Customizer | [../inc/sanitize.php](../inc/sanitize.php) |
| Page-side meta box | [../inc/metabox.php](../inc/metabox.php) (`OnePress_MetaBox`) |
| Admin info page + recommended actions | [../inc/admin/dashboard.php](../inc/admin/dashboard.php) (`Onepress_Dashboard`) |
| Block editor integration | [../inc/admin/class-editor.php](../inc/admin/class-editor.php) (`OnePress_Editor`) |
| FontAwesome 6 icon set for picker | [../inc/list-icon-v6.php](../inc/list-icon-v6.php), assets at [../assets/fontawesome-v6/](../assets/fontawesome-v6/) |
| Misc body classes, excerpts, WC detection | [../inc/extras.php](../inc/extras.php) |
| WooCommerce template override | [../woocommerce.php](../woocommerce.php) |
| Translations | [../languages/](../languages/) (POT + locale files) |
| WPML config | [../wpml-config.xml](../wpml-config.xml) |
| Source (edited) | [../src/](../src/) — JS, SCSS, images |
| Build output (generated, do not edit) | [../assets/](../assets/) |

## Top-level scripts

- [../functions.php](../functions.php) — entrypoint; loads everything in `inc/` in this order: `class-config.php` → `sanitize.php` → `metabox.php` → `template-tags.php` → `extras.php` → `class-sections-navigation.php` → `customizer.php` → `admin/dashboard.php` → `admin/class-editor.php`.
- [../webpack.config.js](../webpack.config.js) — build pipeline; see [spec-build.md](spec-build.md).
- [../Gruntfile.js](../Gruntfile.js) — kept for ZIP packaging only; not used for code builds.
