<?php
/**
 * Visual layout picker (radio grid): each choice can be text, inline SVG, or image URL.
 *
 * Do not call register_control_type() without a real content_template() (see switch control).
 *
 * Styles: src/admin/customizer.scss (root `.onepress-layout-control`, inner functional classes).
 *
 * @package onepress
 */

if ( ! function_exists( 'onepress_sanitize_layout_value' ) ) {
	/**
	 * Keep setting value if it is in the allowed list; otherwise first allowed or empty.
	 *
	 * @param mixed $value          Raw value.
	 * @param array $allowed_values Allowed choice values (string[]).
	 * @return string
	 */
	function onepress_sanitize_layout_value( $value, $allowed_values = array() ) {
		if ( ! is_array( $allowed_values ) || array() === $allowed_values ) {
			return is_string( $value ) ? sanitize_text_field( $value ) : '';
		}
		$allowed_values = array_map( 'strval', $allowed_values );
		$value          = is_string( $value ) ? $value : '';
		if ( in_array( $value, $allowed_values, true ) ) {
			return $value;
		}
		return (string) $allowed_values[0];
	}
}

if ( class_exists( 'WP_Customize_Control', false ) && ! class_exists( 'OnePress_Layout_Customize_Control', false ) ) {

	/**
	 * Grid of visual radio options (text / SVG / image).
	 */
	class OnePress_Layout_Customize_Control extends WP_Customize_Control {

		/**
		 * @var string
		 */
		public $type = 'onepress_layout';

		/**
		 * Number of columns in the grid (min 1).
		 *
		 * @var int
		 */
		public $columns = 2;

		/**
		 * Choice definitions: each item: value (string), label (string), type (text|svg|image), content (string).
		 *
		 * @var array<int, array<string, string>>
		 */
		public $choices = array();

		/**
		 * Optional URL for a help link (dashicon beside title).
		 *
		 * @var string
		 */
		public $help_url = '';

		/**
		 * Min height for every choice cell (all types). Number = px, or CSS length e.g. 3rem.
		 *
		 * @var string
		 */
		public $item_min_height = '72px';

		/**
		 * @param WP_Customize_Manager $manager Manager.
		 * @param string               $id      Control id.
		 * @param array                $args    Args: columns, choices, help_url, item_min_height.
		 */
		public function __construct( $manager, $id, $args = array() ) {
			parent::__construct( $manager, $id, $args );

			if ( isset( $args['columns'] ) ) {
				$this->columns = max( 1, (int) $args['columns'] );
			}
			if ( isset( $args['choices'] ) && is_array( $args['choices'] ) ) {
				$this->choices = $args['choices'];
			}
			if ( isset( $args['help_url'] ) ) {
				$this->help_url = (string) $args['help_url'];
			}
			if ( array_key_exists( 'item_min_height', $args ) ) {
				$formatted = $this->format_min_height_arg( $args['item_min_height'] );
				if ( null !== $formatted ) {
					$this->item_min_height = $formatted;
				}
			}

			$coerced = $this->format_min_height_arg( $this->item_min_height );
			$this->item_min_height = null !== $coerced ? $coerced : '72px';
		}

		/**
		 * @param mixed $value Raw arg (int px, numeric string, or CSS length).
		 * @return string|null Sanitized length or null if invalid.
		 */
		protected function format_min_height_arg( $value ) {
			if ( null === $value || false === $value ) {
				return null;
			}
			if ( is_int( $value ) || is_float( $value ) ) {
				$n = max( 0, (int) round( $value ) );
				return $n . 'px';
			}
			$s = trim( (string) $value );
			if ( '' === $s ) {
				return null;
			}
			if ( preg_match( '/^[0-9]+(\.[0-9]+)?(px|rem|em|vh|vmin|vmax|%)$/i', $s ) ) {
				return $s;
			}
			if ( ctype_digit( $s ) ) {
				return max( 0, (int) $s ) . 'px';
			}
			return null;
		}

		/**
		 * @param array<string, string> $choice Choice row.
		 */
		protected function render_choice_inner( array $choice ) {
			$type    = isset( $choice['type'] ) ? $choice['type'] : 'text';
			$content = isset( $choice['content'] ) ? $choice['content'] : '';
			$label   = isset( $choice['label'] ) ? $choice['label'] : '';

			switch ( $type ) {
				case 'image':
					if ( '' === trim( (string) $content ) ) {
						return;
					}
					printf(
						'<img class="thumb" src="%s" alt="%s" loading="lazy" decoding="async" />',
						esc_url( $content ),
						esc_attr( $label )
					);
					break;

				case 'svg':
					if ( function_exists( 'onepress_sanitize_inline_svg_markup' ) ) {
						echo '<span class="svg">' . onepress_sanitize_inline_svg_markup( $content ) . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
					} else {
						echo '<span class="svg">' . wp_kses_post( $content ) . '</span>';
					}
					break;

				case 'text':
				default:
					echo '<span class="text">' . esc_html( $content ) . '</span>';
					break;
			}
		}

		public function render_content() {
			if ( empty( $this->choices ) || ! is_array( $this->choices ) ) {
				return;
			}

			$current = $this->value();
			$current = is_string( $current ) ? $current : '';
			?>
			<div class="onepress-layout-control" style="<?php echo esc_attr( '--onepress-layout-columns: ' . (int) $this->columns . ';' ); ?>">
				<?php if ( ! empty( $this->label ) || ! empty( $this->help_url ) ) : ?>
					<div class="head">
						<?php if ( ! empty( $this->label ) ) : ?>
							<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
						<?php endif; ?>
						<?php if ( ! empty( $this->help_url ) ) : ?>
							<a
								class="help"
								href="<?php echo esc_url( $this->help_url ); ?>"
								target="_blank"
								rel="noopener noreferrer"
								title="<?php esc_attr_e( 'Help', 'onepress' ); ?>"
							>
								<span class="dashicons dashicons-editor-help" aria-hidden="true"></span>
								<span class="screen-reader-text"><?php esc_html_e( 'Help', 'onepress' ); ?></span>
							</a>
						<?php endif; ?>
					</div>
				<?php endif; ?>

				<?php
				$radiogroup_label = ! empty( $this->label )
					? wp_strip_all_tags( $this->label )
					: __( 'Layout options', 'onepress' );
				?>
				<fieldset class="grid" role="radiogroup" aria-label="<?php echo esc_attr( $radiogroup_label ); ?>">
					<?php
					foreach ( $this->choices as $index => $choice ) {
						if ( ! is_array( $choice ) || ! isset( $choice['value'] ) ) {
							continue;
						}
						$val   = (string) $choice['value'];
						$slug  = sanitize_title( $val ? $val : 'choice-' . $index );
						$input_id = $this->id . '-layout-' . $slug;
						$input_id = preg_replace( '/[^a-zA-Z0-9_-]/', '-', $input_id );
						$lbl = isset( $choice['label'] ) ? $choice['label'] : $val;
						?>
						<div
							class="<?php echo esc_attr( 'choice type-' . ( isset( $choice['type'] ) ? $choice['type'] : 'text' ) ); ?>"
							style="<?php echo esc_attr( '--onepress-layout-item-min-height: ' . $this->item_min_height . ';' ); ?>"
						>
							<input
								type="radio"
								id="<?php echo esc_attr( $input_id ); ?>"
								class="input"
								name="<?php echo esc_attr( 'onepress-layout-' . $this->id ); ?>"
								value="<?php echo esc_attr( $val ); ?>"
								<?php checked( $current, $val ); ?>
								<?php $this->link(); ?>
							/>
							<label class="label" for="<?php echo esc_attr( $input_id ); ?>" title="<?php echo esc_attr( $lbl ); ?>">
								<?php $this->render_choice_inner( $choice ); ?>
							</label>
						</div>
						<?php
					}
					?>
				</fieldset>

				<?php if ( ! empty( $this->description ) ) : ?>
					<p class="description customize-control-description"><?php echo wp_kses_post( $this->description ); ?></p>
				<?php endif; ?>
			</div>
			<?php
		}
	}

}
