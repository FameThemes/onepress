<?php
/**
 * Global theme options.
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	array(
		'type'        => 'section',
		'id'          => 'onepress_global_settings',
		'priority'    => 3,
		'title'       => esc_html__( 'Global', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	),
	array(
		'id'          => 'onepress_layout',
		'control'     => 'wp',
		'input_type'  => 'select',
		'label'       => esc_html__( 'Site Layout', 'onepress' ),
		'description' => esc_html__( 'Site Layout, apply for all pages, exclude home page and custom page templates.', 'onepress' ),
		'section'     => 'onepress_global_settings',
		'default'     => 'right-sidebar',
		'choices'     => array(
			'right-sidebar' => esc_html__( 'Right sidebar', 'onepress' ),
			'left-sidebar'  => esc_html__( 'Left sidebar', 'onepress' ),
			'no-sidebar'    => esc_html__( 'No sidebar', 'onepress' ),
		),
	),
	array(
		'id'          => 'onepress_animation_disable',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'label'       => esc_html__( 'Disable animation effect?', 'onepress' ),
		'description' => esc_html__( 'Check this box to disable all element animation when scroll.', 'onepress' ),
		'section'     => 'onepress_global_settings',
		'default'     => '',
	),
	array(
		'id'          => 'onepress_btt_disable',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'label'       => esc_html__( 'Hide footer back to top?', 'onepress' ),
		'description' => esc_html__( 'Check this box to hide footer back to top button.', 'onepress' ),
		'section'     => 'onepress_global_settings',
		'default'     => '',
		'transport'   => 'postMessage',
	),
	array(
		'id'          => 'onepress_disable_g_font',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'label'       => esc_html__( 'Disable Google Fonts', 'onepress' ),
		'description' => esc_html__( 'Check this if you want to disable default google fonts in theme.', 'onepress' ),
		'section'     => 'onepress_global_settings',
		'default'     => '',
		'transport'   => 'postMessage',
	),
);
