<?php
/**
 * The blog posts index template file.
 *
 * The template file home.php is used to render the blog posts index, whether
 * it is being used as the front page or on separate static page.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#home-page-display
 *
 * @package OnePress
 * @since 1.0.4
 */

$layout = onepress_get_layout();

/** This action is documented in page.php */
do_action( 'onepress_page_before_content' );
?>
<div id="content" class="site-content">

	<?php onepress_breadcrumb(); ?>

	<div id="content-inside" class="container <?php echo esc_attr( $layout ); ?>">
		<div id="primary" class="content-area">
			<main id="main" class="site-main" role="main">

			<?php if ( have_posts() ) : ?>

				<?php if ( is_home() && ! is_front_page() ) : ?>
					<header>
						<h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
					</header>
				<?php endif; ?>

				<?php /* Start the Loop */ ?>
				<?php while ( have_posts() ) : the_post(); ?>

					<?php

					/*
					 * Include the Post-Format-specific template for the content.
					 * If you want to override this in a child theme, then include a file
					 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
					 */
					get_template_part( 'template-parts/content', get_post_format() );
					?>

				<?php endwhile; ?>

				<?php the_posts_navigation(); ?>

			<?php else : ?>

				<?php get_template_part( 'template-parts/content', 'none' ); ?>

			<?php endif; ?>

			</main><!-- #main -->
		</div><!-- #primary -->

		<?php if ( 'no-sidebar' != $layout ) { ?>
			<?php get_sidebar(); ?>
		<?php } ?>

	</div><!--#content-inside -->
</div><!-- #content -->

<?php get_footer(); ?>
