<?php

/**
 *  OnePress Sanitize Functions.
 */

if (!function_exists('onepress_sanitize_checkbox')) {
	function onepress_sanitize_checkbox($input)
	{
		if ($input == 1) {
			return 1;
		} else {
			return 0;
		}
	}
}

/**
 * Sanitize CSS code
 *
 * @param $string
 * @return string
 */
function onepress_sanitize_css($string)
{
	$string = preg_replace('@<(script|style)[^>]*?>.*?</\\1>@si', '', $string);
	$string = wp_strip_all_tags($string);
	return trim($string);
}


/**
 * Whether a string contains patterns disallowed inside a single CSS <color> value (XSS / injection).
 *
 * @param string $color Color candidate.
 * @return bool
 */
function onepress_css_color_has_injection($color)
{
	if ($color === '') {
		return false;
	}
	if (preg_match('/[\x00-\x1F\x7F]/', $color)) {
		return true;
	}
	if (preg_match('/[<>"\'\\\\]|\/\*|\*\/|!important|@import|expression\s*\(|url\s*\(|javascript\s*:/i', $color)) {
		return true;
	}
	if (strpos($color, ';') !== false || strpos($color, '!') !== false) {
		return true;
	}
	return false;
}

/**
 * Root functions allowed for CSS <color> (Level 4+), plus safe var().
 *
 * @return array<string, true>
 */
function onepress_css_color_allowed_functions_map()
{
	static $map = null;

	if ($map === null) {
		$funcs = array(
			'rgb',
			'rgba',
			'hsl',
			'hsla',
			'hwb',
			'lab',
			'lch',
			'oklab',
			'oklch',
			'color',
			'device-cmyk',
			'color-mix',
			'light-dark',
			'gray',
		);
		$map = array_fill_keys($funcs, true);
	}

	return $map;
}

/**
 * Sanitize a CSS <color> value: supports hex, transparent/currentColor, rgb/hsl/hwb/lab/lch/oklab/oklch/color/device-cmyk,
 * color-mix, light-dark, gray(), and var(--custom-property). Named colors (e.g. red, aliceblue) are not accepted.
 *
 * @param mixed  $color Raw input.
 * @param int    $depth Internal recursion guard (e.g. var() fallbacks).
 * @return string Safe color or empty string if invalid.
 */
function onepress_sanitize_css_color($color, $depth = 0)
{
	$color = is_string($color) ? trim($color) : '';
	if ($color === '') {
		return '';
	}

	if ($depth > 5) {
		return '';
	}

	if (strlen($color) > 512) {
		return '';
	}

	if (onepress_css_color_has_injection($color)) {
		return '';
	}

	$lower = strtolower($color);
	if ('transparent' === $lower) {
		return 'transparent';
	}
	if ('currentcolor' === $lower) {
		return 'currentColor';
	}

	if (preg_match('/^var\(\s*--[a-zA-Z0-9_-]+\s*\)$/', $color)) {
		return $color;
	}

	if (preg_match('/^var\(\s*(--[a-zA-Z0-9_-]+)\s*,\s*(.+)\)$/s', $color, $vm)) {
		$fallback = onepress_sanitize_css_color(trim($vm[2]), $depth + 1);
		if ('' === $fallback) {
			return '';
		}
		return 'var(' . $vm[1] . ', ' . $fallback . ')';
	}

	if (preg_match('/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/', $color)) {
		return $color;
	}

	if (preg_match('/^([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/', $color)) {
		return '#' . $color;
	}

	if (! preg_match('/^([a-zA-Z][-a-zA-Z0-9]*)\s*\((.*)\)\s*$/s', $color, $m)) {
		return '';
	}

	$fname = strtolower($m[1]);
	$inner = $m[2];

	if (! isset(onepress_css_color_allowed_functions_map()[$fname])) {
		return '';
	}

	if (! onepress_css_color_parens_balanced($inner)) {
		return '';
	}

	// Allow numbers, keywords (in, none, from, srgb, display-p3, etc.), whitespace, calc operators, underscores (e.g. var fallbacks / custom idents).
	if (preg_match('/[^a-zA-Z0-9\s.,%#\/+()_*_-]/', $inner)) {
		return '';
	}

	return $color;
}

/**
 * @param string $s Inner of parentheses.
 * @return bool
 */
