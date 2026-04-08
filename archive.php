<?php
/**
 * The template for displaying archive pages.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package OnePress
 */

get_header();

$layout    = onepress_get_layout();
$blog_loop = onepress_get_blog_posts_loop_layout_config();
?>

	<div id="content" class="site-content">

		<div class="page-header">
			<div class="container">
				<?php the_archive_title( '<h1 class="page-title">', '</h1>' ); ?>
				<?php the_archive_description( '<div class="taxonomy-description">', '</div>' ); ?>
			</div>
		</div>

		<?php onepress_breadcrumb(); ?>

		<div id="content-inside" class="container <?php echo esc_attr( $layout ); ?>">
			<div id="primary" class="content-area">
				<main id="main" class="site-main<?php echo $blog_loop['is_grid'] ? ' blog-posts-layout--grid' : ''; ?>" role="main">

				<?php if ( have_posts() ) : ?>

					<?php
					if ( $blog_loop['is_grid'] ) {
						onepress_loop_set_prop( 'blog_posts_layout', 'grid' );
					}
					?>

					<?php if ( $blog_loop['is_grid'] ) : ?>
					<div class="row blog-posts-loop__row">
					<?php endif; ?>

					<?php /* Start the Loop */ ?>
					<?php
					while ( have_posts() ) :
						the_post();
						if ( $blog_loop['is_grid'] ) {
							echo '<div class="' . esc_attr( $blog_loop['grid_col_class'] ) . '">';
						}
						/*
						 * Include the Post-Format-specific template for the content.
						 * If you want to override this in a child theme, then include a file
						 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
						 */
						get_template_part( 'template-parts/content', 'list' );
						if ( $blog_loop['is_grid'] ) {
							echo '</div>';
						}
					endwhile;
					?>

					<?php if ( $blog_loop['is_grid'] ) : ?>
					</div>
					<?php
					onepress_loop_remove_prop( 'blog_posts_layout' );
					endif;
					?>

					<?php the_posts_navigation(); ?>

				<?php else : ?>

					<?php get_template_part( 'template-parts/content', 'none' ); ?>

				<?php endif; ?>

				</main>
			</div>

            <?php if ( $layout != 'no-sidebar' ) { ?>
                <?php get_sidebar(); ?>
            <?php } ?>

		</div>
	</div>

<?php get_footer(); ?>
