<?php
/**
 * Section: Team
 *
 * @package OnePress\Customizer
 * @since Unknown
 */

// Add settings panel.
$wp_customize->add_panel(
	'onepress_team',
	array(
		'priority'        => 250,
		'title'           => esc_html__( 'Section: Team', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage',
	)
);

// Add Section Settings section.
$wp_customize->add_section(
	'onepress_team_settings',
	array(
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_team',
	)
);

// Section Settings: Show Content setting.
onepress_add_section_main_setting( $wp_customize, 'team', 'disable' );

// Section Settings: Section ID setting.
onepress_add_section_main_setting( $wp_customize, 'team', 'id' );

// Section Settings: Title setting.
onepress_add_section_main_setting( $wp_customize, 'team', 'title' );

// Section Settings: Subtitle setting.
onepress_add_section_main_setting( $wp_customize, 'team', 'subtitle' );

// Section Settings: Section description setting.
onepress_add_section_main_setting( $wp_customize, 'team', 'desc' );

// Section Settings: Layout.
$wp_customize->add_setting(
	'onepress_team_layout',
	array(
		'sanitize_callback' => 'onepress_sanitize_select',
		'default'           => '3',
	)
);
$wp_customize->add_control(
	'onepress_team_layout',
	array(
		'label'       => esc_html__( 'Team Layout Settings', 'onepress' ),
		'section'     => 'onepress_team_settings',
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
onepress_add_upsell_for_section( $wp_customize, 'onepress_team_settings' );

// Add Section Content section.
$wp_customize->add_section(
	'onepress_team_content',
	array(
		'priority'    => 6,
		'title'       => esc_html__( 'Section Content', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_team',
	)
);

// Section Content: Team members.
$wp_customize->add_setting(
	'onepress_team_members',
	array(
		'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
		'transport'         => 'refresh',
	)
);
$wp_customize->add_control(
	new Onepress_Customize_Repeatable_Control(
		$wp_customize,
		'onepress_team_members',
		array(
			'label'        => esc_html__( 'Team members', 'onepress' ),
			'description'  => '',
			'section'      => 'onepress_team_content',
			// 'live_title_id' => 'user_id', // apply for unput text and textarea only
			'title_format' => esc_html__( '[live_title]', 'onepress' ),
			'max_item'     => 4, // Maximum number of addable items in free version.
			'limited_msg'  => wp_kses_post( __( 'Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> to be able to add more items and unlock other premium features!', 'onepress' ) ),
			'fields'       => array(
				'user_id' => array(
					'title' => esc_html__( 'User media', 'onepress' ),
					'type'  => 'media',
					'desc'  => '',
				),
				'link'    => array(
					'title' => esc_html__( 'Custom Link', 'onepress' ),
					'type'  => 'text',
					'desc'  => '',
				),
			),
		)
	)
);
