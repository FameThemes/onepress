<?php
/**
 * Typography Customizer control (loads only in Customizer when WP_Customize_Control exists).
 *
 * @package onepress
 */

if ( class_exists( 'WP_Customize_Control', false ) && ! class_exists( 'OnePress_Typo_Customize_Control', false ) ) {

/**
 * Typography control (theme bundle JS/CSS).
 */
class OnePress_Typo_Customize_Control extends WP_Customize_Control {

	/**
	 * @var string
	 */
	public $type = 'onepress_typo';

	/**
	 * @var array
	 */
	public $l10n = array();

	/**
	 * @var string
	 */
	public $css_selector = '';

	/**
	 * @var array
	 */
	public $fields = array();

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
				'family'          => esc_html__( 'Font Family', 'onepress' ),
				'option_default'  => esc_html__( 'Default', 'onepress' ),
				'size'            => esc_html__( 'Font Size', 'onepress' ),
				'style'           => esc_html__( 'Font Weight/Style', 'onepress' ),
				'line_height'     => esc_html__( 'Line Height', 'onepress' ),
				'text_decoration' => esc_html__( 'Text Decoration', 'onepress' ),
				'letter_spacing'  => esc_html__( 'Letter Spacing', 'onepress' ),
				'text_transform'  => esc_html__( 'Text Transform', 'onepress' ),
				'color'           => esc_html__( 'Color', 'onepress' ),
			)
		);

		$this->css_selector = isset( $args['css_selector'] ) ? $args['css_selector'] : '';
		if ( ! isset( $args['fields'] ) ) {
			$args['fields'] = array();
		}

		$this->fields = $args['fields'];
	}

	public function to_json() {
		parent::to_json();

		$raw    = $this->value();
		$value  = is_string( $raw ) ? json_decode( $raw, true ) : null;
		$fields = array();
		foreach ( $this->fields as $k => $v ) {
			$fields[ str_replace( '-', '_', $k ) ] = true;
		}
		if ( ! is_array( $value ) ) {
			$value = array();
		}

		$fields = wp_parse_args(
			$fields,
			array(
				'font_family'     => false,
				'color'           => false,
				'font_style'      => false,
				'font_size'       => false,
				'line_height'     => false,
				'letter_spacing'  => false,
				'text_transform'  => false,
				'text_decoration' => false,
			)
		);

		$this->json['value']          = wp_json_encode( $value );
		$this->json['labels']         = $this->l10n;
		$this->json['css_selector']   = $this->css_selector;
		$this->json['fields']         = $fields;
	}

	public static function get_url() {
		return trailingslashit( get_template_directory_uri() ) . 'inc/typography/';
	}

	public static function get_default_fonts() {
		return onepress_typo_get_default_fonts();
	}

	public static function get_google_fonts() {
		return onepress_typo_get_google_fonts();
	}

	public static function get_fonts() {
		return onepress_typo_get_fonts();
	}

	public static function get_font_by_id( $id ) {
		$id = sanitize_title( $id );
		if ( ! $id ) {
			return false;
		}
		$fonts = self::get_fonts();
		if ( isset( $fonts[ $id ] ) ) {
			return $fonts[ $id ];
		}
		return false;
	}

	public function enqueue() {
		wp_enqueue_script( 'wp-color-picker' );
		wp_enqueue_style( 'wp-color-picker' );

		$handle = onepress_load_build_script( 'customizer', array( 'customize-controls', 'wp-color-picker' ), true );
		if ( ! $handle ) {
			return;
		}

		static $onepress_typo_customizer_localized = false;
		if ( ! $onepress_typo_customizer_localized ) {
			// Unique object names — avoids collision with OnePress Plus (typographyWebfonts / fontStyleLabels).
			wp_localize_script( $handle, 'onepressTypoWebfonts', onepress_typo_get_customizer_fonts() );
			wp_localize_script(
				$handle,
				'onepressTypoFontStyleLabels',
				array(
					'100'       => __( 'Thin 100', 'onepress' ),
					'100italic' => __( 'Thin 100 Italic', 'onepress' ),
					'200'       => __( 'Extra-Light 200', 'onepress' ),
					'200italic' => __( 'Extra-Light 200 Italic', 'onepress' ),
					'300'       => __( 'Light 300', 'onepress' ),
					'300italic' => __( 'Light 300 Italic', 'onepress' ),
					'400'       => __( 'Normal 400', 'onepress' ),
					'400italic' => __( 'Normal 400 Italic', 'onepress' ),
					'regular'   => __( 'Normal', 'onepress' ),
					'italic'    => __( 'Normal Italic', 'onepress' ),
					'500'       => __( 'Medium 500', 'onepress' ),
					'500italic' => __( 'Medium 500 Italic', 'onepress' ),
					'600'       => __( 'Semi-Bold 600', 'onepress' ),
					'600italic' => __( 'Semi-Bold 600 Italic', 'onepress' ),
					'700'       => __( 'Bold 700', 'onepress' ),
					'700italic' => __( 'Bold 700 Italic', 'onepress' ),
					'800'       => __( 'Extra-Bold 800', 'onepress' ),
					'800italic' => __( 'Extra-Bold 800 Italic', 'onepress' ),
					'900'       => __( 'Ultra-Bold 900', 'onepress' ),
					'900italic' => __( 'Ultra-Bold 900 Italic', 'onepress' ),
				)
			);
			$onepress_typo_customizer_localized = true;
		}
	}

	public function content_template() {
		?>
			<div class="typography-wrap">

				<div class="typography-header">
					<# if ( data.label ) { #>
						<span class="customize-control-title">{{ data.label }}</span>
						<# } #>

							<# if ( data.description ) { #>
								<span class="description customize-control-description">{{{ data.description }}}</span>
								<# } #>
				</div>

				<div class="typography-settings">
					<div class="onepress-typo-react-root"></div>
				</div>
			</div>
		<?php
	}
}

}
