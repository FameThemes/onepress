<?php
/**
 * Theme Option: Section Navigation
 *
 * @package OnePress\Customizer
 * @since 2.1.0
 */

// Add settings section.
$wp_customize->add_section(
	'onepress_sections_nav',
	array(
		'priority'    => null,
		'title'       => esc_html__( 'Sections Navigation', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);

// Dots navigation settings and controls.
Onepress_Dots_Navigation::get_instance()->add_customize( $wp_customize, 'onepress_sections_nav' );
