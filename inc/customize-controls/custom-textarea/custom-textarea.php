<?php
class One_Press_Textarea_Custom_Control extends WP_Customize_Control
{
	public function render_content() {
		?>
		<label>
			<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
			<textarea class="large-text" cols="20" rows="5" <?php $this->link(); ?>>
				<?php echo esc_textarea( $this->value() ); ?>
			</textarea>
			<p class="description"><?php echo wp_kses_post($this->description) ?></p>
		</label>
		<?php
	}
}
