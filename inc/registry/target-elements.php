<?php
/**
 * Preset CSS targets for the styling Customizer UI (grouped + searchable).
 *
 * @package OnePress
 */

if ( ! function_exists( 'onepress_styling_target_elements_registry' ) ) {
	/**
	 * Target presets: categories (slug => label) + flat element list.
	 *
	 * Filter: `onepress_styling_target_elements_registry` — (array{ categories: array<string, string>, elements: list<array{id: string, selector: string, name: string, category: string}> }).
	 *
	 * @return array{categories: array<string, string>, elements: list<array{id: string, selector: string, name: string, category: string}>}
	 */
	function onepress_styling_target_elements_registry() {
		static $cache = null;
		if ( null !== $cache ) {
			return $cache;
		}

		$categories = array(
			'basic'   => esc_html__( 'Basic', 'onepress' ),
			'header'  => esc_html__( 'Header', 'onepress' ),
			'footer'  => esc_html__( 'Footer', 'onepress' ),
			'content' => esc_html__( 'Content', 'onepress' ),
			'sidebar' => esc_html__( 'Sidebar', 'onepress' ),
			'other'   => esc_html__( 'Other', 'onepress' ),
		);

		$elements = array(
			array(
				'id'       => 'onepress_typo_p',
				'selector' => 'body, body p',
				'name'     => esc_html__( 'Paragraph Typography', 'onepress' ),
				'category' => 'basic',
			),
			array(
				'id'       => 'onepress_typo_site_title',
				'selector' => '#page .site-branding .site-title, #page .site-branding .site-text-logo',
				'name'     => esc_html__( 'Site Title Typography', 'onepress' ),
				'category' => 'header',
			),
			array(
				'id'       => 'onepress_typo_site_tagline',
				'selector' => '#page .site-branding .site-description',
				'name'     => esc_html__( 'Site Tagline Typography', 'onepress' ),
				'category' => 'header',
			),
			array(
				'id'       => 'onepress_typo_menu',
				'selector' => '.onepress-menu a',
				'name'     => esc_html__( 'Menu Typography', 'onepress' ),
				'category' => 'header',
			),
			array(
				'id'       => 'onepress_hero_heading',
				'selector' => '.hero__content .hero-large-text, .hero__content .hcl2-content h1, .hero__content .hcl2-content h2, .hero__content .hcl2-content h3',
				'name'     => esc_html__( 'Hero Heading Typography', 'onepress' ),
				'category' => 'content',
			),
			array(
				'id'       => 'onepress_typo_heading',
				'selector' => 'body h1, body h2, body h3, body h4, body h5, body h6, .entry-header .entry-title, body .section-title-area .section-title, body .section-title-area .section-subtitle, body .hero-content-style1 h2',
				'name'     => esc_html__( 'Heading Typography', 'onepress' ),
				'category' => 'content',
			),
			array(
				'id'       => 'onepress_slider_slide_typo_title',
				'selector' => '.section-slider .section-op-slider .item--title',
				'name'     => esc_html__( 'Slider Slide Title Typography', 'onepress' ),
				'category' => 'content',
			),
			array(
				'id'       => 'onepress_slider_slide_typo_content',
				'selector' => '.section-slider .section-op-slider .item--desc',
				'name'     => esc_html__( 'Slider Slide Content Typography', 'onepress' ),
				'category' => 'content',
			),
		);

		$cache = apply_filters(
			'onepress_styling_target_elements_registry',
			array(
				'categories' => $categories,
				'elements'   => $elements,
			)
		);

		return $cache;
	}
}
