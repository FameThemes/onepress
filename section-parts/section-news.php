<?php
$onepress_news_id        = get_theme_mod( 'onepress_news_id', esc_html__('news', 'onepress') );
$onepress_news_disable   = get_theme_mod( 'onepress_news_disable' ) == 1 ? true : false;
$onepress_news_title     = get_theme_mod( 'onepress_news_title', esc_html__('Latest News', 'onepress' ));
$onepress_news_subtitle  = get_theme_mod( 'onepress_news_subtitle', esc_html__('Section subtitle', 'onepress' ));
$onepress_news_number    = get_theme_mod( 'onepress_news_number', '3' );
$onepress_news_more_link = get_theme_mod( 'onepress_news_more_link', '#' );
$onepress_news_more_text = get_theme_mod( 'onepress_news_more_text', esc_html__('Read Our Blog', 'onepress' ));
if ( onepress_is_selective_refresh() ) {
    $onepress_news_disable = false;
}
?>
<?php if ( ! $onepress_news_disable  ) :

$desc = get_theme_mod( 'onepress_news_desc' );
?>
<?php if ( ! onepress_is_selective_refresh() ){ ?>
<section id="<?php if ( $onepress_news_id != '' ) echo $onepress_news_id; ?>" <?php do_action( 'onepress_section_atts', 'news' ); ?> class="<?php echo esc_attr( apply_filters( 'onepress_section_class', 'section-news section-padding onepage-section', 'news' ) ); ?>">
<?php } ?>
    <?php do_action( 'onepress_section_before_inner', 'news' ); ?>
	<div class="container">
		<?php if ( $onepress_news_title ||  $onepress_news_subtitle ||  $desc ) { ?>
		<div class="section-title-area">
			<?php if ( $onepress_news_subtitle != '' ) echo '<h5 class="section-subtitle">' . esc_html( $onepress_news_subtitle ) . '</h5>'; ?>
			<?php if ( $onepress_news_title != '' ) echo '<h2 class="section-title">' . esc_html( $onepress_news_title ) . '</h2>'; ?>
            <?php if ( $desc ) {
                echo '<div class="section-desc">' . apply_filters( 'the_content', wp_kses_post( $desc ) ) . '</div>';
            } ?>
        </div>
		<?php } ?>
		<div class="section-content">
			<div class="row">
				<div class="col-sm-12">
					<div class="blog-entry wow slideInUp">
						<?php
						$query = new WP_Query(
							array(
								'posts_per_page' => $onepress_news_number,
								'suppress_filters' => 0,
							)
						);
						?>
						<?php if ( $query->have_posts() ) : ?>

							<?php /* Start the Loop */ ?>
							<?php while ( $query->have_posts() ) : $query->the_post(); ?>
								<?php
									/*
									 * Include the Post-Format-specific template for the content.
									 * If you want to override this in a child theme, then include a file
									 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
									 */
									get_template_part( 'template-parts/content', 'list' );
								?>

							<?php endwhile; ?>
						<?php else : ?>
							<?php get_template_part( 'template-parts/content', 'none' ); ?>
						<?php endif; ?>

						<?php if ( $onepress_news_more_link != '' ) { ?>
						<div class="all-news">
							<a class="btn btn-theme-primary-outline" href="<?php echo esc_url($onepress_news_more_link) ?>"><?php if ( $onepress_news_more_text != '' ) echo esc_html( $onepress_news_more_text ); ?></a>
						</div>
						<?php } ?>

					</div>
				</div>
			</div>

		</div>
	</div>
	<?php do_action( 'onepress_section_after_inner', 'news' ); ?>
<?php if ( ! onepress_is_selective_refresh() ){ ?>
</section>
<?php } ?>
<?php endif;
wp_reset_query();

