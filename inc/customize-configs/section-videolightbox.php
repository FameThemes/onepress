<?php
/*------------------------------------------------------------------------*/
/*  Section: Video Popup
/*------------------------------------------------------------------------*/
$wp_customize->add_panel( 'onepress_videolightbox' ,
	array(
		'priority'        => 180,
		'title'           => esc_html__( 'Section: Video Lightbox', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage'
	)
);

$wp_customize->add_section( 'onepress_videolightbox_settings' ,
	array(
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_videolightbox',
	)
);

// Show Content
$wp_customize->add_setting( 'onepress_videolightbox_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_videolightbox_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__('Hide this section?', 'onepress'),
		'section'     => 'onepress_videolightbox_settings',
		'description' => esc_html__('Check this box to hide this section.', 'onepress'),
	)
);

// Section ID
$wp_customize->add_setting( 'onepress_videolightbox_id',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => 'videolightbox',
	)
);
$wp_customize->add_control( 'onepress_videolightbox_id',
	array(
		'label' 		=> esc_html__('Section ID:', 'onepress'),
		'section' 		=> 'onepress_videolightbox_settings',
		'description'   => esc_html__('The section ID should be English character, lowercase and no space.', 'onepress' )
	)
);

// Title
$wp_customize->add_setting( 'onepress_videolightbox_title',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);

$wp_customize->add_control( new OnePress_Editor_Custom_Control(
	$wp_customize,
	'onepress_videolightbox_title',
	array(
		'label'     	=>  esc_html__('Section heading', 'onepress'),
		'section' 		=> 'onepress_videolightbox_settings',
		'description'   => '',
	)
));

// Video URL
$wp_customize->add_setting( 'onepress_videolightbox_url',
	array(
		'sanitize_callback' => 'esc_url_raw',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_videolightbox_url',
	array(
		'label' 		=> esc_html__('Video url', 'onepress'),
		'section' 		=> 'onepress_videolightbox_settings',
		'description'   =>  esc_html__('Paste Youtube or Vimeo url here', 'onepress'),
	)
);

// Media Library: stores id + url (JSON). Parsed on the front end for the popup link (URL).
$wp_customize->add_setting(
	'onepress_videolightbox_media_url',
	array(
		'sanitize_callback' => 'onepress_sanitize_media_control_mixed',
		'default'           => '',
	)
);
$wp_customize->add_control(
	new OnePress_Media_Control(
		$wp_customize,
		'onepress_videolightbox_media_url',
		array(
			'label'       => esc_html__( 'Video / image from Media Library', 'onepress' ),
			'section'     => 'onepress_videolightbox_settings',
			'storage'     => 'mixed',
			'description' => esc_html__( 'Select an image or video file. Both attachment ID and file URL are saved. If a URL is available, it is used instead of the YouTube/Vimeo field above.', 'onepress' ),
		)
	)
);

// Parallax image
$wp_customize->add_setting( 'onepress_videolightbox_image',
	array(
		'sanitize_callback' => 'onepress_sanitize_number',
		'default'           => '',
	)
);
$wp_customize->add_control( new WP_Customize_Media_Control(
	$wp_customize,
	'onepress_videolightbox_image',
	array(
		'label' 		=> esc_html__('Background image', 'onepress'),
		'section' 		=> 'onepress_videolightbox_settings',
	)
));

onepress_add_upsell_for_section( $wp_customize, 'onepress_videolightbox_settings' );