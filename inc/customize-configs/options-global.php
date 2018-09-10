<?php
/* Global Settings
----------------------------------------------------------------------*/
$wp_customize->add_section( 'onepress_global_settings',
	array(
		'priority'    => 3,
		'title'       => esc_html__( 'Global', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);

// Sidebar settings
$wp_customize->add_setting( 'onepress_layout',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => 'right-sidebar',
		//'transport'			=> 'postMessage'
	)
);

$wp_customize->add_control( 'onepress_layout',
	array(
		'type'        => 'select',
		'label'       => esc_html__( 'Site Layout', 'onepress' ),
		'description' => esc_html__( 'Site Layout, apply for all pages, exclude home page and custom page templates.', 'onepress' ),
		'section'     => 'onepress_global_settings',
		'choices'     => array(
			'right-sidebar' => esc_html__( 'Right sidebar', 'onepress' ),
			'left-sidebar'  => esc_html__( 'Left sidebar', 'onepress' ),
			'no-sidebar'    => esc_html__( 'No sidebar', 'onepress' ),
		)
	)
);


// Disable Animation
$wp_customize->add_setting( 'onepress_animation_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_animation_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Disable animation effect?', 'onepress' ),
		'section'     => 'onepress_global_settings',
		'description' => esc_html__( 'Check this box to disable all element animation when scroll.', 'onepress' )
	)
);

// Disable Animation
$wp_customize->add_setting( 'onepress_btt_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
		'transport'         => 'postMessage'
	)
);
$wp_customize->add_control( 'onepress_btt_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Hide footer back to top?', 'onepress' ),
		'section'     => 'onepress_global_settings',
		'description' => esc_html__( 'Check this box to hide footer back to top button.', 'onepress' )
	)
);

// Disable Google Font
$wp_customize->add_setting( 'onepress_disable_g_font',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
		'transport'         => 'postMessage'
	)
);
$wp_customize->add_control( 'onepress_disable_g_font',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Disable Google Fonts', 'onepress' ),
		'section'     => 'onepress_global_settings',
		'description' => esc_html__( 'Check this if you want to disable default google fonts in theme.', 'onepress' )
	)
);