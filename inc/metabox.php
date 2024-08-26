<?php

/**
 * Calls the class on the post edit screen.
 */
function onepress_metabox_init() {
	new OnePress_MetaBox();
}

if ( is_admin() ) {
	add_action( 'load-post.php', 'onepress_metabox_init' );
	add_action( 'load-post-new.php', 'onepress_metabox_init' );
}

/**
 * The Class.
 */
class OnePress_MetaBox {

	/**
	 * Hook into the appropriate actions when the class is constructed.
	 */
	public function __construct() {
		add_action( 'add_meta_boxes', array( $this, 'add_meta_box' ) );
		add_action( 'save_post', array( $this, 'save' ) );
	}

	/**
	 * Adds the meta box container.
	 */
	public function add_meta_box( $post_type ) {
		// Limit meta box to certain post types.
		$post_types = array( 'page' );

		if ( in_array( $post_type, $post_types ) ) {
			add_meta_box(
				'onepress_page_settings',
				__( 'Page Settings', 'onepress' ),
				array( $this, 'render_meta_box_content' ),
				$post_type,
				'side',
				'low'
			);
		}
	}

	/**
	 * Save the meta when the post is saved.
	 *
	 * @param int $post_id The ID of the post being saved.
	 */
	public function save( $post_id ) {

		/*
		 * We need to verify this came from the our screen and with proper authorization,
		 * because save_post can be triggered at other times.
		 */

		// Check if our nonce is set.
		if ( ! isset( $_POST['onepress_page_settings_nonce'] ) ) {
			return $post_id;
		}

		$nonce = sanitize_text_field( $_POST['onepress_page_settings_nonce'] );

		// Verify that the nonce is valid.
		if ( ! wp_verify_nonce( $nonce, 'onepress_page_settings' ) ) {
			return $post_id;
		}

		/*
		 * If this is an autosave, our form has not been submitted,
		 * so we don't want to do anything.
		 */
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return $post_id;
		}

		// Check the user's permissions.
		if ( 'page' == get_post_type( $post_id ) ) {
			if ( ! current_user_can( 'edit_page', $post_id ) ) {
				return $post_id;
			}
		} else {
			if ( ! current_user_can( 'edit_post', $post_id ) ) {
				return $post_id;
			}
		}

		$settings = isset( $_POST['onepress_page_settings'] ) ? wp_unslash( $_POST['onepress_page_settings'] ) : array();
		$settings = wp_parse_args(
			$settings,
			array(
				'hide_page_title' => '',
				'hide_header' => '',
				'hide_footer' => '',
				'hide_breadcrumb' => '',
				'cover' => '',
				'show_excerpt' => '',
				'wc_apply_product' => '',
			)
		);

		foreach ( $settings as $key => $value ) {
			// Update the meta field.
			update_post_meta( $post_id, '_' . $key, sanitize_text_field( $value ) );
		}

	}


	/**
	 * Render Meta Box content.
	 *
	 * @param WP_Post $post The post object.
	 */
	public function render_meta_box_content( $post ) {

		// Add an nonce field so we can check for it later.
		wp_nonce_field( 'onepress_page_settings', 'onepress_page_settings_nonce' );

		$values = array(
			'hide_page_title' => '',
			'hide_header' => '',
			'hide_footer' => '',
			'hide_breadcrumb' => '',
			'cover' => '',
			'show_excerpt' => '',
			'wc_apply_product' => '',
		);

		foreach ( $values as $key => $value ) {
			$values[ $key ] = get_post_meta( $post->ID, '_' . $key, true );
		}
		?>
		<p>
			<label>
				<input type="checkbox" name="onepress_page_settings[hide_header]" <?php checked( $values['hide_header'], 1 ); ?> value="1"> <?php esc_html_e( 'Hide header.', 'onepress' ); ?>
			</label>
		</p>
		<p>
			<label>
				<input type="checkbox" name="onepress_page_settings[hide_page_title]" <?php checked( $values['hide_page_title'], 1 ); ?> value="1"> <?php esc_html_e( 'Hide page title area.', 'onepress' ); ?>
			</label>
		</p>

		<p>
			<label>
				<input type="checkbox" name="onepress_page_settings[cover]" <?php checked( $values['cover'], 1 ); ?> value="1"> <?php esc_html_e( 'Display featured image as header cover.', 'onepress' ); ?>
			</label>
		</p>

		<p>
			<label>
				<input type="checkbox" name="onepress_page_settings[show_excerpt]" <?php checked( $values['show_excerpt'], 1 ); ?> value="1"> <?php esc_html_e( 'Display page excerpt as header cover description.', 'onepress' ); ?>
			</label>
		</p>

		<p>
			<label>
				<input type="checkbox" name="onepress_page_settings[hide_breadcrumb]" <?php checked( $values['hide_breadcrumb'], 1 ); ?> value="1"> <?php esc_html_e( 'Hide breadcrumb.', 'onepress' ); ?>
			</label>
		</p>
		<p>
			<label>
				<input type="checkbox" name="onepress_page_settings[hide_footer]" <?php checked( $values['hide_footer'], 1 ); ?> value="1"> <?php esc_html_e( 'Hide footer.', 'onepress' ); ?>
			</label>
		</p>
		<?php
		if ( onepress_is_wc_active() ) {
			if ( wc_get_page_id( 'shop' ) == $post->ID ) {
				?>
				<p>
					<label>
						<input type="checkbox" name="onepress_page_settings[wc_apply_product]" <?php checked( $values['wc_apply_product'], 1 ); ?> value="1"> <?php esc_html_e( 'Apply header cover settings for single product.', 'onepress' ); ?>
					</label>
				</p>
				<?php
			}
		}

	}
}
