<?php
/**
 *  Dots Navigation Settings
 * @since 2.1.0
 */
$wp_customize->add_section( 'onepress_sections_nav',
	array(
		'priority'    => null,
		'title'       => esc_html__( 'Sections Navigation', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);

Onepress_Dots_Navigation::get_instance()->add_customize( $wp_customize, 'onepress_sections_nav' );
