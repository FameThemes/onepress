<?php
/**
 * Plus customizer section.
 *
 * @since  1.0.0
 * @access public
 */
class OnePress_Section_Plus extends WP_Customize_Section {
	/**
	 * The type of customize section being rendered.
	 *
	 * @since  1.0.0
	 * @access public
	 * @var    string
	 */
	public $type = 'onepress-plus';
	/**
	 * Custom button text to output.
	 *
	 * @since  1.0.0
	 * @access public
	 * @var    string
	 */
	public $plus_text = '';
	/**
	 * Custom plus section URL.
	 *
	 * @since  1.0.0
	 * @access public
	 * @var    string
	 */
	public $plus_url = '';
	/**
	 * Custom section ID.
	 *
	 * @since  1.0.0
	 * @access public
	 * @var    string
	 */
	public $id = '';
	/**
	 * Add custom parameters to pass to the JS via JSON.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function json() {
		$json = parent::json();
		$json['plus_text'] = $this->plus_text;
		$json['plus_url']  = $this->plus_url;
		$json['id'] = $this->id;
		return $json;
	}
	/**
	 * Outputs the Underscore.js template.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	protected function render_template() { ?>

		<li id="accordion-section-{{ data.id }}" class="accordion-section control-section control-section-{{ data.type }} cannot-expand">

			<h3><a href="{{ data.plus_url }}" target="_blank">{{{ data.plus_text }}}</a></h3>
		</li>
	<?php }
}
