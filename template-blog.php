<?php
/**
 *Template Name: Blog Page
 *
 * @package OnePress
 */

get_header(); ?>

	<div id="content" class="site-content">

		<div class="page-header">
			<div class="container">
				<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
			</div>
		</div>

		<div id="content-inside" class="container right-sidebar">
			<div id="primary" class="content-area">
				<main id="main" class="site-main" role="main">
				<div class="section-news">
					<?php
	                    $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
	                    $wp_query = new WP_Query( array(
							'post_type' => 'post',
							'showposts' => get_option('posts_per_page'),
							'paged'     => $paged
	                    )
	                    );
						if ( $wp_query->have_posts() ) :
							
							while ( $wp_query->have_posts() ) : $wp_query->the_post();

								get_template_part( 'template-parts/content', 'list' );

							endwhile;

							the_posts_navigation();

						else :

							get_template_part( 'template-parts/content', 'none' );

						endif;

						wp_reset_postdata(); 
					?>
					</div>

				</main><!-- #main -->
			</div><!-- #primary -->
			
			<?php get_sidebar(); ?>

		</div><!--#content-inside -->
	</div><!-- #content -->

<?php get_footer(); ?>
