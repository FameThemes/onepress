<?php
/**
 * Custom Customizer Control for displaying a HTML dropdown list of categories.
 *
 * @package OnePress\Customizer
 * @since 2.0.0
 */

/**
 * Class OnePress_Dropdown_Category_Control
 *
 * @since 2.0.0
 *
 * @see WP_Customize_Control
 */
class OnePress_Category_Control extends WP_Customize_Control {

	/**
	 * Control type.
	 *
	 * @since 2.0.0
	 * @var string
	 */
	public $type = 'dropdown-category';

	/**
	 * Arguments for the dropdown list of categories.
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
			echo '<span class="description customize-control-description">' . wp_kses_post( $this->description ) . '</span>';
		}

		$dropdown_args = wp_parse_args( $this->dropdown_args, array(
			'taxonomy'          => 'category',
			'show_option_none'  => '',
			'selected'          => $this->value(),
			'show_option_all'   => __( 'All', 'onepress' ),
			'orderby'           => 'id',
			'order'             => 'ASC',
			'show_count'        => 1,
			'hide_empty'        => 1,
			'child_of'          => 0,
			'depth'             => 0,
			'tab_index'         => 0,
			'hide_if_empty'     => false,
			'option_none_value' => 0,
			'value_field'       => 'term_id',
			'echo'              => false,
		) );

		$dropdown = wp_dropdown_categories( $dropdown_args );
		$dropdown = str_replace( '<select', '<select ' . $this->get_link(), $dropdown );
		echo $dropdown;

		echo '</label>';
	}
}
