<?php
/**
 * The template for displaying search results pages.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package OnePress
 */

get_header(); ?>

<div id="content" class="site-content">

	<div class="page-header">
		<div class="container">
			<h1 class="page-title">
				<?php
				printf(
					/* translators: Search query name */
					esc_html__( 'Search Results for: %s', 'onepress' ),
					'<span>' . get_search_query() . '</span>'
				);
				?>
			</h1>
		</div>
	</div>


	<div id="content-inside" class="container right-sidebar">
		<section id="primary" class="content-area">
			<main id="main" class="site-main" role="main">

				<?php
				if ( have_posts() ) {
					while ( have_posts() ) { // Start of the loop.
						the_post();

						/*
						 * Run the loop for the search to output the results.
						 * If you want to overload this in a child theme then include a file
						 * called content-search.php and that will be used instead.
						 */
						get_template_part( 'template-parts/content', 'search' );
					} // End of the loop.

					the_posts_navigation();

				} else {
					get_template_part( 'template-parts/content', 'none' );
				}
				?>

			</main><!-- #main -->
		</section><!-- #primary -->

		<?php get_sidebar(); ?>

	</div><!--#content-inside -->
</div><!-- #content -->

<?php get_footer(); ?>
