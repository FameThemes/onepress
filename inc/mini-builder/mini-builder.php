<?php
/**
 * Customizer: layout mini-builder (theme_mod JSON tree).
 *
 * Each block: items/{slug}/options.php returns config (type, label, kind, icon, defaultProps, options[]); items/{slug}/render.php is plain PHP with $node (sanitized).
 * item-registry.php: discovery, schema-based sanitize, render include. Localized: blockOptionsSchemas, itemTemplates.
 * Paired with `src/admin/builder-customizer/`.
 *
 * @package OnePress
 */

defined( 'ABSPATH' ) || exit;

if ( ! defined( 'ONEPRESS_MINI_BUILDER_DIR' ) ) {
	define( 'ONEPRESS_MINI_BUILDER_DIR', __DIR__ );
}

require_once ONEPRESS_MINI_BUILDER_DIR . '/item-registry.php';

define( 'ONEPRESS_BUILDER_SETTING', 'onepress_builder_tree' );
define( 'ONEPRESS_BUILDER_SECTION', 'onepress_builder_section' );
define( 'ONEPRESS_BUILDER_CONTROL', 'onepress_builder_tree' );

/**
 * Map builder type (onepress/…) to item folder basename (from each items folder options.php type key).
 *
 * @return array<string, string>
 */
function onepress_mini_builder_type_slugs() {
	$discovered = onepress_mini_builder_get_discovered_type_map();
	if ( array() === $discovered ) {
		$discovered = array(
			'onepress/section' => 'section',
			'onepress/columns' => 'columns',
			'onepress/text'    => 'text',
			'onepress/heading' => 'heading',
		);
	}
	return apply_filters( 'onepress_mini_builder_type_slugs', $discovered );
}

/**
 * @param string $type Block type.
 * @return string|null Item folder slug or null.
 */
function onepress_mini_builder_type_to_slug( $type ) {
	$map = onepress_mini_builder_type_slugs();
	return isset( $map[ $type ] ) ? (string) $map[ $type ] : null;
}

/**
 * Allowed builder node types (extend via filter).
 *
 * @return array<string, true>
 */
function onepress_builder_allowed_types() {
	$types = array_fill_keys( array_keys( onepress_mini_builder_type_slugs() ), true );
	return apply_filters( 'onepress_builder_allowed_types', $types );
}

/**
 * Default tree JSON.
 *
 * @return string
 */
function onepress_builder_default_json() {
	$tree = array(
		'v'    => 1,
		'root' => array(
			'id'       => 'root',
			'type'     => 'onepress/section',
			'props'    => array(),
			'children' => array(),
		),
	);
	return wp_json_encode( $tree );
}

/**
 * @param array<string, mixed> $props Raw props.
 * @return array<string, mixed>
 */
function onepress_builder_sanitize_props_for_type( $type, $props ) {
	$props = is_array( $props ) ? $props : array();
	$config = onepress_mini_builder_get_config_for_type( $type );
	if ( ! $config ) {
		return apply_filters( 'onepress_builder_sanitize_props', array(), $type, $props );
	}
	$schema = isset( $config['options'] ) && is_array( $config['options'] ) ? $config['options'] : array();
	$kind   = isset( $config['kind'] ) ? (string) $config['kind'] : 'leaf';
	$out    = onepress_mini_builder_sanitize_props_by_schema( $schema, $props, $kind );
	return apply_filters( 'onepress_builder_sanitize_props', $out, $type, $props );
}

/**
 * @param mixed                $node Raw node.
 * @param array<string, true>  $allowed Allowed types map.
 * @return array<string, mixed>|null
 */
