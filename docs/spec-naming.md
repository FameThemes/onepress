# spec-naming — Naming Conventions

Naming rules for PHP, JS, CSS/SCSS, and WordPress slugs in OnePress.

## Why naming is API

> **Every name that ships becomes part of the public API.** Per the [additive-only mandate](spec-conventions.md#additive-only-mandate), names cannot be renamed or removed without a major-version migration. Pick names carefully on first ship; once shipped, they're frozen.

This spec exists so:

1. New code uses **consistent** names so child themes and integrators can predict the shape of new APIs.
2. Existing **inconsistencies** (frozen by additive-only) are documented so nobody "fixes" them and silently breaks customer sites.
3. Reviewers can flag naming drift in PR review against an explicit reference.

---

## PHP

### Functions

- `snake_case`.
- **Always** prefixed `onepress_` for anything that lives at file scope (no namespace, no class).
- Imperative verb-first (`get_`, `set_`, `is_`, `has_`, `render_`, `enqueue_`, `register_`, `load_`, `sanitize_`).
- One purpose per function — no `onepress_do_a_and_b()`.

```php
function onepress_get_layout( $default = 'right-sidebar' ) { … }
function onepress_is_wc_active() { … }
function onepress_load_section( $section_id ) { … }
function onepress_sanitize_hex_color( $color ) { … }
```

### Pluggable functions

Anything wrapped in `if ( ! function_exists( 'onepress_*' ) )` is **pluggable** — child themes may override it. The **signature** is part of the API:

```php
if ( ! function_exists( 'onepress_header' ) ) {
    function onepress_header() { … }
}
```

For new pluggable helpers, always wrap in the `function_exists` guard. For non-pluggable internal helpers, do not wrap — but understand that once shipped they're still public per additive-only.

### Classes

- `PascalCase_With_Underscores` (WordPress-style PSR-0-ish).
- Prefix `OnePress_` for new code (see [Known inconsistencies](#known-inconsistencies-frozen-by-additive-only) below).
- File name mirrors class: `class-{kebab-case-name}.php` → `class-config.php` for `Onepress_Config`, or `control-{name}.php` for control subclasses.

```php
class OnePress_MetaBox { … }
class OnePress_Alpha_Color_Control extends WP_Customize_Control { … }
class OnePress_Editor { … }
```

Singletons use a static `get_instance()`:

```php
class Onepress_Dashboard {
    private static $_instance = null;
    public static function get_instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
}
```

### Methods

- `snake_case` (matches WordPress core style, not PSR-12).
- Visibility explicit (`public`, `protected`, `private`).

```php
public function render_meta_box_content( $post ) { … }
private function get_recommended_actions() { … }
```

### Constants

- `UPPER_SNAKE_CASE` with prefix `ONEPRESS_`.
- Defined at file scope or inside a class.

```php
define( 'ONEPRESS_THEME_PATH', dirname( __FILE__ ) );
// Plus plugin:
defined( 'ONEPRESS_PLUS_PATH' );
```

### Local variables

- `$snake_case`.
- Descriptive — no `$x`, `$tmp`, `$arr` for anything that lives longer than 3 lines.
- Boolean flags read like English: `$is_shop`, `$has_logo`, `$can_edit`.

```php
$custom_logo_id = get_theme_mod( 'custom_logo' );
$is_shop        = onepress_is_wc_active() && is_shop();
$image_alt      = get_post_meta( $custom_logo_id, '_wp_attachment_image_alt', true );
```

### Globals

- `$snake_case` with prefix `$onepress_`.
- Avoid where possible — prefer the loop-prop helpers (`onepress_loop_set_prop()` / `_get_prop()`) for loop-scoped state.

```php
global $onepress_loop_props;
```

### Theme mods

- `onepress_{area}_{setting}` snake_case.
- Group prefix matches the section or feature: `onepress_hero_*`, `onepress_gallery_*`, `onepress_header_*`, `onepress_footer_*`.
- Boolean toggles end in `_disable` (off by default) or `_enable` (on by default) — match what already exists in the area; **don't mix** within the same group.
- Color settings end in `_color`. Image settings end in `_image` (or `_logo` for logos). Multi-row settings (repeaters) named with plural noun: `onepress_hero_images`, `onepress_team_members`.

```php
get_theme_mod( 'onepress_hero_disable' );
get_theme_mod( 'onepress_hero_option_animation', 'flipInX' );
get_theme_mod( 'onepress_gallery_display', 'grid' );
get_theme_mod( 'onepress_disable_g_font' );      // ← legacy: prefix-first, kept frozen
get_theme_mod( 'onepress_btt_disable' );          // ← "back to top" abbreviation; kept frozen
```

### Options

- `onepress_*` snake_case.
- One option per concern; prefer post meta or theme mods for everything else.

```php
get_option( 'onepress_sections_settings' );
get_option( 'onepress_actions_dismiss' );
get_option( 'onepress_dismiss_switch_theme_notice' );
```

### Post meta keys

- **Leading underscore** + `snake_case` — WordPress convention for "hidden from default UI".
- All `_hide_*` keys are boolean (`'1'` / `''`).

```php
get_post_meta( $post_id, '_hide_page_title', true );
get_post_meta( $post_id, '_hide_header', true );
get_post_meta( $post_id, '_hide_footer', true );
get_post_meta( $post_id, '_hide_breadcrumb', true );
```

### Hooks (actions and filters)

- `onepress_*` snake_case.
- **Position adverbs encoded in the name**, not in priority: `onepress_before_*`, `onepress_after_*`, `*_start`, `*_end`.
- Sectional hooks include the ID as a suffix or interpolated middle: `onepress_before_section_{id}`, `onepress_after_section_{id}`.

```php
do_action( 'onepress_before_site_start' );
do_action( 'onepress_header_end' );
do_action( 'onepress_before_section_' . $section_id );
do_action( 'onepress_after_section_part', $section_id );

apply_filters( 'onepress_get_sections', $sections );
apply_filters( 'onepress_js_settings', $settings );
apply_filters( 'onepress_content_width', $width );
```

For deprecation, use the legacy name as-is and add a new canonical filter — see [spec-conventions.md → Pattern 4](spec-conventions.md#the-four-patterns-for-improving-without-removing).

### Nonces

- Action key in `snake_case` (no prefix mandatory, but recommend `onepress_` going forward).
- Field name mirrors the action with `_nonce` suffix.

```php
wp_nonce_field( 'onepress_page_settings', 'onepress_page_settings_nonce' );
wp_nonce_field( 'onepres_save_settings', 'onepress_settings_nonce' );  // ← legacy typo 'onepres', frozen
```

### Sanitize / validate callbacks

- `onepress_sanitize_{type}` / `onepress_{area}_validate`.
- See full list in [spec-customizer.md → Sanitizers](spec-customizer.md#sanitizers).

---

## JavaScript

### Localized globals (from PHP via `wp_localize_script`)

- `snake_case` with prefix `onepress_`, or a `C_*` prefix for cross-cutting libs (icon picker uses `C_Icon_Picker`).
- Documented in PHP source — treat the **key set** as API: do not remove keys; only add additively.

```js
window.onepress_js_settings        // localized from functions.php
window.onepress_customizer_settings // localized from inc/customizer.php
window.C_Icon_Picker                // localized from inc/customizer.php
```

### Module / file naming under `src/`

- `kebab-case.js` for files: `customizer-liveview.js`, `gallery-isotope.js`, `lightgallery.js`.
- `PascalCase.js` for vendored libraries that ship that way: `src/frontend/libs/FitVids.js`, `src/frontend/libs/Morphext/`.
- One feature per file.

### Variables in modern module code (`src/admin/`, `src/frontend/`)

- `camelCase` for variables and functions.
- `PascalCase` for React components and classes.
- `UPPER_SNAKE_CASE` for constants.

```js
const galleryDisplay = onepress_js_settings.gallery_display;
function initHeroSlider() { … }
class IconPicker { … }
const MAX_SLIDES = 20;
```

### Legacy jQuery / plugin libs (`src/frontend/libs/*`)

- Existing files follow each library's own convention (jQuery plugins use `$.fn.pluginName`, etc.).
- **Do not refactor** — those files are vendored or near-vendored. Touch only to fix bugs or upgrade.

### Event names (custom DOM events)

- `kebab-case`, prefix with `onepress:` namespace for new events.

```js
$(document).trigger('onepress:section-loaded', { id: 'hero' });
```

---

## CSS / SCSS

### Class names

- `kebab-case`.
- **BEM-lite** — block, element, modifier separated by `-` (not `__` / `--`). The codebase is not strict BEM; match the surrounding code.

```css
.site-header { … }
.hero-section { … }
.hero-content-style1 { … }
.custom-logo-transparent { … }
.footer-widget { … }
.btt .back-to-top { … }
```

### Section wrappers

Every front-page section's root markup uses `.section-{id}`:

```html
<section id="hero" class="section section-hero">…</section>
<section id="about" class="section section-about">…</section>
```

**Both** `.section` and `.section-{id}` are emitted — users target both in Additional CSS.

### State and utility classes

- `is-*` for boolean state: `.is-customize-preview`, `.is-sticky`.
- `has-*` for presence: `.has-logo`, `.has-sidebar`.
- Descriptive utilities: `.no-sidebar`, `.animation-disable`, `.hiding-page-title`, `.group-blog`.

### Body classes

Added by [`onepress_body_classes()`](../inc/extras.php) on the `body_class` filter:

- `kebab-case`, descriptive.
- Examples: `.group-blog`, `.template-fullwidth-stretched`, `.is-customize-preview`, `.hiding-page-title`, `.animation-disable`.

### SCSS partials

- Files in `src/frontend/styles/` use **leading underscore + kebab-case** (Sass partial convention): `_variables.scss`, `_layout.scss`, `_sections.scss`, `_widgets.scss`.
- Entry files: no leading underscore (`style.scss`, `editor.scss`, `lightgallery.scss`, `animate.scss`).

### SCSS variables

- `$kebab-case`.
- Color variables grouped at the top of `_variables.scss`.

```scss
$primary-color: #f55;
$text-color: #333;
$base-font-size: 14px;
```

### Style handles (registered via `wp_enqueue_style`)

- `onepress-{key}` kebab-case. Match the webpack output key.
- Inline CSS attaches to `onepress-style` (the main theme handle).

```php
wp_register_style( 'onepress-style', … );
wp_register_style( 'onepress-fonts', … );
wp_register_style( 'onepress-gallery-isotope', … );
wp_add_inline_style( 'onepress-style', $custom_css );
```

### Script handles

Same rule — `onepress-{key}`. Set by [`onepress_load_build_script()`](../functions.php).

```php
wp_register_script( 'onepress-theme', … );
wp_register_script( 'onepress-customizer-liveview', … );
```

---

## WordPress slugs

### Image sizes

- `onepress-{descriptor}` kebab-case.
- Once registered, never rename — users' uploaded media has thumbnails at these slugs.

```php
add_image_size( 'onepress-blog-small', 300, 150, true );
add_image_size( 'onepress-small', 480, 300, true );
add_image_size( 'onepress-medium', 640, 400, true );
```

### Sidebars

- `sidebar-{n|name}` or `footer-{n}` kebab-case.
- Inherited from `_s` starter — don't reorganize.

```php
register_sidebar( [ 'id' => 'sidebar-1', … ] );
register_sidebar( [ 'id' => 'sidebar-shop', … ] );  // ← only when WC active
register_sidebar( [ 'id' => 'footer-' . $i, … ] );  // ← 1..4
```

### Menu locations

- `snake_case`, no prefix needed (WP convention).

```php
register_nav_menus( [ 'primary' => esc_html__( 'Primary Menu', 'onepress' ) ] );
```

### Text domain

- Single word `onepress`, lowercase. Never `one-press`, never `OnePress`.
- Used in every `__()`, `esc_html__()`, `_x()`, `_n()` call.

```php
__( 'Skip to content', 'onepress' );
esc_html__( 'Primary Menu', 'onepress' );
_x( 'on', 'Open Sans font: on or off', 'onepress' );
```

### Customizer panel / section / setting IDs

- Panel: `onepress_{group}`.
- Section: `onepress_{group}_{section}` or `onepress_section_{id}` for front-page sections.
- Setting: same as the underlying theme mod key (`onepress_*`).

### Admin pages

- Slug: `ft_onepress` (FameThemes prefix — frozen, do not rename).
- URL: `themes.php?page=ft_onepress`.

---

## Cross-cutting prefix matrix

Reference table — at a glance, what prefix goes where:

| Prefix | Where | Example |
|---|---|---|
| `onepress_` | PHP functions, hooks, theme mods, options, JS globals, style/script handles, image sizes | `onepress_setup`, `onepress_get_sections`, `onepress_hero_disable`, `onepress-style`, `onepress-medium` |
| `OnePress_` | PHP classes (preferred for new code) | `OnePress_MetaBox`, `OnePress_Editor` |
| `Onepress_` | PHP classes (legacy, frozen) | `Onepress_Config`, `Onepress_Dashboard` |
| `ONEPRESS_` | PHP constants | `ONEPRESS_THEME_PATH`, `ONEPRESS_PLUS_PATH` |
| `_` (leading) | Post meta keys (WP "hidden" convention) | `_hide_page_title`, `_hide_footer` |
| `ft_` | Admin page slug (FameThemes legacy) | `ft_onepress` |
| `C_` | Cross-cutting JS lib globals | `C_Icon_Picker` |
| `onepress:` | Custom DOM event namespace | `onepress:section-loaded` |
| `is-` / `has-` | CSS state classes | `.is-customize-preview`, `.has-logo` |
| `section-` | CSS section wrapper | `.section-hero`, `.section-about` |
| `$onepress-` (SCSS) — *not currently used, but allowed for new namespaced vars* | SCSS variables | `$onepress-primary-color` |

---

## Known inconsistencies (frozen by additive-only)

These exist in the shipped codebase and **cannot be fixed** without violating [additive-only](spec-conventions.md#additive-only-mandate). Documented here so nobody "cleans them up":

| Inconsistency | Shipped form | Don't do |
|---|---|---|
| Class prefix capitalization | Both `OnePress_*` (e.g. `OnePress_MetaBox`, `OnePress_Editor`, `OnePress_Alpha_Color_Control`) and `Onepress_*` (e.g. `Onepress_Config`, `Onepress_Dashboard`, `Onepress_Dots_Navigation`, `Onepress_Customize_Repeatable_Control`) exist. | Don't rename `Onepress_Config` → `OnePress_Config` — child themes and Plus call the existing name. |
| One control class uses snake_case-ish | `One_Press_Textarea_Custom_Control` (note `One_Press_` split) | Don't rename. |
| Nonce action typo | `onepres_save_settings` (missing `s`) | Don't fix the typo — sites with the old action key in localStorage / cached forms would break submission. |
| Theme mod ordering convention | `onepress_disable_g_font` (prefix-first) vs `onepress_animation_disable` (suffix-last) — both shipped | Don't normalize. |
| Some abbreviations baked into keys | `onepress_btt_disable` ("back to top"), `onepress_hero_pdtop` / `onepress_hero_pdbotom` ("padding top/bottom", note `pdbotom` typo) | Don't rename, don't fix typos. |
| Webpack output handle exception | `theme` entry's style handle is `onepress-style` (not `onepress-theme`) | Special-cased in [`onepress_load_build_script()`](../functions.php) — leave as-is. |

When you find a new inconsistency in the codebase, **add it to this table** rather than fixing it.

---

## Naming for new code (recommended forms)

When introducing new symbols, pick from these preferred forms:

| Surface | Preferred new form |
|---|---|
| Class | `OnePress_*` (uppercase `P`) |
| Theme mod | `onepress_{area}_{setting}` — area first, setting last |
| Boolean theme mod | `onepress_{area}_{setting}_enable` or `_disable` — match existing in same area |
| Filter | `onepress_{noun}` or `onepress_get_{noun}` for getters, `onepress_{verb}_{noun}` for transformers |
| Action | `onepress_{position}_{noun}` (`before_`, `after_`, `*_start`, `*_end`) |
| JS module file | `kebab-case.js` |
| JS function/variable | `camelCase` |
| CSS class | `kebab-case`, BEM-lite, `.section-{id}` for section wrappers |
| SCSS partial | `_kebab-case.scss` |
| SCSS variable (new) | `$onepress-{kebab-case}` to namespace away from generic Bootstrap variables |
| Custom DOM event | `onepress:kebab-case` |
| Style/script handle | `onepress-{key}` matching webpack output |
| Image size | `onepress-{descriptor}` |
| Constant | `ONEPRESS_{NOUN}` |

**Naming is part of the additive-only contract.** Pick the right name on first ship — you live with it forever.
