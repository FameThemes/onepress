<?php
/**
 * Customizer-driven front-end inline CSS (batched theme mods + :root CSS variables).
 *
 * Loaded from {@see functions.php} after `inc/template-tags.php` (needs onepress_hex_to_rgba).
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'onepress_custom_inline_style_prefetch_theme_mods' ) ) {
	/**
	 * Load all theme mods used by inline CSS in one defined set of keys (avoids scattered get_theme_mod calls).
	 *
	 * @return array<string, mixed>
	 */
	function onepress_custom_inline_style_prefetch_theme_mods() {
		$keys = array(
			'onepress_logo_height'             => false,
			'onepress_transparent_logo_height' => false,
			'onepress_submenu_width'           => false,
			'onepress_hero_overlay_color'      => '#000000',
			'onepress_hero_overlay_opacity'    => 0.3,
			'onepress_menu_item_padding'     => false,
			'onepress_page_cover_align'      => false,
			'onepress_page_normal_align'     => false,
			'onepress_page_cover_color'      => false,
			'onepress_page_cover_overlay'    => false,
			'onepress_page_cover_pd_top'     => false,
			'onepress_page_cover_pd_bottom'  => false,
			'onepress_g_spacing'             => 20,
			'single_layout_content_width'    => false,
		);

		if ( function_exists( 'onepress_customize_option_color_setting_ids' ) && function_exists( 'onepress_customize_color_control_defaults_map' ) ) {
			$color_defaults = onepress_customize_color_control_defaults_map();
			foreach ( onepress_customize_option_color_setting_ids() as $cid ) {
				if ( array_key_exists( $cid, $keys ) ) {
					continue;
				}
				$keys[ $cid ] = array_key_exists( $cid, $color_defaults ) ? $color_defaults[ $cid ] : false;
			}
		}

		// Typography JSON theme_mods → :root (see onepress_typo_declarations_from_prefetched_mods). Merge full key list so
		// body / H1–H6 / section title, etc. are prefetched — helper auto_apply uses empty css_selector and does not emit rules.
		if ( function_exists( 'onepress_typo_theme_mod_typography_keys' ) ) {
			foreach ( onepress_typo_theme_mod_typography_keys() as $typo_key ) {
				$typo_key = (string) $typo_key;
				if ( '' === $typo_key ) {
					continue;
				}
				if ( ! array_key_exists( $typo_key, $keys ) ) {
					$keys[ $typo_key ] = false;
				}
			}
		}

		$out = array();
		foreach ( $keys as $key => $default ) {
			$out[ $key ] = false === $default ? get_theme_mod( $key ) : get_theme_mod( $key, $default );
		}
		return $out;
	}
}

if ( ! function_exists( 'onepress_custom_inline_style_root_declarations' ) ) {
	/**
	 * Map Customizer theme mods to :root custom properties (consumed in src/frontend/styles).
	 *
	 * Plain `'control' => 'color'` settings are emitted as `--color-*` via
	 * {@see onepress_customize_color_declarations_from_prefetched_mods()} (see inc/customize-color-css-vars.php).
	 * Alpha page cover colors and composite values (e.g. hero overlay) stay explicit here.
	 *
	 * @param array<string, mixed> $m Prefetched theme mods.
	 * @return array<string, string> Property name => value (unescaped CSS).
	 */
	function onepress_custom_inline_style_root_declarations( $m ) {
		if ( ! function_exists( 'onepress_hex_to_rgba' ) || ! function_exists( 'onepress_sanitize_color_alpha' ) ) {
			return array();
		}

		$props = array();

		$hero_bg = onepress_hex_to_rgba( $m['onepress_hero_overlay_color'], 0.3 );
		$hero_bg = onepress_hex_to_rgba( $hero_bg, floatval( $m['onepress_hero_overlay_opacity'] ) );
		if ( '' !== $hero_bg ) {
			$props['--hero-overlay'] = $hero_bg;
		}

		$logo_height = absint( $m['onepress_logo_height'] );
		if ( $logo_height > 0 ) {
			$props['--logo-height'] = $logo_height . 'px';
		}

		$logo_tran = absint( $m['onepress_transparent_logo_height'] );
		if ( $logo_tran > 0 ) {
			$props['--logo-transparent-height'] = $logo_tran . 'px';
		}

		$submenu_w = absint( $m['onepress_submenu_width'] );
		if ( $submenu_w > 0 ) {
			$props['--submenu-max-width'] = $submenu_w . 'px';
		}

		$menu_pad = absint( $m['onepress_menu_item_padding'] );
		if ( $menu_pad > 0 ) {
			$props['--menu-link-padding-x'] = $menu_pad . 'px';
		}

		$cover_align = sanitize_text_field( $m['onepress_page_cover_align'] );
		if ( 'left' === $cover_align || 'right' === $cover_align ) {
			$props['--page-cover-text-align'] = $cover_align;
		}

		$normal_align = sanitize_text_field( $m['onepress_page_normal_align'] );
		if ( '' !== $normal_align && in_array( $normal_align, array( 'left', 'right', 'center' ), true ) ) {
			$props['--page-normal-text-align'] = $normal_align;
		}

		foreach ( array( 'onepress_page_cover_color', 'onepress_page_cover_overlay' ) as $alpha_cover_id ) {
			if ( ! array_key_exists( $alpha_cover_id, $m ) || ! function_exists( 'onepress_theme_mod_id_to_color_css_var' ) ) {
				continue;
			}
			$cover_san = onepress_sanitize_color_alpha( $m[ $alpha_cover_id ] );
			if ( $cover_san ) {
				$props[ onepress_theme_mod_id_to_color_css_var( $alpha_cover_id ) ] = $cover_san;
			}
		}

		$pd_top = absint( $m['onepress_page_cover_pd_top'] );
		if ( $pd_top > 0 ) {
			$props['--page-header-padding-top'] = $pd_top . '%';
		}

		$pd_bottom = absint( $m['onepress_page_cover_pd_bottom'] );
		if ( $pd_bottom > 0 ) {
			$props['--page-header-padding-bottom'] = $pd_bottom . '%';
		}

		$r_bg = '';
		if ( array_key_exists( 'onepress_hcl1_r_bg_color', $m ) ) {
			$r_bg = onepress_sanitize_color_alpha( $m['onepress_hcl1_r_bg_color'] );
		}
		if ( $r_bg ) {
			$props['--morphext-padding']        = '0px 20px';
			$props['--morphext-text-shadow']    = 'none';
			$props['--morphext-border-radius'] = '3px';
		}

		if ( function_exists( 'onepress_customize_color_declarations_from_prefetched_mods' ) ) {
			$props = array_merge( $props, onepress_customize_color_declarations_from_prefetched_mods( $m ) );
		}

		$g_space = absint( $m['onepress_g_spacing'] );
		if ( $g_space > 0 ) {
			$props['--gallery-spacing'] = $g_space . 'px';
		}

		$content_w = absint( $m['single_layout_content_width'] );
		if ( $content_w > 0 ) {
			$props['--single-content-max-width'] = $content_w . 'px';
		}

		if ( function_exists( 'onepress_typo_declarations_from_prefetched_mods' ) ) {
			$props = array_merge( $props, onepress_typo_declarations_from_prefetched_mods( $m ) );
		}

		return $props;
	}
}

