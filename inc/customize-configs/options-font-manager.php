<?php
/**
 * Font manager (Customizer) — JSON theme_mod with optional Google Fonts axes.
 *
 * Front: `onepress_font_manager_enqueue_front_styles` (see `inc/font-manager.php`) enqueues
 * the Google stylesheet when `isGoogleFamily` is true. Filter `onepress_font_manager_theme_mod_id`
 * to point at a different setting id.
 *
 * @package OnePress
 */

$wp_customize->add_setting(
	'onepress_font_manager',
		array(
		'default'              => onepress_font_manager_default_value(),
		'sanitize_callback'    => 'onepress_sanitize_font_manager_value',
		'sanitize_js_callback' => array( 'Onepress_Customize_Font_Manager_Control', 'sanitize_value_for_js' ),
		'transport'            => 'refresh',
	)
);

$wp_customize->add_control(
	new Onepress_Customize_Font_Manager_Control(
		$wp_customize,
		'onepress_font_manager',
		array(
			'label'       => esc_html__( 'Font manager', 'onepress' ),
			'description' => esc_html__(
				'Maintain a list of fonts. For Google families, all styles are listed and selected by default; uncheck any you do not want loaded. Close discards unsaved editor changes.',
				'onepress'
			),
			'section'     => 'onepress_typography',
			'priority'    => 1,
		)
	)
);
