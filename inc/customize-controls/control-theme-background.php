<?php
/**
 * Background Customizer control (states × responsive, React + postMessage).
 *
 * @package onepress
 */

if ( class_exists( 'WP_Customize_Control', false ) && ! class_exists( 'OnePress_Background_Customize_Control', false ) ) {

	/**
	 * Background control (theme bundle JS).
	 */
	class OnePress_Background_Customize_Control extends WP_Customize_Control {

		/**
		 * @var string
		 */
		public $type = 'onepress_background';

		/**
		 * CSS selector (comma-separated allowed).
		 *
		 * @var string
		 */
		public $selector = '';

		/**
		 * State keys: normal, hover, focus, focus_visible, active, visited.
		 *
		 * @var string[]
		 */
		public $states = array( 'normal', 'hover' );

		/**
		 * @var array
		 */
		public $l10n = array();

		/**
		 * @param WP_Customize_Manager $manager Manager.
		 * @param string               $id      Control id.
		 * @param array                $args    Args: selector, states.
		 */
		public function __construct( $manager, $id, $args = array() ) {
			parent::__construct( $manager, $id, $args );

			$this->selector = isset( $args['selector'] ) ? (string) $args['selector'] : '';
			if ( isset( $args['states'] ) && is_array( $args['states'] ) ) {
				$this->states = array_values( array_filter( array_map( 'sanitize_key', $args['states'] ) ) );
			}
			if ( empty( $this->states ) ) {
				$this->states = array( 'normal' );
			}

			$this->l10n = wp_parse_args(
				$this->l10n,
				array(
					'color'    => esc_html__( 'Color', 'onepress' ),
					'gradient' => esc_html__( 'Gradient', 'onepress' ),
					'image'    => esc_html__( 'Image', 'onepress' ),
					'device'   => esc_html__( 'Preview device', 'onepress' ),
					'state'    => esc_html__( 'State', 'onepress' ),
				)
			);
		}

		public function to_json() {
			parent::to_json();

			$raw   = $this->value();
			$value = is_string( $raw ) ? json_decode( $raw, true ) : null;
			if ( ! is_array( $value ) ) {
				$value = array();
			}

			$this->json['value']    = wp_json_encode( $value );
			$this->json['labels']   = $this->l10n;
			$this->json['selector'] = $this->selector;
			$this->json['states']   = $this->states;
		}

		public function enqueue() {
			wp_enqueue_media();
			wp_enqueue_style( 'wp-components' );
			$handle = onepress_load_build_script(
				'customizer',
				array(
					'customize-controls',
					'media-upload',
					'media-views',
				),
				true
			);
			if ( ! $handle ) {
				return;
			}
		}

		public function content_template() {
			?>
			<div class="onepress-background-wrap">
				<div class="onepress-background-react-root"></div>
			</div>
			<?php
		}
	}

}
