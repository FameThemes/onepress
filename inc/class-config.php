<?php

/**
 * Class Onepress_Config
 * @since 2.1.1
 */
class Onepress_Config {

	static private $key = 'onepress_sections_settings';

	static function is_section_active( $section_key ){
		$data = get_option( self::$key );
		$force_active = false;
		if ( ! is_array( $data ) || empty( $data ) ) {
			$force_active = true;
			$data = array();
		}
		if ( $force_active ) {
			$active_value = 1;
		} else {
			$active_value = isset( $data[ $section_key ] ) ? $data[ $section_key ] : 1;
		}

		return $active_value;
	}

	static function save_settings( $submitted_data ){

		$sections = Onepress_Config::get_sections();

		if ( is_array( $submitted_data ) ) {
			$data = array();
			foreach ( $sections as $k => $s ) {
				$data[ $k ] = isset( $submitted_data['section_'.$k] ) && $submitted_data['section_'.$k] == 1 ? 1 : false;
			}

			update_option( self::$key, $data );
		}

	}

	static function get_settings( ){
		return get_option( self::$key );
	}

	static function get_plus_sections(){
		$plugin_sections = array(

			'slider' => array(
				'label' => __( 'Section: Slider', 'onepress' ),
				'title' => __( 'Slider', 'onepress' ),
				'default' => false,
				'inverse' => false,
			),

			'clients' => array(
				'label' => __( 'Section: Clients', 'onepress' ),
				'title' => __( 'Our Clients', 'onepress' ),
				'default' => false,
				'inverse' => false,
			),
			'cta' => array(
				'label' => __( 'Section: Call to Action', 'onepress' ),
				'title' => __( '', 'onepress' ),
				'default' => false,
				'inverse' => false,
			),
			'map' => array(
				'label' => __( 'Section: Map', 'onepress' ),
				'title' => __( 'Map', 'onepress' ),
				'default' => false,
				'inverse' => false,
			),
			'pricing' => array(
				'label' => __( 'Section: Pricing', 'onepress' ),
				'title' => __( 'Pricing Table', 'onepress' ),
				'default' => false,
				'inverse' => false,
			),
			'projects' => array(
				'label' => __( 'Section: Projects', 'onepress' ),
				'title' => __( 'Highlight Projects', 'onepress' ),
				'default' => false,
				'inverse' => false,
			),
			'testimonials' => array(
				'label' => __( 'Section: Testimonials', 'onepress' ),
				'title' => __( 'Testimonials', 'onepress' ),
				'default' => false,
				'inverse' => false,
			),
		);

		return $plugin_sections;
	}

	/**
	 * Get sections
	 *
	 * @return array
	 */
	static function get_sections(){

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
		return apply_filters( 'onepress_get_sections', $new );

	}
}