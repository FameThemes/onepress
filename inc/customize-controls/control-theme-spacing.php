<?php
/**
 * Spacing Customizer control (padding / margin, responsive).
 *
 * @package onepress
 */

if ( class_exists( 'WP_Customize_Control', false ) && ! class_exists( 'OnePress_Spacing_Customize_Control', false ) ) {

	/**
	 * Spacing control (theme bundle JS/CSS).
	 */
	class OnePress_Spacing_Customize_Control extends WP_Customize_Control {

		/**
		 * @var string
		 */
		public $type = 'onepress_spacing';

		/**
		 * @var array
		 */
		public $l10n = array();

		/**
		 * @var string
		 */
		public $css_selector = '';

		/**
		 * padding|margin
		 *
		 * @var string
		 */
		public $spacing_property = 'padding';

		/**
		 * @param WP_Customize_Manager $manager Manager.
		 * @param string               $id      Control id.
		 * @param array                $args    Args.
		 */
		public function __construct( $manager, $id, $args = array() ) {
			parent::__construct( $manager, $id, $args );

			$this->l10n = wp_parse_args(
				$this->l10n,
				array(
					'padding' => esc_html__( 'Padding', 'onepress' ),
					'margin'  => esc_html__( 'Margin', 'onepress' ),
					'top'     => esc_html__( 'Top', 'onepress' ),
					'right'   => esc_html__( 'Right', 'onepress' ),
					'bottom'  => esc_html__( 'Bottom', 'onepress' ),
					'left'    => esc_html__( 'Left', 'onepress' ),
					'unit'    => esc_html__( 'Unit', 'onepress' ),
					'link'    => esc_html__( 'Link sides', 'onepress' ),
					'unlink'  => esc_html__( 'Unlink sides', 'onepress' ),
				)
			);

			$this->css_selector = isset( $args['css_selector'] ) ? $args['css_selector'] : '';
			if ( isset( $args['spacing_property'] ) && 'margin' === $args['spacing_property'] ) {
				$this->spacing_property = 'margin';
			} else {
				$this->spacing_property = 'padding';
			}
		}

		public function to_json() {
			parent::to_json();

			$raw   = $this->value();
			$value = is_string( $raw ) ? json_decode( $raw, true ) : null;
			if ( ! is_array( $value ) ) {
				$value = array();
			}

			$this->json['value']             = wp_json_encode( $value );
			$this->json['labels']            = $this->l10n;
			$this->json['css_selector']      = $this->css_selector;
			$this->json['spacing_property']  = $this->spacing_property;
		}

		public function enqueue() {
			$handle = onepress_load_build_script( 'customizer', array( 'customize-controls' ), true );
			if ( ! $handle ) {
				return;
			}
		}

		public function content_template() {
			?>
			<div class="onepress-spacing-wrap">
				<div class="onepress-spacing-settings">
					<div class="onepress-spacing-react-root"></div>
				</div>
			</div>
			<?php
		}
	}

}
