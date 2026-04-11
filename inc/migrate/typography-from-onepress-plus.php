<?php
/**
 * OnePress Plus → theme typography / Site Colors migration.
 *
 * Canonical theme typography theme mod (dest) vs Plus source — see onepress_migrate_typography_plus_copy_rows().
 * Gated by {@see onepress_migrate_from_onepress_plus_option_name()}; done value {@see onepress_migrate_from_onepress_plus_done_value()}.
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Option name: migration considered complete when value equals {@see onepress_migrate_from_onepress_plus_done_value()}.
 *
 * @return string
 */
function onepress_migrate_from_onepress_plus_option_name() {
	return 'onepress_migrate_from_onepress_plus';
}

/**
 * Stored option value when the migration bundle has finished (bump when adding new Plus→theme rows).
 *
 * @return string
 */
function onepress_migrate_from_onepress_plus_done_value() {
	return '6';
}

/**
 * Plus theme mod keys (Customizer) → theme-only theme mod keys.
 *
 * Source IDs must match `plugins/onepress-plus/inc/typography/auto-apply.php` only.
 * OnePress Plus does not use `onepress_typo_section_*` or `onepress_typo_nav` — those are theme ids.
 *
 * Optional `source_type`: `theme_mod` (default) or `option` — mirrors Plus `helper.php` when reading values.
 *
 * @return array<int, array{dest: string, source: string, color: ?string, source_type?: string}>
 */
function onepress_migrate_typography_plus_copy_rows() {
	return array(
		// Order follows auto-apply.php.
		array(
			'dest'   => 'onepress_typo_paragraphs',
			'source' => 'onepress_typo_p',
			'color'  => 'onepress_typo_paragraphs_color',
		),
		array(
			'dest'   => 'onepress_typo_branding_title',
			'source' => 'onepress_typo_site_title',
			'color'  => 'onepress_typo_branding_title_color',
		),
		array(
			'dest'   => 'onepress_typo_branding_tagline',
			'source' => 'onepress_typo_site_tagline',
			'color'  => 'onepress_typo_branding_tagline_color',
		),
		array(
			'dest'   => 'onepress_typo_nav',
			'source' => 'onepress_typo_menu',
			'color'  => null,
		),
		array(
			'dest'   => 'onepress_typo_hero_heading',
			'source' => 'onepress_hero_heading',
			'color'  => 'onepress_typo_hero_heading_color',
		),
		array(
			'dest'   => 'onepress_typo_heading',
			'source' => 'onepress_typo_heading',
			'color'  => null,
		),
		array(
			'dest'   => 'onepress_typo_slider_slide_title',
			'source' => 'onepress_slider_slide_typo_title',
			'color'  => 'onepress_typo_slider_slide_title_color',
		),
		array(
			'dest'   => 'onepress_typo_slider_slide_content',
			'source' => 'onepress_slider_slide_typo_content',
			'color'  => 'onepress_typo_slider_slide_content_color',
		),
	);
}

/**
 * Promote `color` from typography JSON into Site Colors; optional legacy Plus theme mod fallback.
 *
 * @return array<int, array{typo: string, color: string, legacy: string, source_type: string}>
 */
function onepress_migrate_typography_color_promotion_rows() {
	$rows = array();
	foreach ( onepress_migrate_typography_plus_copy_rows() as $row ) {
		if ( empty( $row['color'] ) ) {
			continue;
		}
		$rows[] = array(
			'typo'         => $row['dest'],
			'color'        => $row['color'],
			'legacy'       => $row['source'],
			'source_type'  => isset( $row['source_type'] ) ? $row['source_type'] : 'theme_mod',
		);
	}
	return $rows;
}

/**
 * Decode a Plus typography value (JSON string or array) to an associative array.
 *
 * @param mixed $stored Raw option / theme mod value.
 * @return array<string, mixed>|null
 */
function onepress_migrate_typography_decode_plus_value( $stored ) {
	if ( false === $stored || null === $stored || '' === $stored ) {
		return null;
	}
	if ( is_array( $stored ) ) {
		return $stored;
	}
	if ( ! is_string( $stored ) ) {
		return null;
	}
	$decoded = json_decode( $stored, true );
	return is_array( $decoded ) ? $decoded : null;
}

/**
 * Read raw typography value the same way as {@see onepress_typography_render_code()} (Plus `inc/typography/helper.php` ~70–76).
 * When `data_type` is `theme_mod`, also tries `get_option( $key )` if the theme mod is empty (legacy / mis-saved data).
 *
 * @param string $key        Setting id (theme mod key or option name).
 * @param string $data_type `theme_mod` or `option`.
 * @return array<string, mixed>|null Decoded array or null if missing / invalid.
 */
