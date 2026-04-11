<?php
/**
 * Header options (declarative list).
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	array(
		'type'        => 'section',
		'id'          => 'onepress_header_settings',
		'priority'    => 10,
		'title'       => esc_html__( 'Header', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	),
	array(
		'id'          => 'onepress_header_width',
		'control'     => 'wp',
		'input_type'  => 'select',
		'label'       => esc_html__( 'Header Width', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'default'     => 'contained',
		'transport'   => 'postMessage',
		'choices'     => array(
			'full-width' => esc_html__( 'Full Width', 'onepress' ),
			'contained'  => esc_html__( 'Contained', 'onepress' ),
		),
	),
	array(
		'id'          => 'onepress_header_position',
		'control'     => 'wp',
		'input_type'  => 'select',
		'label'       => esc_html__( 'Header Position', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'default'     => 'top',
		'transport'   => 'postMessage',
		'setting'     => array(
			'active_callback' => 'onepress_showon_frontpage',
		),
		'choices'     => array(
			'top'        => esc_html__( 'Top', 'onepress' ),
			'below_hero' => esc_html__( 'Below Hero Slider', 'onepress' ),
		),
	),
	array(
		'id'          => 'onepress_sticky_header_disable',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'label'       => esc_html__( 'Disable Sticky Header?', 'onepress' ),
		'description' => esc_html__( 'Check this box to disable sticky header when scroll.', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'default'     => '',
		'transport'   => 'postMessage',
	),
	array(
		'id'          => 'onepress_vertical_align_menu',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'label'       => esc_html__( 'Center vertical align for menu', 'onepress' ),
		'description' => esc_html__( 'If you use logo and your logo is too tall, check this box to auto vertical align menu.', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'default'     => '',
	),
	array(
		'id'          => 'onepress_header_scroll_logo',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'label'       => esc_html__( 'Scroll to top when click to the site logo or site title, only apply on front page.', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'default'     => 0,
		'setting'     => array(
			'active_callback' => '',
		),
	),
	array(
		'id'      => 'onepress_header_bg_color',
		'control' => 'color',
		'default' => '',
		'setting' => array(
			'sanitize_js_callback' => 'maybe_hash_hex_color',
		),
		'label'       => esc_html__( 'Background Color', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => '',
	),
	array(
		'id'      => 'onepress_logo_text_color',
		'control' => 'color',
		'default' => '',
		'setting' => array(
			'sanitize_js_callback' => 'maybe_hash_hex_color',
		),
		'label'       => esc_html__( 'Site Title Color', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => esc_html__( "Only set if you don't use an image logo.", 'onepress' ),
	),
	array(
		'id'      => 'onepress_tagline_text_color',
		'control' => 'color',
		'default' => '',
		'setting' => array(
			'sanitize_js_callback' => 'maybe_hash_hex_color',
		),
		'label'       => esc_html__( 'Site Tagline Color', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => esc_html__( 'Only set if display site tagline.', 'onepress' ),
	),
	array(
		'id'      => 'onepress_menu_color',
		'control' => 'color',
		'default' => '',
		'setting' => array(
			'sanitize_js_callback' => 'maybe_hash_hex_color',
		),
		'label'       => esc_html__( 'Menu Link Color', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => '',
	),
	array(
		'id'      => 'onepress_menu_hover_color',
		'control' => 'color',
		'default' => '',
		'setting' => array(
			'sanitize_js_callback' => 'maybe_hash_hex_color',
		),
		'label'       => esc_html__( 'Menu Link Hover/Active Color', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => '',
	),
	array(
		'id'      => 'onepress_menu_hover_bg_color',
		'control' => 'color',
		'default' => '',
		'setting' => array(
			'sanitize_js_callback' => 'maybe_hash_hex_color',
		),
		'label'       => esc_html__( 'Menu Link Hover/Active BG Color', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => '',
	),
	array(
		'id'      => 'onepress_menu_toggle_button_color',
		'control' => 'color',
		'default' => '',
		'setting' => array(
			'sanitize_js_callback' => 'maybe_hash_hex_color',
		),
		'label'       => esc_html__( 'Responsive Menu Button Color', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => '',
	),
	array(
		'id'          => 'onepress_header_transparent',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'label'       => esc_html__( 'Header Transparent', 'onepress' ),
		'description' => esc_html__( 'Apply for front page template only.', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'default'     => '',
		'transport'   => 'postMessage',
		'setting'     => array(
			'active_callback' => 'onepress_showon_frontpage',
		),
	),
	array(
		'id'            => 'onepress_transparent_logo',
		'control_class' => 'WP_Customize_Image_Control',
		'label'         => esc_html__( 'Transparent Logo', 'onepress' ),
		'description'   => esc_html__( 'Only apply when transparent header option is checked.', 'onepress' ),
		'section'       => 'onepress_header_settings',
		'default'       => '',
		'transport'     => 'postMessage',
		'setting'       => array(
			'sanitize_callback' => 'sanitize_text_field',
		),
	),
	array(
		'id'            => 'onepress_transparent_retina_logo',
		'control_class' => 'WP_Customize_Image_Control',
		'label'         => esc_html__( 'Transparent Retina Logo', 'onepress' ),
		'description'   => esc_html__( 'Only apply when transparent header option is checked.', 'onepress' ),
		'section'       => 'onepress_header_settings',
		'default'       => '',
		'transport'     => 'postMessage',
		'setting'       => array(
			'sanitize_callback' => 'sanitize_text_field',
		),
	),
	array(
		'id'          => 'onepress_transparent_logo_height',
		'control'     => 'wp',
		'input_type'  => 'text',
		'label'       => esc_html__( 'Transparent Logo Height in Pixel', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => '',
		'default'     => '',
	),
	array(
		'id'      => 'onepress_transparent_site_title_c',
		'control' => 'color',
		'default' => '',
		'label'   => esc_html__( 'Transparent Site Title Color', 'onepress' ),
		'section' => 'onepress_header_settings',
		'description' => '',
	),
	array(
		'id'      => 'onepress_transparent_tag_title_c',
		'control' => 'color',
		'default' => '',
		'label'   => esc_html__( 'Transparent Site Tagline Color', 'onepress' ),
		'section' => 'onepress_header_settings',
		'description' => '',
	),
);
