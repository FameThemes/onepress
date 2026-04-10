# OnePress theme architecture

High-level map of the theme codebase, build pipeline, and Customizer integration. For coding conventions, see `.cursor/rules/` and `.claude/`.

## Entry points

| Area | Role |
|------|------|
| **`functions.php`** | Theme bootstrap: constants, `after_setup_theme`, widgets, **`onepress_load_build_script()`** (registers built JS/CSS from `assets/`), requires core `inc/*` files. |
| **`inc/customizer.php`** | `customize_register` hook: loads **`inc/customizer-controls.php`**, registers panels/sections/settings; enqueues **`customizer-liveview`** for the preview iframe. |
| **`inc/customizer-controls.php`** | Loads each control under **`inc/customize-controls/{name}/{name}.php`**; enqueues **`customizer`** bundle + localized data (`ONEPRESS_CUSTOMIZER_DATA`, dynamic blocks config, etc.). |
| **`style.css`** | Theme metadata (required by WordPress); main front-end appearance comes from built **`assets/frontend/theme*.css`**. |

## Directory layout

```
onepress/
├── assets/                 # Built output (do not edit by hand)
│   ├── frontend/           # theme, gallery-*, lightgallery, *.asset.php
│   └── admin/              # customizer, customizer-liveview, admin, editor
├── inc/
│   ├── customize-controls/ # One folder per control → customize-controls-php.mdc
│   ├── customize-configs/  # Optional demo / example option registrations
│   ├── customize-dynamic-sections.php  # Dynamic “option blocks” API + JS configs
│   ├── customizer.php
│   ├── customizer-controls.php
│   ├── sanitize.php
│   ├── class-config.php
│   ├── admin/
│   └── …                   # template-tags, metabox, WooCommerce, etc.
├── src/                    # Source for webpack (@wordpress/scripts)
│   ├── frontend/           # index.js → theme bundle; styles (SCSS); vendor libs
│   └── admin/              # customizer.js, customizer.scss, React controls, liveview
├── template-parts/, *.php  # Front-end templates (hierarchy)
├── languages/              # Text domain: onepress
├── .cursor/rules/          # Cursor AI rules
└── .claude/                # Shared docs for AI (English)
```

## Build pipeline

- **Tooling:** `package.json` → **`npm run build`** runs **`wp-scripts build`** with **`webpack.config.js`**.
- **Entries (admin):** `src/admin/customizer.js` (+ `customizer.scss`), `customizer-liveview.js`, `admin.js`, `src/frontend/styles/editor.scss` → `assets/admin/*` with optional **`.minified`** suffix when `WP_DEBUG` is off (see `onepress_load_build_script()`).
- **Entries (frontend):** `src/frontend/index.js`, gallery chunks, lightgallery → `assets/frontend/*`.
- **After changing `src/`:** run **`npm run build`** before shipping or testing built assets.

## Customizer: PHP ↔ JS

1. **Control class** lives in **`inc/customize-controls/{control}/{control}.php`** (subclasses `WP_Customize_Control`, sets `$type`, `render_content()` or script templates as needed).
2. **Heavy UI** (React) is bundled in **`src/admin/customizer.js`** / partials under **`src/admin/customizer/**`**; PHP enqueues the shared **`customizer`** handle and may print a mount node or inline config.
3. **Preview-only** logic uses **`src/admin/customizer-liveview.js`** → **`customizer-liveview`** in the preview iframe.
4. **Styles:** `src/admin/customizer.scss` imports partials (typography, spacing, slider, background, …); aligns with **`admin-src-scss.mdc`** / **`scss-css.mdc`**.
5. **Dynamic option blocks:** **`inc/customize-dynamic-sections.php`** registers settings/sections; **`src/admin/customizer/dynamic-sections.js`** + **`ONEPRESS_DYNAMIC_BLOCKS`** (localized from PHP).

## Sanitization & options

- Shared sanitizers: **`inc/sanitize.php`** (and helpers next to some controls).
- Theme mods vs options follow existing patterns in **`inc/customizer.php`** and config files under **`inc/customize-configs/`** (demos/examples).

## Related documentation

| Topic | Location |
|-------|----------|
| WordPress Coding Standards | `.cursor/rules/wordpress-coding-standards.mdc`, `.claude/wordpress-coding-standards.md` |
| Control folder layout | `.cursor/rules/customize-controls-php.mdc`, `.claude/customize-controls-structure.md` |
| CSS / class naming | `.cursor/rules/scss-css.mdc`, `.cursor/rules/php-js-classes.mdc`, `.claude/css-and-class-naming.md` |
| Admin SCSS utilities | `.cursor/rules/admin-src-scss.mdc`, `.claude/admin-scss.md` |
