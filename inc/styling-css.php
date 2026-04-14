<?php
/**
 * Element styling: defaults, sanitize, CSS build, front output.
 *
 * @package OnePress
 */

/**
 * Default styling payload (single target). Matches plans: data[state][deviceId] = declaration strings.
 *
 * @return array<string, mixed>
 */
function onepress_styling_get_default_value()
{
	return array(
		'_onepressStyling' => true,
		'_meta'             => array(
			'baseSelector' => '#hero .container .btn',
			'states'       => array(
				array(
					'normal' => array(
						'label'    => __( 'Normal', 'onepress' ),
						'selector' => '',
					),
				),
				array(
					'hover' => array(
						'label'    => __( 'Hover', 'onepress' ),
						'selector' => ':hover',
					),
				),
			),
		),
		'normal'            => array(
			'desktop' => '',
			'tablet'  => '',
			'mobile'  => '',
		),
		'hover'             => array(
			'desktop' => '',
			'tablet'  => '',
			'mobile'  => '',
		),
	);
}

/**
 * JSON string default for theme_mod.
 *
 * @return string
 */
function onepress_styling_get_default_json()
{
	return wp_json_encode(onepress_styling_get_default_value());
}

/**
 * Default single-target payload with only the `normal` state (for `styling_states` => false).
 *
 * @return array<string, mixed>
 */
function onepress_styling_get_default_value_normal_only()
{
	return array(
		'_onepressStyling' => true,
		'_meta'             => array(
			'baseSelector' => '#hero .container .btn',
			'states'       => array(
				array(
					'normal' => array(
						'label'    => __( 'Normal', 'onepress' ),
						'selector' => '',
					),
				),
			),
		),
		'normal'            => array(
			'desktop' => '',
			'tablet'  => '',
			'mobile'  => '',
		),
	);
}

/**
 * @return string
 */
function onepress_styling_get_default_json_normal_only()
{
	return wp_json_encode(onepress_styling_get_default_value_normal_only());
}

/**
 * Build default single-target value from a fixed states template (same shape as `_meta.states` rows).
 *
 * @param array<int, array<string, array{label?:string, selector?:string, force_selector?:string}>> $template State entries.
 * @return array<string, mixed>
 */
function onepress_styling_get_default_value_from_states_template($template)
{
	if (! is_array($template) || $template === array()) {
		return onepress_styling_get_default_value();
	}
	$allowed_devices = onepress_styling_allowed_device_ids();
	$out             = array(
		'_onepressStyling' => true,
		'_meta'            => array(
			'baseSelector' => '#hero .container .btn',
			'states'       => array(),
		),
	);
	foreach ($template as $entry) {
		if (! is_array($entry) || count($entry) !== 1) {
			continue;
		}
		$state_key = key($entry);
		$row       = current($entry);
		$sk        = sanitize_key((string) $state_key);
		if ($sk === '' || $sk[0] === '_') {
			continue;
		}
		if (! is_array($row)) {
			continue;
		}
		$label    = isset($row['label']) ? sanitize_text_field((string) $row['label']) : $sk;
		$selector = isset($row['selector']) ? onepress_styling_sanitize_selector((string) $row['selector']) : '';
		$force    = isset($row['force_selector']) ? onepress_styling_sanitize_selector((string) $row['force_selector']) : '';
		$state_row = array(
			'label'    => $label,
			'selector' => $selector,
		);
		if ($force !== '') {
			$state_row['force_selector'] = $force;
		}
		$out['_meta']['states'][] = array( $sk => $state_row );
		$out[ $sk ] = array();
		foreach ($allowed_devices as $dev => $_) {
			$out[ $sk ][ $dev ] = '';
		}
	}
	if (empty($out['_meta']['states'])) {
		return onepress_styling_get_default_value();
	}
	return $out;
}

/**
 * @param array<int, array<string, array{label?:string, selector?:string, force_selector?:string}>> $template State entries.
 * @return string
 */
function onepress_styling_get_default_json_from_states_template($template)
{
	return wp_json_encode(onepress_styling_get_default_value_from_states_template($template));
}

/**
 * Default styling payload for one control with multiple targets (`items` array).
 *
 * @return array<string, mixed>
 */
function onepress_styling_get_default_value_multiple()
{
	$one                = onepress_styling_get_default_value();
	$one['id']          = 'item-1';
	$one['title']       = __( 'Item 1', 'onepress' );
	$one['selector']    = isset( $one['_meta']['baseSelector'] ) ? (string) $one['_meta']['baseSelector'] : '';
	$one['_meta']['baseSelector'] = $one['selector'];
	return array(
		'_onepressStyling' => true,
		'items'            => array( $one ),
	);
}

/**
 * JSON default for theme_mod when the control uses `styling_multiple`.
 *
 * @return string
 */
function onepress_styling_get_default_json_multiple()
{
	return wp_json_encode( onepress_styling_get_default_value_multiple() );
}

/**
 * Wrap a single-target payload as the first `items[]` row (id/title/selector).
 *
 * @param array<string, mixed> $single Sanitized or raw single styling object.
 * @return array<string, mixed>
 */
