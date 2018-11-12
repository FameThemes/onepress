<?php
/**
 * The template for displaying all pages WooCommerce page.
 *
 * @package OnePress
 */

get_header();

$is_active_sidebar = is_active_sidebar( 'sidebar-shop' );
$layout = onepress_get_layout();
$hide_breadcrumb = get_post_meta( wc_get_page_id('shop'), '_hide_breadcrumb', true);
/**
 * @since 2.0.0
 * @see onepress_display_page_title
 */
do_action( 'onepress_page_before_content' );
?>

	<div id="content" class="site-content">
		<?php
        if ( !  $hide_breadcrumb ) {
            onepress_breadcrumb( wc_get_page_id('shop') );
        }
		?>

		<div id="content-inside" class="container <?php echo ( $is_active_sidebar ) ? esc_attr( $layout ) : 'no-sidebar'; ?>">
			<div id="primary" class="content-area">
				<main id="main" class="site-main" role="main">
					<?php woocommerce_content(); ?>
				</main><!-- #main -->
			</div><!-- #primary -->
            <?php if ( $is_active_sidebar ) { ?>
                <?php if ( $layout != 'no-sidebar' ) { ?>
                    <div id="secondary" class="widget-area sidebar" role="complementary">
                        <?php dynamic_sidebar( 'sidebar-shop' ); ?>
                    </div><!-- #secondary -->
                <?php } ?>

            <?php } ?>
		</div><!--#content-inside -->


	</div><!-- #content -->

<?php get_footer(); ?>
