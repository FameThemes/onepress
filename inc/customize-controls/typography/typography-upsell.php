<?php
/**
 * Typography upsell message for the Customizer (PHP-rendered; no JS template).
 *
 * @package onepress
 */

if ( class_exists( 'WP_Customize_Control', false ) && ! class_exists( 'OnePress_Typography_Upsell_Customize_Control', false ) ) {

	/**
	 * Promotional notice for OnePress Plus typography features (custom fonts, self-hosted Google Fonts).
	 */
	class OnePress_Typography_Upsell_Customize_Control extends WP_Customize_Control {

		/**
		 * @var string
		 */
		public $type = 'onepress_typography_upsell';

		/**
		 * Plus landing URL (UTM consistent with other theme upsells).
		 *
		 * @var string
		 */
		public $plus_url = 'https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started';

		/**
		 * @return string Allowed HTML for the upsell block.
		 */
		protected function get_message_html() {
			$url = esc_url( $this->plus_url );
			/* translators: %s: OnePress Plus product URL. */
			$link = sprintf(
				'<a target="_blank" rel="noopener noreferrer" href="%s">OnePress Plus</a>',
				$url
			);

			return sprintf(
				'<h4 class="customizer-group-heading-message">%1$s</h4><p class="customizer-group-heading-message">%2$s</p><h4 class="customizer-group-heading-message">%3$s</h4><p class="customizer-group-heading-message">%4$s</p>',
				esc_html__( 'Custom fonts', 'onepress' ),
				wp_kses(
					sprintf(
						/* translators: %s: HTML link to OnePress Plus. */
						__( 'Upgrade to %s to unlock custom font selection and extended typography controls beyond the bundled theme presets.', 'onepress' ),
						$link
					),
					array(
						'a' => array(
							'href'   => array(),
							'target' => array(),
							'rel'    => array(),
						),
					)
				),
				esc_html__( 'Self-hosted Google Fonts', 'onepress' ),
				wp_kses(
					sprintf(
						/* translators: %s: HTML link to OnePress Plus. */
						__( 'With %s you can download Google Fonts to your server for faster delivery, fewer third-party requests, and improved privacy and Core Web Vitals.', 'onepress' ),
						$link
					),
					array(
						'a' => array(
							'href'   => array(),
							'target' => array(),
							'rel'    => array(),
						),
					)
				)
			);
		}

		/**
		 * @return void
		 */
		public function render_content() {
			echo '<div class="description customize-control-description onepress-typography-upsell-control">';
			echo wp_kses_post( $this->get_message_html() );
			echo '</div>';
		}
	}
}
