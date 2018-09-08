<?php

class OnePress_Editor_Custom_Control extends WP_Customize_Control
{
	/**
	 * The type of customize control being rendered.
	 *
	 * @since  1.0.0
	 * @access public
	 * @var    string
	 */
	public $type = 'wp_editor';

	/**
	 * Add support for palettes to be passed in.
	 *
	 * Supported palette values are true, false, or an array of RGBa and Hex colors.
	 */
	public $mod;

	public function render_content() {
		$this->mod = strtolower( $this->mod );
		if( ! $this->mod = 'html' ) {
			$this->mod = 'tmce';
		}
		?>
		<div class="wp-js-editor">
			<label>
				<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
			</label>
			<textarea class="wp-js-editor-textarea large-text" data-editor-mod="<?php echo esc_attr( $this->mod ); ?>" <?php $this->link(); ?>><?php echo esc_textarea( $this->value() ); ?></textarea>
			<p class="description"><?php echo $this->description ?></p>
		</div>
		<?php
	}
}