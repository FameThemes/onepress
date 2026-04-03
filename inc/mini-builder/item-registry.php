<?php
/**
 * Mini-builder item discovery, schema-based sanitize, and render templates.
 *
 * @package OnePress
 */

defined( 'ABSPATH' ) || exit;

/**
 * Folder basenames under items/ that are skipped (samples, etc.).
 *
 * @return string[]
 */
function onepress_mini_builder_skip_item_dirnames() {
	return apply_filters(
		'onepress_mini_builder_skip_item_dirnames',
		array( 'example', '_example' )
	);
}

/**
 * @return array<string, array<string, mixed>> slug => options.php return
 */
function onepress_mini_builder_get_item_configs() {
	static $configs = null;
	if ( null !== $configs ) {
		return $configs;
	}
	$configs = array();
	$root    = ONEPRESS_MINI_BUILDER_DIR . '/items';
	$root    = wp_normalize_path( $root );
	$skip    = array_fill_keys( onepress_mini_builder_skip_item_dirnames(), true );
	if ( ! is_dir( $root ) ) {
		return $configs;
	}
	foreach ( glob( $root . '/*', GLOB_ONLYDIR ) ?: array() as $dir ) {
		$slug = basename( $dir );
		if ( isset( $skip[ $slug ] ) ) {
			continue;
		}
		$file = trailingslashit( $dir ) . 'options.php';
		if ( ! is_readable( $file ) ) {
			continue;
		}
		/** @noinspection PhpIncludeInspection */
		$data = include $file;
		if ( ! is_array( $data ) || empty( $data['type'] ) ) {
			continue;
		}
		$configs[ $slug ] = $data;
	}
	return $configs;
}

/**
 * @return array<string, string> block type => folder slug
 */
function onepress_mini_builder_get_discovered_type_map() {
	$map = array();
	foreach ( onepress_mini_builder_get_item_configs() as $slug => $config ) {
		$type = (string) $config['type'];
		$map[ $type ] = $slug;
	}
	return $map;
}

/**
 * @param string $slug Folder name.
 * @return array<string, mixed>|null
 */
function onepress_mini_builder_get_item_config( $slug ) {
	$configs = onepress_mini_builder_get_item_configs();
	return isset( $configs[ $slug ] ) ? $configs[ $slug ] : null;
}

/**
 * @param string $type Block type e.g. onepress/text.
 * @return array<string, mixed>|null
 */
function onepress_mini_builder_get_config_for_type( $type ) {
	$map = apply_filters( 'onepress_mini_builder_type_slugs', onepress_mini_builder_get_discovered_type_map() );
	if ( ! isset( $map[ $type ] ) ) {
		return null;
	}
	return onepress_mini_builder_get_item_config( (string) $map[ $type ] );
}

/**
 * Admin field lists keyed by block type (React inspector).
 *
 * @return array<string, array<int, array<string, mixed>>>
 */
function onepress_mini_builder_get_block_options_schemas() {
	$out = array();
	foreach ( onepress_mini_builder_get_item_configs() as $config ) {
		$type = (string) $config['type'];
		$opts = isset( $config['options'] ) && is_array( $config['options'] )
			? array_values( $config['options'] )
			: array();
		$out[ $type ] = $opts;
	}
	return apply_filters( 'onepress_mini_builder_block_options_schemas', $out );
}

/**
 * Item metadata for wp_localize_script (React registry).
 *
 * @return array<int, array<string, mixed>>
 */
function onepress_mini_builder_get_item_templates_for_js() {
	$list = array();
	foreach ( onepress_mini_builder_get_item_configs() as $config ) {
		$list[] = array(
			'type'         => (string) $config['type'],
			'label'        => isset( $config['label'] ) ? (string) $config['label'] : '',
			'category'     => isset( $config['category'] ) ? (string) $config['category'] : 'layout',
			'kind'         => isset( $config['kind'] ) ? (string) $config['kind'] : 'leaf',
			'icon'         => isset( $config['icon'] ) ? (string) $config['icon'] : 'layout',
			'defaultProps' => isset( $config['defaultProps'] ) && is_array( $config['defaultProps'] )
				? $config['defaultProps']
				: array(),
		);
	}
	return apply_filters( 'onepress_mini_builder_item_templates_for_js', $list );
}

