<?php
/**
 * Customizer control: element styling (JSON, state × device declaration strings).
 *
 * @package OnePress
 */

/**
 * Class Onepress_Customize_Styling_Control
 */
class Onepress_Customize_Styling_Control extends WP_Customize_Control
{

	/**
	 * Control type.
	 *
	 * @var string
	 */
	public $type = 'styling';

	/**
	 * Breakpoint definitions for UI + build (id, label, maxWidth).
	 *
	 * @var array<int, array<string, string>>
	 */
	public $styling_breakpoints = array();

	/**
	 * When true, setting value uses `{ items: [ { id, title, selector, _meta, … } ] }`.
	 *
	 * @var bool
	 */
	public $styling_multiple = false;

	/**
	 * State UI policy: string 'all' (full manage UI), false (normal only, hide state tabs), or a fixed
	 * `_meta.states`-shaped array (no add/remove custom states; labels/suffixes still editable).
	 *
	 * @var 'all'|false|array<int, array<string, array{label?: string, selector?: string, force_selector?: string}>>
	 */
	public $styling_states = 'all';

	/**
	 * When false, the base CSS selector field is read-only in the editor.
	 *
	 * @var bool
	 */
	public $editable_base_selector = true;

	/**
	 * Limit accordion groups in the editor, or null for all. Valid ids: text, background, spacing,
	 * border, shadow, display, raw. Order follows this array. One id only = that panel stays open (header non-interactive).
	 *
	 * @var list<string>|null
	 */
	public $styling_groups = null;

	/**
	 * When `styling_multiple` is false, optional fixed base CSS selector. If non-empty, the Customizer UI
	 * hides the selector field and the saved value is kept in sync with this string.
	 *
	 * @var string
	 */
	public $base_selector = '';

	/**
	 * Field ids to hide in the styling UI (model camelCase keys and/or composite aliases, see theme docs).
	 * Each entry is passed through sanitize_key before JSON.
	 *
	 * @var list<string>
	 */
	public $disable_fields = array();

	/**
	 * Legacy: when true, hides both inline toolbar action buttons (settings gear and preview pick).
	 * Prefer `styling_hide_gear_button` and `styling_hide_preview_pick_button` for separate control.
	 *
	 * @var bool
	 */
	public $styling_hide_popover_heading = false;

	/**
	 * When true, hide the settings (gear) button and the settings popover entry point.
	 *
	 * @var bool
	 */
	public $styling_hide_gear_button = false;

	/**
	 * When true, hide the “pick selector from preview” toolbar button.
	 *
	 * @var bool
	 */
	public $styling_hide_preview_pick_button = false;

	/**
	 * When true, hide the state tablist toolbar in the editor popover.
	 *
	 * @var bool
	 */
	public $styling_hide_state_tablist = false;

	/**
	 * Font family picker: `local` (Font manager list) or `google` (full catalog).
	 *
	 * @var 'google'|'local'
	 */
	public $styling_font_family_source = 'local';

	/**
	 * When `styling_multiple` is true, label for the “Add item” button (Customizer UI). Empty = JS default “Add item”.
	 *
	 * @var string
	 */
	public $add_item_label = '';

	/**
	 * Preset target elements for this control only: categories (slug => label) + elements list.
	 * Same shape as `onepress_styling_typography_target_elements_registry()`. Null = empty presets in JS.
	 *
	 * @var array{categories: array<string, string>, elements: list<array{id: string, selector: string, name: string, category: string}>}|null
	 */
	public $styling_target_elements = null;

