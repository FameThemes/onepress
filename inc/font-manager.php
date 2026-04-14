<?php
/**
 * Font manager theme_mod: JSON list of fonts + sanitize + Google Fonts enqueue (all registry ids).
 *
 * @package OnePress
 */

if (! defined('ABSPATH')) {
	exit;
}

/**
 * Default font manager value (decoded array).
 *
 * @return array<string, mixed>
 */
function onepress_font_manager_default_value()
{
	return array(
		'_onepressFontManager' => true,
		'items'                => array(),
	);
}

/**
 * Whether a string is a valid Google axis pair (ital,wght) for css2.
 *
 * @param string $pair e.g. "0,400".
 * @return bool
 */
function onepress_font_manager_is_valid_variation_pair($pair)
{
	$pair = trim((string) $pair);
	return (bool) preg_match('/^[01],\d{3}$/', $pair);
}

/**
 * Sanitize one font item.
 *
 * @param array<string, mixed> $item Raw item.
 * @return array<string, mixed>|null Null when empty / invalid.
 */
function onepress_font_manager_sanitize_item($item)
{
	if (! is_array($item)) {
		return null;
	}
	$id = isset($item['id']) ? sanitize_key((string) $item['id']) : '';
	if ($id === '') {
		$id = 'font-' . sanitize_key( wp_generate_password( 10, false, false ) );
	}
	$font_family = isset($item['fontFamily']) ? sanitize_text_field((string) $item['fontFamily']) : '';
	$google_slug = isset($item['googleSlug']) ? sanitize_key((string) $item['googleSlug']) : '';
	$google_name = isset($item['googleName']) ? sanitize_text_field((string) $item['googleName']) : '';
	$is_google   = ! empty($item['isGoogleFamily']);
	$vars        = array();
	if (isset($item['variations']) && is_array($item['variations'])) {
		foreach ($item['variations'] as $v) {
			$s = is_string($v) ? trim($v) : '';
			if ($s !== '' && onepress_font_manager_is_valid_variation_pair($s)) {
				$vars[] = $s;
			}
		}
	}
	$vars = array_values(array_unique($vars, SORT_STRING));
	if ($font_family === '' && $google_name === '' && $google_slug === '') {
		return null;
	}
	return array(
		'id'             => $id,
		'fontFamily'     => $font_family,
		'googleSlug'     => $google_slug,
		'googleName'     => $google_name,
		'isGoogleFamily' => $is_google,
		'variations'     => $vars,
	);
}

/**
 * @param array<string, mixed> $raw Decoded JSON root.
 * @return array<string, mixed>
 */
function onepress_font_manager_normalize_root_from_array($raw)
{
	$default = onepress_font_manager_default_value();
	if (empty($raw['_onepressFontManager'])) {
		return $default;
	}
	$out = array(
		'_onepressFontManager' => true,
		'items'                => array(),
	);
	if (isset($raw['items']) && is_array($raw['items'])) {
		$max = 40;
		$n   = 0;
		foreach ($raw['items'] as $row) {
			if ($n >= $max) {
				break;
			}
			$clean = onepress_font_manager_sanitize_item(is_array($row) ? $row : array());
			if (null !== $clean) {
				$out['items'][] = $clean;
				++$n;
			}
		}
		return $out;
	}
	// Legacy single-font root.
	$legacy_item = onepress_font_manager_sanitize_item(
		array(
			'id'             => 'migrated-1',
			'fontFamily'     => isset($raw['fontFamily']) ? $raw['fontFamily'] : '',
			'googleSlug'     => isset($raw['googleSlug']) ? $raw['googleSlug'] : '',
			'googleName'     => isset($raw['googleName']) ? $raw['googleName'] : '',
			'isGoogleFamily' => isset($raw['isGoogleFamily']) ? $raw['isGoogleFamily'] : false,
			'variations'     => isset($raw['variations']) ? $raw['variations'] : array(),
		)
	);
	if (null !== $legacy_item) {
		$out['items'][] = $legacy_item;
	}
	return $out;
}

/**
 * @param mixed $value Raw theme_mod (string JSON or array).
 * @return array<string, mixed>
 */
function onepress_font_manager_parse($value)
{
	if (is_array($value)) {
		$raw = $value;
	} elseif (is_string($value) && $value !== '') {
		$decoded = json_decode($value, true);
		$raw     = is_array($decoded) ? $decoded : array();
	} else {
		return onepress_font_manager_default_value();
	}
	return onepress_font_manager_normalize_root_from_array($raw);
}