function onepress_css_color_parens_balanced($s)
{
	$depth = 0;
	$len = strlen($s);
	for ($i = 0; $i < $len; $i++) {
		$c = $s[ $i ];
		if ('(' === $c) {
			$depth++;
		} elseif (')' === $c) {
			$depth--;
			if ($depth < 0) {
				return false;
			}
		}
	}
	return 0 === $depth;
}

/**
 * Sanitize color values used in theme options / repeatable fields (alpha-capable CSS colors).
 *
 * @param mixed $color Raw input.
 * @return string
 */
function onepress_sanitize_color_alpha($color)
{
	return onepress_sanitize_css_color($color);
}


/**
 * Allowed HTML for inline SVG in repeatable icon field (Customizer + front).
 * Broad allowlist for common icon sets (Tabler, Heroicons, Feather, MDI, sprites, gradients).
 * Excludes foreignObject, script, animation (SMIL), feImage (arbitrary URLs). `style` uses Core CSS sanitizer.
 *
 * @return array<string, array<string, bool>>
 */
function onepress_svg_allowed_html()
{
	$id_class = array(
		'id'    => true,
		'class' => true,
	);
	// wp_kses runs safecss_filter_attr() on style values.
	$style_transform = array(
		'style'     => true,
		'transform' => true,
	);
	$stroke_attrs = array(
		'stroke'              => true,
		'stroke-width'        => true,
		'stroke-linecap'      => true,
		'stroke-linejoin'     => true,
		'stroke-dasharray'    => true,
		'stroke-dashoffset'   => true,
		'stroke-miterlimit'   => true,
		'stroke-opacity'      => true,
	);
	$fill_paint = array(
		'fill'           => true,
		'opacity'        => true,
		'fill-opacity'   => true,
		'fill-rule'      => true,
		'clip-rule'      => true,
		'color'          => true,
		'paint-order'    => true,
		'vector-effect'  => true,
	);
	$ref_clip = array(
		'clip-path' => true,
		'mask'      => true,
	);
	$effects = array(
		'filter'       => true,
		'marker-start' => true,
		'marker-mid'   => true,
		'marker-end'   => true,
	);

	$shape_core = array_merge( $id_class, $style_transform, $stroke_attrs, $fill_paint, $ref_clip, $effects );

	return array(
		'svg'            => array_merge(
			array(
				'xmlns'               => true,
				'xmlns:xlink'         => true,
				'version'             => true,
				'viewbox'             => true,
				'viewBox'             => true,
				'preserveaspectratio' => true,
				'overflow'            => true,
				'x'                   => true,
				'y'                   => true,
				'aria-hidden'         => true,
				'aria-label'          => true,
				'role'                => true,
				'focusable'           => true,
			),
			$shape_core
		),
		'g'              => $shape_core,
		'path'           => array_merge(
			array( 'd' => true ),
			$shape_core
		),
		'circle'         => array_merge(
			array(
				'cx' => true,
				'cy' => true,
				'r'  => true,
			),
			$shape_core
		),
		'rect'           => array_merge(
			array(
				'x'      => true,
				'y'      => true,
				'width'  => true,
				'height' => true,
				'rx'     => true,
				'ry'     => true,
			),
			$shape_core
		),
		'line'           => array_merge(
			array(
				'x1' => true,
				'y1' => true,
				'x2' => true,
				'y2' => true,
			),
			$shape_core
		),
		'polyline'       => array_merge(
			array( 'points' => true ),
			$shape_core
		),
		'polygon'        => array_merge(
			array( 'points' => true ),
			$shape_core
		),
		'ellipse'        => array_merge(
			array(
				'cx' => true,
				'cy' => true,
				'rx' => true,
				'ry' => true,
			),
			$shape_core
		),
		'text'           => array_merge(
			$shape_core,
			array(
				'x'                 => true,
				'y'                 => true,
				'dx'                => true,
				'dy'                => true,
				'text-anchor'       => true,
				'dominant-baseline' => true,
				'textlength'        => true,
				'lengthadjust'      => true,
			)
		),
		'tspan'          => array_merge(
			$shape_core,
			array(
				'x'                 => true,
				'y'                 => true,
				'dx'                => true,
				'dy'                => true,
				'text-anchor'       => true,
				'dominant-baseline' => true,
			)
		),
		'title'          => array(),
		'desc'           => array(),
		'metadata'       => array(),
		'defs'           => array_merge(
			$id_class,
			array( 'style' => true )
		),
		'symbol'         => array_merge(
			$id_class,
			$style_transform,
			$stroke_attrs,
			$fill_paint,
			$ref_clip,
			$effects,
			array(
				'viewbox'             => true,
				'viewBox'             => true,
				'overflow'            => true,
				'preserveaspectratio' => true,
			)
		),
		'use'            => array_merge(
			$id_class,
			$style_transform,
			array(
				'href'       => true,
				'xlink:href' => true,
				'x'          => true,
				'y'          => true,
				'width'      => true,
				'height'     => true,
				'fill'       => true,
				'opacity'    => true,
			),
			$stroke_attrs
		),
		'image'          => array_merge(
			$id_class,
			$style_transform,
			array(
				'x'                   => true,
				'y'                   => true,
				'width'               => true,
				'height'              => true,
				'href'                => true,
				'xlink:href'          => true,
				'preserveaspectratio' => true,
			)
		),
		'clippath'       => array_merge(
			$id_class,
			$style_transform,
			array( 'clippathunits' => true )
		),
		'mask'           => array_merge(
			$id_class,
			$style_transform,
			array(
				'maskunits'          => true,
				'maskcontentunits'   => true,
				'x'                  => true,
				'y'                  => true,
				'width'              => true,
				'height'             => true,
			)
		),
		'pattern'        => array_merge(
			$id_class,
			$style_transform,
			array(
				'x'                    => true,
				'y'                    => true,
				'width'                => true,
				'height'               => true,
				'patternunits'         => true,
				'patterncontentunits'  => true,
				'patterntransform'     => true,
				'preserveaspectratio'  => true,
				'overflow'             => true,
			)
		),
		'marker'         => array_merge(
			$id_class,
			$style_transform,
			array(
				'markerwidth'  => true,
				'markerheight' => true,
				'refx'         => true,
				'refy'         => true,
				'orient'       => true,
				'overflow'     => true,
				'preserveaspectratio' => true,
			)
		),
		'lineargradient' => array_merge(
			$id_class,
			array(
				'x1'                => true,
				'x2'                => true,
				'y1'                => true,
				'y2'                => true,
				'gradientunits'     => true,
				'gradienttransform' => true,
				'spreadmethod'      => true,
				'href'              => true,
				'xlink:href'        => true,
			)
		),
		'radialgradient' => array_merge(
			$id_class,
			array(
				'cx'                => true,
				'cy'                => true,
				'r'                 => true,
				'fx'                => true,
				'fy'                => true,
				'fr'                => true,
				'gradientunits'     => true,
				'gradienttransform' => true,
				'spreadmethod'      => true,
				'href'              => true,
				'xlink:href'        => true,
			)
		),
		'switch'         => $shape_core,
		'filter'         => array_merge(
			$id_class,
			$style_transform,
			array(
				'x'                             => true,
				'y'                             => true,
				'width'                         => true,
				'height'                        => true,
				'filterunits'                   => true,
				'primitiveunits'                => true,
				'color-interpolation-filters'   => true,
			)
		),
		'fegaussianblur' => array(
			'stddeviation' => true,
			'in'           => true,
			'result'       => true,
		),
		'fecolormatrix'  => array(
			'in'     => true,
			'type'   => true,
			'values' => true,
			'result' => true,
		),
		'feoffset'       => array(
			'dx'     => true,
			'dy'     => true,
			'in'     => true,
			'result' => true,
		),
		'feblend'        => array(
			'in'     => true,
			'in2'    => true,
			'mode'   => true,
			'result' => true,
		),
		'fecomposite'    => array(
			'in'       => true,
			'in2'      => true,
			'operator' => true,
			'k1'       => true,
			'k2'       => true,
			'k3'       => true,
			'k4'       => true,
			'result'   => true,
		),
		'feflood'        => array(
			'flood-color'   => true,
			'flood-opacity' => true,
			'result'        => true,
		),
		'femerge'        => array(),
		'femergenode'    => array(
			'in' => true,
		),
		'stop'           => array_merge(
			$id_class,
			array(
				'offset'       => true,
				'stop-color'   => true,
				'stop-opacity' => true,
			)
		),
	);
}