function onepress_builder_sanitize_node( $node, $allowed ) {
	if ( ! is_array( $node ) ) {
		return null;
	}
	$type = isset( $node['type'] ) ? (string) $node['type'] : '';
	if ( $type === '' || ! isset( $allowed[ $type ] ) ) {
		return null;
	}
	$id = isset( $node['id'] ) ? sanitize_text_field( (string) $node['id'] ) : (string) wp_generate_uuid4();
	if ( $id === '' ) {
		$id = (string) wp_generate_uuid4();
	}
	$props = onepress_builder_sanitize_props_for_type(
		$type,
		isset( $node['props'] ) ? $node['props'] : array()
	);

	$out = array(
		'id'    => $id,
		'type'  => $type,
		'props' => $props,
	);

	if ( 'onepress/section' === $type ) {
		$out['children'] = array();
		if ( isset( $node['children'] ) && is_array( $node['children'] ) ) {
			foreach ( $node['children'] as $child ) {
				$san = onepress_builder_sanitize_node( $child, $allowed );
				if ( null !== $san ) {
					$out['children'][] = $san;
				}
			}
		}
		return $out;
	}

	if ( 'onepress/columns' === $type ) {
		$count       = isset( $props['columnCount'] ) ? (int) $props['columnCount'] : 2;
		$out['columns'] = array();
		$source_cols    = isset( $node['columns'] ) && is_array( $node['columns'] ) ? $node['columns'] : array();
		for ( $i = 0; $i < $count; $i++ ) {
			$col_in = isset( $source_cols[ $i ] ) && is_array( $source_cols[ $i ] ) ? $source_cols[ $i ] : array();
			$col_id = isset( $col_in['id'] ) ? sanitize_text_field( (string) $col_in['id'] ) : 'col-' . ( $i + 1 );
			if ( $col_id === '' ) {
				$col_id = 'col-' . ( $i + 1 );
			}
			$col_children = array();
			if ( isset( $col_in['children'] ) && is_array( $col_in['children'] ) ) {
				foreach ( $col_in['children'] as $child ) {
					$san = onepress_builder_sanitize_node( $child, $allowed );
					if ( null !== $san ) {
						$col_children[] = $san;
					}
				}
			}
			$out['columns'][] = array(
				'id'       => $col_id,
				'children' => $col_children,
			);
		}
		return $out;
	}

	return $out;
}

/**
 * Sanitize full builder theme_mod JSON.
 *
 * @param mixed $value Raw.
 * @return string JSON.
 */
function onepress_sanitize_builder_tree( $value ) {
	if ( is_array( $value ) ) {
		$value = wp_json_encode( $value );
	}
	if ( ! is_string( $value ) ) {
		return onepress_builder_default_json();
	}
	$decoded = json_decode( wp_unslash( $value ), true );
	if ( ! is_array( $decoded ) ) {
		return onepress_builder_default_json();
	}
	$allowed = onepress_builder_allowed_types();
	$v       = isset( $decoded['v'] ) ? (int) $decoded['v'] : 1;
	$root_in = isset( $decoded['root'] ) ? $decoded['root'] : null;
	$root    = onepress_builder_sanitize_node(
		is_array( $root_in ) ? $root_in : array(),
		$allowed
	);
	if ( null === $root || 'onepress/section' !== $root['type'] ) {
		$root = json_decode( onepress_builder_default_json(), true );
		$root = $root['root'];
	}
	$out = array(
		'v'    => $v,
		'root' => $root,
	);
	return wp_json_encode( $out );
}

/**
 * Parsed theme_mod for templates.
 *
 * @return array{v:int,root:array}
 */
function onepress_get_builder_tree() {
	$raw = get_theme_mod( ONEPRESS_BUILDER_SETTING, onepress_builder_default_json() );
	if ( is_array( $raw ) ) {
		$decoded = $raw;
	} else {
		$decoded = json_decode( (string) $raw, true );
	}
	if ( ! is_array( $decoded ) || ! isset( $decoded['root'] ) ) {
		$decoded = json_decode( onepress_builder_default_json(), true );
	}
	return $decoded;
}

/**
 * Register customize control class (loads WP base first).
 */
