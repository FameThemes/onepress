<?php
/**
 * Customizer control: font manager (JSON — system vs Google + variation axes).
 *
 * @package OnePress
 */

/**
 * Class Onepress_Customize_Font_Manager_Control
 */
class Onepress_Customize_Font_Manager_Control extends WP_Customize_Control
{

	/**
	 * Control type.
	 *
	 * @var string
	 */
	public $type = 'font_manager';

	/**
	 * JSON string for Customizer JS (`wp.customize` setting), aligned with stored theme_mod.
	 *
	 * @param mixed                  $value   Setting value (array or JSON string).
	 * @param WP_Customize_Setting|null $setting Setting instance (passed by core; unused here).
	 * @return string
	 */
	public static function sanitize_value_for_js($value, $setting = null)
	{
		return wp_json_encode(onepress_font_manager_parse($value));
	}

	/**
	 * Pass data to customize JS.
	 */
	public function to_json()
	{
		parent::to_json();
		$raw   = $this->value();
		$parsed = onepress_font_manager_parse($raw);
		$this->json['value']          = $parsed;
		$this->json['default_value']  = self::sanitize_value_for_js(onepress_font_manager_default_value());
	}

	/**
	 * Render minimal chrome; React mounts into root.
	 */
	public function render_content()
	{
		?>
		<input type="hidden" <?php $this->link(); ?> value="" />
		<div class="form-data onepress-font-manager onepress-styling">
			<div class="font-manager-root" id="onepress-font-manager-<?php echo esc_attr($this->id); ?>"></div>
		</div>
		<?php
	}
}
