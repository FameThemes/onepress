<?php

class Onepress_Dashboard
{

	private static $_instance = null;

	static function get_instance()
	{
		if (is_null(self::$_instance)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	function init()
	{
		add_action('switch_theme', array($this, 'reset_recommended_actions'));

		if (is_admin()) {
			add_action('admin_enqueue_scripts', array($this, 'admin_scripts'));
			add_action('admin_menu', array($this, 'theme_info'));
			/* activation notice */
			add_action('load-themes.php',  array($this, 'activation_admin_notice'));
			add_action('admin_init', array($this, 'admin_dismiss_actions'));
		}
	}

	function reset_recommended_actions()
	{
		delete_option('onepress_actions_dismiss');
	}

	/**
	 * Add theme dashboard page
	 */
	/**
	 * Check maybe show admin notice
	 * @since 2.0.8
	 */
	function maybe_show_switch_theme_notice()
	{
		if (get_option('onepress_dismiss_switch_theme_notice')) {
			return false;
		}
		$keys = array(
			'onepress_hcl1_largetext',
			'onepress_hcl1_smalltext',
			'onepress_hcl2_content',
			'onepress_features_boxes',
			'onepress_services',
			'onepress_videolightbox_title',
			'onepress_gallery_source',
			'onepress_team_members',
			'onepress_contact_text',
			'onepress_contact_address',
		);

		foreach ($keys as $k) {
			if (get_theme_mod($k)) {
				return false;
			}
		}

		return true;
	}


	/**
	 * Enqueue scripts for admin page only: Theme info page
	 */
	function admin_scripts($hook)
	{
		if ($hook === 'widgets.php' || $hook === 'appearance_page_ft_onepress') {
			$theme_directory_url = get_template_directory_uri();

			wp_enqueue_style('onepress-admin-css', $theme_directory_url . '/assets/css/admin.css');
			// Add recommend plugin css
			wp_enqueue_style('plugin-install');
			wp_enqueue_script('plugin-install');
			wp_enqueue_script('updates');
			add_thickbox();


			// New icon Picker
			wp_enqueue_style('onepress_icon_picker_v2', $theme_directory_url . '/dist/style-iconPicker.css', array(), false, 'all');
			$asset_args = include ONEPRESS_THEME_PATH . '/dist/iconPicker.asset.php';
			wp_enqueue_script(
				'onepress_icon_picker_v2',
				$theme_directory_url . '/dist/iconPicker.js',
				$asset_args['dependencies'],
				$asset_args['version'],
				true
			);

		


			wp_localize_script(
				'onepress_icon_picker_v2',
				'C_Icon_Picker',
				apply_filters(
					'c_icon_picker_js_setup',
					array(
						'search'    => esc_html__('Search', 'onepress'),
						'fonts' => array(
							'font-awe-v6' => array(
								'name' => esc_html__('Font Awesome v6', 'onepress'),
								'icons' => []
							),
							'font-awesome' => array(
								// Name of icon
								'name' => esc_html__('Font Awesome v4', 'onepress'),
								// prefix class example for font-awesome fa-fa-{name}
								'prefix' => 'fa',
								// font url
								'url' => esc_url(add_query_arg(array('ver' => '4.7.0'), get_template_directory_uri() . '/assets/css/font-awesome.min.css')),
								// Icon class name, separated by |
								'icons' => 'fa-glass|fa-music|fa-search|fa-envelope-o|fa-heart|fa-star|fa-star-o|fa-user|fa-film|fa-th-large|fa-th|fa-th-list|fa-check|fa-times|fa-search-plus|fa-search-minus|fa-power-off|fa-signal|fa-cog|fa-trash-o|fa-home|fa-file-o|fa-clock-o|fa-road|fa-download|fa-arrow-circle-o-down|fa-arrow-circle-o-up|fa-inbox|fa-play-circle-o|fa-repeat|fa-refresh|fa-list-alt|fa-lock|fa-flag|fa-headphones|fa-volume-off|fa-volume-down|fa-volume-up|fa-qrcode|fa-barcode|fa-tag|fa-tags|fa-book|fa-bookmark|fa-print|fa-camera|fa-font|fa-bold|fa-italic|fa-text-height|fa-text-width|fa-align-left|fa-align-center|fa-align-right|fa-align-justify|fa-list|fa-outdent|fa-indent|fa-video-camera|fa-picture-o|fa-pencil|fa-map-marker|fa-adjust|fa-tint|fa-pencil-square-o|fa-share-square-o|fa-check-square-o|fa-arrows|fa-step-backward|fa-fast-backward|fa-backward|fa-play|fa-pause|fa-stop|fa-forward|fa-fast-forward|fa-step-forward|fa-eject|fa-chevron-left|fa-chevron-right|fa-plus-circle|fa-minus-circle|fa-times-circle|fa-check-circle|fa-question-circle|fa-info-circle|fa-crosshairs|fa-times-circle-o|fa-check-circle-o|fa-ban|fa-arrow-left|fa-arrow-right|fa-arrow-up|fa-arrow-down|fa-share|fa-expand|fa-compress|fa-plus|fa-minus|fa-asterisk|fa-exclamation-circle|fa-gift|fa-leaf|fa-fire|fa-eye|fa-eye-slash|fa-exclamation-triangle|fa-plane|fa-calendar|fa-random|fa-comment|fa-magnet|fa-chevron-up|fa-chevron-down|fa-retweet|fa-shopping-cart|fa-folder|fa-folder-open|fa-arrows-v|fa-arrows-h|fa-bar-chart|fa-twitter-square|fa-facebook-square|fa-camera-retro|fa-key|fa-cogs|fa-comments|fa-thumbs-o-up|fa-thumbs-o-down|fa-star-half|fa-heart-o|fa-sign-out|fa-linkedin-square|fa-thumb-tack|fa-external-link|fa-sign-in|fa-trophy|fa-github-square|fa-upload|fa-lemon-o|fa-phone|fa-square-o|fa-bookmark-o|fa-phone-square|fa-twitter|fa-facebook|fa-github|fa-unlock|fa-credit-card|fa-rss|fa-hdd-o|fa-bullhorn|fa-bell|fa-certificate|fa-hand-o-right|fa-hand-o-left|fa-hand-o-up|fa-hand-o-down|fa-arrow-circle-left|fa-arrow-circle-right|fa-arrow-circle-up|fa-arrow-circle-down|fa-globe|fa-wrench|fa-tasks|fa-filter|fa-briefcase|fa-arrows-alt|fa-users|fa-link|fa-cloud|fa-flask|fa-scissors|fa-files-o|fa-paperclip|fa-floppy-o|fa-square|fa-bars|fa-list-ul|fa-list-ol|fa-strikethrough|fa-underline|fa-table|fa-magic|fa-truck|fa-pinterest|fa-pinterest-square|fa-google-plus-square|fa-google-plus|fa-money|fa-caret-down|fa-caret-up|fa-caret-left|fa-caret-right|fa-columns|fa-sort|fa-sort-desc|fa-sort-asc|fa-envelope|fa-linkedin|fa-undo|fa-gavel|fa-tachometer|fa-comment-o|fa-comments-o|fa-bolt|fa-sitemap|fa-umbrella|fa-clipboard|fa-lightbulb-o|fa-exchange|fa-cloud-download|fa-cloud-upload|fa-user-md|fa-stethoscope|fa-suitcase|fa-bell-o|fa-coffee|fa-cutlery|fa-file-text-o|fa-building-o|fa-hospital-o|fa-ambulance|fa-medkit|fa-fighter-jet|fa-beer|fa-h-square|fa-plus-square|fa-angle-double-left|fa-angle-double-right|fa-angle-double-up|fa-angle-double-down|fa-angle-left|fa-angle-right|fa-angle-up|fa-angle-down|fa-desktop|fa-laptop|fa-tablet|fa-mobile|fa-circle-o|fa-quote-left|fa-quote-right|fa-spinner|fa-circle|fa-reply|fa-github-alt|fa-folder-o|fa-folder-open-o|fa-smile-o|fa-frown-o|fa-meh-o|fa-gamepad|fa-keyboard-o|fa-flag-o|fa-flag-checkered|fa-terminal|fa-code|fa-reply-all|fa-star-half-o|fa-location-arrow|fa-crop|fa-code-fork|fa-chain-broken|fa-question|fa-info|fa-exclamation|fa-superscript|fa-subscript|fa-eraser|fa-puzzle-piece|fa-microphone|fa-microphone-slash|fa-shield|fa-calendar-o|fa-fire-extinguisher|fa-rocket|fa-maxcdn|fa-chevron-circle-left|fa-chevron-circle-right|fa-chevron-circle-up|fa-chevron-circle-down|fa-html5|fa-css3|fa-anchor|fa-unlock-alt|fa-bullseye|fa-ellipsis-h|fa-ellipsis-v|fa-rss-square|fa-play-circle|fa-ticket|fa-minus-square|fa-minus-square-o|fa-level-up|fa-level-down|fa-check-square|fa-pencil-square|fa-external-link-square|fa-share-square|fa-compass|fa-caret-square-o-down|fa-caret-square-o-up|fa-caret-square-o-right|fa-eur|fa-gbp|fa-usd|fa-inr|fa-jpy|fa-rub|fa-krw|fa-btc|fa-file|fa-file-text|fa-sort-alpha-asc|fa-sort-alpha-desc|fa-sort-amount-asc|fa-sort-amount-desc|fa-sort-numeric-asc|fa-sort-numeric-desc|fa-thumbs-up|fa-thumbs-down|fa-youtube-square|fa-youtube|fa-xing|fa-xing-square|fa-youtube-play|fa-dropbox|fa-stack-overflow|fa-instagram|fa-flickr|fa-adn|fa-bitbucket|fa-bitbucket-square|fa-tumblr|fa-tumblr-square|fa-long-arrow-down|fa-long-arrow-up|fa-long-arrow-left|fa-long-arrow-right|fa-apple|fa-windows|fa-android|fa-linux|fa-dribbble|fa-skype|fa-foursquare|fa-trello|fa-female|fa-male|fa-gratipay|fa-sun-o|fa-moon-o|fa-archive|fa-bug|fa-vk|fa-weibo|fa-renren|fa-pagelines|fa-stack-exchange|fa-arrow-circle-o-right|fa-arrow-circle-o-left|fa-caret-square-o-left|fa-dot-circle-o|fa-wheelchair|fa-vimeo-square|fa-try|fa-plus-square-o|fa-space-shuttle|fa-slack|fa-envelope-square|fa-wordpress|fa-openid|fa-university|fa-graduation-cap|fa-yahoo|fa-google|fa-reddit|fa-reddit-square|fa-stumbleupon-circle|fa-stumbleupon|fa-delicious|fa-digg|fa-pied-piper-pp|fa-pied-piper-alt|fa-drupal|fa-joomla|fa-language|fa-fax|fa-building|fa-child|fa-paw|fa-spoon|fa-cube|fa-cubes|fa-behance|fa-behance-square|fa-steam|fa-steam-square|fa-recycle|fa-car|fa-taxi|fa-tree|fa-spotify|fa-deviantart|fa-soundcloud|fa-database|fa-file-pdf-o|fa-file-word-o|fa-file-excel-o|fa-file-powerpoint-o|fa-file-image-o|fa-file-archive-o|fa-file-audio-o|fa-file-video-o|fa-file-code-o|fa-vine|fa-codepen|fa-jsfiddle|fa-life-ring|fa-circle-o-notch|fa-rebel|fa-empire|fa-git-square|fa-git|fa-hacker-news|fa-tencent-weibo|fa-qq|fa-weixin|fa-paper-plane|fa-paper-plane-o|fa-history|fa-circle-thin|fa-header|fa-paragraph|fa-sliders|fa-share-alt|fa-share-alt-square|fa-bomb|fa-futbol-o|fa-tty|fa-binoculars|fa-plug|fa-slideshare|fa-twitch|fa-yelp|fa-newspaper-o|fa-wifi|fa-calculator|fa-paypal|fa-google-wallet|fa-cc-visa|fa-cc-mastercard|fa-cc-discover|fa-cc-amex|fa-cc-paypal|fa-cc-stripe|fa-bell-slash|fa-bell-slash-o|fa-trash|fa-copyright|fa-at|fa-eyedropper|fa-paint-brush|fa-birthday-cake|fa-area-chart|fa-pie-chart|fa-line-chart|fa-lastfm|fa-lastfm-square|fa-toggle-off|fa-toggle-on|fa-bicycle|fa-bus|fa-ioxhost|fa-angellist|fa-cc|fa-ils|fa-meanpath|fa-buysellads|fa-connectdevelop|fa-dashcube|fa-forumbee|fa-leanpub|fa-sellsy|fa-shirtsinbulk|fa-simplybuilt|fa-skyatlas|fa-cart-plus|fa-cart-arrow-down|fa-diamond|fa-ship|fa-user-secret|fa-motorcycle|fa-street-view|fa-heartbeat|fa-venus|fa-mars|fa-mercury|fa-transgender|fa-transgender-alt|fa-venus-double|fa-mars-double|fa-venus-mars|fa-mars-stroke|fa-mars-stroke-v|fa-mars-stroke-h|fa-neuter|fa-genderless|fa-facebook-official|fa-pinterest-p|fa-whatsapp|fa-server|fa-user-plus|fa-user-times|fa-bed|fa-viacoin|fa-train|fa-subway|fa-medium|fa-y-combinator|fa-optin-monster|fa-opencart|fa-expeditedssl|fa-battery-full|fa-battery-three-quarters|fa-battery-half|fa-battery-quarter|fa-battery-empty|fa-mouse-pointer|fa-i-cursor|fa-object-group|fa-object-ungroup|fa-sticky-note|fa-sticky-note-o|fa-cc-jcb|fa-cc-diners-club|fa-clone|fa-balance-scale|fa-hourglass-o|fa-hourglass-start|fa-hourglass-half|fa-hourglass-end|fa-hourglass|fa-hand-rock-o|fa-hand-paper-o|fa-hand-scissors-o|fa-hand-lizard-o|fa-hand-spock-o|fa-hand-pointer-o|fa-hand-peace-o|fa-trademark|fa-registered|fa-creative-commons|fa-gg|fa-gg-circle|fa-tripadvisor|fa-odnoklassniki|fa-odnoklassniki-square|fa-get-pocket|fa-wikipedia-w|fa-safari|fa-chrome|fa-firefox|fa-opera|fa-internet-explorer|fa-television|fa-contao|fa-500px|fa-amazon|fa-calendar-plus-o|fa-calendar-minus-o|fa-calendar-times-o|fa-calendar-check-o|fa-industry|fa-map-pin|fa-map-signs|fa-map-o|fa-map|fa-commenting|fa-commenting-o|fa-houzz|fa-vimeo|fa-black-tie|fa-fonticons|fa-reddit-alien|fa-edge|fa-credit-card-alt|fa-codiepie|fa-modx|fa-fort-awesome|fa-usb|fa-product-hunt|fa-mixcloud|fa-scribd|fa-pause-circle|fa-pause-circle-o|fa-stop-circle|fa-stop-circle-o|fa-shopping-bag|fa-shopping-basket|fa-hashtag|fa-bluetooth|fa-bluetooth-b|fa-percent|fa-gitlab|fa-wpbeginner|fa-wpforms|fa-envira|fa-universal-access|fa-wheelchair-alt|fa-question-circle-o|fa-blind|fa-audio-description|fa-volume-control-phone|fa-braille|fa-assistive-listening-systems|fa-american-sign-language-interpreting|fa-deaf|fa-glide|fa-glide-g|fa-sign-language|fa-low-vision|fa-viadeo|fa-viadeo-square|fa-snapchat|fa-snapchat-ghost|fa-snapchat-square|fa-pied-piper|fa-first-order|fa-yoast|fa-themeisle|fa-google-plus-official|fa-font-awesome|fa-handshake-o|fa-envelope-open|fa-envelope-open-o|fa-linode|fa-address-book|fa-address-book-o|fa-address-card|fa-address-card-o|fa-user-circle|fa-user-circle-o|fa-user-o|fa-id-badge|fa-id-card|fa-id-card-o|fa-quora|fa-free-code-camp|fa-telegram|fa-thermometer-full|fa-thermometer-three-quarters|fa-thermometer-half|fa-thermometer-quarter|fa-thermometer-empty|fa-shower|fa-bath|fa-podcast|fa-window-maximize|fa-window-minimize|fa-window-restore|fa-window-close|fa-window-close-o|fa-bandcamp|fa-grav|fa-etsy|fa-imdb|fa-ravelry|fa-eercast|fa-microchip|fa-snowflake-o|fa-superpowers|fa-wpexplorer|fa-meetup'

							),
						)

					)
				)
			);
		}
	}

	function theme_info()
	{
		$actions = $this->get_recommended_actions();
		$number_count = $actions['number_notice'];

		if ($number_count > 0) {
			$update_label = sprintf(_n('%1$s action required', '%1$s actions required', $number_count, 'onepress'), $number_count);
			$count = "<span class='update-plugins count-" . esc_attr($number_count) . "' title='" . esc_attr($update_label) . "'><span class='update-count'>" . number_format_i18n($number_count) . "</span></span>";
			$menu_title = sprintf(esc_html__('OnePress Theme %s', 'onepress'), $count);
		} else {
			$menu_title = esc_html__('OnePress Theme', 'onepress');
		}

		add_theme_page(esc_html__('OnePress Dashboard', 'onepress'), $menu_title, 'edit_theme_options', 'ft_onepress', array($this, 'theme_info_page'));
	}

	/**
	 * Add admin notice when active theme, just show one timetruongsa@200811
	 *
	 * @return bool|null
	 */
	function admin_notice()
	{

		$actions = $this->get_recommended_actions();
		$number_action = $actions['number_notice'];

		if ($number_action > 0) {
			$theme_data = wp_get_theme();
?>
			<div class="updated notice notice-success notice-alt is-dismissible">
				<p><?php printf(__('Welcome! Thank you for choosing %1$s! To fully take advantage of the best our theme can offer please make sure you visit our <a href="%2$s">Welcome page</a>', 'onepress'),  $theme_data->Name, admin_url('themes.php?page=ft_onepress')); ?></p>
			</div>
		<?php
		}
	}

	function admin_import_notice()
	{
		?>
		<div class="updated notice notice-success notice-alt is-dismissible">
			<p><?php printf(esc_html__('Save time by import our demo data, your website will be set up and ready to customize in minutes. %s', 'onepress'), '<a class="button button-secondary" href="' . esc_url(add_query_arg(array('page' => 'ft_onepress&tab=demo-data-importer'), admin_url('themes.php'))) . '">' . esc_html__('Import Demo Data', 'onepress') . '</a>'); ?></p>
		</div>
	<?php
	}

	function activation_admin_notice()
	{
		global $pagenow;
		if (is_admin() && ('themes.php' == $pagenow) && isset($_GET['activated'])) {
			add_action('admin_notices', array($this, 'admin_notice'));
			add_action('admin_notices', array($this, 'admin_import_notice'));
		}
	}

	function render_section_settings($key, $section, $see_only = false)
	{
		$active_value = Onepress_Config::is_section_active($key) ? 1 : false;
	?>
		<div class="onepress-admin-section <?php echo $see_only ? 'see-only' : ''; ?>">
			<div class="onepress-admin-section-inner">
				<div class="admin-section-header">
					<label>
						<?php if (!$see_only) { ?>
							<span class="switch-button">
								<input <?php checked($active_value, 1); ?> name="section_<?php echo esc_attr($key); ?>" value="1" type="checkbox">
								<span class="switch-slider"></span>
							</span>
						<?php } ?>
						<?php echo $section['label']; // WPCS: XSS OK. 
						?>
					</label>
					<?php if ($see_only) { ?>
						<span class="note-bubble"><?php _e('Plus Feature', 'onepress'); ?></span>
					<?php } ?>
				</div>
			</div>
		</div>
		<?php
	}

	/**
	 * Section settings
	 *
	 * @since 2.1.1
	 */
	function sections_settings()
	{
		$sections = Onepress_Config::get_sections();

		if (isset($_POST['submit'])) {
			Onepress_Config::save_settings($_POST);
		?>
			<div id="sections-manager-notice" class="updated notice notice-success is-dismissible">
				<p><?php _e('Settings saved', 'onepress'); ?></p>
			</div>
		<?php
		}



		echo '<form method="post" action="?page=ft_onepress" class="onepress-admin-sections-form">';
		echo '<div class="onepress-admin-sections-wrapper">';
		echo '<h3>' . __('Customizer Section Manager', 'onepress') . '</h3>';
		echo '<p class="description">' . __('Disable (or enable) unused sections to improve Customizer loading speed. Your section settings is still saved.', 'onepress') . '</p>';

		echo '<div class="onepress-admin-sections">';

		foreach ($sections as $key => $section) {
			$this->render_section_settings($key, $section);
		}

		if (!class_exists('OnePress_Plus')) {
			foreach (Onepress_Config::get_plus_sections() as $key => $section) {
				$this->render_section_settings($key, $section, true);
			}
		}

		echo '</div>';
		echo '</div>';

		submit_button();
		echo '</form>';
	}

	function theme_info_page()
	{

		$theme_data = wp_get_theme('onepress');

		if (isset($_GET['onepress_action_dismiss'])) {
			$actions_dismiss =  get_option('onepress_actions_dismiss');
			if (!is_array($actions_dismiss)) {
				$actions_dismiss = array();
			}
			$actions_dismiss[sanitize_text_field($_GET['onepress_action_dismiss'])] = 'dismiss';
			update_option('onepress_actions_dismiss', $actions_dismiss);
		}

		// Check for current viewing tab
		$tab = null;
		if (isset($_GET['tab'])) {
			$tab = sanitize_text_field($_GET['tab']);
		} else {
			$tab = null;
		}

		$actions_r = $this->get_recommended_actions();
		$number_action = $actions_r['number_notice'];
		$actions = $actions_r['actions'];

		$current_action_link =  admin_url('themes.php?page=ft_onepress&tab=recommended_actions');

		$recommend_plugins = get_theme_support('recommend-plugins');
		if (is_array($recommend_plugins) && isset($recommend_plugins[0])) {
			$recommend_plugins = $recommend_plugins[0];
		} else {
			$recommend_plugins[] = array();
		}
		?>
		<div class="wrap about-wrap theme_info_wrapper">
			<h1><?php printf(esc_html__('Welcome to OnePress - Version %1s', 'onepress'), $theme_data->Version); ?></h1>
			<div class="about-text"><?php esc_html_e('OnePress is a creative and flexible WordPress ONE PAGE theme well suited for business, portfolio, digital agency, product showcase, freelancers websites.', 'onepress'); ?></div>
			<a target="_blank" href="<?php echo esc_url('https://www.famethemes.com/?utm_source=theme_dashboard_page&utm_medium=badge_link&utm_campaign=onepress'); ?>" class="famethemes-badge wp-badge"><span>FameThemes</span></a>

			<hr class="wp-header-end">

			<h2 class="nav-tab-wrapper">
				<a href="?page=ft_onepress" class="nav-tab<?php echo is_null($tab) ? ' nav-tab-active' : null; ?>"><?php esc_html_e('Overview', 'onepress') ?></a>
				<a href="?page=ft_onepress&tab=recommended_actions" class="nav-tab<?php echo $tab == 'recommended_actions' ? ' nav-tab-active' : null; ?>"><?php esc_html_e('Recommended Actions', 'onepress');
																																							echo ($number_action > 0) ? "<span class='theme-action-count'>{$number_action}</span>" : ''; ?></a>
				<?php if (!class_exists('OnePress_Plus')) { ?>
					<a href="?page=ft_onepress&tab=free_pro" class="nav-tab<?php echo $tab == 'free_pro' ? ' nav-tab-active' : null; ?>"><?php esc_html_e('Free vs PLUS', 'onepress'); ?></span></a>
				<?php } ?>
				<a href="?page=ft_onepress&tab=demo-data-importer" class="nav-tab<?php echo $tab == 'demo-data-importer' ? ' nav-tab-active' : null; ?>"><?php esc_html_e('Demo Import', 'onepress'); ?></span></a>
				<?php do_action('onepress_admin_more_tabs', $tab); ?>
			</h2>

			<div>
				<h2>TEsstICON</h2>
				<input id="test_icon" data-icon="icon-abac" />
			</div>

			<?php if (is_null($tab)) { ?>
				<div class="theme_info info-tab-content">
					<div class="theme_info_column clearfix">
						<div class="theme_info_left">
							<?php
							$this->sections_settings();
							?>
						</div>

						<div class="theme_info_right">
							<div class="theme_link">
								<h3><?php esc_html_e('Theme Customizer', 'onepress'); ?></h3>
								<p class="about"><?php printf(esc_html__('%s supports the Theme Customizer for all theme settings. Click "Customize" to start customize your site.', 'onepress'), $theme_data->Name); ?></p>
								<p>
									<a href="<?php echo admin_url('customize.php'); ?>" class="button button-primary"><?php esc_html_e('Start Customize', 'onepress'); ?></a>
								</p>
							</div>
							<div class="theme_link">
								<h3><?php esc_html_e('Theme Documentation', 'onepress'); ?></h3>
								<p class="about"><?php printf(esc_html__('Need any help to setup and configure %s? Please have a look at our documentations instructions.', 'onepress'), $theme_data->Name); ?></p>
								<p>
									<a href="<?php echo esc_url('http://docs.famethemes.com/category/112-onepress'); ?>" target="_blank" class="button button-secondary"><?php esc_html_e('OnePress Documentation', 'onepress'); ?></a>
								</p>
								<?php do_action('onepress_dashboard_theme_links'); ?>
							</div>
							<div class="theme_link">
								<h3><?php esc_html_e('Having Trouble, Need Support?', 'onepress'); ?></h3>
								<p class="about"><?php printf(esc_html__('Support for %s WordPress theme is conducted through FameThemes support ticket system.', 'onepress'), $theme_data->Name); ?></p>
								<p>
									<a href="<?php echo esc_url('https://www.famethemes.com/dashboard/tickets/'); ?>" target="_blank" class="button button-secondary"><?php echo sprintf(esc_html__('Create a support ticket', 'onepress'), $theme_data->Name); ?></a>
								</p>
							</div>
						</div>


					</div>
				</div>
			<?php } ?>

			<?php if ($tab == 'recommended_actions') { ?>
				<div class="action-required-tab info-tab-content">

					<?php if (is_child_theme()) {
						$child_theme = wp_get_theme();
					?>
						<form method="post" action="<?php echo esc_attr($current_action_link); ?>" class="demo-import-boxed copy-settings-form">
							<p>
								<strong> <?php printf(esc_html__('You\'re using %1$s theme, It\'s a child theme of OnePress', 'onepress'),  $child_theme->Name); ?></strong>
							</p>
							<p><?php printf(esc_html__("Child theme uses it's own theme setting name, would you like to copy setting data from parent theme to this child theme?", 'onepress')); ?></p>
							<p>
								<?php

								$select = '<select name="copy_from">';
								$select .= '<option value="">' . esc_html__('From Theme', 'onepress') . '</option>';
								$select .= '<option value="onepress">OnePress</option>';
								$select .= '<option value="' . esc_attr($child_theme->get_stylesheet()) . '">' . ($child_theme->Name) . '</option>';
								$select .= '</select>';

								$select_2 = '<select name="copy_to">';
								$select_2 .= '<option value="">' . esc_html__('To Theme', 'onepress') . '</option>';
								$select_2 .= '<option value="onepress">OnePress</option>';
								$select_2 .= '<option value="' . esc_attr($child_theme->get_stylesheet()) . '">' . ($child_theme->Name) . '</option>';
								$select_2 .= '</select>';

								echo $select . ' to ' . $select_2;

								?>
								<input type="submit" class="button button-secondary" value="<?php esc_attr_e('Copy now', 'onepress'); ?>">
							</p>
							<?php if (isset($_GET['copied']) && $_GET['copied'] == 1) { ?>
								<p><?php esc_html_e('Your settings were copied.', 'onepress'); ?></p>
							<?php } ?>
						</form>

					<?php } ?>
					<?php if ($actions_r['number_active']  > 0) { ?>
						<?php $actions = wp_parse_args($actions, array('page_on_front' => '', 'page_template')) ?>

						<?php if ($actions['recommend_plugins'] == 'active') {  ?>
							<div id="plugin-filter" class="recommend-plugins action-required">
								<a title="" class="dismiss" href="<?php echo add_query_arg(array('onepress_action_notice' => 'recommend_plugins'), $current_action_link); ?>">
									<?php if ($actions_r['hide_by_click']['recommend_plugins'] == 'hide') { ?>
										<span class="dashicons dashicons-hidden"></span>
									<?php } else { ?>
										<span class="dashicons  dashicons-visibility"></span>
									<?php } ?>
								</a>
								<h3><?php esc_html_e('Recommend Plugins', 'onepress'); ?></h3>
								<?php
								$this->render_recommend_plugins($recommend_plugins);
								?>
							</div>
						<?php } ?>


						<?php if ($actions['page_on_front'] == 'active') {  ?>
							<div class="theme_link  action-required">
								<a title="<?php esc_attr_e('Dismiss', 'onepress'); ?>" class="dismiss" href="<?php echo add_query_arg(array('onepress_action_notice' => 'page_on_front'), $current_action_link); ?>">
									<?php if ($actions_r['hide_by_click']['page_on_front'] == 'hide') { ?>
										<span class="dashicons dashicons-hidden"></span>
									<?php } else { ?>
										<span class="dashicons  dashicons-visibility"></span>
									<?php } ?>
								</a>
								<h3><?php esc_html_e('Switch "Front page displays" to "A static page"', 'onepress'); ?></h3>
								<div class="about">
									<p><?php _e('In order to have the one page look for your website, please go to Customize -&gt; Static Front Page and switch "Front page displays" to "A static page".', 'onepress'); ?></p>
								</div>
								<p>
									<a href="<?php echo admin_url('options-reading.php'); ?>" class="button"><?php esc_html_e('Setup front page displays', 'onepress'); ?></a>
								</p>
							</div>
						<?php } ?>

						<?php if ($actions['page_template'] == 'active') {  ?>
							<div class="theme_link  action-required">
								<a title="<?php esc_attr_e('Dismiss', 'onepress'); ?>" class="dismiss" href="<?php echo add_query_arg(array('onepress_action_notice' => 'page_template'), $current_action_link); ?>">
									<?php if ($actions_r['hide_by_click']['page_template'] == 'hide') { ?>
										<span class="dashicons dashicons-hidden"></span>
									<?php } else { ?>
										<span class="dashicons  dashicons-visibility"></span>
									<?php } ?>
								</a>
								<h3><?php esc_html_e('Set your homepage page template to "Frontpage".', 'onepress'); ?></h3>

								<div class="about">
									<p><?php esc_html_e('In order to change homepage section contents, you will need to set template "Frontpage" for your homepage.', 'onepress'); ?></p>
								</div>
								<p>
									<?php
									$front_page = get_option('page_on_front');
									if ($front_page <= 0) {
									?>
										<a href="<?php echo admin_url('options-reading.php'); ?>" class="button"><?php esc_html_e('Setup front page displays', 'onepress'); ?></a>
									<?php

									}

									if ($front_page > 0 && get_post_meta($front_page, '_wp_page_template', true) != 'template-frontpage.php') {
									?>
										<a href="<?php echo get_edit_post_link($front_page); ?>" class="button"><?php esc_html_e('Change homepage page template', 'onepress'); ?></a>
									<?php
									}
									?>
								</p>
							</div>
						<?php } ?>
						<?php do_action('onepress_more_required_details', $actions); ?>
					<?php  } else { ?>
						<h3><?php printf(__('Keep %s updated', 'onepress'), $theme_data->Name); ?></h3>
						<p><?php _e('Hooray! There are no required actions for you right now.', 'onepress'); ?></p>
					<?php } ?>
				</div>
			<?php } ?>

			<?php if (!class_exists('OnePress_Plus')) { ?>
				<?php if ($tab == 'free_pro') { ?>
					<div id="free_pro" class="freepro-tab-content info-tab-content">
						<table class="free-pro-table">
							<thead>
								<tr>
									<th></th>
									<th>OnePress</th>
									<th>OnePress Plus</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<h4>WooCommerce Support</h4>
									</td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
								</tr>

								<tr>
									<td>
										<h4>Hero Section</h4>
									</td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
								</tr>
								<tr>
									<td>
										<h5>- Full Screen</h5>
									</td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
								</tr>

								<tr>
									<td>
										<h5>- Background Video</h5>
									</td>
									<td class="only-pro"><span class="dashicons-before dashicons-no-alt"></span></td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
								</tr>
								<tr>
									<td>
										<h5>- Background Slides</h5>
									</td>
									<td class="only-pro"><span class="dashicons-before ">2</span></td>
									<td class="only-lite"><span class="dashicons-before">Unlimited</span></td>
								</tr>
								<tr>
									<td>
										<h4>About Section</h4>
									</td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
								</tr>
								<tr>
									<td>
										<h5>- Number of items</h5>
									</td>
									<td class="only-pro"><span class="dashicons-before ">3</span></td>
									<td class="only-lite"><span class="dashicons-before">Unlimited</span></td>
								</tr>
								<tr>
									<td>
										<h4>Service Section</h4>
									</td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
								</tr>
								<tr>
									<td>
										<h5>- Number of items</h5>
									</td>
									<td class="only-pro"><span class="dashicons-before ">4</span></td>
									<td class="only-lite"><span class="dashicons-before">Unlimited</span></td>
								</tr>
								<tr>
									<td>
										<h4>Counter Section</h4>
									</td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
								</tr>
								<tr>
									<td>
										<h5>- Number of counter items</h5>
									</td>
									<td class="only-pro"><span class="dashicons-before ">4</span></td>
									<td class="only-lite"><span class="dashicons-before">Unlimited</span></td>
								</tr>
								<tr>
									<td>
										<h4>Team Section</h4>
									</td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
								</tr>
								<tr>
									<td>
										<h5>- Number of members</h5>
									</td>
									<td class="only-pro"><span class="dashicons-before ">4</span></td>
									<td class="only-lite"><span class="dashicons-before">Unlimited</span></td>
								</tr>
								<tr>
									<td>
										<h4>Latest News Section</h4>
									</td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
								</tr>
								<tr>
									<td>
										<h4>Contact Section</h4>
									</td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
								</tr>
								<tr>
									<td>
										<h4>Drag and drop section orders</h4>
									</td>
									<td class="only-pro"><span class="dashicons-before dashicons-no-alt"></span></td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
								</tr>
								<tr>
									<td>
										<h4>Add New Section</h4>
									</td>
									<td class="only-pro"><span class="dashicons-before dashicons-no-alt"></span></td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
								</tr>
								<tr>
									<td>
										<h4>Styling for all sections</h4>
									</td>
									<td class="only-pro"><span class="dashicons-before dashicons-no-alt"></span></td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
								</tr>
								<tr>
									<td>
										<h4>Google Map Section</h4>
									</td>
									<td class="only-pro"><span class="dashicons-before dashicons-no-alt"></span></td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
								</tr>

								<tr>
									<td>
										<h4>Pricing Section</h4>
									</td>
									<td class="only-pro"><span class="dashicons-before dashicons-no-alt"></span></td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
								</tr>
								<tr>
									<td>
										<h4>Testimonial Section</h4>
									</td>
									<td class="only-pro"><span class="dashicons-before dashicons-no-alt"></span></td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
								</tr>
								<tr>
									<td>
										<h4>Call To Action Section</h4>
									</td>
									<td class="only-pro"><span class="dashicons-before dashicons-no-alt"></span></td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
								</tr>
								<tr>
									<td>
										<h4>Projects Section</h4>
									</td>
									<td class="only-pro"><span class="dashicons-before dashicons-no-alt"></span></td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
								</tr>
								<tr>
									<td>
										<h4>Typography Options</h4>
									</td>
									<td class="only-pro"><span class="dashicons-before dashicons-no-alt"></span></td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
								</tr>

								<tr>
									<td>
										<h4>Footer Copyright Editor</h4>
									</td>
									<td class="only-pro"><span class="dashicons-before dashicons-no-alt"></span></td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
								</tr>

								<tr>
									<td>
										<h4>24/7 Priority Support</h4>
									</td>
									<td class="only-pro"><span class="dashicons-before dashicons-no-alt"></span></td>
									<td class="only-lite"><span class="dashicons-before dashicons-yes"></span></td>
								</tr>


								<tr class="ti-about-page-text-center">
									<td></td>
									<td colspan="2"><a href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_dashboard&utm_medium=compare_table&utm_campaign=onepress" target="_blank" class="button button-primary button-hero"><?php esc_html_e('Get OnePress Plus now!', 'onepress') ?></a></td>
								</tr>
							</tbody>
						</table>
					</div>
				<?php } ?>
			<?php } ?>

			<?php if ($tab == 'demo-data-importer') { ?>
				<div class="demo-import-tab-content info-tab-content">
					<?php if (has_action('onepress_demo_import_content_tab')) {
						do_action('onepress_demo_import_content_tab');
					} else { ?>
						<div id="plugin-filter" class="demo-import-boxed">
							<?php
							$plugin_name = 'famethemes-demo-importer';
							$status = is_dir(WP_PLUGIN_DIR . '/' . $plugin_name);
							$button_class = 'install-now button';
							$button_txt = esc_html__('Install Now', 'onepress');
							if (!$status) {
								$install_url = wp_nonce_url(
									add_query_arg(
										array(
											'action' => 'install-plugin',
											'plugin' => $plugin_name
										),
										network_admin_url('update.php')
									),
									'install-plugin_' . $plugin_name
								);
							} else {
								$install_url = add_query_arg(array(
									'action' => 'activate',
									'plugin' => rawurlencode($plugin_name . '/' . $plugin_name . '.php'),
									'plugin_status' => 'all',
									'paged' => '1',
									'_wpnonce' => wp_create_nonce('activate-plugin_' . $plugin_name . '/' . $plugin_name . '.php'),
								), network_admin_url('plugins.php'));
								$button_class = 'activate-now button-primary';
								$button_txt = esc_html__('Active Now', 'onepress');
							}

							$detail_link = add_query_arg(
								array(
									'tab' => 'plugin-information',
									'plugin' => $plugin_name,
									'TB_iframe' => 'true',
									'width' => '772',
									'height' => '349',

								),
								network_admin_url('plugin-install.php')
							);

							echo '<p>';
							printf(
								esc_html__(
									'%1$s you will need to install and activate the %2$s plugin first.',
									'onepress'
								),
								'<b>' . esc_html__('Hey.', 'onepress') . '</b>',
								'<a class="thickbox open-plugin-details-modal" href="' . esc_url($detail_link) . '">' . esc_html__('FameThemes Demo Importer', 'onepress') . '</a>'
							);
							echo '</p>';

							echo '<p class="plugin-card-' . esc_attr($plugin_name) . '"><a href="' . esc_url($install_url) . '" data-slug="' . esc_attr($plugin_name) . '" class="' . esc_attr($button_class) . '">' . $button_txt . '</a></p>';

							?>
						</div>
					<?php } ?>
				</div>
			<?php } ?>
			<?php do_action('onepress_more_tabs_details', $actions); ?>

		</div>
		<script type="text/javascript">
			jQuery(document).ready(function($) {
				$('body').addClass('about-php');

				$('.copy-settings-form').on('submit', function() {
					var c = confirm('<?php echo esc_attr_e('Are you sure want to copy ?', 'onepress'); ?>');
					if (!c) {
						return false;
					}
				});
			});
		</script>
<?php
	}

	function render_recommend_plugins($recommend_plugins = array())
	{
		foreach ($recommend_plugins as $plugin_slug => $plugin_info) {
			$plugin_info = wp_parse_args($plugin_info, array(
				'name' => '',
				'active_filename' => '',
			));
			$plugin_name = $plugin_info['name'];
			$status = is_dir(WP_PLUGIN_DIR . '/' . $plugin_slug);
			$button_class = 'install-now button';
			if ($plugin_info['active_filename']) {
				$active_file_name = $plugin_info['active_filename'];
			} else {
				$active_file_name = $plugin_slug . '/' . $plugin_slug . '.php';
			}

			if (!is_plugin_active($active_file_name)) {
				$button_txt = esc_html__('Install Now', 'onepress');
				if (!$status) {
					$install_url = wp_nonce_url(
						add_query_arg(
							array(
								'action' => 'install-plugin',
								'plugin' => $plugin_slug
							),
							network_admin_url('update.php')
						),
						'install-plugin_' . $plugin_slug
					);
				} else {
					$install_url = add_query_arg(array(
						'action' => 'activate',
						'plugin' => rawurlencode($active_file_name),
						'plugin_status' => 'all',
						'paged' => '1',
						'_wpnonce' => wp_create_nonce('activate-plugin_' . $active_file_name),
					), network_admin_url('plugins.php'));
					$button_class = 'activate-now button-primary';
					$button_txt = esc_html__('Active Now', 'onepress');
				}

				$detail_link = add_query_arg(
					array(
						'tab' => 'plugin-information',
						'plugin' => $plugin_slug,
						'TB_iframe' => 'true',
						'width' => '772',
						'height' => '349',

					),
					network_admin_url('plugin-install.php')
				);

				echo '<div class="rcp">';
				echo '<h4 class="rcp-name">';
				echo esc_html($plugin_name);
				echo '</h4>';
				echo '<p class="action-btn plugin-card-' . esc_attr($plugin_slug) . '"><a href="' . esc_url($install_url) . '" data-slug="' . esc_attr($plugin_slug) . '" class="' . esc_attr($button_class) . '">' . $button_txt . '</a></p>';
				echo '<a class="plugin-detail thickbox open-plugin-details-modal" href="' . esc_url($detail_link) . '">' . esc_html__('Details', 'onepress') . '</a>';
				echo '</div>';
			}
		}
	}

	function admin_dismiss_actions()
	{
		// Action for dismiss
		if (isset($_GET['onepress_action_notice'])) {
			$actions_dismiss =  get_option('onepress_actions_dismiss');
			if (!is_array($actions_dismiss)) {
				$actions_dismiss = array();
			}
			$action_key = sanitize_text_field($_GET['onepress_action_notice']);
			if (isset($actions_dismiss[$action_key]) &&  $actions_dismiss[$action_key] == 'hide') {
				$actions_dismiss[$action_key] = 'show';
			} else {
				$actions_dismiss[$action_key] = 'hide';
			}
			update_option('onepress_actions_dismiss', $actions_dismiss);
			$url = wp_unslash($_SERVER['REQUEST_URI']);
			$url = remove_query_arg('onepress_action_notice', $url);
			wp_redirect($url);
			die();
		}

		// Action for copy options
		if (isset($_POST['copy_from']) && isset($_POST['copy_to'])) {
			$from = sanitize_text_field($_POST['copy_from']);
			$to = sanitize_text_field($_POST['copy_to']);
			if ($from && $to) {
				$mods = get_option("theme_mods_" . $from);
				update_option("theme_mods_" . $to, $mods);

				$url = wp_unslash($_SERVER['REQUEST_URI']);
				$url = add_query_arg(array('copied' => 1), $url);
				wp_redirect($url);
				die();
			}
		}
	}

	/**
	 * Get theme actions required
	 *
	 * @return array|mixed|void
	 */
	function get_recommended_actions()
	{

		$actions = array();
		$front_page = get_option('page_on_front');
		$actions['page_on_front'] = 'dismiss';
		$actions['page_template'] = 'dismiss';
		$actions['recommend_plugins'] = 'dismiss';
		if ('page' != get_option('show_on_front')) {
			$front_page = 0;
		}
		if ($front_page <= 0) {
			$actions['page_on_front'] = 'active';
			$actions['page_template'] = 'active';
		} else {
			if (get_post_meta($front_page, '_wp_page_template', true) == 'template-frontpage.php') {
				$actions['page_template'] = 'dismiss';
			} else {
				$actions['page_template'] = 'active';
			}
		}

		$recommend_plugins = get_theme_support('recommend-plugins');
		if (is_array($recommend_plugins) && isset($recommend_plugins[0])) {
			$recommend_plugins = $recommend_plugins[0];
		} else {
			$recommend_plugins[] = array();
		}

		if (!empty($recommend_plugins)) {

			foreach ($recommend_plugins as $plugin_slug => $plugin_info) {
				$plugin_info = wp_parse_args($plugin_info, array(
					'name' => '',
					'active_filename' => '',
				));
				if ($plugin_info['active_filename']) {
					$active_file_name = $plugin_info['active_filename'];
				} else {
					$active_file_name = $plugin_slug . '/' . $plugin_slug . '.php';
				}
				if (!is_plugin_active($active_file_name)) {
					$actions['recommend_plugins'] = 'active';
				}
			}
		}

		$actions = apply_filters('onepress_get_recommended_actions', $actions);

		$hide_by_click = get_option('onepress_actions_dismiss');
		if (!is_array($hide_by_click)) {
			$hide_by_click = array();
		}

		$n_active  = $n_dismiss = 0;
		$number_notice = 0;
		foreach ($actions as $k => $v) {
			if (!isset($hide_by_click[$k])) {
				$hide_by_click[$k] = false;
			}

			if ($v == 'active') {
				$n_active++;
				$number_notice++;
				if ($hide_by_click[$k]) {
					if ($hide_by_click[$k] == 'hide') {
						$number_notice--;
					}
				}
			} else if ($v == 'dismiss') {
				$n_dismiss++;
			}
		}

		$return = array(
			'actions' => $actions,
			'number_actions' => count($actions),
			'number_active' => $n_active,
			'number_dismiss' => $n_dismiss,
			'hide_by_click'  => $hide_by_click,
			'number_notice'  => $number_notice,
		);
		if ($return['number_notice'] < 0) {
			$return['number_notice'] = 0;
		}

		return $return;
	}
}

Onepress_Dashboard::get_instance()->init();