function onepress_register_builder_tree_control_class() {
	if ( class_exists( 'OnePress_Builder_Tree_Customize_Control', false ) ) {
		return;
	}
	require_once ABSPATH . WPINC . '/class-wp-customize-control.php';

	/**
	 * React root mount for the layout builder.
	 */
	class OnePress_Builder_Tree_Customize_Control extends WP_Customize_Control {

		public $type = 'onepress_builder_tree';

		/**
		 * Pane UI is rendered via JS template when the type is registered with the manager.
		 */
		public function render_content() {}

		/**
		 * Underscore template — required for Customizer JS; PHP render_content is not used in the pane.
		 */
		protected function content_template() {
			?>
			<div class="onepress-builder-react-control">
				<# if ( data.label ) { #>
					<span class="customize-control-title">{{ data.label }}</span>
				<# } #>
				<div class="customize-control-notifications-container"></div>
				<# if ( data.description ) { #>
					<span class="description customize-control-description">{{{ data.description }}}</span>
				<# } #>
				<div
					class="onepress-builder-root"
					data-onepress-app="onepress-builder"
					data-setting="{{ data.settings.default }}"
					data-control-id="{{ data.id }}"
					data-section-id="{{ data.section }}"
				></div>
			</div>
			<?php
		}
	}
}
add_action( 'customize_register', 'onepress_register_builder_tree_control_class', 0 );

/**
 * @param WP_Customize_Manager $wp_customize Manager.
 */
function onepress_register_builder_tree_customize( $wp_customize ) {
	static $builder_type_registered = false;
	if ( ! $builder_type_registered ) {
		$wp_customize->register_control_type( 'OnePress_Builder_Tree_Customize_Control' );
		$builder_type_registered = true;
	}

	$wp_customize->add_section(
		ONEPRESS_BUILDER_SECTION,
		array(
			'title'       => __( 'Layout builder', 'onepress' ),
			'description' => __( 'Description here' ),
			'priority'    => 201,
		)
	);

	$wp_customize->add_setting(
		ONEPRESS_BUILDER_SETTING,
		array(
			'default'           => onepress_builder_default_json(),
			'type'              => 'theme_mod',
			'transport'         => 'refresh',
			'sanitize_callback' => 'onepress_sanitize_builder_tree',
		)
	);

	$wp_customize->add_control(
		new OnePress_Builder_Tree_Customize_Control(
			$wp_customize,
			ONEPRESS_BUILDER_CONTROL,
			array(
				'label'       => __( 'Page structure', 'onepress' ),
				'description' => __( 'Built-in blocks: section, columns, heading, text.', 'onepress' ),
				'section'     => ONEPRESS_BUILDER_SECTION,
				'settings'    => ONEPRESS_BUILDER_SETTING,
			)
		)
	);
}
add_action( 'customize_register', 'onepress_register_builder_tree_customize', 21 );

/**
 * Render one builder node (extend with filter `onepress_builder_render_node`).
 *
 * @param array<string, mixed> $node Sanitized tree node.
 * @return string HTML.
 */
function onepress_render_builder_node_html( $node ) {
	if ( ! is_array( $node ) || empty( $node['type'] ) ) {
		return '';
	}
	$filtered = apply_filters( 'onepress_builder_render_node', '', $node, array() );
	if ( is_string( $filtered ) && $filtered !== '' ) {
		return $filtered;
	}

	$type = (string) $node['type'];
	$slug = onepress_mini_builder_type_to_slug( $type );
	if ( $slug ) {
		$html = onepress_mini_builder_render_item_file( $slug, $node );
		if ( is_string( $html ) && $html !== '' ) {
			return $html;
		}
	}

	return '';
}

/**
 * Full builder HTML (root section and descendants).
 *
 * @return string HTML.
 */
function onepress_render_builder_tree_html() {
	$data = onepress_get_builder_tree();
	if ( empty( $data['root'] ) || ! is_array( $data['root'] ) ) {
		return '';
	}
	return onepress_render_builder_node_html( $data['root'] );
}

/**
 * Enqueue webpack bundle `assets/admin/builder-customizer(.minified).js`.
 */
function onepress_builder_customizer_enqueue_scripts() {
	wp_enqueue_editor();
	$handle = onepress_load_build_script( 'builder-customizer', array( 'customize-controls', 'editor' ), true );
	if ( $handle ) {
		wp_localize_script(
			$handle,
			'onepressMiniBuilder',
			array(
				'blockOptionsSchemas' => onepress_mini_builder_get_block_options_schemas(),
				'itemTemplates'       => onepress_mini_builder_get_item_templates_for_js(),
			)
		);
	}
	wp_enqueue_style( 'wp-components' );
	wp_enqueue_style( 'dashicons' );
}
add_action( 'customize_controls_enqueue_scripts', 'onepress_builder_customizer_enqueue_scripts', 25 );
