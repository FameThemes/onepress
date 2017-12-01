<?php
$id       = get_theme_mod( 'onepress_services_id', esc_html__('services', 'onepress') );
$disable  = get_theme_mod( 'onepress_services_disable' ) == 1 ? true : false;
$title    = get_theme_mod( 'onepress_services_title', esc_html__('Our Services', 'onepress' ));
$subtitle = get_theme_mod( 'onepress_services_subtitle', esc_html__('Section subtitle', 'onepress' ));
// Get data
$page_ids =  onepress_get_section_services_data();
if ( onepress_is_selective_refresh() ) {
    $disable = false;
}
if ( ! empty( $page_ids ) ) {
    $layout = intval( get_theme_mod( 'onepress_service_layout', 6 ) );
    $desc = get_theme_mod( 'onepress_services_desc' );
    ?>
    <?php if (!$disable) : ?>
        <?php if ( ! onepress_is_selective_refresh() ){ ?>
        <section id="<?php if ($id != '') { echo esc_attr( $id ); } ?>" <?php do_action('onepress_section_atts', 'services'); ?> class="<?php echo esc_attr(apply_filters('onepress_section_class', 'section-services section-padding section-meta onepage-section', 'services')); ?>"><?php } ?>
            <?php do_action('onepress_section_before_inner', 'services'); ?>
            <div class="<?php echo esc_attr( apply_filters( 'onepress_section_container_class', 'container', 'services' ) ); ?>">
                <?php if ( $title ||  $subtitle || $desc ){ ?>
                <div class="section-title-area">
                    <?php if ($subtitle != '') echo '<h5 class="section-subtitle">' . esc_html($subtitle) . '</h5>'; ?>
                    <?php if ($title != '') echo '<h2 class="section-title">' . esc_html($title) . '</h2>'; ?>
                    <?php if ( $desc ) {
                        echo '<div class="section-desc">' . apply_filters( 'onepress_the_content', wp_kses_post( $desc ) ) . '</div>';
                    } ?>
                </div>
                <?php } ?>
                <div class="row">
                    <?php
                    if ( ! empty( $page_ids ) ) {

                        $columns = 2;
                        switch ( $layout ) {
                            case 12:
                                $columns =  1;
                                break;
                            case 6:
                                $columns =  2;
                                break;
                            case 4:
                                $columns =  3;
                                break;
                            case 3:
                                $columns =  4;
                                break;
                        }
                        $j = 0;

                        $size = sanitize_text_field( get_theme_mod( 'onepress_service_icon_size', '5x' ) );
                        foreach ($page_ids as $settings) {
                            $post_id = $settings['content_page'];
                            $post_id = apply_filters( 'wpml_object_id', $post_id, 'page', true );
                            $post = get_post($post_id);
                            setup_postdata( $post );
                            $settings['icon'] = trim($settings['icon']);

                            $media = '';

                            if ( $settings['icon_type'] == 'image' && $settings['image'] ){
                                $url = onepress_get_media_url( $settings['image'] );
                                if ( $url ) {
                                    $media = '<div class="service-image icon-image"><img src="'.esc_url( $url ).'" alt=""></div>';
                                }
                            } else if ( $settings['icon'] ) {
                                $settings['icon'] = trim( $settings['icon'] );
                                //Get/Set social icons
                                if ( $settings['icon'] != '' && strpos($settings['icon'], 'fa') !== 0) {
                                    $settings['icon'] = 'fa-' . $settings['icon'];
                                }
                                $media = '<div class="service-image"><i class="fa '.esc_attr( $settings['icon'] ).' fa-'.esc_attr( $size ).'"></i></div>';
                            }
                            if ( $layout == 12 ) {
                                $classes = 'col-sm-12 col-lg-'.$layout;
                            } else {
                                $classes = 'col-sm-6 col-lg-'.$layout;
                            }

                            if ($j >= $columns) {
                                $j = 1;
                                $classes .= ' clearleft';
                            } else {
                                $j++;
                            }

                            ?>
                            <div class="<?php echo esc_attr( $classes ); ?> wow slideInUp">
                                <div class="service-item ">
                                    <?php
                                    if ( ! empty( $settings['enable_link'] ) ) {
                                        ?>
                                        <a class="service-link" href="<?php the_permalink(); ?>"><span class="screen-reader-text"><?php echo get_the_title( $post ); ?></span></a>
                                        <?php
                                    }
                                    ?>
                                    <?php if ( has_post_thumbnail( $post ) ) { ?>
                                        <div class="service-thumbnail ">
                                            <?php
                                            echo get_the_post_thumbnail( $post, 'onepress-medium' );
                                            ?>
                                        </div>
                                    <?php } ?>
                                    <?php if ( $media != '' ) {
                                        echo $media;
                                    } ?>
                                    <div class="service-content">
                                        <h4 class="service-title"><?php echo get_the_title( $post ); ?></h4>
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
        <?php if ( ! onepress_is_selective_refresh() ){ ?>
        </section>
        <?php } ?>
    <?php endif;
}
