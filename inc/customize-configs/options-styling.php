<?php

/**
 * Element styling (Customizer) — demo setting using control type `styling`.
 *
 * @package OnePress
 */

$wp_customize->add_setting(
	'onepress_element_styling',
	array(
		'default'           => onepress_styling_get_default_json(),
		'sanitize_callback' => 'onepress_sanitize_styling_value',
		'transport'         => 'postMessage',
	)
);

$wp_customize->add_control(
	new Onepress_Customize_Styling_Control(
		$wp_customize,
		'onepress_element_styling',

		array(
			'label'       => esc_html__('Element styling test', 'onepress'),
			'description' => esc_html__('TEst Per state and breakpoint, enter CSS declarations only (no selectors or curly braces). Example: color: #2271b1; padding: 8px 12px;', 'onepress'),
			'section'     => 'onepress_global_settings',
			'styling_breakpoints' => onepress_styling_default_breakpoints(),
			'priority' => 5,
		)
	)
);
