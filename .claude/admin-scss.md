# OnePress — SCSS conventions in `src/admin/`

Use when editing admin / Customizer CSS or SCSS (theme bundle).

## 1. Prefer WordPress admin & Customize

- Reuse **core classes and HTML structure** where sufficient (buttons, control descriptions, notifications, etc.).
- Avoid overriding global wp-admin; **scope** under `#customize-controls`, `body.wp-customize`, or `.onepress-*-control`.

## 2. CSS variables

- Use **centralized variables** for colors, borders, input typography, etc. (e.g. the `:root` block at the top of `customizer.scss`).
- Theme-specific tokens: `--onepress-…`.

## 3. Tailwind-like utilities

- For layout, spacing, and generic alignment, **reuse** shared utilities (`.flex`, `.gap-*`, `.justify-*`, `.items-*`, `.w-full`, …).
- New utilities: **one responsibility per class**, kebab-case, and **do not** clash with WP component class names.
- For elements that do **not** need a strong custom look, prefer utilities + variables over new bespoke rules.

## 4. OnePress controls

- Root: `onepress-{feature}-control`; inner markup may combine utilities (see [css-and-class-naming.md](./css-and-class-naming.md)).

## 5. Build

- Run `npm run build` in the theme directory after SCSS changes.