function onepress_styling_item_from_single_payload( $single )
{
	if ( ! is_array( $single ) ) {
		$single = onepress_styling_get_default_value();
	}
	$base = '';
	if ( isset( $single['_meta']['baseSelector'] ) ) {
		$base = (string) $single['_meta']['baseSelector'];
	}
	return array_merge(
		array(
			'id'       => 'item-1',
			'title'    => __( 'Item 1', 'onepress' ),
			'selector' => $base,
		),
		$single
	);
}

/**
 * Device ids that map to `wp.customize.previewedDevice` (footer preview: desktop / tablet / mobile).
 * Keep order and keys aligned with core Customizer responsive preview.
 *
 * @return string[]
 */
function onepress_styling_preview_device_ids()
{
	return apply_filters(
		'onepress_styling_preview_device_ids',
		array( 'desktop', 'tablet', 'mobile' )
	);
}

/**
 * Breakpoints for building @media (desktop = no wrapper).
 * Default `id` values match `onepress_styling_preview_device_ids()` so styling device ↔ preview footer stay in sync.
 *
 * @return array<int, array{id:string,label:string,maxWidth:string}>
 */
function onepress_styling_default_breakpoints()
{
	return apply_filters(
		'onepress_styling_breakpoints',
		array(
			array(
				'id'       => 'desktop',
				'label'    => __( 'Desktop', 'onepress' ),
				'maxWidth' => '',
			),
			array(
				'id'       => 'tablet',
				'label'    => __( 'Tablet', 'onepress' ),
				'maxWidth' => '991px',
			),
			array(
				'id'       => 'mobile',
				'label'    => __( 'Mobile', 'onepress' ),
				'maxWidth' => '767px',
			),
		)
	);
}

/**
 * Sanitize a CSS selector list (strip tags, limit length).
 *
 * @param string $selector Raw selector.
 * @return string
 */
function onepress_styling_sanitize_selector($selector)
{
	$selector = is_string($selector) ? wp_strip_all_tags($selector) : '';
	$selector = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $selector);
	$selector = trim($selector);
	if (strlen($selector) > 2000) {
		$selector = substr($selector, 0, 2000);
	}
	return $selector;
}

/**
 * Split a top-level selector list on commas (ignores commas inside `()` / `[]`).
 *
 * @param string $sel Sanitized selector string.
 * @return string[]
 */
function onepress_styling_split_selector_list($sel)
{
	$sel = trim((string) $sel);
	if ($sel === '') {
		return array();
	}
	$parts   = array();
	$depth   = 0;
	$bracket = 0;
	$len     = strlen($sel);
	$start   = 0;
	for ($i = 0; $i < $len; $i++) {
		$c = $sel[ $i ];
		if ('(' === $c) {
			++$depth;
		} elseif (')' === $c) {
			--$depth;
		} elseif ('[' === $c) {
			++$bracket;
		} elseif (']' === $c) {
			--$bracket;
		} elseif (',' === $c && 0 === $depth && 0 === $bracket) {
			$chunk = trim(substr($sel, $start, $i - $start));
			if ($chunk !== '') {
				$parts[] = $chunk;
			}
			$start = $i + 1;
		}
	}
	$chunk = trim(substr($sel, $start));
	if ($chunk !== '') {
		$parts[] = $chunk;
	}
	return $parts;
}

/**
 * Build the full CSS selector for one state: baseSelector + per-state suffix.
 * Legacy: when base is empty, the state's selector is treated as the full selector.
 * When base is a comma-separated list, the suffix is applied to each branch
 * (e.g. `.a .b, .c .d` + `:hover` → `.a .b:hover, .c .d:hover`).
 *
 * @param string $base        Sanitized _meta.baseSelector (may be empty).
 * @param string $state_suffix Sanitized per-state selector (e.g. '', ':hover').
 * @return string
 */
function onepress_styling_compose_full_selector($base, $state_suffix)
{
	$base   = is_string($base) ? trim($base) : '';
	$suffix = is_string($state_suffix) ? trim($state_suffix) : '';
	if ($base === '' && $suffix === '') {
		return '';
	}
	if ($base === '') {
		return $suffix;
	}
	if ($suffix === '') {
		return $base;
	}
	$list = onepress_styling_split_selector_list($base);
	if (count($list) <= 1) {
		return $base . $suffix;
	}
	$composed = array();
	foreach ($list as $part) {
		$composed[] = $part . $suffix;
	}
	return implode(', ', $composed);
}

/**
 * Final CSS selector for one state: optional `force_selector` replaces base+suffix composition.
 *
 * @param string              $base_meta Sanitized `_meta.baseSelector`.
 * @param array<string,mixed> $conf      State row: `selector`, optional `force_selector`.
 * @return string
 */
function onepress_styling_resolve_state_output_selector($base_meta, $conf)
{
	$base_meta = is_string($base_meta) ? onepress_styling_sanitize_selector($base_meta) : '';
	if (is_array($conf) && isset($conf['force_selector'])) {
		$force = onepress_styling_sanitize_selector((string) $conf['force_selector']);
		if ($force !== '') {
			return $force;
		}
	}
	$suffix = ( is_array($conf) && isset($conf['selector']) )
		? onepress_styling_sanitize_selector((string) $conf['selector'])
		: '';

	return onepress_styling_compose_full_selector($base_meta, $suffix);
}

