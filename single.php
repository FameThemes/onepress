<?php
/**
 * The template for displaying all single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package OnePress
 */

get_header();
$layout = onepress_get_layout();

/** This action is documented in page.php */
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
					get_template_part( 'template-parts/content', 'single' );

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
