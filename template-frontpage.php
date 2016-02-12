<?php
/**
 *Template Name: Frontpage
 *
 * @package OnePress
 */

get_header(); ?>

	<div id="content" class="site-content">
		<main id="main" class="site-main" role="main">
            <?php

			if ( ! has_action( 'onepress_frontpage_section_parts' ) ) {

				$sections = array(
					'hero', 'about', 'services', 'videolightbox', 'counter', 'team', 'news', 'contact'
				);

				foreach ( $sections as $section ){
					get_template_part('section-parts/section', $section );
				}

			} else {
				do_action( 'onepress_frontpage_section_parts' );
			}

			?>
		</main><!-- #main -->
	</div><!-- #content -->

<?php get_footer(); ?>