/**
 * Sanitize max-width token for @media.
 *
 * @param string $token Raw.
 * @return string
 */
function onepress_styling_sanitize_length_token($token)
{
	$token = trim((string) $token);
	if (preg_match('/^\d+(\.\d+)?(px|em|rem|%)$/', $token)) {
		return $token;
	}
	return '';
}

/**
 * Sanitize one declarations block (no selectors, no braces).
 *
 * @param string $str Raw declarations.
 * @return string
 */
function onepress_styling_sanitize_declarations($str)
{
	if (! is_string($str)) {
		return '';
	}
	$str = trim($str);
	if ($str === '') {
		return '';
	}
	if (preg_match('/@import|expression\s*\(|javascript\s*:|<\s*script|@charset|@namespace|<\//i', $str)) {
		return '';
	}
	$str = onepress_sanitize_css($str);
	if (strlen($str) > 8000) {
		$str = substr($str, 0, 8000);
	}
	return trim($str);
}

/**
 * Coerce per-device value to sanitized declaration string (legacy objects become empty).
 *
 * @param mixed $v Value.
 * @return string
 */
function onepress_styling_coerce_device_declarations($v)
{
	if (is_string($v)) {
		return onepress_styling_sanitize_declarations($v);
	}
	return '';
}

/**
 * Sanitize _meta.states array shape.
 *
 * @param mixed $meta Meta array.
 * @return array{baseSelector: string, states: array<int, array<string, array{label:string, selector:string, force_selector?:string}>>, elId?: string, elName?: string}
 */
function onepress_styling_sanitize_meta($meta)
{
	$fallback = onepress_styling_get_default_value()['_meta'];
	if (! is_array($meta) || ! isset($meta['states']) || ! is_array($meta['states'])) {
		return $fallback;
	}
	$base_raw = isset($meta['baseSelector']) ? (string) $meta['baseSelector'] : '';
	$base     = onepress_styling_sanitize_selector($base_raw);
	$states   = array();
	foreach ($meta['states'] as $entry) {
		if (! is_array($entry) || count($entry) !== 1) {
			continue;
		}
		$state_key = key($entry);
		$payload   = current($entry);
		$sk        = sanitize_key($state_key);
		if ($sk === '' || $sk[0] === '_') {
			continue;
		}
		if (! is_array($payload)) {
			continue;
		}
		$label    = isset($payload['label']) ? sanitize_text_field((string) $payload['label']) : $sk;
		$selector = isset($payload['selector']) ? onepress_styling_sanitize_selector((string) $payload['selector']) : '';
		$force    = isset($payload['force_selector']) ? onepress_styling_sanitize_selector((string) $payload['force_selector']) : '';
		$row      = array(
			'label'    => $label,
			'selector' => $selector,
		);
		if ($force !== '') {
			$row['force_selector'] = $force;
		}
		$states[] = array( $sk => $row );
	}
	if (empty($states)) {
		return $fallback;
	}
	$out = array(
		'baseSelector' => $base,
		'states'       => $states,
	);
	if ( isset( $meta['elId'] ) ) {
		$el_id = sanitize_key( (string) $meta['elId'] );
		if ( $el_id !== '' ) {
			$out['elId'] = $el_id;
		}
	}
	if ( isset( $meta['elName'] ) ) {
		$el_name = sanitize_text_field( (string) $meta['elName'] );
		if ( $el_name !== '' ) {
			$out['elName'] = $el_name;
		}
	}
	return $out;
}

/**
 * Allowed device keys (must match breakpoint ids).
 *
 * @return array<string, true>
 */
function onepress_styling_allowed_device_ids()
{
	$map  = array();
	$defs = onepress_styling_default_breakpoints();
	foreach ($defs as $row) {
		if (! empty($row['id'])) {
			$map[ sanitize_key($row['id']) ] = true;
		}
	}
	return $map;
}

/**
 * Sanitize _meta.fontSlices from client payload (google | system | custom per state × device).
 *
 * @param array<string, mixed> $decoded         Raw decoded styling JSON.
 * @param string[]             $state_keys      Allowed state ids.
 * @param array<string, true>  $allowed_devices Allowed device ids.
 * @return array<string, array<string, array{source:string, slug:string, family:string}>>|null
 */
function onepress_styling_sanitize_font_slices_from_input($decoded, $state_keys, $allowed_devices)
{
	if (! is_array($decoded) || ! isset($decoded['_meta']['fontSlices']) || ! is_array($decoded['_meta']['fontSlices'])) {
		return null;
	}
	$sk_allowed = array_fill_keys($state_keys, true);
	$in         = $decoded['_meta']['fontSlices'];
	$out        = array();
	foreach ($in as $st_raw => $devices) {
		$st = sanitize_key((string) $st_raw);
		if ($st === '' || ! isset($sk_allowed[ $st ])) {
			continue;
		}
		if (! is_array($devices)) {
			continue;
		}
		foreach ($devices as $dev_raw => $row) {
			$dev = sanitize_key((string) $dev_raw);
			if ($dev === '' || ! isset($allowed_devices[ $dev ])) {
				continue;
			}
			if (! is_array($row)) {
				continue;
			}
			$source = isset($row['source']) ? sanitize_key((string) $row['source']) : '';
			if (! in_array($source, array( 'google', 'system', 'custom' ), true)) {
				continue;
			}
			$slug   = isset($row['slug']) ? sanitize_key((string) $row['slug']) : '';
			$family = isset($row['family']) ? sanitize_text_field((string) $row['family']) : '';
			if (strlen($family) > 200) {
				$family = substr($family, 0, 200);
			}
			$out[ $st ][ $dev ] = array(
				'source' => $source,
				'slug'   => $slug,
				'family' => $family,
			);
		}
	}
	return $out ? $out : null;
}

