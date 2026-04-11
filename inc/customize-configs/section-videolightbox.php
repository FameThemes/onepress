<?php
/**
 * Section: Video Lightbox (declarative list, merged in customize-option-definitions.php).
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Onepress_Config', false ) || ! Onepress_Config::is_section_active( 'videolightbox' ) ) {
	return array();
}

return array(
	array(
		'type'            => 'panel',
		'id'              => 'onepress_videolightbox',
		'priority'        => 180,
		'title'           => esc_html__( 'Section: Video Lightbox', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage',
	),
	array(
		'type'        => 'section',
		'id'          => 'onepress_videolightbox_settings',
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_videolightbox',
	),
	array(
		'id'          => 'onepress_videolightbox_disable',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'section'     => 'onepress_videolightbox_settings',
		'label'       => esc_html__( 'Hide this section?', 'onepress' ),
		'description' => esc_html__( 'Check this box to hide this section.', 'onepress' ),
		'default'     => '',
	),
	array(
		'id'                => 'onepress_videolightbox_id',
		'control'           => 'wp',
		'input_type'        => 'text',
		'section'           => 'onepress_videolightbox_settings',
		'label'             => esc_html__( 'Section ID:', 'onepress' ),
		'description'       => esc_html__( 'The section ID should be English character, lowercase and no space.', 'onepress' ),
		'default'           => 'videolightbox',
		'sanitize_callback' => 'onepress_sanitize_text',
	),
	array(
		'id'          => 'onepress_videolightbox_title',
		'control'     => 'editor',
		'section'     => 'onepress_videolightbox_settings',
		'label'       => esc_html__( 'Section heading', 'onepress' ),
		'description' => '',
		'default'     => '',
		'setting'     => array(
			'sanitize_callback' => 'onepress_sanitize_text',
			'default'           => '',
		),
	),
	array(
		'id'                => 'onepress_videolightbox_url',
		'control'           => 'wp',
		'input_type'        => 'text',
		'section'           => 'onepress_videolightbox_settings',
		'label'             => esc_html__( 'Video url', 'onepress' ),
		'description'       => esc_html__( 'Paste Youtube or Vimeo url here', 'onepress' ),
		'default'           => '',
		'sanitize_callback' => 'esc_url_raw',
	),
	array(
		'id'            => 'onepress_videolightbox_media_url',
		'control'       => 'media',
		'section'       => 'onepress_videolightbox_settings',
		'label'         => esc_html__( 'Video / image from Media Library', 'onepress' ),
		'storage'       => 'mixed',
		'description'   => esc_html__( 'Select an image or video file. Both attachment ID and file URL are saved. If a URL is available, it is used instead of the YouTube/Vimeo field above.', 'onepress' ),
		'default'       => '',
		'setting'       => array(
			'sanitize_callback' => 'onepress_sanitize_media_control_mixed',
			'default'           => '',
		),
	),
	array(
		'id'            => 'onepress_videolightbox_image',
		'control'       => 'number',
		'control_class' => 'WP_Customize_Media_Control',
		'section'       => 'onepress_videolightbox_settings',
		'label'         => esc_html__( 'Background image', 'onepress' ),
		'default'       => '',
		'setting'       => array(
			'sanitize_callback' => 'onepress_sanitize_number',
			'default'           => '',
		),
	),
	array(
		'type'     => 'callback',
		'callback' => static function ( $wp_customize ) {
			if ( function_exists( 'onepress_add_upsell_for_section' ) ) {
				onepress_add_upsell_for_section( $wp_customize, 'onepress_videolightbox_settings' );
			}
		},
	),
);
