<?php
/**
 * Page title area (declarative list, merged in customize-option-definitions.php).
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	array(
		'type'        => 'section',
		'id'          => 'onepress_page',
		'priority'    => null,
		'title'       => esc_html__( 'Page Title Area', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	),
	array(
		'id'          => 'onepress_page_title_bar_disable',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'section'     => 'onepress_page',
		'label'       => esc_html__( 'Disable Page Title bar?', 'onepress' ),
		'description' => esc_html__( 'Check this box to disable the page title bar on all pages.', 'onepress' ),
		'default'     => '',
	),
	array(
		'id'          => 'onepress_page_cover_pd_top',
		'control'     => 'wp',
		'input_type'  => 'text',
		'label'       => esc_html__( 'Padding Top', 'onepress' ),
		'description' => esc_html__( 'The page cover padding top in percent (%).', 'onepress' ),
		'section'     => 'onepress_page',
		'default'     => '',
		'transport'   => 'postMessage',
	),
	array(
		'id'          => 'onepress_page_cover_pd_bottom',
		'control'     => 'wp',
		'input_type'  => 'text',
		'label'       => esc_html__( 'Padding Bottom', 'onepress' ),
		'description' => esc_html__( 'The page cover padding bottom in percent (%).', 'onepress' ),
		'section'     => 'onepress_page',
		'default'     => '',
		'transport'   => 'postMessage',
	),
	array(
		'id'          => 'onepress_page_cover_color',
		'control'     => 'alpha-color',
		'default'     => null,
		'label'       => esc_html__( 'Color', 'onepress' ),
		'section'     => 'onepress_page',
		'transport'   => 'postMessage',
	),
	array(
		'id'          => 'onepress_page_cover_overlay',
		'control'     => 'alpha-color',
		'label'       => esc_html__( 'Background Overlay Color', 'onepress' ),
		'section'     => 'onepress_page',
		'transport'   => 'postMessage',
	),
	array(
		'id'          => 'onepress_page_normal_align',
		'control'     => 'wp',
		'input_type'  => 'select',
		'label'       => esc_html__( 'Page Title Alignment', 'onepress' ),
		'section'     => 'onepress_page',
		'default'     => 'left',
		'transport'   => 'postMessage',
		'choices'     => array(
			'left'   => esc_html__( 'Left', 'onepress' ),
			'right'  => esc_html__( 'Right', 'onepress' ),
			'center' => esc_html__( 'Center', 'onepress' ),
		),
	),
	array(
		'id'            => 'onepress_page_cover_align',
		'control'       => 'wp',
		'input_type'    => 'select',
		'label'         => esc_html__( 'Page Title Cover Alignment', 'onepress' ),
		'description'   => esc_html__( 'Apply when the page display featured image as header cover.', 'onepress' ),
		'section'       => 'onepress_page',
		'default'       => 'center',
		'transport'     => 'postMessage',
		'choices'       => array(
			'center' => esc_html__( 'Center', 'onepress' ),
			'left'   => esc_html__( 'Left', 'onepress' ),
			'right'  => esc_html__( 'Right', 'onepress' ),
		),
	),
);
