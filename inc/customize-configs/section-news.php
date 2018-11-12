<?php
/**
 *  Section: News
 */
$wp_customize->add_panel( 'onepress_news',
	array(
		'priority'        => 260,
		'title'           => esc_html__( 'Section: News', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage'
	)
);

$wp_customize->add_section( 'onepress_news_settings',
	array(
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_news',
	)
);

// Show Content
$wp_customize->add_setting( 'onepress_news_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_news_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Hide this section?', 'onepress' ),
		'section'     => 'onepress_news_settings',
		'description' => esc_html__( 'Check this box to hide this section.', 'onepress' ),
	)
);

// Section ID
$wp_customize->add_setting( 'onepress_news_id',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => esc_html__( 'news', 'onepress' ),
	)
);
$wp_customize->add_control( 'onepress_news_id',
	array(
		'label'       => esc_html__( 'Section ID:', 'onepress' ),
		'section'     => 'onepress_news_settings',
		'description' => esc_html__( 'The section id, we will use this for link anchor.', 'onepress' )
	)
);

// Title
$wp_customize->add_setting( 'onepress_news_title',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__( 'Latest News', 'onepress' ),
	)
);
$wp_customize->add_control( 'onepress_news_title',
	array(
		'label'       => esc_html__( 'Section Title', 'onepress' ),
		'section'     => 'onepress_news_settings',
		'description' => '',
	)
);

// Sub Title
$wp_customize->add_setting( 'onepress_news_subtitle',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__( 'Section subtitle', 'onepress' ),
	)
);
$wp_customize->add_control( 'onepress_news_subtitle',
	array(
		'label'       => esc_html__( 'Section Subtitle', 'onepress' ),
		'section'     => 'onepress_news_settings',
		'description' => '',
	)
);

// Description
$wp_customize->add_setting( 'onepress_news_desc',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);
$wp_customize->add_control( new OnePress_Editor_Custom_Control(
	$wp_customize,
	'onepress_news_desc',
	array(
		'label'       => esc_html__( 'Section Description', 'onepress' ),
		'section'     => 'onepress_news_settings',
		'description' => '',
	)
) );

// hr
$wp_customize->add_setting( 'onepress_news_settings_hr',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
	)
);
$wp_customize->add_control( new OnePress_Misc_Control( $wp_customize, 'onepress_news_settings_hr',
	array(
		'section' => 'onepress_news_settings',
		'type'    => 'hr'
	)
) );

/**
 * @since 2.1.0
 */
$wp_customize->add_setting( 'onepress_news_hide_meta',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => false,
	)
);
$wp_customize->add_control( 'onepress_news_hide_meta',
	array(
		'label'       => esc_html__( 'Hide post categories', 'onepress' ),
		'section'     => 'onepress_news_settings',
		'type' => 'checkbox',
		'description' => '',
	)
);

/**
 * @since 2.1.0
 */
$wp_customize->add_setting( 'onepress_news_excerpt_type',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => 'custom',
	)
);
$wp_customize->add_control( 'onepress_news_excerpt_type',
	array(
		'label'       => esc_html__( 'Custom excerpt length', 'onepress' ),
		'section'     => 'onepress_news_settings',
		'type' => 'select',
		'choices' => array(
			'custom' => __( 'Custom', 'onepress' ),
			'excerpt' => __( 'Use excerpt metabox', 'onepress' ),
			'more_tag' => __( 'Strip excerpt by more tag', 'onepress' ),
			'content' => __( 'Full content', 'onepress' ),
		),
		'description' => '',
	)
);

/**
 * @since 2.1.0
 */
$wp_customize->add_setting( 'onepress_news_excerpt_length',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_news_excerpt_length',
	array(
		'label'       => esc_html__( 'Custom excerpt length', 'onepress' ),
		'section'     => 'onepress_news_settings',
		'description' => '',
	)
);


// Number of post to show.
$wp_customize->add_setting( 'onepress_news_number',
	array(
		'sanitize_callback' => 'onepress_sanitize_number',
		'default'           => '3',
	)
);
$wp_customize->add_control( 'onepress_news_number',
	array(
		'label'       => esc_html__( 'Number of post to show', 'onepress' ),
		'section'     => 'onepress_news_settings',
		'description' => '',
	)
);

$wp_customize->add_setting( 'onepress_news_cat',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => 0,
	)
);

$wp_customize->add_control( new OnePress_Category_Control(
	$wp_customize,
	'onepress_news_cat',
	array(
		'label'       => esc_html__( 'Category to show', 'onepress' ),
		'section'     => 'onepress_news_settings',
		'description' => '',
	)
) );

$wp_customize->add_setting( 'onepress_news_orderby',
	array(
		'sanitize_callback' => 'onepress_sanitize_select',
		'default'           => 0,
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
		)
	)
);

$wp_customize->add_setting( 'onepress_news_order',
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
		)
	)
);

// Blog Button

$wp_customize->add_setting( 'onepress_news_more_page',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
	)
);

$wp_customize->add_control( new OnePress_Pages_Control(
	$wp_customize,
	'onepress_news_more_page',
	array(
		'label'       => esc_html__( 'More News Page', 'onepress' ),
		'section'     => 'onepress_news_settings',
		'show_option_none' =>  esc_html__( 'Custom Link', 'onepress' ),
		'description' => esc_html__( 'It should be your blog page link.', 'onepress' )
	)
) );


$wp_customize->add_setting( 'onepress_news_more_link',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
	)
);

$wp_customize->add_control(
	'onepress_news_more_link',
	array(
		'label'       => esc_html__( 'Custom More News link', 'onepress' ),
		'section'     => 'onepress_news_settings'
	)
);


$wp_customize->add_setting( 'onepress_news_more_text',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__( 'Read Our Blog', 'onepress' ),
	)
);
$wp_customize->add_control( 'onepress_news_more_text',
	array(
		'label'       => esc_html__( 'More News Button Text', 'onepress' ),
		'section'     => 'onepress_news_settings',
		'description' => '',
	)
);

onepress_add_upsell_for_section( $wp_customize, 'onepress_news_settings' );
