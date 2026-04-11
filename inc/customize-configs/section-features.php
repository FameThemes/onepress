<?php
/**
 * Section: Features (declarative list, merged in customize-option-definitions.php).
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Onepress_Config', false ) || ! Onepress_Config::is_section_active( 'features' ) ) {
	return array();
}

return array(
	array(
		'type'            => 'panel',
		'id'              => 'onepress_features',
		'priority'        => 150,
		'title'           => esc_html__( 'Section: Features', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage',
	),
	array(
		'type'        => 'section',
		'id'          => 'onepress_features_settings',
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_features',
	),
	array(
		'id'          => 'onepress_features_disable',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'section'     => 'onepress_features_settings',
		'label'       => esc_html__( 'Hide this section?', 'onepress' ),
		'description' => esc_html__( 'Check this box to hide this section.', 'onepress' ),
		'default'     => '',
	),
	array(
		'id'                => 'onepress_features_id',
		'control'           => 'wp',
		'input_type'        => 'text',
		'section'           => 'onepress_features_settings',
		'label'             => esc_html__( 'Section ID:', 'onepress' ),
		'description'       => esc_html__( 'The section ID should be English character, lowercase and no space.', 'onepress' ),
		'default'           => esc_html__( 'features', 'onepress' ),
		'sanitize_callback' => 'onepress_sanitize_text',
	),
	array(
		'id'          => 'onepress_features_title',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_features_settings',
		'label'       => esc_html__( 'Section Title', 'onepress' ),
		'description' => '',
		'default'     => esc_html__( 'Features', 'onepress' ),
	),
	array(
		'id'          => 'onepress_features_subtitle',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_features_settings',
		'label'       => esc_html__( 'Section Subtitle', 'onepress' ),
		'description' => '',
		'default'     => esc_html__( 'Section subtitle', 'onepress' ),
	),
	array(
		'id'          => 'onepress_features_desc',
		'control'     => 'editor',
		'section'     => 'onepress_features_settings',
		'label'       => esc_html__( 'Section Description', 'onepress' ),
		'description' => '',
		'default'     => '',
		'setting'     => array(
			'sanitize_callback' => 'onepress_sanitize_text',
			'default'           => '',
		),
	),
	array(
		'id'          => 'onepress_features_layout',
		'control'     => 'wp',
		'input_type'  => 'select',
		'section'     => 'onepress_features_settings',
		'label'       => esc_html__( 'Features Layout Setting', 'onepress' ),
		'description' => '',
		'default'     => '3',
		'choices'     => array(
			'3' => esc_html__( '4 Columns', 'onepress' ),
			'4' => esc_html__( '3 Columns', 'onepress' ),
			'6' => esc_html__( '2 Columns', 'onepress' ),
		),
	),
	array(
		'type'     => 'callback',
		'callback' => static function ( $wp_customize ) {
			if ( function_exists( 'onepress_add_upsell_for_section' ) ) {
				onepress_add_upsell_for_section( $wp_customize, 'onepress_features_settings' );
			}
		},
	),
	array(
		'type'        => 'section',
		'id'          => 'onepress_features_content',
		'priority'    => 6,
		'title'       => esc_html__( 'Section Content', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_features',
	),
	array(
		'id'            => 'onepress_features_boxes',
		'control'       => 'repeatable',
		'label'         => esc_html__( 'Features content', 'onepress' ),
		'description'   => '',
		'section'       => 'onepress_features_content',
		'live_title_id' => 'title',
		'title_format'  => '[live_title]',
		'max_item'      => 4,
		'limited_msg'   => wp_kses_post(
			__( 'Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> to be able to add more items and unlock other premium features!', 'onepress' )
		),
		'fields'        => array(
			'title'     => array(
				'title' => esc_html__( 'Title', 'onepress' ),
				'type'  => 'text',
			),
			'icon_type' => array(
				'title'   => esc_html__( 'Custom icon', 'onepress' ),
				'type'    => 'select',
				'options' => array(
					'icon'  => esc_html__( 'Icon', 'onepress' ),
					'image' => esc_html__( 'image', 'onepress' ),
				),
			),
			'icon'      => array(
				'title'    => esc_html__( 'Icon', 'onepress' ),
				'type'     => 'icon',
				'required' => array( 'icon_type', '=', 'icon' ),
			),
			'image'     => array(
				'title'    => esc_html__( 'Image', 'onepress' ),
				'type'     => 'media',
				'required' => array( 'icon_type', '=', 'image' ),
			),
			'desc'      => array(
				'title' => esc_html__( 'Description', 'onepress' ),
				'type'  => 'editor',
			),
			'link'      => array(
				'title' => esc_html__( 'Custom Link', 'onepress' ),
				'type'  => 'text',
			),
		),
		'transport'     => 'refresh',
		'setting'       => array(
			'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
			'transport'         => 'refresh',
		),
	),
);