	/**
	 * Constructor.
	 *
	 * @param WP_Customize_Manager $manager Manager.
	 * @param string               $id      Control id.
	 * @param array                $args    Args.
	 */
	public function __construct($manager, $id, $args = array())
	{
		if (isset($args['styling_breakpoints']) && is_array($args['styling_breakpoints'])) {
			$this->styling_breakpoints = $args['styling_breakpoints'];
		} else {
			$this->styling_breakpoints = onepress_styling_default_breakpoints();
		}
		if (isset($args['styling_multiple'])) {
			$this->styling_multiple = (bool) $args['styling_multiple'];
		}
		$this->base_selector = '';
		if ( ! $this->styling_multiple && isset( $args['base_selector'] ) ) {
			$this->base_selector = sanitize_text_field( wp_unslash( (string) $args['base_selector'] ) );
		}
		if (array_key_exists('styling_states', $args)) {
			$this->styling_states = $args['styling_states'];
		}
		if (isset($args['editable_base_selector'])) {
			$this->editable_base_selector = (bool) $args['editable_base_selector'];
		}
		if (isset($args['styling_groups']) && is_array($args['styling_groups'])) {
			$allowed = array( 'text', 'background', 'spacing', 'border', 'shadow', 'display', 'raw' );
			$clean   = array();
			foreach ( $args['styling_groups'] as $gid ) {
				$k = sanitize_key( (string) $gid );
				if ( $k !== '' && in_array( $k, $allowed, true ) ) {
					$clean[] = $k;
				}
			}
			$this->styling_groups = $clean !== array()
				? array_values( array_unique( $clean, SORT_REGULAR ) )
				: null;
		}
		if ( isset( $args['disable_fields'] ) && is_array( $args['disable_fields'] ) ) {
			$df = array();
			foreach ( $args['disable_fields'] as $fid ) {
				$k = sanitize_key( (string) $fid );
				if ( $k !== '' ) {
					$df[] = $k;
				}
			}
			$this->disable_fields = array_values( array_unique( $df, SORT_REGULAR ) );
		}
		if ( isset( $args['styling_hide_popover_heading'] ) ) {
			$this->styling_hide_popover_heading = (bool) $args['styling_hide_popover_heading'];
		}
		if ( isset( $args['styling_hide_gear_button'] ) ) {
			$this->styling_hide_gear_button = (bool) $args['styling_hide_gear_button'];
		}
		if ( isset( $args['styling_hide_preview_pick_button'] ) ) {
			$this->styling_hide_preview_pick_button = (bool) $args['styling_hide_preview_pick_button'];
		}
		if ( isset( $args['styling_hide_state_tablist'] ) ) {
			$this->styling_hide_state_tablist = (bool) $args['styling_hide_state_tablist'];
		}
		if ( isset( $args['styling_font_family_source'] ) ) {
			$src = sanitize_key( (string) $args['styling_font_family_source'] );
			$this->styling_font_family_source = ( 'google' === $src ) ? 'google' : 'local';
		}
		if ( isset( $args['add_item_label'] ) ) {
			$this->add_item_label = sanitize_text_field( wp_unslash( (string) $args['add_item_label'] ) );
		}
		if ( isset( $args['styling_target_elements'] ) && is_array( $args['styling_target_elements'] ) ) {
			$this->styling_target_elements = onepress_styling_sanitize_control_target_elements( $args['styling_target_elements'] );
		}
		parent::__construct($manager, $id, $args);
	}

