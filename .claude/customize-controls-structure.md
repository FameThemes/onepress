# Customizer control folder structure (PHP)

## Location

- Every new control lives under **`inc/customize-controls/`**.

## Rules

1. **One control = one directory** named with a slug (e.g. `layout`, `background`, `my-feature`).
2. **Main file:** `{control-name}/{control-name}.php`  
   Examples: `layout/layout.php`, `switch/switch.php`.
3. **Related files** (helpers, control-only sanitizers, PHP snippets used only by that control) stay in the **same directory** — do not spread them across `inc/` without a strong reason.
4. **Theme bootstrap:** add `require_once` in **`inc/customizer-controls.php`** pointing at the control’s PHP file(s), following the order/pattern of existing controls.
5. JS/SCSS usually live under **`src/admin/`** and are built with `npm run build`; HTML/CSS class rules: [css-and-class-naming.md](./css-and-class-naming.md).

## Example

```
inc/customize-controls/
  typography/
    typography.php    ← main control class
    fonts.php
    helper.php
  layout/
    layout.php
```