/**
 * Parse declaration string to property map (kebab-case keys), same subset as the JS form parser.
 *
 * @param string $css Declarations only.
 * @return array<string, string>
 */
function onepress_styling_parse_declarations_map($css)
{
	$map = array();
	if (! is_string($css) || $css === '') {
		return $map;
	}
	$cleaned = preg_replace('/\/\*[\s\S]*?\*\//', '', $css);
	if (! is_string($cleaned)) {
		$cleaned = $css;
	}
	if (preg_match_all('/([\w-]+)\s*:\s*((?:[^;\'"]|\'[^\']*\'|"[^"]*")+?)(?=\s*;|\s*$)/i', $cleaned, $matches, PREG_SET_ORDER)) {
		foreach ($matches as $m) {
			$prop = strtolower(trim($m[1]));
			$val  = trim($m[2]);
			$val  = preg_replace('/\s*!important\s*$/i', '', $val);
			$val  = is_string($val) ? trim($val) : '';
			if ($prop !== '' && $val !== '') {
				$map[ $prop ] = $val;
			}
		}
	}
	return $map;
}

/**
 * @param string $w Raw font-weight.
 * @return string
 */
function onepress_styling_normalize_weight_for_google($w)
{
	$s = strtolower(trim((string) $w));
	if ($s === '' || $s === 'inherit') {
		return '400';
	}
	if ($s === 'normal') {
		return '400';
	}
	if ($s === 'bold') {
		return '700';
	}
	if ($s === 'bolder') {
		return '700';
	}
	if ($s === 'lighter') {
		return '300';
	}
	if (preg_match('/^\d{3}$/', $s)) {
		return $s;
	}
	return '400';
}

/**
 * @param string $style Raw font-style.
 * @return string "0" or "1"
 */
function onepress_styling_normalize_ital_for_google($style)
{
	$s = strtolower(trim((string) $style));
	if ($s === 'italic' || $s === 'oblique') {
		return '1';
	}
	return '0';
}

/**
 * @param string               $declarations Declaration string for one slice.
 * @param array<string, mixed> $meta_slice   One fontSlices[state][device] row.
 * @return string|null "ital,wght" e.g. "0,400"
 */
function onepress_styling_google_axis_pair_from_slice($declarations, $meta_slice)
{
	if (! is_array($meta_slice) || ($meta_slice['source'] ?? '') !== 'google' || trim((string) ($meta_slice['family'] ?? '')) === '') {
		return null;
	}
	$map  = onepress_styling_parse_declarations_map((string) $declarations);
	$ital = onepress_styling_normalize_ital_for_google($map['font-style'] ?? '');
	$wght = onepress_styling_normalize_weight_for_google($map['font-weight'] ?? '');
	return $ital . ',' . $wght;
}

/**
 * Merge Google axis pairs from one styling value into accumulator (family => pair => true).
 *
 * @param array<string, array<string, true>> $acc   By reference.
 * @param array<string, mixed>               $value Sanitized styling payload.
 * @return void
 */
function onepress_styling_merge_google_axes_from_value_into(&$acc, $value)
{
	if (is_array($value) && isset($value['items']) && is_array($value['items'])) {
		foreach ($value['items'] as $item) {
			if (is_array($item)) {
				onepress_styling_merge_google_axes_from_value_into($acc, $item);
			}
		}
		return;
	}
	if (! is_array($value) || empty($value['_meta']['states']) || ! is_array($value['_meta']['states'])) {
		return;
	}
	$font_slices = isset($value['_meta']['fontSlices']) && is_array($value['_meta']['fontSlices']) ? $value['_meta']['fontSlices'] : array();
	foreach ($value['_meta']['states'] as $entry) {
		if (! is_array($entry) || count($entry) !== 1) {
			continue;
		}
		$state_key = sanitize_key((string) key($entry));
		if ($state_key === '') {
			continue;
		}
		$slice = isset($value[ $state_key ]) && is_array($value[ $state_key ]) ? $value[ $state_key ] : array();
		$per   = isset($font_slices[ $state_key ]) && is_array($font_slices[ $state_key ]) ? $font_slices[ $state_key ] : array();
		foreach ($per as $dev => $meta) {
			if (! is_array($meta)) {
				continue;
			}
			$decl = isset($slice[ $dev ]) ? (string) $slice[ $dev ] : '';
			$pair = onepress_styling_google_axis_pair_from_slice($decl, $meta);
			if ($pair === null) {
				continue;
			}
			$family = trim((string) ($meta['family'] ?? ''));
			if ($family === '') {
				continue;
			}
			if (! isset($acc[ $family ])) {
				$acc[ $family ] = array();
			}
			$acc[ $family ][ $pair ] = true;
		}
	}
}

