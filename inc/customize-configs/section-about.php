<?php
/**
 * Section: About
 */
$wp_customize->add_panel( 'onepress_about',
	array(
		'priority'        => 160,
		'title'           => esc_html__( 'Section: About', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage'
	)
);

$wp_customize->add_section( 'onepress_about_settings',
	array(
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_about',
	)
);

// Show Content
$wp_customize->add_setting( 'onepress_about_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_about_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Hide this section?', 'onepress' ),
		'section'     => 'onepress_about_settings',
		'description' => esc_html__( 'Check this box to hide this section.', 'onepress' ),
	)
);

// Section ID
$wp_customize->add_setting( 'onepress_about_id',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => esc_html__( 'about', 'onepress' ),
	)
);
$wp_customize->add_control( 'onepress_about_id',
	array(
		'label'       => esc_html__( 'Section ID:', 'onepress' ),
		'section'     => 'onepress_about_settings',
		'description' => esc_html__( 'The section id, we will use this for link anchor.', 'onepress' )
	)
);

// Title
$wp_customize->add_setting( 'onepress_about_title',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__( 'About Us', 'onepress' ),
	)
);
$wp_customize->add_control( 'onepress_about_title',
	array(
		'label'       => esc_html__( 'Section Title', 'onepress' ),
		'section'     => 'onepress_about_settings',
		'description' => '',
	)
);

// Sub Title
$wp_customize->add_setting( 'onepress_about_subtitle',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__( 'Section subtitle', 'onepress' ),
	)
);
$wp_customize->add_control( 'onepress_about_subtitle',
	array(
		'label'       => esc_html__( 'Section Subtitle', 'onepress' ),
		'section'     => 'onepress_about_settings',
		'description' => '',
	)
);

// Description
$wp_customize->add_setting( 'onepress_about_desc',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);
$wp_customize->add_control( new OnePress_Editor_Custom_Control(
	$wp_customize,
	'onepress_about_desc',
	array(
		'label'       => esc_html__( 'Section Description', 'onepress' ),
		'section'     => 'onepress_about_settings',
		'description' => '',
	)
) );

if ( class_exists( 'OnePress_Plus' ) ) {
	// About column
	$wp_customize->add_setting( 'onepress_about_layout',
		array(
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => 3,
		)
	);

	$wp_customize->add_control( 'onepress_about_layout',
		array(
			'label'       => esc_html__( 'Layout Settings', 'onepress' ),
			'section'     => 'onepress_about_settings',
			'description' => '',
			'type'        => 'select',
			'choices'     => array(
				4 => esc_html__( '4 Columns', 'onepress' ),
				3 => esc_html__( '3 Columns', 'onepress' ),
				2 => esc_html__( '2 Columns', 'onepress' ),
				1 => esc_html__( '1 Column', 'onepress' ),
			),
		)
	);
}

onepress_add_upsell_for_section( $wp_customize , 'onepress_about_settings' );


$wp_customize->add_section( 'onepress_about_content',
	array(
		'priority'    => 6,
		'title'       => esc_html__( 'Section Content', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_about',
	)
);

// About Items
$wp_customize->add_setting(
	'onepress_about_boxes',
	array(
		//'default' => '',
		'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
		'transport'         => 'refresh', // refresh or postMessage
	) );


$wp_customize->add_control(
	new Onepress_Customize_Repeatable_Control(
		$wp_customize,
		'onepress_about_boxes',
		array(
			'label'         => esc_html__( 'About content page', 'onepress' ),
			'description'   => '',
			'section'       => 'onepress_about_content',
			'live_title_id' => 'content_page', // apply for unput text and textarea only
			'title_format'  => esc_html__( '[live_title]', 'onepress' ), // [live_title]
			'max_item'      => 3, // Maximum item can add
			'limited_msg'   => wp_kses_post( __( 'Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> to be able to add more items and unlock other premium features!', 'onepress' ) ),
			'fields'        => array(
				'content_page' => array(
					'title'   => esc_html__( 'Select a page', 'onepress' ),
					'type'    => 'select',
					'options' => $option_pages
				),
				'hide_title'   => array(
					'title' => esc_html__( 'Hide item title', 'onepress' ),
					'type'  => 'checkbox',
				),
				'enable_link'  => array(
					'title' => esc_html__( 'Link to single page', 'onepress' ),
					'type'  => 'checkbox',
				),
			),

		)
	)
);

// About content source
$wp_customize->add_setting( 'onepress_about_content_source',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => 'content',
	)
);

$wp_customize->add_control( 'onepress_about_content_source',
	array(
		'label'       => esc_html__( 'Item content source', 'onepress' ),
		'section'     => 'onepress_about_content',
		'description' => '',
		'type'        => 'select',
		'choices'     => array(
			'content' => esc_html__( 'Full Page Content', 'onepress' ),
			'excerpt' => esc_html__( 'Page Excerpt', 'onepress' ),
		),
	)
);
