<?php
$id       = get_theme_mod( 'onepress_videolightbox_id', 'videolightbox' );
$disable  = get_theme_mod( 'onepress_videolightbox_disable' ) == 1 ? true : false;
$heading  = get_theme_mod( 'onepress_videolightbox_title' );
$video    = get_theme_mod( 'onepress_videolightbox_url' );
if ( onepress_is_selective_refresh() ) {
    $disable = false;
}
if ( ( ! $disable && ( $video || $heading ) )  || onepress_is_selective_refresh() ) {

    $image    = get_theme_mod( 'onepress_videolightbox_image' );
    if ( ! onepress_is_selective_refresh() ){
        if ( $image ) {
            echo '<div class="section-parallax">';
            echo ' <div class="parallax-bg" data-stellar-ratio="0.2" data-stellar-offset-parent="true" style="background-image: url('.esc_url( $image ).');"></div>';
        }
    ?>
    <section id="<?php if ($id != '') echo esc_attr( $id ); ?>" <?php do_action('onepress_section_atts', 'videolightbox'); ?>
         class="<?php echo esc_attr(apply_filters('onepress_section_class', 'section-videolightbox section-padding section-padding-larger section-inverse onepage-section', 'videolightbox')); ?>">

    <?php } ?>

        <?php do_action('onepress_section_before_inner', 'videolightbox'); ?>
        <div class="container">
            <?php if ( $video ) { ?>
            <div class="videolightbox__icon videolightbox-popup">
                <a href="<?php echo esc_attr( $video ); ?>" data-scr="<?php echo esc_attr( $video ); ?>" class="popup-video">
                    <span class="video_icon"><i class="fa fa-play"></i></span>
                </a>
            </div>
            <?php } ?>
            <?php if ( $heading ) { ?>
            <h2 class="videolightbox__heading"><?php echo do_shortcode( wp_kses_post( $heading ) ); ?></h2>
            <?php } ?>
        </div>
        <?php do_action('onepress_section_after_inner', 'videolightbox'); ?>

        <?php if ( ! onepress_is_selective_refresh() ) { ?>

    </section>
        <?php
        if ( $image ) {
            echo '</div>';
        }
    }?>

<?php
}
