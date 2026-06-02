<?php

/**
 * Bridge Customizer mods into theme.json.
 *
 * Since 2.4.1. Reads runtime Customizer mods and overrides the corresponding
 * theme.json entries via the `wp_theme_json_data_theme` filter so the values
 * WP bakes into the auto-generated `--wp--preset--…` variables reflect the
 * user's customization. The static values in theme.json act as defaults;
 * the Customizer mod wins when set.
 *
 * Scope:
 *   - `settings.color.palette[slug="primary"]`   ← `onepress_primary_color`
 *   - `settings.color.palette[slug="secondary"]` ← `onepress_secondary_color`
 *
 * Both Customizer mods and the theme.json palette ship with matching
 * defaults (`#03c4eb` / `#333333`), so bridging is a no-op until the user
 * actively changes a Customizer color — at which point every consumer
 * of the `--wp--preset--color--{slug}` variable (including the SCSS
 * `variables.$primary` / `variables.$secondary` references that compile
 * to those vars) picks up the new value automatically.
 *
 * Why NOT bridge `settings.layout.contentSize`:
 *   WP renders the editor canvas rule
 *   `.block-editor-block-list__layout.is-root-container > :where(…) { max-width: <literal>; … }`
 *   from theme.json's `contentSize` value. Bridging the user's
 *   `single_layout_content_width` here bakes the user's number into that
 *   literal — which is exactly what we want to avoid. Instead we keep the
 *   theme.json default (`1110px`) intact and inject a single
 *   `:root { --wp--style--global--content-size: <user>px; }` override into
 *   the editor canvas (see `inc/admin/class-editor.php::css()`) and the
 *   frontend (see `body.single-post` rule in `inc/template-tags.php`).
 *   Our editor SCSS rule (`.editor-styles-wrapper .wp-block:not(…)` in
 *   `_gutenberg.scss`) wins WP's `is-root-container` rule by specificity
 *   and consumes the var — so the visible cap reflects the user value
 *   without any literal `<user>px` appearing in CSS.
 *
 * @package OnePress
 */

if (! function_exists('onepress_filter_theme_json_palette')) {

	/**
	 * Override the `primary` and `secondary` palette entries from the
	 * Customizer mods.
	 *
	 * @param WP_Theme_JSON_Data $theme_json The merged theme.json data wrapper.
	 * @return WP_Theme_JSON_Data
	 */
	function onepress_filter_theme_json_palette($theme_json)
	{
		if (! is_object($theme_json) || ! method_exists($theme_json, 'get_data')) {
			return $theme_json;
		}

		// Map theme.json palette slug → Customizer mod name. Add new
		// entries here when extending; nothing else in this function needs
		// to change.
		$bridge = array(
			'primary'   => 'onepress_primary_color',
			'secondary' => 'onepress_secondary_color',
		);

		$overrides = array();
		foreach ($bridge as $slug => $mod) {
			$raw = get_theme_mod($mod, '');
			if ($raw === '' || $raw === null) {
				continue;
			}
			$hex = sanitize_hex_color('#' . ltrim($raw, '#'));
			if ($hex) {
				$overrides[ $slug ] = $hex;
			}
		}

		if (empty($overrides)) {
			return $theme_json;
		}

		$data = $theme_json->get_data();

		if (! isset($data['settings']['color']['palette']) || ! is_array($data['settings']['color']['palette'])) {
			return $theme_json;
		}

		// WP wraps the palette by origin (`theme`, `default`, `user`).
		// Mutate the `theme` array if present; otherwise fall back to
		// treating the value as a flat list (older WP versions or test
		// fixtures).
		$palette_ref = &$data['settings']['color']['palette'];
		$target      = (isset($palette_ref['theme']) && is_array($palette_ref['theme']))
			? $palette_ref['theme']
			: $palette_ref;

		$mutated = false;
		foreach ($target as $i => $color) {
			if (isset($color['slug']) && isset($overrides[ $color['slug'] ])) {
				$target[ $i ]['color'] = $overrides[ $color['slug'] ];
				$mutated               = true;
			}
		}

		if (! $mutated) {
			return $theme_json;
		}

		if (isset($palette_ref['theme']) && is_array($palette_ref['theme'])) {
			$palette_ref['theme'] = $target;
		} else {
			$palette_ref = $target;
		}
		unset($palette_ref);

		if (method_exists($theme_json, 'update_with')) {
			return $theme_json->update_with($data);
		}

		return $theme_json;
	}
}

add_filter('wp_theme_json_data_theme', 'onepress_filter_theme_json_palette');
