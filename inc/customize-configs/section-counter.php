<?php
/**
 * Section: Counter
 *
 * @package OnePress\Customizer
 * @since 1.0.4
 */

// Add settings panel.
$wp_customize->add_panel(
	'onepress_counter',
	array(
		'priority'        => 210,
		'title'           => esc_html__( 'Section: Counter', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage',
	)
);

// Add Section Settings section.
$wp_customize->add_section(
	'onepress_counter_settings',
	array(
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_counter',
	)
);

// Section Settings: Show Content setting.
onepress_add_section_main_setting( $wp_customize, 'counter', 'disable' );

// Section Settings: Section ID setting.
onepress_add_section_main_setting( $wp_customize, 'counter', 'id' );

// Section Settings: Title setting.
onepress_add_section_main_setting( $wp_customize, 'counter', 'title' );

// Section Settings: Subtitle setting.
onepress_add_section_main_setting( $wp_customize, 'counter', 'subtitle' );

// Section Settings: Section description setting.
onepress_add_section_main_setting( $wp_customize, 'counter', 'desc' );

// Section Settings: Upsell setting & control.
onepress_add_upsell_for_section( $wp_customize, 'onepress_counter_settings' );

// Add Section Content section.
$wp_customize->add_section(
	'onepress_counter_content',
	array(
		'priority'    => 6,
		'title'       => esc_html__( 'Section Content', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_counter',
	)
);

// Section Content: Order & Styling setting.
$wp_customize->add_setting(
	'onepress_counter_boxes',
	array(
		'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
		'transport'         => 'refresh',
	)
);

// Section Content: Order & Styling control.
$wp_customize->add_control(
	new Onepress_Customize_Repeatable_Control(
		$wp_customize,
		'onepress_counter_boxes',
		array(
			'label'         => esc_html__( 'Counter content', 'onepress' ),
			'description'   => '',
			'section'       => 'onepress_counter_content',
			'live_title_id' => 'title', // apply for unput text and textarea only
			'title_format'  => esc_html__( '[live_title]', 'onepress' ),
			'max_item'      => 4, // Maximum number of addable items in free version.
			'limited_msg'   => wp_kses_post( __( 'Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> to be able to add more items and unlock other premium features!', 'onepress' ) ),
			'fields'        => array(
				'title'       => array(
					'title'   => esc_html__( 'Title', 'onepress' ),
					'type'    => 'text',
					'desc'    => '',
					'default' => esc_html__( 'Your counter label', 'onepress' ),
				),
				'number'      => array(
					'title'   => esc_html__( 'Number', 'onepress' ),
					'type'    => 'text',
					'default' => 99,
				),
				'unit_before' => array(
					'title'   => esc_html__( 'Before number', 'onepress' ),
					'type'    => 'text',
					'default' => '',
				),
				'unit_after'  => array(
					'title'   => esc_html__( 'After number', 'onepress' ),
					'type'    => 'text',
					'default' => '',
				),
			),

		)
	)
);
