<?php
/**
 * Site Options
 */

$wp_customize->add_panel( 'onepress_options',
	array(
		'priority'       => 5,
		'capability'     => 'edit_theme_options',
		'theme_supports' => '',
		'title'          => esc_html__( 'Theme Options', 'onepress' ),
		'description'    => '',
	)
);

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


/* Colors
----------------------------------------------------------------------*/
$wp_customize->add_section( 'onepress_colors_settings',
	array(
		'priority'    => 4,
		'title'       => esc_html__( 'Site Colors', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);
// Primary Color
$wp_customize->add_setting( 'onepress_primary_color', array(
	'sanitize_callback'    => 'sanitize_hex_color_no_hash',
	'sanitize_js_callback' => 'maybe_hash_hex_color',
	'default'              => '#03c4eb'
) );
$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_primary_color',
	array(
		'label'       => esc_html__( 'Primary Color', 'onepress' ),
		'section'     => 'onepress_colors_settings',
		'description' => '',
		'priority'    => 1
	)
) );


/* Header
----------------------------------------------------------------------*/
$wp_customize->add_section( 'onepress_header_settings',
	array(
		'priority'    => 5,
		'title'       => esc_html__( 'Header', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);

// Header width
$wp_customize->add_setting( 'onepress_header_width',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => 'contained',
		'transport'         => 'postMessage',
	)
);

$wp_customize->add_control( 'onepress_header_width',
	array(
		'type'    => 'select',
		'label'   => esc_html__( 'Header Width', 'onepress' ),
		'section' => 'onepress_header_settings',
		'choices' => array(
			'full-width' => esc_html__( 'Full Width', 'onepress' ),
			'contained'  => esc_html__( 'Contained', 'onepress' )
		)
	)
);

// Header Layout
$wp_customize->add_setting( 'onepress_header_position',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => 'top',
		'transport'         => 'postMessage',
		'active_callback'   => 'onepress_showon_frontpage'
	)
);

$wp_customize->add_control( 'onepress_header_position',
	array(
		'type'    => 'select',
		'label'   => esc_html__( 'Header Position', 'onepress' ),
		'section' => 'onepress_header_settings',
		'choices' => array(
			'top'        => esc_html__( 'Top', 'onepress' ),
			'below_hero' => esc_html__( 'Below Hero Slider', 'onepress' )
		)
	)
);

// Disable Sticky Header
$wp_customize->add_setting( 'onepress_sticky_header_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
		'transport'         => 'postMessage',
	)
);
$wp_customize->add_control( 'onepress_sticky_header_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Disable Sticky Header?', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => esc_html__( 'Check this box to disable sticky header when scroll.', 'onepress' )
	)
);


// Vertical align menu
$wp_customize->add_setting( 'onepress_vertical_align_menu',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_vertical_align_menu',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Center vertical align for menu', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => esc_html__( 'If you use logo and your logo is too tall, check this box to auto vertical align menu.', 'onepress' )
	)
);

// Scroll to top when click to logo
$wp_customize->add_setting( 'onepress_header_scroll_logo',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => 0,
		'active_callback'   => ''
	)
);
$wp_customize->add_control( 'onepress_header_scroll_logo',
	array(
		'type'    => 'checkbox',
		'label'   => esc_html__( 'Scroll to top when click to the site logo or site title, only apply on front page.', 'onepress' ),
		'section' => 'onepress_header_settings',
	)
);

// Header BG Color
$wp_customize->add_setting( 'onepress_header_bg_color',
	array(
		'sanitize_callback'    => 'sanitize_hex_color_no_hash',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => ''
	) );
$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_header_bg_color',
	array(
		'label'       => esc_html__( 'Background Color', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => '',
	)
) );


// Site Title Color
$wp_customize->add_setting( 'onepress_logo_text_color',
	array(
		'sanitize_callback'    => 'sanitize_hex_color_no_hash',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => ''
	) );
