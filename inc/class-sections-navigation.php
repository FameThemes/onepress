<?php

/**
 * Dots Navigation class
 * Class Onepress_Dots_Navigation
 *
 * @since 2.1.0
 */
class Onepress_Dots_Navigation
{
	static $_instance = null;
	private $key = 'onepress_sections_nav_';

	/**
	 * Get instance
	 *
	 * @return null|Onepress_Dots_Navigation
	 */
	static function get_instance()
	{
		if (is_null(self::$_instance)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	/**
	 * Get sections
	 *
	 * @return array
	 */
	function get_sections()
	{

		/**
		 * @since 2.1.1
		 */
		$new = Onepress_Config::get_sections();

		// Filter to add more custom sections here
		return apply_filters('onepress_sections_navigation_get_sections', $new);
	}

	/**
	 * Get setting name
	 *
	 * @param string $id
	 *
	 * @return string
	 */
	function get_name($id)
	{
		return $this->key . $id;
	}

	/**
	 * Add customize config
	 *
	 * @param WP_Customize_Manager $wp_customize
	 * @param string               $section_id
	 */
	function add_customize($wp_customize, $section_id)
	{

		$wp_customize->add_setting(
			$this->get_name('__enable'),
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => false,
			)
		);
		$wp_customize->add_control(
			$this->get_name('__enable'),
			array(
				'label'       => __('Enable in section navigation', 'onepress'),
				'section'     => $section_id,
				'type'        => 'checkbox',
			)
		);

		$wp_customize->add_setting(
			$this->get_name('__disable_mobile'),
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => false,
			)
		);

		$wp_customize->add_control(
			$this->get_name('__disable_mobile'),
			array(
				'label'       => __('Disable the section navigation on mobile', 'onepress'),
				'section'     => $section_id,
				'type'        => 'checkbox',
			)
		);

		$wp_customize->add_setting(
			$this->get_name('__enable_label'),
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => 1,
			)
		);

		$wp_customize->add_control(
			$this->get_name('__enable_label'),
			array(
				'label'       => __('Enable navigation labels', 'onepress'),
				'description'       => __('By default navigation label is section title.', 'onepress'),
				'section'     => $section_id,
				'type'        => 'checkbox',
			)
		);

		// Color Settings.
		$wp_customize->add_setting(
			$this->get_name('__color'),
			array(
				'sanitize_callback'    => 'sanitize_hex_color_no_hash',
				'sanitize_js_callback' => 'maybe_hash_hex_color',
				'default'              => '',
			)
		);
		$wp_customize->add_control(
			new WP_Customize_Color_Control(
				$wp_customize,
				$this->get_name('__color'),
				array(
					'label'       => esc_html__('Dots color', 'onepress'),
					'section'     => $section_id,
					'description' => '',
				)
			)
		);

		// Color Settings.
		$wp_customize->add_setting(
			$this->get_name('__color2'),
			array(
				'sanitize_callback'    => 'sanitize_hex_color_no_hash',
				'sanitize_js_callback' => 'maybe_hash_hex_color',
				'default'              => '',
			)
		);
		$wp_customize->add_control(
			new WP_Customize_Color_Control(
				$wp_customize,
				$this->get_name('__color2'),
				array(
					'label'       => esc_html__('Dots inverse color', 'onepress'),
					'section'     => $section_id,
					'description' => '',
				)
			)
		);

		// Color Settings.
		$wp_customize->add_setting(
			$this->get_name('__label_bg'),
			array(
				'sanitize_callback'    => 'onepress_sanitize_color_alpha',
				'default'              => '',
			)
		);
		$wp_customize->add_control(
			new OnePress_Alpha_Color_Control(
				$wp_customize,
				$this->get_name('__label_bg'),
				array(
					'label'       => esc_html__('Label Background', 'onepress'),
					'section'     => $section_id,
					'description' => '',
				)
			)
		);

		// Color Settings.
		$wp_customize->add_setting(
			$this->get_name('__label_color'),
			array(
				'sanitize_callback'    => 'onepress_sanitize_color_alpha',
				'default'              => '',
			)
		);
		$wp_customize->add_control(
			new OnePress_Alpha_Color_Control(
				$wp_customize,
				$this->get_name('__label_color'),
				array(
					'label'       => esc_html__('Label Color', 'onepress'),
					'section'     => $section_id,
					'description' => '',
				)
			)
		);

