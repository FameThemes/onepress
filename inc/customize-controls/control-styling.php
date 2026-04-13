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
			$decoded = onepress_styling_get_default_value();
		}
		$this->json['value']                  = $decoded;
		$this->json['default_value']         = onepress_styling_get_default_value();
		$this->json['styling_breakpoints']   = $this->styling_breakpoints;
		$this->json['preview_device_ids']    = onepress_styling_preview_device_ids();
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
