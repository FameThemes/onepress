<?php
/*
 Colors
----------------------------------------------------------------------*/
$wp_customize->add_section(
	'onepress_colors_settings',
	array(
		'priority'    => 4,
		'title'       => esc_html__( 'Colors', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);
// Primary Color
$wp_customize->add_setting(
	'onepress_primary_color',
	array(
		'sanitize_callback'    => 'sanitize_hex_color_no_hash',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => '#03c4eb',
	)
);
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize,
		'onepress_primary_color',
		array(
			'label'       => esc_html__( 'Primary Color', 'onepress' ),
			'section'     => 'onepress_colors_settings',
			'description' => '',
			'priority'    => 1,
		)
	)
);

/**
 * Secondary Color
 *
 * @since 2.2.1
 */
$wp_customize->add_setting(
	'onepress_secondary_color',
	array(
		'sanitize_callback'    => 'sanitize_hex_color_no_hash',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => '#333333',
	)
);
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize,
		'onepress_secondary_color',
		array(
			'label'       => esc_html__( 'Secondary Color', 'onepress' ),
			'section'     => 'onepress_colors_settings',
			'description' => '',
			'priority'    => 2,
		)
	)
);

// Typography text colors (migrated from OnePress Plus typography `color` field; see inc/migrate/typography-from-onepress-plus.php).
$wp_customize->add_setting(
	'onepress_typo_paragraphs_color',
	array(
		'sanitize_callback' => 'onepress_sanitize_color_alpha',
		'default'           => '',
		'transport'         => 'refresh',
	)
);
$wp_customize->add_control(
	new OnePress_Alpha_Color_Control(
		$wp_customize,
		'onepress_typo_paragraphs_color',
		array(
			'label'       => esc_html__( 'Paragraph & body text color', 'onepress' ),
			'description' => esc_html__( 'Applies to paragraphs, entry content, and hero intro text. Linked to Typography → Paragraphs.', 'onepress' ),
			'section'     => 'onepress_colors_settings',
			'priority'    => 15,
		)
	)
);

$wp_customize->add_setting(
	'onepress_typo_hero_heading_color',
	array(
		'sanitize_callback' => 'onepress_sanitize_color_alpha',
		'default'           => '',
		'transport'         => 'refresh',
	)
);
$wp_customize->add_control(
	new OnePress_Alpha_Color_Control(
		$wp_customize,
		'onepress_typo_hero_heading_color',
		array(
			'label'       => esc_html__( 'Hero headline color', 'onepress' ),
			'description' => esc_html__( 'Applies to hero titles. Linked to Typography → Hero.', 'onepress' ),
			'section'     => 'onepress_colors_settings',
			'priority'    => 16,
		)
	)
);

$wp_customize->add_setting(
	'onepress_typo_branding_title_color',
	array(
		'sanitize_callback' => 'onepress_sanitize_color_alpha',
		'default'           => '',
		'transport'         => 'refresh',
	)
);
$wp_customize->add_control(
	new OnePress_Alpha_Color_Control(
		$wp_customize,
		'onepress_typo_branding_title_color',
		array(
			'label'       => esc_html__( 'Site title color', 'onepress' ),
			'description' => esc_html__( 'Linked to Typography → Site title.', 'onepress' ),
			'section'     => 'onepress_colors_settings',
			'priority'    => 17,
		)
	)
);

$wp_customize->add_setting(
	'onepress_typo_branding_tagline_color',
	array(
		'sanitize_callback' => 'onepress_sanitize_color_alpha',
		'default'           => '',
		'transport'         => 'refresh',
	)
);
$wp_customize->add_control(
	new OnePress_Alpha_Color_Control(
		$wp_customize,
		'onepress_typo_branding_tagline_color',
		array(
			'label'       => esc_html__( 'Site tagline color', 'onepress' ),
			'description' => esc_html__( 'Linked to Typography → Site tagline.', 'onepress' ),
			'section'     => 'onepress_colors_settings',
			'priority'    => 18,
		)
	)
);

$wp_customize->add_setting(
	'onepress_typo_slider_slide_title_color',
	array(
		'sanitize_callback' => 'onepress_sanitize_color_alpha',
		'default'           => '',
		'transport'         => 'refresh',
	)
);
$wp_customize->add_control(
	new OnePress_Alpha_Color_Control(
		$wp_customize,
		'onepress_typo_slider_slide_title_color',
		array(
			'label'       => esc_html__( 'Slider title color', 'onepress' ),
			'description' => esc_html__( 'Linked to Typography → Slider slide title.', 'onepress' ),
			'section'     => 'onepress_colors_settings',
			'priority'    => 19,
		)
	)
);

$wp_customize->add_setting(
	'onepress_typo_slider_slide_content_color',
	array(
		'sanitize_callback' => 'onepress_sanitize_color_alpha',
		'default'           => '',
		'transport'         => 'refresh',
	)
);
$wp_customize->add_control(
	new OnePress_Alpha_Color_Control(
		$wp_customize,
		'onepress_typo_slider_slide_content_color',
		array(
			'label'       => esc_html__( 'Slider text color', 'onepress' ),
			'description' => esc_html__( 'Linked to Typography → Slider slide text.', 'onepress' ),
			'section'     => 'onepress_colors_settings',
			'priority'    => 20,
		)
	)
);
