# OnePress theme — CSS & class naming (PHP / JS / SCSS)

Mirrors `.cursor/rules/` (e.g. `scss-css.mdc`, `php-js-classes.mdc`) for Claude and other tools.  
**Theme root:** `app/public/wp-content/themes/onepress`.

## Customizer controls (default for new controls)

1. **Single prefixed root** on the control shell: **`onepress-{feature}-control`**  
   Examples: `onepress-typo-control`, `onepress-background-control`.

2. **Inner elements:** **no** `onepress-` on every child. Use **short, functional** kebab-case names: `.inputs`, `.toolbar`, `.preview`, `.sidebar`.

3. **SCSS:** nest everything under the root so short names stay scoped:

   ```scss
   .onepress-typo-control {
     .inputs { /* … */ }
   }
   ```

   Effective CSS: **`.onepress-typo-control .inputs`** — not `.onepress-typo-control__inputs` for new work.

4. **States:** `is-active`, `is-selected`, `is-open` on the relevant inner node.

5. **CSS variables (admin / control UI):** `--onepress-…` for tokens scoped to Customizer SCSS (`src/admin/`), e.g. switch/layout controls.
6. **Front-end theme variables** (`src/frontend/styles/`, `inc/customizer-inline-styles.php`): **no** `onepress-` prefix — use semantic names such as `--typo-body-color`, `--color-primary`, `--header-bg`, `--hero-overlay` (see `_css_var.scss`).

## Legacy

Existing controls may still use **BEM** inner classes (`__` / `--`). Prefer the **root + inner functional** pattern for **new** Customizer controls; align refactors when you touch a file.

## PHP & JavaScript / JSX

- Outermost control wrapper: **`onepress-{feature}-control`**.
- Inner `class` / `className`: functional names matching nested SCSS.
- PHP: `esc_attr()` for dynamic parts.
- PHP **symbols** (unrelated to CSS classes): `OnePress_*` classes, `onepress_*` functions, customize `type` strings like `onepress_typography`.

## Quick reference

| Role | Example |
|------|---------|
| Control root | `.onepress-typo-control` |
| Inner (scoped) | `.onepress-typo-control .inputs` |
| State | `.onepress-typo-control .tab.is-active` |
| Variable (front-end `:root`) | `--typo-body-color`, `--color-primary` |
| Variable (admin controls) | `--onepress-switch-track-width` |

After SCSS edits: **`npm run build`** in the theme directory.
