<?php

/**
 * Button variants: one multi-target `Onepress_Customize_Styling_Control` (`onepress_styling_buttons`).
 *
 * Helpers: `inc/styling-controls-registry.php`. Customizer: `inc/customize-configs/options-buttons.php`.
 * Preset targets: `onepress_styling_button_target_elements_registry()`.
 *
 * @package OnePress
 */

if (! function_exists('onepress_styling_button_target_elements_registry')) {
	/**
	 * Preset targets for the buttons control (picker when adding / editing items).
	 *
	 * Filter: `onepress_styling_button_target_elements_registry`.
	 *
	 * @return array{categories: array<string, string>, elements: list<array{id: string, selector: string, name: string, category: string}>}
	 */
	function onepress_styling_button_target_elements_registry()
	{
		static $cache = null;
		if (null !== $cache) {
			return $cache;
		}

		$base = 'base';
		$hero_sections = 'hero_sections';
		$custom = 'custom';
		$data = array(
			'categories' => array(
				$base => esc_html__('Basic', 'onepress'),
				$hero_sections => esc_html__('Fontpage sections', 'onepress'),
			),
			'elements'   => array(
				array(
					'id'       => 'global',
					'selector' => 'body .btn, input[type=reset], input[type=submit], input[type=submit], .pirate-forms-submit-button, .contact-form div.wpforms-container-full .wpforms-form .wpforms-submit',
					'name'     => esc_html__('Global default', 'onepress'),
					'category' => $base,
				),
				array(
					'id'       => 'hero_primary',
					'selector' => '#hero .container .btn.btn-theme-primary',
					'name'     => esc_html__('Hero Button Primary', 'onepress'),
					'category' => $hero_sections,
				),
				array(
					'id'       => 'hereo_secondary',
					'selector' => '#hero .container .btn.btn-secondary-outline',
					'name'     => esc_html__('Hero Button Secondary', 'onepress'),
					'category' => $hero_sections,
				),
				array(
					'id'       => 'hero_cta',
					'selector' => 'body .aaat',
					'name'     => esc_html__('Section CTA Button', 'onepress'),
					'category' => $hero_sections,
					'locked'   => true,
					'message'  => wp_kses_post(
						sprintf(
							/* translators: %s: linked bold product name "OnePress Plus" (HTML). */
							__('Update to %s version to unlock this feature.', 'onepress'),
							'<a href="' . esc_url('https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_dashboard&utm_medium=compare_table&utm_campaign=onepress') . '" target="_blank" rel="noopener noreferrer"><strong>' . esc_html__('OnePress Plus', 'onepress') . '</strong></a>'
						)
					),
				),

				array(
					'id'       => 'custom_item',
					'selector' => '',
					'name'     => esc_html__('Custom target (create new)', 'onepress'),
					'category' => $custom,
					'locked'   => true,
					'multiple' => true,
					'message'  => wp_kses_post(
						sprintf(
							/* translators: %s: linked bold product name "OnePress Plus" (HTML). */
							__('Update to %s version to unlock this feature.', 'onepress'),
							'<a href="' . esc_url('https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_dashboard&utm_medium=compare_table&utm_campaign=onepress') . '" target="_blank" rel="noopener noreferrer"><strong>' . esc_html__('OnePress Plus', 'onepress') . '</strong></a>'
						)
					),
				),
			),
		);

		$cache = apply_filters('onepress_styling_button_target_elements_registry', $data);

		return $cache;
	}
}

if (! function_exists('onepress_styling_button_default_value_multiple')) {
	/**
	 * Default `items[]` for merged buttons control (normal + hover per variant).
	 *
	 * @return array<string, mixed>
	 */
	function onepress_styling_button_default_value_multiple()
	{

		return array(
			'_onepressStyling' => true,
			'items'            => [],
		);
	}
}

if (! function_exists('onepress_styling_button_controls_config')) {
	/**
	 * Buttons section: one multi-target styling control.
	 *
	 * @return array<int, array{id: string, setting: array<string, mixed>, control: array<string, mixed>}>
	 */
	function onepress_styling_button_controls_config()
	{
		$section = 'onepress_buttons';

		$button_states = array(
			array(
				'normal' => array(
					'label'    => __('Normal', 'onepress'),
					'selector' => '',
				),
			),
			array(
				'hover' => array(
					'label'    => __('Hover', 'onepress'),
					'selector' => ':hover',
				),
			),
		);

		$rows   = array();
		$rows[] = array(
			'id'      => 'onepress_styling_buttons',
			'setting' => array(
				'default'           => onepress_styling_button_default_value_multiple(),
				'sanitize_callback' => 'onepress_sanitize_styling_value_multi',
				'transport'         => 'postMessage',
			),
			'control' => array(
				'label'               => esc_html__('Buttons', 'onepress'),
				'section'             => $section,
				'priority'            => 10,
				'styling_breakpoints' => onepress_styling_default_breakpoints(),
				'styling_multiple'    => true,
				'styling_states'      => $button_states,
				'disable_fields'      => array('font_size'),
				'styling_groups'      => array('text', 'background', 'border', 'spacing', 'shadow'),
				'styling_hide_popover_heading'     => false,
				'styling_hide_gear_button'         => true,
				'styling_hide_preview_pick_button' => true,
				'styling_hide_state_tablist'       => false,
				'styling_font_family_source'       => 'local',
				'add_item_label'                   => __('Add button style', 'onepress'),
				'styling_target_elements'          => onepress_styling_button_target_elements_registry(),
			),
		);

		/**
		 * Button styling controls registry (Customizer).
		 *
		 * @param array<int, array{id: string, setting: array<string, mixed>, control: array<string, mixed>}> $rows
		 */
		return apply_filters('onepress_styling_button_controls_config', $rows);
	}
}
