# WordPress Coding Standards (OnePress theme)

Theme code should follow the **[WordPress Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/)** and the language-specific handbooks:

| Area | Handbook |
|------|----------|
| PHP | [PHP Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/) |
| JavaScript | [JavaScript Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/javascript/) |
| HTML | [HTML Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/html/) |
| CSS | [CSS Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/css/) |
| Accessibility | [Accessibility](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/accessibility/) (target WCAG AA) |

## Required habits in this theme

- **Escape** output in HTML/attributes (`esc_html`, `esc_attr`, `esc_url`, …).
- **Sanitize** input and use `sanitize_callback` on Customizer settings and options.
- **i18n:** `__`, `esc_html__`, etc., with the theme text domain (e.g. `onepress`).

## OnePress-specific conventions

- Control folder layout, CSS classes, and admin SCSS: see other files in `.claude/` and `.cursor/rules/`.

## Exceptions

- Third-party / vendor libraries are not required to match WPCS; first-party theme code should.

## Tooling (optional)

- **PHPCS** with the **WordPress** ruleset (`wp-coding-standards/wpcs`) when your environment is configured.
