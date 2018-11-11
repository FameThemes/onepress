<?php
/**
 * Deprecated Functions
 *
 * @package OnePress
 */

/**
 * @deprecated 2.0.0
 * @link inc/sanitize.php
 */
if ( ! function_exists( 'onepress_sanitize_hex_color' ) ) {
	function onepress_sanitize_hex_color( $color ) {
		if ( '' == $color ) {
			return '';
		}
		if ( preg_match( '|^#([A-Fa-f0-9]{3}){1,2}$|', $color ) ) {
			return $color;
		}
		return null;
	}
}
