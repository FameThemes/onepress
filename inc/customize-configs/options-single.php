<?php
/**
 * Theme Option: Single Post
 *
 * @package OnePress\Customizer
 * @since Unknown
 */

// Add settings section.
$wp_customize->add_section(
	'onepress_single',
	array(
		'priority'    => null,
		'title'       => esc_html__( 'Single Post', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);

// Layout (sidebar) setting.
$wp_customize->add_setting(
	'single_layout',
	array(
		'sanitize_callback' => 'onepress_sanitize_select',
		'default'           => 'default',
	)
);

// Layout (sidebar) control.
$wp_customize->add_control(
	'single_layout',
	array(
		'type'    => 'select',
		'label'   => esc_html__( 'Single Layout Sidebar', 'onepress' ),
		'section' => 'onepress_single',
		'choices' => array(
			'default'       => esc_html__( 'Default', 'onepress' ),
			'no-sidebar'    => esc_html__( 'No Sidebar', 'onepress' ),
			'left-sidebar'  => esc_html__( 'Left Sidebar', 'onepress' ),
			'right-sidebar' => esc_html__( 'Right Sidebar', 'onepress' ),
		),
	)
);

// Max. content width setting.
$wp_customize->add_setting(
	'single_layout_content_width',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
	)
);

// Max. content width control.
$wp_customize->add_control(
	'single_layout_content_width',
	array(
		'type'        => 'text',
		'label'       => esc_html__( 'Single Content Max Width', 'onepress' ),
		'description' => esc_html__( 'Enter content max width number, e.g : 800', 'onepress' ),
		'section'     => 'onepress_single',
	)
);

// Show single post thumbnail setting.
$wp_customize->add_setting(
	'single_thumbnail',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
	)
);

// Show single post thumbnail control.
$wp_customize->add_control(
	'single_thumbnail',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Show single post thumbnail', 'onepress' ),
		'section'     => 'onepress_single',
		'description' => esc_html__( 'Check this box to show post thumbnail on single post.', 'onepress' ),
	)
);

// Show single post meta setting.
$wp_customize->add_setting(
	'single_meta',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '1',
	)
);

// Show single post meta control.
$wp_customize->add_control(
	'single_meta',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Show single post meta', 'onepress' ),
		'section'     => 'onepress_single',
		'description' => esc_html__( 'Check this box to show single post meta such as post date, author, category,...', 'onepress' ),
	)
);
