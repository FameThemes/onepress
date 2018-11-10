<?php
/**
 * Section: About
 *
 * @package OnePress\Customizer
 * @since Unknown
 */

// Add settings panel.
$wp_customize->add_panel(
	'onepress_about',
	array(
		'priority'        => 160,
		'title'           => esc_html__( 'Section: About', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage',
	)
);

// Add Section Settings section.
$wp_customize->add_section(
	'onepress_about_settings',
	array(
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_about',
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

if ( class_exists( 'OnePress_Plus' ) ) {
	// Section Settings: Layout setting.
	$wp_customize->add_setting(
		'onepress_about_layout',
		array(
			'sanitize_callback' => 'onepress_sanitize_select',
			'default'           => 3,
		)
	);

	// Section Settings: Layout control.
	$wp_customize->add_control(
		'onepress_about_layout',
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

// Section Settings: Upsell setting & control.
onepress_add_upsell_for_section( $wp_customize, 'onepress_about_settings' );

// Add Section Content section.
$wp_customize->add_section(
	'onepress_about_content',
	array(
		'priority'    => 6,
		'title'       => esc_html__( 'Section Content', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_about',
	)
);

// Section Content: Items setting.
$wp_customize->add_setting(
	'onepress_about_boxes',
	array(
		'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
		'transport'         => 'refresh',
	)
);

// Section Content: Items control.
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
			'max_item'      => 3, // Maximum number of addable items in free version.
			'limited_msg'   => wp_kses_post( __( 'Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> to be able to add more items and unlock other premium features!', 'onepress' ) ),
			'fields'        => array(
				'content_page' => array(
					'title'   => esc_html__( 'Select a page', 'onepress' ),
					'type'    => 'select',
					'options' => $option_pages,
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

// Section Content: Content source setting.
$wp_customize->add_setting(
	'onepress_about_content_source',
	array(
		'sanitize_callback' => 'onepress_sanitize_select',
		'default'           => 'content',
	)
);

// Section Content: Content source control.
$wp_customize->add_control(
	'onepress_about_content_source',
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
