<?php
/**
 * Add theme dashboard page
 */

add_action('admin_menu', 'onepress_theme_info');
function onepress_theme_info() {
	$theme_data = wp_get_theme();
	add_theme_page( sprintf( esc_html__( '%s Dashboard', 'onepress' ), $theme_data->Name ), sprintf( esc_html__('%s Theme', 'onepress'), $theme_data->Name), 'edit_theme_options', 'ft_onepress', 'onepress_theme_info_page');
}

function onepress_theme_info_page() {

	$theme_data = wp_get_theme();

	// Check for current viewing tab
	$tab = null;
	if ( isset( $_GET['tab'] ) ) {
		$tab = $_GET['tab'];
	} else {
		$tab = null;
	}
	?>

	<div class="wrap about-wrap theme_info_wrapper">
		<h1><?php printf(esc_html__('Welcome to %1s - Version %2s', 'onepress'), $theme_data->Name, $theme_data->Version ); ?></h1>
		<div class="about-text"><?php esc_html_e( 'OnePress is a creative and flexible WordPress ONE PAGE theme well suited for business, portfolio, digital agency, product showcase, freelancers websites.', 'onepress' ); ?></div>
		<a target="_blank" href="<?php echo esc_url('http://www.famethemes.com/?utm_source=theme_dashboard_page&utm_medium=badge_link&utm_campaign=theme_admin'); ?>" class="famethemes-badge wp-badge"><span>FameThemes</span></a>
		<h2 class="nav-tab-wrapper">
			<a href="?page=ft_onepress" class="nav-tab<?php echo is_null($tab) ? ' nav-tab-active' : null; ?>"><?php echo $theme_data->Name; ?></a>
			<a href="?page=ft_onepress&tab=actions_required" class="nav-tab<?php echo $tab == 'actions_required' ? ' nav-tab-active' : null; ?>"><?php esc_html_e( 'Actions Required', 'onepress' ); ?></a>
		</h2>

		<?php if ( is_null($tab) ) { ?>
		<div class="theme_info info-tab-content">
			<div class="theme_info_column clearfix">
				<div class="theme_info_left">
					<div class="theme_link">
						<h3><?php esc_html_e( 'Theme Customizer', 'onepress' ); ?></h3>
						<p class="about"><?php printf(esc_html__('%s supports the Theme Customizer for all theme settings. Click "Customize" to start customize your site.', 'onepress'), $theme_data->Name); ?></p>
						<p>
							<a href="<?php echo admin_url('customize.php'); ?>" class="button button-primary"><?php esc_html_e('Start Customize', 'onepress'); ?></a>
						</p>
					</div>
					<div class="theme_link">
						<h3><?php esc_html_e( 'Theme Documentation', 'onepress' ); ?></h3>
						<p class="about"><?php printf(esc_html__('Need any help to setup and configure %s? Please have a look at our documentations instructions.', 'onepress'), $theme_data->Name); ?></p>
						<p>
							<a href="<?php echo esc_url( 'http://docs.famethemes.com/category/42-onepress' ); ?>" target="_blank" class="button button-secondary"><?php esc_html_e('Online Documentation', 'onepress'); ?></a>
						</p>
					</div>
					<div class="theme_link">
						<h3><?php esc_html_e( 'Having Trouble, Need Support?', 'onepress' ); ?></h3>
						<p class="about"><?php printf(esc_html__('Support for %s WordPress theme is conducted through the WordPress free theme support forum.', 'onepress'), $theme_data->Name); ?></p>
						<p>
							<a href="<?php echo esc_url('https://wordpress.org/support/theme/onepress' ); ?>" target="_blank" class="button button-secondary"><?php echo sprintf( esc_html('Go To %s Support Forum', 'onepress'), $theme_data->Name); ?></a>
						</p>
					</div>
				</div>

				<div class="theme_info_right">
					<img src="<?php echo get_template_directory_uri(); ?>/screenshot.png" alt="Theme Screenshot" />
				</div>
			</div>
		</div>
		<?php } ?>

		<?php if ( $tab == 'actions_required' ) { ?>
		<div class="action-required-tab info-tab-content">
			ss
		</div>
		<?php } ?>

	</div> <!-- END .theme_info -->

<?php
}
?>
