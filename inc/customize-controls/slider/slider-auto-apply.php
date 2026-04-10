<?php
/**
 * Map slider theme mod to front-end CSS (see option-demo-example.php).
 *
 * @package onepress
 */

if ( function_exists( 'onepress_slider_helper_auto_apply' ) ) {
	onepress_slider_helper_auto_apply(
		'onepress_slider_demo_logo_width',
		'.custom-logo-link img, .custom-logo-link svg',
		'width',
		'theme_mod'
	);
}