		// Section Settings.
		foreach ($this->get_sections() as $id => $args) {

			/**
			 * @since 2.1.1
			 */
			if (Onepress_Config::is_section_active($id)) {

				$name = $this->get_name($id);

				$wp_customize->add_setting(
					$id . '_em',
					array(
						'sanitize_callback' => 'onepress_sanitize_text',
					)
				);
				$wp_customize->add_control(
					new OnePress_Misc_Control(
						$wp_customize,
						$id . '_em',
						array(
							'type'        => 'custom_message',
							'section'     => $section_id,
							'description' => '<div class="onepress-c-heading">' . esc_html($args['label']) . '</div>',
						)
					)
				);

				$wp_customize->add_setting(
					$name,
					array(
						'sanitize_callback' => 'onepress_sanitize_checkbox',
						'default'           => $args['default'],
						// 'transport'         => 'postMessage'
					)
				);
				$wp_customize->add_control(
					$name,
					array(
						'label'   => __('Enable in section navigation', 'onepress'),
						'section' => $section_id,
						'type'    => 'checkbox',
					)
				);

				$wp_customize->add_setting(
					$name . '_inverse',
					array(
						'sanitize_callback' => 'onepress_sanitize_checkbox',
						'default'           => isset($args['inverse']) ? $args['inverse'] : false,
						// 'transport'         => 'postMessage'
					)
				);
				$wp_customize->add_control(
					$name . '_inverse',
					array(
						'label'   => __('Inverse dots color', 'onepress'),
						'section' => $section_id,
						'type'    => 'checkbox',
					)
				);

				$wp_customize->add_setting(
					$name . '_label',
					array(
						'sanitize_callback' => 'sanitize_text_field',
						'default'           => '',
						// 'transport'         => 'postMessage'
					)
				);
				$wp_customize->add_control(
					$name . '_label',
					array(
						'label'   => __('Custom navigation label', 'onepress'),
						'section' => $section_id,
					)
				);
			} // end if section active
		} // end loop

	}

	/**
	 *
	 * Get sections settings
	 *
	 * @return array
	 */
	function get_settings()
	{

		$data = apply_filters('onepress_dots_navigation_get_settings', false);
		if ($data) {
			return $data;
		}

		$data = array();
		$sections = $this->get_sections();
		foreach ($sections as $id => $args) {
			/**
			 * Get settings for enabled sections only.
			 *
			 * @since 2.1.1
			 */
			if (Onepress_Config::is_section_active($id)) {
				$name   = $this->get_name($id);
				$translated_id = (isset($args['id']) && $args['id']) ? $args['id'] : $id;
				$el_id = sanitize_title(get_theme_mod('onepress_' . $id . '_id', $translated_id, false));
				if (!$el_id) {
					$el_id = $id;
				}
				$data[$el_id] = array(
					'id'      => $el_id,
					'_id'     => $id,
					'inverse' => get_theme_mod($this->get_name($id . '_inverse'), isset($args['inverse']) ? $args['inverse'] : false),
					'enable'  => get_theme_mod($name, $args['default']) ? true : false,
					'title'   => get_theme_mod('onepress_' . $id . '_title', $args['title']),
				);
				$custom_title   = get_theme_mod($this->get_name($id . '_label'), false);
				if ($custom_title) {
					$data[$el_id]['title'] = $custom_title;
				}
			}
		}

		return $data;
	}

	/**
	 * Add scripts
	 * load only enabled
	 */
	function scripts()
	{
		if (get_theme_mod($this->get_name('__enable'), false)) {
			if (is_front_page()) {
				wp_enqueue_script('jquery.bully', get_template_directory_uri() . '/assets/js/jquery.bully.js', array('jquery'), false, true);
				wp_localize_script(
					'jquery.bully',
					'Onepress_Bully',
					array(
						'enable_label' => get_theme_mod($this->get_name('__enable_label'), true) ? true : false,
						'disable_mobile' => get_theme_mod($this->get_name('__disable_mobile'), false) ? true : false,
						'sections' => $this->get_settings(),
					)
				);
			}
		}
	}

	/**
	 * Add custom style
	 * load only enabled
	 *
	 * @param string $code
	 *
	 * @return string
	 */
	function custom_style($code = false)
	{
		if (get_theme_mod($this->get_name('__enable'), false)) {
			$color = sanitize_hex_color_no_hash(get_theme_mod($this->get_name('__color')));
			if ($color) {
				$code .= " body .c-bully { color: #{$color}; } ";
			}

			$color2 = sanitize_hex_color_no_hash(get_theme_mod($this->get_name('__color2')));
			if ($color2) {
				$code .= " body .c-bully.c-bully--inversed { color: #{$color2}; } ";
			}

			$bg = get_theme_mod($this->get_name('__label_bg'));
			$bg_color = onepress_sanitize_color_alpha($bg);

			if ($bg_color) {
				$code .= " body .c-bully .c-bully__title { background-color: {$bg_color}; } ";
			}

			$color = get_theme_mod($this->get_name('__label_color'));
			$color = onepress_sanitize_color_alpha($color);

			if ($color) {
				$code .= " body .c-bully .c-bully__title { color: {$color}; } ";
			}
		}

		return $code;
	}

	/**
	 * Inits
	 */
	function init()
	{
		add_action('wp_enqueue_scripts', array($this, 'scripts'));
		add_filter('onepress_custom_css', array($this, 'custom_style'));
	}
}

Onepress_Dots_Navigation::get_instance()->init();
