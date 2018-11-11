<?php
/**
 * Section: Services
 *
 * @package OnePress\Customizer
 * @since Unknown
 */

// Add settings panel.
$wp_customize->add_panel(
	'onepress_services',
	array(
		'priority'        => 170,
		'title'           => esc_html__( 'Section: Services', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage',
	)
);

// Add Section Settings section.
$wp_customize->add_section(
	'onepress_service_settings',
	array(
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_services',
	)
);

// Section Settings: Show Content setting.
onepress_add_section_main_setting( $wp_customize, 'services', 'disable' );

// Section Settings: Section ID setting.
onepress_add_section_main_setting( $wp_customize, 'services', 'id' );

// Section Settings: Title setting.
onepress_add_section_main_setting( $wp_customize, 'services', 'title' );

// Section Settings: Subtitle setting.
onepress_add_section_main_setting( $wp_customize, 'services', 'subtitle' );

// Section Settings: Section description setting.
onepress_add_section_main_setting( $wp_customize, 'services', 'desc' );

// Section Settings: Layout.
$wp_customize->add_setting(
	'onepress_service_layout',
	array(
		'sanitize_callback' => 'onepress_sanitize_select',
		'default'           => '6',
	)
);
$wp_customize->add_control(
	'onepress_service_layout',
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

// Section Settings: Upsell setting.
onepress_add_upsell_for_section( $wp_customize, 'onepress_service_settings' );

// Add Section Content section.
$wp_customize->add_section(
	'onepress_service_content',
	array(
		'priority'    => 6,
		'title'       => esc_html__( 'Section Content', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_services',
	)
);

// Section Content: Items.
$wp_customize->add_setting(
	'onepress_services',
	array(
		'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
		'transport'         => 'refresh',
	)
);
$wp_customize->add_control(
	new Onepress_Customize_Repeatable_Control(
		$wp_customize,
		'onepress_services',
		array(
			'label'         => esc_html__( 'Service content', 'onepress' ),
			'description'   => '',
			'section'       => 'onepress_service_content',
			'live_title_id' => 'content_page', // apply for unput text and textarea only
			'title_format'  => esc_html__( '[live_title]', 'onepress' ),
			'max_item'      => 4, // Maximum number of addable items in free version.,
			'limited_msg'   => wp_kses_post( __( 'Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> to be able to add more items and unlock other premium features!', 'onepress' ) ),
			'fields'        => array(
				'icon_type'    => array(
					'title'   => esc_html__( 'Custom icon', 'onepress' ),
					'type'    => 'select',
					'options' => array(
						'icon'  => esc_html__( 'Icon', 'onepress' ),
						'image' => esc_html__( 'image', 'onepress' ),
					),
				),
				'icon'         => array(
					'title'    => esc_html__( 'Icon', 'onepress' ),
					'type'     => 'icon',
					'required' => array( 'icon_type', '=', 'icon' ),
				),
				'image'        => array(
					'title'    => esc_html__( 'Image', 'onepress' ),
					'type'     => 'media',
					'required' => array( 'icon_type', '=', 'image' ),
				),
				'content_page' => array(
					'title'   => esc_html__( 'Select a page', 'onepress' ),
					'type'    => 'select',
					'options' => $option_pages,
				),
				'enable_link'  => array(
					'title' => esc_html__( 'Link to single page', 'onepress' ),
					'type'  => 'checkbox',
				),
			),

		)
	)
);

// Section Content: Icon size.
$wp_customize->add_setting(
	'onepress_service_icon_size',
	array(
		'sanitize_callback' => 'onepress_sanitize_select',
		'default'           => '5x',
	)
);
$wp_customize->add_control(
	'onepress_service_icon_size',
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

// Section Content: Content source.
$wp_customize->add_setting(
	'onepress_service_content_source',
	array(
		'sanitize_callback' => 'onepress_sanitize_select',
		'default'           => 'excerpt',
	)
);
$wp_customize->add_control(
	'onepress_service_content_source',
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
