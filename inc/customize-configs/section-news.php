<?php
/**
 * Section: News (declarative list, merged in customize-option-definitions.php).
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Onepress_Config', false ) || ! Onepress_Config::is_section_active( 'news' ) ) {
	return array();
}

return array(
	array(
		'type'            => 'panel',
		'id'              => 'onepress_news',
		'priority'        => 260,
		'title'           => esc_html__( 'Section: News', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage',
	),
	array(
		'type'        => 'section',
		'id'          => 'onepress_news_settings',
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_news',
	),
	array(
		'id'          => 'onepress_news_disable',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'section'     => 'onepress_news_settings',
		'label'       => esc_html__( 'Hide this section?', 'onepress' ),
		'description' => esc_html__( 'Check this box to hide this section.', 'onepress' ),
		'default'     => '',
	),
	array(
		'id'                => 'onepress_news_id',
		'control'           => 'wp',
		'input_type'        => 'text',
		'section'           => 'onepress_news_settings',
		'label'             => esc_html__( 'Section ID:', 'onepress' ),
		'description'       => esc_html__( 'The section ID should be English character, lowercase and no space.', 'onepress' ),
		'default'           => esc_html__( 'news', 'onepress' ),
		'sanitize_callback' => 'onepress_sanitize_text',
	),
	array(
		'id'          => 'onepress_news_title',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_news_settings',
		'label'       => esc_html__( 'Section Title', 'onepress' ),
		'description' => '',
		'default'     => esc_html__( 'Latest News', 'onepress' ),
	),
	array(
		'id'          => 'onepress_news_subtitle',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_news_settings',
		'label'       => esc_html__( 'Section Subtitle', 'onepress' ),
		'description' => '',
		'default'     => esc_html__( 'Section subtitle', 'onepress' ),
	),
	array(
		'id'          => 'onepress_news_desc',
		'control'     => 'editor',
		'section'     => 'onepress_news_settings',
		'label'       => esc_html__( 'Section Description', 'onepress' ),
		'description' => '',
		'default'     => '',
		'setting'     => array(
			'sanitize_callback' => 'onepress_sanitize_text',
			'default'           => '',
		),
	),
	array(
		'id'      => 'onepress_news_settings_hr',
		'control' => 'misc',
		'type'    => 'hr',
		'section' => 'onepress_news_settings',
		'setting' => array(
			'sanitize_callback' => 'onepress_sanitize_text',
		),
	),
	array(
		'id'                => 'onepress_news_layout',
		'control'           => 'wp',
		'input_type'        => 'select',
		'section'           => 'onepress_news_settings',
		'label'             => esc_html__( 'Blog layout', 'onepress' ),
		'description'       => esc_html__( 'List shows one post per row. Grid shows multiple columns on wide screens.', 'onepress' ),
		'default'           => 'list',
		'sanitize_callback' => 'onepress_sanitize_news_layout',
		'choices'           => array(
			'list' => esc_html__( 'List', 'onepress' ),
			'grid' => esc_html__( 'Grid', 'onepress' ),
		),
	),
	array(
		'id'                => 'onepress_news_grid_columns',
		'control'           => 'wp',
		'input_type'        => 'text',
		'section'           => 'onepress_news_settings',
		'label'             => esc_html__( 'Number columns to show', 'onepress' ),
		'description'       => esc_html__( 'One string of three numbers separated by spaces: desktop, tablet, then mobile (e.g. 3 2 1). Use 1, 2, 3, 4, 6, or 12 so columns divide the 12-column grid evenly.', 'onepress' ),
		'default'           => '2 2 1',
		'sanitize_callback' => 'onepress_sanitize_news_grid_columns',
		'input_attrs'       => array(
			'placeholder' => esc_attr__( '3 2 1', 'onepress' ),
		),
	),
	array(
		'id'                => 'onepress_news_hide_meta',
		'control'           => 'wp',
		'input_type'        => 'checkbox',
		'section'           => 'onepress_news_settings',
		'label'             => esc_html__( 'Hide post categories', 'onepress' ),
		'description'       => '',
		'default'           => '',
		'sanitize_callback' => 'sanitize_text_field',
	),
	array(
		'id'          => 'onepress_news_excerpt_type',
		'control'     => 'wp',
		'input_type'  => 'select',
		'section'     => 'onepress_news_settings',
		'label'       => esc_html__( 'Custom excerpt length', 'onepress' ),
		'description' => '',
		'default'     => 'custom',
		'choices'     => array(
			'custom'   => esc_html__( 'Custom', 'onepress' ),
			'excerpt'  => esc_html__( 'Use excerpt metabox', 'onepress' ),
			'more_tag' => esc_html__( 'Strip excerpt by more tag', 'onepress' ),
			'content'  => esc_html__( 'Full content', 'onepress' ),
		),
	),
	array(
		'id'          => 'onepress_news_excerpt_length',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_news_settings',
		'label'       => esc_html__( 'Custom excerpt length', 'onepress' ),
		'description' => '',
		'default'     => '',
	),
	array(
		'id'                => 'onepress_news_number',
		'control'           => 'wp',
		'input_type'        => 'text',
		'section'           => 'onepress_news_settings',
		'label'             => esc_html__( 'Number of post to show', 'onepress' ),
		'description'       => '',
		'default'           => '3',
		'sanitize_callback' => 'onepress_sanitize_number',
	),
	array(
		'id'          => 'onepress_news_cat',
		'control'     => 'category',
		'section'     => 'onepress_news_settings',
		'label'       => esc_html__( 'Category to show', 'onepress' ),
		'description' => '',
		'default'     => 0,
		'setting'     => array(
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => 0,
		),
	),
	array(
		'id'          => 'onepress_news_orderby',
		'control'     => 'wp',
		'input_type'  => 'select',
		'section'     => 'onepress_news_settings',
		'label'       => esc_html__( 'Order By', 'onepress' ),
		'default'     => 0,
		'sanitize_callback' => 'onepress_sanitize_select',
		'choices'     => array(
			'default'       => esc_html__( 'Default', 'onepress' ),
			'id'            => esc_html__( 'ID', 'onepress' ),
			'author'        => esc_html__( 'Author', 'onepress' ),
			'title'         => esc_html__( 'Title', 'onepress' ),
			'date'          => esc_html__( 'Date', 'onepress' ),
			'comment_count' => esc_html__( 'Comment Count', 'onepress' ),
			'menu_order'    => esc_html__( 'Order by Page Order', 'onepress' ),
			'rand'          => esc_html__( 'Random order', 'onepress' ),
		),
	),
	array(
		'id'                => 'onepress_news_order',
		'control'           => 'wp',
		'input_type'        => 'select',
		'section'           => 'onepress_news_settings',
		'label'             => esc_html__( 'Order', 'onepress' ),
		'default'           => 'desc',
		'sanitize_callback' => 'onepress_sanitize_select',
		'choices'           => array(
			'desc' => esc_html__( 'Descending', 'onepress' ),
			'asc'  => esc_html__( 'Ascending', 'onepress' ),
		),
	),
	array(
		'id'               => 'onepress_news_more_page',
		'control'          => 'pages',
		'section'          => 'onepress_news_settings',
		'label'            => esc_html__( 'More News Page', 'onepress' ),
		'description'      => esc_html__( 'It should be your blog page link.', 'onepress' ),
		'show_option_none' => esc_html__( 'Custom Link', 'onepress' ),
		'default'          => '',
		'setting'          => array(
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => '',
		),
	),
	array(
		'id'          => 'onepress_news_more_link',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_news_settings',
		'label'       => esc_html__( 'Custom More News link', 'onepress' ),
		'default'     => '',
		'sanitize_callback' => 'sanitize_text_field',
	),
	array(
		'id'          => 'onepress_news_more_text',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_news_settings',
		'label'       => esc_html__( 'More News Button Text', 'onepress' ),
		'description' => '',
		'default'     => esc_html__( 'Read Our Blog', 'onepress' ),
	),
	array(
		'type'     => 'callback',
		'callback' => static function ( $wp_customize ) {
			if ( function_exists( 'onepress_add_upsell_for_section' ) ) {
				onepress_add_upsell_for_section( $wp_customize, 'onepress_news_settings' );
			}
		},
	),
);
