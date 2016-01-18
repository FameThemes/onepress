<?php
$onepress_counter_id       = get_theme_mod( 'onepress_counter_id', __('counter', 'onepress') );
$onepress_counter_disable  = get_theme_mod( 'onepress_counter_disable' );
$onepress_counter_title    = get_theme_mod( 'onepress_counter_title', __('Our Numbers', 'onepress' ));
$onepress_counter_subtitle = get_theme_mod( 'onepress_counter_subtitle', __('Some Fun Facts', 'onepress' ));
?>
<?php if ( $onepress_counter_disable != '1' ) : ?>
<section id="<?php if ( $onepress_counter_id != '' ) echo $onepress_counter_id; ?>" class="section-padding section-counter onepage-section">
	<div class="container">

		<div class="section-title-area">
			<?php if ( $onepress_counter_subtitle != '' ) echo '<h5 class="section-subtitle">' . esc_html( $onepress_counter_subtitle ) . '</h5>'; ?>
			<?php if ( $onepress_counter_title != '' ) echo '<h2 class="section-title">' . esc_html( $onepress_counter_title ) . '</h2>'; ?>
		</div>

		<div class="row">
			<div class="col-sm-6 col-md-3 wow slideInUp">
				<div class="counter_item">
				    <div class="counter__number">268</div>
                    <div class="counter_title">Projects completed</div>
				</div>
			</div>
            <div class="col-sm-6 col-md-3 wow slideInUp">
				<div class="counter_item">
				    <div class="counter__number">2569k</div>
                    <div class="counter_title">Line of codes</div>
				</div>
			</div>
            <div class="col-sm-6 col-md-3 wow slideInUp">
				<div class="counter_item">
				    <div class="counter__number">984</div>
                    <div class="counter_title">Coffees</div>
				</div>
			</div>
            <div class="col-sm-6 col-md-3 wow slideInUp">
				<div class="counter_item">
				    <div class="counter__number">98%</div>
                    <div class="counter_title">Positive feedback</div>
				</div>
			</div>
		</div>

	</div>
</section>
<?php endif; ?>