	/**
	 * Pass data to customize JS.
	 */
	public function to_json()
	{
		parent::to_json();
		$raw = $this->value();
		if (is_array($raw)) {
			$decoded = $raw;
		} elseif (is_string($raw) && $raw !== '') {
			$decoded = json_decode($raw, true);
		} else {
			$decoded = null;
		}
		if (! is_array($decoded)) {
			$decoded = $this->styling_multiple
				? onepress_styling_get_default_value_multiple()
				: onepress_styling_get_default_value();
		}
		if ($this->styling_multiple && is_array($decoded)) {
			if (isset($decoded['items']) && is_array($decoded['items']) && $decoded['items'] === array()) {
				$decoded = onepress_styling_get_default_value_multiple();
			} elseif (! isset($decoded['items']) && isset($decoded['_meta'])) {
				$decoded = array(
					'_onepressStyling' => true,
					'items'            => array( onepress_styling_item_from_single_payload( $decoded ) ),
				);
			}
		}
		$this->json['value'] = $decoded;

		if ($this->styling_multiple) {
			$default_for_js = onepress_styling_get_default_value_multiple();
			$sdef           = $this->setting->default;
			$from_setting   = null;
			if ( is_string( $sdef ) && $sdef !== '' ) {
				$from_setting = json_decode( $sdef, true );
			} elseif ( is_array( $sdef ) ) {
				$from_setting = $sdef;
			}
			if (
				is_array( $from_setting )
				&& isset( $from_setting['items'] )
				&& is_array( $from_setting['items'] )
				&& $from_setting['items'] !== array()
			) {
				$default_for_js = $from_setting;
			}
		} elseif (false === $this->styling_states) {
			$default_for_js = onepress_styling_get_default_value_normal_only();
		} elseif (is_array($this->styling_states) && $this->styling_states !== array()) {
			$default_for_js = onepress_styling_get_default_value_from_states_template($this->styling_states);
		} else {
			$default_for_js = onepress_styling_get_default_value();
		}
		$this->json['default_value'] = $default_for_js;
		$this->json['styling_breakpoints'] = $this->styling_breakpoints;
		$this->json['styling_multiple']    = $this->styling_multiple;
		$this->json['styling_states']         = $this->styling_states;
		$this->json['editable_base_selector'] = $this->editable_base_selector;
		$this->json['styling_groups']         = $this->styling_groups;
		$this->json['base_selector']          = $this->styling_multiple ? '' : (string) $this->base_selector;
		$this->json['disable_fields']         = $this->disable_fields;
		$this->json['styling_hide_popover_heading']         = $this->styling_hide_popover_heading;
		$this->json['styling_hide_gear_button']             = $this->styling_hide_gear_button;
		$this->json['styling_hide_preview_pick_button']     = $this->styling_hide_preview_pick_button;
		$this->json['styling_hide_state_tablist']           = $this->styling_hide_state_tablist;
		$this->json['styling_font_family_source']   = $this->styling_font_family_source;
		$this->json['add_item_label']               = (string) $this->add_item_label;
		$this->json['preview_device_ids']     = onepress_styling_preview_device_ids();
		$targets                               = $this->styling_target_elements;
		if ( ! is_array( $targets ) ) {
			$targets = array(
				'categories' => array(),
				'elements'   => array(),
			);
		}
		$this->json['styling_target_elements'] = $targets;
	}

	/**
	 * Render minimal chrome; React mounts into root.
	 */
	public function render_content()
	{
		?>
		
		<input type="hidden" <?php $this->link(); ?> value="" />
		<div class="form-data onepress-styling">
			<div class="styling-root" id="onepress-styling-<?php echo esc_attr($this->id); ?>"></div>
		</div>
		<?php
	}
}

/**
 * Sanitize preset target registry for Customizer JSON (`styling_target_elements` control arg).
 *
 * @param array<string, mixed> $raw Raw categories + elements.
 * @return array{categories: array<string, string>, elements: list<array{id: string, selector: string, name: string, category: string}>}
 */
function onepress_styling_sanitize_control_target_elements( $raw ) {
	if ( ! is_array( $raw ) ) {
		return array(
			'categories' => array(),
			'elements'   => array(),
		);
	}
	$categories = array();
	if ( isset( $raw['categories'] ) && is_array( $raw['categories'] ) ) {
		foreach ( $raw['categories'] as $k => $v ) {
			$sk = sanitize_key( (string) $k );
			if ( $sk === '' ) {
				continue;
			}
			$categories[ $sk ] = sanitize_text_field( wp_unslash( (string) $v ) );
		}
	}
	$elements = array();
	if ( isset( $raw['elements'] ) && is_array( $raw['elements'] ) ) {
		foreach ( $raw['elements'] as $row ) {
			if ( ! is_array( $row ) ) {
				continue;
			}
			$id       = isset( $row['id'] ) ? sanitize_key( (string) wp_unslash( $row['id'] ) ) : '';
			$selector = isset( $row['selector'] ) ? onepress_styling_sanitize_selector( (string) $row['selector'] ) : '';
			$name     = isset( $row['name'] ) ? sanitize_text_field( wp_unslash( (string) $row['name'] ) ) : '';
			$category = isset( $row['category'] ) ? sanitize_key( (string) $row['category'] ) : 'other';
			if ( $category === '' ) {
				$category = 'other';
			}
			if ( $selector === '' || $name === '' ) {
				continue;
			}
			if ( $id === '' ) {
				$id = strlen( $selector ) <= 200 ? $selector : substr( $selector, 0, 200 );
			}
			$elements[] = array(
				'id'       => $id,
				'selector' => $selector,
				'name'     => $name,
				'category' => $category,
			);
		}
	}
	return array(
		'categories' => $categories,
		'elements'   => array_values( $elements ),
	);
}
