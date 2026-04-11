<?php
/**
 * Colors: declarative list (merged in customize-option-definitions.php).
 *
 * Wrap UI strings with esc_html__() / __() here so gettext can extract msgids.
 * HTML snippets use wp_kses_post( __( ... ) ).
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	// Panel `onepress_options` is registered in customize-configs/options.php (before definitions are applied).
	array(
		'type'           => 'section',
		'id'             => 'onepress_colors_settings',
		'priority'       => 4,
		'title'          => esc_html__( 'Colors', 'onepress' ),
		'description'    => '',
		'panel'          => 'onepress_options',
	),
	array(
		'id'          => 'onepress_primary_color',
		'control'     => 'color',
		'default'     => '#03c4eb',
		'setting'     => array(
			'sanitize_js_callback' => 'maybe_hash_hex_color',
		),
		'label'       => esc_html__( 'Primary Color', 'onepress' ),
		'section'     => 'onepress_colors_settings',
		'description' => '',
		'priority'    => 1,
	),
	array(
		'id'          => 'onepress_secondary_color',
		'control'     => 'color',
		'default'     => '#333333',
		'setting'     => array(
			'sanitize_js_callback' => 'maybe_hash_hex_color',
		),
		'label'       => esc_html__( 'Secondary Color', 'onepress' ),
		'section'     => 'onepress_colors_settings',
		'description' => '',
		'priority'    => 2,
	),
	// Typography text colors (migrated from OnePress Plus typography `color` field; see inc/migrate/typography-from-onepress-plus.php).
	array(
		'id'            => 'onepress_typo_paragraphs_color',
		'control'       => 'color',
		'default'       => '',
		'label'         => esc_html__( 'Paragraph & body text color', 'onepress' ),
		'description'   => esc_html__( 'Applies to paragraphs, entry content, and hero intro text. Linked to Typography → Paragraphs.', 'onepress' ),
		'section'       => 'onepress_colors_settings',
		'priority'      => 15,
	),
	array(
		'id'            => 'onepress_typo_hero_heading_color',
		'control'       => 'color',
		'default'       => '',
		'label'         => esc_html__( 'Hero headline color', 'onepress' ),
		'description'   => esc_html__( 'Applies to hero titles. Linked to Typography → Hero.', 'onepress' ),
		'section'       => 'onepress_colors_settings',
		'priority'      => 16,
	),
	array(
		'id'            => 'onepress_typo_branding_title_color',
		'control'       => 'color',
		'default'       => '',
		'label'         => esc_html__( 'Site title color', 'onepress' ),
		'description'   => esc_html__( 'Linked to Typography → Site title.', 'onepress' ),
		'section'       => 'onepress_colors_settings',
		'priority'      => 17,
	),
	array(
		'id'            => 'onepress_typo_branding_tagline_color',
		'control'       => 'color',
		'default'       => '',
		'label'         => esc_html__( 'Site tagline color', 'onepress' ),
		'description'   => esc_html__( 'Linked to Typography → Site tagline.', 'onepress' ),
		'section'       => 'onepress_colors_settings',
		'priority'      => 18,
	),
	array(
		'id'            => 'onepress_typo_slider_slide_title_color',
		'control'       => 'color',
		'default'       => '',
		'label'         => esc_html__( 'Slider title color', 'onepress' ),
		'description'   => esc_html__( 'Linked to Typography → Slider slide title.', 'onepress' ),
		'section'       => 'onepress_colors_settings',
		'priority'      => 19,
	),
	array(
		'id'            => 'onepress_typo_slider_slide_content_color',
		'control'       => 'color',
		'default'       => '',
		'label'         => esc_html__( 'Slider text color', 'onepress' ),
		'description'   => esc_html__( 'Linked to Typography → Slider slide text.', 'onepress' ),
		'section'       => 'onepress_colors_settings',
		'priority'      => 20,
	),
);
