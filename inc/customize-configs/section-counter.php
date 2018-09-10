<?php
/**
 * Section: Counter
 */
$wp_customize->add_panel( 'onepress_counter' ,
	array(
		'priority'        => 210,
		'title'           => esc_html__( 'Section: Counter', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage'
	)
);

$wp_customize->add_section( 'onepress_counter_settings' ,
	array(
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_counter',
	)
);
// Show Content
$wp_customize->add_setting( 'onepress_counter_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_counter_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__('Hide this section?', 'onepress'),
		'section'     => 'onepress_counter_settings',
		'description' => esc_html__('Check this box to hide this section.', 'onepress'),
	)
);

// Section ID
$wp_customize->add_setting( 'onepress_counter_id',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => esc_html__('counter', 'onepress'),
	)
);
$wp_customize->add_control( 'onepress_counter_id',
	array(
		'label'     	=> esc_html__('Section ID:', 'onepress'),
		'section' 		=> 'onepress_counter_settings',
		'description'   => esc_html__( 'The section id, we will use this for link anchor.', 'onepress' )
	)
);

// Title
$wp_customize->add_setting( 'onepress_counter_title',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__('Our Numbers', 'onepress'),
	)
);
$wp_customize->add_control( 'onepress_counter_title',
	array(
		'label'     	=> esc_html__('Section Title', 'onepress'),
		'section' 		=> 'onepress_counter_settings',
		'description'   => '',
	)
);

// Sub Title
$wp_customize->add_setting( 'onepress_counter_subtitle',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__('Section subtitle', 'onepress'),
	)
);
$wp_customize->add_control( 'onepress_counter_subtitle',
	array(
		'label'     	=> esc_html__('Section Subtitle', 'onepress'),
		'section' 		=> 'onepress_counter_settings',
		'description'   => '',
	)
);

// Description
$wp_customize->add_setting( 'onepress_counter_desc',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);
$wp_customize->add_control( new OnePress_Editor_Custom_Control(
	$wp_customize,
	'onepress_counter_desc',
	array(
		'label' 		=> esc_html__('Section Description', 'onepress'),
		'section' 		=> 'onepress_counter_settings',
		'description'   => '',
	)
));

onepress_add_upsell_for_section( $wp_customize, 'onepress_counter_settings' );

$wp_customize->add_section( 'onepress_counter_content' ,
	array(
		'priority'    => 6,
		'title'       => esc_html__( 'Section Content', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_counter',
	)
);

// Order & Styling
$wp_customize->add_setting(
	'onepress_counter_boxes',
	array(
		'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
		'transport' => 'refresh', // refresh or postMessage
	) );


$wp_customize->add_control(
	new Onepress_Customize_Repeatable_Control(
		$wp_customize,
		'onepress_counter_boxes',
		array(
			'label'     	=> esc_html__('Counter content', 'onepress'),
			'description'   => '',
			'section'       => 'onepress_counter_content',
			'live_title_id' => 'title', // apply for unput text and textarea only
			'title_format'  => esc_html__('[live_title]', 'onepress'), // [live_title]
			'max_item'      => 4, // Maximum item can add
			'limited_msg' 	=> wp_kses_post( __('Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> to be able to add more items and unlock other premium features!', 'onepress' ) ),
			'fields'    => array(
				'title' => array(
					'title' => esc_html__('Title', 'onepress'),
					'type'  =>'text',
					'desc'  => '',
					'default' => esc_html__( 'Your counter label', 'onepress' ),
				),
				'number' => array(
					'title' => esc_html__('Number', 'onepress'),
					'type'  =>'text',
					'default' => 99,
				),
				'unit_before'  => array(
					'title' => esc_html__('Before number', 'onepress'),
					'type'  =>'text',
					'default' => '',
				),
				'unit_after'  => array(
					'title' => esc_html__('After number', 'onepress'),
					'type'  =>'text',
					'default' => '',
				),
			),

		)
	)
);