/**
 * @param array<string, mixed> $field Field schema.
 * @param mixed                $raw   Raw value from props.
 * @return mixed
 */
function onepress_mini_builder_sanitize_field_value( $field, $raw ) {
	if ( ! is_array( $field ) ) {
		return null;
	}
	$ftype = isset( $field['type'] ) ? (string) $field['type'] : 'text';
	switch ( $ftype ) {
		case 'onepress_columns':
			return null;
		case 'textarea':
			return sanitize_textarea_field( (string) ( null === $raw ? '' : $raw ) );
		case 'editor':
			return wp_kses_post( (string) ( null === $raw ? '' : $raw ) );
		case 'text':
		case 'color':
			$s = sanitize_text_field( (string) ( null === $raw ? '' : $raw ) );
			if ( 'color' === $ftype && $s !== '' && ! preg_match( '/^#([a-f0-9]{3}|[a-f0-9]{6}|[a-f0-9]{8})$/i', $s ) ) {
				return '';
			}
			return $s;
		case 'radio':
		case 'select':
			$v = sanitize_text_field( (string) ( null === $raw ? '' : $raw ) );
			if ( $v === '' && isset( $field['default'] ) ) {
				$v = (string) $field['default'];
			}
			$allowed = onepress_mini_builder_field_allowed_values( $field );
			if ( array() !== $allowed && ! in_array( $v, $allowed, true ) ) {
				$v = isset( $field['default'] )
					? (string) $field['default']
					: ( isset( $allowed[0] ) ? $allowed[0] : '' );
			}
			if ( isset( $field['valueType'] ) && 'number' === $field['valueType'] ) {
				$n = (int) $v;
				if ( isset( $field['min'] ) ) {
					$n = max( (int) $field['min'], $n );
				}
				if ( isset( $field['max'] ) ) {
					$n = min( (int) $field['max'], $n );
				}
				return $n;
			}
			return $v;
		case 'switch':
		case 'toggle':
			return (bool) $raw;
		case 'slider':
		case 'range':
			$min  = isset( $field['min'] ) ? (int) $field['min'] : 0;
			$max  = isset( $field['max'] ) ? (int) $field['max'] : 100;
			$step = isset( $field['step'] ) ? (int) $field['step'] : 1;
			if ( $step < 1 ) {
				$step = 1;
			}
			$n = (int) ( null === $raw ? ( isset( $field['default'] ) ? $field['default'] : $min ) : $raw );
			$n = min( $max, max( $min, $n ) );
			if ( $step > 1 ) {
				$n = (int) ( round( $n / $step ) * $step );
				$n = min( $max, max( $min, $n ) );
			}
			return $n;
		case 'image':
			$id = absint( $raw );
			return $id > 0 ? $id : 0;
		case 'gallery':
			if ( is_string( $raw ) && $raw !== '' ) {
				$decoded = json_decode( $raw, true );
				$raw     = is_array( $decoded ) ? $decoded : array();
			}
			if ( ! is_array( $raw ) ) {
				$raw = array();
			}
			$ids = array();
			foreach ( $raw as $x ) {
				$i = absint( $x );
				if ( $i > 0 ) {
					$ids[] = $i;
				}
			}
			return array_values( array_unique( $ids ) );
		case 'checkbox':
			$allowed = onepress_mini_builder_field_allowed_values( $field );
			if ( ! is_array( $raw ) ) {
				$raw = array();
			}
			$out = array();
			if ( array() === $allowed ) {
				return $out;
			}
			foreach ( $raw as $x ) {
				$s = sanitize_text_field( (string) $x );
				if ( in_array( $s, $allowed, true ) ) {
					$out[] = $s;
				}
			}
			return array_values( array_unique( $out ) );
		default:
			$name = isset( $field['name'] ) ? (string) $field['name'] : '';
			if ( $name === '' ) {
				return null;
			}
			if ( is_array( $raw ) ) {
				return array_map( 'sanitize_text_field', array_map( 'strval', $raw ) );
			}
			return sanitize_text_field( (string) ( null === $raw ? '' : $raw ) );
	}
}

