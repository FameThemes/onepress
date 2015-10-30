<?php
$onepress_project_id       = get_theme_mod( 'onepress_project_id', __('projects', 'onepress') );
$onepress_project_disable  = get_theme_mod( 'onepress_project_disable' );
$onepress_project_title    = get_theme_mod( 'onepress_project_title', __('Highlight Projects', 'onepress' ));
$onepress_project_subtitle = get_theme_mod( 'onepress_project_subtitle', __('Some of our works', 'onepress' ));
?>
<?php if ( $onepress_project_disable != '1' ) : ?>
<section id="<?php if ( $onepress_project_id != '' ) echo $onepress_project_id; ?>" class="section-padding section-projects onepage-section">
	<div class="container">
		<div class="section-title-area">
			<?php if ( $onepress_project_subtitle != '' ) echo '<h5 class="section-subtitle">' . esc_html( $onepress_project_subtitle ) . '</h5>'; ?>
			<?php if ( $onepress_project_title != '' ) echo '<h2 class="section-title">' . esc_html( $onepress_project_title ) . '</h2>'; ?>
		</div>
	
		<div class="project-wrapper project-3-column  wow slideInUp">

			<?php if ( ! is_active_sidebar( 'section_project' ) ) { ?>

			<div class="project-item wow slideInUp">
				<div class="project-content project-contents">
					<div class="project-thumb project-trigger"><img src="<?php echo get_template_directory_uri() . '/assets/images/project1.jpg' ?>" alt=""></div>
					<div class="project-header project-trigger">
						<h5 class="project-small-title">Project Title First</h5>
						<div class="project-meta">Branding / Print</div>
					</div>
				</div>
				<div class="project-detail project-expander">
					<div class="grid-row project-expander-contents">

						<div class="project-trigger-close close">close</div>

						<div class="grid-sm-7">
							<img src="<?php echo get_template_directory_uri() . '/assets/images/project1.jpg' ?>" alt="">
						</div>
						<div class="grid-sm-5 project-detail-content">
							<h2 class="project-detail-title">Project Title First</h2>
							<div class="project-detail-entry">
								<p>Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec <a href="#">vulputate eget</a> arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis.</p>
								<p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae.</p>
								<p><strong>Skills: </strong><i>WordPress, HTML, CSS, jQuery</i></p>
								<p><strong>Client: </strong><i>FameThemes, LLC</i></p>
								<p><strong>Website: </strong><a href="<?php echo esc_url('http://www.famethemes.com', 'onepress') ?>"><i><?php echo esc_url('http://www.famethemes.com', 'onepress') ?></i></a></p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="project-item wow slideInUp">
				<div class="project-content project-contents">
					<div class="project-thumb project-trigger"><img src="<?php echo get_template_directory_uri() . '/assets/images/project2.jpg' ?>" alt=""></div>
					<div class="project-header">
						<h5 class="project-small-title project-trigger">Project Title Second</h5>
						<div class="project-meta">Video / Packaging</div>
					</div>
				</div>
				<div class="project-detail project-expander">
					<div class="grid-row project-expander-contents">

						<div class="project-trigger-close close">x</div>

						<div class="grid-sm-7">
							<img src="<?php echo get_template_directory_uri() . '/assets/images/project2.jpg' ?>" alt="">
						</div>
						<div class="grid-sm-5 project-detail-content">
							<h2 class="project-detail-title">Project Title Second</h2>
							<div class="project-detail-entry">
								<p>Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec <a href="#">vulputate eget</a> arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis.</p>
								<p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae.</p>
								<p><strong>Skills: </strong><i>WordPress, HTML, CSS, jQuery</i></p>
								<p><strong>Client: </strong><i>FameThemes, LLC</i></p>
								<p><strong>Website: </strong><a href="<?php echo esc_url('http://www.famethemes.com', 'onepress') ?>"><i><?php echo esc_url('http://www.famethemes.com', 'onepress') ?></i></a></p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="project-item wow slideInUp">
				<div class="project-content project-contents">
					<div class="project-thumb project-trigger"><img src="<?php echo get_template_directory_uri() . '/assets/images/project3.jpg' ?>" alt=""></div>
					<div class="project-header">
						<h5 class="project-small-title project-trigger">Project Title Third</h5>
						<div class="project-meta">Video / Web Design</div>
					</div>
				</div>
				<div class="project-detail project-expander">
					<div class="grid-row project-expander-contents">

						<div class="project-trigger-close close">x</div>

						<div class="grid-sm-7">
							<img src="<?php echo get_template_directory_uri() . '/assets/images/project3.jpg' ?>" alt="">
						</div>
						<div class="grid-sm-5 project-detail-content">
							<h2 class="project-detail-title">Project Title Third</h2>
							<div class="project-detail-entry">
								<p>Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec <a href="#">vulputate eget</a> arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis.</p>
								<p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae.</p>
								<p><strong>Skills: </strong><i>WordPress, HTML, CSS, jQuery</i></p>
								<p><strong>Client: </strong><i>FameThemes, LLC</i></p>
								<p><strong>Website: </strong><a href="<?php echo esc_url('http://www.famethemes.com', 'onepress') ?>"><i><?php echo esc_url('http://www.famethemes.com', 'onepress') ?></i></a></p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="project-item wow slideInUp">
				<div class="project-content project-contents">
					<div class="project-thumb project-trigger"><img src="<?php echo get_template_directory_uri() . '/assets/images/project4.jpg' ?>" alt=""></div>
					<div class="project-header">
						<h5 class="project-small-title project-trigger">Project Title Fourth</h5>
						<div class="project-meta">Graphic / Video</div>
					</div>
				</div>
				<div class="project-detail project-expander">
					<div class="grid-row project-expander-contents">

						<div class="project-trigger-close close">x</div>

						<div class="grid-sm-7">
							<img src="<?php echo get_template_directory_uri() . '/assets/images/project4.jpg' ?>" alt="">
						</div>
						<div class="grid-sm-5 project-detail-content">
							<h2 class="project-detail-title">Project Title Fourth</h2>
							<div class="project-detail-entry">
								<p>Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec <a href="#">vulputate eget</a> arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis.</p>
								<p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae.</p>
								<p><strong>Skills: </strong><i>WordPress, HTML, CSS, jQuery</i></p>
								<p><strong>Client: </strong><i>FameThemes, LLC</i></p>
								<p><strong>Website: </strong><a href="<?php echo esc_url('http://www.famethemes.com', 'onepress') ?>"><i><?php echo esc_url('http://www.famethemes.com', 'onepress') ?></i></a></p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="project-item wow slideInUp">
				<div class="project-content project-contents">
					<div class="project-thumb project-trigger"><img src="<?php echo get_template_directory_uri() . '/assets/images/project5.jpg' ?>" alt=""></div>
					<div class="project-header">
						<h5 class="project-small-title project-trigger">Project Title Fifth</h5>
						<div class="project-meta">Web / Package</div>
					</div>
				</div>
				<div class="project-detail project-expander">
					<div class="grid-row project-expander-contents">

						<div class="project-trigger-close close">x</div>

						<div class="grid-sm-7">
							<img src="<?php echo get_template_directory_uri() . '/assets/images/project5.jpg' ?>" alt="">
						</div>
						<div class="grid-sm-5 project-detail-content">
							<h2 class="project-detail-title">Project Title Fifth</h2>
							<div class="project-detail-entry">
								<p>Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec <a href="#">vulputate eget</a> arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis.</p>
								<p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae.</p>
								<p><strong>Skills: </strong><i>WordPress, HTML, CSS, jQuery</i></p>
								<p><strong>Client: </strong><i>FameThemes, LLC</i></p>
								<p><strong>Website: </strong><a href="<?php echo esc_url('http://www.famethemes.com', 'onepress') ?>"><i><?php echo esc_url('http://www.famethemes.com', 'onepress') ?></i></a></p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="project-item wow slideInUp">
				<div class="project-content project-contents">
					<div class="project-thumb project-trigger"><img src="<?php echo get_template_directory_uri() . '/assets/images/project6.jpg' ?>" alt=""></div>
					<div class="project-header">
						<h5 class="project-small-title project-trigger">Project Title Sixth</h5>
						<div class="project-meta">Graphic / Branding</div>
					</div>
				</div>
				<div class="project-detail project-expander">
					<div class="grid-row project-expander-contents">

						<div class="project-trigger-close close">x</div>

						<div class="grid-sm-7">
							<img src="<?php echo get_template_directory_uri() . '/assets/images/project6.jpg' ?>" alt="">
						</div>
						<div class="grid-sm-5 project-detail-content">
							<h2 class="project-detail-title">Project Title Sixth</h2>
							<div class="project-detail-entry">
								<p>Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec <a href="#">vulputate eget</a> arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis.</p>
								<p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae.</p>
								<p><strong>Skills: </strong><i>WordPress, HTML, CSS, jQuery</i></p>
								<p><strong>Client: </strong><i>FameThemes, LLC</i></p>
								<p><strong>Website: </strong><a href="<?php echo esc_url('http://www.famethemes.com', 'onepress') ?>"><i><?php echo esc_url('http://www.famethemes.com', 'onepress') ?></i></a></p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<?php } else { ?>
				<?php dynamic_sidebar( 'section_project' ); ?>
			<?php } ?>

			<div class="clear"></div>
		</div>
	</div>
</section>
<?php endif; ?>

<?php
$onepress_project_parallax_disable  = get_theme_mod( 'onepress_project_parallax_disable' );
$onepress_project_parallax_image    = get_theme_mod( 'onepress_project_parallax_image', get_template_directory_uri() . '/assets/images/hero1.jpg' );
$onepress_project_parallax_content  = get_theme_mod( 'onepress_project_parallax_content', __('<h2>Like our projects? we are just getting started</h2><a class="btn btn-ghost" href="#contact">Contact Us Today</a>', 'onepress' ));
?>

<?php if ( $onepress_project_parallax_disable != '1' ) : ?>
<section id="call-to-action" class="onepage-section">
	<div class="section-has-parallax clearfix" data-speed="0.5" data-bg="<?php echo $onepress_project_parallax_image; ?>">
		<div class="parallax_bg_overlay" style="background: #000000"></div>
		<div class="parallax_bg not-mobile" style="background-image: url('<?php echo $onepress_project_parallax_image; ?>');"></div>
		<div class="parallax-content">
			<div class="container">
				<?php if ( $onepress_project_parallax_content != '' ) echo '' . wp_kses_post( $onepress_project_parallax_content ) . ''; ?>
			</div>
		</div>
	</div>
</section>
<?php endif; ?>