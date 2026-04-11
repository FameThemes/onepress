<?php
/**
 * Map Customizer `control => color` settings to `--color-*` custom properties.
 *
 * Naming: strip `onepress_` prefix, underscores → hyphens, prefix `--color-`.
 * Example: `onepress_menu_color` → `--color-menu-color`.
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'onepress_theme_mod_id_to_color_css_var' ) ) {
	/**
	 * @param string $setting_id Theme mod key (e.g. onepress_menu_color).
	 * @return string Custom property name (e.g. --color-menu-color).
	 */
	function onepress_theme_mod_id_to_color_css_var( $setting_id ) {
		$id = (string) $setting_id;
		if ( strpos( $id, 'onepress_' ) === 0 ) {
			$id = substr( $id, strlen( 'onepress_' ) );
		}
		$slug = str_replace( '_', '-', $id );
		return '--color-' . $slug;
	}
}

if ( ! function_exists( 'onepress_customize_option_color_setting_ids' ) ) {
	/**
	 * All setting ids registered with `'control' => 'color'` in merged option definitions.
	 *
	 * @return string[]
	 */
	function onepress_customize_option_color_setting_ids() {
		static $cache = null;
		if ( is_array( $cache ) ) {
			return $cache;
		}
		$cache = array();
		if ( ! function_exists( 'onepress_get_customize_option_definitions' ) ) {
			return $cache;
		}
		foreach ( onepress_get_customize_option_definitions() as $entry ) {
			if ( ! is_array( $entry ) ) {
				continue;
			}
			if ( ( $entry['control'] ?? '' ) !== 'color' ) {
				continue;
			}
			$id = isset( $entry['id'] ) ? (string) $entry['id'] : '';
			if ( '' === $id ) {
				continue;
			}
			$cache[] = $id;
		}
		$cache = array_values( array_unique( $cache ) );
		/**
		 * Filter list of theme mod keys treated as Customizer color → `--color-*` bridge.
		 *
		 * @param string[] $cache Setting ids.
		 */
		return apply_filters( 'onepress_customize_option_color_setting_ids', $cache );
	}
}

if ( ! function_exists( 'onepress_customize_color_control_defaults_map' ) ) {
	/**
	 * Default values from definitions for color controls (for prefetch / get_theme_mod fallbacks).
	 *
	 * @return array<string, mixed> setting_id => default (only keys that declare `default` in config).
	 */
	function onepress_customize_color_control_defaults_map() {
		static $cache = null;
		if ( is_array( $cache ) ) {
			return $cache;
		}
		$cache = array();
		if ( ! function_exists( 'onepress_get_customize_option_definitions' ) ) {
			return $cache;
		}
		foreach ( onepress_get_customize_option_definitions() as $entry ) {
			if ( ! is_array( $entry ) ) {
				continue;
			}
			if ( ( $entry['control'] ?? '' ) !== 'color' ) {
				continue;
			}
			$id = isset( $entry['id'] ) ? (string) $entry['id'] : '';
			if ( '' === $id || ! array_key_exists( 'default', $entry ) ) {
				continue;
			}
			$cache[ $id ] = $entry['default'];
		}
		return $cache;
	}
}

if ( ! function_exists( 'onepress_customize_color_declarations_from_prefetched_mods' ) ) {
	/**
	 * @param array<string, mixed> $m Prefetched theme mods.
	 * @return array<string, string> CSS custom property => value.
	 */
	function onepress_customize_color_declarations_from_prefetched_mods( $m ) {
		if ( ! function_exists( 'onepress_sanitize_color_alpha' ) ) {
			return array();
		}
		$props = array();
		foreach ( onepress_customize_option_color_setting_ids() as $key ) {
			if ( ! array_key_exists( $key, $m ) ) {
				continue;
			}
			$san = onepress_sanitize_color_alpha( $m[ $key ] );
			if ( '' === $san || false === $san ) {
				continue;
			}
			$props[ onepress_theme_mod_id_to_color_css_var( $key ) ] = $san;
		}
		return $props;
	}
}

if ( ! function_exists( 'onepress_customize_color_preview_postmessage_setting_ids' ) ) {
	/**
	 * Setting IDs whose values map 1:1 to `--color-*` in the preview (postMessage).
	 * Includes declarative `control => color` entries plus alpha-color mods that use the same naming in inline CSS.
	 *
	 * @return string[]
	 */
	function onepress_customize_color_preview_postmessage_setting_ids() {
		$ids = function_exists( 'onepress_customize_option_color_setting_ids' )
			? onepress_customize_option_color_setting_ids()
			: array();
		$extra = array(
			'onepress_page_cover_color',
			'onepress_page_cover_overlay',
		);
		$merged = array_merge( $ids, $extra );
		$merged = array_map( 'strval', $merged );
		$merged = array_filter(
			$merged,
			static function ( $id ) {
				return is_string( $id ) && '' !== $id;
			}
		);
		$out = array_values( array_unique( $merged ) );
		/**
		 * Extra theme_mod ids for Customizer preview `--color-*` postMessage (see color/previewBindings.js).
		 *
		 * @param string[] $out Setting ids.
		 */
		return apply_filters( 'onepress_customize_color_preview_postmessage_setting_ids', $out );
	}
}
