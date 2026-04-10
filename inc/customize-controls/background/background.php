<?php
/**
 * Background Customizer control (states × responsive, React + postMessage).
 *
 * @package onepress
 * @see inc/customize-controls/background/helper.php
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
		 * Base CSS selector (comma-separated) when not using per-state selectors.
		 *
		 * @var string
		 */
		public $selector = '';

		/**
		 * Optional map state_key => full CSS selector (pseudos included). When set, overrides pseudo appending for those states.
		 *
		 * @var array<string, string>
		 */
		public $selectors_by_state = array();

		/**
		 * State keys: normal, hover, focus, focus_visible, active, visited.
		 *
		 * @var string[]
		 */
		public $states = array( 'normal', 'hover' );

		/**
		 * Optional map state_key => tooltip / display label.
		 *
		 * @var array<string, string>
		 */
		public $state_labels = array();

		/**
		 * @var array
		 */
		public $l10n = array();

		/**
		 * @param WP_Customize_Manager $manager Manager.
		 * @param string               $id      Control id.
		 * @param array                $args    Args: selector (string|array), states (list|associative labels).
		 */
		public function __construct( $manager, $id, $args = array() ) {
			parent::__construct( $manager, $id, $args );

			$known_states = array_keys( onepress_background_state_pseudo() );

			$this->selector           = '';
			$this->selectors_by_state = array();
			if ( isset( $args['selector'] ) && is_array( $args['selector'] ) ) {
				foreach ( $args['selector'] as $state_key => $sel ) {
					$sk = sanitize_key( (string) $state_key );
					if ( '' === $sk || ! in_array( $sk, $known_states, true ) ) {
						continue;
					}
					$this->selectors_by_state[ $sk ] = sanitize_text_field( (string) $sel );
				}
				if ( ! empty( $this->selectors_by_state['normal'] ) ) {
					$this->selector = $this->selectors_by_state['normal'];
				} elseif ( ! empty( $this->selectors_by_state ) ) {
					$this->selector = (string) reset( $this->selectors_by_state );
				}
			} elseif ( isset( $args['selector'] ) ) {
				$this->selector = (string) $args['selector'];
			}

			$this->states       = array();
			$this->state_labels = array();
			if ( isset( $args['states'] ) && is_array( $args['states'] ) ) {
				$keys    = array_keys( $args['states'] );
				$is_list = ( $keys === range( 0, count( $args['states'] ) - 1 ) );
				if ( $is_list ) {
					foreach ( $args['states'] as $sk ) {
						$k = sanitize_key( (string) $sk );
						if ( $k && in_array( $k, $known_states, true ) ) {
							$this->states[] = $k;
						}
					}
				} else {
					foreach ( $args['states'] as $state_key => $label ) {
						$sk = sanitize_key( (string) $state_key );
						if ( '' === $sk || ! in_array( $sk, $known_states, true ) ) {
							continue;
						}
						$this->states[] = $sk;
						$this->state_labels[ $sk ] = sanitize_text_field( (string) $label );
					}
				}
			}
			if ( empty( $this->states ) && ! empty( $this->selectors_by_state ) ) {
				$this->states = array_keys( $this->selectors_by_state );
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

			if ( isset( $this->settings['default'] ) && $this->settings['default'] instanceof WP_Customize_Setting ) {
				$def                   = $this->settings['default']->default;
				$this->json['default'] = is_string( $def ) ? $def : wp_json_encode( $def );
			}

			$raw   = $this->value();
			$value = is_string( $raw ) ? json_decode( $raw, true ) : null;
			if ( ! is_array( $value ) ) {
				$value = array();
			}

			$this->json['value']             = wp_json_encode( $value );
			$this->json['labels']            = $this->l10n;
			$this->json['selector']          = $this->selector;
			$this->json['selectors_by_state'] = $this->selectors_by_state;
			$this->json['states']            = $this->states;
			$this->json['state_labels']      = $this->state_labels;
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