/**
 * Sanitize callback for Customizer (stores JSON string).
 *
 * @param mixed $value Raw.
 * @return string JSON.
 */
function onepress_sanitize_font_manager_value($value)
{
	$parsed = onepress_font_manager_parse($value);
	return wp_json_encode($parsed);
}

/**
 * Build Google Fonts CSS2 URL for one family + axis pairs.
 *
 * @param string   $family_display Google family name (API).
 * @param string[] $variations     List of "ital,wght" tokens.
 * @return string URL or empty.
 */
function onepress_font_manager_google_css2_href($family_display, $variations)
{
	$family_display = trim((string) $family_display);
	if ($family_display === '' || empty($variations)) {
		return '';
	}
	$pairs = array();
	foreach ($variations as $p) {
		if (onepress_font_manager_is_valid_variation_pair($p)) {
			$pairs[] = $p;
		}
	}
	$pairs = array_values(array_unique($pairs, SORT_STRING));
	if (empty($pairs)) {
		return '';
	}
	sort($pairs, SORT_STRING);
	$enc  = rawurlencode($family_display);
	$enc  = str_replace('%20', '+', $enc);
	$axis = implode(';', $pairs);
	return 'https://fonts.googleapis.com/css2?family=' . $enc . ':ital,wght@' . $axis . '&display=swap';
}

/**
 * @param array<string, mixed> $item Sanitized item.
 * @return string
 */
function onepress_font_manager_item_google_href($item)
{
	if (empty($item['isGoogleFamily']) || empty($item['googleName'])) {
		return '';
	}
	$vars = isset($item['variations']) && is_array($item['variations']) ? $item['variations'] : array();
	if (empty($vars)) {
		$vars = array('0,400');
	}
	return onepress_font_manager_google_css2_href((string) $item['googleName'], $vars);
}

/**
 * Collect Google axis pairs from all font manager theme_mods (family => pair => true), for merging with styling.
 *
 * @return array<string, array<string, true>>
 */
function onepress_font_manager_collect_google_axes_map_for_merge()
{
	require_once get_template_directory() . '/inc/registry/font-registry.php';

	$mod_ids = onepress_font_manager_theme_mod_ids();

	$legacy = apply_filters('onepress_font_manager_theme_mod_id', 'onepress_font_manager');
	$legacy = sanitize_key((string) $legacy);
	if ($legacy !== '' && ! in_array($legacy, $mod_ids, true)) {
		$mod_ids[] = $legacy;
	}

	/**
	 * @param list<string> $mod_ids
	 */
	$mod_ids = apply_filters('onepress_font_manager_enqueue_theme_mod_ids', $mod_ids);
	if (! is_array($mod_ids) || $mod_ids === array()) {
		return array();
	}

	$mod_ids = array_values(array_unique(array_filter(array_map('sanitize_key', $mod_ids))));

	$merged = array();

	foreach ($mod_ids as $mod_id) {
		$raw = get_theme_mod($mod_id, '');
		if ($raw === '' || $raw === null) {
			continue;
		}
		$data = onepress_font_manager_parse($raw);
		if (empty($data['items']) || ! is_array($data['items'])) {
			continue;
		}
		foreach ($data['items'] as $item) {
			if (! is_array($item) || empty($item['isGoogleFamily'])) {
				continue;
			}
			$family = trim((string) ($item['googleName'] ?? ''));
			if ($family === '') {
				continue;
			}
			$vars = isset($item['variations']) && is_array($item['variations']) ? $item['variations'] : array();
			if ($vars === array()) {
				$vars = array('0,400');
			}
			if (! isset($merged[ $family ])) {
				$merged[ $family ] = array();
			}
			foreach ($vars as $p) {
				if (onepress_font_manager_is_valid_variation_pair((string) $p)) {
					$merged[ $family ][ (string) $p ] = true;
				}
			}
		}
	}

	return $merged;
}

/**
 * Front: Google Fonts from font manager are merged into `onepress_styling_enqueue_merged_google_fonts` (no separate handles).
 *
 * @return void
 */
function onepress_font_manager_enqueue_front_styles()
{
	if (is_admin()) {
		return;
	}
	// Intentionally empty: avoids duplicate requests; font manager variants override styling per family in styling-css.php.
}

add_action('wp_enqueue_scripts', 'onepress_font_manager_enqueue_front_styles', 20);
