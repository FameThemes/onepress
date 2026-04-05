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
 * Sanitize repeatable data
 *
 * @param $input
 * @param $setting object $wp_customize
 * @return bool|mixed|string|void
 */
function onepress_sanitize_repeatable_data_field($input, $setting)
{
	$control = $setting->manager->get_control($setting->id);

	$fields = $control->fields;
	if (is_string($input)) {
		$input = json_decode(wp_unslash($input), true);
	}
	$data = wp_parse_args($input, array());

	if (!is_array($data)) {
		return false;
	}
	if (!isset($data['_items'])) {
		return false;
	}
	$data = $data['_items'];

	foreach ($data as $i => $item_data) {
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
