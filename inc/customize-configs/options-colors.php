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
		// Since 2.4.1: live preview via `customizer-liveview.js`. The
		// handler updates `--wp--preset--color--primary` on the iframe
		// `:root` — every SCSS consumer (`variables.$primary`) and every
		// inline rule emitted by `template-tags.php` reads through that
		// var, so a single style.setProperty propagates instantly.
		'transport'            => 'postMessage',
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
		// Since 2.4.1: live preview — see note on `onepress_primary_color`.
		'transport'            => 'postMessage',
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