/**
 * @param array<string, array<string, true>> $merged Family => unique "ital,wght" => true.
 * @return string
 */
function onepress_styling_build_google_fonts_css2_url($merged)
{
	if (empty($merged) || ! is_array($merged)) {
		return '';
	}
	ksort($merged, SORT_STRING);
	$parts = array();
	foreach ($merged as $name => $pairs_map) {
		if (! is_array($pairs_map) || empty($pairs_map)) {
			continue;
		}
		$pairs = array_keys($pairs_map);
		sort($pairs, SORT_STRING);
		$enc   = str_replace('%20', '+', rawurlencode($name));
		$parts[] = 'family=' . $enc . ':ital,wght@' . implode(';', $pairs);
	}
	if (empty($parts)) {
		return '';
	}
	return 'https://fonts.googleapis.com/css2?' . implode('&', $parts) . '&display=swap';
}

/**
 * For each Google family in the font manager map, replace styling’s axis pairs (font manager is authoritative).
 *
 * @param array<string, array<string, true>> $styling_merged Accumulator from styling theme_mods.
 * @param array<string, array<string, true>> $fm_map         From `onepress_font_manager_collect_google_axes_map_for_merge()`.
 */
function onepress_styling_apply_font_manager_google_axes_priority( array &$styling_merged, array $fm_map ) {
	foreach ( $fm_map as $family => $pairs ) {
		if ( ! is_string( $family ) || $family === '' || ! is_array( $pairs ) || array() === $pairs ) {
			continue;
		}
		$styling_merged[ $family ] = $pairs;
	}
}

// Registry configs (`*_controls_config()` only).
require_once __DIR__ . '/registry/typo-registry.php';
require_once __DIR__ . '/registry/button-registry.php';
// Shared registry helpers: theme_mod ids, base_selector maps, control lookup (`inc/styling-controls-registry.php`).
require_once __DIR__ . '/styling-controls-registry.php';

/**
 * Default theme_mod ids merged for styling CSS output and preview (typography + buttons + global demos).
 *
 * Typography / button ids: `onepress_styling_typography_theme_mod_ids()`, `onepress_styling_button_theme_mod_ids()` in `inc/styling-controls-registry.php`.
 * Demo globals: `inc/customize-configs/options-styling.php` — extend this list when adding/removing those settings.
 *
 * Filter: `onepress_styling_theme_mod_setting_ids`.
 *
 * @return list<string>
 */
function onepress_styling_default_theme_mod_setting_ids()
{
	return array_merge(
		onepress_styling_typography_theme_mod_ids(),
		onepress_styling_button_theme_mod_ids(),
		array(
			'onepress_element_styling',
			'onepress_element_styling_single',
			'onepress_element_styling_fixed_states',
		)
	);
}

/**
 * For theme_mod ids that define `base_selector` in a styling registry row
 * (`inc/registry/typo-registry.php`, `inc/registry/button-registry.php`; merged via `onepress_styling_registry_merged_base_selector_map()`),
 * force `_meta.baseSelector` so front output matches PHP config (overrides outdated saved values).
 *
 * @param string               $setting_id theme_mod key.
 * @param array<string, mixed> $value      Single-target styling payload (not `items[]` multi).
 * @return array<string, mixed>
 */
function onepress_styling_value_with_registry_base( $setting_id, $value )
{
	if ( ! is_array( $value ) ) {
		return $value;
	}
	if ( isset( $value['items'] ) && is_array( $value['items'] ) ) {
		return $value;
	}
	$id = sanitize_key( (string) $setting_id );
	if ( $id === '' ) {
		return $value;
	}
	$map = onepress_styling_registry_merged_base_selector_map();
	if ( empty( $map[ $id ] ) ) {
		return $value;
	}
	$out = $value;
	if ( ! isset( $out['_meta'] ) || ! is_array( $out['_meta'] ) ) {
		$out['_meta'] = array();
	}
	$out['_meta']['baseSelector'] = $map[ $id ];
	return $out;
}

/**
 * For registry rows (typography, buttons, …) with `base_selector` + array `styling_states`, set each matching state’s
 * `force_selector` from config: explicit template `force_selector`, else `base_selector` + template `selector`.
 *
 * @param string               $setting_id theme_mod key.
 * @param array<string, mixed> $value      Single-target styling payload (not top-level `items[]` multi).
 * @return array<string, mixed>
 *
 * Filter: `onepress_styling_value_with_registry_state_force_selectors` — ( $out, $setting_id, $value ).
 */
