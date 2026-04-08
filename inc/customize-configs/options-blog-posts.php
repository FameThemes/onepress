<?php
/**
 * Blog Post Settings
 * 
 * @package onepress
 *
 * @since 2.1.0
 * @since 2.2.1
 */

$wp_customize->add_section(
	'onepress_blog_posts',
	array(
		'priority'    => null,
		'title'       => esc_html__( 'Blog Posts', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);

$wp_customize->add_setting(
	'onepress_disable_archive_prefix',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
	)
);
$wp_customize->add_control(
	'onepress_disable_archive_prefix',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Disable archive prefix', 'onepress' ),
		'section'     => 'onepress_blog_posts',
		'description' => esc_html__( 'Check this to disable archive prefix on category, date, tag page.', 'onepress' ),
	)
);

$wp_customize->add_setting(
	'onepress_hide_thumnail_if_not_exists',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
	)
);
$wp_customize->add_control(
	'onepress_hide_thumnail_if_not_exists',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Hide thumbnail placeholder', 'onepress' ),
		'section'     => 'onepress_blog_posts',
		'description' => esc_html__( 'Hide placeholder if the post thumbnail not exists.', 'onepress' ),
	)
);

$wp_customize->add_setting(
	'onepress_blog_posts_settings_hr_layout',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
	)
);
$wp_customize->add_control(
	new OnePress_Misc_Control(
		$wp_customize,
		'onepress_blog_posts_settings_hr_layout',
		array(
			'section' => 'onepress_blog_posts',
			'type'    => 'hr',
		)
	)
);

$wp_customize->add_setting(
	'onepress_blog_posts_layout',
	array(
		'default'           => 'list',
		'sanitize_callback' => 'onepress_sanitize_news_layout',
	)
);
$wp_customize->add_control(
	'onepress_blog_posts_layout',
	array(
		'label'       => esc_html__( 'Blog listing layout', 'onepress' ),
		'section'     => 'onepress_blog_posts',
		'type'        => 'select',
		'choices'     => array(
			'list' => esc_html__( 'List', 'onepress' ),
			'grid' => esc_html__( 'Grid', 'onepress' ),
		),
		'description' => esc_html__( 'Applies to blog index, archives, and post listings that use the theme templates.', 'onepress' ),
	)
);

$wp_customize->add_setting(
	'onepress_blog_posts_grid_columns',
	array(
		'default'           => '2 2 1',
		'sanitize_callback' => 'onepress_sanitize_news_grid_columns',
	)
);
$wp_customize->add_control(
	'onepress_blog_posts_grid_columns',
	array(
		'label'       => esc_html__( 'Grid: columns per breakpoint', 'onepress' ),
		'section'     => 'onepress_blog_posts',
		'type'        => 'text',
		'input_attrs' => array(
			'placeholder' => '3 2 1',
		),
		'description' => esc_html__( 'Three numbers separated by spaces: desktop, tablet, mobile (e.g. 3 2 1). Use 1, 2, 3, 4, 6, or 12 so columns divide the 12-column grid evenly.', 'onepress' ),
	)
);