/**
 * Whether a string is inline SVG used for icon fields (Customizer / front-end).
 *
 * @param mixed $value Value to test.
 * @return bool
 */
function onepress_is_svg_icon_markup($value)
{
	if (!is_string($value)) {
		return false;
	}
	$v = trim($value);
	$v = preg_replace('/^\xEF\xBB\xBF/', '', $v);
	$v = preg_replace('/^\x{FEFF}/u', '', $v);
	$v = preg_replace('/^\s*<\?xml\b[^>]*>\s*/i', '', $v);
	$v = preg_replace('/^\s*<!DOCTYPE\b[^>]*>\s*/i', '', $v);
	return (bool) preg_match('/^\s*<\s*svg[\s>]/i', $v);
}

/**
 * Undo extra backslashes before quotes and "<svg+" artifacts (invalid nested JSON in Customizer save).
 *
 * @param string $value Raw SVG-ish string.
 * @return string
 */
function onepress_repeatable_normalize_svg_storage_string($value)
{
	if (!is_string($value) || $value === '') {
		return $value;
	}
	$out = trim($value);
	$out = preg_replace('/^\xEF\xBB\xBF/', '', $out);
	$out = preg_replace('/^\x{FEFF}/u', '', $out);
	$out = preg_replace('/^\s*<\?xml\b[^>]*>\s*/i', '', $out);
	$out = preg_replace('/^\s*<!DOCTYPE\b[^>]*>\s*/i', '', $out);
	$out = preg_replace('~(?i)<svg\+~', '<svg ', $out);
	$prev = null;
	while ($prev !== $out) {
		$prev = $out;
		$out = preg_replace('/(?:\\\\)+"/', '"', $out);
	}
	return $out;
}