function onepress_styling_value_with_registry_state_force_selectors( $setting_id, $value ) {
	if ( ! is_array( $value ) ) {
		return $value;
	}
	if ( isset( $value['items'] ) && is_array( $value['items'] ) ) {
		return $value;
	}
	$id = sanitize_key( (string) $setting_id );
	if ( $id === '' ) {
		return $value;
	}
	if ( empty( $value['_meta']['states'] ) || ! is_array( $value['_meta']['states'] ) ) {
		return $value;
	}
	$ctrl = onepress_styling_registry_control_for_setting_id( $id );
	if ( ! is_array( $ctrl ) ) {
		return $value;
	}
	$base = ! empty( $ctrl['base_selector'] ) && is_string( $ctrl['base_selector'] )
		? onepress_styling_sanitize_selector( $ctrl['base_selector'] )
		: '';
	if ( $base === '' ) {
		return $value;
	}
	$tpl = isset( $ctrl['styling_states'] ) ? $ctrl['styling_states'] : null;
	if ( ! is_array( $tpl ) || array() === $tpl ) {
		return $value;
	}
	$tmpl_by_key = array();
	foreach ( $tpl as $entry ) {
		if ( ! is_array( $entry ) || count( $entry ) !== 1 ) {
			continue;
		}
		$sk = sanitize_key( (string) key( $entry ) );
		if ( $sk === '' ) {
			continue;
		}
		$row                = current( $entry );
		$tmpl_by_key[ $sk ] = is_array( $row ) ? $row : array();
	}
	if ( empty( $tmpl_by_key ) ) {
		return $value;
	}
	$out   = $value;
	$meta  = isset( $out['_meta'] ) && is_array( $out['_meta'] ) ? $out['_meta'] : array();
	$built = array();
	foreach ( $value['_meta']['states'] as $entry ) {
		if ( ! is_array( $entry ) || count( $entry ) !== 1 ) {
			$built[] = $entry;
			continue;
		}
		$sk = sanitize_key( (string) key( $entry ) );
		if ( $sk === '' || ! isset( $tmpl_by_key[ $sk ] ) ) {
			$built[] = $entry;
			continue;
		}
		$conf = current( $entry );
		if ( ! is_array( $conf ) ) {
			$built[] = $entry;
			continue;
		}
		$tmpl_row = $tmpl_by_key[ $sk ];
		$explicit = isset( $tmpl_row['force_selector'] ) ? onepress_styling_sanitize_selector( (string) $tmpl_row['force_selector'] ) : '';
		if ( $explicit !== '' ) {
			$forced = $explicit;
		} else {
			$suffix_tmpl = isset( $tmpl_row['selector'] ) ? onepress_styling_sanitize_selector( (string) $tmpl_row['selector'] ) : '';
			$forced      = onepress_styling_compose_full_selector( $base, $suffix_tmpl );
		}
		if ( $forced === '' ) {
			$built[] = $entry;
			continue;
		}
		$next                 = $conf;
		$next['force_selector'] = $forced;
		$built[]              = array( $sk => $next );
	}
	$meta['states'] = $built;
	$out['_meta']   = $meta;

	return apply_filters( 'onepress_styling_value_with_registry_state_force_selectors', $out, $setting_id, $value );
}

/**
 * Enqueue one merged Google Fonts stylesheet: all styling theme_mods + font manager registry.
 * For each Google family present in font manager, font manager’s selected variants replace styling’s pairs (no duplicate requests).
 *
 * @return void
 */
function onepress_styling_enqueue_merged_google_fonts()
{
	if (is_customize_preview()) {
		return;
	}
	$ids = apply_filters(
		'onepress_styling_theme_mod_setting_ids',
		onepress_styling_default_theme_mod_setting_ids()
	);
	if (! is_array($ids) || empty($ids)) {
		return;
	}
	$merged = array();
	foreach ($ids as $setting_id) {
		$setting_id = sanitize_key((string) $setting_id);
		if ($setting_id === '') {
			continue;
		}
		$raw = get_theme_mod($setting_id, '');
		if ($raw === '' || $raw === null) {
			continue;
		}
		$arr = is_string($raw) ? json_decode($raw, true) : $raw;
		if (! is_array($arr)) {
			continue;
		}
		$arr = onepress_styling_value_with_registry_base($setting_id, $arr);
		$arr = onepress_styling_value_with_registry_state_force_selectors($setting_id, $arr);
		onepress_styling_merge_google_axes_from_value_into($merged, $arr);
	}
	$fm_axes = onepress_font_manager_collect_google_axes_map_for_merge();
	onepress_styling_apply_font_manager_google_axes_priority( $merged, $fm_axes );
	$url = onepress_styling_build_google_fonts_css2_url($merged);
	if ($url === '') {
		return;
	}
	wp_enqueue_style('onepress-styling-google-fonts', esc_url_raw($url), array(), null);
}

add_action('wp_enqueue_scripts', 'onepress_styling_enqueue_merged_google_fonts', 19);

/**
 * Print Google Fonts preconnect hints immediately before the merged stylesheet tag.
 *
 * @param string $tag    Full HTML link tag for the enqueued style.
 * @param string $handle Style handle.
 * @param string $href   Stylesheet URL.
 * @param string $media  Media attribute.
 * @return string
 */
function onepress_styling_google_fonts_preconnect_style_tag($tag, $handle, $href, $media)
{
	if ('onepress-styling-google-fonts' !== $handle) {
		return $tag;
	}
	$gfonts  = esc_url('https://fonts.googleapis.com');
	$gstatic = esc_url('https://fonts.gstatic.com');
	$pre     = "<link rel='preconnect' href='" . $gfonts . "'>\n";
	$pre    .= "<link rel='preconnect' href='" . $gstatic . "' crossorigin>\n";
	return $pre . $tag;
}
add_filter('style_loader_tag', 'onepress_styling_google_fonts_preconnect_style_tag', 10, 4);

