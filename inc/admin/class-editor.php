<?php
/**
 * Support Gutenberg Editor.
 *
 * @since 2.2.0
 */
class OnePress_Editor {
	private $action = 'onepress_load_editor_style';
	private $editor_file = 'assets/css/admin/editor.css';
	public function __construct() {
		// Add editor settings.
		add_action( 'block_editor_settings', array( $this, 'editor_settings' ) );
		// Add ajax action to load css file.
		add_action( 'wp_ajax_' . $this->action, array( $this, 'css_file' ) );
		// Add more editor assets.
		add_action( 'enqueue_block_editor_assets', array( $this, 'assets' ) );
	}

	/**
	 * Add more editor styles and scripts.
	 *
	 * @todo Add Custom Fonts and styling settings.
	 *
	 * @return void
	 */
	function assets() {
		if ( function_exists( 'onepress_typography_render_style' ) ) {
			$typo = onepress_typography_render_style( false, true );
			if ( $typo['url'] ) {
				wp_enqueue_style( 'onepress-editor-fonts', $typo['url'] ); // Font style url.
			}

			wp_add_inline_style( 'wp-edit-post', $typo['code'] );
		}

		wp_add_inline_style( 'wp-edit-post', $this->css() );
	}

	/**
	 * Add styling settings to editor.
	 *
	 * @return string CSS code.
	 */
	public function css() {
		$css = '';

		$content_width = absint( get_theme_mod( 'single_layout_content_width' ) );
		if ( $content_width > 0 ) {
			$value = $content_width . 'px';
			$css .= '.editor-styles-wrapper .wp-block:not([data-align="full"]):not([data-align="wide"]) { max-width: ' . $value . '; }';
		}

		return $css;
	}

	/**
	 * Create a dymanic stylesheet url.
	 *
	 * @return string CSS URL
	 */
	public function editor_style_url() {
		return add_query_arg(
			array(
				'action' => $this->action,
				'nonce' => wp_create_nonce( $this->action ),
			),
			admin_url( 'admin-ajax.php' )
		);
	}

	/**
	 * Add edditor settings.
	 *
	 * @see gutenberg_editor_scripts_and_styles
	 *
	 * @param array $editor_settings
	 * @return array
	 */
	public function editor_settings( $editor_settings ) {

		$editor_settings['styles'][] = array(
			'css' => $this->load_style(),
		);

		return $editor_settings;
	}

	/**
	 * Render dynamic CSS content.
	 *
	 * @return void
	 */
	public function css_file() {
		header( 'Content-type: text/css; charset: UTF-8' );
		echo $this->load_style();
	}

	/**
	 * Load CSS content.
	 *
	 * @return string CSS code.
	 */
	public function load_style() {
		global $wp_filesystem;
		WP_Filesystem();
		$file = get_template_directory() . '/' . $this->editor_file;
		$file_contents = '';
		if ( file_exists( $file ) ) {
			$file_contents .= $wp_filesystem->get_contents( $file );
		}
		$file_contents .= '';
		return $file_contents;
	}

}

if ( is_admin() ) {
	new OnePress_Editor();
}

