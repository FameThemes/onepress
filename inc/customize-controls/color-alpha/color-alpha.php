<?php

/**
 * Alpha color Customizer control — React (Modal + @wordpress/components ColorPicker).
 *
 * @package onepress
 */
class OnePress_Alpha_Color_Control extends WP_Customize_Control {

	/**
	 * Official control name.
	 *
	 * @var string
	 */
	public $type = 'alpha-color';

	/**
	 * Palette support (reserved; ColorPicker UI does not map this yet).
	 *
	 * @var array<bool|string>|bool|null
	 */
	public $palette;

	/**
	 * Show opacity / alpha channel.
	 *
	 * @var bool|string|null
	 */
	public $show_opacity;

	/**
	 * Enqueue scripts and styles.
	 */
	public function enqueue() {
	}

	/**
	 * Render the control.
	 */
	public function render_content() {
		if ( is_array( $this->palette ) ) {
			$palette = implode( '|', $this->palette );
		} else {
			$palette = ( false === $this->palette || 'false' === $this->palette ) ? 'false' : 'true';
		}

		$show_opacity = ( false === $this->show_opacity || 'false' === $this->show_opacity ) ? 'false' : 'true';

		$default = '';
		if ( isset( $this->settings['default'] ) && $this->settings['default'] instanceof WP_Customize_Setting ) {
			$default = (string) $this->settings['default']->default;
		}

		$value = $this->value();
		if ( ! is_string( $value ) ) {
			$value = '';
		}
		?>
		<input
			type="hidden"
			class="onepress-alpha-color-input"
			value="<?php echo esc_attr( $value ); ?>"
			<?php $this->link(); ?>
		/>
		<div
			class="onepress-alpha-color-react-root"
			data-label="<?php echo esc_attr( (string) $this->label ); ?>"
			data-description="<?php echo esc_attr( (string) $this->description ); ?>"
			data-show-opacity="<?php echo esc_attr( $show_opacity ); ?>"
			data-palette="<?php echo esc_attr( $palette ); ?>"
			data-default-color="<?php echo esc_attr( $default ); ?>"
		></div>
		<?php
	}
}
