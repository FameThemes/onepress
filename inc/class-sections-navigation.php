<?php
/**
 * Dots Navigation class
 * Class Onepress_Dots_Navigation
 *
 * @since 2.1.0
 *
 */
class Onepress_Dots_Navigation {
	static $_instance = null;
	private $key = 'onepress_sections_nav_';

	/**
	 * Get instance
	 *
	 * @return null|Onepress_Dots_Navigation
	 */
	static function get_instance(){
		if ( is_null( self::$_instance ) ){
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	/**
	 * Get sections
	 *
	 * @return array
	 */
	function get_sections(){

		$sorted_sections = apply_filters( 'onepress_frontpage_sections_order', array(
			'features', 'about', 'services', 'videolightbox', 'gallery', 'counter', 'team',  'news', 'contact'
		) );

		$sections_config = array(
			'hero' => array(
				'label' => __( 'Section: Hero', 'onepress' ),
				'title' => __( 'Home', 'onepress' ),
				'default' => false,
				'inverse' => false,
			),
			'about' => array(
				'label' => __( 'Section: About', 'onepress' ),
				'title' => __( 'About Us', 'onepress' ),
				'default' => false,
				'inverse' => false,
			),
			'contact' => array(
				'label' =>  __( 'Section: Contact', 'onepress' ),
				'title' => __( 'Get in touch', 'onepress' ),
				'default' => false,
				'inverse' => false,

			),
			'counter' => array(
				'label' => __( 'Section: Counter', 'onepress' ),
				'title' => __( 'Our Numbers', 'onepress' ),
				'default' => false,
				'inverse' => false,
			),
			'features' => array(
				'label' => __( 'Section: Features', 'onepress' ),
				'title' => __( 'Features', 'onepress' ),
				'default' => false,
				'inverse' => false,
			),
			'gallery' => array(
				'label' => __( 'Section: Gallery', 'onepress' ),
				'title' => __( 'Gallery', 'onepress' ),
				'default' => false,
				'inverse' => false,
			),
			'news' => array(
				'label' => __( 'Section: News', 'onepress' ),
				'title' => __( 'Latest News', 'onepress' ),
				'default' => false,
				'inverse' => false,
			),
			'services' => array(
				'label' => __( 'Section: Services', 'onepress' ),
				'title' => __( 'Our Services', 'onepress' ),
				'default' => false,
				'inverse' => false,
			),
			'team' => array(
				'label' => __( 'Section: Team', 'onepress' ),
				'title' => __( 'Our Team', 'onepress' ),
				'default' => false,
				'inverse' => false,
			),
			'videolightbox' => array(
				'label' => __( 'Section: Video Lightbox', 'onepress' ),
				'title' => '',
				'default' => false,
				'inverse' => false,
			),
		);

		$new = array(
			'hero' => $sections_config['hero']
		);


		foreach ( $sorted_sections as $id ) {
			if ( isset( $sections_config[ $id ] ) ) {
				$new[ $id ] = $sections_config[ $id ];
			}
		}
		// Filter to add more custom sections here
		return apply_filters( 'onepress_sections_navigation_get_sections', $new );

	}

	/**
	 * Get setting name
	 *
	 * @param $id
	 *
	 * @return string
	 */
	function get_name( $id ) {
		return $this->key.$id;
	}

	/**
	 * Add customize config
	 *
	 * @param $wp_customize
	 * @param $section_id
	 */
	function add_customize( $wp_customize, $section_id ){

		$wp_customize->add_setting( $this->get_name( '__enable' ),
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => false,
			)
		);
		$wp_customize->add_control(  $this->get_name( '__enable' ),
			array(
				'label'       => __( 'Enable in section navigation', 'onepress' ),
				'section'     => $section_id,
				'type'        => 'checkbox',
			)
		);

		$wp_customize->add_setting( $this->get_name( '__enable_label' ),
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => 1,
			)
		);
		$wp_customize->add_control( $this->get_name( '__enable_label' ),
			array(
				'label'       => __( 'Enable navigation labels', 'onepress' ),
				'description'       => __( 'By default navigation label is section title.', 'onepress' ),
				'section'     => $section_id,
				'type'        => 'checkbox',
			)
		);

		// Color Settings
		$wp_customize->add_setting( $this->get_name( '__color' ), array(
			'sanitize_callback'    => 'sanitize_hex_color_no_hash',
			'sanitize_js_callback' => 'maybe_hash_hex_color',
			'default'              => ''
		) );
		$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, $this->get_name( '__color' ),
			array(
				'label'       => esc_html__( 'Dots color', 'onepress' ),
				'section'     => $section_id,
				'description' => '',
			)
		) );

		// Color Settings
		$wp_customize->add_setting( $this->get_name( '__color2' ), array(
			'sanitize_callback'    => 'sanitize_hex_color_no_hash',
			'sanitize_js_callback' => 'maybe_hash_hex_color',
			'default'              => ''
		) );
		$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, $this->get_name( '__color2' ),
			array(
				'label'       => esc_html__( 'Dots inverse color', 'onepress' ),
				'section'     => $section_id,
				'description' => '',
			)
		) );


		// Section Settings
		foreach ( $this->get_sections() as $id => $args ) {

			$name = $this->get_name( $id );

			$wp_customize->add_setting( $id.'_em',
				array(
					'sanitize_callback' => 'onepress_sanitize_text',
				)
			);
			$wp_customize->add_control( new OnePress_Misc_Control( $wp_customize,  $id.'_em',
				array(
					'type'        => 'custom_message',
					'section'     => $section_id,
					'description' => '<div class="onepress-c-heading">'.esc_html( $args['label'] ).'</div>',
				)
			));

			$wp_customize->add_setting( $name,
				array(
					'sanitize_callback' => 'onepress_sanitize_checkbox',
					'default'           => $args['default'],
					//'transport'         => 'postMessage'
				)
			);
			$wp_customize->add_control( $name,
				array(
					'label'       => __( 'Enable in section navigation', 'onepress' ),
					'section'     => $section_id,
					'type'        => 'checkbox',
				)
			);

			$wp_customize->add_setting( $name.'_inverse',
				array(
					'sanitize_callback' => 'onepress_sanitize_checkbox',
					'default'           => isset( $args['inverse'] ) ? $args['inverse'] : false,
					//'transport'         => 'postMessage'
				)
			);
			$wp_customize->add_control( $name.'_inverse',
				array(
					'label'       => __( 'Inverse dots color', 'onepress' ),
					'section'     => $section_id,
					'type'        => 'checkbox',
				)
			);


			$wp_customize->add_setting( $name.'_label',
				array(
					'sanitize_callback' => 'sanitize_text_field',
					'default'           => '',
					//'transport'         => 'postMessage'
				)
			);
			$wp_customize->add_control( $name.'_label',
				array(
					'label'       => __( 'Custom navigation label', 'OnePress' ),
					'section'     => $section_id,
				)
			);

		}

	}

	/**
	 *
	 * Get sections settings
	 *
	 * @return array
	 */
	function get_settings(){

		$data = apply_filters( 'onepress_dots_navigation_get_settings', false );
		if ( $data ) {
			return $data;
		}

		$data = [];
		$sections = $this->get_sections();
		foreach ( $sections as $id => $args ) {

			if ( ! get_theme_mod( 'onepress_' . $id . '_disable', false )
			     || ( isset( $args['show_section'] )  && $args['show_section'] )
			     ) {
				$name   = $this->get_name( $id );
				$enable = get_theme_mod( $name, $args['default'] );
				if ( $enable ) {
					$el_id = sanitize_text_field( get_theme_mod( 'onepress_'.$id.'_id', $id, false ) );
					if ( ! $el_id ) {
						$el_id = $id;
					}
					$data[ $el_id ] = array(
						'id'     => $el_id,
						'inverse' => get_theme_mod( $this->get_name( $id.'_inverse'), isset( $args['inverse'] ) ? $args['inverse'] : false  ),
						'enable' => get_theme_mod( $name, $args['default'] ),
						'title'  => get_theme_mod( 'onepress_' . $id . '_title', $args['title'] ),
					);
					$custom_title = get_theme_mod( $this->get_name( $id.'_label' ), false );
					if( $custom_title ) {
						$data[ $id ]['title'] = $custom_title;
					}
				}
			}

		}

		return $data;
	}

	/**
	 * Add scripts
	 * load only enabled
	 */
	function scripts(){
		if ( get_theme_mod( $this->get_name( '__enable' ), false ) ) {
			if ( is_front_page() ) {
				wp_enqueue_script( 'jquery.bully', get_template_directory_uri() . '/assets/js/jquery.bully.js', array( 'jquery' ), false, true );
				wp_localize_script( 'jquery.bully', 'Onepress_Bully', array(
					'enable_label' => get_theme_mod( $this->get_name( '__enable_label' ), true ) ?  true : false,
					'sections' => $this->get_settings()
				) );
			}

		}
	}

	/**
	 * Add custom style
	 * load only enabled
	 * @param $code
	 *
	 * @return string
	 */
	function custom_style(  $code = false ){
		if ( get_theme_mod( $this->get_name( '__enable' ), false ) ) {
			$color = sanitize_hex_color_no_hash( get_theme_mod( $this->get_name( '__color' ) ) );
			if ( $color ) {
				$code .= " body .c-bully { color: #{$color}; } ";
			}

			$color2 = sanitize_hex_color_no_hash( get_theme_mod( $this->get_name( '__color2' ) ) );
			if ( $color2 ) {
				$code .= " body .c-bully.c-bully--inversed { color: #{$color2}; } ";
			}
			if ( is_customize_preview() ) {
				//die( 'loadmoe' );
			}
		}

		return $code;
	}

	/**
	 * Inits
	 */
	function init(){
		add_action( 'wp_enqueue_scripts', array( $this, 'scripts' ) );
		add_filter( 'onepress_custom_css', array( $this, 'custom_style' ) );
	}

}

Onepress_Dots_Navigation::get_instance()->init();


