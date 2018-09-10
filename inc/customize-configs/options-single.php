<?php

/* Single Settings
----------------------------------------------------------------------*/
$wp_customize->add_section( 'onepress_single',
	array(
		'priority'    => null,
		'title'       => esc_html__( 'Single Post', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);

$wp_customize->add_setting( 'single_thumbnail',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
	)
);
$wp_customize->add_control( 'single_thumbnail',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Show single post thumbnail', 'onepress' ),
		'section'     => 'onepress_single',
		'description' => esc_html__( 'Check this box to show post thumbnail on single post.', 'onepress' )
	)
);

$wp_customize->add_setting( 'single_meta',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '1',
	)
);
$wp_customize->add_control( 'single_meta',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Show single post meta', 'onepress' ),
		'section'     => 'onepress_single',
		'description' => esc_html__( 'Check this box to show single post meta such as post date, author, category,...', 'onepress' )
	)
);