/**
 * Re-add root &lt;svg&gt; presentation attributes removed by wp_kses (stroke/fill inheritance, Tabler/Heroicons, filled sets).
 *
 * @param string $sanitized Output of wp_kses().
 * @param string $original  Pre-kses markup (same icon, may still contain those attributes).
 * @return string
 */
function onepress_svg_reinject_root_presentation_attrs($sanitized, $original)
{
	if (!is_string($sanitized) || $sanitized === '' || !onepress_is_svg_icon_markup($sanitized)) {
		return $sanitized;
	}
	if (!preg_match('/<svg\b[^>]*>/is', $sanitized, $san_m) || !preg_match('/<svg\b[^>]*>/is', $original, $orig_m)) {
		return $sanitized;
	}
	$san_open = $san_m[0];
	$orig_tag = $orig_m[0];
	$names = array(
		'stroke',
		'stroke-width',
		'stroke-linecap',
		'stroke-linejoin',
		'stroke-dasharray',
		'stroke-dashoffset',
		'stroke-miterlimit',
		'stroke-opacity',
		'fill',
		'fill-opacity',
		'fill-rule',
		'color',
		'opacity',
	);
	$parts = array();
	foreach ($names as $name) {
		$qn = preg_quote($name, '/');
		if (preg_match('/' . $qn . '\s*=/i', $san_open)) {
			continue;
		}
		if (preg_match('/' . $qn . '\s*=\s*"([^"]*)"/i', $orig_tag, $m)
			|| preg_match('/' . $qn . "\s*=\s*'([^']*)'/i", $orig_tag, $m)) {
			$parts[] = $name . '="' . esc_attr($m[1]) . '"';
		}
	}
	if ($parts === array()) {
		return $sanitized;
	}
	$blob = implode(' ', $parts);
	return preg_replace('/<svg\s+/i', '<svg ' . $blob . ' ', $sanitized, 1);
}

/**
 * Sanitize inline SVG for output (Customizer save + front-end). Not for Font Awesome class strings.
 *
 * @param string $value Raw SVG.
 * @return string Empty if not SVG markup.
 */
function onepress_sanitize_inline_svg_markup($value)
{
	if (!is_string($value)) {
		return '';
	}
	$value = trim(onepress_repeatable_normalize_svg_storage_string($value));
	if (!onepress_is_svg_icon_markup($value)) {
		return '';
	}
	$safe = wp_kses($value, onepress_svg_allowed_html());
	return onepress_svg_reinject_root_presentation_attrs($safe, $value);
}

/**
 * Icon field: Font Awesome class string or inline SVG markup.
 *
 * @param mixed $value Raw value.
 * @return string
 */
