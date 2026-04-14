<?php

/**
 * Typography registry: config rows for `Onepress_Customize_Styling_Control` (one row per theme_mod id).
 *
 * Helpers (theme_mod ids, base_selector maps, control lookup): `inc/styling-controls-registry.php`.
 * Customizer: `inc/customize-configs/options-typography.php`. Loaded from `inc/styling-css.php`.
 *
 * Preset target elements for typography controls: `onepress_styling_typography_target_elements_registry()`.
 *
 * @package OnePress
 */

if ( ! function_exists( 'onepress_styling_typography_target_elements_registry' ) ) {
	/**
	 * Default preset CSS targets for typography styling controls (Customizer UI).
	 *
	 * Filters (in order): `onepress_styling_typography_target_elements_registry`, then legacy `onepress_styling_target_elements_registry`.
	 *
	 * @return array{categories: array<string, string>, elements: list<array{id: string, selector: string, name: string, category: string}>}
	 */
	function onepress_styling_typography_target_elements_registry() {
		static $cache = null;
		if ( null !== $cache ) {
			return $cache;
		}

		$categories = array(
			'basic'   => esc_html__( 'Basic', 'onepress' ),
			'header'  => esc_html__( 'Header', 'onepress' ),
			'footer'  => esc_html__( 'Footer', 'onepress' ),
			'content' => esc_html__( 'Content', 'onepress' ),
			'sidebar' => esc_html__( 'Sidebar', 'onepress' ),
			'other'   => esc_html__( 'Other', 'onepress' ),
		);

		$elements = array(
			array(
				'id'       => 'onepress_typo_p',
				'selector' => 'body, body p',
				'name'     => esc_html__( 'Paragraph', 'onepress' ),
				'category' => 'basic',
			),
			array(
				'id'       => 'onepress_typo_site_title',
				'selector' => '#page .site-branding .site-title, #page .site-branding .site-text-logo',
				'name'     => esc_html__( 'Site Title', 'onepress' ),
				'category' => 'header',
			),
			array(
				'id'       => 'onepress_typo_site_tagline',
				'selector' => '#page .site-branding .site-description',
				'name'     => esc_html__( 'Site Tagline', 'onepress' ),
				'category' => 'header',
			),
			array(
				'id'       => 'onepress_typo_menu',
				'selector' => '.onepress-menu a',
				'name'     => esc_html__( 'Menu', 'onepress' ),
				'category' => 'header',
			),
			array(
				'id'       => 'onepress_hero_heading',
				'selector' => '.hero__content .hero-large-text, .hero__content .hcl2-content h1, .hero__content .hcl2-content h2, .hero__content .hcl2-content h3',
				'name'     => esc_html__( 'Hero Heading', 'onepress' ),
				'category' => 'content',
			),
			array(
				'id'       => 'onepress_typo_heading',
				'selector' => 'body h1, body h2, body h3, body h4, body h5, body h6, .entry-header .entry-title, body .section-title-area .section-title, body .section-title-area .section-subtitle, body .hero-content-style1 h2',
				'name'     => esc_html__( 'Heading', 'onepress' ),
				'category' => 'content',
			),
			array(
				'id'       => 'onepress_slider_slide_typo_title',
				'selector' => '.section-slider .section-op-slider .item--title',
				'name'     => esc_html__( 'Slider Slide Title', 'onepress' ),
				'category' => 'content',
			),
			array(
				'id'       => 'onepress_slider_slide_typo_content',
				'selector' => '.section-slider .section-op-slider .item--desc',
				'name'     => esc_html__( 'Slider Slide Content', 'onepress' ),
				'category' => 'content',
			),
		);

		$data  = array(
			'categories' => $categories,
			'elements'   => $elements,
		);
		$data  = apply_filters( 'onepress_styling_typography_target_elements_registry', $data );
		$cache = apply_filters( 'onepress_styling_target_elements_registry', $data );

		return $cache;
	}
}

if ( ! function_exists( 'onepress_styling_typography_controls_config' ) ) {
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
	 *   Optional: `description` (string) — help text under the control (Customizer `WP_Customize_Control` description; shown by `StylingControlApp`).
	 *   Optional: `styling_target_elements` (array) — preset targets for this control (`categories` + `elements`); see `onepress_styling_typography_target_elements_registry()`.
	 *
	 * @return array<int, array{id: string, setting: array<string, mixed>, control: array<string, mixed>}>
	 */
	function onepress_styling_typography_controls_config() {
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
			'section'                      => $section,
			'styling_breakpoints'          => onepress_styling_default_breakpoints(),
			'styling_multiple'             => false,
			'styling_states'               => false,
			'styling_groups'               => array( 'text' ),
			'styling_hide_popover_heading' => true,
			'styling_hide_state_tablist'   => true,
			'styling_font_family_source'   => 'local',
		);

		$rows = array();

		$rows[] = array(
			'id'      => 'onepress_styling_customs',
			'setting' => $setting_defaults_multiple,
			'control' => array_merge(
				$control_defaults,
				array(
					'label'       => esc_html__( 'Custom typography targets', 'onepress' ),
					'priority'           => 23,
					'styling_multiple'   => true,
					'styling_hide_state_tablist' => true,
					'disable_fields'     => array( 'color' ),
					'styling_groups'     => array( 'text' ),
					'styling_hide_popover_heading'     => false,
					'styling_hide_gear_button'         => true,
					'styling_hide_preview_pick_button' => true,
					'add_item_label'             => __( 'Add typography', 'onepress' ),
					'styling_target_elements'    => onepress_styling_typography_target_elements_registry(),
				)
			),
		);

		/**
		 * Typography styling controls registry (Customizer).
		 *
		 * @param array<int, array{id: string, setting: array<string, mixed>, control: array<string, mixed>}> $rows
		 */
		return apply_filters( 'onepress_styling_typography_controls_config', $rows );
	}
}
