<?php
/**
 * Map typography theme mod to front-end CSS (see option-demo-example.php).
 *
 * @package onepress
 */

if ( function_exists( 'onepress_typo_helper_auto_apply' ) ) {
	onepress_typo_helper_auto_apply(
		'onepress_typo_demo_heading',
		'#features .section-content',
		null,
		'theme_mod',
		''
	);
}
