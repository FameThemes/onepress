# spec-build — Build Pipeline & Asset Loading

Covers how source under `src/` becomes the shipped `assets/`, and how PHP enqueues those bundles.

## Tooling

`@wordpress/scripts` (webpack 5) + Sass.

The legacy [../Gruntfile.js](../Gruntfile.js) is **kept for ZIP packaging only** — do **not** use it for code builds.

```bash
npm install
npm run dev      # watch mode (unminified, source maps)
npm run build    # production (.minified.* + RTL)
npm run lint:js  # ESLint
npm run lint:css # Stylelint
```

## Entry points

Declared in [../webpack.config.js](../webpack.config.js):

| Source | Output |
|---|---|
| `src/frontend/index.js` | `assets/frontend/theme.js` |
| `src/frontend/libs/gallery/isotope.js` | `assets/frontend/gallery-isotope.js` |
| `src/frontend/libs/gallery/jquery.justified.js` | `assets/frontend/gallery-justified.js` |
| `src/frontend/libs/gallery/owl.carousel.js` | `assets/frontend/gallery-carousel.js` |
| `src/frontend/lightgallery.js` | `assets/frontend/lightgallery.js` |
| `src/admin/admin.js` | `assets/admin/admin.js` |
| `src/admin/customizer.js` | `assets/admin/customizer.js` |
| `src/admin/customizer-liveview.js` | `assets/admin/customizer-liveview.js` |
| `src/frontend/styles/editor.scss` | `assets/admin/editor.css` |

Production builds emit `*.minified.js` / `*.minified.css`. PHP picks the variant via `WP_DEBUG` (see [`onepress_load_build_script()`](../functions.php) at ~line 271).

## RTL

RTL CSS is auto-emitted by `rtlcss-webpack-plugin` (`*-rtl.css`, `*.minified-rtl.css`). **Never hand-author `*-rtl.css`** — it will be overwritten.

## Images

`src/images/` is copied to `assets/images/` by `CopyWebpackPlugin`. Place new theme images under `src/images/` and rebuild.

## Line-ending normalization

[../webpack.config.js](../webpack.config.js) installs `normalizeLineEndingsPlugin` — every emitted `.js` is rewritten to LF before disk write. This is the only defense against CRLF-shipping npm dependencies. **Do not remove it.** See [spec-line-endings.md](spec-line-endings.md).

## Enqueuing convention

Use [`onepress_load_build_script($key, $deps, $is_admin)`](../functions.php) to enqueue anything emitted by webpack. It:

1. Reads `assets/{frontend|admin}/{key}.asset.php` for the dependency array and version hash.
2. Auto-resolves `.minified` in non-debug environments.
3. Registers handle `onepress-{key}` (the `theme` key uses style handle `onepress-style`).

Inline CSS goes through [`onepress_custom_inline_style()`](../inc/template-tags.php) → attached to `onepress-style`.

Front-end JS settings are exposed as the global `onepress_js_settings` via `wp_localize_script` and filtered through `onepress_js_settings` ([functions.php](../functions.php) ~line 417).

## Conditional gallery loading

Gallery scripts are loaded conditionally based on the `onepress_gallery_display` theme mod:

- `grid` (default) — no extra script
- `isotope` / `masonry` — `gallery-isotope`
- `justified` — `gallery-justified`
- `slider` / `carousel` — `gallery-carousel`

Gallery scripts are **skipped on WooCommerce pages**. Lightgallery is always enqueued on non-shop pages.

## Google Fonts

Raleway + Open Sans loaded from [`onepress_fonts_url()`](../functions.php). Setting the theme mod `onepress_disable_g_font`:

- Removes the stylesheet.
- Blocks runtime-injected font requests via `onepress_block_all_js_google_fonts` (intercepts `head.insertBefore` for `fonts.googleapis.com` / `fonts.gstatic.com`).

## Never edit `assets/`

[../assets/](../assets/) is build output. Edit `src/`, run `npm run build`, commit both together. See [spec-commits.md](spec-commits.md).
