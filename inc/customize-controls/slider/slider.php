<?php
/**
 * Responsive slider Customizer control (single CSS length, React).
 *
 * @package onepress
 * @see inc/customize-controls/slider/helper.php
 */

if ( class_exists( 'WP_Customize_Control', false ) && ! class_exists( 'OnePress_Slider_Customize_Control', false ) ) {

	/**
	 * Slider control (theme bundle JS/CSS).
	 */
	class OnePress_Slider_Customize_Control extends WP_Customize_Control {

		/**
		 * @var string
		 */
		public $type = 'onepress_slider';

		/**
		 * @var array
		 */
		public $l10n = array();

		/**
		 * @var string
		 */
		public $css_selector = '';

		/**
		 * width|max-width|min-width|…
		 *
		 * @var string
		 */
		public $css_property = 'width';

		/**
		 * @var int|float
		 */
		public $slider_min = 0;

		/**
		 * @var int|float
		 */
		public $slider_max = 500;

		/**
		 * @var int|float
		 */
		public $slider_step = 1;

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
					'unit' => esc_html__( 'Unit', 'onepress' ),
				)
			);

			$this->css_selector = isset( $args['css_selector'] ) ? (string) $args['css_selector'] : '';
			if ( isset( $args['css_property'] ) ) {
				$this->css_property = (string) $args['css_property'];
			}
			if ( isset( $args['slider_min'] ) && is_numeric( $args['slider_min'] ) ) {
				$this->slider_min = floatval( $args['slider_min'] );
			}
			if ( isset( $args['slider_max'] ) && is_numeric( $args['slider_max'] ) ) {
				$this->slider_max = floatval( $args['slider_max'] );
			}
			if ( isset( $args['slider_step'] ) && is_numeric( $args['slider_step'] ) ) {
				$this->slider_step = floatval( $args['slider_step'] );
			}
		}

		public function to_json() {
			parent::to_json();

			if ( isset( $this->settings['default'] ) && $this->settings['default'] instanceof WP_Customize_Setting ) {
				$def                   = $this->settings['default']->default;
				$this->json['default'] = is_string( $def ) ? $def : wp_json_encode( $def );
			}

			$this->json['labels']         = $this->l10n;
			$this->json['css_selector']   = $this->css_selector;
			$this->json['css_property']   = $this->css_property;
			$this->json['slider_min']     = $this->slider_min;
			$this->json['slider_max']     = $this->slider_max;
			$this->json['slider_step']    = $this->slider_step;
		}

		public function enqueue() {
			$handle = onepress_load_build_script( 'customizer', array( 'customize-controls' ), true );
			if ( ! $handle ) {
				return;
			}
		}

		public function content_template() {
			?>
			<div class="onepress-slider-wrap">
				<div class="onepress-slider-settings">
					<div class="onepress-slider-react-root"></div>
				</div>
			</div>
			<?php
		}
	}

}
