<?php
/**
 * Section: Gallery
 *
 * @package OnePress\Customizer
 * @since 1.2.6
 */

// Add settings panel.
$wp_customize->add_panel(
	'onepress_gallery',
	array(
		'priority'        => 190,
		'title'           => esc_html__( 'Section: Gallery', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage',
	)
);

// Add Section Settings section.
$wp_customize->add_section(
	'onepress_gallery_settings',
	array(
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_gallery',
	)
);

// Section Settings: Show Content setting.
onepress_add_section_main_setting( $wp_customize, 'gallery', 'disable' );

// Section Settings: Section ID setting.
onepress_add_section_main_setting( $wp_customize, 'gallery', 'id' );

// Section Settings: Title setting.
onepress_add_section_main_setting( $wp_customize, 'gallery', 'title' );

// Section Settings: Subtitle setting.
onepress_add_section_main_setting( $wp_customize, 'gallery', 'subtitle' );

// Section Settings: Section description setting.
onepress_add_section_main_setting( $wp_customize, 'gallery', 'desc' );

// Section Settings: Upsell setting & control.
onepress_add_upsell_for_section( $wp_customize, 'onepress_gallery_settings' );

// Add Section Content section.
$wp_customize->add_section(
	'onepress_gallery_content',
	array(
		'priority'    => 6,
		'title'       => esc_html__( 'Section Content', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_gallery',
	)
);

// Section Content: Gallery Source.
$wp_customize->add_setting(
	'onepress_gallery_source',
	array(
		'sanitize_callback' => 'onepress_sanitize_select',
		'validate_callback' => 'onepress_gallery_source_validate',
		'default'           => 'page',
	)
);
$wp_customize->add_control(
	'onepress_gallery_source',
	array(
		'label'    => esc_html__( 'Select Gallery Source', 'onepress' ),
		'section'  => 'onepress_gallery_content',
		'type'     => 'select',
		'priority' => 5,
		'choices'  => array(
			'page'      => esc_html__( 'Page', 'onepress' ),
			'facebook'  => 'Facebook',
			'instagram' => 'Instagram',
			'flickr'    => 'Flickr',
		),
	)
);

// Section Content: Source page.
$wp_customize->add_setting(
	'onepress_gallery_source_page',
	array(
		'sanitize_callback' => 'absint',
		'validate_callback' => 'onepress_validate_gallery_shortcode',
		'default'           => '',
	)
);
$wp_customize->add_control(
	'onepress_gallery_source_page',
	array(
		'label'       => esc_html__( 'Select Gallery Page', 'onepress' ),
		'section'     => 'onepress_gallery_content',
		'type'        => 'select',
		'priority'    => 10,
		'choices'     => $option_pages,
		'description' => esc_html__( 'Select a page which have content contain [gallery] shortcode.', 'onepress' ),
	)
);

// Section Content: Gallery Layout.
$wp_customize->add_setting(
	'onepress_gallery_layout',
	array(
		'sanitize_callback' => 'onepress_sanitize_select',
		'default'           => 'default',
	)
);
$wp_customize->add_control(
	'onepress_gallery_layout',
	array(
		'label'    => esc_html__( 'Layout', 'onepress' ),
		'section'  => 'onepress_gallery_content',
		'type'     => 'select',
		'priority' => 40,
		'choices'  => array(
			'default'    => esc_html__( 'Default, inside container', 'onepress' ),
			'full-width' => esc_html__( 'Full Width', 'onepress' ),
		),
	)
);

// Section Content: Gallery Display.
$wp_customize->add_setting(
	'onepress_gallery_display',
	array(
		'sanitize_callback' => 'onepress_sanitize_select',
		'default'           => 'default',
	)
);
$wp_customize->add_control(
	'onepress_gallery_display',
	array(
		'label'    => esc_html__( 'Display', 'onepress' ),
		'section'  => 'onepress_gallery_content',
		'type'     => 'select',
		'priority' => 50,
		'choices'  => array(
			'grid'      => esc_html__( 'Grid', 'onepress' ),
			'carousel'  => esc_html__( 'Carousel', 'onepress' ),
			'slider'    => esc_html__( 'Slider', 'onepress' ),
			'justified' => esc_html__( 'Justified', 'onepress' ),
			'masonry'   => esc_html__( 'Masonry', 'onepress' ),
		),
	)
);

// Section Content: Gallery grid spacing.
$wp_customize->add_setting(
	'onepress_g_spacing',
	array(
		'sanitize_callback' => ' onepress_sanitize_posint',
		'validate_callback' => ' onepress_validate_posint',
		'default'           => 20,
	)
);
$wp_customize->add_control(
	'onepress_g_spacing',
	array(
		'label'    => esc_html__( 'Item Spacing', 'onepress' ),
		'section'  => 'onepress_gallery_content',
		'priority' => 55,

	)
);

// Section Content: Row height.
$wp_customize->add_setting(
	'onepress_g_row_height',
	array(
		'sanitize_callback' => 'absint',
		'validate_callback' => 'onepress_validate_absint',
		'default'           => 120,
	)
);
$wp_customize->add_control(
	'onepress_g_row_height',
	array(
		'label'    => esc_html__( 'Row Height', 'onepress' ),
		'section'  => 'onepress_gallery_content',
		'priority' => 57,

	)
);

// Section Content: Number of grid columns.
$wp_customize->add_setting(
	'onepress_g_col',
	array(
		'sanitize_callback' => 'onepress_sanitize_select',
		'default'           => '4',
	)
);
$wp_customize->add_control(
	'onepress_g_col',
	array(
		'label'    => esc_html__( 'Layout columns', 'onepress' ),
		'section'  => 'onepress_gallery_content',
		'priority' => 60,
		'type'     => 'select',
		'choices'  => array(
			'1' => 1,
			'2' => 2,
			'3' => 3,
			'4' => 4,
			'5' => 5,
			'6' => 6,
		),

	)
);

// Section Content: Max. number of gallery items.
$wp_customize->add_setting(
	'onepress_g_number',
	array(
		'sanitize_callback' => 'onepress_sanizite_posint',
		'validate_callback' => 'onepress_validate_posint',
		'default'           => 10,
	)
);
$wp_customize->add_control(
	'onepress_g_number',
	array(
		'label'    => esc_html__( 'Number items', 'onepress' ),
		'section'  => 'onepress_gallery_content',
		'priority' => 65,
	)
);

// Section Content: Enable lightbox.
$wp_customize->add_setting(
	'onepress_g_lightbox',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => 1,
	)
);
$wp_customize->add_control(
	'onepress_g_lightbox',
	array(
		'label'    => esc_html__( 'Enable Lightbox', 'onepress' ),
		'section'  => 'onepress_gallery_content',
		'priority' => 70,
		'type'     => 'checkbox',
	)
);

// Section Content: Read more link.
$wp_customize->add_setting(
	'onepress_g_readmore_link',
	array(
		'sanitize_callback' => 'esc_url_raw',
		'default'           => '',
	)
);
$wp_customize->add_control(
	'onepress_g_readmore_link',
	array(
		'label'    => esc_html__( 'Read More Link', 'onepress' ),
		'section'  => 'onepress_gallery_content',
		'priority' => 90,
		'type'     => 'text',
	)
);

// Section Content: Read more text.
$wp_customize->add_setting(
	'onepress_g_readmore_text',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__( 'View More', 'onepress' ),
	)
);
$wp_customize->add_control(
	'onepress_g_readmore_text',
	array(
		'label'    => esc_html__( 'Read More Text', 'onepress' ),
		'section'  => 'onepress_gallery_content',
		'priority' => 100,
		'type'     => 'text',
	)
);
