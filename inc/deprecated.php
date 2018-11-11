<?php
/**
 * Deprecated Functions
 *
 * @package OnePress
 */

/**
 * @deprecated 2.0.0
 * @link inc/customize-controls/control-pages.php
 */
if ( ! function_exists( 'onepress_enqueue_editor' ) ) {
	function onepress_enqueue_editor() {
		if ( ! isset( $GLOBALS['__wp_mce_editor__'] ) || ! $GLOBALS['__wp_mce_editor__'] ) {
			$GLOBALS['__wp_mce_editor__'] = true;

			echo '<script id="_wp-mce-editor-tpl" type="text/html">';
			wp_editor( '', '__wp_mce_editor__' );
			echo '</script>';
		}
	}
}

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
