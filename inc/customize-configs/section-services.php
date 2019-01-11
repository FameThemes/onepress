<?php
/**
 * Section: Services
 */
$wp_customize->add_panel( 'onepress_services',
	array(
		'priority'        => 170,
		'title'           => esc_html__( 'Section: Services', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage'
	)
);

$wp_customize->add_section( 'onepress_service_settings',
	array(
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_services',
	)
);

// Show Content
$wp_customize->add_setting( 'onepress_services_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_services_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Hide this section?', 'onepress' ),
		'section'     => 'onepress_service_settings',
		'description' => esc_html__( 'Check this box to hide this section.', 'onepress' ),
	)
);

// Section ID
$wp_customize->add_setting( 'onepress_services_id',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => esc_html__( 'services', 'onepress' ),
	)
);
$wp_customize->add_control( 'onepress_services_id',
	array(
		'label'       => esc_html__( 'Section ID:', 'onepress' ),
		'section'     => 'onepress_service_settings',
		'description' => 'The section ID should be English character, lowercase and no space.'
	)
);

// Title
$wp_customize->add_setting( 'onepress_services_title',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__( 'Our Services', 'onepress' ),
	)
);
$wp_customize->add_control( 'onepress_services_title',
	array(
		'label'       => esc_html__( 'Section Title', 'onepress' ),
		'section'     => 'onepress_service_settings',
		'description' => '',
	)
);

// Sub Title
$wp_customize->add_setting( 'onepress_services_subtitle',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__( 'Section subtitle', 'onepress' ),
	)
);
$wp_customize->add_control( 'onepress_services_subtitle',
	array(
		'label'       => esc_html__( 'Section Subtitle', 'onepress' ),
		'section'     => 'onepress_service_settings',
		'description' => '',
	)
);

// Description
$wp_customize->add_setting( 'onepress_services_desc',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);
$wp_customize->add_control( new OnePress_Editor_Custom_Control(
	$wp_customize,
	'onepress_services_desc',
	array(
		'label'       => esc_html__( 'Section Description', 'onepress' ),
		'section'     => 'onepress_service_settings',
		'description' => '',
	)
) );


// Services layout
$wp_customize->add_setting( 'onepress_service_layout',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '6',
	)
);

$wp_customize->add_control( 'onepress_service_layout',
	array(
		'label'       => esc_html__( 'Services Layout Settings', 'onepress' ),
		'section'     => 'onepress_service_settings',
		'description' => '',
		'type'        => 'select',
		'choices'     => array(
			'3'  => esc_html__( '4 Columns', 'onepress' ),
			'4'  => esc_html__( '3 Columns', 'onepress' ),
			'6'  => esc_html__( '2 Columns', 'onepress' ),
			'12' => esc_html__( '1 Column', 'onepress' ),
		),
	)
);


onepress_add_upsell_for_section( $wp_customize, 'onepress_service_settings' );


$wp_customize->add_section( 'onepress_service_content',
	array(
		'priority'    => 6,
		'title'       => esc_html__( 'Section Content', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_services',
	)
);

// Section service content.
$wp_customize->add_setting(
	'onepress_services',
	array(
		'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
		'transport'         => 'refresh', // refresh or postMessage
	) );


$wp_customize->add_control(
	new Onepress_Customize_Repeatable_Control(
		$wp_customize,
		'onepress_services',
		array(
			'label'         => esc_html__( 'Service content', 'onepress' ),
			'description'   => '',
			'section'       => 'onepress_service_content',
			'live_title_id' => 'content_page', // apply for unput text and textarea only
			'title_format'  => esc_html__( '[live_title]', 'onepress' ), // [live_title]
			'max_item'      => 4, // Maximum item can add,
			'limited_msg'   => wp_kses_post( __( 'Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> to be able to add more items and unlock other premium features!', 'onepress' ) ),
			'fields'        => array(
				'icon_type' => array(
					'title'   => esc_html__( 'Custom icon', 'onepress' ),
					'type'    => 'select',
					'options' => array(
						'icon'  => esc_html__( 'Icon', 'onepress' ),
						'image' => esc_html__( 'image', 'onepress' ),
					),
				),
				'icon'      => array(
					'title'    => esc_html__( 'Icon', 'onepress' ),
					'type'     => 'icon',
					'required' => array( 'icon_type', '=', 'icon' ),
				),
				'image'     => array(
					'title'    => esc_html__( 'Image', 'onepress' ),
					'type'     => 'media',
					'required' => array( 'icon_type', '=', 'image' ),
				),

				'content_page' => array(
					'title'   => esc_html__( 'Select a page', 'onepress' ),
					'type'    => 'select',
					'options' => $option_pages
				),
				'enable_link'  => array(
					'title' => esc_html__( 'Link to single page', 'onepress' ),
					'type'  => 'checkbox',
				),
			),

		)
	)
);


// Services icon size
$wp_customize->add_setting( 'onepress_service_icon_size',
	array(
		'sanitize_callback' => 'onepress_sanitize_select',
		'default'           => '5x',
	)
);

$wp_customize->add_control( 'onepress_service_icon_size',
	array(
		'label'       => esc_html__( 'Icon Size', 'onepress' ),
		'section'     => 'onepress_service_content',
		'description' => '',
		'type'        => 'select',
		'choices'     => array(
			'5x' => esc_html__( '5x', 'onepress' ),
			'4x' => esc_html__( '4x', 'onepress' ),
			'3x' => esc_html__( '3x', 'onepress' ),
			'2x' => esc_html__( '2x', 'onepress' ),
			'1x' => esc_html__( '1x', 'onepress' ),
		),
	)
);

// Service content source
$wp_customize->add_setting( 'onepress_service_content_source',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => 'excerpt',
	)
);

$wp_customize->add_control( 'onepress_service_content_source',
	array(
		'label'       => esc_html__( 'Item content source', 'onepress' ),
		'section'     => 'onepress_service_content',
		'description' => '',
		'type'        => 'select',
		'choices'     => array(
			'content' => esc_html__( 'Full Page Content', 'onepress' ),
			'excerpt' => esc_html__( 'Page Excerpt', 'onepress' ),
		),
	)
);
