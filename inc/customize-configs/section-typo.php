<?php
/**
 * Theme typography — declarative entries (merged in customize-option-definitions.php).
 *
 * The first entry is type `callback`: it runs only inside {@see 'customize_register'} (see
 * onepress_customize_register_options) and calls register_control_type() so WordPress knows about
 * OnePress_Typo_Customize_Control before any `control => typography` row is added.
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$onepress_typo_json_default = wp_json_encode( array() );

$definitions = array(
	// Customizer only: register the PHP control class so JS templates / selective refresh work for rows below.
	array(
		'type'     => 'callback',
		'callback' => static function ( $wp_customize ) {
			if ( class_exists( 'OnePress_Typo_Customize_Control', false ) && method_exists( $wp_customize, 'register_control_type' ) ) {
				$wp_customize->register_control_type( 'OnePress_Typo_Customize_Control' );
			}
		},
	),
	array(
		'type'        => 'section',
		'id'          => 'onepress_typo_section',
		'title'       => esc_html__( 'Typography', 'onepress' ),
		'description' => esc_html__( 'Font styles for branding, navigation, headings, hero, body, and slider content.', 'onepress' ),
		'panel'       => 'onepress_options',
		'priority'    => 6,
	),
	array(
		'id'           => 'onepress_typo_group_base',
		'control'      => 'heading',
		'skip_setting' => true,
		'label'        => esc_html__( 'Base Typography', 'onepress' ),
		'section'      => 'onepress_typo_section',
		'priority'     => 1,
	),
	array(
		'id'            => 'onepress_typo_body',
		'control'       => 'typography',
		'label'         => esc_html__( 'Body Font', 'onepress' ),
		'description'   => esc_html__( 'Select how you want your body text to appear.', 'onepress' ),
		'section'       => 'onepress_typo_section',
		'priority'      => 4,
		'css_selector'  => '',
		'default'       => $onepress_typo_json_default,
		'transport'     => 'postMessage',
		'setting'       => array(
			'sanitize_callback' => 'onepress_typo_sanitize_field',
		),
	),
	array(
		'id'            => 'onepress_typo_h16',
		'control'       => 'typography',
		'label'         => esc_html__( 'Headings (H1-H6) Font', 'onepress' ),
		'description'   => esc_html__( 'Select how you want your headings (H1-H6) text to appear.', 'onepress' ),
		'section'       => 'onepress_typo_section',
		'priority'      => 5,
		'css_selector'  => '',
		'fields'        => array(
			'font_size'   => false,
			'line_height' => false,
		),
		'default'       => $onepress_typo_json_default,
		'transport'     => 'postMessage',
		'setting'       => array(
			'sanitize_callback' => 'onepress_typo_sanitize_field',
		),
	),
	array(
		'id'           => 'onepress_typo_group_brading',
		'control'      => 'heading',
		'skip_setting' => true,
		'label'        => esc_html__( 'Branding Typography', 'onepress' ),
		'section'      => 'onepress_typo_section',
		'priority'     => 10,
	),
	array(
		'id'            => 'onepress_typo_branding_title',
		'control'       => 'typography',
		'label'         => esc_html__( 'Site title', 'onepress' ),
		'description'   => esc_html__( 'Logo text and site name in the header.', 'onepress' ),
		'section'       => 'onepress_typo_section',
		'priority'      => 11,
		'css_selector'  => '',
		'default'       => $onepress_typo_json_default,
		'transport'     => 'postMessage',
		'setting'       => array(
			'sanitize_callback' => 'onepress_typo_sanitize_field',
		),
	),
	array(
		'id'            => 'onepress_typo_branding_tagline',
		'control'       => 'typography',
		'label'         => esc_html__( 'Site tagline', 'onepress' ),
		'description'   => esc_html__( 'Tagline under the site title.', 'onepress' ),
		'section'       => 'onepress_typo_section',
		'priority'      => 12,
		'css_selector'  => '',
		'default'       => $onepress_typo_json_default,
		'transport'     => 'postMessage',
		'setting'       => array(
			'sanitize_callback' => 'onepress_typo_sanitize_field',
		),
	),
	array(
		'id'           => 'onepress_typo_group_nav',
		'control'      => 'heading',
		'skip_setting' => true,
		'label'        => esc_html__( 'Menu Typography', 'onepress' ),
		'section'      => 'onepress_typo_section',
		'priority'     => 20,
	),
	array(
		'id'            => 'onepress_typo_nav',
		'control'       => 'typography',
		'label'         => esc_html__( 'Menu Font', 'onepress' ),
		'description'   => esc_html__( 'Select how you want your menu to appear.', 'onepress' ),
		'section'       => 'onepress_typo_section',
		'priority'      => 21,
		'css_selector'  => '',
		'default'       => $onepress_typo_json_default,
		'transport'     => 'postMessage',
		'setting'       => array(
			'sanitize_callback' => 'onepress_typo_sanitize_field',
		),
	),

	array(
		'id'           => 'onepress_typo_group_hs',
		'control'      => 'heading',
		'skip_setting' => true,
		'label'        => esc_html__( 'Heading Typography', 'onepress' ),
		'section'      => 'onepress_typo_section',
		'priority'     => 60,
	),
);

for ( $i = 1; $i <= 6; $i++ ) {
	$definitions[] = array(
		'id'            => 'onepress_typo_h' . $i,
		'control'       => 'typography',
		'label'         => sprintf( esc_html__( 'H%s Font', 'onepress' ), (string) $i ),
		'section'       => 'onepress_typo_section',
		'priority'      => 60 + $i,
		'css_selector'  => '',
		'default'       => $onepress_typo_json_default,
		'transport'     => 'postMessage',
		'setting'       => array(
			'sanitize_callback' => 'onepress_typo_sanitize_field',
		),
	);
}

$definitions[] = array(
	'id'           => 'onepress_typo_group_site',
	'control'      => 'heading',
	'skip_setting' => true,
	'label'        => esc_html__( 'Section typography', 'onepress' ),
	'section'      => 'onepress_typo_section',
	'priority'     => 80,
);
$definitions[] = array(
	'id'            => 'onepress_typo_hero_heading',
	'control'       => 'typography',
	'label'         => esc_html__( 'Hero Heading Font', 'onepress' ),
	'section'       => 'onepress_typo_section',
	'priority'      => 90,
	'css_selector'  => '',
	'default'       => $onepress_typo_json_default,
	'transport'     => 'postMessage',
	'setting'       => array(
		'sanitize_callback' => 'onepress_typo_sanitize_field',
	),
);
$definitions[] = array(
	'id'            => 'onepress_typo_section_title',
	'control'       => 'typography',
	'label'         => esc_html__( 'Section Heading Font', 'onepress' ),
	'section'       => 'onepress_typo_section',
	'priority'      => 100,
	'css_selector'  => '',
	'default'       => $onepress_typo_json_default,
	'transport'     => 'postMessage',
	'setting'       => array(
		'sanitize_callback' => 'onepress_typo_sanitize_field',
	),
);
$definitions[] = array(
	'id'            => 'onepress_typo_section_subtitle',
	'control'       => 'typography',
	'label'         => esc_html__( 'Section Subtitle Font', 'onepress' ),
	'section'       => 'onepress_typo_section',
	'priority'      => 110,
	'css_selector'  => '',
	'default'       => $onepress_typo_json_default,
	'transport'     => 'postMessage',
	'setting'       => array(
		'sanitize_callback' => 'onepress_typo_sanitize_field',
	),
);

// $definitions[] = array(
// 	'id'            => 'onepress_typo_slider_slide_title',
// 	'control'       => 'typography',
// 	'label'         => esc_html__( 'Slider slide title', 'onepress' ),
// 	'description'   => esc_html__( 'Hero / front page slider item titles.', 'onepress' ),
// 	'section'       => 'onepress_typo_section',
// 	'priority'      => 120,
// 	'css_selector'  => '',
// 	'default'       => $onepress_typo_json_default,
// 	'transport'     => 'postMessage',
// 	'setting'       => array(
// 		'sanitize_callback' => 'onepress_typo_sanitize_field',
// 	),
// );

// $definitions[] = array(
// 	'id'            => 'onepress_typo_slider_slide_content',
// 	'control'       => 'typography',
// 	'label'         => esc_html__( 'Slider slide text', 'onepress' ),
// 	'description'   => esc_html__( 'Hero / front page slider item descriptions.', 'onepress' ),
// 	'section'       => 'onepress_typo_section',
// 	'priority'      => 120,
// 	'css_selector'  => '',
// 	'default'       => $onepress_typo_json_default,
// 	'transport'     => 'postMessage',
// 	'setting'       => array(
// 		'sanitize_callback' => 'onepress_typo_sanitize_field',
// 	),
// );

if ( ! class_exists( 'OnePress_Plus', false ) && class_exists( 'OnePress_Typography_Upsell_Customize_Control', false ) ) {
	$definitions[] = array(
		'id'            => 'onepress_typography_plus_upsell',
		'control'       => 'misc',
		'control_class' => 'OnePress_Typography_Upsell_Customize_Control',
		'section'       => 'onepress_typo_section',
		'priority'      => 9999999,
		'setting'       => array(
			'sanitize_callback' => 'onepress_sanitize_text',
		),
	);
}

return $definitions;
