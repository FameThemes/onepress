<?php
/**
 * Shared helpers for `Onepress_Customize_Styling_Control` registry rows (typography, buttons, …).
 *
 * Config arrays live in `inc/registry/*.php` (`*_controls_config()` only). This file: collect theme_mod ids,
 * base_selector maps, and control args by setting id. Add sources via `onepress_styling_registry_styling_control_config_sources`.
 *
 * @package OnePress
 */

if ( ! function_exists( 'onepress_styling_registry_collect_theme_mod_ids_from_rows' ) ) {
	/**
	 * @param array<int, array<string, mixed>> $rows Registry rows with string `id`.
	 * @return list<string>
	 */
	function onepress_styling_registry_collect_theme_mod_ids_from_rows( array $rows ) {
		$ids = array();
		foreach ( $rows as $row ) {
			if ( empty( $row['id'] ) || ! is_string( $row['id'] ) ) {
				continue;
			}
			$k = sanitize_key( $row['id'] );
			if ( $k !== '' ) {
				$ids[] = $k;
			}
		}
		return array_values( array_unique( $ids, SORT_STRING ) );
	}
}

if ( ! function_exists( 'onepress_styling_registry_collect_base_selector_map_from_rows' ) ) {
	/**
	 * @param array<int, array<string, mixed>> $rows Registry rows with `control.base_selector`.
	 * @return array<string, string> Sanitized theme_mod id => base selector.
	 */
	function onepress_styling_registry_collect_base_selector_map_from_rows( array $rows ) {
		$map = array();
		foreach ( $rows as $row ) {
			$sid = isset( $row['id'] ) ? sanitize_key( (string) $row['id'] ) : '';
			if ( $sid === '' ) {
				continue;
			}
			$ctrl = isset( $row['control'] ) && is_array( $row['control'] ) ? $row['control'] : array();
			if ( empty( $ctrl['base_selector'] ) || ! is_string( $ctrl['base_selector'] ) ) {
				continue;
			}
			$sel = onepress_styling_sanitize_selector( $ctrl['base_selector'] );
			if ( $sel !== '' ) {
				$map[ $sid ] = $sel;
			}
		}
		return $map;
	}
}

if ( ! function_exists( 'onepress_styling_registry_find_control_in_rows' ) ) {
	/**
	 * @param array<int, array<string, mixed>> $rows Registry rows.
	 * @param string                             $setting_id theme_mod / control id.
	 * @return array<string, mixed>|null Control args or null.
	 */
	function onepress_styling_registry_find_control_in_rows( array $rows, $setting_id ) {
		$want = sanitize_key( (string) $setting_id );
		if ( $want === '' ) {
			return null;
		}
		foreach ( $rows as $row ) {
			$rid = isset( $row['id'] ) ? sanitize_key( (string) $row['id'] ) : '';
			if ( $rid !== $want ) {
				continue;
			}
			return isset( $row['control'] ) && is_array( $row['control'] ) ? $row['control'] : null;
		}
		return null;
	}
}

if ( ! function_exists( 'onepress_styling_registry_styling_control_config_sources' ) ) {
	/**
	 * Ordered callables returning registry row arrays. Used for control lookup (first match wins).
	 *
	 * @return list<callable(): array<int, array<string, mixed>>>
	 */
	function onepress_styling_registry_styling_control_config_sources() {
		$sources = array(
			'onepress_styling_typography_controls_config',
			'onepress_styling_button_controls_config',
		);

		/**
		 * Callables that return styling control registry rows (`id`, `setting`, `control`).
		 * Each must be a function name or invokable returning the same shape as `onepress_styling_typography_controls_config()`.
		 *
		 * @param list<callable|callable-string> $sources
		 */
		return apply_filters( 'onepress_styling_registry_styling_control_config_sources', $sources );
	}
}

if ( ! function_exists( 'onepress_styling_typography_theme_mod_ids' ) ) {
	/**
	 * Theme mod ids from typography registry rows (CSS output, Google Fonts merge, preview JS).
	 *
	 * @return list<string>
	 */
	function onepress_styling_typography_theme_mod_ids() {
		$ids = onepress_styling_registry_collect_theme_mod_ids_from_rows( onepress_styling_typography_controls_config() );

		/**
		 * Typography styling theme_mod ids.
		 *
		 * @param list<string> $ids
		 */
		return apply_filters( 'onepress_styling_typography_theme_mod_ids', $ids );
	}
}

if ( ! function_exists( 'onepress_styling_button_theme_mod_ids' ) ) {
	/**
	 * Theme mod ids from button registry rows.
	 *
	 * @return list<string>
	 */
	function onepress_styling_button_theme_mod_ids() {
		$ids = onepress_styling_registry_collect_theme_mod_ids_from_rows( onepress_styling_button_controls_config() );

		/**
		 * Button styling theme_mod ids.
		 *
		 * @param list<string> $ids
		 */
		return apply_filters( 'onepress_styling_button_theme_mod_ids', $ids );
	}
}

if ( ! function_exists( 'onepress_styling_registry_base_selector_map' ) ) {
	/**
	 * theme_mod id → base_selector from typography registry only. Filter preserved for backward compatibility.
	 *
	 * @return array<string, string>
	 */
	function onepress_styling_registry_base_selector_map() {
		$map = onepress_styling_registry_collect_base_selector_map_from_rows( onepress_styling_typography_controls_config() );

		/**
		 * Typography registry base selectors (sanitized).
		 *
		 * @param array<string, string> $map
		 */
		return apply_filters( 'onepress_styling_registry_base_selector_map', $map );
	}
}

if ( ! function_exists( 'onepress_styling_button_registry_base_selector_map' ) ) {
	/**
	 * theme_mod id → base_selector from button registry only.
	 *
	 * @return array<string, string>
	 */
	function onepress_styling_button_registry_base_selector_map() {
		$map = onepress_styling_registry_collect_base_selector_map_from_rows( onepress_styling_button_controls_config() );

		/**
		 * Button registry base selectors (sanitized).
		 *
		 * @param array<string, string> $map
		 */
		return apply_filters( 'onepress_styling_button_registry_base_selector_map', $map );
	}
}

if ( ! function_exists( 'onepress_styling_registry_merged_base_selector_map' ) ) {
	/**
	 * Merged base_selector maps (typography then button; later keys override if duplicated).
	 *
	 * @return array<string, string>
	 */
	function onepress_styling_registry_merged_base_selector_map() {
		return array_merge(
			onepress_styling_registry_base_selector_map(),
			onepress_styling_button_registry_base_selector_map()
		);
	}
}

if ( ! function_exists( 'onepress_styling_registry_control_for_setting_id' ) ) {
	/**
	 * Control args for a theme_mod id across all registry sources (typography, then buttons, then filter-added sources).
	 *
	 * @param string $setting_id theme_mod / control id.
	 * @return array<string, mixed>|null
	 */
	function onepress_styling_registry_control_for_setting_id( $setting_id ) {
		foreach ( onepress_styling_registry_styling_control_config_sources() as $source ) {
			if ( ! is_callable( $source ) ) {
				continue;
			}
			$rows = call_user_func( $source );
			if ( ! is_array( $rows ) ) {
				continue;
			}
			$found = onepress_styling_registry_find_control_in_rows( $rows, $setting_id );
			if ( null !== $found ) {
				return $found;
			}
		}
		return null;
	}
}