function onepress_migrate_typography_read_plus_stored( $key, $data_type = 'theme_mod' ) {
	$key = (string) $key;
	if ( 'option' === $data_type ) {
		return onepress_migrate_typography_decode_plus_value( get_option( $key, false ) );
	}
	$from_mod = onepress_migrate_typography_decode_plus_value( get_theme_mod( $key, false ) );
	if ( null !== $from_mod ) {
		return $from_mod;
	}
	return onepress_migrate_typography_decode_plus_value( get_option( $key, false ) );
}

/**
 * Reduce Plus field value to a scalar for migration (some stores use a one-level object with `name`).
 *
 * @param mixed $v Raw value.
 * @return string|int|float|bool|null Scalar to store, or null to skip.
 */
function onepress_migrate_typography_scalarize_plus_field_value( $v ) {
	if ( is_scalar( $v ) ) {
		return $v;
	}
	if ( is_array( $v ) ) {
		if ( isset( $v['name'] ) && is_scalar( $v['name'] ) ) {
			return $v['name'];
		}
		if ( isset( $v['font-family'] ) && is_scalar( $v['font-family'] ) ) {
			return $v['font-family'];
		}
	}
	return null;
}

/**
 * Encode Plus typography for the destination theme mod: copy every scalar field (hyphen keys), including `color`.
 * Does not use {@see onepress_typo_sanitize_field()} so values like font-size/line-height are not dropped.
 *
 * @param array<string, mixed> $decoded Decoded Plus JSON.
 * @return string|null JSON string or null if nothing to store.
 */
function onepress_migrate_typography_encode_plus_payload_for_dest( array $decoded ) {
	$out = array();
	foreach ( $decoded as $k => $v_raw ) {
		$v = onepress_migrate_typography_scalarize_plus_field_value( $v_raw );
		if ( null === $v ) {
			if ( ! is_scalar( $v_raw ) ) {
				continue;
			}
			$v = $v_raw;
		}
		if ( ! is_scalar( $v ) ) {
			continue;
		}
		$key = str_replace( '_', '-', strtolower( (string) $k ) );
		$s   = is_string( $v ) ? trim( $v ) : (string) $v;
		if ( '' === $s ) {
			continue;
		}
		if ( 'color' === $key && function_exists( 'onepress_sanitize_color_alpha' ) ) {
			$c = onepress_sanitize_color_alpha( $s );
			if ( '' !== $c ) {
				$out[ $key ] = $c;
			}
			continue;
		}
		$out[ $key ] = sanitize_text_field( $s );
	}
	return array() === $out ? null : wp_json_encode( $out );
}

/**
 * Whether a stored typography JSON theme mod is empty.
 *
 * @param mixed $val Raw theme mod.
 * @return bool
 */
function onepress_typo_theme_mod_is_empty( $val ) {
	if ( null === $val || false === $val || '' === $val ) {
		return true;
	}

	$decoded = null;
	if ( is_array( $val ) ) {
		$decoded = $val;
	} elseif ( is_string( $val ) ) {
		$v = trim( $val );
		if ( '' === $v || '[]' === $v || '{}' === $v ) {
			return true;
		}
		$decoded = json_decode( $v, true );
		if ( ! is_array( $decoded ) ) {
			return true;
		}
	} else {
		// Unexpected scalar/object: treat as non-empty so migrate does not clobber dest.
		return false;
	}

	$decoded = array_filter(
		$decoded,
		static function ( $item ) {
			return null !== $item && '' !== $item && false !== $item;
		}
	);
	return array() === $decoded;
}

/**
 * Whether a theme mod key is persisted in the theme_mods option.
 *
 * @param string $key Theme mod name.
 * @return bool
 */
function onepress_typo_theme_mod_is_stored( $key ) {
	$key = (string) $key;
	$mods = get_theme_mods();
	return is_array( $mods ) && array_key_exists( $key, $mods );
}

/**
 * @param array<string, mixed> $arr Typography decoded array.
 * @return string Color value or ''.
 */
function onepress_typo_extract_color_from_typography_array( $arr ) {
	if ( ! is_array( $arr ) ) {
		return '';
	}
	foreach ( $arr as $k => $v ) {
		if ( strtolower( (string) $k ) === 'color' && is_string( $v ) && '' !== trim( $v ) ) {
			return $v;
		}
	}
	return '';
}

