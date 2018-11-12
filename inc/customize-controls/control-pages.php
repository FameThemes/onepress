<?php
/**
 * Custom Customizer Control for displaying a HTML dropdown list of pages.
 *
 * @package OnePress\Customizer
 * @since 2.0.0
 */

/**
 * Class OnePress_Pages_Control
 *
 * @since 2.0.0
 *
 * @see WP_Customize_Control
 */
class OnePress_Pages_Control extends WP_Customize_Control {

	/**
	 * Control type.
	 *
	 * @since 2.0.0
	 * @var string
	 */
	public $type = 'dropdown-pages';

	/**
	 * Select none text.
	 *
	 * If not empty, this string will be used as text for to select the none of
	 * the pages option.
	 *
	 * @since 2.0.0
	 * @var string
	 */
	public $show_option_none = 'dropdown-pages';

	/**
	 * Arguments for the dropdown list of pages.
	 *
	 * @since 2.0.0
	 * @var array
	 */
	protected $dropdown_args = array();

	/**
	 * Render the control's content
	 *
	 * @since 2.0.0
	 */
	protected function render_content() {
		echo '<label>';

		if ( ! empty( $this->label ) ) {
			echo '<span class="customize-control-title">' . esc_html( $this->label ) . '</span>';
		}

		if ( ! empty( $this->description ) ) {
			'<span class="description customize-control-description">' . wp_kses_post( $this->description ) . '</span>';
		}

		$dropdown_args = wp_parse_args( $this->dropdown_args, array(
			'selected'         => esc_html( $this->value() ),
			'show_option_none' => esc_html( $this->show_option_none ),
			'orderby'          => 'id',
			'order'            => 'ASC',
			'echo'             => false,
		));

		$dropdown = wp_dropdown_pages( $dropdown_args ); // WPCS: XSS ok.
		$dropdown = str_replace( '<select', '<select ' . $this->get_link(), $dropdown );
		echo $dropdown;

		echo '</label>';
	}
}
