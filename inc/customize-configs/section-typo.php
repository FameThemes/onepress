<?php
/**
 * Theme typography (aligned with OnePress Plus inc/typography/auto-apply.php targets).
 *
 * @package onepress
 */

if ( ! isset( $wp_customize ) || ! ( $wp_customize instanceof WP_Customize_Manager ) ) {
	return;
}

if ( class_exists( 'OnePress_Typo_Customize_Control', false ) ) {
	$wp_customize->register_control_type( 'OnePress_Typo_Customize_Control' );
}

if ( ! class_exists( 'OnePress_Typo_Customize_Control', false ) ) {
	return;
}

$wp_customize->add_section(
	'onepress_typo_section',
	array(
		'title'       => esc_html__( 'Typography', 'onepress' ),
		'description' => esc_html__( 'Font styles for branding, navigation, headings, hero, body, and slider content.', 'onepress' ),
		'panel'       => 'onepress_options',
		'priority'    => 6,
	)
);

$onepress_typo_section_default = wp_json_encode( array() );

$wp_customize->add_setting(
	'onepress_typo_branding_title',
	array(
		'default'           => $onepress_typo_section_default,
		'sanitize_callback' => 'onepress_typo_sanitize_field',
		'transport'         => 'postMessage',
	)
);
$wp_customize->add_control(
	new OnePress_Typo_Customize_Control(
		$wp_customize,
		'onepress_typo_branding_title',
		array(
			'label'        => esc_html__( 'Site title', 'onepress' ),
			'description'  => esc_html__( 'Logo text and site name in the header.', 'onepress' ),
			'section'      => 'onepress_typo_section',
			'priority'     => 3,
			'css_selector' => '#page .site-branding .site-title, #page .site-branding .site-text-logo',
			
		)
	)
);

$wp_customize->add_setting(
	'onepress_typo_branding_tagline',
	array(
		'default'           => $onepress_typo_section_default,
		'sanitize_callback' => 'onepress_typo_sanitize_field',
		'transport'         => 'postMessage',
	)
);
$wp_customize->add_control(
	new OnePress_Typo_Customize_Control(
		$wp_customize,
		'onepress_typo_branding_tagline',
		array(
			'label'        => esc_html__( 'Site tagline', 'onepress' ),
			'description'  => esc_html__( 'Tagline under the site title.', 'onepress' ),
			'section'      => 'onepress_typo_section',
			'priority'     => 4,
			'css_selector' => '#page .site-branding .site-description',
			
		)
	)
);

$wp_customize->add_setting(
	'onepress_typo_nav',
	array(
		'default'           => $onepress_typo_section_default,
		'sanitize_callback' => 'onepress_typo_sanitize_field',
		'transport'         => 'postMessage',
	)
);
$wp_customize->add_control(
	new OnePress_Typo_Customize_Control(
		$wp_customize,
		'onepress_typo_nav',
		array(
			'label'        => esc_html__( 'Menus', 'onepress' ),
			'description'  => esc_html__( 'Primary navigation links.', 'onepress' ),
			'section'      => 'onepress_typo_section',
			'priority'     => 10,
			'css_selector' => '#page .onepress-menu a',
			
		)
	)
);

$wp_customize->add_setting(
	'onepress_typo_headings',
	array(
		'default'           => $onepress_typo_section_default,
		'sanitize_callback' => 'onepress_typo_sanitize_field',
		'transport'         => 'postMessage',
	)
);
$wp_customize->add_control(
	new OnePress_Typo_Customize_Control(
		$wp_customize,
		'onepress_typo_headings',
		array(
			'label'        => esc_html__( 'Headings', 'onepress' ),
			'description'  => esc_html__( 'Site headings and section titles.', 'onepress' ),
			'section'      => 'onepress_typo_section',
			'priority'     => 20,
			'css_selector' => 'body h1, body h2, body h3, body h4, body h5, body h6, .entry-header .entry-title, body .section-title-area .section-title, body .section-title-area .section-subtitle, body .hero-content-style1 h2',
			
		)
	)
);