function onepress_sanitize_repeatable_icon($value)
{
	if (!is_string($value)) {
		return '';
	}
	$value = trim($value);
	if ($value === '') {
		return '';
	}
	$value = onepress_repeatable_normalize_svg_storage_string($value);
	if (onepress_is_svg_icon_markup($value)) {
		return onepress_sanitize_inline_svg_markup($value);
	}
	return sanitize_text_field($value);
}

/**
 * Decode JSON string from Customizer (SVG / long text may include edge-case bytes).
 *
 * @param string $raw Raw JSON string.
 * @return array<string, mixed>|null Decoded array or null on failure.
 */
function onepress_repeatable_sanitize_decode_json_string($raw)
{
	if (!is_string($raw) || $raw === '') {
		return null;
	}
	$flags = defined('JSON_INVALID_UTF8_SUBSTITUTE') ? JSON_INVALID_UTF8_SUBSTITUTE : 0;
	// Customize passes values already wp_unslash()'d; unslashing again strips JSON's \" and breaks decode.
	$decoded = json_decode($raw, true, 512, $flags);
	if (JSON_ERROR_NONE !== json_last_error()) {
		$decoded = json_decode(wp_unslash($raw), true, 512, $flags);
	}
	if (JSON_ERROR_NONE !== json_last_error()) {
		return null;
	}
	return is_array($decoded) ? $decoded : null;
}

/**
 * Normalize repeatable payload to a list of row arrays.
 * Accepts JS shape { _items: [...] } or a plain list [...] (e.g. after theme_mod unserialize).
 *
 * @param mixed $data Decoded array.
 * @return array<int, array<string, mixed>>|null Rows or null if invalid.
 */
function onepress_repeatable_sanitize_extract_rows($data)
{
	if (!is_array($data)) {
		return null;
	}
	if (isset($data['_items']) && is_array($data['_items'])) {
		return $data['_items'];
	}
	if ($data === array()) {
		return array();
	}
	foreach ($data as $key => $row) {
		$list_key = is_int($key) || (is_string($key) && ctype_digit($key));
		if (!$list_key || !is_array($row)) {
			return null;
		}
	}
	return array_values($data);
}

/**
 * Decode a repeatable theme_mod: JSON string or array, and unwrap JS shape { _items: [...] }.
 *
 * @param mixed $value Raw get_theme_mod value.
 * @return array<int, array<string, mixed>>
 */
function onepress_normalize_repeatable_theme_mod_rows($value)
{
	if (is_string($value)) {
		$decoded = json_decode($value, true);
		$value = (JSON_ERROR_NONE === json_last_error() && is_array($decoded)) ? $decoded : array();
	}
	if (!is_array($value)) {
		return array();
	}
	if (isset($value['_items']) && is_array($value['_items'])) {
		return $value['_items'];
	}
	return $value;
}

/**
 * Sanitize repeatable data
 *
 * @param $input
 * @param $setting object $wp_customize
 * @return bool|mixed|string|void
 */
