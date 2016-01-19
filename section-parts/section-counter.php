<?php
$onepress_counter_id       = get_theme_mod( 'onepress_counter_id', __('counter', 'onepress') );
$onepress_counter_disable  = get_theme_mod( 'onepress_counter_disable' ) == 1 ? true : false;
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
			<?php

			$boxes = get_theme_mod( 'onepress_counter_boxes' );

			if ( is_string( $boxes ) ) {
				$boxes = json_decode( $boxes , true );
			}

			if ( empty( $boxes ) || ! is_array( $boxes ) ) {
				$boxes = array(
					array(
						'title' => __( 'Projects completed', 'onepress' ),
						'number'  => '268',
						'unit_before' => '',
						'unit_after' => ''
					),

					array(
						'title' => __( 'Line of codes', 'onepress' ),
						'number'  => '2569',
						'unit_before' => '',
						'unit_after' => 'k'
					),

					array(
						'title' => __( 'Coffees', 'onepress' ),
						'number'  => '984',
						'unit_before' => '',
						'unit_after' => 'k'
					),

					array(
						'title' => __( 'Positive feedback', 'onepress' ),
						'number'  => '98',
						'unit_before' => '',
						'unit_after' => esc_attr('%')
					),

				);
			}

			$col =  3;
			$num_col = 4;
			$n = count( $boxes );
			if ( $n < 4 ) {
				switch ( $n ){
					case 3:
						$col =  4;
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
			foreach ( $boxes as $i => $box ) {
				$box = wp_parse_args( $box,
					array(
						'title' 			=> '',
						'number' 			=> '',
						'unit_before' 		=>  '',
						'unit_after' 		=>  '',
					)
				);

				$class = 'col-sm-6 col-md-'.$col;
				if ( $j >= $num_col ){
					$j = 1;
					$class .=' clearleft';
				} else {
					$j ++ ;
				}
				?>

				<div class="<?php echo esc_attr( $class ); ?>">
					<div class="counter_item">
						<div class="counter__number">
							<?php if ( $box['unit_before'] ) { ?>
								<span class="n-b"><?php echo esc_html( $box['unit_before'] ); ?></span>
							<?php } ?>
							<span class="n counter"><?php echo esc_html( $box['number'] ); ?></span>
							<?php if ( $box['unit_after'] ) { ?>
								<span class="n-a"><?php echo esc_html( $box['unit_after'] ); ?></span>
							<?php } ?>
						</div>
						<div class="counter_title"><?php echo esc_html( $box['title'] ); ?></div>
					</div>
				</div>

			<?php
			} // end foreach

			?>

		</div>

	</div>
</section>
<?php endif; ?>
