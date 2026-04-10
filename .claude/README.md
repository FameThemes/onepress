# `.claude`

Notes for AI assistants (Claude Code, etc.). All docs in this folder are in **English**.

- **Theme architecture** (folders, Customizer, build): [../ARCHITECTURE.md](../ARCHITECTURE.md) (theme root).
- **WordPress Coding Standards** (PHP, JS, HTML, CSS, a11y): [wordpress-coding-standards.md](./wordpress-coding-standards.md) — handbook: [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/).
- **CSS & class strings in PHP/JS:** [css-and-class-naming.md](./css-and-class-naming.md) — Customizer controls use **`onepress-{feature}-control`** as the only prefixed root; inner classes are functional (e.g. `.inputs`) scoped under that root in SCSS.
- **SCSS under `src/admin/`** (WP alignment, CSS vars, Tailwind-like utilities): [admin-scss.md](./admin-scss.md).
- **New Customizer controls (PHP folder layout):** [customize-controls-structure.md](./customize-controls-structure.md) — `inc/customize-controls/{name}/{name}.php`, related files colocated.

**Cursor** rules live in **`.cursor/rules/`** — e.g. **`architecture.mdc`** + **`wordpress-coding-standards.mdc`** (`alwaysApply: true`), **`scss-css.mdc`**, **`php-js-classes.mdc`**, **`admin-src-scss.mdc`**, **`customize-controls-php.mdc`**.
