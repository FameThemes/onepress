<?php
/**
 * Section: Services (declarative list, merged in customize-option-definitions.php).
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Onepress_Config', false ) || ! Onepress_Config::is_section_active( 'services' ) ) {
	return array();
}

$ctx = isset( $GLOBALS['onepress_customize_builder_context'] ) && is_array( $GLOBALS['onepress_customize_builder_context'] )
	? $GLOBALS['onepress_customize_builder_context']
	: array();
$option_pages = isset( $ctx['option_pages'] ) && is_array( $ctx['option_pages'] )
	? $ctx['option_pages']
	: array( 0 => esc_html__( 'Select page', 'onepress' ) );

return array(
	array(
		'type'            => 'panel',
		'id'              => 'onepress_services',
		'priority'        => 170,
		'title'           => esc_html__( 'Section: Services', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage',
	),
	array(
		'type'        => 'section',
		'id'          => 'onepress_service_settings',
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_services',
	),
	array(
		'id'          => 'onepress_services_disable',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'section'     => 'onepress_service_settings',
		'label'       => esc_html__( 'Hide this section?', 'onepress' ),
		'description' => esc_html__( 'Check this box to hide this section.', 'onepress' ),
		'default'     => '',
	),
	array(
		'id'                => 'onepress_services_id',
		'control'           => 'wp',
		'input_type'        => 'text',
		'section'           => 'onepress_service_settings',
		'label'             => esc_html__( 'Section ID:', 'onepress' ),
		'description'       => esc_html__( 'The section ID should be English character, lowercase and no space.', 'onepress' ),
		'default'           => esc_html__( 'services', 'onepress' ),
		'sanitize_callback' => 'onepress_sanitize_text',
	),
	array(
		'id'          => 'onepress_services_title',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_service_settings',
		'label'       => esc_html__( 'Section Title', 'onepress' ),
		'description' => '',
		'default'     => esc_html__( 'Our Services', 'onepress' ),
	),
	array(
		'id'          => 'onepress_services_subtitle',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_service_settings',
		'label'       => esc_html__( 'Section Subtitle', 'onepress' ),
		'description' => '',
		'default'     => esc_html__( 'Section subtitle', 'onepress' ),
	),
	array(
		'id'          => 'onepress_services_desc',
		'control'     => 'editor',
		'section'     => 'onepress_service_settings',
		'label'       => esc_html__( 'Section Description', 'onepress' ),
		'description' => '',
		'default'     => '',
		'setting'     => array(
			'sanitize_callback' => 'onepress_sanitize_text',
			'default'           => '',
		),
	),
	array(
		'id'          => 'onepress_service_layout',
		'control'     => 'wp',
		'input_type'  => 'select',
		'section'     => 'onepress_service_settings',
		'label'       => esc_html__( 'Services Layout Settings', 'onepress' ),
		'description' => '',
		'default'     => '6',
		'choices'     => array(
			'3'  => esc_html__( '4 Columns', 'onepress' ),
			'4'  => esc_html__( '3 Columns', 'onepress' ),
			'6'  => esc_html__( '2 Columns', 'onepress' ),
			'12' => esc_html__( '1 Column', 'onepress' ),
		),
	),
	array(
		'type'     => 'callback',
		'callback' => static function ( $wp_customize ) {
			if ( function_exists( 'onepress_add_upsell_for_section' ) ) {
				onepress_add_upsell_for_section( $wp_customize, 'onepress_service_settings' );
			}
		},
	),
	array(
		'type'        => 'section',
		'id'          => 'onepress_service_content',
		'priority'    => 6,
		'title'       => esc_html__( 'Section Content', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_services',
	),
	array(
		'id'            => 'onepress_services',
		'control'       => 'repeatable',
		'label'         => esc_html__( 'Service content', 'onepress' ),
		'description'   => '',
		'section'       => 'onepress_service_content',
		'live_title_id' => 'content_page',
		'title_format'  => '[live_title]',
		'max_item'      => 4,
		'limited_msg'   => wp_kses_post(
			__( 'Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> to be able to add more items and unlock other premium features!', 'onepress' )
		),
		'fields'        => array(
			'icon_type'    => array(
				'title'   => esc_html__( 'Custom icon', 'onepress' ),
				'type'    => 'select',
				'options' => array(
					'icon'  => esc_html__( 'Icon', 'onepress' ),
					'image' => esc_html__( 'image', 'onepress' ),
				),
			),
			'icon'         => array(
				'title'    => esc_html__( 'Icon', 'onepress' ),
				'type'     => 'icon',
				'required' => array( 'icon_type', '=', 'icon' ),
			),
			'image'        => array(
				'title'    => esc_html__( 'Image', 'onepress' ),
				'type'     => 'media',
				'required' => array( 'icon_type', '=', 'image' ),
			),
			'content_page' => array(
				'title'   => esc_html__( 'Select a page', 'onepress' ),
				'type'    => 'select',
				'options' => $option_pages,
			),
			'enable_link'  => array(
				'title' => esc_html__( 'Link to single page', 'onepress' ),
				'type'  => 'checkbox',
			),
		),
		'transport'     => 'refresh',
		'setting'       => array(
			'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
			'transport'         => 'refresh',
		),
	),
	array(
		'id'          => 'onepress_service_icon_size',
		'control'     => 'wp',
		'input_type'  => 'select',
		'section'     => 'onepress_service_content',
		'label'       => esc_html__( 'Icon Size', 'onepress' ),
		'description' => '',
		'default'     => '5x',
		'sanitize_callback' => 'onepress_sanitize_select',
		'choices'     => array(
			'5x' => esc_html__( '5x', 'onepress' ),
			'4x' => esc_html__( '4x', 'onepress' ),
			'3x' => esc_html__( '3x', 'onepress' ),
			'2x' => esc_html__( '2x', 'onepress' ),
			'1x' => esc_html__( '1x', 'onepress' ),
		),
	),
	array(
		'id'          => 'onepress_service_content_source',
		'control'     => 'wp',
		'input_type'  => 'select',
		'section'     => 'onepress_service_content',
		'label'       => esc_html__( 'Item content source', 'onepress' ),
		'description' => '',
		'default'     => 'excerpt',
		'choices'     => array(
			'content' => esc_html__( 'Full Page Content', 'onepress' ),
			'excerpt' => esc_html__( 'Page Excerpt', 'onepress' ),
		),
	),
);
