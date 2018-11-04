<?php
/**
 * Theme Option: Header.
 *
 * @package OnePress\Customizer
 * @since 2.0.8 Added transparent logo height.
 * @since Unknown
 */

// Add settings section.
$wp_customize->add_section(
	'onepress_header_settings',
	array(
		'priority'    => 5,
		'title'       => esc_html__( 'Header', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);

// Header width (contained/full width) settings.
$wp_customize->add_setting(
	'onepress_header_width',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => 'contained',
		'transport'         => 'postMessage',
	)
);

// Header width (contained/full width) control.
$wp_customize->add_control(
	'onepress_header_width',
	array(
		'type'    => 'select',
		'label'   => esc_html__( 'Header Width', 'onepress' ),
		'section' => 'onepress_header_settings',
		'choices' => array(
			'full-width' => esc_html__( 'Full Width', 'onepress' ),
			'contained'  => esc_html__( 'Contained', 'onepress' ),
		),
	)
);

// Header position setting.
$wp_customize->add_setting(
	'onepress_header_position',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => 'top',
		'transport'         => 'postMessage',
		'active_callback'   => 'onepress_showon_frontpage',
	)
);

// Header position control.
$wp_customize->add_control(
	'onepress_header_position',
	array(
		'type'    => 'select',
		'label'   => esc_html__( 'Header Position', 'onepress' ),
		'section' => 'onepress_header_settings',
		'choices' => array(
			'top'        => esc_html__( 'Top', 'onepress' ),
			'below_hero' => esc_html__( 'Below Hero Slider', 'onepress' ),
		),
	)
);

// Disable Sticky Header setting.
$wp_customize->add_setting(
	'onepress_sticky_header_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
		'transport'         => 'postMessage',
	)
);

// Disable Sticky Header control.
$wp_customize->add_control(
	'onepress_sticky_header_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Disable Sticky Header?', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => esc_html__( 'Check this box to disable sticky header when scroll.', 'onepress' ),
	)
);

// Center menu vertically setting.
$wp_customize->add_setting(
	'onepress_vertical_align_menu',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
	)
);

// Center menu vertically control.
$wp_customize->add_control(
	'onepress_vertical_align_menu',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Center vertical align for menu', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => esc_html__( 'If you use logo and your logo is too tall, check this box to auto vertical align menu.', 'onepress' ),
	)
);

// Scroll to top when clicking on logo setting.
$wp_customize->add_setting(
	'onepress_header_scroll_logo',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => 0,
		'active_callback'   => '',
	)
);

// Scroll to top when clicking on logo control.
$wp_customize->add_control(
	'onepress_header_scroll_logo',
	array(
		'type'    => 'checkbox',
		'label'   => esc_html__( 'Scroll to top when click to the site logo or site title, only apply on front page.', 'onepress' ),
		'section' => 'onepress_header_settings',
	)
);

// Header background color setting.
$wp_customize->add_setting(
	'onepress_header_bg_color',
	array(
		'sanitize_callback'    => 'sanitize_hex_color_no_hash',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => '',
	)
);

// Header background color control.
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize, 'onepress_header_bg_color',
		array(
			'label'       => esc_html__( 'Background Color', 'onepress' ),
			'section'     => 'onepress_header_settings',
			'description' => '',
		)
	)
);

// Site Title Color setting.
$wp_customize->add_setting(
	'onepress_logo_text_color',
	array(
		'sanitize_callback'    => 'sanitize_hex_color_no_hash',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => '',
	)
);

// Site Title Color control.
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize, 'onepress_logo_text_color',
		array(
			'label'       => esc_html__( 'Site Title Color', 'onepress' ),
			'section'     => 'onepress_header_settings',
			'description' => esc_html__( 'Only set if you don\'t use an image logo.', 'onepress' ),
		)
	)
);

// Site Tagline Color setting.
$wp_customize->add_setting(
	'onepress_tagline_text_color',
	array(
		'sanitize_callback'    => 'sanitize_hex_color_no_hash',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => '',
	)
);

// Site Tagline Color control.
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize, 'onepress_tagline_text_color',
		array(
			'label'       => esc_html__( 'Site Tagline Color', 'onepress' ),
			'section'     => 'onepress_header_settings',
			'description' => esc_html__( 'Only set if display site tagline.', 'onepress' ),
		)
	)
);

// Menu link color setting.
$wp_customize->add_setting(
	'onepress_menu_color',
	array(
		'sanitize_callback'    => 'sanitize_hex_color_no_hash',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => '',
	)
);

