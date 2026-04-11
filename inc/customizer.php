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
	require_once $path . '/inc/customizer-register.php';

	// Remove default sections.

	// Custom WP default control & settings.
	$wp_customize->get_setting('blogname')->transport         = 'postMessage';
	$wp_customize->get_setting('blogdescription')->transport  = 'postMessage';
	$wp_customize->get_setting('header_textcolor')->transport = 'postMessage';

	/**
	 * Hook to add other customize
	 */
	do_action('onepress_customize_before_register', $wp_customize);


	/**
	 * Declarative customize-configs (return-array), then imperative configs.
	 *
	 * @since 2.1.0
	 */
	require_once $path . '/inc/customize-dynamic-sections.php';

	$builder_context = onepress_customize_build_builder_context_data();
	// Merged after theme setup (see onepress_customize_reset_option_definitions_cache on after_setup_theme).
	$customize_options = onepress_customize_get_merged_definitions_for_register( $builder_context );
	$GLOBALS['onepress_customize_options'] = $customize_options;
	onepress_customize_register_options($wp_customize, $customize_options);

	Onepress_Dots_Navigation::get_instance()->add_customize($wp_customize, 'onepress_sections_nav');

	$config_dir = $path . '/inc/customize-configs/';

	// require_once $config_dir . 'option-demo-example.php';
	// require_once $config_dir . 'option-dynamic-section-demo.php';

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
add_action('customize_register', 'onepress_customize_register', 20);
/**
 * Selective refresh
 */
require get_template_directory() . '/inc/customizer-selective-refresh.php';


/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function onepress_customize_preview_js()
{
	$handle = onepress_load_build_script('customizer-liveview', ['customize-preview', 'customize-selective-refresh'], true);
	wp_enqueue_script($handle);
	$typo_breakpoints = apply_filters(
		'onepress_typo_responsive_breakpoints',
		array(
			'tablet' => '991px',
			'mobile' => '767px',
		)
	);
	if (! is_array($typo_breakpoints)) {
		$typo_breakpoints = array(
			'tablet' => '991px',
			'mobile' => '767px',
		);
	}
	$bg_breakpoints = apply_filters(
		'onepress_background_responsive_breakpoints',
		$typo_breakpoints
	);
	if (! is_array($bg_breakpoints)) {
		$bg_breakpoints = $typo_breakpoints;
	}
	wp_localize_script($handle, 'onepressBackgroundBreakpoints', $bg_breakpoints);

	$typo_base_px = (int) apply_filters('onepress_typo_css_base_px', 16);
	if ($typo_base_px < 1) {
		$typo_base_px = 16;
	}
	// Scalars must not be passed to wp_localize_script (WP 5.7+); use inline script.
	wp_add_inline_script(
		$handle,
		'window.onepressTypoCssBasePx = ' . $typo_base_px . ';',
		'before'
	);

	$typo_pm_selectors = apply_filters(
		'onepress_typo_postmessage_selectors',
		array()
	);
	if (! is_array($typo_pm_selectors)) {
		$typo_pm_selectors = array();
	}
	wp_localize_script(
		$handle,
		'onepressTypoPostMessageSelectors',
		$typo_pm_selectors
	);

	if (function_exists('onepress_typo_get_customizer_fonts')) {
		$typo_webfonts = onepress_typo_get_customizer_fonts();
		if (! is_array($typo_webfonts)) {
			$typo_webfonts = array();
		}
		wp_localize_script(
			$handle,
			'onepressTypoWebfonts',
			$typo_webfonts
		);
	}

	$spacing_pm_selectors = apply_filters(
		'onepress_spacing_postmessage_selectors',
		array(
			'onepress_spacing_demo_site_title' => '#features .container',
		)
	);
	if (! is_array($spacing_pm_selectors)) {
		$spacing_pm_selectors = array();
	}
	wp_localize_script(
		$handle,
		'onepressSpacingPostMessageSelectors',
		$spacing_pm_selectors
	);

	$slider_pm_config = apply_filters(
		'onepress_slider_postmessage_config',
		array(
			'onepress_slider_demo_logo_width' => array(
				'selector' => '.custom-logo-link img, .custom-logo-link svg',
				'property' => 'width',
			),
		)
	);
	if (! is_array($slider_pm_config)) {
		$slider_pm_config = array();
	}
	wp_localize_script(
		$handle,
		'onepressSliderPostMessageConfig',
		$slider_pm_config
	);

	$bg_pm_ids = apply_filters(
		'onepress_background_postmessage_setting_ids',
		array(
			'onepress_bg_demo_header',
		)
	);
	if (! is_array($bg_pm_ids)) {
		$bg_pm_ids = array();
	}
	$bg_pm_ids = array_values(
		array_filter(
			array_map('strval', $bg_pm_ids),
			static function ($id) {
				return is_string($id) && $id !== '';
			}
		)
	);
	wp_localize_script(
		$handle,
		'onepressBackgroundPostMessageSettingIds',
		$bg_pm_ids
	);

	$color_pm_ids = function_exists( 'onepress_customize_color_preview_postmessage_setting_ids' )
		? onepress_customize_color_preview_postmessage_setting_ids()
		: array();
	if ( ! is_array( $color_pm_ids ) ) {
		$color_pm_ids = array();
	}
	$color_pm_ids = array_values(
		array_filter(
			array_map( 'strval', $color_pm_ids ),
			static function ( $id ) {
				return is_string( $id ) && '' !== $id;
			}
		)
	);
	wp_localize_script(
		$handle,
		'onepressColorPostMessageSettingIds',
		$color_pm_ids
	);
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
				'svg_code'    => esc_html__('Svg Code', 'onepress'),
				'apply_svg'   => esc_html__('Apply', 'onepress'),
				'svg_placeholder' => esc_html__('Paste SVG markup here…', 'onepress'),
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
