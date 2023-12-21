<?php

/**
 * OnePress Theme Customizer.
 *
 * @package OnePress
 */

/**
 * Add upsell message for section
 *
 * @return string
 */
function onepress_add_upsell_for_section($wp_customize, $section_id)
{
	if (apply_filters('onepress_add_upsell_for_section', true, $section_id)) {

		$name =  $section_id . '__upsell';
		$wp_customize->add_setting(
			$name,
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
			)
		);
		$wp_customize->add_control(new OnePress_Misc_Control(
			$wp_customize,
			$name,
			array(
				'type'        => 'custom_message',
				'section'     => $section_id,
				'description' => __('<h4 class="customizer-group-heading-message">Advanced Section Styling</h4><p class="customizer-group-heading-message">Check out the <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> version for full control over the section styling which includes background color, image, video, parallax effect, custom style and more ...</p>', 'onepress')
			)
		));
	}
}


/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function onepress_customize_register($wp_customize)
{


	// Load custom controls.
	$path = get_template_directory();
	require $path . '/inc/customizer-controls.php';

	// Remove default sections.

	// Custom WP default control & settings.
	$wp_customize->get_setting('blogname')->transport         = 'postMessage';
	$wp_customize->get_setting('blogdescription')->transport  = 'postMessage';
	$wp_customize->get_setting('header_textcolor')->transport = 'postMessage';

	/**
	 * Hook to add other customize
	 */
	do_action('onepress_customize_before_register', $wp_customize);


	$pages  =  get_pages();
	$option_pages = array();
	$option_pages[0] = esc_html__('Select page', 'onepress');
	foreach ($pages as $p) {
		$option_pages[$p->ID] = $p->post_title;
	}

	$users = get_users(array(
		'orderby'      => 'display_name',
		'order'        => 'ASC',
		'number'       => '',
	));

	$option_users[0] = esc_html__('Select member', 'onepress');
	foreach ($users as $user) {
		$option_users[$user->ID] = $user->display_name;
	}

	/**
	 * Load Customize Configs
	 * @since 2.1.0
	 */
	// Site Identity.
	require_once $path . '/inc/customize-configs/site-identity.php';

	//Site Options
	require_once $path . '/inc/customize-configs/options.php';
	require_once $path . '/inc/customize-configs/options-global.php';
	require_once $path . '/inc/customize-configs/options-colors.php';
	require_once $path . '/inc/customize-configs/options-header.php';
	require_once $path . '/inc/customize-configs/options-navigation.php';
	require_once $path . '/inc/customize-configs/options-sections-navigation.php';
	require_once $path . '/inc/customize-configs/options-page.php';
	require_once $path . '/inc/customize-configs/options-blog-posts.php';
	require_once $path . '/inc/customize-configs/options-single.php';
	require_once $path . '/inc/customize-configs/options-footer.php';

	/**
	 * @since 2.1.1
	 * Load sections if enabled
	 */
	$sections = Onepress_Config::get_sections();


	foreach ($sections as $key => $section) {

		if (Onepress_Config::is_section_active($key)) {
			$file = $path . '/inc/customize-configs/section-' . $key . '.php';
			if (file_exists($file)) {
				require_once $file;
			}
		}
	}

	/*
	// Section Hero
	require_once $path. '/inc/customize-configs/section-hero.php';
	// Section Hero
	require_once $path. '/inc/customize-configs/section-about.php';
	// Video Popup
	require_once $path. '/inc/customize-configs/section-videolightbox.php';
	// Section Gallery
	require_once $path. '/inc/customize-configs/section-gallery.php';
	// Section Features
	require_once $path. '/inc/customize-configs/section-features.php';
	// Section Services
	require_once $path. '/inc/customize-configs/section-services.php';
	// Section Counter
	require_once $path. '/inc/customize-configs/section-counter.php';
	// Section Team
	require_once $path. '/inc/customize-configs/section-team.php';
	// Section News
	require_once $path. '/inc/customize-configs/section-news.php';
	// Section Contact
	require_once $path. '/inc/customize-configs/section-contact.php';
	*/

	// Section Up sell
	require_once $path . '/inc/customize-configs/section-upsell.php';

	/**
	 * Hook to add other customize
	 */
	do_action('onepress_customize_after_register', $wp_customize);

	/**
	 * Move WC Panel to bottom
	 * @since 2.1.1
	 */
	if (onepress_is_wc_active()) {
		$wp_customize->get_panel('woocommerce')->priority = 300;
	}
}
add_action('customize_register', 'onepress_customize_register');
/**
 * Selective refresh
 */
require get_template_directory() . '/inc/customizer-selective-refresh.php';


/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function onepress_customize_preview_js()
{
	wp_enqueue_script('onepress_customizer_liveview', get_template_directory_uri() . '/assets/js/customizer-liveview.js', array('customize-preview', 'customize-selective-refresh'), false, true);
}
add_action('customize_preview_init', 'onepress_customize_preview_js', 65);



add_action('customize_controls_enqueue_scripts', 'opneress_customize_js_settings');
function opneress_customize_js_settings()
{
	if (!class_exists('Onepress_Dashboard')) {
		return;
	}

	$actions = Onepress_Dashboard::get_instance()->get_recommended_actions();
	$number_action = $actions['number_notice'];

	wp_localize_script('customize-controls', 'onepress_customizer_settings', array(
		'number_action' => $number_action,
		'is_plus_activated' => class_exists('OnePress_Plus') ? 'y' : 'n',
		'action_url' => admin_url('themes.php?page=ft_onepress&tab=recommended_actions'),
	));
}

/**
 * Customizer Icon picker
 */
function onepress_customize_controls_enqueue_scripts()
{

	$icons_v6 = include(dirname(__FILE__) . '/list-icon-v6.php');
	wp_localize_script(
		'customize-controls',
		'C_Icon_Picker',
		apply_filters(
			'c_icon_picker_js_setup',
			array(
				'search'    => esc_html__('Search', 'onepress'),
				'fonts' => array(
					'font-awesome' => array(
						// Name of icon
						'name' => esc_html__('Font Awesome', 'onepress'),
						// prefix class example for font-awesome fa-fa-{name}
						'prefix' => '',
						// font url
						'url' => [
							[
								'key' => 'onepress-fa',
								'url' => esc_url(add_query_arg(array('ver' => '6.5.1'), get_template_directory_uri() . '/assets/fontawesome-v6/css/all.min.css')),
							],
							[
								'key' => 'onepress-fa-shims',
								'url' => esc_url(add_query_arg(array('ver' => '6.5.1'), get_template_directory_uri() . '/assets/fontawesome-v6/css/v4-shims.min.css')),
							],
						],
						// Icon class name, separated by |
						'icons' => $icons_v6,
					),

				)

			)
		)
	);
}

add_action('customize_controls_enqueue_scripts', 'onepress_customize_controls_enqueue_scripts');
