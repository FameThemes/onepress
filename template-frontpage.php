<?php
/**
 * Template Name: Frontpage
 *
 * The page template for displaying the frontpage.
 *
 * @link https://developer.wordpress.org/themes/template-files-section/page-template-files/
 *
 * @package OnePress\Page_Templates
 *
 * @since 2.1.1 Only load sections if they are active
 * @since 1.0.4 Moved from front-page.php
 * @since 1.0.0
 */

get_header(); ?>

<div id="content" class="site-content">
	<main id="main" class="site-main" role="main">
		<?php
		/**
		 * Fires inside the main container before the section parts on the frontpage
		 *
		 * @since 1.1.3
		 */
		do_action( 'onepress_frontpage_before_section_parts' );

		if ( ! has_action( 'onepress_frontpage_section_parts' ) ) {

			$sections = apply_filters(
				'onepress_frontpage_sections_order', array(
					'features',
					'about',
					'services',
					'videolightbox',
					'gallery',
					'counter',
					'team',
					'news',
					'contact',
				)
			);

			foreach ( $sections as $section ) {
				// Load section if active.
				if ( Onepress_Config::is_section_active( $section ) ) {
					onepress_load_section( $section );
				}
			}
		} else {
			/**
			 * Fires inside the main container on the frontpage
			 *
			 * @since 1.0.4
			 */
			do_action( 'onepress_frontpage_section_parts' );
		}

		/**
		 * Fires inside the main container after the section parts on the frontpage
		 *
		 * @since 1.1.3
		 */
		do_action( 'onepress_frontpage_after_section_parts' );

		?>
	</main><!-- #main -->
</div><!-- #content -->

<?php get_footer(); ?>