$wp_customize->add_setting(
	'onepress_typo_hero_heading',
	array(
		'default'           => $onepress_typo_section_default,
		'sanitize_callback' => 'onepress_typo_sanitize_field',
		'transport'         => 'postMessage',
	)
);
$wp_customize->add_control(
	new OnePress_Typo_Customize_Control(
		$wp_customize,
		'onepress_typo_hero_heading',
		array(
			'label'        => esc_html__( 'Hero', 'onepress' ),
			'description'  => esc_html__( 'Hero headline and two-column hero titles.', 'onepress' ),
			'section'      => 'onepress_typo_section',
			'priority'     => 30,
			'css_selector' => '.hero__content .hero-large-text, .hero__content .hcl2-content h1, .hero__content .hcl2-content h2, .hero__content .hcl2-content h3',
			
		)
	)
);

$wp_customize->add_setting(
	'onepress_typo_paragraphs',
	array(
		'default'           => $onepress_typo_section_default,
		'sanitize_callback' => 'onepress_typo_sanitize_field',
		'transport'         => 'postMessage',
	)
);
$wp_customize->add_control(
	new OnePress_Typo_Customize_Control(
		$wp_customize,
		'onepress_typo_paragraphs',
		array(
			'label'        => esc_html__( 'Paragraphs', 'onepress' ),
			'description'  => esc_html__( 'Body copy, entries, and hero intro text.', 'onepress' ),
			'section'      => 'onepress_typo_section',
			'priority'     => 40,
			'css_selector' => 'body, body p, .entry-content p, .hero-small-text',
			
		)
	)
);

$wp_customize->add_setting(
	'onepress_typo_slider_slide_title',
	array(
		'default'           => $onepress_typo_section_default,
		'sanitize_callback' => 'onepress_typo_sanitize_field',
		'transport'         => 'postMessage',
	)
);
$wp_customize->add_control(
	new OnePress_Typo_Customize_Control(
		$wp_customize,
		'onepress_typo_slider_slide_title',
		array(
			'label'        => esc_html__( 'Slider slide title', 'onepress' ),
			'description'  => esc_html__( 'Hero / front page slider item titles.', 'onepress' ),
			'section'      => 'onepress_typo_section',
			'priority'     => 50,
			'css_selector' => '.section-slider .section-op-slider .item--title',
			
		)
	)
);

$wp_customize->add_setting(
	'onepress_typo_slider_slide_content',
	array(
		'default'           => $onepress_typo_section_default,
		'sanitize_callback' => 'onepress_typo_sanitize_field',
		'transport'         => 'postMessage',
	)
);
$wp_customize->add_control(
	new OnePress_Typo_Customize_Control(
		$wp_customize,
		'onepress_typo_slider_slide_content',
		array(
			'label'        => esc_html__( 'Slider slide text', 'onepress' ),
			'description'  => esc_html__( 'Hero / front page slider item descriptions.', 'onepress' ),
			'section'      => 'onepress_typo_section',
			'priority'     => 51,
			'css_selector' => '.section-slider .section-op-slider .item--desc',
		)
	)
);

if ( ! function_exists( 'onepress_typo_section_postmessage_selectors' ) ) {
	/**
	 * Live preview: map setting IDs to CSS selectors for typography postMessage.
	 *
	 * @param array<string, string> $selectors Setting ID => selector.
	 * @return array<string, string>
	 */
	function onepress_typo_section_postmessage_selectors( $selectors ) {
		if ( ! is_array( $selectors ) ) {
			$selectors = array();
		}
		$selectors['onepress_typo_branding_title']   = '#page .site-branding .site-title, #page .site-branding .site-text-logo';
		$selectors['onepress_typo_branding_tagline'] = '#page .site-branding .site-description';
		$selectors['onepress_typo_nav']              = '#page .onepress-menu a';
		$selectors['onepress_typo_headings']         = 'body h1, body h2, body h3, body h4, body h5, body h6, .entry-header .entry-title, body .section-title-area .section-title, body .section-title-area .section-subtitle, body .hero-content-style1 h2';
		$selectors['onepress_typo_hero_heading']     = '.hero__content .hero-large-text, .hero__content .hcl2-content h1, .hero__content .hcl2-content h2, .hero__content .hcl2-content h3';
		$selectors['onepress_typo_paragraphs']       = 'body, body p, .entry-content p, .hero-small-text';
		$selectors['onepress_typo_slider_slide_title']   = '.section-slider .section-op-slider .item--title';
		$selectors['onepress_typo_slider_slide_content'] = '.section-slider .section-op-slider .item--desc';
		return $selectors;
	}
}
add_filter( 'onepress_typo_postmessage_selectors', 'onepress_typo_section_postmessage_selectors', 20 );
