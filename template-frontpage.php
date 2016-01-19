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

				/*
				 * Section: Hero
				 */
				get_template_part('section-parts/section', 'hero');

				/*
				 * Section: About
				 */
				get_template_part('section-parts/section', 'about');

				/*
				 * Section: Services
				 */
				get_template_part('section-parts/section', 'services');

				/*
				 * Section: Counter
				 */
				get_template_part('section-parts/section', 'counter');

				/*
				 * Section: Testimonials
				 */
				get_template_part('section-parts/section', 'testimonials');

				/*
				 * Section: Team
				 */
				get_template_part('section-parts/section', 'team');

				/*
				 * Section: News
				 */
				get_template_part('section-parts/section', 'news');

				/*
				 * Section: Contact
				 */
				get_template_part('section-parts/section', 'contact');

			} else {
				do_action( 'onepress_frontpage_section_parts' );
			}

			?>
		</main><!-- #main -->
	</div><!-- #content -->

<?php get_footer(); ?>
