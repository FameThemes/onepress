<?php
/**
 * Advanced features demo — typography, spacing, background controls (Customizer).
 *
 * @package onepress
 */

if ( class_exists( 'OnePress_Typo_Customize_Control' ) ) {
	$wp_customize->register_control_type( 'OnePress_Typo_Customize_Control' );
}
if ( class_exists( 'OnePress_Spacing_Customize_Control' ) ) {
	$wp_customize->register_control_type( 'OnePress_Spacing_Customize_Control' );
}
if ( class_exists( 'OnePress_Background_Customize_Control' ) ) {
	$wp_customize->register_control_type( 'OnePress_Background_Customize_Control' );
}

if ( ! class_exists( 'OnePress_Typo_Customize_Control' ) ) {
	return;
}

$wp_customize->add_section(
	'onepress_typo_demo',
	array(
		'title'       => esc_html__( 'Advanced features demo', 'onepress' ),
		'description' => esc_html__( 'Example typography control for testing. Output targets #features .section-content; live preview uses postMessage (no full reload).', 'onepress' ),
		'priority'    => 35,
	)
);

$wp_customize->add_setting(
	'onepress_typo_demo_heading',
	array(
		'default'           => '',
		'sanitize_callback' => 'onepress_typo_sanitize_field',
		'transport'         => 'postMessage',
	)
);

$wp_customize->add_control(
	new OnePress_Typo_Customize_Control(
		$wp_customize,
		'onepress_typo_demo_heading',
		array(
			'label'        => esc_html__( 'Demo: site title link', 'onepress' ),
			'description'  => esc_html__( 'Preview updates live; save & publish to apply on the site.', 'onepress' ),
			'section'      => 'onepress_typo_demo',
			'css_selector' => '#features .section-content',
			'fields'       => array(
				'font-family'     => true,
				'font-style'      => true,
				'font-size'       => true,
				'line-height'     => true,
				'letter-spacing'  => true,
				'text-decoration' => true,
				'text-transform'  => true,
			),
		)
	)
);

if ( class_exists( 'OnePress_Spacing_Customize_Control' ) && function_exists( 'onepress_spacing_sanitize_field' ) ) {
	$wp_customize->add_setting(
		'onepress_spacing_demo_site_title',
		array(
			'default'           => '',
			'sanitize_callback' => 'onepress_spacing_sanitize_field',
			'transport'         => 'postMessage',
		)
	);

	$wp_customize->add_control(
		new OnePress_Spacing_Customize_Control(
			$wp_customize,
			'onepress_spacing_demo_site_title',
			array(
				'label'            => esc_html__( 'Demo: site title spacing', 'onepress' ),
				'description'      => esc_html__( 'Padding for .site-title; live preview via postMessage (no full reload). Save & publish for the front end.', 'onepress' ),
				'section'          => 'onepress_typo_demo',
				'css_selector'     => '#features .container',
				'spacing_property' => 'padding',
			)
		)
	);
}

if ( class_exists( 'OnePress_Background_Customize_Control' ) && function_exists( 'onepress_background_sanitize' ) ) {
	$wp_customize->add_setting(
		'onepress_bg_demo_header',
		array(
			'default'           => '',
			'sanitize_callback' => 'onepress_background_sanitize',
			'transport'         => 'postMessage',
		)
	);

	$wp_customize->add_control(
		new OnePress_Background_Customize_Control(
			$wp_customize,
			'onepress_bg_demo_header',
			array(
				'label'       => esc_html__( 'Demo: site header background', 'onepress' ),
				'description' => esc_html__( 'Normal / hover / focus; per-device layers; live preview (postMessage). Save & publish for front end.', 'onepress' ),
				'section'     => 'onepress_typo_demo',
				'selector'    => '.site-header',
				'states'      => array( 'normal', 'hover', 'focus' ),
			)
		)
	);
}
