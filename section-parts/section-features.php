<?php
$id       = get_theme_mod( 'onepress_features_id', esc_html__('features', 'onepress') );
$disable  = get_theme_mod( 'onepress_features_disable' ) == 1 ? true : false;
$title    = get_theme_mod( 'onepress_features_title', esc_html__('Features', 'onepress' ));
$subtitle = get_theme_mod( 'onepress_features_subtitle', esc_html__('Why choose Us', 'onepress' ));

$data  = onepress_get_features_data();
if ( !$disable && !empty( $data ) ) {
?>
<section id="<?php if ( $id != '') echo $id; ?>" <?php do_action('onepress_section_atts', 'features'); ?>
         class="<?php echo esc_attr(apply_filters('onepress_section_class', 'section-features section-padding section-meta onepage-section', 'features')); ?>">
    <?php do_action('onepress_section_before_inner', 'features'); ?>
    <div class="container">
        <div class="section-title-area">
            <?php if ($subtitle != '') echo '<h5 class="section-subtitle">' . esc_html($subtitle) . '</h5>'; ?>
            <?php if ($title != '') echo '<h2 class="section-title">' . esc_html($title) . '</h2>'; ?>
            <?php if ( $desc = get_theme_mod( 'onepress_features_desc' ) ) {
                echo '<div class="section-desc">' . wp_kses_post( $desc ) . '</div>';
            } ?>
        </div>
        <div class="section-content">
            <div class="row">
            <?php
            $layout = intval( get_theme_mod( 'onepress_features_layout', 3 ) );
            foreach ( $data as $k => $f ) {
                $f['icon'] = trim( $f['icon'] );
                if ($f['icon'] != '' && strpos($f['icon'], 'fa-') !== 0) {
                    $f['icon'] = 'fa-' . $f['icon'];
                }
                ?>
                <div class="feature-item col-lg-<?php echo esc_attr( $layout ); ?> col-md-6 wow slideInUp">
                    <div class="feature-media">
                        <?php if ( $f['link'] ) { ?><a href="<?php echo esc_url( $f['link']  ); ?>"><?php } ?>
                        <span class="fa-stack fa-5x">
                            <i class="fa fa-circle fa-stack-2x icon-background-default"></i>
                            <i class="feature-icon fa <?php echo esc_attr( $f['icon'] ); ?> fa-stack-1x"></i>
                        </span>
                        <?php if ( $f['link'] )  { ?></a><?php } ?>
                    </div>
                    <h4><?php if ( $f['link'] ) { ?><a href="<?php echo esc_url( $f['link']  ); ?>"><?php } ?><?php echo esc_html( $f['title'] ); ?><?php if ( $f['link'] )  { ?></a><?php } ?></h4>
                    <p><?php echo esc_html( $f['desc'] ); ?></p>
                </div>
            <?php
            }// end loop featues

            ?>
            </div>
        </div>
    </div>
    <?php do_action('onepress_section_after_inner', 'features'); ?>
</section>
<?php } ?>