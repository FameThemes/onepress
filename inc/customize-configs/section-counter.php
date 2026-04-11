<?php
/**
 * Section: Counter (declarative list, merged in customize-option-definitions.php).
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Onepress_Config', false ) || ! Onepress_Config::is_section_active( 'counter' ) ) {
	return array();
}

return array(
	array(
		'type'            => 'panel',
		'id'              => 'onepress_counter',
		'priority'        => 210,
		'title'           => esc_html__( 'Section: Counter', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage',
	),
	array(
		'type'        => 'section',
		'id'          => 'onepress_counter_settings',
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_counter',
	),
	array(
		'id'          => 'onepress_counter_disable',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'section'     => 'onepress_counter_settings',
		'label'       => esc_html__( 'Hide this section?', 'onepress' ),
		'description' => esc_html__( 'Check this box to hide this section.', 'onepress' ),
		'default'     => '',
	),
	array(
		'id'                => 'onepress_counter_id',
		'control'           => 'wp',
		'input_type'        => 'text',
		'section'           => 'onepress_counter_settings',
		'label'             => esc_html__( 'Section ID:', 'onepress' ),
		'description'       => esc_html__( 'The section ID should be English character, lowercase and no space.', 'onepress' ),
		'default'           => esc_html__( 'counter', 'onepress' ),
		'sanitize_callback' => 'onepress_sanitize_text',
	),
	array(
		'id'          => 'onepress_counter_title',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_counter_settings',
		'label'       => esc_html__( 'Section Title', 'onepress' ),
		'description' => '',
		'default'     => esc_html__( 'Our Numbers', 'onepress' ),
	),
	array(
		'id'          => 'onepress_counter_subtitle',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_counter_settings',
		'label'       => esc_html__( 'Section Subtitle', 'onepress' ),
		'description' => '',
		'default'     => esc_html__( 'Section subtitle', 'onepress' ),
	),
	array(
		'id'          => 'onepress_counter_desc',
		'control'     => 'editor',
		'section'     => 'onepress_counter_settings',
		'label'       => esc_html__( 'Section Description', 'onepress' ),
		'description' => '',
		'default'     => '',
		'setting'     => array(
			'sanitize_callback' => 'onepress_sanitize_text',
			'default'           => '',
		),
	),
	array(
		'type'     => 'callback',
		'callback' => static function ( $wp_customize ) {
			if ( function_exists( 'onepress_add_upsell_for_section' ) ) {
				onepress_add_upsell_for_section( $wp_customize, 'onepress_counter_settings' );
			}
		},
	),
	array(
		'type'        => 'section',
		'id'          => 'onepress_counter_content',
		'priority'    => 6,
		'title'       => esc_html__( 'Section Content', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_counter',
	),
	array(
		'id'            => 'onepress_counter_boxes',
		'control'       => 'repeatable',
		'label'         => esc_html__( 'Counter content', 'onepress' ),
		'description'   => '',
		'section'       => 'onepress_counter_content',
		'live_title_id' => 'title',
		'title_format'  => '[live_title]',
		'max_item'      => 4,
		'limited_msg'   => wp_kses_post(
			__( 'Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> to be able to add more items and unlock other premium features!', 'onepress' )
		),
		'fields'        => array(
			'title'       => array(
				'title'   => esc_html__( 'Title', 'onepress' ),
				'type'    => 'text',
				'desc'    => '',
				'default' => esc_html__( 'Your counter label', 'onepress' ),
			),
			'number'      => array(
				'title'   => esc_html__( 'Number', 'onepress' ),
				'type'    => 'text',
				'default' => 99,
			),
			'unit_before' => array(
				'title'   => esc_html__( 'Before number', 'onepress' ),
				'type'    => 'text',
				'default' => '',
			),
			'unit_after'  => array(
				'title'   => esc_html__( 'After number', 'onepress' ),
				'type'    => 'text',
				'default' => '',
			),
		),
		'transport'     => 'refresh',
		'setting'       => array(
			'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
			'transport'         => 'refresh',
		),
	),
);