if ( ! function_exists( 'onepress_custom_inline_style' ) ) {
	/**
	 * Build custom CSS from Customizer settings (batched theme mods → :root variables).
	 *
	 * @change 1.1.5
	 * @return void|string Void when empty; otherwise CSS string (tags stripped).
	 */
	function onepress_custom_inline_style() {
		$m = onepress_custom_inline_style_prefetch_theme_mods();

		$props = onepress_custom_inline_style_root_declarations( $m );

		$css = '';
		if ( ! empty( $props ) ) {
			$decls = array();
			foreach ( $props as $name => $value ) {
				$decls[] = $name . ':' . $value;
			}
			$css = ':root{' . implode( ';', $decls ) . '}';
		}

		if ( function_exists( 'onepress_typo_responsive_root_declaration_maps_from_prefetched_mods' ) && function_exists( 'onepress_typo_declarations_to_inline_list' ) ) {
			$resp = onepress_typo_responsive_root_declaration_maps_from_prefetched_mods( $m );
			$bps  = apply_filters(
				'onepress_typo_responsive_breakpoints',
				array(
					'tablet' => '991px',
					'mobile' => '767px',
				)
			);
			$tab_bp = isset( $bps['tablet'] ) && is_string( $bps['tablet'] ) && '' !== $bps['tablet'] ? $bps['tablet'] : '991px';
			$mob_bp = isset( $bps['mobile'] ) && is_string( $bps['mobile'] ) && '' !== $bps['mobile'] ? $bps['mobile'] : '767px';
			if ( ! empty( $resp['tablet'] ) ) {
				$inner = onepress_typo_declarations_to_inline_list( $resp['tablet'] );
				if ( '' !== $inner ) {
					$css .= "\n@media (max-width: {$tab_bp}) {\n:root{" . $inner . "}\n}\n";
				}
			}
			if ( ! empty( $resp['mobile'] ) ) {
				$inner = onepress_typo_declarations_to_inline_list( $resp['mobile'] );
				if ( '' !== $inner ) {
					$css .= "\n@media (max-width: {$mob_bp}) {\n:root{" . $inner . "}\n}\n";
				}
			}
		}

		if ( '' === trim( $css ) ) {
			return;
		}

		$css = apply_filters( 'onepress_custom_css', $css );

		if ( ! is_customize_preview() ) {
			$css = preg_replace(
				array(
					'#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')|\/\*(?!\!)(?>.*?\*\/)|^\s*|\s*$#s',
					'#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\'|\/\*(?>.*?\*\/))|\s*+;\s*+(})\s*+|\s*+([*$~^|]?+=|[{};,>~+]|\s*+-(?![0-9\.])|!important\b)\s*+|([[(:])\s++|\s++([])])|\s++(:)\s*+(?!(?>[^{}"\']++|"(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')*+{)|^\s++|\s++\z|(\s)\s+#si',
				),
				array(
					'$1',
					'$1$2$3$4$5$6$7',
				),
				$css
			);
		}

		if ( ! function_exists( 'wp_get_custom_css' ) ) {
			$custom = get_option( 'onepress_custom_css' );
			if ( $custom ) {
				$css .= "\n/* --- Begin custom CSS --- */\n" . $custom . "\n/* --- End custom CSS --- */\n";
			}
		}

		return wp_strip_all_tags( $css );
	}
}
