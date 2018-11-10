<?php
/**
 * Section: Features
 *
 * @package OnePress\Customizer
 * @since 1.1.5
 */

// Add settings panel.
$wp_customize->add_panel(
	'onepress_features',
	array(
		'priority'        => 150,
		'title'           => esc_html__( 'Section: Features', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage',
	)
);

// Add Section Settings section.
$wp_customize->add_section(
	'onepress_features_settings',
	array(
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_features',
	)
);

// Section Settings: Show Content setting.
onepress_add_section_main_setting( $wp_customize, 'about', 'disable' );

// Section Settings: Section ID setting.
onepress_add_section_main_setting( $wp_customize, 'about', 'id' );

// Section Settings: Title setting.
onepress_add_section_main_setting( $wp_customize, 'about', 'title' );

// Section Settings: Subtitle setting.
onepress_add_section_main_setting( $wp_customize, 'about', 'subtitle' );

// Section Settings: Section description setting.
onepress_add_section_main_setting( $wp_customize, 'about', 'desc' );

// Section Settings: Features layout.
$wp_customize->add_setting(
	'onepress_features_layout',
	array(
		'sanitize_callback' => 'onepress_sanitize_select',
		'default'           => '3',
	)
);
$wp_customize->add_control(
	'onepress_features_layout',
	array(
		'label'       => esc_html__( 'Features Layout Setting', 'onepress' ),
		'section'     => 'onepress_features_settings',
		'description' => '',
		'type'        => 'select',
		'choices'     => array(
			'3' => esc_html__( '4 Columns', 'onepress' ),
			'4' => esc_html__( '3 Columns', 'onepress' ),
			'6' => esc_html__( '2 Columns', 'onepress' ),
		),
	)
);

// Section Settings: Upsell setting & control.
onepress_add_upsell_for_section( $wp_customize, 'onepress_features_settings' );

// Add Section Content section.
$wp_customize->add_section(
	'onepress_features_content',
	array(
		'priority'    => 6,
		'title'       => esc_html__( 'Section Content', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_features',
	)
);

// Section Content: Features content.
$wp_customize->add_setting(
	'onepress_features_boxes',
	array(
		'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
		'transport'         => 'refresh',
	)
);
$wp_customize->add_control(
	new Onepress_Customize_Repeatable_Control(
		$wp_customize,
		'onepress_features_boxes',
		array(
			'label'         => esc_html__( 'Features content', 'onepress' ),
			'description'   => '',
			'section'       => 'onepress_features_content',
			'live_title_id' => 'title', // apply for unput text and textarea only
			'title_format'  => esc_html__( '[live_title]', 'onepress' ),
			'max_item'      => 4, // Maximum number of addable items in free version.
			'limited_msg'   => wp_kses_post( __( 'Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> to be able to add more items and unlock other premium features!', 'onepress' ) ),
			'fields'        => array(
				'title'     => array(
					'title' => esc_html__( 'Title', 'onepress' ),
					'type'  => 'text',
				),
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
				'desc'      => array(
					'title' => esc_html__( 'Description', 'onepress' ),
					'type'  => 'editor',
				),
				'link'      => array(
					'title' => esc_html__( 'Custom Link', 'onepress' ),
					'type'  => 'text',
				),
			),

		)
	)
);
