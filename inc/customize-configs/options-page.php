<?php

/* Page Settings
----------------------------------------------------------------------*/
$wp_customize->add_section( 'onepress_page',
	array(
		'priority'    => null,
		'title'       => esc_html__( 'Page Title Area', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);

// Disable the page title bar
$wp_customize->add_setting( 'onepress_page_title_bar_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_page_title_bar_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Disable Page Title bar?', 'onepress' ),
		'section'     => 'onepress_page',
		'description' => esc_html__( 'Check this box to disable the page title bar on all pages.', 'onepress' )
	)
);

$wp_customize->add_setting( 'onepress_page_cover_pd_top',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
		'transport'         => 'postMessage'
	)
);
$wp_customize->add_control( 'onepress_page_cover_pd_top',
	array(
		'label'       => esc_html__( 'Padding Top', 'onepress' ),
		'description' => esc_html__( 'The page cover padding top in percent (%).', 'onepress' ),
		'section'     => 'onepress_page',
	)
);

$wp_customize->add_setting( 'onepress_page_cover_pd_bottom',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
		'transport'         => 'postMessage'
	)
);
$wp_customize->add_control( 'onepress_page_cover_pd_bottom',
	array(
		'label'       => esc_html__( 'Padding Bottom', 'onepress' ),
		'description' => esc_html__( 'The page cover padding bottom in percent (%).', 'onepress' ),
		'section'     => 'onepress_page',
	)
);

$wp_customize->add_setting( 'onepress_page_cover_color',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => null,
		'transport'         => 'postMessage'
	)
);
$wp_customize->add_control( new WP_Customize_Color_Control(
		$wp_customize,
		'onepress_page_cover_color',
		array(
			'label'   => esc_html__( 'Color', 'onepress' ),
			'section' => 'onepress_page',
		)
	)
);

// Overlay color
$wp_customize->add_setting( 'onepress_page_cover_overlay',
	array(
		'sanitize_callback' => 'onepress_sanitize_color_alpha',
		//'default'           => 'rgba(0,0,0,.3)',
		'transport'         => 'postMessage'
	)
);
$wp_customize->add_control( new OnePress_Alpha_Color_Control(
		$wp_customize,
		'onepress_page_cover_overlay',
		array(
			'label'   => esc_html__( 'Background Overlay Color', 'onepress' ),
			'section' => 'onepress_page',
		)
	)
);

$wp_customize->add_setting( 'onepress_page_cover_align',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => 'center',
		'transport'         => 'postMessage'
	)
);
$wp_customize->add_control( 'onepress_page_cover_align',
	array(
		'label'   => esc_html__( 'Content Align', 'onepress' ),
		'section' => 'onepress_page',
		'type'    => 'select',
		'choices' => array(
			'center' => esc_html__( 'Center', 'onepress' ),
			'left'   => esc_html__( 'Left', 'onepress' ),
			'right'  => esc_html__( 'Right', 'onepress' ),
		),
	)
);