/**
 * @param array<string, mixed> $field Field with options list.
 * @return string[]
 */
function onepress_mini_builder_field_allowed_values( $field ) {
	if ( ! isset( $field['options'] ) || ! is_array( $field['options'] ) ) {
		return array();
	}
	$out = array();
	foreach ( $field['options'] as $o ) {
		if ( is_array( $o ) && isset( $o['value'] ) ) {
			$out[] = (string) $o['value'];
		}
	}
	return $out;
}

/**
 * @param array<int, array<string, mixed>> $schema_fields options[] from item config.
 * @param array<string, mixed>             $props         Raw props.
 * @param string                           $kind          section|columns|leaf.
 * @return array<string, mixed>
 */
function onepress_mini_builder_sanitize_props_by_schema( $schema_fields, $props, $kind ) {
	if ( ! is_array( $props ) ) {
		$props = array();
	}
	$out = array();
	if ( is_array( $schema_fields ) ) {
		foreach ( $schema_fields as $field ) {
			if ( ! is_array( $field ) ) {
				continue;
			}
			$ftype = isset( $field['type'] ) ? (string) $field['type'] : '';
			if ( 'onepress_columns' === $ftype ) {
				continue;
			}
			$name = isset( $field['name'] ) ? (string) $field['name'] : '';
			if ( $name === '' ) {
				continue;
			}
			$raw            = array_key_exists( $name, $props ) ? $props[ $name ] : null;
			$san            = onepress_mini_builder_sanitize_field_value( $field, $raw );
			$out[ $name ] = $san;
		}
	}
	if ( 'columns' === $kind ) {
		$out = array_merge( $out, onepress_mini_builder_normalize_column_layout_props( $props ) );
	}
	return $out;
}

/**
 * columnCount + columnWidths from raw props (virtual onepress_columns field).
 *
 * @param array<string, mixed> $props Raw props.
 * @return array<string, mixed>
 */
function onepress_mini_builder_normalize_column_layout_props( $props ) {
	if ( ! is_array( $props ) ) {
		$props = array();
	}
	$count = isset( $props['columnCount'] ) ? (int) $props['columnCount'] : 2;
	$count = min( 6, max( 2, $count ) );
	$raw_w = isset( $props['columnWidths'] ) && is_array( $props['columnWidths'] ) ? $props['columnWidths'] : array();
	$widths = array();
	for ( $i = 0; $i < $count; $i++ ) {
		$w        = isset( $raw_w[ $i ] ) ? (int) $raw_w[ $i ] : (int) round( 100 / $count );
		$widths[] = min( 100, max( 1, $w ) );
	}
	$sum = array_sum( $widths );
	if ( $sum > 0 ) {
		$norm = array();
		foreach ( $widths as $w ) {
			$norm[] = (int) round( ( $w / $sum ) * 100 );
		}
		$drift = 100 - array_sum( $norm );
		if ( array() !== $norm ) {
			$norm[ count( $norm ) - 1 ] += $drift;
		}
		$widths = $norm;
	} else {
		$base = (int) floor( 100 / $count );
		$widths = array_fill( 0, $count, $base );
		$widths[ $count - 1 ] = 100 - $base * ( $count - 1 );
	}
	return array(
		'columnCount'  => $count,
		'columnWidths' => $widths,
	);
}

/**
 * Run items/{slug}/render.php with sanitized $node in scope.
 *
 * @param string               $slug Folder slug.
 * @param array<string, mixed> $node Sanitized node.
 * @return string
 */
function onepress_mini_builder_render_item_file( $slug, $node ) {
	$path = ONEPRESS_MINI_BUILDER_DIR . '/items/' . $slug . '/render.php';
	if ( ! is_readable( $path ) ) {
		return '';
	}
	ob_start();
	// phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.UsingVariable
	include $path;
	return ob_get_clean();
}