/**
 * Copy `color` from typography JSON into the Site Colors mod (overwrites existing).
 * Does not strip `color` from the typography JSON.
 *
 * @param string $typography_mod_key Theme mod holding typography JSON (destination key).
 * @param string $color_mod_key      Target theme mod (alpha color).
 * @return void
 */
function onepress_typo_promote_color_from_typography_theme_mod( $typography_mod_key, $color_mod_key ) {
	if ( ! function_exists( 'onepress_sanitize_color_alpha' ) ) {
		return;
	}

	$raw = get_theme_mod( $typography_mod_key, '' );
	if ( '' === $raw || false === $raw ) {
		return;
	}

	$decoded = is_string( $raw ) ? json_decode( $raw, true ) : $raw;
	if ( ! is_array( $decoded ) ) {
		return;
	}

	$color_val = onepress_typo_extract_color_from_typography_array( $decoded );
	if ( '' !== $color_val ) {
		set_theme_mod( $color_mod_key, onepress_sanitize_color_alpha( $color_val ) );
	}
}

/**
 * Copy Plus typography into theme-only mods: always overwrites each destination mod from Plus source.
 * Removes the dest theme mod key first so the save is a clean replace.
 *
 * Plus source theme mods are not modified or removed.
 *
 * @return void
 */
function onepress_migrate_typography_copy_plus_to_theme_slots() {
	if ( ! apply_filters( 'onepress_migrate_enable_typography_copy_from_plus', true ) ) {
		return;
	}

	foreach ( onepress_migrate_typography_plus_copy_rows() as $row ) {
		$new_key      = $row['dest'];
		$old_key      = $row['source'];
		$color_k      = isset( $row['color'] ) ? $row['color'] : null;
		$source_type  = isset( $row['source_type'] ) ? $row['source_type'] : 'theme_mod';

		$decoded = onepress_migrate_typography_read_plus_stored( $old_key, $source_type );
		if ( null === $decoded ) {
			continue;
		}

		$encoded = onepress_migrate_typography_encode_plus_payload_for_dest( $decoded );
		if ( null === $encoded ) {
			continue;
		}

		if ( onepress_typo_theme_mod_is_stored( $new_key ) ) {
			remove_theme_mod( $new_key );
		}

		if ( $color_k && function_exists( 'onepress_sanitize_color_alpha' ) ) {
			$extracted = onepress_typo_extract_color_from_typography_array( $decoded );
			if ( '' !== $extracted ) {
				if ( onepress_typo_theme_mod_is_stored( $color_k ) ) {
					remove_theme_mod( $color_k );
				}
				set_theme_mod( $color_k, onepress_sanitize_color_alpha( $extracted ) );
			}
		}

		set_theme_mod( $new_key, $encoded );
	}
}

/**
 * Promote `color` from theme typography JSON into Site Colors; fill from legacy Plus keys if needed.
 * Does not remove `color` from typography JSON.
 *
 * Plus JSON theme mods are read for fallback only, not deleted.
 *
 * @return void
 */
function onepress_migrate_typography_promote_colors_to_site_colors() {
	if ( ! function_exists( 'onepress_sanitize_color_alpha' ) ) {
		return;
	}

	foreach ( onepress_migrate_typography_color_promotion_rows() as $row ) {
		onepress_typo_promote_color_from_typography_theme_mod( $row['typo'], $row['color'] );
		$legacy_decoded = onepress_migrate_typography_read_plus_stored( $row['legacy'], $row['source_type'] );
		$legacy         = onepress_typo_extract_color_from_typography_array( is_array( $legacy_decoded ) ? $legacy_decoded : array() );
		if ( '' !== $legacy && function_exists( 'onepress_sanitize_color_alpha' ) ) {
			if ( onepress_typo_theme_mod_is_stored( $row['color'] ) ) {
				remove_theme_mod( $row['color'] );
			}
			set_theme_mod( $row['color'], onepress_sanitize_color_alpha( $legacy ) );
		}
	}
}

/**
 * One-shot: promote colors into Site Colors + set {@see onepress_migrate_from_onepress_plus_option_name()}.
 * Plus→theme typography copy runs separately every request (see bootstrap.php).
 *
 * @return void
 */
function onepress_migrate_maybe_run_from_onepress_plus() {
	$opt  = onepress_migrate_from_onepress_plus_option_name();
	$done = onepress_migrate_from_onepress_plus_done_value();
	if ( $done === get_option( $opt, '' ) ) {
		return;
	}
	if ( ! apply_filters( 'onepress_migrate_enable_from_onepress_plus', true ) ) {
		return;
	}

	onepress_migrate_typography_promote_colors_to_site_colors();

	update_option( $opt, $done, false );
}
