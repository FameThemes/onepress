<?php
$id       = get_theme_mod( 'onepress_videolightbox_id', 'videolightbox' );
$disable  = get_theme_mod( 'onepress_videolightbox_disable' ) == 1 ? true : false;
$heading  = get_theme_mod( 'onepress_videolightbox_title' );
$media    = onepress_parse_media_control_value( get_theme_mod( 'onepress_videolightbox_media_url' ) );
$video    = $media['url'];
if ( $video === '' ) {
	$video = get_theme_mod( 'onepress_videolightbox_url' );
}
if ( onepress_is_selective_refresh() ) {
    $disable = false;
}

if ( ! $disable ) {
    if ( (!$disable && ($video || $heading)) || onepress_is_selective_refresh()) {
        ?>
        <section id="<?php if ($id != '') echo esc_attr($id); ?>" <?php do_action('onepress_section_atts', 'videolightbox'); ?>
        class="<?php echo esc_attr(apply_filters('onepress_section_class', 'section-videolightbox section-padding section-padding-larger section-inverse onepage-section', 'videolightbox')); ?>">
    <?php } ?>
    <?php do_action('onepress_section_before_inner', 'videolightbox'); ?>
    <div class="<?php echo esc_attr(apply_filters('onepress_section_container_class', 'container', 'videolightbox')); ?>">
		<?php if ( $video ) { ?>
			<div class="videolightbox__icon videolightbox-popup">
				<?php
				$is_self_video = onepress_is_self_hosted_video_file_url( $video );
				if ( $is_self_video ) {
					$mime       = $media['id'] ? (string) get_post_mime_type( $media['id'] ) : '';
					$data_html  = onepress_videolightbox_lightgallery_data_html( $video, $mime );
					$poster_url = onepress_videolightbox_poster_url();
					?>
				<a href=""
					class="popup-video videolightbox-link-self-hosted"
					data-html="<?php echo esc_attr( $data_html ); ?>"
					<?php if ( $poster_url !== '' ) : ?>
					data-poster="<?php echo esc_url( $poster_url ); ?>"
					<?php endif; ?>>
					<span class="video_icon"><i class="fa fa-play"></i></span>
				</a>
				<?php } else { ?>
				<a href="<?php echo esc_url( $video ); ?>" data-src="<?php echo esc_url( $video ); ?>" class="popup-video">
					<span class="video_icon"><i class="fa fa-play"></i></span>
				</a>
				<?php } ?>
			</div>
		<?php } ?>
		<?php if ( $heading ) { ?>
			<h2 class="videolightbox__heading"><?php echo do_shortcode( wp_kses_post( $heading ) ); ?></h2>
		<?php } ?>
    </div>
    <?php do_action('onepress_section_after_inner', 'videolightbox'); ?>
    <?php if ( ( !$disable && ($video || $heading)) || onepress_is_selective_refresh()) { ?>
        </section>
    <?php }
}
