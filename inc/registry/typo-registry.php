<?php

/**
 * Typography (and similar) registry: one `Onepress_Customize_Styling_Control` row per theme_mod id.
 *
 * Customizer wiring: `inc/customize-configs/options-typography.php` loops `onepress_styling_typography_controls_config()`.
 * Loaded for CSS / font merge / preview ids via `inc/styling-css.php` (`onepress_styling_typography_theme_mod_ids()`, etc.).
 * Separate demo `styling` controls (global section): `inc/customize-configs/options-styling.php` — keep their ids in
 * `onepress_styling_default_theme_mod_setting_ids()` in `styling-css.php`.
 *
 * Edit `onepress_styling_typography_controls_config()` (or filter it) to add/reorder/remove typography controls in one place.
 *
 * @package OnePress
 */

if (! function_exists('onepress_styling_typography_controls_config')) {
	/**
	 * Typography section: one styling control per theme_mod id.
	 *
	 * Each entry:
	 * - `id` (string) — theme_mod / control id
	 * - `setting` (array) — passed to `$wp_customize->add_setting( $id, $setting )`
	 * - `control` (array) — passed as second arg to `Onepress_Customize_Styling_Control` (must not include control id key).
	 *   Optional: `styling_hide_popover_heading` (legacy: hides gear + preview-pick toolbar buttons),
	 *   `styling_hide_gear_button`, `styling_hide_preview_pick_button`, `styling_hide_state_tablist` (bool).
	 *   Optional: `styling_font_family_source` — `local` (default; Font manager list) or `google` (full catalog).
	 *   In `styling_states` template rows, optional `force_selector` (string) — full CSS selector override; if omitted, theme resolves `force_selector` as `base_selector` + that row’s `selector` for the matching theme_mod id (front + preview).
	 *   When `styling_multiple` => true on the control, use setting default `onepress_styling_get_default_value_multiple()` (array; sanitize stores JSON) and sanitize `onepress_sanitize_styling_value_multi` (not the single-target helpers).
	 *   Optional with `styling_multiple`: `add_item_label` (string) — “Add item” button text.
	 *
	 * @return array<int, array{id: string, setting: array<string, mixed>, control: array<string, mixed>}>
	 */
	function onepress_styling_typography_controls_config()
	{
		$section = 'onepress_typography';

		$setting_defaults = array(
			'default'           => onepress_styling_get_default_value(),
			'sanitize_callback' => 'onepress_sanitize_styling_value',
			'transport'         => 'postMessage',
		);

		$setting_defaults_multiple = array(
			'default'           => onepress_styling_get_default_value_multiple(),
			'sanitize_callback' => 'onepress_sanitize_styling_value_multi',
			'transport'         => 'postMessage',
		);

		$control_defaults = array(
			'section'             => $section,
			'styling_breakpoints' => onepress_styling_default_breakpoints(),
			'styling_multiple'    => false,
			'styling_states'      => false,
			'styling_groups'      => array('text'),
			'styling_hide_popover_heading' => true,
			'styling_hide_state_tablist' => true,
			'styling_font_family_source' => 'local',
		);

		$rows = array();

		$rows[] = array(
			'id'      => 'onepress_styling_customs',
			'setting' => $setting_defaults_multiple,
			'control' => array_merge(
				$control_defaults,
				array(
					'label'         => esc_html__('Custom typography targets', 'onepress'),
					'description'   => esc_html__(
						'Add selectors as separate items; each has its own text styles. Normal state only — use Add item for more targets.',
						'onepress'
					),
					'priority'      => 23,
					'styling_multiple' => true,
					// 'styling_states'   => array(
					// 	array(
					// 		'normal' => array(
					// 			'label'    => __('Normal', 'onepress'),
					// 			'selector' => '',
					// 		),
					// 	),
					// 	array(
					// 		'hover' => array(
					// 			'label'    => __('Hover', 'onepress'),
					// 			'selector' => ':hover',
					// 		),
					// 	),
					// ),
					'styling_hide_state_tablist'   => true,

					'disable_fields' => array('color'),
					'styling_groups'   => array('text'),
					'styling_hide_popover_heading' => false,
					'styling_hide_gear_button' => true,
					'styling_hide_preview_pick_button' => true,
					'add_item_label' => __('Add typography', 'onepress'),
				)
			),
		);

		/**
		 * Typography styling controls registry (Customizer).
		 *
		 * @param array<int, array{id: string, setting: array<string, mixed>, control: array<string, mixed>}> $rows
		 */
		return apply_filters('onepress_styling_typography_controls_config', $rows);
	}
}

if (! function_exists('onepress_styling_typography_theme_mod_ids')) {
	/**
	 * Theme mod ids declared by `onepress_styling_typography_controls_config()` (for CSS output, Google Fonts merge, preview JS).
	 *
	 * @return list<string>
	 */
	function onepress_styling_typography_theme_mod_ids()
	{
		$ids = array();
		foreach (onepress_styling_typography_controls_config() as $row) {
			if (empty($row['id']) || ! is_string($row['id'])) {
				continue;
			}
			$k = sanitize_key($row['id']);
			if ($k !== '') {
				$ids[] = $k;
			}
		}
		$ids = array_values(array_unique($ids, SORT_STRING));

		/**
		 * Typography styling theme_mod ids derived from the controls registry.
		 *
		 * @param list<string> $ids
		 */
		return apply_filters('onepress_styling_typography_theme_mod_ids', $ids);
	}
}

if (! function_exists('onepress_styling_registry_base_selector_map')) {
	/**
	 * theme_mod id → canonical `base_selector` from the typography controls registry (sanitized).
	 * Used to override stale `_meta.baseSelector` in saved JSON when printing CSS / merging fonts.
	 *
	 * @return array<string, string>
	 */
	function onepress_styling_registry_base_selector_map()
	{
		$map = array();
		foreach (onepress_styling_typography_controls_config() as $row) {
			$sid = isset($row['id']) ? sanitize_key((string) $row['id']) : '';
			if ($sid === '') {
				continue;
			}
			$ctrl = isset($row['control']) && is_array($row['control']) ? $row['control'] : array();
			if (empty($ctrl['base_selector']) || ! is_string($ctrl['base_selector'])) {
				continue;
			}
			$sel = onepress_styling_sanitize_selector($ctrl['base_selector']);
			if ($sel !== '') {
				$map[$sid] = $sel;
			}
		}

		/**
		 * Extra registry ids → base selector (child themes / plugins).
		 *
		 * @param array<string, string> $map
		 */
		return apply_filters('onepress_styling_registry_base_selector_map', $map);
	}
}

if (! function_exists('onepress_styling_registry_control_for_setting_id')) {
	/**
	 * Control args for a typography registry row by theme_mod id (after `onepress_styling_typography_controls_config` filter).
	 *
	 * @param string $setting_id theme_mod / control id.
	 * @return array<string, mixed>|null
	 */
	function onepress_styling_registry_control_for_setting_id($setting_id)
	{
		$want = sanitize_key((string) $setting_id);
		if ($want === '') {
			return null;
		}
		foreach (onepress_styling_typography_controls_config() as $row) {
			$rid = isset($row['id']) ? sanitize_key((string) $row['id']) : '';
			if ($rid !== $want) {
				continue;
			}
			return isset($row['control']) && is_array($row['control']) ? $row['control'] : null;
		}

		return null;
	}
}
