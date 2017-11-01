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
?>
    <footer id="colophon" class="site-footer" role="contentinfo">
        <?php
        $onepress_btt_disable = get_theme_mod('onepress_btt_disable');
        $onepress_social_footer_title = get_theme_mod('onepress_social_footer_title', esc_html__('Keep Updated', 'onepress'));

        $onepress_newsletter_disable = get_theme_mod('onepress_newsletter_disable', '1');
        $onepress_social_disable = get_theme_mod('onepress_social_disable', '1');
        $onepress_newsletter_title = get_theme_mod('onepress_newsletter_title', esc_html__('Join our Newsletter', 'onepress'));
        $onepress_newsletter_mailchimp = get_theme_mod('onepress_newsletter_mailchimp');

        $onepress_footer_navbar_disable = get_theme_mod('onepress_footer_navbar_disable', '1');

        if ( $onepress_newsletter_disable != '1' || $onepress_social_disable != '1' ) : ?>
            <div class="footer-connect">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-2"></div>
                        <?php if ($onepress_newsletter_disable != '1') : ?>
                            <div class="col-sm-4">
                                <div class="footer-subscribe">
                                    <?php if ($onepress_newsletter_title != '') echo '<h5 class="follow-heading">' . $onepress_newsletter_title . '</h5>'; ?>
                                    <form novalidate="" target="_blank" class="" name="mc-embedded-subscribe-form" id="mc-embedded-subscribe-form" method="post"
                                          action="<?php if ($onepress_newsletter_mailchimp != '') echo $onepress_newsletter_mailchimp; ?>">
                                        <input type="text" placeholder="<?php esc_attr_e('Enter your e-mail address', 'onepress'); ?>" id="mce-EMAIL" class="subs_input" name="EMAIL" value="">
                                        <input type="submit" class="subs-button" value="<?php esc_attr_e('Subscribe', 'onepress'); ?>" name="subscribe">
                                    </form>
                                </div>
                            </div>
                        <?php endif; ?>

                        <div class="<?php if ( $onepress_newsletter_disable == '1' ) {
                            echo 'col-sm-8';
                        } else {
                            echo 'col-sm-4';
                        } ?>">
                            <?php
                            if ($onepress_social_disable != '1') {
                                ?>
                                <div class="footer-social">
                                    <?php
                                    if ($onepress_social_footer_title != '') echo '<h5 class="follow-heading">' . $onepress_social_footer_title . '</h5>';

                                    $socials = onepress_get_social_profiles();
                                    /**
                                     * New Socials profiles
                                     *
                                     * @since 1.1.4
                                     * @change 1.2.1
                                     */
                                    echo '<div class="footer-social-icons">';
                                    if ( $socials ) {
                                        echo $socials;
                                    } else {
                                        /**
                                         * Deprecated
                                         * @since 1.1.4
                                         */
                                        $twitter = get_theme_mod('onepress_social_twitter');
                                        $facebook = get_theme_mod('onepress_social_facebook');
                                        $google = get_theme_mod('onepress_social_google');
                                        $instagram = get_theme_mod('onepress_social_instagram');
                                        $rss = get_theme_mod('onepress_social_rss');

                                        if ($twitter != '') echo '<a target="_blank" href="' . $twitter . '" title="Twitter"><i class="fa fa-twitter"></i></a>';
                                        if ($facebook != '') echo '<a target="_blank" href="' . $facebook . '" title="Facebook"><i class="fa fa-facebook"></i></a>';
                                        if ($google != '') echo '<a target="_blank" href="' . $google . '" title="Google Plus"><i class="fa fa-google-plus"></i></a>';
                                        if ($instagram != '') echo '<a target="_blank" href="' . $instagram . '" title="Instagram"><i class="fa fa-instagram"></i></a>';
                                        if ($rss != '') echo '<a target="_blank" href="' . $rss . '"><i class="fa fa-rss"></i></a>';
                                    }
                                    echo '</div>';
                                    ?>
                                </div>
                            <?php } ?>
                        </div>
                        <div class="col-sm-2"></div>
                    </div>
                </div>
            </div>
        <?php endif; ?>
        
        <div class="site-info">
            <div class="container">
                <?php if ($onepress_btt_disable != '1') : ?>
                    <div class="btt">
                        <a class="back-top-top" href="#page" title="<?php echo esc_html__('Back To Top', 'onepress') ?>"><i class="fa fa-angle-double-up wow flash" data-wow-duration="2s"></i></a>
                    </div>
                <?php
                endif;

                /**
                * New Footer Menu
                *
                * @since 1.4.4
                */
                $footer_columns = 0;
                if (is_active_sidebar('onepress_footer_nav_1')) $footer_columns++;
                if (is_active_sidebar('onepress_footer_nav_2')) $footer_columns++;
                if (is_active_sidebar('onepress_footer_nav_3')) $footer_columns++;
                if (is_active_sidebar('onepress_footer_nav_4')) $footer_columns++;

                if ($onepress_footer_navbar_disable != '1' && $footer_columns > 0) :
                    $footer_column_class = 'col-sm-12';
                    if ($footer_columns == 2) $footer_column_class = 'col-sm-6';
                    if ($footer_columns == 3) $footer_column_class = 'col-sm-4';
                    if ($footer_columns == 4) $footer_column_class = 'col-sm-3';
                    ?>
                    <div class="row footer-navbar">
                        <?php if (is_active_sidebar('onepress_footer_nav_1')) : ?>
                        <div class="<?= $footer_column_class ?>">
                            <?php dynamic_sidebar('onepress_footer_nav_1'); ?>
                        </div>
                        <?php endif; ?>

                        <?php if (is_active_sidebar('onepress_footer_nav_2')) : ?>
                        <div class="<?= $footer_column_class ?>">
                            <?php dynamic_sidebar('onepress_footer_nav_2'); ?>
                        </div>
                        <?php endif; ?>

                        <?php if (is_active_sidebar('onepress_footer_nav_3')) : ?>
                        <div class="<?= $footer_column_class ?>">
                            <?php dynamic_sidebar('onepress_footer_nav_3'); ?>
                        </div>
                        <?php endif; ?>

                        <?php if (is_active_sidebar('onepress_footer_nav_4')) : ?>
                        <div class="<?= $footer_column_class ?>">
                            <?php dynamic_sidebar('onepress_footer_nav_4'); ?>
                        </div>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
                <!-- Footer Menu -->

                <?php
                /**
                 * hooked onepress_footer_site_info
                 * @see onepress_footer_site_info
                 */
                do_action('onepress_footer_site_info');
                ?>
            </div>
        </div>
        <!-- .site-info -->

    </footer><!-- #colophon -->
<?php
/**
 * Hooked: onepress_site_footer
 *
 * @see onepress_site_footer
 */
do_action( 'onepress_site_end' );
?>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
