<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package OnePress
 */
$onepress_btt_disable          = get_theme_mod( 'onepress_btt_disable' );
$onepress_social_footer_title  = get_theme_mod( 'onepress_social_footer_title', esc_html__( 'Keep Updated', 'onepress' ) );
$onepress_social_twitter       = get_theme_mod( 'onepress_social_twitter' );
$onepress_social_facebook      = get_theme_mod( 'onepress_social_facebook' );
$onepress_social_google        = get_theme_mod( 'onepress_social_google' );
$onepress_social_instagram     = get_theme_mod( 'onepress_social_instagram' );
$onepress_social_rss           = get_theme_mod( 'onepress_social_rss' );
$onepress_newsletter_disable   = get_theme_mod( 'onepress_newsletter_disable', '1' );
$onepress_social_disable 	   = get_theme_mod( 'onepress_social_disable', '1' );
$onepress_newsletter_title     = get_theme_mod( 'onepress_newsletter_title', esc_html__( 'Join our Newsletter', 'onepress' ) );
$onepress_newsletter_mailchimp = get_theme_mod( 'onepress_newsletter_mailchimp' );
?>

	<footer id="colophon" class="site-footer" role="contentinfo">

		<?php if ( $onepress_newsletter_disable != '1' || $onepress_social_disable != '1' ) : ?>
		<div class="footer-connect">
			<div class="container">
				<div class="row">
					<div class="col-sm-2"></div>

					<?php if ( $onepress_newsletter_disable != '1' ) : ?>
					<div class="col-sm-4">
						<div class="footer-subscribe">
							<?php if ( $onepress_newsletter_title != '' ) echo '<h5 class="follow-heading">'. $onepress_newsletter_title .'</h5>'; ?>
							<form novalidate="" target="_blank" class="" name="mc-embedded-subscribe-form" id="mc-embedded-subscribe-form" method="post" action="<?php if ( $onepress_newsletter_mailchimp != '' ) echo $onepress_newsletter_mailchimp; ?>">
								<input type="text" placeholder="<?php esc_attr_e( 'Enter your e-mail address', 'onepress' ); ?>" id="mce-EMAIL" class="subs_input" name="EMAIL" value="">
								<input type="submit" class="subs-button" value="<?php esc_attr_e( 'Subscribe', 'onepress' ); ?>" name="subscribe">
							 </form>
						</div>
					</div>
					<?php endif; ?>

					<div class="<?php if ( $onepress_newsletter_disable == '1' ) { echo 'col-sm-8'; } else { echo 'col-sm-4'; } ?>">
						<?php if ( $onepress_social_disable != '1' ) : ?>
							<div class="footer-social">
								<?php
								if ( $onepress_social_footer_title != '' ) echo '<h5 class="follow-heading">'. $onepress_social_footer_title .'</h5>';
								if ( $onepress_social_twitter != '' ) echo '<a target="_blank" href="'. $onepress_social_twitter .'" title="Twitter"><i class="fa fa-twitter"></i></a>';
								if ( $onepress_social_facebook != '' ) echo '<a target="_blank" href="'. $onepress_social_facebook .'" title="Facebook"><i class="fa fa-facebook"></i></a>';
								if ( $onepress_social_google != '' ) echo '<a target="_blank" href="'. $onepress_social_google .'" title="Google Plus"><i class="fa fa-google-plus"></i></a>';
								if ( $onepress_social_instagram != '' ) echo '<a target="_blank" href="'. $onepress_social_instagram .'" title="Instagram"><i class="fa fa-instagram"></i></a>';
								if ( $onepress_social_rss != '' ) echo '<a target="_blank" href="'. $onepress_social_rss .'"><i class="fa fa-rss"></i></a>';
								?>
							</div>
						<?php endif; ?>
					</div>
					<div class="col-sm-2"></div>
				</div>
			</div>
		</div>
		<?php endif; ?>

		<div class="site-info">
			<div class="container">
				<?php if ( $onepress_btt_disable != '1' ) : ?>
				<div class="btt">
					<a class="back-top-top" href="#page" title="<?php echo esc_html__( 'Back To Top', 'onepress' ) ?>"><i class="fa fa-angle-double-up wow flash" data-wow-duration="2s"></i></a>
				</div>
				<?php endif; ?>
                <?php
                /**
                 * hooked onepress_footer_site_info
                 * @see onepress_footer_site_info
                 */
                do_action( 'onepress_footer_site_info' );
                ?>
            </div>
		</div><!-- .site-info -->

	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
