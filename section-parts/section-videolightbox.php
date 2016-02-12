<?php
$onepress_videolightbox_id       = get_theme_mod( 'onepress_videolightbox_id', esc_html__('video', 'onepress') );
$onepress_videolightbox_disable  = get_theme_mod( 'onepress_videolightbox_disable' ) == 1 ? true : false;
// Two fields: Video URL ( Youtube or Vimeo ) + Heading Text ( accept HTML )
?>

<div id="parallax-videolightbox" class="parallax-videolightbox parallax-window" data-over-scroll-fix="true" data-z-index="1" data-speed="0.3" data-image-src="http://localhost/FAME/onepress/wp-content/themes/onepress/assets/images/hero5.jpg" data-parallax="scroll" data-position="center" data-bleed="0">
<section id="<?php if ($onepress_videolightbox_id != '') echo $onepress_videolightbox_id; ?>" <?php do_action('onepress_section_atts', 'videolightbox'); ?>
         class="<?php echo esc_attr(apply_filters('onepress_section_class', 'section-videolightbox section-padding section-padding-larger section-inverse onepage-section', 'videolightbox')); ?>">
    <?php do_action('onepress_section_before_inner', 'videolightbox'); ?>
    <div class="container">
        <div class="videolightbox__icon">
            <a href="https://www.youtube.com/watch?v=eRCKYLjR7yw" class="popup-video">
                <span class="video_icon"><i class="fa fa-play"></i></span>
            </a>
        </div>
        <h2 class="videolightbox__heading">Forward <strong>thinking</strong> brands and clients</h2>
    </div>
    <?php do_action('onepress_section_after_inner', 'videolightbox'); ?>
</section>
</div>
