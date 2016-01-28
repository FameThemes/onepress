<?php
$onepress_about_id       = get_theme_mod( 'onepress_about_id', esc_html__('about', 'onepress') );
$onepress_about_disable  = get_theme_mod( 'onepress_about_disable' ) == 1 ? true : false;
$onepress_about_title    = get_theme_mod( 'onepress_about_title', esc_html__('About Us', 'onepress' ));
$onepress_about_subtitle = get_theme_mod( 'onepress_about_subtitle', esc_html__('Section subtitle', 'onepress' ));
?>
<?php if ( ! $onepress_about_disable  ) { ?>
	<section id="<?php if ( $onepress_about_id != '' ) { echo $onepress_about_id; }; ?>" <?php do_action( 'onepress_section_atts', 'about' ); ?> class="<?php echo esc_attr( apply_filters( 'onepress_section_class', 'section-about section-padding onepage-section', 'about' ) ); ?>">
		<?php do_action( 'onepress_section_before_inner', 'about' ); ?>
		<div class="container">
			<div class="section-title-area">
				<?php if ( $onepress_about_subtitle != '' ) {  echo '<h5 class="section-subtitle">' . esc_html( $onepress_about_subtitle ) . '</h5>'; } ?>
				<?php if ( $onepress_about_title != '' ) { echo '<h2 class="section-title">' . esc_html( $onepress_about_title ) . '</h2>';  } ?>
			</div>
			<div class="row">
				<?php
				$boxes = get_theme_mod( 'onepress_about_boxes' );

				if ( is_string( $boxes ) ) {
					$boxes = json_decode( $boxes , true );
				}
				$page_ids = array();
				$boxes_settings = array();
				if ( ! empty( $boxes ) && is_array( $boxes ) ) {
					foreach ( $boxes as $k => $v ) {
						if ( isset ( $v['content_page'] ) ) {
							$v['content_page'] = absint( $v['content_page'] );
							$page_ids[] =  $v['content_page'];
							$boxes_settings[ $v['content_page'] ] = wp_parse_args( $v, array( 'enable_link'=> 0 ) );
						}
					}
				}

				if ( ! empty( $page_ids ) ) {
					global $post;
					$pages = get_posts( array(
						'posts_per_page'   => -1,
						'orderby'          => 'post__in',
						'include'          => $page_ids,
						'post_type'        => 'page',
						'suppress_filters' => true
					) );

					$col = 3;
					$num_col = 4;
					$n = count($pages);
					if ($n < 4) {
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
					foreach ($pages as $i => $post ) {
						setup_postdata( $post );
						$class = 'col-lg-' . $col;
						if ($n == 1) {
							$class .= ' col-sm-12 ';
						} else {
							$class .= ' col-sm-6 ';
						}
						if ($j >= $num_col) {
							$j = 1;
							$class .= ' clearleft';
						} else {
							$j++;
						}
						?>
						<div class="<?php echo esc_attr($class); ?> wow slideInUp">
							<?php if ( has_post_thumbnail(  ) ) { ?>
								<div class="about-image"><?php
									if ( $boxes_settings[ $post->ID ]['enable_link'] ) {
										echo '<a href="'.get_permalink( $post ).'">';
									}
									the_post_thumbnail( 'onepress-medium' );
									if ( $boxes_settings[ $post->ID ]['enable_link'] ) {
										echo '</a>';
									}
									?></div>
							<?php } ?>
							<h3><?php

								if ( $boxes_settings[ $post->ID ]['enable_link'] ) {
									echo '<a href="'.get_permalink( $post ).'">';
								}

								the_title();

								if ( $boxes_settings[ $post->ID ]['enable_link'] ) {
									echo '</a>';
								}

								?></h3>
							<p><?php the_excerpt(); ?></p>
						</div>
					<?php
					} // end foreach

					wp_reset_query();
					wp_reset_postdata();
				}// ! empty pages ids
				?>
			</div>
		</div>
		<?php do_action( 'onepress_section_after_inner', 'about' ); ?>
	</section>
<?php } ?>
