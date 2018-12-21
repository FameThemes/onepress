<?php
/*
 Colors
----------------------------------------------------------------------*/
$wp_customize->add_section(
	'onepress_colors_settings',
	array(
		'priority'    => 4,
		'title'       => esc_html__( 'Site Colors', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);
// Primary Color
$wp_customize->add_setting(
	'onepress_primary_color',
	array(
		'sanitize_callback'    => 'sanitize_hex_color_no_hash',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => '#03c4eb',
	)
);
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize,
		'onepress_primary_color',
		array(
			'label'       => esc_html__( 'Primary Color', 'onepress' ),
			'section'     => 'onepress_colors_settings',
			'description' => '',
			'priority'    => 1,
		)
	)
);

/**
 * Secondary Color
 *
 * @since 2.2.1
 */
$wp_customize->add_setting(
	'onepress_secondary_color',
	array(
		'sanitize_callback'    => 'sanitize_hex_color_no_hash',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => '#333333',
	)
);
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize,
		'onepress_secondary_color',
		array(
			'label'       => esc_html__( 'Secondary Color', 'onepress' ),
			'section'     => 'onepress_colors_settings',
			'description' => '',
			'priority'    => 2,
		)
	)
);
