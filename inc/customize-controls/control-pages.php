<?php

/**
 * Class OnPress_Dropdown_Category_Control
 * @since 2.0.0
 */
class OnePress_Pages_Control extends WP_Customize_Control {

	public $type = 'dropdown-category';
	public $show_option_none = 'dropdown-category';

	protected $dropdown_args = false;

	protected function render_content() {
		?><label><?php

		if ( ! empty( $this->label ) ) :
			?><span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span><?php
		endif;

		if ( ! empty( $this->description ) ) :
			?><span class="description customize-control-description"><?php echo $this->description; ?></span><?php
		endif;

		$dropdown_args = wp_parse_args( $this->dropdown_args, array(
			'selected'          => $this->value(),
			'show_option_none'   => $this->show_option_none,
			'orderby'           => 'id',
			'order'             => 'ASC'
		));

		$dropdown_args['echo'] = false;

		$dropdown = wp_dropdown_pages( $dropdown_args );
		$dropdown = str_replace( '<select', '<select ' . $this->get_link(), $dropdown );
		echo $dropdown;

		?></label><?php

	}
}

function onepress_enqueue_editor(){
	if( ! isset( $GLOBALS['__wp_mce_editor__'] ) || ! $GLOBALS['__wp_mce_editor__'] ) {
		$GLOBALS['__wp_mce_editor__'] = true;
		?>
		<script id="_wp-mce-editor-tpl" type="text/html">
			<?php wp_editor('', '__wp_mce_editor__'); ?>
		</script>
		<?php
	}
}
