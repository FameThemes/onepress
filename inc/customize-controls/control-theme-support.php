<?php
class OnePress_Theme_Support extends WP_Customize_Control {
	public function render_content() {
		echo wp_kses_post( 'Upgrade to <a href="#">OnePress Plus</a> to be able to change the section order and styling!', 'onepress' );
	}
}
