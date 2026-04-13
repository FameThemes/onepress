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
	 * @var 'all'|false|array<int, array<string, array{label?: string, selector?: string}>>
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
		$this->json['preview_device_ids']     = onepress_styling_preview_device_ids();
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
