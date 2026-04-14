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

		$cat = 'buttons';
		$data = array(
			'categories' => array(
				$cat => esc_html__('Buttons', 'onepress'),
			),
			'elements'   => array(
				array(
					'id'       => 'onepress_btn_primary',
					'selector' => '.btn.btn-primary',
					'name'     => esc_html__('Primary button', 'onepress'),
					'category' => $cat,
				),
				array(
					'id'       => 'onepress_btn_secondary',
					'selector' => '.btn.btn-secondary',
					'name'     => esc_html__('Secondary button', 'onepress'),
					'category' => $cat,
				),
				array(
					'id'       => 'onepress_btn_outline',
					'selector' => '.btn.btn-outline-primary',
					'name'     => esc_html__('Outline button', 'onepress'),
					'category' => $cat,
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

		$variants = array(
			array(
				'id'       => 'onepress_btn_primary',
				'title'    => esc_html__('Primary button', 'onepress'),
				'selector' => 'body .btn.btn-theme-primary',
			),
			array(
				'id'       => 'onepress_btn_secondary',
				'title'    => esc_html__('Secondary button', 'onepress'),
				'selector' => 'body .nav-links a, body .nav-links .page-numbers, .entry-content .wp-block-button__link, input[type=reset], input[type=submit], input[type=submit], .pirate-forms-submit-button, .contact-form div.wpforms-container-full .wpforms-form .wpforms-submit',
			),
			array(
				'id'       => 'onepress_btn_outline',
				'title'    => esc_html__('Outline button', 'onepress'),
				'selector' => 'body .btn.btn-secondary-outline',
			),
		);

		$items = array();
		foreach ($variants as $v) {
			$one = onepress_styling_get_default_value_from_states_template($button_states);
			$sel = $v['selector'];
			$one['_meta']['baseSelector'] = $sel;
			$one['_meta']['elId']         = $v['id'];
			$one['_meta']['elName']       = $v['title'];
			$one['id']                    = $v['id'];
			$one['title']                 = $v['title'];
			$one['selector']              = $sel;
			$items[]                      = $one;
		}

		return array(
			'_onepressStyling' => true,
			'items'            => $items,
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
				// 'description'         => esc_html__(
				// 	'Style primary, secondary, and outline buttons. Add rows from presets or edit each variant. Normal and hover per breakpoint.',
				// 	'onepress'
				// ),
				'section'             => $section,
				'priority'            => 10,
				'styling_breakpoints' => onepress_styling_default_breakpoints(),
				'styling_multiple'    => true,
				'styling_states'      => $button_states,
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
