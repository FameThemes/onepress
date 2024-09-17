<?php
$id       = get_theme_mod( 'onepress_about_id', 'about' );
$disable  = get_theme_mod( 'onepress_about_disable' ) == 1 ? true : false;
$title    = get_theme_mod( 'onepress_about_title', esc_html__( 'About Us', 'onepress' ) );
$subtitle = get_theme_mod( 'onepress_about_subtitle', esc_html__( 'Section subtitle', 'onepress' ) );
$desc     = get_theme_mod( 'onepress_about_desc' );
if ( onepress_is_selective_refresh() ) {
	$disable = false;
}
// Get data
$page_ids = onepress_get_section_about_data();
$content_source = get_theme_mod( 'onepress_about_content_source' );

?>
	<?php if ( ! $disable ) { ?>
		<?php if ( ! onepress_is_selective_refresh() ) { ?>
		<section id="<?php if ( $id != '' ) {
			echo esc_attr( $id );
}; ?>" <?php do_action( 'onepress_section_atts', 'about' ); ?> class="<?php echo esc_attr( apply_filters( 'onepress_section_class', 'section-about section-padding onepage-section', 'about' ) ); ?>">
		<?php } ?>

			<?php do_action( 'onepress_section_before_inner', 'about' ); ?>
			<div class="<?php echo esc_attr( apply_filters( 'onepress_section_container_class', 'container', 'about' ) ); ?>">
				<?php if ( $title || $subtitle || $desc ) { ?>
				<div class="section-title-area">
					<?php if ( $subtitle != '' ) {
						echo '<h5 class="section-subtitle">' . esc_html( $subtitle ) . '</h5>';
} ?>
					<?php if ( $title != '' ) {
						echo '<h2 class="section-title">' . esc_html( $title ) . '</h2>';
} ?>
					<?php if ( $desc != '' ) {
						echo '<div class="section-desc">' . wp_kses_post(apply_filters( 'onepress_the_content', $desc )) . '</div>';
} ?>
				</div>
				<?php } ?>
				<div class="row">
					<?php
					if ( is_array( $page_ids ) && ! empty( $page_ids ) ) {
						$col = 3;
						$num_col = 4;
						$n = count( $page_ids );
						if ( $n < 4 ) {
							switch ( $n ) {
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

						// Layout columns
						$_layout = absint( get_theme_mod( 'onepress_about_layout', 3 ) );
						if ( $n > $_layout ) {
							$num_col = $_layout;
							$col = round( 12 / $_layout );
						}


						$j = 0;
						foreach ( $page_ids as $post_id => $settings ) {
							$post_id = $settings['content_page'];
							$post_id = apply_filters( 'wpml_object_id', $post_id, 'page', true );
							$post = get_post( $post_id );
							$class = 'col-lg-' . $col;
							if ( $n == 1 ) {
								$class .= ' col-sm-12 ';
							} else {
								$class .= ' col-sm-6 ';
							}
							if ( $j >= $num_col ) {
								$j = 1;
								$class .= ' clearleft';
							} else {
								$j++;
							}
							?>
							<div class="<?php echo esc_attr( $class ); ?> wow slideInUp">
								<?php if ( has_post_thumbnail( $post ) ) { ?>
									<div class="about-image"><?php
									if ( $settings['enable_link'] ) {
										echo '<a href="' . esc_url( get_permalink( $post ) ) . '">';
									}
										echo get_the_post_thumbnail( $post, 'onepress-medium' );
									if ( $settings['enable_link'] ) {
										echo '</a>';
									}
									?></div>
								<?php } ?>
								<?php if ( ! $settings['hide_title'] ) { ?>
									<h3><?php
									if ( $settings['enable_link'] ) {
										echo '<a href="' . esc_url( get_permalink( $post ) ) . '">';
									}
										echo wp_kses_post( get_the_title( $post ) );
									if ( $settings['enable_link'] ) {
										echo '</a>';
									}

									?></h3>
								<?php } ?>
								<?php
								if ( $content_source == 'excerpt' ) {
									$excerpt = get_the_excerpt( $post );
									echo wp_kses_post(apply_filters( 'the_excerpt', $excerpt ));
								} else {
									$content = apply_filters( 'the_content', $post->post_content );
									$content = str_replace( ']]>', ']]&gt;', $content );
									echo wp_kses_post($content);
								}

								?>
							</div>
							<?php
						} // end foreach
						wp_reset_postdata();
					}// ! empty pages ids
					?>
				</div>
			</div>
			<?php do_action( 'onepress_section_after_inner', 'about' ); ?>
		<?php if ( ! onepress_is_selective_refresh() ) { ?>
		</section>
		<?php } ?>
	<?php }

