<?php
/**
 * Section: Contact
 *
 * @package OnePress\Customizer
 * @since Unknown
 */

// Add settings panel.
$wp_customize->add_panel(
	'onepress_contact',
	array(
		'priority'        => 270,
		'title'           => esc_html__( 'Section: Contact', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage',
	)
);

// Add Contact Settings section.
$wp_customize->add_section(
	'onepress_contact_settings',
	array(
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_contact',
	)
);

// Section Settings: Show Content setting.
onepress_add_section_main_setting( $wp_customize, 'contact', 'disable' );

// Section Settings: Section ID setting.
onepress_add_section_main_setting( $wp_customize, 'contact', 'id' );

// Section Settings: Title setting.
onepress_add_section_main_setting( $wp_customize, 'contact', 'title' );

// Section Settings: Subtitle setting.
onepress_add_section_main_setting( $wp_customize, 'contact', 'subtitle' );

// Section Settings: Section description setting.
onepress_add_section_main_setting( $wp_customize, 'contact', 'desc' );

// Section Settings: Upsell setting & control.
onepress_add_upsell_for_section( $wp_customize, 'onepress_contact_settings' );

// Add Section Content section.
$wp_customize->add_section(
	'onepress_contact_content',
	array(
		'priority'    => 6,
		'title'       => esc_html__( 'Section Content', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_contact',
	)
);

// Section Content: Contact from shortcode setting.
$wp_customize->add_setting(
	'onepress_contact_cf7',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'validate_callback' => 'onepress_validate_shortcode',
		'default'           => '',
	)
);

// Section Content: Contact from shortcode control.
$wp_customize->add_control(
	'onepress_contact_cf7',
	array(
		'label'       => esc_html__( 'Contact Form Shortcode.', 'onepress' ),
		'section'     => 'onepress_contact_content',
		'description' => wp_kses_post( 'Paste your form shortcode from contact form plugin here, e.g <code>[wpforms  id="123"]</code>', 'onepress' ),
	)
);

// Section Content: Disable contact from setting.
$wp_customize->add_setting(
	'onepress_contact_cf7_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => 0,
	)
);

// Section Content: Disable contact from control.
$wp_customize->add_control(
	'onepress_contact_cf7_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Hide contact form completely.', 'onepress' ),
		'section'     => 'onepress_contact_content',
		'description' => esc_html__( 'Check this box to hide contact form.', 'onepress' ),
	)
);

// Section Content: Text setting.
$wp_customize->add_setting(
	'onepress_contact_text',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);

// Section Content: Text control.
$wp_customize->add_control(
	new OnePress_Editor_Custom_Control(
		$wp_customize,
		'onepress_contact_text',
		array(
			'label'       => esc_html__( 'Contact Text', 'onepress' ),
			'section'     => 'onepress_contact_content',
			'description' => '',
		)
	)
);

// Add Horizontal line.
$wp_customize->add_setting( 'onepress_contact_text_hr', array( 'sanitize_callback' => 'onepress_sanitize_text' ) );
$wp_customize->add_control(
	new OnePress_Misc_Control(
		$wp_customize, 'onepress_contact_text_hr',
		array(
			'section' => 'onepress_contact_content',
			'type'    => 'hr',
		)
	)
);

// Section Content: Contact box title setting.
$wp_customize->add_setting(
	'onepress_contact_address_title',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
	)
);

// Section Content: Contact box title control.
$wp_customize->add_control(
	'onepress_contact_address_title',
	array(
		'label'       => esc_html__( 'Contact Box Title', 'onepress' ),
		'section'     => 'onepress_contact_content',
		'description' => '',
	)
);

// Section Content: Address setting.
$wp_customize->add_setting(
	'onepress_contact_address',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);

// Section Content: Address control.
$wp_customize->add_control(
	'onepress_contact_address',
	array(
		'label'       => esc_html__( 'Address', 'onepress' ),
		'section'     => 'onepress_contact_content',
		'description' => '',
	)
);

// Section Content: Phone setting.
$wp_customize->add_setting(
	'onepress_contact_phone',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);

// Section Content: Phone control.
$wp_customize->add_control(
	'onepress_contact_phone',
	array(
		'label'       => esc_html__( 'Phone', 'onepress' ),
		'section'     => 'onepress_contact_content',
		'description' => '',
	)
);

// Section Content: Email setting.
$wp_customize->add_setting(
	'onepress_contact_email',
	array(
		'sanitize_callback' => 'sanitize_email',
		'validate_callback' => 'onepress_validate_email',
		'default'           => '',
	)
);

// Section Content: Email control.
$wp_customize->add_control(
	'onepress_contact_email',
	array(
		'label'       => esc_html__( 'Email', 'onepress' ),
		'section'     => 'onepress_contact_content',
		'description' => '',
	)
);

// Section Content: Fax setting.
$wp_customize->add_setting(
	'onepress_contact_fax',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);

// Section Content: Fax control.
$wp_customize->add_control(
	'onepress_contact_fax',
	array(
		'label'       => esc_html__( 'Fax', 'onepress' ),
		'section'     => 'onepress_contact_content',
		'description' => '',
	)
);
