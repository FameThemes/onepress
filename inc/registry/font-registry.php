<?php

/**
 * Font manager registry: one `Onepress_Customize_Font_Manager_Control` row per theme_mod id.
 *
 * Customizer wiring: `inc/customize-configs/options-font-manager.php` loops
 * `onepress_font_manager_controls_config()`.
 *
 * The primary setting id `onepress_font_manager` is what the Customizer styling UI binds to by default
 * (`useFontManagerCatalogFamilies` JS). Front-end Google Fonts merge into the single stylesheet from
 * `onepress_styling_enqueue_merged_google_fonts` (see `inc/styling-css.php`): font manager variants override styling
 * for the same family; no separate font-manager handles. Filter `onepress_font_manager_enqueue_theme_mod_ids`
 * controls which ids participate; `onepress_font_manager_theme_mod_id` may append a legacy extra id.
 *
 * @package OnePress
 */

if ( ! function_exists( 'onepress_font_manager_controls_config' ) ) {
	/**
	 * Registered font manager controls (theme_mod + Font manager UI).
	 *
	 * Each entry:
	 * - `id` (string) — theme_mod / control id
	 * - `setting` (array) — passed to `$wp_customize->add_setting( $id, $setting )`
	 * - `control` (array) — args for `Onepress_Customize_Font_Manager_Control` (no control id key)
	 *
	 * @return array<int, array{id: string, setting: array<string, mixed>, control: array<string, mixed>}>
	 */
	function onepress_font_manager_controls_config() {
		$section = 'onepress_typography';

		$setting_defaults = array(
			'default'              => onepress_font_manager_default_value(),
			'sanitize_callback'    => 'onepress_sanitize_font_manager_value',
			'sanitize_js_callback' => array( 'Onepress_Customize_Font_Manager_Control', 'sanitize_value_for_js' ),
			'transport'            => 'refresh',
		);

		$rows = array();

		$rows[] = array(
			'id'      => 'onepress_font_manager',
			'setting' => $setting_defaults,
			'control' => array(
				'label'       => esc_html__( 'Font manager', 'onepress' ),
				'description' => esc_html__(
					'Maintain a list of fonts. For Google families, all styles are listed and selected by default; uncheck any you do not want loaded. Close discards unsaved editor changes.',
					'onepress'
				),
				'section'     => $section,
				'priority'    => 1,
			),
		);

		/**
		 * Add, reorder, or replace font manager Customizer rows.
		 *
		 * @param array<int, array{id: string, setting: array<string, mixed>, control: array<string, mixed>}> $rows
		 */
		return apply_filters( 'onepress_font_manager_controls_config', $rows );
	}
}

if ( ! function_exists( 'onepress_font_manager_theme_mod_ids' ) ) {
	/**
	 * All theme_mod ids registered via `onepress_font_manager_controls_config()`.
	 *
	 * @return list<string>
	 */
	function onepress_font_manager_theme_mod_ids() {
		$ids = array();
		foreach ( onepress_font_manager_controls_config() as $row ) {
			if ( ! empty( $row['id'] ) && is_string( $row['id'] ) ) {
				$ids[] = $row['id'];
			}
		}
		return array_values( array_unique( $ids, SORT_REGULAR ) );
	}
}
