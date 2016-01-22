<?php
$onepress_cta_id       = get_theme_mod( 'onepress_cta_id', esc_html__('about', 'onepress') );
$onepress_cta_title    = get_theme_mod( 'onepress_cta_title', esc_html__('Pricing Table', 'onepress' ));
$onepress_cta_subtitle = get_theme_mod( 'onepress_cta_subtitle', esc_html__('Responsive pricing section', 'onepress' ));
?>
<section id="section-cta" class="<?php echo esc_attr( apply_filters( 'onpress_section_class', 'section-cta section-padding section-inverse onepage-section', 'cta' ) ); ?>">
	<?php do_action( 'onepress_section_before_inner', 'cta' ); ?>

    <div class="container">
        <div class="row">
            <div class="col-md-12 col-lg-9 cta-heading">
                <h2>Use these ribbons to display calls to action mid-page.</h2>
            </div>
            <div class="col-md-12 col-lg-3 cta-button-area">
                <a href="#" class="btn btn-theme-primary-outline">Button Text</a>
            </div>
        </div>
    </div>

	<?php do_action( 'onepress_section_after_inner', 'cta' ); ?>
</section>