$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_logo_text_color',
	array(
		'label'       => esc_html__( 'Site Title Color', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => esc_html__( 'Only set if you don\'t use an image logo.', 'onepress' ),
	)
) );

$wp_customize->add_setting( 'onepress_tagline_text_color',
	array(
		'sanitize_callback'    => 'sanitize_hex_color_no_hash',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => ''
	) );
$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_tagline_text_color',
	array(
		'label'       => esc_html__( 'Site Tagline Color', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => esc_html__( 'Only set if display site tagline.', 'onepress' ),
	)
) );

// Header Menu Color
$wp_customize->add_setting( 'onepress_menu_color',
	array(
		'sanitize_callback'    => 'sanitize_hex_color_no_hash',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => ''
	) );
$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_menu_color',
	array(
		'label'       => esc_html__( 'Menu Link Color', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => '',
	)
) );

// Header Menu Hover Color
$wp_customize->add_setting( 'onepress_menu_hover_color',
	array(
		'sanitize_callback'    => 'sanitize_hex_color_no_hash',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => ''
	) );
$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_menu_hover_color',
	array(
		'label'       => esc_html__( 'Menu Link Hover/Active Color', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => '',

	)
) );

// Header Menu Hover BG Color
$wp_customize->add_setting( 'onepress_menu_hover_bg_color',
	array(
		'sanitize_callback'    => 'sanitize_hex_color_no_hash',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => ''
	) );
$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_menu_hover_bg_color',
	array(
		'label'       => esc_html__( 'Menu Link Hover/Active BG Color', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => '',
	)
) );

// Responsive Mobile button color
$wp_customize->add_setting( 'onepress_menu_toggle_button_color',
	array(
		'sanitize_callback'    => 'sanitize_hex_color_no_hash',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => ''
	) );
$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_menu_toggle_button_color',
	array(
		'label'       => esc_html__( 'Responsive Menu Button Color', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => '',
	)
) );


// Header Transparent
$wp_customize->add_setting( 'onepress_header_transparent',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
		'active_callback'   => 'onepress_showon_frontpage',
		'transport'         => 'postMessage',
	)
);
$wp_customize->add_control( 'onepress_header_transparent',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Header Transparent', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => esc_html__( 'Apply for front page template only.', 'onepress' )
	)
);

// Transparent Logo
$wp_customize->add_setting( 'onepress_transparent_logo',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
		'transport'         => 'postMessage'
	)
);
$wp_customize->add_control(
	new WP_Customize_Image_Control(
		$wp_customize,
		'onepress_transparent_logo',
		array(
			'label'       => esc_html__( 'Transparent Logo', 'onepress' ),
			'section'     => 'onepress_header_settings',
			'description' => esc_html__( 'Only apply when transparent header option is checked.', 'onepress' )
		)
	)
);

// Transparent Retina Logo
$wp_customize->add_setting( 'onepress_transparent_retina_logo',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
		'transport'         => 'postMessage'
	)
);
$wp_customize->add_control(
	new WP_Customize_Image_Control(
		$wp_customize,
		'onepress_transparent_retina_logo',
		array(
			'label'       => esc_html__( 'Transparent Retina Logo', 'onepress' ),
			'description' => esc_html__( 'Only apply when transparent header option is checked.', 'onepress' ),
			'section'     => 'onepress_header_settings',
		)
	)
);

/**
 * @since 2.0.8
 */
$wp_customize->add_setting( 'onepress_transparent_logo_height',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => ''
	)
);
$wp_customize->add_control( 'onepress_transparent_logo_height',
	array(
		'label'       => esc_html__( 'Transparent Logo Height in Pixel', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => '',
	)
);

$wp_customize->add_setting( 'onepress_transparent_site_title_c',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => ''
	) );
