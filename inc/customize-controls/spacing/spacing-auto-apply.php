<?php
/**
 * Map spacing theme mod to front-end CSS (see option-demo-example.php).
 *
 * @package onepress
 */

if ( function_exists( 'onepress_spacing_helper_auto_apply' ) ) {
	onepress_spacing_helper_auto_apply(
		'onepress_spacing_demo_site_title',
		'#features .container',
		null,
		'theme_mod',
		''
	);
}
