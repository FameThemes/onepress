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
 * @param array<int, array<string, array{label?:string, selector?:string}>> $template State entries.
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
		$out['_meta']['states'][] = array(
			$sk => array(
				'label'    => $label,
				'selector' => $selector,
			),
		);
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
 * @param array<int, array<string, array{label?:string, selector?:string}>> $template State entries.
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
 * Build the full CSS selector for one state: baseSelector + per-state suffix.
 * Legacy: when base is empty, the state's selector is treated as the full selector.
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
	return $base . $suffix;
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
 * @return array{baseSelector: string, states: array<int, array<string, array{label:string, selector:string}>>}
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
		$states[] = array(
			$sk => array(
				'label'    => $label,
				'selector' => $selector,
			),
		);
	}
	if (empty($states)) {
		return $fallback;
	}
	return array(
		'baseSelector' => $base,
		'states'       => $states,
	);
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
 * Enqueue one merged Google Fonts stylesheet for all registered styling theme_mods.
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
		array(
			'onepress_element_styling',
			'onepress_element_styling_single',
			'onepress_element_styling_fixed_states',
		)
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
		onepress_styling_merge_google_axes_from_value_into($merged, $arr);
	}
	$url = onepress_styling_build_google_fonts_css2_url($merged);
	if ($url === '') {
		return;
	}
	wp_enqueue_style('onepress-styling-google-fonts', esc_url_raw($url), array(), null);
}

add_action('wp_enqueue_scripts', 'onepress_styling_enqueue_merged_google_fonts', 19);

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
	if (empty($items_out)) {
		$items_out[] = onepress_styling_sanitize_styling_item(onepress_styling_get_default_value());
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
 * @param array<string, mixed> $value       Styling payload.
 * @param array<int, array>|null $breakpoints Override breakpoints.
 * @return string
 */
function onepress_styling_build_css_from_value($value, $breakpoints = null)
{
	if (! is_array($value)) {
		return '';
	}
	if (isset($value['items']) && is_array($value['items'])) {
		$parts = array();
		foreach ($value['items'] as $item) {
			if (is_array($item)) {
				$parts[] = onepress_styling_build_css_from_value($item, $breakpoints);
			}
		}
		return trim(implode("\n", array_filter($parts)));
	}
	if (empty($value['_meta']['states']) || ! is_array($value['_meta']['states'])) {
		return '';
	}
	$bps = $breakpoints ? $breakpoints : onepress_styling_default_breakpoints();
	$css = '';

	$base_meta = isset($value['_meta']['baseSelector']) ? onepress_styling_sanitize_selector((string) $value['_meta']['baseSelector']) : '';

	foreach ($value['_meta']['states'] as $entry) {
		if (! is_array($entry) || count($entry) !== 1) {
			continue;
		}
		$state_key = sanitize_key(key($entry));
		$conf      = current($entry);
		$suffix    = isset($conf['selector']) ? onepress_styling_sanitize_selector((string) $conf['selector']) : '';
		$selector  = onepress_styling_compose_full_selector($base_meta, $suffix);
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
 * @return void
 */
function onepress_styling_print_theme_css()
{
	$ids = apply_filters(
		'onepress_styling_theme_mod_setting_ids',
		array(
			'onepress_element_styling',
			'onepress_element_styling_single',
			'onepress_element_styling_fixed_states',
		)
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
		$all .= onepress_styling_build_css_from_value($arr);
	}
	if ($all === '') {
		return;
	}
	// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- built from sanitized declaration strings and selectors only.
	echo "\n" . '<style id="onepress-styling-inline" type="text/css">' . "\n" . $all . "\n" . '</style>' . "\n";
}

add_action('wp_head', 'onepress_styling_print_theme_css', 100);