$wp_customize->add_control( new WP_Customize_Color_Control(
	$wp_customize,
	'onepress_transparent_site_title_c',
	array(
		'label'       => esc_html__( 'Transparent Site Title Color', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => '',
	)
) );

$wp_customize->add_setting( 'onepress_transparent_tag_title_c',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => ''
	)
);
$wp_customize->add_control( new WP_Customize_Color_Control(
	$wp_customize,
	'onepress_transparent_tag_title_c',
	array(
		'label'       => esc_html__( 'Transparent Site Tagline Color', 'onepress' ),
		'section'     => 'onepress_header_settings',
		'description' => '',
	)
) );


/* Navigation Settings
----------------------------------------------------------------------*/
$wp_customize->add_section( 'onepress_nav',
	array(
		'priority'    => null,
		'title'       => esc_html__( 'Navigation', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);
$wp_customize->add_setting( 'onepress_menu_item_padding',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
		'transport'         => 'postMessage'
	)
);
$wp_customize->add_control( 'onepress_menu_item_padding',
	array(
		'label'       => esc_html__( 'Menu Item Padding', 'onepress' ),
		'description' => esc_html__( 'Padding left and right for Navigation items (pixels).', 'onepress' ),
		'section'     => 'onepress_nav',
	)
);

/* Page Settings
----------------------------------------------------------------------*/
$wp_customize->add_section( 'onepress_page',
	array(
		'priority'    => null,
		'title'       => esc_html__( 'Page Title Area', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);

// Disable the page title bar
$wp_customize->add_setting( 'onepress_page_title_bar_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_page_title_bar_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Disable Page Title bar?', 'onepress' ),
		'section'     => 'onepress_page',
		'description' => esc_html__( 'Check this box to disable the page title bar on all pages.', 'onepress' )
	)
);

$wp_customize->add_setting( 'onepress_page_cover_pd_top',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
		'transport'         => 'postMessage'
	)
);
$wp_customize->add_control( 'onepress_page_cover_pd_top',
	array(
		'label'       => esc_html__( 'Padding Top', 'onepress' ),
		'description' => esc_html__( 'The page cover padding top in percent (%).', 'onepress' ),
		'section'     => 'onepress_page',
	)
);

$wp_customize->add_setting( 'onepress_page_cover_pd_bottom',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
		'transport'         => 'postMessage'
	)
);
$wp_customize->add_control( 'onepress_page_cover_pd_bottom',
	array(
		'label'       => esc_html__( 'Padding Bottom', 'onepress' ),
		'description' => esc_html__( 'The page cover padding bottom in percent (%).', 'onepress' ),
		'section'     => 'onepress_page',
	)
);

$wp_customize->add_setting( 'onepress_page_cover_color',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => null,
		'transport'         => 'postMessage'
	)
);
$wp_customize->add_control( new WP_Customize_Color_Control(
		$wp_customize,
		'onepress_page_cover_color',
		array(
			'label'   => esc_html__( 'Color', 'onepress' ),
			'section' => 'onepress_page',
		)
	)
);

// Overlay color
$wp_customize->add_setting( 'onepress_page_cover_overlay',
	array(
		'sanitize_callback' => 'onepress_sanitize_color_alpha',
		//'default'           => 'rgba(0,0,0,.3)',
		'transport'         => 'postMessage'
	)
);
$wp_customize->add_control( new OnePress_Alpha_Color_Control(
		$wp_customize,
		'onepress_page_cover_overlay',
		array(
			'label'   => esc_html__( 'Background Overlay Color', 'onepress' ),
			'section' => 'onepress_page',
		)
	)
);

$wp_customize->add_setting( 'onepress_page_cover_align',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => 'center',
		'transport'         => 'postMessage'
	)
);
$wp_customize->add_control( 'onepress_page_cover_align',
	array(
		'label'   => esc_html__( 'Content Align', 'onepress' ),
		'section' => 'onepress_page',
		'type'    => 'select',
		'choices' => array(
			'center' => esc_html__( 'Center', 'onepress' ),
			'left'   => esc_html__( 'Left', 'onepress' ),
			'right'  => esc_html__( 'Right', 'onepress' ),
		),
	)
);


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