// Menu link color control.
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize, 'onepress_menu_color',
		array(
			'label'       => esc_html__( 'Menu Link Color', 'onepress' ),
			'section'     => 'onepress_header_settings',
			'description' => '',
		)
	)
);

// Menu link hover and active color setting.
$wp_customize->add_setting(
	'onepress_menu_hover_color',
	array(
		'sanitize_callback'    => 'sanitize_hex_color_no_hash',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => '',
	)
);

// Menu link hover and active color control.
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize, 'onepress_menu_hover_color',
		array(
			'label'       => esc_html__( 'Menu Link Hover/Active Color', 'onepress' ),
			'section'     => 'onepress_header_settings',
			'description' => '',

		)
	)
);

// Menu link hover and active background color setting.
$wp_customize->add_setting(
	'onepress_menu_hover_bg_color',
	array(
		'sanitize_callback'    => 'sanitize_hex_color_no_hash',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => '',
	)
);

// Menu link hover and active background color control.
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize, 'onepress_menu_hover_bg_color',
		array(
			'label'       => esc_html__( 'Menu Link Hover/Active BG Color', 'onepress' ),
			'section'     => 'onepress_header_settings',
			'description' => '',
		)
	)
);

// Toggle menu button color setting.
$wp_customize->add_setting(
	'onepress_menu_toggle_button_color',
	array(
		'sanitize_callback'    => 'sanitize_hex_color_no_hash',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => '',
	)
);

// Toggle menu button color control.
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize, 'onepress_menu_toggle_button_color',
		array(
			'label'       => esc_html__( 'Responsive Menu Button Color', 'onepress' ),
			'section'     => 'onepress_header_settings',
			'description' => '',
		)
	)
);

// Enable transparent header setting.
$wp_customize->add_setting(
	'onepress_header_transparent',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
		'active_callback'   => 'onepress_showon_frontpage',
		'transport'         => 'postMessage',
	)
);

// Enable transparent header control.
$wp_customize->add_control(
	'onepress_header_transparent',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Header Transparent', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => esc_html__( 'Apply for front page template only.', 'onepress' ),
	)
);

// Transparent header logo setting.
$wp_customize->add_setting(
	'onepress_transparent_logo',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
		'transport'         => 'postMessage',
	)
);

// Transparent header logo control.
$wp_customize->add_control(
	new WP_Customize_Image_Control(
		$wp_customize,
		'onepress_transparent_logo',
		array(
			'label'       => esc_html__( 'Transparent Logo', 'onepress' ),
			'section'     => 'onepress_header_settings',
			'description' => esc_html__( 'Only apply when transparent header option is checked.', 'onepress' ),
		)
	)
);

// Transparent header retina logo setting.
$wp_customize->add_setting(
	'onepress_transparent_retina_logo',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
		'transport'         => 'postMessage',
	)
);

// Transparent header retina logo control.
$wp_customize->add_control(
	new WP_Customize_Image_Control(
		$wp_customize,
		'onepress_transparent_retina_logo',
		array(
			'label'       => esc_html__( 'Transparent Retina Logo', 'onepress' ),
			'description' => esc_html__( 'Only apply when transparent header option is checked.', 'onepress' ),
			'section'     => 'onepress_header_settings',
		)
	)
);

// Transparent header logo height setting.
$wp_customize->add_setting(
	'onepress_transparent_logo_height',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
	)
);

// Transparent header logo height control.
$wp_customize->add_control(
	'onepress_transparent_logo_height',
	array(
		'label'       => esc_html__( 'Transparent Logo Height in Pixel', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => '',
	)
);

// Transparent header site title color setting.
$wp_customize->add_setting(
	'onepress_transparent_site_title_c',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => '',
	)
);

// Transparent header site title color control.
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize,
		'onepress_transparent_site_title_c',
		array(
			'label'       => esc_html__( 'Transparent Site Title Color', 'onepress' ),
			'section'     => 'onepress_header_settings',
			'description' => '',
		)
	)
);

// Transparent header tagline color setting.
$wp_customize->add_setting(
	'onepress_transparent_tag_title_c',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => '',
	)
);

// Transparent header tagline color control.
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize,
		'onepress_transparent_tag_title_c',
		array(
			'label'       => esc_html__( 'Transparent Site Tagline Color', 'onepress' ),
			'section'     => 'onepress_header_settings',
			'description' => '',
		)
	)
);
