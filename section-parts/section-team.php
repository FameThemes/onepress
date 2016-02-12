<?php
$onepress_team_id       = get_theme_mod( 'onepress_team_id', esc_html__('team', 'onepress') );
$onepress_team_disable  = get_theme_mod( 'onepress_team_disable' ) ==  1 ? true : false;
$onepress_team_title    = get_theme_mod( 'onepress_team_title', esc_html__('Our Team', 'onepress' ));
$onepress_team_subtitle = get_theme_mod( 'onepress_team_subtitle', esc_html__('Section subtitle', 'onepress' ));

$user_ids = onepress_get_section_team_data();
if ( ! empty( $user_ids ) ) {
    ?>
    <?php if ( ! $onepress_team_disable ) : ?>
        <section id="<?php if ($onepress_team_id != '') echo $onepress_team_id; ?>" <?php do_action('onepress_section_atts', 'team'); ?>
                 class="<?php echo esc_attr(apply_filters('onepress_section_class', 'section-team section-padding section-meta onepage-section', 'team')); ?>">
            <?php do_action('onepress_section_before_inner', 'team'); ?>
            <div class="container">
                <div class="section-title-area">
                    <?php if ($onepress_team_subtitle != '') echo '<h5 class="section-subtitle">' . esc_html($onepress_team_subtitle) . '</h5>'; ?>
                    <?php if ($onepress_team_title != '') echo '<h2 class="section-title">' . esc_html($onepress_team_title) . '</h2>'; ?>
                </div>
                <div class="team-members row">
                    <?php
                    if (!empty($user_ids)) {
                        foreach ($user_ids as $member) {
                            $member = wp_parse_args( $member, array(
                                'user_id'  =>array(),
                            ));
                            $user_id = wp_parse_args( $member['user_id'],array(
                                'id' => '',
                             ) );

                            $image_attributes = wp_get_attachment_image_src( $user_id['id'], 'onepress-small' );
                            if ( $image_attributes ) {
                                $image = $image_attributes[0];
                                $data = get_post( $user_id['id'] );
                                ?>
                                <div class="team-member col-sm-3 wow slideInUp">
                                    <div class="member-thumb">
                                        <img src="<?php echo esc_url( $image ); ?>" alt="">
                                        <?php do_action( 'onepress_section_team_member_media', $member ); ?>
                                    </div>
                                    <div class="member-info">
                                        <h5 class="member-name"><?php echo esc_html( $data->post_title ); ?></h5>
                                        <span class="member-position"><?php echo esc_html( $data->post_content ); ?></span>
                                    </div>
                                </div>
                                <?php
                            }
                        }
                    }

                    ?>
                </div>
            </div>
            <?php do_action('onepress_section_after_inner', 'team'); ?>
        </section>
    <?php endif;
}