/* Footer top Social Settings
----------------------------------------------------------------------*/
$wp_customize->add_section( 'onepres_footer_top',
	array(
		'title'       => esc_html__( 'Footer Socials', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);

// Disable Social
$wp_customize->add_setting( 'onepress_social_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '1',
		'transport'         => 'postMessage',
	)
);
$wp_customize->add_control( 'onepress_social_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Hide Footer Social?', 'onepress' ),
		'section'     => 'onepres_footer_top',
		'description' => esc_html__( 'Check this box to hide footer social section.', 'onepress' )
	)
);

$wp_customize->add_setting( 'onepress_social_footer_guide',
	array(
		'sanitize_callback' => 'onepress_sanitize_text'
	)
);
$wp_customize->add_control( new OnePress_Misc_Control( $wp_customize, 'onepress_social_footer_guide',
	array(
		'section'     => 'onepres_footer_top',
		'type'        => 'custom_message',
		'description' => esc_html__( 'The social profiles specified below will be displayed in the footer of your site.', 'onepress' )
	)
) );

// Footer Social Title
$wp_customize->add_setting( 'onepress_social_footer_title',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__( 'Keep Updated', 'onepress' ),
		'transport'         => 'postMessage',
	)
);
$wp_customize->add_control( 'onepress_social_footer_title',
	array(
		'label'       => esc_html__( 'Social Footer Title', 'onepress' ),
		'section'     => 'onepres_footer_top',
		'description' => ''
	)
);

// Socials
$wp_customize->add_setting(
	'onepress_social_profiles',
	array(
		//'default' => '',
		'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
		'transport'         => 'postMessage', // refresh or postMessage
	) );

$wp_customize->add_control(
	new Onepress_Customize_Repeatable_Control(
		$wp_customize,
		'onepress_social_profiles',
		array(
			'label'         => esc_html__( 'Socials', 'onepress' ),
			'description'   => '',
			'section'       => 'onepres_footer_top',
			'live_title_id' => 'network', // apply for unput text and textarea only
			'title_format'  => esc_html__( '[live_title]', 'onepress' ), // [live_title]
			'max_item'      => 5, // Maximum item can add
			'limited_msg'   => wp_kses_post( __( 'Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> to be able to add more items and unlock other premium features!', 'onepress' ) ),
			'fields'        => array(
				'network' => array(
					'title' => esc_html__( 'Social network', 'onepress' ),
					'type'  => 'text',
				),
				'icon'    => array(
					'title' => esc_html__( 'Icon', 'onepress' ),
					'type'  => 'icon',
				),
				'link'    => array(
					'title' => esc_html__( 'URL', 'onepress' ),
					'type'  => 'text',
				),
			),

		)
	)
);


/* Newsletter Settings
----------------------------------------------------------------------*/

// Disable Newsletter
$wp_customize->add_setting( 'onepress_newsletter_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '1',
		'transport'         => 'postMessage',
	)
);
$wp_customize->add_control( 'onepress_newsletter_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Hide Footer Newsletter?', 'onepress' ),
		'section'     => 'onepres_footer_top',
		'description' => esc_html__( 'Check this box to hide footer newsletter form.', 'onepress' )
	)
);

// Mailchimp Form Title
$wp_customize->add_setting( 'onepress_newsletter_title',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__( 'Join our Newsletter', 'onepress' ),
		'transport'         => 'postMessage', // refresh or postMessage
	)
);
$wp_customize->add_control( 'onepress_newsletter_title',
	array(
		'label'       => esc_html__( 'Newsletter Form Title', 'onepress' ),
		'section'     => 'onepres_footer_top',
		'description' => ''
	)
);

