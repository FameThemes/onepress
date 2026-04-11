<?php
/**
 * Typography theme mods → :root CSS custom properties (front + Customizer batch + editor).
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'onepress_typo_setting_id_to_slug' ) ) {
	/**
	 * Normalize a setting id (or fragment) to a kebab segment used in CSS custom property names.
	 * 1) Strip leading `onepress_` if present. 2) Replace `_` with `-`.
	 * Example: onepress_typo_branding_tagline → typo-branding-tagline (vars: --typo-branding-tagline, --typo-branding-tagline-font-family, …).
	 *
	 * @param string $setting_id e.g. onepress_typo_branding_title or typo_branding_title.
	 * @return string e.g. typo-branding-title.
	 */
	function onepress_typo_setting_id_to_slug( $setting_id ) {
		if ( ! is_string( $setting_id ) || '' === $setting_id ) {
			return '';
		}
		$s = $setting_id;
		if ( 0 === strpos( $s, 'onepress_' ) ) {
			$s = substr( $s, strlen( 'onepress_' ) );
		}
		return str_replace( '_', '-', $s );
	}

	/**
	 * CSS custom property name for typography JSON "color" (same normalization as slug: --{segment}).
	 *
	 * @param string $key Setting id (onepress_typo_*) or already-normalized kebab segment.
	 * @return string e.g. --typo-branding-tagline.
	 */
	function onepress_typo_json_color_property_name( $key ) {
		$slug = onepress_typo_setting_id_to_slug( $key );
		if ( '' === $slug ) {
			return '';
		}
		return '--' . $slug;
	}

	/**
	 * Font-size handling aligned with onepress_typo_css_block(): px-like values → rem; unit suffixes kept as-is.
	 *
	 * @param string $value Raw font-size from JSON.
	 * @param int    $base_px Root px (filter onepress_typo_css_base_px).
	 * @return string
	 */
	function onepress_typo_css_var_font_size_value( $value, $base_px ) {
		$value = trim( (string) $value );
		if ( '' === $value ) {
			return '';
		}
		if ( preg_match( '/(%|em|rem|ch|ex|vh|vw)$/i', $value ) ) {
			return sanitize_text_field( $value );
		}
		$n = (int) intval( $value, 10 );
		if ( $n <= 0 ) {
			return '';
		}
		return ( $n / max( 1, (int) $base_px ) ) . 'rem';
	}

	/**
	 * Typography JSON → custom properties split by cascade layer.
	 * Tablet/mobile reuse the same names as desktop (e.g. --x-font-size) inside @media, not --x-font-size-tablet.
	 *
	 * @param array  $data Decoded JSON (hyphen keys).
	 * @param string $slug Kebab-case slug.
	 * @return array{root: array<string, string>, tablet: array<string, string>, mobile: array<string, string>}
	 */
	function onepress_typo_flat_to_var_declaration_layers( array $data, $slug ) {
		$root   = array();
		$tablet = array();
		$mobile = array();
		if ( '' === $slug || ! function_exists( 'onepress_sanitize_color_alpha' ) ) {
			return array(
				'root'   => $root,
				'tablet' => $tablet,
				'mobile' => $mobile,
			);
		}

		$base_px = (int) apply_filters( 'onepress_typo_css_base_px', 16 );
		$prefix  = '--' . $slug . '-';

		if ( ! empty( $data['font-family'] ) ) {
			$fam = trim( $data['font-family'] );
			if ( '' !== $fam ) {
				$root[ $prefix . 'font-family' ] = '"' . esc_attr( $fam ) . '"';
			}
		}

		if ( ! empty( $data['font-weight'] ) ) {
			$root[ $prefix . 'font-weight' ] = sanitize_text_field( $data['font-weight'] );
		}

		if ( ! empty( $data['font-style'] ) && 'normal' !== $data['font-style'] ) {
			$root[ $prefix . 'font-style' ] = sanitize_text_field( $data['font-style'] );
		}

		foreach (
			array(
				array(
					'layer'    => 'root',
					'json_key' => 'font-size',
				),
				array(
					'layer'    => 'tablet',
					'json_key' => 'font-size-tablet',
				),
				array(
					'layer'    => 'mobile',
					'json_key' => 'font-size-mobile',
				),
			) as $fs
		) {
			if ( empty( $data[ $fs['json_key'] ] ) ) {
				continue;
			}
			$v = onepress_typo_css_var_font_size_value( $data[ $fs['json_key'] ], $base_px );
			if ( '' === $v ) {
				continue;
			}
			$name = $prefix . 'font-size';
			if ( 'root' === $fs['layer'] ) {
				$root[ $name ] = $v;
			} elseif ( 'tablet' === $fs['layer'] ) {
				$tablet[ $name ] = $v;
			} else {
				$mobile[ $name ] = $v;
			}
		}

		foreach (
			array(
				array(
					'prop'       => 'line-height',
					'tablet_key' => 'line-height-tablet',
					'mobile_key' => 'line-height-mobile',
				),
				array(
					'prop'       => 'letter-spacing',
					'tablet_key' => 'letter-spacing-tablet',
					'mobile_key' => 'letter-spacing-mobile',
				),
			) as $sp
		) {
			$pn = $prefix . $sp['prop'];
			if ( ! empty( $data[ $sp['prop'] ] ) ) {
				$root[ $pn ] = sanitize_text_field( $data[ $sp['prop'] ] );
			}
			if ( ! empty( $data[ $sp['tablet_key'] ] ) ) {
				$tablet[ $pn ] = sanitize_text_field( $data[ $sp['tablet_key'] ] );
			}
			if ( ! empty( $data[ $sp['mobile_key'] ] ) ) {
				$mobile[ $pn ] = sanitize_text_field( $data[ $sp['mobile_key'] ] );
			}
		}

		foreach ( array( 'text-decoration', 'text-transform' ) as $tk ) {
			if ( ! empty( $data[ $tk ] ) ) {
				$root[ $prefix . $tk ] = sanitize_text_field( $data[ $tk ] );
			}
		}

		if ( ! empty( $data['color'] ) ) {
			$c = onepress_sanitize_color_alpha( $data['color'] );
			if ( $c ) {
				$root[ onepress_typo_json_color_property_name( $slug ) ] = $c;
			}
		}

		return array(
			'root'   => $root,
			'tablet' => $tablet,
			'mobile' => $mobile,
		);
	}

	/**
	 * Desktop-only declarations (merged into main :root batch). Responsive values use @media in inline CSS.
	 *
	 * @param array  $data Decoded JSON.
	 * @param string $slug Kebab-case slug.
	 * @return array<string, string>
	 */
	function onepress_typo_flat_to_var_declaration_map( array $data, $slug ) {
		$layers = onepress_typo_flat_to_var_declaration_layers( $data, $slug );
		return $layers['root'];
	}

	/**
	 * @param array<string, mixed> $m Prefetched theme mods (must include JSON typo keys).
	 * @return array<string, string>
	 */
	function onepress_typo_declarations_from_prefetched_mods( array $m ) {
		$decl = array();
		foreach ( onepress_typo_theme_mod_typography_keys() as $key ) {
			if ( ! isset( $m[ $key ] ) ) {
				continue;
			}
			$raw = $m[ $key ];
			if ( ! is_string( $raw ) || '' === trim( $raw ) ) {
				continue;
			}
			$data = json_decode( $raw, true );
			if ( ! is_array( $data ) ) {
				continue;
			}
			$data = array_filter( $data );
			if ( empty( $data ) ) {
				continue;
			}
			$slug = onepress_typo_setting_id_to_slug( $key );
			if ( '' === $slug ) {
				continue;
			}
			$decl = array_merge( $decl, onepress_typo_flat_to_var_declaration_map( $data, $slug ) );
		}
		return $decl;
	}

	/**
	 * Tablet/mobile overrides: same custom property names as desktop, for wrapping in @media (max-width: …) { :root { … } }.
	 *
	 * @param array<string, mixed> $m Prefetched theme mods.
	 * @return array{tablet: array<string, string>, mobile: array<string, string>}
	 */
	function onepress_typo_responsive_root_declaration_maps_from_prefetched_mods( array $m ) {
		$tablet = array();
		$mobile = array();
		foreach ( onepress_typo_theme_mod_typography_keys() as $key ) {
			if ( ! isset( $m[ $key ] ) ) {
				continue;
			}
			$raw = $m[ $key ];
			if ( ! is_string( $raw ) || '' === trim( $raw ) ) {
				continue;
			}
			$data = json_decode( $raw, true );
			if ( ! is_array( $data ) ) {
				continue;
			}
			$data = array_filter( $data );
			if ( empty( $data ) ) {
				continue;
			}
			$slug = onepress_typo_setting_id_to_slug( $key );
			if ( '' === $slug ) {
				continue;
			}
			$layers         = onepress_typo_flat_to_var_declaration_layers( $data, $slug );
			$tablet         = array_merge( $tablet, $layers['tablet'] );
			$mobile         = array_merge( $mobile, $layers['mobile'] );
		}
		return array(
			'tablet' => $tablet,
			'mobile' => $mobile,
		);
	}

	/**
	 * @param array<string, string> $decl Property => value.
	 * @return string Semicolon-separated declarations (no wrapping braces).
	 */
	function onepress_typo_declarations_to_inline_list( array $decl ) {
		if ( empty( $decl ) ) {
			return '';
		}
		$parts = array();
		foreach ( $decl as $name => $value ) {
			$parts[] = $name . ':' . $value;
		}
		return implode( ';', $parts );
	}

	/**
	 * Inline CSS block for editor: same vars as :root on the front, scoped to the block editor wrapper.
	 *
	 * @param array<string, array<string, mixed>> $save_data Setting key => flat typography array.
	 * @param array<string, mixed>              $auto_apply onepress_typo_auto_apply global shape.
	 * @return string
	 */
	function onepress_typo_editor_css_vars_block( array $save_data, array $auto_apply ) {
		$root_m   = array();
		$tablet_m = array();
		$mobile_m = array();
		foreach ( $auto_apply as $k => $settings ) {
			$data = isset( $save_data[ $k ] ) ? $save_data[ $k ] : null;
			if ( ! is_array( $data ) ) {
				continue;
			}
			$slug = onepress_typo_setting_id_to_slug( $k );
			if ( '' === $slug ) {
				continue;
			}
			$layers   = onepress_typo_flat_to_var_declaration_layers( $data, $slug );
			$root_m   = array_merge( $root_m, $layers['root'] );
			$tablet_m = array_merge( $tablet_m, $layers['tablet'] );
			$mobile_m = array_merge( $mobile_m, $layers['mobile'] );
		}
		if ( empty( $root_m ) && empty( $tablet_m ) && empty( $mobile_m ) ) {
			return '';
		}

		$bps = apply_filters(
			'onepress_typo_responsive_breakpoints',
			array(
				'tablet' => '991px',
				'mobile' => '767px',
			)
		);
		$tab_bp = isset( $bps['tablet'] ) && is_string( $bps['tablet'] ) && '' !== $bps['tablet'] ? $bps['tablet'] : '991px';
		$mob_bp = isset( $bps['mobile'] ) && is_string( $bps['mobile'] ) && '' !== $bps['mobile'] ? $bps['mobile'] : '767px';

		$sel = ".editor-styles-wrapper,\n.edit-post-visual-editor.editor-styles-wrapper";
		$css = '';

		if ( ! empty( $root_m ) ) {
			$lines = '';
			foreach ( $root_m as $prop => $val ) {
				$lines .= "\t{$prop}: {$val};\n";
			}
			$css .= "{$sel} {\n{$lines}}\n";
		}

		if ( ! empty( $tablet_m ) ) {
			$lines = '';
			foreach ( $tablet_m as $prop => $val ) {
				$lines .= "\t{$prop}: {$val};\n";
			}
			$css .= "@media (max-width: {$tab_bp}) {\n{$sel} {\n{$lines}}\n}\n";
		}

		if ( ! empty( $mobile_m ) ) {
			$lines = '';
			foreach ( $mobile_m as $prop => $val ) {
				$lines .= "\t{$prop}: {$val};\n";
			}
			$css .= "@media (max-width: {$mob_bp}) {\n{$sel} {\n{$lines}}\n}\n";
		}

		return $css;
	}

	/**
	 * Block editor: apply :root-equivalent vars to real nodes (vars are defined on .editor-styles-wrapper above).
	 *
	 * @return string
	 */
	function onepress_typo_editor_typography_consumer_css() {
		$w = '.edit-post-visual-editor.editor-styles-wrapper';

		$headings = "{$w} .editor-post-title__input,\n{$w} h1,\n{$w} h2,\n{$w} h3,\n{$w} h4,\n{$w} h5,\n{$w} h6";

		$css  = "{$headings} {\n";
		$css .= "\tfont-family: var(--typo-headings-font-family, inherit);\n";
		$css .= "\tfont-weight: var(--typo-headings-font-weight, 600);\n";
		$css .= "\tfont-style: var(--typo-headings-font-style, normal);\n";
		$css .= "\tfont-size: var(--typo-headings-font-size, inherit);\n";
		$css .= "\tline-height: var(--typo-headings-line-height, inherit);\n";
		$css .= "\tletter-spacing: var(--typo-headings-letter-spacing, inherit);\n";
		$css .= "\ttext-decoration: var(--typo-headings-text-decoration, none);\n";
		$css .= "\ttext-transform: var(--typo-headings-text-transform, none);\n";
		$css .= "\tcolor: var(--typo-headings, inherit);\n";
		$css .= "}\n";

		$css .= "{$w} {\n";
		$css .= "\tfont-family: var(--typo-paragraphs-font-family, inherit);\n";
		$css .= "\tfont-weight: var(--typo-paragraphs-font-weight);\n";
		$css .= "\tfont-style: var(--typo-paragraphs-font-style, normal);\n";
		$css .= "\tfont-size: var(--typo-paragraphs-font-size, inherit);\n";
		$css .= "\tline-height: var(--typo-paragraphs-line-height, inherit);\n";
		$css .= "\tletter-spacing: var(--typo-paragraphs-letter-spacing, inherit);\n";
		$css .= "\ttext-decoration: var(--typo-paragraphs-text-decoration, none);\n";
		$css .= "\ttext-transform: var(--typo-paragraphs-text-transform, none);\n";
		$css .= "\tcolor: var(--typo-paragraphs, inherit);\n";
		$css .= "}\n";

		return $css;
	}
}
