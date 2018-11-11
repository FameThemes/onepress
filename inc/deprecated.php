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

/**
 * @deprecated 2.0.0
 * @link inc/sanitize.php
 */
function onepress_sanitize_file_url( $file_url ) {
	$output   = '';
	$filetype = wp_check_filetype( $file_url );
	if ( $filetype['ext'] ) {
		$output = esc_url( $file_url );
	}
	return $output;
}

/**
 * @deprecated 2.0.0
 * @link inc/sanitize.php
 */
function onepress_sanitize_number( $input ) {
	return balanceTags( $input );
}

/**
 * @deprecated 2.0.0
 * @link inc/sanitize.php
 */
function onepress_sanitize_html_input( $string ) {
	return wp_kses_allowed_html( $string );
}
