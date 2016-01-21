<?php
/**
 * Add theme dashboard page
 */

add_action('admin_menu', 'onepress_theme_info');
function onepress_theme_info() {
	$theme_data = wp_get_theme();
	add_theme_page( sprintf( esc_html__( '%s Dashboard', 'onepress' ), $theme_data->Name ), sprintf( esc_html__('%s Theme', 'onepress'), $theme_data->Name), 'edit_themes', 'ft_onepress', 'onepress_theme_info_page');
}

function onepress_theme_info_page() {

	$theme_data = wp_get_theme(); ?>

	<div class="wrap about-wrap theme_info_wrapper">
		<h1><?php printf(esc_html__('Welcome to %1s - Version %2s', 'onepress'), $theme_data->Name, $theme_data->Version ); ?></h1>
		<div class="about-text">OnePress is a creative and flexible WordPress ONE PAGE theme well suited for business, portfolio, digital agency, product showcase, freelancers websites</div>
		<a target="_blank" href="<?php echo esc_url('http://www.famethemes.com/?utm_source=theme_dashboard_page&utm_medium=badge_link&utm_campaign=theme_admin'); ?>" class="famethemes-badge wp-badge"><span>FameThemes</span></a>
		<h2 class="nav-tab-wrapper">
			<a href="?page=ft_onepress" class="nav-tab nav-tab-active"><?php echo $theme_data->Name; ?></a>
		</h2>

		<div class="theme_info">
			<div class="theme_info_column clearfix">
				<div class="theme_info_left">
					<div class="theme_link">
						<h3>Theme Customizer</h3>
						<p class="about"><?php printf(esc_html__('%s supports the Theme Customizer for all theme settings. Click "Customize" to start customize your site.', 'onepress'), $theme_data->Name); ?></p>
						<p>
							<a href="<?php echo admin_url('customize.php'); ?>" class="button button-primary"><?php esc_html_e('Start Customize', 'onepress'); ?></a>
						</p>
					</div>
					<div class="theme_link">
						<h3>Theme Documentation</h3>
						<p class="about"><?php printf(esc_html__('Need any help to setup and configure %s? Please have a look at our documentations instructions.', 'onepress'), $theme_data->Name); ?></p>
						<p>
							<a href="<?php echo esc_url( esc_html__( 'http://docs.famethemes.com/category/42-onepress', 'onepress' ) ); ?>" target="_blank" class="button button-secondary"><?php esc_html_e('Online Documentation', 'onepress'); ?></a>
						</p>
					</div>
					<div class="theme_link">
						<h3>Having Trouble, Need Support?</h3>
						<p class="about"><?php printf(esc_html__('Support for %s WordPress theme is conducted through the WordPress free theme support forum.', 'onepress'), $theme_data->Name); ?></p>
						<p>
							<a href="<?php echo esc_url( esc_html__( 'https://wordpress.org/support/theme/onepress', 'onepress' ) ); ?>" target="_blank" class="button button-secondary"><?php echo sprintf( esc_html('Go To %s Support Forum', 'onepress'), $theme_data->Name); ?></a>
						</p>
					</div>
				</div>

				<div class="theme_info_right">
					<img src="<?php echo get_template_directory_uri(); ?>/screenshot.png" alt="Theme Screenshot" />
				</div>
			</div>
		</div>
	</div> <!-- END .theme_info -->

<?php
}
?>