/**
 * Sanitize one single-target styling object (no `items` wrapper).
 *
 * @param array<string, mixed> $decoded Raw decoded JSON (may include id/title/selector — ignored).
 * @return array<string, mixed>
 */
function onepress_styling_sanitize_single_styling_object($decoded)
{
	$out = array(
		'_onepressStyling' => true,
		'_meta'            => onepress_styling_sanitize_meta(isset($decoded['_meta']) ? $decoded['_meta'] : array()),
	);

	$allowed_devices = onepress_styling_allowed_device_ids();
	$state_keys      = array();
	foreach ($out['_meta']['states'] as $entry) {
		if (is_array($entry) && count($entry) === 1) {
			$state_keys[] = sanitize_key(key($entry));
		}
	}

	foreach ($state_keys as $sk) {
		$out[ $sk ] = array();
		$slice      = isset($decoded[ $sk ]) && is_array($decoded[ $sk ]) ? $decoded[ $sk ] : array();
		foreach ($allowed_devices as $dev => $_) {
			$out[ $sk ][ $dev ] = isset($slice[ $dev ])
				? onepress_styling_coerce_device_declarations($slice[ $dev ])
				: '';
		}
	}

	$font_slices = onepress_styling_sanitize_font_slices_from_input($decoded, $state_keys, $allowed_devices);
	if (is_array($font_slices) && $font_slices !== array()) {
		$out['_meta']['fontSlices'] = $font_slices;
	}

	return $out;
}

/**
 * Sanitize one `items[]` row: id, title, selector + single-target payload.
 *
 * @param array<string, mixed> $item_raw Raw item.
 * @return array<string, mixed>|null
 */
function onepress_styling_sanitize_styling_item($item_raw)
{
	if (! is_array($item_raw)) {
		return null;
	}
	$id = isset($item_raw['id']) ? sanitize_key((string) $item_raw['id']) : '';
	if ($id === '') {
		$id = 'item-' . strtolower( wp_generate_password( 8, false, false ) );
	}
	$title = isset( $item_raw['title'] ) ? sanitize_text_field( (string) $item_raw['title'] ) : $id;
	$selector = isset( $item_raw['selector'] ) ? onepress_styling_sanitize_selector( (string) $item_raw['selector'] ) : '';

	$inner = $item_raw;
	unset( $inner['id'], $inner['title'], $inner['selector'], $inner['items'] );

	$out = onepress_styling_sanitize_single_styling_object( $inner );
	if ( $selector !== '' ) {
		$out['_meta']['baseSelector'] = $selector;
	}
	$out['id']       = $id;
	$out['title']    = $title;
	$out['selector'] = isset( $out['_meta']['baseSelector'] ) ? (string) $out['_meta']['baseSelector'] : '';

	return $out;
}

/**
 * Sanitize full styling JSON value; returns JSON string for theme_mod (single target).
 *
 * @param mixed $raw Raw from Customizer or DB.
 * @return string JSON.
 */
function onepress_sanitize_styling_value($raw)
{
	$default = onepress_styling_get_default_value();
	if ($raw === null || $raw === '') {
		return wp_json_encode($default);
	}
	if (is_string($raw)) {
		$decoded = json_decode($raw, true);
	} elseif (is_array($raw)) {
		$decoded = $raw;
	} else {
		return wp_json_encode($default);
	}
	if (! is_array($decoded)) {
		return wp_json_encode($default);
	}
	if (isset($decoded['items'])) {
		return wp_json_encode($default);
	}

	return wp_json_encode(onepress_styling_sanitize_single_styling_object($decoded));
}

/**
 * Sanitize styling JSON for controls with `styling_multiple` (always `items[]` on disk).
 *
 * @param mixed $raw Raw from Customizer or DB.
 * @return string JSON.
 */
function onepress_sanitize_styling_value_multi($raw)
{
	$default = onepress_styling_get_default_value_multiple();
	if ($raw === null || $raw === '') {
		return wp_json_encode($default);
	}
	if (is_string($raw)) {
		$decoded = json_decode($raw, true);
	} elseif (is_array($raw)) {
		$decoded = $raw;
	} else {
		return wp_json_encode($default);
	}
	if (! is_array($decoded)) {
		return wp_json_encode($default);
	}
	if (! isset($decoded['items']) || ! is_array($decoded['items'])) {
		if (isset($decoded['_meta']) && is_array($decoded['_meta'])) {
			$decoded = array(
				'_onepressStyling' => true,
				'items'            => array(onepress_styling_item_from_single_payload($decoded)),
			);
		} else {
			return wp_json_encode($default);
		}
	}
	$items_out = array();
	foreach ($decoded['items'] as $item) {
		$san = onepress_styling_sanitize_styling_item($item);
		if ($san) {
			$items_out[] = $san;
		}
	}
	return wp_json_encode(
		array(
			'_onepressStyling' => true,
			'items'            => $items_out,
		)
	);
}

