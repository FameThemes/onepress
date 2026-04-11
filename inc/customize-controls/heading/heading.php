<?php
/**
 * Customizer control: heading label only (PHP-rendered, no inputs, no JS template).
 *
 * No setting is required: the control defaults to `settings => array()`, so you can skip
 * {@see WP_Customize_Manager::add_setting()} entirely (WordPress otherwise treats the control
 * ID as a setting ID when `settings` is omitted).
 *
 * Usage (recommended — no setting):
 *
 *   $wp_customize->add_control( new OnePress_Heading_Customize_Control( $wp_customize, 'my_heading', array(
 *       'label'    => esc_html__( 'Section title', 'onepress' ),
 *       'section'  => 'my_section',
 *       'priority' => 5,
 *   ) ) );
 *
 * Optional: with a dummy setting if you prefer a registered setting ID for other hooks:
 *
 *   $wp_customize->add_setting( 'my_heading', array( 'sanitize_callback' => 'onepress_sanitize_text' ) );
 *   $wp_customize->add_control( new OnePress_Heading_Customize_Control( $wp_customize, 'my_heading', array(
 *       'settings' => 'my_heading',
 *       'label'    => esc_html__( 'Section title', 'onepress' ),
 *       'section'  => 'my_section',
 *   ) ) );
 *
 * @package onepress
 */

if ( class_exists( 'WP_Customize_Control', false ) && ! class_exists( 'OnePress_Heading_Customize_Control', false ) ) {

	/**
	 * Displays a non-interactive heading in the Customizer sidebar.
	 */
	class OnePress_Heading_Customize_Control extends WP_Customize_Control {

		/**
		 * @var string
		 */
		public $type = 'onepress_heading';

		/**
		 * @param WP_Customize_Manager $manager Manager.
		 * @param string               $id      Control ID (unique; not a setting unless you pass `settings`).
		 * @param array                $args    See {@see WP_Customize_Control::__construct()}.
		 */
		public function __construct( $manager, $id, $args = array() ) {
			if ( ! array_key_exists( 'settings', $args ) ) {
				$args['settings'] = array();
			}
			parent::__construct( $manager, $id, $args );
		}

		/**
		 * @return void
		 */
		public function render_content() {
			if ( '' === $this->label ) {
				return;
			}

			echo '<div class="customize-control-heading onepress-customize-heading-control">';
			echo '<span class="customize-control-title">' . wp_kses( $this->label, onepress_allowed_tags() ) . '</span>';
			echo '</div>';
		}
	}
}
