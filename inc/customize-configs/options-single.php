<?php
/**
 * Single post settings.
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	array(
		'type'        => 'section',
		'id'          => 'onepress_single',
		'priority'    => null,
		'title'       => esc_html__( 'Single Post', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	),
	array(
		'id'                => 'single_layout',
		'control'           => 'wp',
		'input_type'        => 'select',
		'label'             => esc_html__( 'Single Layout Sidebar', 'onepress' ),
		'section'           => 'onepress_single',
		'default'           => 'default',
		'sanitize_callback' => 'onepress_sanitize_select',
		'choices'           => array(
			'default'       => esc_html__( 'Default', 'onepress' ),
			'no-sidebar'    => esc_html__( 'No Sidebar', 'onepress' ),
			'left-sidebar'  => esc_html__( 'Left Sidebar', 'onepress' ),
			'right-sidebar' => esc_html__( 'Right Sidebar', 'onepress' ),
		),
	),
	array(
		'id'          => 'single_layout_content_width',
		'control'     => 'wp',
		'input_type'  => 'text',
		'label'       => esc_html__( 'Single Content Max Width', 'onepress' ),
		'description' => esc_html__( 'Enter content max width number, e.g : 800', 'onepress' ),
		'section'     => 'onepress_single',
		'default'     => '',
	),
	array(
		'id'          => 'single_thumbnail',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'label'       => esc_html__( 'Show single post thumbnail', 'onepress' ),
		'description' => esc_html__( 'Check this box to show post thumbnail on single post.', 'onepress' ),
		'section'     => 'onepress_single',
		'default'     => '',
	),
	array(
		'id'          => 'single_meta',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'label'       => esc_html__( 'Show single post meta', 'onepress' ),
		'description' => esc_html__( 'Check this box to show single post meta such as post date, author, category,...', 'onepress' ),
		'section'     => 'onepress_single',
		'default'     => '1',
	),
);
