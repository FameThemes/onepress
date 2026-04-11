<?php
/**
 * Theme Options panel and legacy Custom CSS for WordPress older than 4.7.
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$definitions = array(
	array(
		'type'           => 'panel',
		'id'             => 'onepress_options',
		'priority'       => 5,
		'capability'     => 'edit_theme_options',
		'theme_supports' => '',
		'title'          => esc_html__( 'Theme Options', 'onepress' ),
		'description'    => '',
	),
);

if ( ! function_exists( 'wp_get_custom_css' ) ) {
	$definitions[] = array(
		'type'        => 'section',
		'id'          => 'onepress_custom_code',
		'title'       => esc_html__( 'Custom CSS', 'onepress' ),
		'panel'       => 'onepress_options',
	);
	$definitions[] = array(
		'id'          => 'onepress_custom_css',
		'control'     => 'wp',
		'input_type'  => 'textarea',
		'label'       => esc_html__( 'Custom CSS', 'onepress' ),
		'section'     => 'onepress_custom_code',
		'setting'     => array(
			'default'           => '',
			'sanitize_callback' => 'onepress_sanitize_css',
			'type'              => 'option',
		),
	);
} else {
	$definitions[] = array(
		'type'     => 'callback',
		'callback' => static function ( $wp_customize ) {
			$section = $wp_customize->get_section( 'custom_css' );
			if ( $section ) {
				$section->priority = 994;
			}
		},
	);
}

return $definitions;
