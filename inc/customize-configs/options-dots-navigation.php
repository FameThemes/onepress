<?php
/**
 *  Dots Navigation Settings
 * @since 2.1.0
 */
$wp_customize->add_section( 'onepress_dots_nav',
	array(
		'priority'    => null,
		'title'       => esc_html__( 'Dots Navigation', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);

Onepress_Dots_Navigation::get_instance()->add_customize( $wp_customize, 'onepress_dots_nav' );