// Mailchimp action url
$wp_customize->add_setting( 'onepress_newsletter_mailchimp',
	array(
		'sanitize_callback' => 'esc_url',
		'default'           => '',
		'transport'         => 'postMessage', // refresh or postMessage
	)
);
$wp_customize->add_control( 'onepress_newsletter_mailchimp',
	array(
		'label'       => esc_html__( 'MailChimp Action URL', 'onepress' ),
		'section'     => 'onepres_footer_top',
		'description' => __( 'The newsletter form use MailChimp, please follow <a target="_blank" href="http://goo.gl/uRVIst">this guide</a> to know how to get MailChimp Action URL. Example <i>//famethemes.us8.list-manage.com/subscribe/post?u=521c400d049a59a4b9c0550c2&amp;id=83187e0006</i>', 'onepress' )
	)
);

// Footer BG Color
$wp_customize->add_setting( 'onepress_footer_bg', array(
	'sanitize_callback'    => 'sanitize_hex_color_no_hash',
	'sanitize_js_callback' => 'maybe_hash_hex_color',
	'default'              => '',
	'transport'            => 'postMessage'
) );
$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_footer_bg',
	array(
		'label'       => esc_html__( 'Background', 'onepress' ),
		'section'     => 'onepres_footer_top',
		'description' => '',
	)
) );


$wp_customize->add_setting( 'onepress_footer_top_color', array(
	'sanitize_callback' => 'sanitize_hex_color',
	'default'           => '',
	'transport'         => 'postMessage'
) );
$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_footer_top_color',
	array(
		'label'       => esc_html__( 'Text Color', 'onepress' ),
		'section'     => 'onepres_footer_top',
		'description' => '',
	)
) );


/* Footer Widgets Settings
----------------------------------------------------------------------*/
$wp_customize->add_section( 'onepress_footer',
	array(
		'priority'    => null,
		'title'       => esc_html__( 'Footer Widgets', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);

$wp_customize->add_setting( 'footer_layout',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
		'transport'         => 'postMessage',
	)
);

$wp_customize->add_control( 'footer_layout',
	array(
		'type'        => 'select',
		'label'       => esc_html__( 'Layout', 'onepress' ),
		'section'     => 'onepress_footer',
		'default'     => '0',
		'description' => esc_html__( 'Number footer columns to display.', 'onepress' ),
		'choices'     => array(
			'4' => 4,
			'3' => 3,
			'2' => 2,
			'1' => 1,
			'0' => esc_html__( 'Disable footer widgets', 'onepress' ),
		)
	)
);

for ( $i = 1; $i <= 4; $i ++ ) {
	$df = 12;
	if ( $i > 1 ) {
		$_n = 12 / $i;
		$df = array();
		for ( $j = 0; $j < $i; $j ++ ) {
			$df[ $j ] = $_n;
		}
		$df = join( '+', $df );
	}
	$wp_customize->add_setting( 'footer_custom_' . $i . '_columns',
		array(
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => $df,
			'transport'         => 'postMessage',
		)
	);
	$wp_customize->add_control( 'footer_custom_' . $i . '_columns',
		array(
			'label'       => $i == 1 ? __( 'Custom footer 1 column width', 'onepress' ) : sprintf( __( 'Custom footer %s columns width', 'onepress' ), $i ),
			'section'     => 'onepress_footer',
			'description' => esc_html__( 'Enter int numbers and sum of them must smaller or equal 12, separated by "+"', 'onepress' ),
		)
	);
}

// onepress_sanitize_color_alpha
$wp_customize->add_setting( 'footer_widgets_color',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => '',
	)
);
$wp_customize->add_control( new WP_Customize_Color_Control(
		$wp_customize,
		'footer_widgets_color',
		array(
			'label'   => esc_html__( 'Text Color', 'onepress' ),
			'section' => 'onepress_footer',
		)
	)
);

$wp_customize->add_setting( 'footer_widgets_bg_color',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => '',
	)
);
$wp_customize->add_control( new WP_Customize_Color_Control(
		$wp_customize,
		'footer_widgets_bg_color',
		array(
			'label'   => esc_html__( 'Background Color', 'onepress' ),
			'section' => 'onepress_footer',
		)
	)
);

