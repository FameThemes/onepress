<?php
/**
 * Section: Video Lightbox
 *
 * @package OnePress\Customizer
 * @since 1.1.1
 */

// Add settings panel.
$wp_customize->add_panel(
	'onepress_videolightbox',
	array(
		'priority'        => 180,
		'title'           => esc_html__( 'Section: Video Lightbox', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage',
	)
);

// Add Section Settings section.
$wp_customize->add_section(
	'onepress_videolightbox_settings',
	array(
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_videolightbox',
	)
);

// Section Settings: Show Content setting.
onepress_add_section_main_setting( $wp_customize, 'videolightbox', 'disable' );

// Section Settings: Section ID setting.
onepress_add_section_main_setting( $wp_customize, 'videolightbox', 'id' );

// Section Settings: Title.
$wp_customize->add_setting(
	'onepress_videolightbox_title',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);
$wp_customize->add_control(
	new OnePress_Editor_Custom_Control(
		$wp_customize,
		'onepress_videolightbox_title',
		array(
			'label'       => esc_html__( 'Section heading', 'onepress' ),
			'section'     => 'onepress_videolightbox_settings',
			'description' => '',
		)
	)
);

// Section Settings: Video URL.
$wp_customize->add_setting(
	'onepress_videolightbox_url',
	array(
		'sanitize_callback' => 'esc_url_raw',
		'default'           => '',
	)
);
$wp_customize->add_control(
	'onepress_videolightbox_url',
	array(
		'label'       => esc_html__( 'Video url', 'onepress' ),
		'section'     => 'onepress_videolightbox_settings',
		'description' => esc_html__( 'Paste Youtube or Vimeo url here', 'onepress' ),
	)
);

// Section Settings: Parallax image
$wp_customize->add_setting(
	'onepress_videolightbox_image',
	array(
		'sanitize_callback' => 'absint',
		'default'           => '',
	)
);
$wp_customize->add_control(
	new WP_Customize_Media_Control(
		$wp_customize,
		'onepress_videolightbox_image',
		array(
			'label'   => esc_html__( 'Background image', 'onepress' ),
			'section' => 'onepress_videolightbox_settings',
		)
	)
);

// Section Settings: Upsell setting & control.
onepress_add_upsell_for_section( $wp_customize, 'onepress_videolightbox_settings' );