/**
 * Build CSS from sanitized array value.
 *
 * @param array<string, mixed>   $value                  Styling payload.
 * @param array<int, array>|null $breakpoints            Override breakpoints.
 * @param string|null            $override_base_selector When not null, use this as base for `baseSelector + state suffix`
 *                                                     instead of `_meta.baseSelector`. States with `force_selector` ignore it.
 * @return string
 */
function onepress_styling_build_css_from_value($value, $breakpoints = null, $override_base_selector = null)
{
	if (! is_array($value)) {
		return '';
	}
	if (isset($value['items']) && is_array($value['items'])) {
		$parts = array();
		foreach ($value['items'] as $item) {
			if (is_array($item)) {
				$parts[] = onepress_styling_build_css_from_value($item, $breakpoints, $override_base_selector);
			}
		}
		return trim(implode("\n", array_filter($parts)));
	}
	if (empty($value['_meta']['states']) || ! is_array($value['_meta']['states'])) {
		return '';
	}
	$bps = $breakpoints ? $breakpoints : onepress_styling_default_breakpoints();
	$css = '';

	if (null !== $override_base_selector) {
		$base_meta = onepress_styling_sanitize_selector((string) $override_base_selector);
	} else {
		$base_meta = isset($value['_meta']['baseSelector']) ? onepress_styling_sanitize_selector((string) $value['_meta']['baseSelector']) : '';
	}

	foreach ($value['_meta']['states'] as $entry) {
		if (! is_array($entry) || count($entry) !== 1) {
			continue;
		}
		$state_key = sanitize_key(key($entry));
		$conf      = current($entry);
		$selector  = onepress_styling_resolve_state_output_selector(
			$base_meta,
			is_array($conf) ? $conf : array()
		);
		if ($selector === '' || $state_key === '') {
			continue;
		}
		$slice = isset($value[ $state_key ]) && is_array($value[ $state_key ]) ? $value[ $state_key ] : array();

		foreach ($bps as $bp) {
			$id = isset($bp['id']) ? sanitize_key($bp['id']) : '';
			if ($id === '') {
				continue;
			}
			$raw  = isset($slice[ $id ]) ? (string) $slice[ $id ] : '';
			$decl = onepress_styling_sanitize_declarations($raw);
			if ($decl === '') {
				continue;
			}
			$max = isset($bp['maxWidth']) ? onepress_styling_sanitize_length_token($bp['maxWidth']) : '';
			if ($id === 'desktop' || $max === '') {
				$css .= $selector . ' { ' . $decl . ' }' . "\n";
			} else {
				$css .= '@media (max-width: ' . $max . ') { ' . $selector . ' { ' . $decl . ' } }' . "\n";
			}
		}
	}

	return trim($css);
}

/**
 * Print inline CSS for registered theme_mods.
 *
 * Runs in Customizer preview too so the iframe gets rules on first paint (postMessage JS may run
 * before the setting value is available). Live edits still update via preview JS style tags.
 *
 * @param string|null $override_base_selector Optional. When not null, passed to `onepress_styling_build_css_from_value`
 *                                            for every setting (replaces stored base for composition; `force_selector`
 *                                            states unchanged). Filter `onepress_styling_print_theme_css_override_base`
 *                                            can set this when the function is invoked with no args (e.g. `wp_head`).
 * @return void
 */
function onepress_styling_print_theme_css($override_base_selector = null)
{
	// `do_action( 'wp_head' )` with no extra args still passes array( '' ) to callbacks (wp-includes/plugin.php).
	// Treat that like “no override” so stored `_meta.baseSelector` is used on the front.
	if ( '' === $override_base_selector ) {
		$override_base_selector = null;
	}

	/**
	 * Override base selector for inline theme styling output (all registered ids in one pass).
	 *
	 * @param string|null $override_base_selector Same semantics as `onepress_styling_print_theme_css()` argument.
	 */
	$override_base_selector = apply_filters('onepress_styling_print_theme_css_override_base', $override_base_selector);
	if ( '' === $override_base_selector ) {
		$override_base_selector = null;
	}
	if (null !== $override_base_selector && ! is_string($override_base_selector)) {
		$override_base_selector = null;
	}

	$ids = apply_filters(
		'onepress_styling_theme_mod_setting_ids',
		onepress_styling_default_theme_mod_setting_ids()
	);
	if (! is_array($ids) || empty($ids)) {
		return;
	}
	$all = '';
	foreach ($ids as $id) {
		$id = sanitize_key($id);
		if ($id === '') {
			continue;
		}
		$raw = get_theme_mod($id, '');
		if ($raw === '' || $raw === null) {
			continue;
		}
		$arr = is_string($raw) ? json_decode($raw, true) : $raw;
		if (! is_array($arr)) {
			continue;
		}
		$arr = onepress_styling_value_with_registry_base($id, $arr);
		$arr = onepress_styling_value_with_registry_state_force_selectors($id, $arr);
		$all .= onepress_styling_build_css_from_value($arr, null, $override_base_selector);
	}
	if ($all === '') {
		return;
	}
	// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- built from sanitized declaration strings and selectors only.
	echo "\n" . '<style id="onepress-styling-inline" type="text/css">' . "\n" . $all . "\n" . '</style>' . "\n";
}

add_action('wp_head', 'onepress_styling_print_theme_css', 100);
