<?php
/**
 * Customizer demo — typography, spacing, background, slider, switch, etc.
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
// Switch: do not register_control_type — it would print an empty JS content_template()
// and the Customizer would render a blank control. PHP render_content() is used instead.

if ( ! class_exists( 'OnePress_Typo_Customize_Control' ) ) {
	return;
}

$wp_customize->add_section(
	'onepress_typo_demo',
	array(
		'title'       => esc_html__( 'Advanced features demo', 'onepress' ),
		'description' => esc_html__( 'Examples: typography, spacing, background, slider, toggle switch. Typography preview targets #features .section-content; live preview uses postMessage where noted.', 'onepress' ),
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
				'selector'          => '.site-headerd_test',
				'states'            => array( 'normal', 'hover', 'focus' ),
				'selectorsByState'  => array(
					'normal' => '.site-headerd_test',
					'hover'  => '.site-headerd_test:hover',
					'focus'  => '.site-headerd_test:focus',
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

if ( class_exists( 'OnePress_Switch_Customize_Control' ) && function_exists( 'onepress_sanitize_switch' ) ) {
	$wp_customize->add_setting(
		'onepress_demo_switch_example',
		array(
			'default'           => 0,
			'sanitize_callback' => 'onepress_sanitize_switch',
			'transport'         => 'refresh',
		)
	);

	$wp_customize->add_control(
		new OnePress_Switch_Customize_Control(
			$wp_customize,
			'onepress_demo_switch_example',
			array(
				'label'       => esc_html__( 'Demo: toggle switch', 'onepress' ),
				'description' => esc_html__( 'Plain PHP/CSS control (no React). Title and switch on one row; description below. Saves as 1 or 0.', 'onepress' ),
				'section'     => 'onepress_typo_demo',
			)
		)
	);
}

if ( class_exists( 'OnePress_Layout_Customize_Control' ) && function_exists( 'onepress_sanitize_layout_value' ) ) {
	$onepress_demo_layout_text_allowed = array( 'demo_text_full', 'demo_text_left', 'demo_text_right' );
	$wp_customize->add_setting(
		'onepress_demo_layout_text',
		array(
			'default'           => 'demo_text_full',
			'sanitize_callback' => static function ( $v ) use ( $onepress_demo_layout_text_allowed ) {
				return onepress_sanitize_layout_value( $v, $onepress_demo_layout_text_allowed );
			},
			'transport'         => 'refresh',
		)
	);
	$wp_customize->add_control(
		new OnePress_Layout_Customize_Control(
			$wp_customize,
			'onepress_demo_layout_text',
			array(
				'label'       => esc_html__( 'Demo layout: text thumbnails', 'onepress' ),
				'description' => esc_html__( 'Grid columns = 2. Each choice uses type "text" (label inside the cell).', 'onepress' ),
				'section'     => 'onepress_typo_demo',
				'columns'     => 2,
				'item_min_height' => 50,
				'help_url'    => 'https://developer.wordpress.org/themes/customize-api/',
				'choices'     => array(
					array(
						'value'   => 'demo_text_full',
						'label'   => esc_html__( 'Full width', 'onepress' ),
						'type'    => 'text',
						'content' => esc_html__( 'Full', 'onepress' ),
					),
					array(
						'value'   => 'demo_text_left',
						'label'   => esc_html__( 'Sidebar left', 'onepress' ),
						'type'    => 'text',
						'content' => esc_html__( 'Left', 'onepress' ),
					),
					array(
						'value'   => 'demo_text_right',
						'label'   => esc_html__( 'Sidebar right', 'onepress' ),
						'type'    => 'text',
						'content' => esc_html__( 'Right', 'onepress' ),
					),
				),
			)
		)
	);

	$svg_full  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 36" width="48" height="36" aria-hidden="true"><rect x="4" y="4" width="40" height="6" rx="1" fill="#dcdcde"/><rect x="4" y="14" width="40" height="18" rx="1" fill="#e8e8e8"/><path stroke="#c3c4c7" stroke-width="1" d="M8 20h28M8 24h24M8 28h20"/></svg>';
	$svg_left  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 36" width="48" height="36" aria-hidden="true"><rect x="4" y="4" width="11" height="28" rx="1" fill="#dcdcde"/><rect x="18" y="4" width="26" height="8" rx="1" fill="#dcdcde"/><rect x="18" y="16" width="26" height="16" rx="1" fill="#e8e8e8"/><path stroke="#c3c4c7" stroke-width="1" d="M22 22h16M22 26h14"/></svg>';
	$svg_right = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 36" width="48" height="36" aria-hidden="true"><rect x="33" y="4" width="11" height="28" rx="1" fill="#dcdcde"/><rect x="4" y="4" width="26" height="8" rx="1" fill="#dcdcde"/><rect x="4" y="16" width="26" height="16" rx="1" fill="#e8e8e8"/><path stroke="#c3c4c7" stroke-width="1" d="M8 22h16M8 26h14"/></svg>';

	$onepress_demo_layout_svg_allowed = array( 'demo_svg_full', 'demo_svg_left', 'demo_svg_right' );
	$wp_customize->add_setting(
		'onepress_demo_layout_svg',
		array(
			'default'           => 'demo_svg_right',
			'sanitize_callback' => static function ( $v ) use ( $onepress_demo_layout_svg_allowed ) {
				return onepress_sanitize_layout_value( $v, $onepress_demo_layout_svg_allowed );
			},
			'transport'         => 'refresh',
		)
	);
	$wp_customize->add_control(
		new OnePress_Layout_Customize_Control(
			$wp_customize,
			'onepress_demo_layout_svg',
			array(
				'label'       => esc_html__( 'Demo layout: SVG thumbnails', 'onepress' ),
				'description' => esc_html__( 'Same grid idea with type "svg" (wireframe icons). Default matches “sidebar right”.', 'onepress' ),
				'section'     => 'onepress_typo_demo',
				'columns'     => 2,
				'item_min_height' => 80,
				'choices'     => array(
					array(
						'value'   => 'demo_svg_full',
						'label'   => esc_html__( 'Full width', 'onepress' ),
						'type'    => 'svg',
						'content' => $svg_full,
					),
					array(
						'value'   => 'demo_svg_left',
						'label'   => esc_html__( 'Sidebar left', 'onepress' ),
						'type'    => 'svg',
						'content' => $svg_left,
					),
					array(
						'value'   => 'demo_svg_right',
						'label'   => esc_html__( 'Sidebar right', 'onepress' ),
						'type'    => 'svg',
						'content' => $svg_right,
					),
				),
			)
		)
	);

	$onepress_demo_layout_img_a = includes_url( 'images/w-logo-blue.png' );
	$onepress_demo_layout_img_b = includes_url( 'images/rss.png' );
	$onepress_demo_layout_img_c = includes_url( 'images/media/default.svg' );

	$onepress_demo_layout_image_allowed = array( 'demo_img_a', 'demo_img_b', 'demo_img_c' );
	$wp_customize->add_setting(
		'onepress_demo_layout_image',
		array(
			'default'           => 'demo_img_a',
			'sanitize_callback' => static function ( $v ) use ( $onepress_demo_layout_image_allowed ) {
				return onepress_sanitize_layout_value( $v, $onepress_demo_layout_image_allowed );
			},
			'transport'         => 'refresh',
		)
	);
	$wp_customize->add_control(
		new OnePress_Layout_Customize_Control(
			$wp_customize,
			'onepress_demo_layout_image',
			array(
				'label'       => esc_html__( 'Demo layout: image URLs', 'onepress' ),
				'description' => esc_html__( 'type "image" with content = URL (here: wp-includes images). Columns = 3.', 'onepress' ),
				'section'     => 'onepress_typo_demo',
				'columns'     => 3,
				'item_min_height' => 80,
				'choices'     => array(
					array(
						'value'   => 'demo_img_a',
						'label'   => esc_html__( 'WordPress logo', 'onepress' ),
						'type'    => 'image',
						'content' => $onepress_demo_layout_img_a,
					),
					array(
						'value'   => 'demo_img_b',
						'label'   => esc_html__( 'RSS icon', 'onepress' ),
						'type'    => 'image',
						'content' => $onepress_demo_layout_img_b,
					),
					array(
						'value'   => 'demo_img_c',
						'label'   => esc_html__( 'Media placeholder', 'onepress' ),
						'type'    => 'image',
						'content' => $onepress_demo_layout_img_c,
					),
				),
			)
		)
	);
}
