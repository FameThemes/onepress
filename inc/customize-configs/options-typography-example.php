<?php
/**
 * Advanced features demo — typography control (Customizer).
 *
 * @package onepress
 */

if ( ! class_exists( 'OnePress_Typo_Customize_Control' ) ) {
	return;
}

$wp_customize->register_control_type( 'OnePress_Typo_Customize_Control' );

$wp_customize->add_section(
	'onepress_typo_demo',
	array(
		'title'       => esc_html__( 'Advanced features demo', 'onepress' ),
		'description' => esc_html__( 'Example typography control for testing. Output targets .site-title a on the front end.', 'onepress' ),
		'priority'    => 35,
	)
);

$wp_customize->add_setting(
	'onepress_typo_demo_heading',
	array(
		'default'           => '',
		'sanitize_callback' => 'onepress_typo_sanitize_field',
		'transport'         => 'refresh',
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
			'css_selector' => '.site-title a',
			'fields'       => array(
				'font-family'     => true,
				'font-style'      => true,
				'font-size'       => true,
				'line-height'     => true,
				'letter-spacing'  => true,
				'text-decoration' => true,
				'text-transform'  => true,
				'color'           => true,
			),
		)
	)
);
