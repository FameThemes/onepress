<?php
/**
 * Section: Features
 */
$wp_customize->add_panel( 'onepress_features' ,
	array(
		'priority'        => 150,
		'title'           => esc_html__( 'Section: Features', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage'
	)
);

$wp_customize->add_section( 'onepress_features_settings' ,
	array(
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_features',
	)
);

// Show Content
$wp_customize->add_setting( 'onepress_features_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_features_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__('Hide this section?', 'onepress'),
		'section'     => 'onepress_features_settings',
		'description' => esc_html__('Check this box to hide this section.', 'onepress'),
	)
);

// Section ID
$wp_customize->add_setting( 'onepress_features_id',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => esc_html__('features', 'onepress'),
	)
);
$wp_customize->add_control( 'onepress_features_id',
	array(
		'label' 		=> esc_html__('Section ID:', 'onepress'),
		'section' 		=> 'onepress_features_settings',
		'description'   => esc_html__( 'The section ID should be English character, lowercase and no space.', 'onepress' )
	)
);

// Title
$wp_customize->add_setting( 'onepress_features_title',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__('Features', 'onepress'),
	)
);
$wp_customize->add_control( 'onepress_features_title',
	array(
		'label' 		=> esc_html__('Section Title', 'onepress'),
		'section' 		=> 'onepress_features_settings',
		'description'   => '',
	)
);

// Sub Title
$wp_customize->add_setting( 'onepress_features_subtitle',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__('Section subtitle', 'onepress'),
	)
);
$wp_customize->add_control( 'onepress_features_subtitle',
	array(
		'label' 		=> esc_html__('Section Subtitle', 'onepress'),
		'section' 		=> 'onepress_features_settings',
		'description'   => '',
	)
);

// Description
$wp_customize->add_setting( 'onepress_features_desc',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);
$wp_customize->add_control( new OnePress_Editor_Custom_Control(
	$wp_customize,
	'onepress_features_desc',
	array(
		'label' 		=> esc_html__('Section Description', 'onepress'),
		'section' 		=> 'onepress_features_settings',
		'description'   => '',
	)
));

// Features layout
$wp_customize->add_setting( 'onepress_features_layout',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '3',
	)
);

$wp_customize->add_control( 'onepress_features_layout',
	array(
		'label' 		=> esc_html__('Features Layout Setting', 'onepress'),
		'section' 		=> 'onepress_features_settings',
		'description'   => '',
		'type'          => 'select',
		'choices'       => array(
			'3' => esc_html__( '4 Columns', 'onepress' ),
			'4' => esc_html__( '3 Columns', 'onepress' ),
			'6' => esc_html__( '2 Columns', 'onepress' ),
		),
	)
);


onepress_add_upsell_for_section( $wp_customize, 'onepress_features_settings' );


$wp_customize->add_section( 'onepress_features_content' ,
	array(
		'priority'    => 6,
		'title'       => esc_html__( 'Section Content', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_features',
	)
);

// Features content
$wp_customize->add_setting(
	'onepress_features_boxes',
	array(
		//'default' => '',
		'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
		'transport' => 'refresh', // refresh or postMessage
	) );

$wp_customize->add_control(
	new Onepress_Customize_Repeatable_Control(
		$wp_customize,
		'onepress_features_boxes',
		array(
			'label' 		=> esc_html__('Features content', 'onepress'),
			'description'   => '',
			'section'       => 'onepress_features_content',
			'live_title_id' => 'title', // apply for unput text and textarea only
			'title_format'  => esc_html__('[live_title]', 'onepress'), // [live_title]
			'max_item'      => 4, // Maximum item can add
			'limited_msg' 	=> wp_kses_post( __( 'Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> to be able to add more items and unlock other premium features!', 'onepress' ) ),
			'fields'    => array(
				'title'  => array(
					'title' => esc_html__('Title', 'onepress'),
					'type'  =>'text',
				),
				'icon_type'  => array(
					'title' => esc_html__('Custom icon', 'onepress'),
					'type'  =>'select',
					'options' => array(
						'icon' => esc_html__('Icon', 'onepress'),
						'image' => esc_html__('image', 'onepress'),
					),
				),
				'icon'  => array(
					'title' => esc_html__('Icon', 'onepress'),
					'type'  =>'icon',
					'required' => array( 'icon_type', '=', 'icon' ),
				),
				'image'  => array(
					'title' => esc_html__('Image', 'onepress'),
					'type'  =>'media',
					'required' => array( 'icon_type', '=', 'image' ),
				),
				'desc'  => array(
					'title' => esc_html__('Description', 'onepress'),
					'type'  =>'editor',
				),
				'link'  => array(
					'title' => esc_html__('Custom Link', 'onepress'),
					'type'  =>'text',
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
		'label' 		=> esc_html__('Item content source', 'onepress'),
		'section' 		=> 'onepress_about_content',
		'description'   => '',
		'type'          => 'select',
		'choices'       => array(
			'content' => esc_html__( 'Full Page Content', 'onepress' ),
			'excerpt' => esc_html__( 'Page Excerpt', 'onepress' ),
		),
	)
);
