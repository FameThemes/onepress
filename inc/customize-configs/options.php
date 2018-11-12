<?php
/**
 * Site Options
 */

$wp_customize->add_panel( 'onepress_options',
	array(
		'priority'       => 5,
		'capability'     => 'edit_theme_options',
		'theme_supports' => '',
		'title'          => esc_html__( 'Theme Options', 'onepress' ),
		'description'    => '',
	)
);


if ( ! function_exists( 'wp_get_custom_css' ) ) {  // Back-compat for WordPress < 4.7.

	/* Custom CSS Settings
	----------------------------------------------------------------------*/
	$wp_customize->add_section(
		'onepress_custom_code',
		array(
			'title' => __( 'Custom CSS', 'onepress' ),
			'panel' => 'onepress_options',
		)
	);


	$wp_customize->add_setting(
		'onepress_custom_css',
		array(
			'default'           => '',
			'sanitize_callback' => 'onepress_sanitize_css',
			'type'              => 'option',
		)
	);

	$wp_customize->add_control(
		'onepress_custom_css',
		array(
			'label'   => __( 'Custom CSS', 'onepress' ),
			'section' => 'onepress_custom_code',
			'type'    => 'textarea'
		)
	);
} else {
	$wp_customize->get_section( 'custom_css' )->priority = 994;
}