<?php
/**
 * Template part for displaying posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package onepress
 */

$show_thumbnail = true;
if ( get_theme_mod( 'onepress_hide_thumnail_if_not_exists', false ) ) {
	if ( ! has_post_thumbnail() ) {
		$show_thumbnail = false;
	}
}

?>
<article id="post-<?php the_ID(); ?>" <?php post_class( array( 'list-article', 'clearfix' ) ); ?>>
	<?php if ( $show_thumbnail ) { ?>
	<div class="list-article-thumb">
		<a href="<?php echo esc_url( get_permalink() ); ?>">
			<?php
			if ( has_post_thumbnail() ) {
				the_post_thumbnail( 'onepress-blog-small' );
			} else {
				echo '<img alt="" src="' . esc_url(get_template_directory_uri() . '/assets/images/placholder2.png') .'" width="300" height="150">';
			}
			?>
		</a>
	</div>
	<?php } ?>

	<div class="list-article-content">
		<?php
		/**
		 * Hook before article content
		 *
		 * @since 2.1.0
		 */
		do_action( 'onepress_loop_content_before' );
		/**
		 * Condition to show meta
		 *
		 * @since 2.1.0
		 */
		if ( onepress_loop_get_prop( 'show_meta', true ) ) { ?>
			<div class="list-article-meta">
				<?php the_category( ' / ' ); ?>
			</div>
		<?php } ?>
		<?php
		/**
		 * Condition to show title
		 *
		 * @since 2.1.0
		 */
		if ( onepress_loop_get_prop( 'show_title', true ) ) { ?>
		<header class="entry-header">
			<?php the_title( sprintf( '<h2 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h2>' ); ?>
		</header>
		<?php } ?>
		<?php
		/**
		 * Condition to show excerpt
		 *
		 * @since 2.1.0
		 */
		if ( onepress_loop_get_prop( 'show_excerpt', true ) ) { ?>
		<div class="entry-excerpt">
			<?php
			/**
			 * @since 2.1.0
			 */
			onepress_the_excerpt();

			wp_link_pages(
				array(
					'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'onepress' ),
					'after'  => '</div>',
				)
			);
			?>
		</div>
		<?php } ?>
		<?php
		/**
		 * Hook after article content
		 *
		 * @since 2.1.0
		 */
		do_action( 'onepress_loop_content_after' );
		?>
	</div>

</article>
