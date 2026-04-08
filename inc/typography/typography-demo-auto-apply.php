<?php
/**
 * Demo: map theme mod to front-end CSS (see options-typography-example.php).
 *
 * @package onepress
 */

if ( function_exists( 'onepress_typo_helper_auto_apply' ) ) {
	onepress_typo_helper_auto_apply(
		'onepress_typo_demo_heading',
		'.site-title a',
		null,
		'theme_mod',
		''
	);
}
