<?php
$onepress_counter_id       = get_theme_mod( 'onepress_counter_id', esc_html__('counter', 'onepress') );
$onepress_counter_disable  = get_theme_mod( 'onepress_counter_disable' ) == 1 ? true : false;
$onepress_counter_title    = get_theme_mod( 'onepress_counter_title', esc_html__('Our Numbers', 'onepress' ));
$onepress_counter_subtitle = get_theme_mod( 'onepress_counter_subtitle', esc_html__('Section subtitle', 'onepress' ));
if ( onepress_is_selective_refresh() ) {
    $onepress_counter_disable = false;
}

// Get counter data
$boxes = onepress_get_section_counter_data();
if ( ! empty ( $boxes ) ) {
    $desc = get_theme_mod( 'onepress_counter_desc' );
    ?>
    <?php if ($onepress_counter_disable != '1') : ?>
        <?php if ( ! onepress_is_selective_refresh() ){ ?>
        <section id="<?php if ($onepress_counter_id != '') echo $onepress_counter_id; ?>" <?php do_action('onepress_section_atts', 'counter'); ?>
                 class="<?php echo esc_attr(apply_filters('onepress_section_class', 'section-counter section-padding onepage-section', 'counter')); ?>">
        <?php } ?>
            <?php do_action('onepress_section_before_inner', 'counter'); ?>
            <div class="container">
                <?php if ( $onepress_counter_title || $onepress_counter_subtitle || $desc ){ ?>
                <div class="section-title-area">
                    <?php if ($onepress_counter_subtitle != '') echo '<h5 class="section-subtitle">' . esc_html($onepress_counter_subtitle) . '</h5>'; ?>
                    <?php if ($onepress_counter_title != '') echo '<h2 class="section-title">' . esc_html($onepress_counter_title) . '</h2>'; ?>
                    <?php if ( $desc ) {
                        echo '<div class="section-desc">' . apply_filters( 'the_content', wp_kses_post( $desc ) ) . '</div>';
                    } ?>
                </div>
                <?php } ?>
                <div class="row">
                    <?php
                    $col = 3;
                    $num_col = 4;
                    $n = count( $boxes );
                    if ( $n < 4 ) {
                        switch ($n) {
                            case 3:
                                $col = 4;
                                $num_col = 3;
                                break;
                            case 2:
                                $col = 6;
                                $num_col = 2;
                                break;
                            default:
                                $col = 12;
                                $num_col = 1;
                        }
                    }
                    $j = 0;
                    foreach ($boxes as $i => $box) {
                        $box = wp_parse_args($box,
                            array(
                                'title' => '',
                                'number' => '',
                                'unit_before' => '',
                                'unit_after' => '',
                            )
                        );

                        $class = 'col-sm-6 col-md-' . $col;
                        if ($j >= $num_col) {
                            $j = 1;
                            $class .= ' clearleft';
                        } else {
                            $j++;
                        }
                        ?>

                        <div class="<?php echo esc_attr($class); ?>">
                            <div class="counter_item">
                                <div class="counter__number">
                                    <?php if ($box['unit_before']) { ?>
                                        <span class="n-b"><?php echo esc_html($box['unit_before']); ?></span>
                                    <?php } ?>
                                    <span class="n counter"><?php echo esc_html($box['number']); ?></span>
                                    <?php if ($box['unit_after']) { ?>
                                        <span class="n-a"><?php echo esc_html($box['unit_after']); ?></span>
                                    <?php } ?>
                                </div>
                                <div class="counter_title"><?php echo esc_html($box['title']); ?></div>
                            </div>
                        </div>

                        <?php
                    } // end foreach

                    ?>
                </div>
            </div>
            <?php do_action('onepress_section_after_inner', 'counter'); ?>
        <?php if ( ! onepress_is_selective_refresh() ){ ?>
        </section>
        <?php } ?>
    <?php endif;
}
