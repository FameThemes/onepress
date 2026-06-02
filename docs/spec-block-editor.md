# spec-block-editor — Block Editor Integration

OnePress is a **classic theme** with a "Gutenberg-friendly" editor integration: posts edited in the block editor render visually identical (or very close) to the published frontend.

OnePress is **not** a block theme — there is no `theme.json`, no `templates/`, no `parts/`. Front-end templating remains in classic PHP partials. See [spec-architecture.md](spec-architecture.md).

---

## Overall architecture

| Layer | Where | Role |
|---|---|---|
| Theme supports | [functions.php](../functions.php) `onepress_setup()` | `editor-styles`, `align-wide`, `wp-block-styles`, `responsive-embeds`, `custom-line-height`, `custom-spacing`, `custom-units` |
| Editor stylesheet (classic channel) | [functions.php](../functions.php) `add_editor_style( 'assets/admin/editor.css', onepress_fonts_url() )` | Loads `editor.css` into the iframe head |
| Editor stylesheet (modern channel) | [`OnePress_Editor::editor_settings()`](../inc/admin/class-editor.php) | Injects same CSS via `block_editor_settings_all` filter — both channels load identical CSS (intentional duplication for resilience across WP versions) |
| Dynamic color palette | `OnePress_Editor::get_editor_color_palette()` | Read from Customizer theme mods (`onepress_primary_color`, `onepress_secondary_color`) each request |
| Dynamic font sizes | `OnePress_Editor::get_editor_font_sizes()` | Theme-aligned scale (13/14/18/24/32 px) |
| Content-width constraint | `OnePress_Editor::css()` | Inline CSS: `.editor-styles-wrapper .wp-block:not([data-align="full"]):not([data-align="wide"]) { max-width: <single_layout_content_width>px; }` |
| Plus typography | `OnePress_Editor::assets()` | Pulled from `onepress_typography_render_style()` when OnePress Plus is active |
| SCSS source | `src/frontend/styles/editor.scss` → imports `_variables`, `_document`, `_contents`, `_gutenberg` | Same partials as `style.scss`; the editor inherits all frontend typography |
| Parity rules | `src/frontend/styles/_gutenberg.scss` | The single source of truth for editor ↔ frontend visual parity |

---

## How parity works

The editor iframe `<body>` carries the class `.editor-styles-wrapper`. The frontend wraps post content in `.entry-content`. Two strategies share rules between them:

1. **Bare `.wp-block-*` selectors.** Block classes are specific enough to apply identically in both contexts without ancestor prefixes. Used for visual styling (button colors, table borders, etc.).
2. **Companion mirrors `.editor-styles-wrapper X`.** When a rule lives under `.entry-content X` in `_contents.scss` (and the rule must also apply in the editor), `_gutenberg.scss` mirrors it under `.editor-styles-wrapper X`. Used for typography baselines (blockquote, lists, code).

**Body class injection** (e.g. setting `editor_settings['body_class'] = 'entry-content'`) is intentionally **not used** — the API has shifted across WP 5.x/6.x and is brittle. Selector grouping is the stable approach.

See the header comment in [_gutenberg.scss](../src/frontend/styles/_gutenberg.scss) for the canonical pattern.

---

## CSS Variable Integration (since 2.4.1)

theme.json values flow into theme stylesheets via WP's auto-emitted CSS custom properties.

### Variables consumed by theme SCSS

