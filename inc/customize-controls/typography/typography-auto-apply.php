<?php
/**
 * Typography theme_mod auto_apply + Customizer integration (postMessage selectors, selective refresh CSS keys).
 *
 * Register typography theme mods. Front output uses :root CSS variables (see css-vars.php + src/frontend/styles/_typhography.scss).
 *
 * Setting IDs: onepress_typo_customizer_typography_setting_ids() in typography-setting-keys.php (keep in sync with Customizer registration).
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'onepress_typo_section_postmessage_selectors' ) ) {
	/**
	 * Live preview: typography setting IDs for Customizer postMessage (preview uses :root CSS variables).
	 *
	 * @param array<string, string> $selectors Setting ID => unused selector string (child themes may set per-control selectors).
	 * @return array<string, string>
	 */
	function onepress_typo_section_postmessage_selectors( $selectors ) {
		if ( ! is_array( $selectors ) ) {
			$selectors = array();
		}
		if ( ! function_exists( 'onepress_typo_customizer_typography_setting_ids' ) ) {
			return $selectors;
		}
		foreach ( onepress_typo_customizer_typography_setting_ids() as $id ) {
			if ( ! array_key_exists( $id, $selectors ) ) {
				$selectors[ $id ] = '';
			}
		}
		return $selectors;
	}
}
add_filter( 'onepress_typo_postmessage_selectors', 'onepress_typo_section_postmessage_selectors', 20 );

if ( ! function_exists( 'onepress_typo_selective_refresh_css_settings' ) ) {
	/**
	 * Re-render batched :root CSS when typography JSON mods change (with selective refresh).
	 *
	 * @param array<int, string> $settings Setting IDs.
	 * @return array<int, string>
	 */
	function onepress_typo_selective_refresh_css_settings( $settings ) {
		if ( ! is_array( $settings ) ) {
			return $settings;
		}
		if ( ! function_exists( 'onepress_typo_theme_mod_typography_keys' ) ) {
			return $settings;
		}
		return array_values( array_unique( array_merge( $settings, onepress_typo_theme_mod_typography_keys() ) ) );
	}
}
add_filter( 'onepress_selective_refresh_css_settings', 'onepress_typo_selective_refresh_css_settings', 25 );

if ( ! function_exists( 'onepress_typo_register_auto_apply_from_definitions' ) ) {
	/**
	 * Push typography JSON keys into $onepress_typo_auto_apply (reads merged option definitions).
	 *
	 * Must run on {@see 'init'} or later so including definition PHP (with gettext) does not trigger
	 * WP 6.7+ _load_textdomain_just_in_time notices during theme load.
	 */
	function onepress_typo_register_auto_apply_from_definitions() {
		if ( ! function_exists( 'onepress_typo_helper_auto_apply' ) || ! function_exists( 'onepress_typo_customizer_typography_setting_ids' ) ) {
			return;
		}

		foreach ( onepress_typo_customizer_typography_setting_ids() as $onepress_typo_setting_id ) {
			// Empty css_selector: onepress_typo_render_code() does not emit selector-based rules; typography JSON is output as
			// :root custom properties via onepress_custom_inline_style() → onepress_typo_declarations_from_prefetched_mods().
			// Registration still matters so Google Fonts can be enqueued from saved font-family in onepress_typo_render_code().
			onepress_typo_helper_auto_apply(
				$onepress_typo_setting_id,
				'',
				null,
				'theme_mod',
				''
			);
		}
	}
}
add_action( 'init', 'onepress_typo_register_auto_apply_from_definitions', 0 );
