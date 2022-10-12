<?php
/**
 *Template Name: Left Sidebar
 *
 * @package OnePress
 */

get_header();

/**
 * @since 2.0.0
 * @see onepress_display_page_title
 */
do_action( 'onepress_page_before_content' );
?>
	<div id="content" class="site-content">
        <?php
        onepress_breadcrumb();
        ?>
		<div id="content-inside" class="container left-sidebar">
			<div id="primary" class="content-area">
				<main id="main" class="site-main" role="main">

					<?php while ( have_posts() ) : the_post(); ?>

						<?php get_template_part( 'template-parts/content', 'page' ); ?>

						<?php
							// If comments are open or we have at least one comment, load up the comment template.
							if ( comments_open() || get_comments_number() ) :
								comments_template();
							endif;
						?>

					<?php endwhile; // End of the loop. ?>

				</main>
			</div>

			<?php get_sidebar(); ?>

		</div>
	</div>
<?php get_footer(); ?>
