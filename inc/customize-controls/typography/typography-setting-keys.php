<?php
/**
 * Canonical typography theme_mod IDs for OnePress_Typo_Customize_Control JSON settings.
 *
 * Used by: typography-auto-apply, css-vars (:root), Customizer postMessage map, selective refresh.
 *
 * IDs are merged from {@see onepress_get_customize_option_definitions()} (entries with
 * `control` => `typography` or `control_class` => `OnePress_Typo_Customize_Control`) plus the
 * static list below for controls still registered outside definition files (e.g. demo).
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'onepress_typo_customizer_typography_setting_ids_from_definitions' ) ) {
	/**
	 * Collect setting IDs for typography JSON controls from merged option definitions.
	 *
	 * @return string[]
	 */
	function onepress_typo_customizer_typography_setting_ids_from_definitions() {
		if ( ! function_exists( 'onepress_get_customize_option_definitions' ) ) {
			return array();
		}

		$ids = array();

		foreach ( onepress_get_customize_option_definitions() as $entry ) {
			if ( ! is_array( $entry ) ) {
				continue;
			}

			$layout_type = isset( $entry['type'] ) ? (string) $entry['type'] : '';
			if ( in_array( $layout_type, array( 'panel', 'section', 'callback', 'custom_section' ), true ) ) {
				continue;
			}

			if ( ! empty( $entry['skip_setting'] ) ) {
				continue;
			}

			$is_typo = false;
			if ( ! empty( $entry['control_class'] ) && 'OnePress_Typo_Customize_Control' === $entry['control_class'] ) {
				$is_typo = true;
			} elseif ( isset( $entry['control'] ) && 'typography' === $entry['control'] ) {
				$is_typo = true;
			}

			if ( ! $is_typo ) {
				continue;
			}

			$sid = isset( $entry['setting_id'] ) ? (string) $entry['setting_id'] : '';
			if ( '' === $sid && isset( $entry['id'] ) ) {
				$sid = (string) $entry['id'];
			}
			if ( '' !== $sid ) {
				$ids[] = $sid;
			}
		}

		return $ids;
	}
}

if ( ! function_exists( 'onepress_typo_customizer_typography_setting_ids' ) ) {
	/**
	 * Setting IDs registered as typography JSON controls (postMessage + auto_apply + preview JS).
	 *
	 * @return string[]
	 */
	function onepress_typo_customizer_typography_setting_ids() {
		$from_defs = onepress_typo_customizer_typography_setting_ids_from_definitions();
		return apply_filters( 'onepress_typo_customizer_typography_setting_ids', $from_defs );
	}
} 

if ( ! function_exists( 'onepress_typo_theme_mod_typography_keys' ) ) {
	/**
	 * All typography JSON theme_mod keys read when building :root CSS.
	 * Includes legacy Plus keys (headings / paragraphs) so migrated data still outputs variables.
	 *
	 * @return string[]
	 */
	function onepress_typo_theme_mod_typography_keys() {
		$legacy = apply_filters(
			'onepress_typo_legacy_typography_theme_mod_keys',
			array(
				'onepress_typo_headings',
				'onepress_typo_paragraphs',
			)
		);
		if ( ! is_array( $legacy ) ) {
			$legacy = array();
		}
		$keys = array_merge( onepress_typo_customizer_typography_setting_ids(), $legacy );

		return apply_filters( 'onepress_typo_theme_mod_typography_keys', array_values( array_unique( $keys ) ) );
	}
}
