<?php
/**
 * Customizer toggle switch (no React).
 *
 * Layout: [title] … [switch] / description below.
 *
 * Do not call register_control_type() for this class unless you implement
 * content_template() — otherwise WordPress prints an empty JS template and the
 * control renders blank.
 *
 * Styles: src/admin/customizer.scss (`.onepress-switch-control` + CSS variables).
 *
 * @package onepress
 */

if ( ! function_exists( 'onepress_sanitize_switch' ) ) {
	/**
	 * Sanitize switch setting to 1 or 0.
	 *
	 * @param mixed $value Raw value.
	 * @return int 1 or 0.
	 */
	function onepress_sanitize_switch( $value ) {
		return filter_var( $value, FILTER_VALIDATE_BOOLEAN ) ? 1 : 0;
	}
}

if ( class_exists( 'WP_Customize_Control', false ) && ! class_exists( 'OnePress_Switch_Customize_Control', false ) ) {

	/**
	 * Boolean toggle styled as a switch.
	 */
	class OnePress_Switch_Customize_Control extends WP_Customize_Control {

		/**
		 * @var string
		 */
		public $type = 'onepress_switch';

		/**
		 * @param WP_Customize_Manager $manager Manager.
		 * @param string               $id      Control id.
		 * @param array                $args    Args.
		 */
		public function __construct( $manager, $id, $args = array() ) {
			parent::__construct( $manager, $id, $args );
		}

		public function render_content() {
			$input_id = 'onepress-switch-' . $this->id;
			$input_id = preg_replace( '/[^a-zA-Z0-9_-]/', '-', $input_id );

			$raw   = $this->value();
			$is_on = (bool) filter_var( $raw, FILTER_VALIDATE_BOOLEAN );

			$sr_label = ! empty( $this->label )
				? sprintf(
					/* translators: %s: control label */
					__( 'Toggle: %s', 'onepress' ),
					wp_strip_all_tags( $this->label )
				)
				: __( 'Toggle setting', 'onepress' );
			?>
			<div class="onepress-switch-control">
				<div class="onepress-switch-control__head">
					<?php if ( ! empty( $this->label ) ) : ?>
						<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
					<?php endif; ?>
					<span class="onepress-switch-control__spacer" aria-hidden="true"></span>
					<label class="onepress-switch" for="<?php echo esc_attr( $input_id ); ?>">
						<span class="screen-reader-text"><?php echo esc_html( $sr_label ); ?></span>
						<input
							type="checkbox"
							id="<?php echo esc_attr( $input_id ); ?>"
							class="onepress-switch__input"
							value="1"
							<?php checked( $is_on ); ?>
							<?php $this->link(); ?>
						/>
						<span class="onepress-switch__track" aria-hidden="true">
							<span class="onepress-switch__thumb"></span>
						</span>
					</label>
				</div>
				<?php if ( ! empty( $this->description ) ) : ?>
					<p class="description customize-control-description"><?php echo wp_kses_post( $this->description ); ?></p>
				<?php endif; ?>
			</div>
			<?php
		}
	}

}
