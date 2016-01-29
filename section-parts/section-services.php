<?php
$onepress_service_id       = get_theme_mod( 'onepress_service_id', esc_html__('services', 'onepress') );
$onepress_service_disable  = get_theme_mod( 'onepress_service_disable' ) == 1 ? true : false;
$onepress_service_title    = get_theme_mod( 'onepress_service_title', esc_html__('Our Services', 'onepress' ));
$onepress_service_subtitle = get_theme_mod( 'onepress_service_subtitle', esc_html__('Section subtitle', 'onepress' ));
// Get data
$page_ids =  onepress_get_section_services_data();
if ( ! empty( $page_ids ) ) {
    ?>
    <?php if (!$onepress_service_disable) : ?>
        <section id="<?php if ($onepress_service_id != '') echo $onepress_service_id; ?>" <?php do_action('onepress_section_atts', 'services'); ?>
                 class="<?php echo esc_attr(apply_filters('onepress_section_class', 'section-services section-padding section-meta onepage-section', 'services')); ?>">
            <?php do_action('onepress_section_before_inner', 'services'); ?>
            <div class="container">
                <div class="section-title-area">
                    <?php if ($onepress_service_subtitle != '') echo '<h5 class="section-subtitle">' . esc_html($onepress_service_subtitle) . '</h5>'; ?>
                    <?php if ($onepress_service_title != '') echo '<h2 class="section-title">' . esc_html($onepress_service_title) . '</h2>'; ?>
                </div>
                <div class="row">
                    <?php
                    if ( ! empty( $page_ids ) ) {
                        global $post;
                        foreach ($page_ids as $settings) {
                            $post_id = $settings['content_page'];
                            $post = get_post($post_id);
                            setup_postdata($post);
                            $settings['icon'] = trim($settings['icon']);
                            if ($settings['icon'] != '' && strpos($settings['icon'], 'fa-') !== 0) {
                                $settings['icon'] = 'fa-' . $settings['icon'];
                            }
                            ?>
                            <div class="col-sm-6 wow slideInUp">
                                <div class="service-item ">
                                    <?php
                                    if ( ! empty( $settings['enable_link'] ) ) {
                                        ?>
                                        <a class="service-link" href="<?php the_permalink(); ?>"><span class="screen-reader-text"><?php the_title(); ?></span></a>
                                        <?php
                                    }
                                    ?>
                                    <?php if ( has_post_thumbnail() ) { ?>
                                        <div class="service-thumbnail ">
                                            <?php
                                            the_post_thumbnail('onepress-medium');
                                            ?>
                                        </div>
                                    <?php } ?>
                                    <?php if ( $settings['icon'] != '' ) { ?>
                                        <div class="service-image">
                                            <i class="fa <?php echo esc_attr($settings['icon']); ?> fa-5x"></i>
                                        </div>
                                    <?php } ?>
                                    <div class="service-content">
                                        <h4 class="service-title"><?php the_title(); ?></h4>
                                        <?php the_excerpt(); ?>
                                    </div>
                                </div>
                            </div>
                            <?php
                        }
                        wp_reset_postdata();
                    }

                    ?>
                </div>
            </div>
            <?php do_action('onepress_section_after_inner', 'services'); ?>
        </section>
    <?php endif;
}
