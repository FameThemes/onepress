<?php
/**
 * Blog posts settings.
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	array(
		'type'        => 'section',
		'id'          => 'onepress_blog_posts',
		'priority'    => null,
		'title'       => esc_html__( 'Blog Posts', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	),
	array(
		'id'          => 'onepress_disable_archive_prefix',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'label'       => esc_html__( 'Disable archive prefix', 'onepress' ),
		'description' => esc_html__( 'Check this to disable archive prefix on category, date, tag page.', 'onepress' ),
		'section'     => 'onepress_blog_posts',
		'default'     => '',
	),
	array(
		'id'          => 'onepress_hide_thumnail_if_not_exists',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'label'       => esc_html__( 'Hide thumbnail placeholder', 'onepress' ),
		'description' => esc_html__( 'Hide placeholder if the post thumbnail not exists.', 'onepress' ),
		'section'     => 'onepress_blog_posts',
		'default'     => '',
	),
	array(
		'id'            => 'onepress_blog_posts_settings_hr_layout',
		'control'       => 'misc',
		'type'          => 'hr',
		'section'       => 'onepress_blog_posts',
		'setting'       => array(
			'sanitize_callback' => 'onepress_sanitize_text',
		),
	),
	array(
		'id'                => 'onepress_blog_posts_layout',
		'control'           => 'wp',
		'input_type'        => 'select',
		'label'             => esc_html__( 'Blog listing layout', 'onepress' ),
		'description'       => esc_html__( 'Applies to blog index, archives, and post listings that use the theme templates.', 'onepress' ),
		'section'           => 'onepress_blog_posts',
		'default'           => 'list',
		'sanitize_callback' => 'onepress_sanitize_news_layout',
		'choices'           => array(
			'list' => esc_html__( 'List', 'onepress' ),
			'grid' => esc_html__( 'Grid', 'onepress' ),
		),
	),
	array(
		'id'                => 'onepress_blog_posts_grid_columns',
		'control'           => 'wp',
		'input_type'        => 'text',
		'label'             => esc_html__( 'Grid: columns per breakpoint', 'onepress' ),
		'description'       => esc_html__( 'Three numbers separated by spaces: desktop, tablet, mobile (e.g. 3 2 1). Use 1, 2, 3, 4, 6, or 12 so columns divide the 12-column grid evenly.', 'onepress' ),
		'section'           => 'onepress_blog_posts',
		'default'           => '2 2 1',
		'sanitize_callback' => 'onepress_sanitize_news_grid_columns',
		'input_attrs'       => array(
			'placeholder' => esc_attr__( '3 2 1', 'onepress' ),
		),
	),
);
