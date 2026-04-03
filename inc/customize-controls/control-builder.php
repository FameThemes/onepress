<?php

/**
 * Repeatable control class.
 *
 * @since  1.0.0
 * @access public
 */
class Onepress_Customize_Builder_Control extends WP_Customize_Control
{

	/**
	 * The type of customize control being rendered.
	 *
	 * @since  1.0.0
	 * @access public
	 * @var    string
	 */
	public $type = 'builder';

	// public $fields = array();

	public $fields = array();
	public $live_title_id = null;
	public $title_format = null;
	public $defined_values = null;
	public $id_key = null;
	public $limited_msg = null;
	public $add_text = null;


	public function __construct($manager, $id, $args = array())
	{
		parent::__construct($manager, $id, $args);
		if (empty($args['fields']) || ! is_array($args['fields'])) {
			$args['fields'] = array();
		}

		foreach ($args['fields'] as $key => $op) {
			$args['fields'][$key]['id'] = $key;
			if (! isset($op['value'])) {
				if (isset($op['default'])) {
					$args['fields'][$key]['value'] = $op['default'];
				} else {
					$args['fields'][$key]['value'] = '';
				}
			}
		}

		$this->fields = $args['fields'];
		$this->live_title_id = isset($args['live_title_id']) ? $args['live_title_id'] : false;
		$this->defined_values = isset($args['defined_values']) ? $args['defined_values'] : false;
		$this->id_key = isset($args['id_key']) ? $args['id_key'] : false;
		if (isset($args['title_format']) && $args['title_format'] != '') {
			$this->title_format = $args['title_format'];
		} else {
			$this->title_format = '';
		}

		if (isset($args['limited_msg']) && $args['limited_msg'] != '') {
			$this->limited_msg = $args['limited_msg'];
		} else {
			$this->limited_msg = '';
		}

		if (! isset($args['max_item'])) {
			$args['max_item'] = 0;
		}

		if (! isset($args['allow_unlimited']) || $args['allow_unlimited'] != false) {
			$this->max_item =  apply_filters('onepress_reepeatable_max_item', absint($args['max_item']));
		} else {
			$this->max_item = absint($args['max_item']);
		}

		$this->changeable =  isset($args['changeable']) && $args['changeable'] == 'no' ? 'no' : 'yes';
		$this->default_empty_title =  isset($args['default_empty_title']) && $args['default_empty_title'] != '' ? $args['default_empty_title'] : esc_html__('Item', 'onepress');
	}

	public function merge_data($array_value, $array_default)
	{

		if (! $this->id_key) {
			return $array_value;
		}

		if (! is_array($array_value)) {
			$array_value =  array();
		}

		if (! is_array($array_default)) {
			$array_default =  array();
		}

		$new_array = array();
		foreach ($array_value as $k => $a) {

			if (is_array($a)) {
				if (isset($a[$this->id_key]) && $a[$this->id_key] != '') {
					$new_array[$a[$this->id_key]] = $a;
				} else {
					$new_array[$k] = $a;
				}
			}
		}

		foreach ($array_default as $k => $a) {
			if (is_array($a) && isset($a[$this->id_key])) {
				if (! isset($new_array[$a[$this->id_key]])) {
					$new_array[$a[$this->id_key]] = $a;
				}
			}
		}

		return array_values($new_array);
	}

	public function to_json()
	{
		parent::to_json();
		$value = $this->value();

		if (is_string($value)) {
			$value = json_decode($value, true);
		}
		if (empty($value)) {
			$value = $this->defined_values;
		} elseif (is_array($this->defined_values) && ! empty($this->defined_values)) {
			$value = $this->merge_data($value, $this->defined_values);
		}

		/**
		 * @since 2.1.1
		 */
		if ($this->id_key == 'section_id') {
			foreach ((array) $value as $k => $v) {

				if (! Onepress_Config::is_section_active($v['section_id'])) {
					$value[$k]['__visibility'] = 'hidden';
				} else {
					$value[$k]['__visibility'] = '';
				}
			}
		}

		$this->json['live_title_id'] = $this->live_title_id;
		$this->json['title_format']  = $this->title_format;
		$this->json['max_item']      = $this->max_item;
		$this->json['limited_msg']   = $this->limited_msg;
		$this->json['changeable']    = $this->changeable;
		$this->json['default_empty_title']    = $this->default_empty_title;
		$this->json['value']         = $value;
		$this->json['id_key']        = $this->id_key;

		// Sanitize fields data before passing to JavaScript
		$sanitized_fields = array();
		foreach ($this->fields as $key => $field) {
			$sanitized_fields[$key] = $field;
			if (isset($field['title'])) {
				// Allow safe HTML tags in title (like <strong>, <em>, etc.)
				$sanitized_fields[$key]['title'] = wp_kses_post($field['title']);
			}
			if (isset($field['desc'])) {
				// Allow safe HTML tags in description (like <strong>, <em>, <a>, <p>, etc.)
				// wp_kses_post() removes dangerous tags like <script>, <iframe> while keeping safe ones
				$sanitized_fields[$key]['desc'] = wp_kses_post($field['desc']);
			}
		}
		$this->json['fields'] = $sanitized_fields;
	}

	/**
	 * Enqueue scripts/styles.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function enqueue()
	{
		add_action('customize_controls_print_footer_scripts', array(__CLASS__, 'item_tpl'), 66);
	}

	public static function item_tpl() {}

	public function render_content()
	{
?>
		<label>
			<?php if (! empty($this->label)) : ?>
				<span class="customize-control-title"><?php echo esc_html($this->label); ?></span>
			<?php endif; ?>
			<?php if (! empty($this->description)) : ?>
				<span class="description customize-control-description"><?php echo wp_kses_post($this->description); ?></span>
			<?php endif; ?>
		</label>
		<div class="onepress-builder-container">
		</div>
<?php
	}
}
