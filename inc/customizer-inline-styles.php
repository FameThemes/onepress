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
			'onepress_logo_height'                  => false,
			'onepress_transparent_logo_height'        => false,
			'onepress_submenu_width'                => false,
			'onepress_hero_overlay_color'           => '#000000',
			'onepress_hero_overlay_opacity'         => 0.3,
			'onepress_transparent_site_title_c'     => false,
			'onepress_transparent_tag_title_c'      => false,
			'onepress_primary_color'                => false,
			'onepress_secondary_color'              => false,
			'onepress_menu_item_padding'            => false,
			'onepress_page_cover_align'             => false,
			'onepress_page_normal_align'            => false,
			'onepress_page_cover_color'             => false,
			'onepress_typo_paragraphs_color'        => false,
			'onepress_typo_hero_heading_color'      => false,
			'onepress_typo_branding_title_color'    => false,
			'onepress_typo_branding_tagline_color'  => false,
			'onepress_typo_slider_slide_title_color' => false,
			'onepress_typo_slider_slide_content_color' => false,
			'onepress_page_cover_overlay'          => false,
			'onepress_page_cover_pd_top'            => false,
			'onepress_page_cover_pd_bottom'         => false,
			'onepress_header_bg_color'              => false,
			'onepress_menu_color'                   => false,
			'onepress_menu_hover_color'             => false,
			'onepress_menu_hover_bg_color'          => false,
			'onepress_menu_toggle_button_color'     => false,
			'onepress_logo_text_color'              => false,
			'onepress_tagline_text_color'           => false,
			'onepress_hcl1_r_color'                 => false,
			'onepress_hcl1_r_bg_color'             => false,
			'onepress_footer_bg'                    => false,
			'onepress_footer_top_color'             => false,
			'onepress_footer_info_bg'               => false,
			'onepress_footer_c_color'               => false,
			'onepress_footer_c_link_color'          => false,
			'onepress_footer_c_link_hover_color'    => false,
			'footer_widgets_color'                  => false,
			'footer_widgets_bg_color'               => false,
			'footer_widgets_title_color'            => false,
			'footer_widgets_link_color'             => false,
			'footer_widgets_link_hover_color'       => false,
			'onepress_g_spacing'                    => 20,
			'single_layout_content_width'           => false,
		);
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

		$t_title = sanitize_hex_color( $m['onepress_transparent_site_title_c'] );
		if ( $t_title ) {
			$props['--transparent-header-title'] = $t_title;
		}

		$t_tag = sanitize_hex_color( $m['onepress_transparent_tag_title_c'] );
		if ( $t_tag ) {
			$props['--transparent-header-tagline'] = $t_tag;
		}

		$primary = sanitize_hex_color_no_hash( $m['onepress_primary_color'] );
		if ( '' !== $primary ) {
			$props['--color-primary'] = '#' . $primary;
		}

		$secondary = sanitize_hex_color_no_hash( $m['onepress_secondary_color'] );
		if ( '' !== $secondary ) {
			$props['--feature-icon-hover-color'] = '#' . $secondary;
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

		$cover_title = onepress_sanitize_color_alpha( $m['onepress_page_cover_color'] );
		if ( $cover_title ) {
			$props['--page-header-title-color'] = $cover_title;
		}

		$typo_body = onepress_sanitize_color_alpha( $m['onepress_typo_paragraphs_color'] );
		if ( $typo_body ) {
			$props['--typo-body-color'] = $typo_body;
		}

		$typo_hero = onepress_sanitize_color_alpha( $m['onepress_typo_hero_heading_color'] );
		if ( $typo_hero ) {
			$props['--typo-hero-heading-color'] = $typo_hero;
		}

		$brand_title = onepress_sanitize_color_alpha( $m['onepress_typo_branding_title_color'] );
		if ( ! $brand_title ) {
			$lt = sanitize_hex_color_no_hash( $m['onepress_logo_text_color'] );
			if ( '' !== $lt ) {
				$brand_title = '#' . $lt;
			}
		}
		if ( $brand_title ) {
			$props['--branding-title-color'] = $brand_title;
		}

		$brand_tag = onepress_sanitize_color_alpha( $m['onepress_typo_branding_tagline_color'] );
		if ( ! $brand_tag ) {
			$tg = sanitize_hex_color_no_hash( $m['onepress_tagline_text_color'] );
			if ( '' !== $tg ) {
				$brand_tag = '#' . $tg;
			}
		}
		if ( $brand_tag ) {
			$props['--branding-tagline-color'] = $brand_tag;
		}

		$slider_title = onepress_sanitize_color_alpha( $m['onepress_typo_slider_slide_title_color'] );
		if ( $slider_title ) {
			$props['--typo-slider-title-color'] = $slider_title;
		}

		$slider_desc = onepress_sanitize_color_alpha( $m['onepress_typo_slider_slide_content_color'] );
		if ( $slider_desc ) {
			$props['--typo-slider-desc-color'] = $slider_desc;
		}

		$cover_overlay = onepress_sanitize_color_alpha( $m['onepress_page_cover_overlay'] );
		if ( $cover_overlay ) {
			$props['--page-header-overlay-bg'] = $cover_overlay;
		}

		$pd_top = absint( $m['onepress_page_cover_pd_top'] );
		if ( $pd_top > 0 ) {
			$props['--page-header-padding-top'] = $pd_top . '%';
		}

		$pd_bottom = absint( $m['onepress_page_cover_pd_bottom'] );
		if ( $pd_bottom > 0 ) {
			$props['--page-header-padding-bottom'] = $pd_bottom . '%';
		}

		$header_bg = sanitize_hex_color_no_hash( $m['onepress_header_bg_color'] );
		if ( $header_bg ) {
			$props['--header-bg'] = '#' . $header_bg;
		}

		$menu_link = sanitize_hex_color_no_hash( $m['onepress_menu_color'] );
		if ( $menu_link ) {
			$props['--menu-link-color'] = '#' . $menu_link;
		}

		$menu_hover = sanitize_hex_color_no_hash( $m['onepress_menu_hover_color'] );
		if ( $menu_hover ) {
			$props['--menu-hover-color'] = '#' . $menu_hover;
		}

		$menu_hover_bg = sanitize_hex_color_no_hash( $m['onepress_menu_hover_bg_color'] );
		if ( $menu_hover_bg ) {
			$props['--menu-hover-bg'] = '#' . $menu_hover_bg;
		}

		$toggle = sanitize_hex_color_no_hash( $m['onepress_menu_toggle_button_color'] );
		if ( $toggle ) {
			$props['--nav-toggle-bg'] = '#' . $toggle;
		}

		$r_text = sanitize_hex_color( $m['onepress_hcl1_r_color'] );
		if ( $r_text ) {
			$props['--morphext-color'] = $r_text;
		}

		$r_bg = sanitize_hex_color( $m['onepress_hcl1_r_bg_color'] );
		if ( $r_bg ) {
			$props['--morphext-bg']             = $r_bg;
			$props['--morphext-padding']        = '0px 20px';
			$props['--morphext-text-shadow']    = 'none';
			$props['--morphext-border-radius'] = '3px';
		}

		$footer_bg = sanitize_hex_color_no_hash( $m['onepress_footer_bg'] );
		if ( $footer_bg ) {
			$props['--footer-bg'] = '#' . $footer_bg;
		}

		$footer_top = sanitize_hex_color( $m['onepress_footer_top_color'] );
		if ( $footer_top ) {
			$props['--footer-top-text'] = $footer_top;
		} elseif ( $footer_bg ) {
			$props['--footer-top-text'] = 'rgba(255, 255, 255, 0.9)';
		}

		$footer_info_bg = sanitize_hex_color_no_hash( $m['onepress_footer_info_bg'] );
		$c_color        = sanitize_hex_color( $m['onepress_footer_c_color'] );
		$c_link         = sanitize_hex_color( $m['onepress_footer_c_link_color'] );
		$c_link_hover   = sanitize_hex_color( $m['onepress_footer_c_link_hover_color'] );

		if ( $footer_info_bg ) {
			$props['--footer-site-info-bg'] = '#' . $footer_info_bg;
			if ( $c_color ) {
				$props['--footer-site-info-text'] = $c_color;
				$props['--footer-site-info-link'] = $c_color;
			} else {
				$props['--footer-site-info-text'] = 'rgba(255, 255, 255, 0.7)';
				$props['--footer-site-info-link'] = 'rgba(255, 255, 255, 0.9)';
			}
		} elseif ( $c_color ) {
			$props['--footer-site-info-text'] = $c_color;
		}

		if ( $c_link ) {
			$props['--footer-site-info-link'] = $c_link;
		}

		if ( $c_link_hover ) {
			$props['--footer-site-info-link-hover'] = $c_link_hover;
		}

		$fw_color = sanitize_hex_color( $m['footer_widgets_color'] );
		if ( $fw_color ) {
			$props['--footer-widgets-color'] = $fw_color;
		}

		$fw_bg = sanitize_hex_color( $m['footer_widgets_bg_color'] );
		if ( $fw_bg ) {
			$props['--footer-widgets-bg'] = $fw_bg;
		}

		$fw_title = sanitize_hex_color( $m['footer_widgets_title_color'] );
		if ( $fw_title ) {
			$props['--footer-widgets-title-color'] = $fw_title;
		}

		$fw_link = sanitize_hex_color( $m['footer_widgets_link_color'] );
		if ( $fw_link ) {
			$props['--footer-widgets-link-color'] = $fw_link;
		}

		$fw_link_h = sanitize_hex_color( $m['footer_widgets_link_hover_color'] );
		if ( $fw_link_h ) {
			$props['--footer-widgets-link-hover-color'] = $fw_link_h;
		}

		$g_space = absint( $m['onepress_g_spacing'] );
		if ( $g_space > 0 ) {
			$props['--gallery-spacing'] = $g_space . 'px';
		}

		$content_w = absint( $m['single_layout_content_width'] );
		if ( $content_w > 0 ) {
			$props['--single-content-max-width'] = $content_w . 'px';
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
