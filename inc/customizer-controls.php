<?php

/**
 * Load Controls Files
 */
require_once get_template_directory() . '/inc/customize-controls/typography/fonts.php';
require_once get_template_directory() . '/inc/customize-controls/typography/helper.php';
require_once get_template_directory() . '/inc/customize-controls/typography/typography.php';
require_once get_template_directory() . '/inc/customize-controls/typography/typography-upsell.php';
require_once get_template_directory() . '/inc/customize-controls/spacing/spacing.php';
require_once get_template_directory() . '/inc/customize-controls/slider/slider.php';
require_once get_template_directory() . '/inc/customize-controls/background/background.php';
require_once get_template_directory() . '/inc/customize-controls/section-plus/section-plus.php';
require_once get_template_directory() . '/inc/customize-controls/misc/misc.php';
require_once get_template_directory() . '/inc/customize-controls/heading/heading.php';
require_once get_template_directory() . '/inc/customize-controls/custom-textarea/custom-textarea.php';
require_once get_template_directory() . '/inc/customize-controls/theme-support/theme-support.php';
require_once get_template_directory() . '/inc/customize-controls/editor/editor.php';
require_once get_template_directory() . '/inc/customize-controls/color-alpha/color-alpha.php';
require_once get_template_directory() . '/inc/customize-controls/repeater/repeater.php';
require_once get_template_directory() . '/inc/customize-controls/category/category.php';
require_once get_template_directory() . '/inc/customize-controls/pages/pages.php';
require_once get_template_directory() . '/inc/customize-controls/media/media.php';
require_once get_template_directory() . '/inc/customize-controls/switch/switch.php';
require_once get_template_directory() . '/inc/customize-controls/layout/layout.php';


class OnePress_Editor_Scripts
{

	/**
	 * Enqueue scripts/styles.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public static function enqueue()
	{

		if (! class_exists('_WP_Editors')) {
			require ABSPATH . WPINC . '/class-wp-editor.php';
		}

		add_action('customize_controls_print_footer_scripts', array(__CLASS__, 'enqueue_editor'), 2);
		add_action('customize_controls_print_footer_scripts', array('_WP_Editors', 'editor_js'), 50);
		add_action('customize_controls_print_footer_scripts', array('_WP_Editors', 'enqueue_scripts'), 1);
	}

	public static function enqueue_editor()
	{
		if (! isset($GLOBALS['__wp_mce_editor__']) || ! $GLOBALS['__wp_mce_editor__']) {
			$GLOBALS['__wp_mce_editor__'] = true;
?>
			<script id="_wp-mce-editor-tpl" type="text/html">
				<?php wp_editor('', '__wp_mce_editor__'); ?>
			</script>
<?php
		}
	}
}


function onepres_customizer_control_scripts()
{
	wp_enqueue_media();
	wp_enqueue_script('jquery-ui-sortable');
	wp_enqueue_script('wp-color-picker');
	wp_enqueue_style('wp-color-picker');

	$customizer_data = array(
		'multiple_map_notice' => esc_html__('Please setup your main Latitude & Longitude first', 'onepress'),
	);

	$handle = onepress_load_build_script(
		'customizer',
		array( 'customize-controls', 'wp-color-picker', 'jquery-ui-sortable' ),
		true
	);
	wp_localize_script($handle, 'ONEPRESS_CUSTOMIZER_DATA', $customizer_data);

	if ( function_exists( 'onepress_dynamic_option_blocks_localize_script' ) ) {
		onepress_dynamic_option_blocks_localize_script( $handle );
	}

	$typo_bp = apply_filters(
		'onepress_typo_responsive_breakpoints',
		array(
			'tablet' => '991px',
			'mobile' => '767px',
		)
	);
	if ( ! is_array( $typo_bp ) ) {
		$typo_bp = array(
			'tablet' => '991px',
			'mobile' => '767px',
		);
	}
	$bg_breakpoints = apply_filters(
		'onepress_background_responsive_breakpoints',
		$typo_bp
	);
	if ( ! is_array( $bg_breakpoints ) ) {
		$bg_breakpoints = $typo_bp;
	}
	wp_localize_script($handle, 'onepressBackgroundBreakpoints', $bg_breakpoints);
}

add_action('customize_controls_enqueue_scripts', 'onepres_customizer_control_scripts', 99);
add_action('customize_controls_enqueue_scripts', array('OnePress_Editor_Scripts', 'enqueue'), 95);
