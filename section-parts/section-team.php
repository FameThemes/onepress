<?php
$id       = get_theme_mod( 'onepress_team_id', 'team' );
$disable  = get_theme_mod( 'onepress_team_disable' ) ==  1 ? true : false;
$title    = get_theme_mod( 'onepress_team_title', esc_html__('Our Team', 'onepress' ));
$subtitle = get_theme_mod( 'onepress_team_subtitle', esc_html__('Section subtitle', 'onepress' ));
$layout   = intval( get_theme_mod( 'onepress_team_layout', 3 ) );
if ( $layout <= 0 ){
    $layout = 3;
}
$user_ids = onepress_get_section_team_data();
if ( onepress_is_selective_refresh() ) {
    $disable = false;
}
if ( ! empty( $user_ids ) ) {
    $desc = get_theme_mod( 'onepress_team_desc' );
    ?>
    <?php if ( ! $disable ) : ?>
        <?php if ( ! onepress_is_selective_refresh() ){ ?>
        <section id="<?php if ($id != '') { echo esc_attr( $id ); }; ?>" <?php do_action('onepress_section_atts', 'team'); ?>
                 class="<?php echo esc_attr(apply_filters('onepress_section_class', 'section-team section-padding section-meta onepage-section', 'team')); ?>">
        <?php } ?>
            <?php do_action('onepress_section_before_inner', 'team'); ?>
            <div class="<?php echo esc_attr( apply_filters( 'onepress_section_container_class', 'container', 'team' ) ); ?>">
                <?php if ( $title || $subtitle || $desc ){ ?>
                <div class="section-title-area">
                    <?php if ($subtitle != '') echo '<h5 class="section-subtitle">' . esc_html($subtitle) . '</h5>'; ?>
                    <?php if ($title != '') echo '<h2 class="section-title">' . esc_html($title) . '</h2>'; ?>
                    <?php if ( $desc ) {
                        echo '<div class="section-desc">' . wp_kses_post( apply_filters( 'onepress_the_content', $desc ) ) . '</div>';
                    } ?>
                </div>
                <?php } ?>
                <div class="team-members row team-layout-<?php echo intval( 12 / $layout  ); ?>">
                    <?php
                    if ( ! empty( $user_ids ) ) {
                        $n = 0;

                        foreach ( $user_ids as $member ) {
                            $member = wp_parse_args( $member, array(
                                'user_id'  =>array(),
                            ));

                            $link = isset( $member['link'] ) ?  $member['link'] : '';
                            $user_id = wp_parse_args( $member['user_id'],array(
                                'id' => '',
                             ) );

                            $image_attributes = wp_get_attachment_image_src( $user_id['id'], 'onepress-small' );
                            $image_alt = get_post_meta( $user_id['id'], '_wp_attachment_image_alt', true);
                            
                            if ( $image_attributes ) {
                                $image = $image_attributes[0];
                                $data = get_post( $user_id['id'] );
                                $n ++ ;
                                ?>
                                <div class="team-member wow slideInUp">
                                    <div class="member-thumb">
                                        <?php if ( $link ) { ?>
                                            <a href="<?php echo esc_url( $link ); ?>">
                                        <?php } ?>
                                        <img src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr($image_alt); ?>" width="<?php echo esc_attr($image_attributes[1]); ?>" height="<?php echo esc_attr($image_attributes[2]); ?>">
                                        <?php if ( $link ) { ?>
                                            </a>
                                        <?php } ?>
                                        <?php do_action( 'onepress_section_team_member_media', $member ); ?>
                                    </div>
                                    <div class="member-info">
                                        <h5 class="member-name"><?php if ( $link ) { ?><a href="<?php echo esc_url( $link ); ?>"><?php } ?><?php echo esc_html( $data->post_title ); ?><?php if ( $link ) { ?></a><?php } ?></h5>
                                        <span class="member-position"><?php echo esc_html( $data->post_content ); ?></span>
                                    </div>
                                </div>
                                <?php
                            }

                        } // end foreach
                    }

                    ?>
                </div>
            </div>
            <?php do_action('onepress_section_after_inner', 'team'); ?>
        <?php if ( ! onepress_is_selective_refresh() ){ ?>
        </section>
        <?php } ?>
    <?php endif;
}
