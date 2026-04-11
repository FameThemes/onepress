<?php
/**
 * Section: Gallery (declarative list, merged in customize-option-definitions.php).
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Onepress_Config', false ) || ! Onepress_Config::is_section_active( 'gallery' ) ) {
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
		'id'              => 'onepress_gallery',
		'priority'        => 190,
		'title'           => esc_html__( 'Section: Gallery', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage',
	),
	array(
		'type'        => 'section',
		'id'          => 'onepress_gallery_settings',
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_gallery',
	),
	array(
		'id'          => 'onepress_gallery_disable',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'section'     => 'onepress_gallery_settings',
		'label'       => esc_html__( 'Hide this section?', 'onepress' ),
		'description' => esc_html__( 'Check this box to hide this section.', 'onepress' ),
		'default'     => 1,
	),
	array(
		'id'                => 'onepress_gallery_id',
		'control'           => 'wp',
		'input_type'        => 'text',
		'section'           => 'onepress_gallery_settings',
		'label'             => esc_html__( 'Section ID:', 'onepress' ),
		'description'       => esc_html__( 'The section ID should be English character, lowercase and no space.', 'onepress' ),
		'default'           => esc_html__( 'gallery', 'onepress' ),
		'sanitize_callback' => 'onepress_sanitize_text',
	),
	array(
		'id'          => 'onepress_gallery_title',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_gallery_settings',
		'label'       => esc_html__( 'Section Title', 'onepress' ),
		'description' => '',
		'default'     => esc_html__( 'Gallery', 'onepress' ),
	),
	array(
		'id'          => 'onepress_gallery_subtitle',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_gallery_settings',
		'label'       => esc_html__( 'Section Subtitle', 'onepress' ),
		'description' => '',
		'default'     => esc_html__( 'Section subtitle', 'onepress' ),
	),
	array(
		'id'          => 'onepress_gallery_desc',
		'control'     => 'editor',
		'section'     => 'onepress_gallery_settings',
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
				onepress_add_upsell_for_section( $wp_customize, 'onepress_gallery_settings' );
			}
		},
	),
	array(
		'type'        => 'section',
		'id'          => 'onepress_gallery_content',
		'priority'    => 6,
		'title'       => esc_html__( 'Section Content', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_gallery',
	),
	array(
		'id'          => 'onepress_gallery_source',
		'control'     => 'wp',
		'input_type'  => 'select',
		'section'     => 'onepress_gallery_content',
		'label'       => esc_html__( 'Select Gallery Source', 'onepress' ),
		'priority'    => 5,
		'default'     => 'page',
		'choices'     => array(
			'page'      => esc_html__( 'Page', 'onepress' ),
			'facebook'  => 'Facebook',
			'instagram' => 'Instagram',
			'flickr'    => 'Flickr',
		),
		'setting'     => array(
			'validate_callback' => 'onepress_gallery_source_validate',
		),
	),
	array(
		'id'          => 'onepress_gallery_source_page',
		'control'     => 'wp',
		'input_type'  => 'select',
		'section'     => 'onepress_gallery_content',
		'label'       => esc_html__( 'Select Gallery Page', 'onepress' ),
		'description' => esc_html__( 'Select a page which have content contain [gallery] shortcode or gallery blocks.', 'onepress' ),
		'priority'    => 10,
		'default'     => '',
		'choices'     => $option_pages,
		'setting'     => array(
			'sanitize_callback' => 'onepress_sanitize_number',
			'default'           => '',
		),
	),
	array(
		'id'          => 'onepress_gallery_layout',
		'control'     => 'wp',
		'input_type'  => 'select',
		'section'     => 'onepress_gallery_content',
		'label'       => esc_html__( 'Layout', 'onepress' ),
		'priority'    => 40,
		'default'     => 'default',
		'choices'     => array(
			'default'    => esc_html__( 'Default, inside container', 'onepress' ),
			'full-width' => esc_html__( 'Full Width', 'onepress' ),
		),
	),
	array(
		'id'          => 'onepress_gallery_display',
		'control'     => 'wp',
		'input_type'  => 'select',
		'section'     => 'onepress_gallery_content',
		'label'       => esc_html__( 'Display', 'onepress' ),
		'priority'    => 50,
		'default'     => 'default',
		'choices'     => array(
			'grid'      => esc_html__( 'Grid', 'onepress' ),
			'carousel'  => esc_html__( 'Carousel', 'onepress' ),
			'slider'    => esc_html__( 'Slider', 'onepress' ),
			'justified' => esc_html__( 'Justified', 'onepress' ),
			'masonry'   => esc_html__( 'Masonry', 'onepress' ),
		),
	),
	array(
		'id'          => 'onepress_g_spacing',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_gallery_content',
		'label'       => esc_html__( 'Item Spacing', 'onepress' ),
		'priority'    => 55,
		'default'     => 20,
	),
	array(
		'id'          => 'onepress_g_row_height',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_gallery_content',
		'label'       => esc_html__( 'Row Height', 'onepress' ),
		'priority'    => 57,
		'default'     => 120,
	),
	array(
		'id'          => 'onepress_g_col',
		'control'     => 'wp',
		'input_type'  => 'select',
		'section'     => 'onepress_gallery_content',
		'label'       => esc_html__( 'Layout columns', 'onepress' ),
		'priority'    => 60,
		'default'     => '4',
		'choices'     => array(
			'1' => 1,
			'2' => 2,
			'3' => 3,
			'4' => 4,
			'5' => 5,
			'6' => 6,
		),
	),
	array(
		'id'          => 'onepress_g_number',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_gallery_content',
		'label'       => esc_html__( 'Number items', 'onepress' ),
		'priority'    => 65,
		'default'     => 10,
	),
	array(
		'id'          => 'onepress_g_lightbox',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'section'     => 'onepress_gallery_content',
		'label'       => esc_html__( 'Enable Lightbox', 'onepress' ),
		'priority'    => 70,
		'default'     => 1,
	),
	array(
		'id'          => 'onepress_g_image_link',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'section'     => 'onepress_gallery_content',
		'label'       => esc_html__( 'Enable Image Link', 'onepress' ),
		'priority'    => 71,
		'default'     => 1,
	),
	array(
		'id'          => 'onepress_g_readmore_link',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_gallery_content',
		'label'       => esc_html__( 'Read More Link', 'onepress' ),
		'priority'    => 90,
		'default'     => '',
	),
	array(
		'id'          => 'onepress_g_readmore_text',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_gallery_content',
		'label'       => esc_html__( 'Read More Text', 'onepress' ),
		'priority'    => 100,
		'default'     => esc_html__( 'View More', 'onepress' ),
	),
);
