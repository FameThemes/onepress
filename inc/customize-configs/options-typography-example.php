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
if ( class_exists( 'OnePress_Slider_Customize_Control' ) ) {
	$wp_customize->register_control_type( 'OnePress_Slider_Customize_Control' );
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

$onepress_typo_demo_heading_default = wp_json_encode(
	array(
		'font-family'       => 'Georgia',
		'font-weight'       => '700',
		'font-style'        => 'normal',
		'font-size'         => '1.75rem',
		'font-size-tablet'  => '1.5rem',
		'font-size-mobile'  => '1.25rem',
		'line-height'       => '1.4',
		'letter-spacing'    => '0.02em',
		'text-decoration'   => 'none',
		'text-transform'    => 'none',
	)
);

$wp_customize->add_setting(
	'onepress_typo_demo_heading',
	array(
		'default'           => $onepress_typo_demo_heading_default,
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
	$onepress_spacing_demo_default = wp_json_encode(
		array(
			'padding-top'          => '32px',
			'padding-right'        => '24px',
			'padding-bottom'       => '32px',
			'padding-left'         => '24px',
			'padding-linked'       => '0',
			'padding-top-tablet'   => '24px',
			'padding-right-tablet' => '20px',
			'padding-bottom-tablet' => '24px',
			'padding-left-tablet'  => '20px',
			'padding-linked-tablet' => '0',
			'padding-top-mobile'   => '20px',
			'padding-right-mobile' => '16px',
			'padding-bottom-mobile' => '20px',
			'padding-left-mobile'  => '16px',
			'padding-linked-mobile' => '0',
		)
	);

	$wp_customize->add_setting(
		'onepress_spacing_demo_site_title',
		array(
			'default'           => $onepress_spacing_demo_default,
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
				// 'description'      => esc_html__( 'Padding for .site-title; live preview via postMessage (no full reload). Save & publish for the front end.', 'onepress' ),
				'section'          => 'onepress_typo_demo',
				'css_selector'     => '#features .container',
				'spacing_property' => 'padding',
			)
		)
	);
}

if ( class_exists( 'OnePress_Background_Customize_Control' ) && function_exists( 'onepress_background_sanitize' ) ) {
	$onepress_bg_demo_layer_devices = static function ( $color_hex ) {
		$layer = static function () use ( $color_hex ) {
			return array(
				'tab'        => 'color',
				'color'      => $color_hex,
				'gradient'   => '',
				'imageId'    => 0,
				'imageUrl'   => '',
				'size'       => 'cover',
				'repeat'     => 'no-repeat',
				'position'   => 'center center',
				'attachment' => 'scroll',
			);
		};
		return array(
			'desktop' => $layer(),
			'tablet'  => $layer(),
			'mobile'  => $layer(),
		);
	};

	$onepress_bg_demo_header_default = wp_json_encode(
		array(
			'_onepressBackground' => true,
			'_meta'               => array(
				'selector'          => '.site-header',
				'states'            => array( 'normal', 'hover', 'focus' ),
				'selectorsByState'  => array(
					'normal' => '.site-header',
					'hover'  => '.site-header:hover',
					'focus'  => '.site-header:focus',
				),
				'stateLabels'       => array(
					'normal' => esc_html__( 'Normal', 'onepress' ),
					'hover'  => esc_html__( 'When mouse hover', 'onepress' ),
					'focus'  => esc_html__( 'When mouse focus', 'onepress' ),
				),
			),
			'normal'              => $onepress_bg_demo_layer_devices( '#f6f7f7' ),
			'hover'               => $onepress_bg_demo_layer_devices( '#ededee' ),
			'focus'               => $onepress_bg_demo_layer_devices( '#e7f2fe' ),
		)
	);

	$wp_customize->add_setting(
		'onepress_bg_demo_header',
		array(
			'default'           => $onepress_bg_demo_header_default,
			'sanitize_callback' => 'onepress_background_sanitize',
			'transport'         => 'postMessage',
		)
	);

	$wp_customize->add_control(
		new OnePress_Background_Customize_Control(
			$wp_customize,
			'onepress_bg_demo_header',
			array(
				'label'       => esc_html__( 'Header background', 'onepress' ),
				'description' => esc_html__( 'Normal / hover / focus; per-device layers; live preview (postMessage). Save & publish for front end.', 'onepress' ),
				'section'     => 'onepress_typo_demo',
				'selector'    => array(
					'normal' => '.site-header',
					'hover' => '.site-header:hover',
					'focus' => '.site-header:focus',
				),
				'states'      => array(
					'normal' => esc_html__( 'Normal', 'onepress' ),
					'hover'  => esc_html__( 'When mouse hover', 'onepress' ),
					// 'focus'  => esc_html__( 'When mouse focus', 'onepress' ),
				),
			)
		)
	);
}

if ( class_exists( 'OnePress_Slider_Customize_Control' ) && function_exists( 'onepress_slider_sanitize_field' ) ) {
	$onepress_slider_demo_logo_default = wp_json_encode(
		array(
			'value'       => '196',
			'valueTablet' => '',
			'valueMobile' => '',
			'unit'        => 'px',
			'unitTablet'  => 'px',
			'unitMobile'  => 'px',
		)
	);

	$wp_customize->add_setting(
		'onepress_slider_demo_logo_width',
		array(
			'default'           => $onepress_slider_demo_logo_default,
			'sanitize_callback' => 'onepress_slider_sanitize_field',
			'transport'         => 'postMessage',
		)
	);

	$wp_customize->add_control(
		new OnePress_Slider_Customize_Control(
			$wp_customize,
			'onepress_slider_demo_logo_width',
			array(
				'label'        => esc_html__( 'Logo width', 'onepress' ),
				'description'  => esc_html__( 'Slider + value field; per device; live preview (postMessage). Targets custom logo in header.', 'onepress' ),
				'section'      => 'onepress_typo_demo',
				'css_selector' => '.custom-logo-link img, .custom-logo-link svg',
				'css_property' => 'width',
				'slider_min'   => 0,
				'slider_max'   => 600,
				'slider_step'  => 1,
			)
		)
	);
}
