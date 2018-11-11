<?php
/**
 * Section: News
 *
 * @package OnePress\Customizer
 * @since 2.1.0 Added option to hide post categories.
 *              Added options to choose the excerpt length.
 * @since Unknown
 */

// Add settings panel.
$wp_customize->add_panel(
	'onepress_news',
	array(
		'priority'        => 260,
		'title'           => esc_html__( 'Section: News', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage',
	)
);

// Add Section Settings section.
$wp_customize->add_section(
	'onepress_news_settings',
	array(
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_news',
	)
);

// Show Content setting.
onepress_add_section_main_setting( $wp_customize, 'news', 'disable' );

// Section ID setting.
onepress_add_section_main_setting( $wp_customize, 'news', 'id' );

// Title setting.
onepress_add_section_main_setting( $wp_customize, 'news', 'title' );

// Subtitle setting.
onepress_add_section_main_setting( $wp_customize, 'news', 'subtitle' );

// Section description setting.
onepress_add_section_main_setting( $wp_customize, 'news', 'desc' );

// Add horizontal line.
onepress_add_hr_setting( $wp_customize, 'onepress_news_settings_hr', 'onepress_news_settings' );

// Hide post categories.
$wp_customize->add_setting(
	'onepress_news_hide_meta',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => 0,
	)
);
$wp_customize->add_control(
	'onepress_news_hide_meta',
	array(
		'label'       => esc_html__( 'Hide post categories', 'onepress' ),
		'section'     => 'onepress_news_settings',
		'type'        => 'checkbox',
		'description' => '',
	)
);

// Excerpt Length: Choices
$wp_customize->add_setting(
	'onepress_news_excerpt_type',
	array(
		'sanitize_callback' => 'onepress_sanitize_select',
		'default'           => 'custom',
	)
);
$wp_customize->add_control(
	'onepress_news_excerpt_type',
	array(
		'label'       => esc_html__( 'Custom excerpt length', 'onepress' ),
		'section'     => 'onepress_news_settings',
		'type'        => 'select',
		'choices'     => array(
			'custom'   => __( 'Custom', 'onepress' ),
			'excerpt'  => __( 'Use excerpt metabox', 'onepress' ),
			'more_tag' => __( 'Strip excerpt by more tag', 'onepress' ),
			'content'  => __( 'Full content', 'onepress' ),
		),
		'description' => '',
	)
);

// Excerpt Length: Custom
$wp_customize->add_setting(
	'onepress_news_excerpt_length',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
	)
);
$wp_customize->add_control(
	'onepress_news_excerpt_length',
	array(
		'label'       => esc_html__( 'Custom excerpt length', 'onepress' ),
		'section'     => 'onepress_news_settings',
		'description' => '',
	)
);

// Number of post to show.
$wp_customize->add_setting(
	'onepress_news_number',
	array(
		'sanitize_callback' => 'onepress_sanitize_posint',
		'validate_callback' => 'onepress_validate_posint',
		'default'           => '3',
	)
);
$wp_customize->add_control(
	'onepress_news_number',
	array(
		'label'       => esc_html__( 'Number of post to show', 'onepress' ),
		'section'     => 'onepress_news_settings',
		'description' => '',
	)
);

// Post category to show.
$wp_customize->add_setting(
	'onepress_news_cat',
	array(
		'sanitize_callback' => 'absint',
		'default'           => 0,
	)
);
$wp_customize->add_control(
	new OnePress_Category_Control(
		$wp_customize,
		'onepress_news_cat',
		array(
			'label'       => esc_html__( 'Category to show', 'onepress' ),
			'section'     => 'onepress_news_settings',
			'description' => '',
		)
	)
);

// Order by.
$wp_customize->add_setting(
	'onepress_news_orderby',
	array(
		'sanitize_callback' => 'onepress_sanitize_select',
		'default'           => 'default',
	)
);
$wp_customize->add_control(
	'onepress_news_orderby',
	array(
		'label'   => esc_html__( 'Order By', 'onepress' ),
		'section' => 'onepress_news_settings',
		'type'    => 'select',
		'choices' => array(
			'default'       => esc_html__( 'Default', 'onepress' ),
			'id'            => esc_html__( 'ID', 'onepress' ),
			'author'        => esc_html__( 'Author', 'onepress' ),
			'title'         => esc_html__( 'Title', 'onepress' ),
			'date'          => esc_html__( 'Date', 'onepress' ),
			'comment_count' => esc_html__( 'Comment Count', 'onepress' ),
			'menu_order'    => esc_html__( 'Order by Page Order', 'onepress' ),
			'rand'          => esc_html__( 'Random order', 'onepress' ),
		),
	)
);

// Ascending or descending order.
$wp_customize->add_setting(
	'onepress_news_order',
	array(
		'sanitize_callback' => 'onepress_sanitize_select',
		'default'           => 'desc',
	)
);
$wp_customize->add_control(
	'onepress_news_order',
	array(
		'label'   => esc_html__( 'Order', 'onepress' ),
		'section' => 'onepress_news_settings',
		'type'    => 'select',
		'choices' => array(
			'desc' => esc_html__( 'Descending', 'onepress' ),
			'asc'  => esc_html__( 'Ascending', 'onepress' ),
		),
	)
);

// Read More Button: Page.
$wp_customize->add_setting(
	'onepress_news_more_page',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
	)
);
$wp_customize->add_control(
	new OnePress_Pages_Control(
		$wp_customize,
		'onepress_news_more_page',
		array(
			'label'            => esc_html__( 'More News Page', 'onepress' ),
			'section'          => 'onepress_news_settings',
			'show_option_none' => esc_html__( 'Custom Link', 'onepress' ),
			'description'      => esc_html__( 'It should be your blog page link.', 'onepress' ),
		)
	)
);

// Read More Button: Custom link.
$wp_customize->add_setting(
	'onepress_news_more_link',
	array(
		'sanitize_callback' => 'esc_url_raw',
		'default'           => '',
	)
);
$wp_customize->add_control(
	'onepress_news_more_link',
	array(
		'label'   => esc_html__( 'Custom More News link', 'onepress' ),
		'section' => 'onepress_news_settings',
	)
);

// Read More Button: Custom link text.
$wp_customize->add_setting(
	'onepress_news_more_text',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__( 'Read Our Blog', 'onepress' ),
	)
);
$wp_customize->add_control(
	'onepress_news_more_text',
	array(
		'label'       => esc_html__( 'More News Button Text', 'onepress' ),
		'section'     => 'onepress_news_settings',
		'description' => '',
	)
);

// Add upsell setting & control.
onepress_add_upsell_for_section( $wp_customize, 'onepress_news_settings' );
