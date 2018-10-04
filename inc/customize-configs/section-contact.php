<?php
/**
 * Section: Contact
 */
$wp_customize->add_panel( 'onepress_contact' ,
	array(
		'priority'        => 270,
		'title'           => esc_html__( 'Section: Contact', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage'
	)
);

$wp_customize->add_section( 'onepress_contact_settings' ,
	array(
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_contact',
	)
);

// Show Content
$wp_customize->add_setting( 'onepress_contact_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_contact_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__('Hide this section?', 'onepress'),
		'section'     => 'onepress_contact_settings',
		'description' => esc_html__('Check this box to hide this section.', 'onepress'),
	)
);

// Section ID
$wp_customize->add_setting( 'onepress_contact_id',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => esc_html__('contact', 'onepress'),
	)
);
$wp_customize->add_control( 'onepress_contact_id',
	array(
		'label'     => esc_html__('Section ID:', 'onepress'),
		'section' 		=> 'onepress_contact_settings',
		'description'   => esc_html__( 'The section id, we will use this for link anchor.', 'onepress' )
	)
);

// Title
$wp_customize->add_setting( 'onepress_contact_title',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__('Get in touch', 'onepress'),
	)
);
$wp_customize->add_control( 'onepress_contact_title',
	array(
		'label'     => esc_html__('Section Title', 'onepress'),
		'section' 		=> 'onepress_contact_settings',
		'description'   => '',
	)
);

// Sub Title
$wp_customize->add_setting( 'onepress_contact_subtitle',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__('Section subtitle', 'onepress'),
	)
);
$wp_customize->add_control( 'onepress_contact_subtitle',
	array(
		'label'     => esc_html__('Section Subtitle', 'onepress'),
		'section' 		=> 'onepress_contact_settings',
		'description'   => '',
	)
);

// Description
$wp_customize->add_setting( 'onepress_contact_desc',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);
$wp_customize->add_control( new OnePress_Editor_Custom_Control(
	$wp_customize,
	'onepress_contact_desc',
	array(
		'label' 		=> esc_html__('Section Description', 'onepress'),
		'section' 		=> 'onepress_contact_settings',
		'description'   => '',
	)
));


onepress_add_upsell_for_section( $wp_customize, 'onepress_contact_settings' );


$wp_customize->add_section( 'onepress_contact_content' ,
	array(
		'priority'    => 6,
		'title'       => esc_html__( 'Section Content', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_contact',
	)
);
// Contact form 7 guide.
$wp_customize->add_setting( 'onepress_contact_cf7_guide',
	array(
		'sanitize_callback' => 'onepress_sanitize_text'
	)
);
$wp_customize->add_control( new OnePress_Misc_Control( $wp_customize, 'onepress_contact_cf7_guide',
	array(
		'section'     => 'onepress_contact_content',
		'type'        => 'custom_message',
		'description' => wp_kses_post( 'Paste your form shortcode from contact form plugin here, e.g <code>[wpforms  id="123"]</code>', 'onepress' )
	)
));

// Contact Form 7 Shortcode
$wp_customize->add_setting( 'onepress_contact_cf7',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_contact_cf7',
	array(
		'label'     	=> esc_html__('Contact Form Shortcode.', 'onepress'),
		'section' 		=> 'onepress_contact_content',
		'description'   => '',
	)
);

// Show CF7
$wp_customize->add_setting( 'onepress_contact_cf7_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_contact_cf7_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__('Hide contact form completely.', 'onepress'),
		'section'     => 'onepress_contact_content',
		'description' => esc_html__('Check this box to hide contact form.', 'onepress'),
	)
);

// Contact Text
$wp_customize->add_setting( 'onepress_contact_text',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);
$wp_customize->add_control( new OnePress_Editor_Custom_Control(
	$wp_customize,
	'onepress_contact_text',
	array(
		'label'     	=> esc_html__('Contact Text', 'onepress'),
		'section' 		=> 'onepress_contact_content',
		'description'   => '',
	)
));

// hr
$wp_customize->add_setting( 'onepress_contact_text_hr', array( 'sanitize_callback' => 'onepress_sanitize_text' ) );
$wp_customize->add_control( new OnePress_Misc_Control( $wp_customize, 'onepress_contact_text_hr',
	array(
		'section'     => 'onepress_contact_content',
		'type'        => 'hr'
	)
));

// Address Box
$wp_customize->add_setting( 'onepress_contact_address_title',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_contact_address_title',
	array(
		'label'     	=> esc_html__('Contact Box Title', 'onepress'),
		'section' 		=> 'onepress_contact_content',
		'description'   => '',
	)
);

// Contact Text
$wp_customize->add_setting( 'onepress_contact_address',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_contact_address',
	array(
		'label'     => esc_html__('Address', 'onepress'),
		'section' 		=> 'onepress_contact_content',
		'description'   => '',
	)
);

// Contact Phone
$wp_customize->add_setting( 'onepress_contact_phone',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_contact_phone',
	array(
		'label'     	=> esc_html__('Phone', 'onepress'),
		'section' 		=> 'onepress_contact_content',
		'description'   => '',
	)
);

// Contact Email
$wp_customize->add_setting( 'onepress_contact_email',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_contact_email',
	array(
		'label'     	=> esc_html__('Email', 'onepress'),
		'section' 		=> 'onepress_contact_content',
		'description'   => '',
	)
);

// Contact Fax
$wp_customize->add_setting( 'onepress_contact_fax',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_contact_fax',
	array(
		'label'     	=> esc_html__('Fax', 'onepress'),
		'section' 		=> 'onepress_contact_content',
		'description'   => '',
	)
);