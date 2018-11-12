<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package OnePress
 */

get_header();

$layout = onepress_get_layout();

/**
 * Fires after header section and before content
 *
 * @since 2.0.0
 * @see onepress_display_page_title
 */
do_action( 'onepress_page_before_content' );

?>
<div id="content" class="site-content">
	<?php onepress_breadcrumb(); ?>
	<div id="content-inside" class="container <?php echo esc_attr( $layout ); ?>">
		<div id="primary" class="content-area">
			<main id="main" class="site-main" role="main">

				<?php
				while ( have_posts() ) { // Start of the loop.
					the_post();
					get_template_part( 'template-parts/content', 'page' );

					// If comments are open or we have at least one comment, load up the comment template.
					if ( comments_open() || get_comments_number() ) {
						comments_template();
					}
				} // End of the loop.
				?>

			</main><!-- #main -->
		</div><!-- #primary -->

		<?php
		if ( 'no-sidebar' != $layout ) {
			get_sidebar();
		}
		?>

	</div><!--#content-inside -->
</div><!-- #content -->

<?php get_footer(); ?>
