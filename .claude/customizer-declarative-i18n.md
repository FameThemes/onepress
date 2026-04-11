# Declarative Customizer options — i18n (OnePress)

This theme registers many Customizer settings from **return-array PHP files** under `inc/customize-configs/`, merged by `inc/customize-option-definitions.php` and consumed by `onepress_customize_register_options()` in `inc/customizer-register.php`.

## Rules

### Translate in definition files

- In **`inc/customize-configs/options-*.php`**, **`site-identity.php`**, and any other file merged into **`onepress_get_customize_option_definitions()`**, wrap user-facing strings so **gettext can extract msgids** from source.
- Text domain: **`onepress`**.
- **Default for plain text:** **`esc_html__( 'String', 'onepress' )`** for `title`, `label`, `description`, select/radio `choices` labels, repeatable `fields` → `title`, etc.
- **HTML content:** build with **`wp_kses_post( __( '…markup…', 'onepress' ) )`** (or equivalent) **in the definition file** — not as an untranslated bare string that only gets `__()` later in registration.
- **Attribute placeholders:** use **`esc_attr__( '…', 'onepress' )`** when the placeholder is meant for translators.

### Do not translate again in `customizer-register.php`

- Do **not** add a bulk pass that runs `esc_html__()` / `__()` over every `title`, `label`, `description`, `choices`, etc. coming from merged definitions.
- For **`description_html`** and **`limited_msg`**, definitions should supply **already translated** strings; registration should only apply **`wp_kses_post()`** (and similar sanitization), not wrap with `__()` again.

### Extractable fallback strings

- Do not hide translatable literals inside expressions such as **`esc_html( $id ? $id : '(empty)' )`**. Put fallback text inside **`esc_html__()` / `__()`** in PHP source so scanners and `.pot` generation see the msgid.

### Defaults vs chrome

- **Control labels/descriptions:** always i18n as above.
- **Stored `default` values** for user-editable text fields may stay **unwrapped** English (or another chosen source language) if the theme treats them as content defaults; document per control if you change that policy.

### Load order

- Merged definitions can be read **before** some hooks. If you see **“Translation loading for the onepress domain was triggered too early”**, adjust **when the text domain loads** or **when definitions are merged**, instead of moving string translation into `customizer-register.php`.

## Cursor

Mirror / overlap: **`.cursor/rules/customizer-declarative-i18n.mdc`** (applies when editing the globs listed there).