| theme.json declaration | Emitted CSS variable | Consumed in |
|---|---|---|
| `settings.layout.contentSize` | `--wp--style--global--content-size` | `.entry-content > *:not(.alignwide):not(.alignfull):not(.alignleft):not(.alignright)` max-width |
| `settings.layout.wideSize` | `--wp--style--global--wide-size` | `.entry-content > .alignwide` / `.editor-styles-wrapper .wp-block.alignwide` max-width |
| `settings.color.palette[slug=primary]` | `--wp--preset--color--primary` | `.entry-content blockquote` border-left, `.editor-styles-wrapper a` color, `.wp-block-button__link` bg, `.wp-block-button.is-style-outline` color/border, `.highlight` color, `.nav-links a:hover` bg, comment `.cat-links a:hover` color |
| `settings.color.palette[slug=secondary]` | `--wp--preset--color--secondary` | **Not consumed** — frozen mismatch with SCSS `$secondary` value (see [Known inconsistencies](#known-inconsistencies)) |

### Consumption pattern

Every var-consuming rule uses the WP variable with the SCSS literal as fallback:

```scss
background-color: var(--wp--preset--color--primary, #{variables.$primary});
```

This way:
- theme.json updates propagate automatically
- Customizer-driven theme.json overrides (see bridge below) propagate
- Sites that strip theme.json fall back to SCSS literal (no breakage)

### Customizer → theme.json bridge

[`inc/theme-json-bridge.php`](../inc/theme-json-bridge.php) registers a `wp_theme_json_data_theme` filter that overrides the **`primary` palette entry** at runtime with the value of the `onepress_primary_color` Customizer mod. The result:

- `--wp--preset--color--primary` follows Customizer
- `.has-primary-color` / `.has-primary-background-color` (utility classes emitted by WP block-library CSS) automatically use the Customizer color
- theme.json's static `#03c4eb` becomes the default (when mod is unset)

**Scope:** only `primary` is bridged. `secondary` is **not** overridden because theme.json `secondary = #333333` does not match `onepress_secondary_color`'s `#00aeef` default — overriding would visibly rebrand existing sites' `.has-secondary-*` content.

**Filter:** `onepress_filter_theme_json_palette` — hooked to `wp_theme_json_data_theme`. Extend by hooking the same filter at a later priority and returning a modified `WP_Theme_JSON_Data` object.

### Content-size override path

When a user sets the `single_layout_content_width` Customizer mod, [`onepress_custom_inline_style()`](../inc/template-tags.php) (and `OnePress_Editor::css()` for the editor canvas) emit both:

1. **`:root { --wp--style--global--content-size: <value>px; }`** — overrides the WP global var, propagating to every theme.json-aware rule.
2. **`.single-post .site-main, .single-post .entry-content > *:not(.alignwide):not(.alignfull) { max-width: <value>px; }`** — retained for back-compat with sites that depend on the exact selector chain.

The two paths emit the same value; the legacy explicit rule serves as defense-in-depth when CSS vars are unavailable.

---

## Architecture: theme.json is the source of truth

OnePress ships [`theme.json`](../theme.json) (since pre-2.4.0). At runtime, WP merges it into `editor_settings`:

- `editor_settings['colors']` ← theme.json `settings.color.palette` (8 colors, slugs `primary`, `secondary`, `heading`, `text`, `border`, `light`, `white`, `black`)
- `editor_settings['fontSizes']` ← theme.json `settings.typography.fontSizes` (6 sizes, slugs `small` … `xx-large`)
- `editor_settings['__experimentalFeatures']` ← all of theme.json `settings.*`

The PHP-side methods (`OnePress_Editor::get_editor_color_palette()` / `get_editor_font_sizes()`) are **defensive fallbacks** — they only fire if the `colors` / `fontSizes` keys are empty (e.g. a child theme has stripped theme.json or `appearanceTools`). In normal operation theme.json wins and the PHP palette is inert.

**Practical implication:** when editing theme palette / sizes, edit [`theme.json`](../theme.json) primarily. PHP methods exist for integrators who programmatically need the data or to handle the no-theme.json edge case.

## theme.json reference

theme.json `settings`:

| Key | Value | Notes |
|---|---|---|
| `appearanceTools` | `true` | Enables border/spacing/typography UI; subsumes `custom-line-height`, `custom-spacing`, parts of `custom-units` |
| `useRootPaddingAwareAlignments` | `true` | Modern WP layout setting (mostly inert on classic themes) |
| `layout.contentSize` | `1110px` | Matches SCSS `$grid` |
| `layout.wideSize` | `1230px` | Matches SCSS `$width` |
| `color.defaultPalette` | `false` | Drop WP defaults |
| `color.defaultGradients` | `false` | Drop WP gradient defaults |
| `color.palette` | 8 colors (see below) | Frozen public slugs |
| `spacing.units` | `px, em, rem, %, vw, vh` | |
| `spacing.spacingScale.steps` | `7` | |
| `typography.fluid` | `true` | Fluid type scaling |
| `typography.customFontSize` | `true` | Allow custom px |
| `typography.defaultFontSizes` | `false` | Drop WP defaults |
| `typography.fontFamilies` | 4 families | Slugs `open-sans`, `raleway`, `system`, `monospace` |
| `typography.fontSizes` | 6 sizes | Slugs `small` … `xx-large` |

theme.json `styles` defines body color/font, link/button/heading typography and per-h1–h6 sizes. These map to WP's CSS variables (`var(--wp--preset--color--primary)` etc.) so user content can reference them consistently.

## Color palette

Eight slugs, dynamically resolved per request:

The **theme.json palette** (what users actually see in the editor):

| Slug | Color | CSS classes |
|---|---|---|
| `primary` | `#03c4eb` | `.has-primary-color`, `.has-primary-background-color` |
| `secondary` | `#333333` | `.has-secondary-*` — ⚠ see [Known inconsistency](#known-inconsistencies) |
| `heading` | `#333333` | `.has-heading-*` |
| `text` | `#777777` | `.has-text-*` |
| `border` | `#e9e9e9` | `.has-border-*` |
| `light` | `#f8f9f9` | `.has-light-*` (slug `light`, SCSS variable `$meta`) |
| `white` | `#ffffff` | `.has-white-*` |
| `black` | `#000000` | `.has-black-*` |

The **PHP fallback palette** (`OnePress_Editor::get_editor_color_palette()`, only active if theme.json is bypassed):

| Slug | Source | Default |
|---|---|---|
| `onepress-primary` | `get_theme_mod( 'onepress_primary_color' )` | `#03c4eb` |
| `onepress-secondary` | `get_theme_mod( 'onepress_secondary_color' )` | `#00aeef` |
| `onepress-heading` | constant | `#333333` |
| `onepress-text` | constant | `#777777` |
| `onepress-border` | constant | `#e9e9e9` |
| `onepress-meta` | constant | `#f8f9f9` |
| `onepress-white` | constant | `#ffffff` |

**Filter:** `onepress_editor_color_palette` — receives the array, returns modified array.

```php
add_filter( 'onepress_editor_color_palette', function ( $palette ) {
    $palette[] = array(
        'name'  => __( 'Accent', 'mychild' ),
        'slug'  => 'mychild-accent',
        'color' => '#ff5500',
    );
    return $palette;
} );
```

**Override rule:** if a child theme has already set `colors` (e.g. via `add_theme_support( 'editor-color-palette', … )` or another `block_editor_settings_all` filter), OnePress does **not** overwrite — `editor_settings()` only injects when `empty( $editor_settings['colors'] )`. Child themes that customize win automatically.

**API stability:** the slugs above are part of the additive-only contract — user posts may already reference `.has-onepress-primary-color` in saved markup. Never rename a shipped slug. See [spec-conventions.md → Additive-only mandate](spec-conventions.md#additive-only-mandate).

---

## Font sizes

Five steps:

| Slug | px | CSS class |
|---|---|---|
| `small` | 13 | `.has-small-font-size` |
| `normal` | 14 | `.has-normal-font-size` |
| `medium` | 18 | `.has-medium-font-size` |
| `large` | 24 | `.has-large-font-size` |
| `huge` | 32 | `.has-huge-font-size` |

**Filter:** `onepress_editor_font_sizes` — same shape and override semantics as the color palette filter.

```php
add_filter( 'onepress_editor_font_sizes', function ( $sizes ) {
    $sizes[] = array(
        'name' => __( 'Display', 'mychild' ),
        'slug' => 'display',
        'size' => 48,
    );
    return $sizes;
} );
```

---

## Theme supports (since 2.4.0)

| Support | Effect |
|---|---|
| `responsive-embeds` | WP wraps embeds in `<figure>` with aspect-ratio CSS; OnePress also styles `.wp-block-embed.is-type-video` with a 16:9 ratio fallback |
| `custom-line-height` | Editor sidebar exposes per-block line-height control |
| `custom-spacing` | Editor sidebar exposes margin/padding controls |
| `custom-units` | Editor accepts non-px units (em, rem, vh, vw, %) |

These do not change how saved posts render unless the user opts in via the editor UI.

**NOT enabled** (intentional):

- `disable-custom-colors` — too restrictive; users would lose the color picker.
- `disable-custom-font-sizes` — same.
- `theme.json` / FSE / `templates/` / `parts/` — out of scope; OnePress is a classic theme.

---

## Block-specific styling

Block visual rules live in `src/frontend/styles/_gutenberg.scss` under the Phase 2 section. Coverage:

| Block | Section |
|---|---|
| Paragraph, Heading | Inherited from global `_document.scss` h1–h6, p, body |
| Quote | Mirrored via `.editor-styles-wrapper blockquote` (Phase 1) — same padding / italic / left border / meta background as `.entry-content blockquote` |
| List | Mirrored via `.editor-styles-wrapper ul/ol/li` (Phase 1) |
| Image | `.wp-block-image` — display block, max-width 100%, italic captions, alignleft/right/center |
| Gallery | `.wp-block-gallery` — extends existing `is-layout-flex` rule in `_contents.scss` |
| Button | `.wp-block-button` — primary color background, `is-style-outline` variant |
| Pullquote | `.wp-block-pullquote` — top/bottom borders, centered, italic, `is-style-solid-color` variant |
| Cover | `.wp-block-cover` — white text overlay, 1.5em inner padding |
| Columns / Column | `.wp-block-columns` — `$gutter2` gap, wraps below md breakpoint |
| Group | `.wp-block-group` — 1.5em padding when `.has-background` |
| Table | `.wp-block-table` — `$border` cell border, `$meta` header background, `is-style-stripes` variant |
| Separator | `.wp-block-separator` — short centered default, `is-style-wide` full, `is-style-dots` |
| Embed | `.wp-block-embed.is-type-video` — 16:9 responsive iframe |
| Code / Preformatted | `.wp-block-code`, `.wp-block-preformatted` — `$monaco` font, `$meta` background |
| Spacer | `.wp-block-spacer` — display block, clear both |

## Alignwide / Alignfull

Both classes work on the rendered frontend and the editor canvas as of 2.4.0.

| Class | Frontend behavior | Editor behavior |
|---|---|---|
| `.alignwide` | Breaks past the parent's content-size constraint to reach `var(--wp--style--global--wide-size)` (default 1230px) using `max(calc(50% - 50vw), calc(50% - wideSize/2))` symmetric negative margins. Widens up to wideSize without overflowing the viewport. Since 2.4.1. | Expands to wideSize inside `.editor-styles-wrapper` via `max-width: var(--wp--style--global--wide-size)` |
| `.alignfull` | Edge-to-edge (`100vw`) via negative-viewport margins (`calc(50% - 50vw)`) | `max-width: none`, fills the editor canvas (which is iframe-constrained, so it won't truly hit 100vw — visually expands past the content-width constraint) |

Frontend rules are scoped to `.entry-content > .alignwide` / `.entry-content > .alignfull` (direct descendant only) so the classes don't leak into widgets or section parts that may reuse them. Editor rules use `.editor-styles-wrapper .wp-block[data-align="wide"|"full"]` + `.wp-block.alignwide|alignfull` selectors with enough specificity to win against Gutenberg's stock alignment CSS without `!important`.

**Note on sidebars:** alignfull on a single-post page with a sidebar still expands to viewport width, which can look unusual since the post column is narrower. For pages where wide/full blocks are the primary visual element, use the `template-fullwidth.php` or `template-fullwidth-stretched.php` page templates.

---

## Build pipeline

`editor.css` is generated by webpack from `src/frontend/styles/editor.scss`:

```bash
npm run dev    # generates assets/admin/editor.css (non-minified)
npm run build  # generates assets/admin/editor.minified.css
```

**Important:** the non-minified file (`editor.css`) is what gets loaded in development. Both `add_editor_style()` in `functions.php` and `OnePress_Editor::$editor_file` reference the non-minified path. Running `npm run build` alone leaves `editor.css` stale; run `npm run dev` (and stop it after the initial compile) to refresh the non-minified output. See [spec-build.md](spec-build.md) for the broader build pipeline.

RTL CSS is auto-emitted: `editor-rtl.css`, `editor.minified-rtl.css`.

---

## Adding rules — decision tree

```
Need a new style for content in the editor and/or frontend?
│
├── Is it block-specific (class starts with .wp-block-*)?
│   └── YES → put bare rule in _gutenberg.scss Phase 2 section
│
├── Is it a typography baseline (blockquote, li, p, code, etc.)?
│   ├── Already covered in _document.scss (global h1-h6, body, a)? → done, no work
│   └── Scoped to .entry-content X in _contents.scss?
│       └── add mirror .editor-styles-wrapper X in _gutenberg.scss Phase 1 section
│
└── Is it new shared content (e.g. .has-*-class emitted by a new feature)?
    └── prefer grouped selectors:
        .entry-content,
        .editor-styles-wrapper {
            X { ... }
        }
        place in _gutenberg.scss
```

---

## API surface (additive-only, frozen)

These names are public API as of 2.4.0; per [spec-conventions.md → Additive-only mandate](spec-conventions.md#additive-only-mandate) they cannot be renamed or removed:

- Class: `OnePress_Editor`
- Methods: `editor_settings()`, `assets()`, `css()`, `editor_style_url()`, `css_file()`, `load_style()`, `get_editor_color_palette()`, `get_editor_font_sizes()`
- Filters: `onepress_editor_color_palette`, `onepress_editor_font_sizes`
- Color palette slugs: `onepress-primary`, `onepress-secondary`, `onepress-heading`, `onepress-text`, `onepress-border`, `onepress-meta`, `onepress-white`
- Font size slugs: `small`, `normal`, `medium`, `large`, `huge`
- AJAX action: `onepress_load_editor_style` (nonce key)
- File path constant: `OnePress_Editor::$editor_file` = `'assets/admin/editor.css'`

---

## Known inconsistencies

Frozen by [additive-only mandate](spec-conventions.md#additive-only-mandate) — do not "fix" without a major-version migration:

| Inconsistency | Shipped form | Don't do |
|---|---|---|
| `theme.json` palette has `secondary = #333333` (the heading color), but the SCSS `$secondary` variable and the `onepress_secondary_color` theme mod default to `#00aeef` | `#333333` in theme.json; `#00aeef` in SCSS / theme mod | Don't change theme.json's secondary value — user posts may already render `.has-secondary-background-color` as `#333333`. If parity is needed, introduce a **new** slug rather than modifying the existing one. |
| Light background slug name | theme.json: `light` (#f8f9f9); SCSS variable: `$meta` | Don't rename either side; treat `light` (theme.json) and `meta` (SCSS) as canonical aliases for the same color. |
| `useRootPaddingAwareAlignments: true` is declared but OnePress is a classic theme | inert in practice | Don't remove (could affect a future block-theme migration) |
| `responsive-embeds`, `custom-line-height`, `custom-spacing`, `custom-units` added via `add_theme_support()` in `functions.php` are partially redundant with theme.json's `appearanceTools: true` | both declared | Don't remove either — `add_theme_support()` calls still serve themes that strip theme.json |

## Future work (deferred)

- **Block patterns** — register OnePress-themed patterns (hero, feature grid, team card, CTA, testimonial). See [plan-block-editor-parity.md → Phase 5](plan-block-editor-parity.md#phase-5--block-patterns).
- **Custom blocks** — e.g. a "Hero Slider" block that wraps the OnePress hero section markup.
- **Block style variations** — `register_block_style()` for additional button / quote / separator variants tied to OnePress aesthetics.
- **Customizer "Additional CSS" in editor** — currently not loaded in the editor canvas; documented limitation.
- **Migration to block theme (FSE)** — not planned.
