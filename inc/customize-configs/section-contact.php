<?php
/**
 * Section: Contact (declarative list, merged in customize-option-definitions.php).
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Onepress_Config', false ) || ! Onepress_Config::is_section_active( 'contact' ) ) {
	return array();
}

return array(
	array(
		'type'            => 'panel',
		'id'              => 'onepress_contact',
		'priority'        => 270,
		'title'           => esc_html__( 'Section: Contact', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage',
	),
	array(
		'type'        => 'section',
		'id'          => 'onepress_contact_settings',
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_contact',
	),
	array(
		'id'          => 'onepress_contact_disable',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'section'     => 'onepress_contact_settings',
		'label'       => esc_html__( 'Hide this section?', 'onepress' ),
		'description' => esc_html__( 'Check this box to hide this section.', 'onepress' ),
		'default'     => '',
	),
	array(
		'id'                => 'onepress_contact_id',
		'control'           => 'wp',
		'input_type'        => 'text',
		'section'           => 'onepress_contact_settings',
		'label'             => esc_html__( 'Section ID:', 'onepress' ),
		'description'       => esc_html__( 'The section ID should be English character, lowercase and no space.', 'onepress' ),
		'default'           => esc_html__( 'contact', 'onepress' ),
		'sanitize_callback' => 'onepress_sanitize_text',
	),
	array(
		'id'          => 'onepress_contact_title',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_contact_settings',
		'label'       => esc_html__( 'Section Title', 'onepress' ),
		'description' => '',
		'default'     => esc_html__( 'Get in touch', 'onepress' ),
	),
	array(
		'id'          => 'onepress_contact_subtitle',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_contact_settings',
		'label'       => esc_html__( 'Section Subtitle', 'onepress' ),
		'description' => '',
		'default'     => esc_html__( 'Section subtitle', 'onepress' ),
	),
	array(
		'id'          => 'onepress_contact_desc',
		'control'     => 'editor',
		'section'     => 'onepress_contact_settings',
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
				onepress_add_upsell_for_section( $wp_customize, 'onepress_contact_settings' );
			}
		},
	),
	array(
		'type'        => 'section',
		'id'          => 'onepress_contact_content',
		'priority'    => 6,
		'title'       => esc_html__( 'Section Content', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_contact',
	),
	array(
		'id'            => 'onepress_contact_cf7_guide',
		'control'       => 'misc',
		'type'          => 'custom_message',
		'section'       => 'onepress_contact_content',
		'description'   => wp_kses_post(
			__( 'Paste your form shortcode from contact form plugin here, e.g <code>[wpforms  id="123"]</code>', 'onepress' )
		),
		'setting'       => array(
			'sanitize_callback' => 'onepress_sanitize_text',
		),
	),
	array(
		'id'          => 'onepress_contact_cf7',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_contact_content',
		'label'       => esc_html__( 'Contact Form Shortcode.', 'onepress' ),
		'description' => '',
		'default'     => '',
		'sanitize_callback' => 'onepress_sanitize_text',
	),
	array(
		'id'          => 'onepress_contact_cf7_disable',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'section'     => 'onepress_contact_content',
		'label'       => esc_html__( 'Hide contact form completely.', 'onepress' ),
		'description' => esc_html__( 'Check this box to hide contact form.', 'onepress' ),
		'default'     => '',
	),
	array(
		'id'          => 'onepress_contact_text',
		'control'     => 'editor',
		'section'     => 'onepress_contact_content',
		'label'       => esc_html__( 'Contact Text', 'onepress' ),
		'description' => '',
		'default'     => '',
		'setting'     => array(
			'sanitize_callback' => 'onepress_sanitize_text',
			'default'           => '',
		),
	),
	array(
		'id'      => 'onepress_contact_text_hr',
		'control' => 'misc',
		'type'    => 'hr',
		'section' => 'onepress_contact_content',
		'setting' => array(
			'sanitize_callback' => 'onepress_sanitize_text',
		),
	),
	array(
		'id'          => 'onepress_contact_address_title',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_contact_content',
		'label'       => esc_html__( 'Contact Box Title', 'onepress' ),
		'description' => '',
		'default'     => '',
	),
	array(
		'id'                => 'onepress_contact_address',
		'control'           => 'wp',
		'input_type'        => 'text',
		'section'           => 'onepress_contact_content',
		'label'             => esc_html__( 'Address', 'onepress' ),
		'description'       => '',
		'default'           => '',
		'sanitize_callback' => 'onepress_sanitize_text',
	),
	array(
		'id'                => 'onepress_contact_phone',
		'control'           => 'wp',
		'input_type'        => 'text',
		'section'           => 'onepress_contact_content',
		'label'             => esc_html__( 'Phone', 'onepress' ),
		'description'       => '',
		'default'           => '',
		'sanitize_callback' => 'onepress_sanitize_text',
	),
	array(
		'id'          => 'onepress_contact_email',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_contact_content',
		'label'       => esc_html__( 'Email', 'onepress' ),
		'description' => '',
		'default'     => '',
	),
	array(
		'id'                => 'onepress_contact_fax',
		'control'           => 'wp',
		'input_type'        => 'text',
		'section'           => 'onepress_contact_content',
		'label'             => esc_html__( 'Fax', 'onepress' ),
		'description'       => '',
		'default'           => '',
		'sanitize_callback' => 'onepress_sanitize_text',
	),
);