// Footer Heading color
$wp_customize->add_setting( 'footer_widgets_title_color',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => '',
	)
);
$wp_customize->add_control( new WP_Customize_Color_Control(
		$wp_customize,
		'footer_widgets_title_color',
		array(
			'label'   => esc_html__( 'Widget Title Color', 'onepress' ),
			'section' => 'onepress_footer',
		)
	)
);


$wp_customize->add_setting( 'footer_widgets_link_color',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => '',
	)
);
$wp_customize->add_control( new WP_Customize_Color_Control(
		$wp_customize,
		'footer_widgets_link_color',
		array(
			'label'   => esc_html__( 'Link Color', 'onepress' ),
			'section' => 'onepress_footer',
		)
	)
);

$wp_customize->add_setting( 'footer_widgets_link_hover_color',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => '',
	)
);
$wp_customize->add_control( new WP_Customize_Color_Control(
		$wp_customize,
		'footer_widgets_link_hover_color',
		array(
			'label'   => esc_html__( 'Link Hover Color', 'onepress' ),
			'section' => 'onepress_footer',
		)
	)
);


/* Footer Copyright Settings
----------------------------------------------------------------------*/
$wp_customize->add_section( 'onepress_footer_copyright',
	array(
		'priority'    => null,
		'title'       => esc_html__( 'Footer Copyright', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);

// Footer Widgets Color
$wp_customize->add_setting( 'onepress_footer_info_bg', array(
	'sanitize_callback'    => 'sanitize_hex_color',
	'sanitize_js_callback' => 'maybe_hash_hex_color',
	'default'              => '',
) );
$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_footer_info_bg',
	array(
		'label'       => esc_html__( 'Background', 'onepress' ),
		'section'     => 'onepress_footer_copyright',
		'description' => '',
	)
) );

// Footer Widgets Color
$wp_customize->add_setting( 'onepress_footer_c_color', array(
	'sanitize_callback'    => 'sanitize_hex_color',
	'sanitize_js_callback' => 'maybe_hash_hex_color',
	'default'              => '',
) );
$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_footer_c_color',
	array(
		'label'       => esc_html__( 'Text Color', 'onepress' ),
		'section'     => 'onepress_footer_copyright',
		'description' => '',
	)
) );

$wp_customize->add_setting( 'onepress_footer_c_link_color', array(
	'sanitize_callback'    => 'sanitize_hex_color',
	'sanitize_js_callback' => 'maybe_hash_hex_color',
	'default'              => '',
) );
$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_footer_c_link_color',
	array(
		'label'       => esc_html__( 'Link Color', 'onepress' ),
		'section'     => 'onepress_footer_copyright',
		'description' => '',
	)
) );

$wp_customize->add_setting( 'onepress_footer_c_link_hover_color', array(
	'sanitize_callback'    => 'sanitize_hex_color',
	'sanitize_js_callback' => 'maybe_hash_hex_color',
	'default'              => '',
) );
$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_footer_c_link_hover_color',
	array(
		'label'       => esc_html__( 'Link Hover Color', 'onepress' ),
		'section'     => 'onepress_footer_copyright',
		'description' => '',
	)
) );


if ( ! function_exists( 'wp_get_custom_css' ) ) {  // Back-compat for WordPress < 4.7.

	/* Custom CSS Settings
	----------------------------------------------------------------------*/
	$wp_customize->add_section(
		'onepress_custom_code',
		array(
			'title' => __( 'Custom CSS', 'onepress' ),
			'panel' => 'onepress_options',
		)
	);


	$wp_customize->add_setting(
		'onepress_custom_css',
		array(
			'default'           => '',
			'sanitize_callback' => 'onepress_sanitize_css',
			'type'              => 'option',
		)
	);

	$wp_customize->add_control(
		'onepress_custom_css',
		array(
			'label'   => __( 'Custom CSS', 'onepress' ),
			'section' => 'onepress_custom_code',
			'type'    => 'textarea'
		)
	);
} else {
	$wp_customize->get_section( 'custom_css' )->priority = 994;
}