function onepress_sanitize_repeatable_data_field($input, $setting)
{
	$control = $setting->manager->get_control($setting->id);
	if (!$control || !is_array($control->fields)) {
		return false;
	}

	$fields = $control->fields;

	if (is_string($input)) {
		$decoded = onepress_repeatable_sanitize_decode_json_string($input);
		if ($decoded === null) {
			return false;
		}
		$input = $decoded;
	} elseif (is_object($input)) {
		$encoded = wp_json_encode($input);
		$input = is_string($encoded) ? json_decode($encoded, true) : null;
	}

	if (!is_array($input)) {
		return false;
	}

	$data = onepress_repeatable_sanitize_extract_rows($input);
	if ($data === null) {
		return false;
	}

	foreach ($data as $i => $item_data) {
		if (!is_array($item_data)) {
			$item_data = array();
			$data[$i] = array();
		}
		foreach ($item_data as $id => $value) {

			if (isset($fields[$id])) {
				switch (strtolower($fields[$id]['type'])) {
					case 'text':
						$data[$i][$id] = sanitize_text_field($value);
						break;
					case 'textarea':
					case 'editor':
						$data[$i][$id] = wp_kses_post($value);
						break;
					case 'color':
						$data[$i][$id] = sanitize_hex_color_no_hash($value);
						break;
					case 'coloralpha':
						$data[$i][$id] = onepress_sanitize_color_alpha($value);
						break;
					case 'checkbox':
						$data[$i][$id] = onepress_sanitize_checkbox($value);
						break;
					case 'select':
						$data[$i][$id] = '';
						if (is_array($fields[$id]['options']) && !empty($fields[$id]['options'])) {
							// if is multiple choices
							if (is_array($value)) {
								foreach ($value as $k => $v) {
									if (isset($fields[$id]['options'][$v])) {
										$value[$k] = $v;
									}
								}
								$data[$i][$id] = $value;
							} else { // is single choice
								if (isset($fields[$id]['options'][$value])) {
									$data[$i][$id] = $value;
								}
							}
						}

						break;
					case 'radio':
						$data[$i][$id] = sanitize_text_field($value);
						break;
					case 'add_by':
						// Only "click" marks user-added rows; empty = theme default sections.
						$v = is_string($value) ? trim($value) : '';
						$data[$i][$id] = ( 'click' === $v ) ? 'click' : '';
						break;
					case 'icon':
						$data[$i][$id] = onepress_sanitize_repeatable_icon($value);
						break;
				case 'media':
					$value = wp_parse_args(
						$value,
						array(
							'url' => '',
							'id' => false,
						)
					);
					$value['id'] = absint($value['id']);
					
					// Validate and sanitize URL
					$url = sanitize_text_field($value['url']);
					// Only allow http/https URLs for security
					if (!empty($url) && !preg_match('/^https?:\/\//', $url)) {
						$url = '';
					}
					$url = esc_url_raw($url);
					$data[$i][$id]['url'] = $url;

					if ($url && $value['id'] && ($attachment_url = wp_get_attachment_url($value['id']))) {
						$data[$i][$id]['id']   = $value['id'];
						$data[$i][$id]['url']  = esc_url_raw($attachment_url);
					} else {
						if (empty($url)) {
							$data[$i][$id]['id'] = '';
						} else {
							$data[$i][$id]['id'] = $value['id'];
						}
					}

					break;
					default:
						$data[$i][$id] = wp_kses_post($value);
				}
			} else {
				$data[$i][$id] = wp_kses_post($value);
			}

			if (is_array($data) && is_array($fields) && count($data[$i]) != count($fields)) {
				foreach ($fields as $k => $f) {
					if (!isset($data[$i][$k])) {
						$data[$i][$k] = '';
					}
				}
			}
		}
	}

	return $data;
}


function onepress_sanitize_file_url($file_url)
{
	$output = '';
	$filetype = wp_check_filetype($file_url);
	if ($filetype['ext']) {
		$output = esc_url($file_url);
	}
	return $output;
}


/**
 * Conditional to show more hero settings
 *
 * @param $control
 * @return bool
 */
function onepress_hero_fullscreen_callback($control)
{
	$value = $control->manager->get_setting('onepress_hero_fullscreen')->value();
	if ('' == $value  || !$value) {
		return true;
	} else {
		return false;
	}
}

/**
 * Sanitize select choices
 *
 * @param $input
 * @param null  $setting
 *
 * @return string
 */
function onepress_sanitize_select($input, $setting = null)
{

	// input must be a slug: lowercase alphanumeric characters, dashes and underscores are allowed only
	$input = sanitize_key($input);

	// get the list of possible select options
	if ($setting) {
		$choices = $setting->manager->get_control($setting->id)->choices;

		// return input if valid or return default option
		return (array_key_exists($input, $choices) ? $input : $setting->default);
	} else {
		return $input;
	}
}


function onepress_sanitize_number($input)
{
	return balanceTags($input);
}

function onepress_sanitize_hex_color($color)
{
	if ($color === '') {
		return '';
	}
	if (preg_match('|^#([A-Fa-f0-9]{3}){1,2}$|', $color)) {
		return $color;
	}
	return null;
}

function onepress_sanitize_text($string)
{
	return wp_kses_post(balanceTags($string));
}

function onepress_sanitize_html_input($string)
{
	return wp_kses_allowed_html($string);
}

function onepress_showon_frontpage()
{
	return is_page_template('template-frontpage.php');
}

function onepress_gallery_source_validate($validity, $value)
{
	if (!class_exists('OnePress_Plus')) {
		if ($value != 'page') {
			$validity->add('notice', sprintf(
				/* translators: 1: feature name */
				esc_html__('Upgrade to %1s to unlock this feature.', 'onepress'), '<a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#gallery">OnePress Plus</a>'));
		}
	}
	return $validity;
}
