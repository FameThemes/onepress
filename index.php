<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package OnePress
 */

get_header();

$layout = onepress_get_layout();

?>

<?php onepress_breadcrumb(); ?>

<div id="content" class="site-content">
	<div id="content-inside" class="container <?php echo esc_attr( $layout ); ?>">
		<div id="primary" class="content-area">
			<main id="main" class="site-main" role="main">

				<?php
				if ( have_posts() ) {

					if ( is_home() && ! is_front_page() ) {
						?>
						<header>
							<h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
						</header>
						<?php
					}

					while ( have_posts() ) { // Start of the loop.
						the_post();

						/*
						 * Include the Post-Format-specific template for the content.
						 * If you want to override this in a child theme, then include a file
						 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
						 */
						get_template_part( 'template-parts/content', get_post_format() );
					} // End of the loop.

					the_posts_navigation();

				} else {
					get_template_part( 'template-parts/content', 'none' );
				}
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
