<?php
/**
 * Repeatable control class.
 *
 * @since  1.0.0
 * @access public
 */
class Onepress_Customize_Repeatable_Control extends WP_Customize_Control {

	/**
	 * The type of customize control being rendered.
	 *
	 * @since  1.0.0
	 * @access public
	 * @var    string
	 */
	public $type = 'repeatable';

	// public $fields = array();

	public $fields = array();
	public $live_title_id = null;
	public $title_format = null;
	public $defined_values = null;
	public $id_key = null;
	public $limited_msg = null;
	public $add_text = null;


	public function __construct( $manager, $id, $args = array() )
	{
		parent::__construct( $manager, $id, $args);
		if ( empty( $args['fields'] ) || ! is_array( $args['fields'] ) ) {
			$args['fields'] = array();
		}

		foreach ( $args['fields'] as $key => $op ) {
			$args['fields'][ $key ]['id'] = $key;
			if( ! isset( $op['value'] ) ) {
				if( isset( $op['default'] ) ) {
					$args['fields'][ $key ]['value'] = $op['default'];
				} else {
					$args['fields'][ $key ]['value'] = '';
				}
			}

		}

		$this->fields = $args['fields'];
		$this->live_title_id = isset( $args['live_title_id'] ) ? $args['live_title_id'] : false;
		$this->defined_values = isset( $args['defined_values'] ) ? $args['defined_values'] : false;
		$this->id_key = isset( $args['id_key'] ) ? $args['id_key'] : false;
		if ( isset( $args['title_format'] ) && $args['title_format'] != '' ) {
			$this->title_format = $args['title_format'];
		} else {
			$this->title_format = '';
		}

		if ( isset( $args['limited_msg'] ) && $args['limited_msg'] != '' ) {
			$this->limited_msg = $args['limited_msg'];
		} else {
			$this->limited_msg = '';
		}

		if ( ! isset( $args['max_item'] ) ) {
			$args['max_item'] = 0;
		}

		if ( ! isset( $args['allow_unlimited'] ) || $args['allow_unlimited'] != false ) {
			$this->max_item =  apply_filters( 'onepress_reepeatable_max_item', absint( $args['max_item'] ) );
		}  else {
			$this->max_item = absint( $args['max_item'] );
		}

		$this->changeable =  isset(  $args['changeable'] ) && $args['changeable'] == 'no' ? 'no' : 'yes';
		$this->default_empty_title =  isset(  $args['default_empty_title'] ) && $args['default_empty_title'] != '' ? $args['default_empty_title'] : esc_html__( 'Item', 'onepress' );

	}

	public function merge_data( $array_value, $array_default ){

		if ( ! $this->id_key ) {
			return $array_value;
		}

		if ( ! is_array( $array_value ) ) {
			$array_value =  array();
		}

		if ( ! is_array( $array_default ) ) {
			$array_default =  array();
		}

		$new_array = array();
		foreach ( $array_value as $k => $a ) {

			if ( is_array( $a ) ) {
				if ( isset ( $a[ $this->id_key ]  ) && $a[ $this->id_key ] != '' ) {
					$new_array[ $a[ $this->id_key ] ] = $a;
				} else {
					$new_array[ $k ] = $a;
				}
			}
		}

		foreach ( $array_default as $k => $a ) {
			if ( is_array( $a ) && isset ( $a[ $this->id_key ]  ) ) {
				if ( ! isset ( $new_array[ $a[ $this->id_key ] ] ) ) {
					$new_array[ $a[ $this->id_key ] ] = $a;
				}
			}
		}

		return array_values( $new_array );
	}

	public function to_json() {
		parent::to_json();
		$value = $this->value();

		if (is_string( $value ) ) {
			$value = json_decode( $value, true );
		}
		if ( empty ( $value ) ){
			$value = $this->defined_values;
		} elseif ( is_array( $this->defined_values ) && ! empty ( $this->defined_values ) ) {
			$value = $this->merge_data( $value, $this->defined_values );
		}

		/**
		 * @since 2.1.1
		 */
		if ( $this->id_key == 'section_id' ) {
		    foreach ( ( array ) $value as $k => $v ) {

		        if ( ! Onepress_Config::is_section_active( $v['section_id'] ) ) {
			        $value[ $k ]['__visibility'] = 'hidden';
                } else {
			        $value[ $k ]['__visibility'] = '';
                }
            }
        }

		$this->json['live_title_id'] = $this->live_title_id;
		$this->json['title_format']  = $this->title_format;
		$this->json['max_item']      = $this->max_item;
		$this->json['limited_msg']   = $this->limited_msg;
		$this->json['changeable']    = $this->changeable;
		$this->json['default_empty_title']    = $this->default_empty_title;
		$this->json['value']         = $value;
		$this->json['id_key']        = $this->id_key;
		$this->json['fields']        = $this->fields;

	}

	/**
	 * Enqueue scripts/styles.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function enqueue() {
		add_action( 'customize_controls_print_footer_scripts', array( __CLASS__, 'item_tpl' ), 66 );
	}

	public static function item_tpl(){
		?>
		<script type="text/html" id="repeatable-js-item-tpl">
			<?php self::js_item(); ?>
		</script>
		<?php
	}

	public function render_content() {
		?>
		<label>
			<?php if ( ! empty( $this->label ) ) : ?>
				<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
			<?php endif; ?>
			<?php if ( ! empty( $this->description ) ) : ?>
				<span class="description customize-control-description"><?php echo wp_kses_post($this->description); ?></span>
			<?php endif; ?>
		</label>
		<input data-hidden-value type="hidden" <?php $this->input_attrs(); ?> value="" <?php $this->link(); ?> />
		<div class="form-data">
			<ul class="list-repeatable"></ul>
		</div>
		<div class="repeatable-actions">
			<span class="button-secondary add-new-repeat-item"><?php echo ( $this->add_text ) ? esc_html( $this->add_text ) : esc_html__( 'Add an item', 'onepress' ); ?></span>
		</div>
		<?php
	}

	public static function js_item(){

		?>
		<li class="repeatable-customize-control">
			<div class="widget">
				<div class="widget-top">
					<div class="widget-title-action">
						<a class="widget-action" href="#"></a>
					</div>
					<div class="widget-title">
						<h4 class="live-title"><?php esc_html_e( 'Item', 'onepress' ); ?></h4>
					</div>
				</div>

				<div class="widget-inside">
					<div class="form">
						<div class="widget-content">
							<# var cond_v; #>
							<# for ( i in data ) { #>
							<# if ( ! data.hasOwnProperty( i ) ) continue; #>
							<# field = data[i]; #>
							<# if ( ! field.type ) continue; #>
							<# if ( field.type ){ #>

							<#
							if ( ! _.isEmpty( field.required  ) ) {
							#>
							<div data-field-id="{{ field.id }}" class="field--item conditionize item item-{{ field.type }} item-{{ field.id }}" data-cond="{{ JSON.stringify( field.required ) }}" >
								<#
								} else {
								#>
								<div data-field-id="{{ field.id }}"  class="field--item item item-{{ field.type }} item-{{ field.id }}" >
									<#
									}
									#>
									<# if ( field.type !== 'checkbox' ) { #>
									<# if ( field.title ) { #>
									<label class="field-label">{{ field.title }}</label>
									<# } #>

									<# if ( field.desc ) { #>
									<p class="field-desc description">{{{ field.desc }}}</p>
									<# } #>
									<# } #>

									<# if ( field.type === 'hidden' ) { #>
									<input data-live-id="{{ field.id }}" type="hidden" value="{{ field.value }}" data-repeat-name="_items[__i__][{{ field.id }}]" class="">
									<# } else if ( field.type === 'add_by' ) { #>
									<input data-live-id="{{ field.id }}" type="hidden" value="{{ field.value }}" data-repeat-name="_items[__i__][{{ field.id }}]" class="add_by">
									<# } else if ( field.type === 'text' ) { #>
									<input data-live-id="{{ field.id }}" type="text" value="{{ field.value }}" data-repeat-name="_items[__i__][{{ field.id }}]" class="">
									<# } else if ( field.type === 'checkbox' ) { #>

									<# if ( field.title ) { #>
									<label class="checkbox-label">
										<input data-live-id="{{ field.id }}" type="checkbox" <# if ( field.value ) { #> checked="checked" <# } #> value="1" data-repeat-name="_items[__i__][{{ field.id }}]" class="">
										{{ field.title }}</label>
									<# } #>

									<# if ( field.desc ) { #>
									<p class="field-desc description">{{ field.desc }}</p>
									<# } #>


									<# } else if ( field.type === 'select' ) { #>

									<# if ( field.multiple ) { #>
									<select data-live-id="{{ field.id }}"  class="select-multiple" multiple="multiple" data-repeat-name="_items[__i__][{{ field.id }}][]">
										<# } else  { #>
										<select data-live-id="{{ field.id }}"  class="select-one" data-repeat-name="_items[__i__][{{ field.id }}]">
											<# } #>

											<# for ( k in field.options ) { #>
											<# if ( _.isArray( field.value ) ) { #>
											<option <# if ( _.contains( field.value , k ) ) { #> selected="selected" <# } #>  value="{{ k }}">{{ field.options[k] }}</option>
											<# } else { #>
											<option <# if ( field.value == k ) { #> selected="selected" <# } #>  value="{{ k }}">{{ field.options[k] }}</option>
											<# } #>
											<# } #>

										</select>

										<# } else if ( field.type === 'radio' ) { #>

										<# for ( k in field.options ) { #>

										<# if ( field.options.hasOwnProperty( k ) ) { #>

										<label>
											<input data-live-id="{{ field.id }}"  type="radio" <# if ( field.value == k ) { #> checked="checked" <# } #> value="{{ k }}" data-repeat-name="_items[__i__][{{ field.id }}]" class="widefat">
											{{ field.options[k] }}
										</label>

										<# } #>
										<# } #>

										<# } else if ( field.type == 'color' || field.type == 'coloralpha'  ) { #>

										<# if ( field.value !='' ) { field.value = '#'+field.value ; }  #>

										<input data-live-id="{{ field.id }}" data-show-opacity="true" type="text" value="{{ field.value }}" data-repeat-name="_items[__i__][{{ field.id }}]" class="color-field c-{{ field.type }} alpha-color-control">

										<# } else if ( field.type == 'media' ) { #>

										<# if ( !field.media  || field.media == '' || field.media =='image' ) {  #>
										<input type="hidden" value="{{ field.value.url }}" data-repeat-name="_items[__i__][{{ field.id }}][url]" class="image_url widefat">
										<# } else { #>
										<input type="text" value="{{ field.value.url }}" data-repeat-name="_items[__i__][{{ field.id }}][url]" class="image_url widefat">
										<# } #>
										<input type="hidden" data-live-id="{{ field.id }}"  value="{{ field.value.id }}" data-repeat-name="_items[__i__][{{ field.id }}][id]" class="image_id widefat">

										<# if ( !field.media  || field.media == '' || field.media =='image' ) {  #>
										<div class="current <# if ( field.value.url !== '' ){ #> show <# } #>">
											<div class="container">
												<div class="attachment-media-view attachment-media-view-image landscape">
													<div class="thumbnail thumbnail-image">
														<# if ( field.value.url !== '' ){ #>
														<img src="{{ field.value.url }}" alt="">
														<# } #>
													</div>
												</div>
											</div>
										</div>
										<# } #>

										<div class="actions">
											<button class="button remove-button " <# if ( ! field.value.url ){ #> style="display:none"; <# } #> type="button"><?php esc_html_e( 'Remove', 'onepress' ) ?></button>
											<button class="button upload-button" data-media="{{field.media}}" data-add-txt="<?php esc_attr_e( 'Add', 'onepress' ); ?>" data-change-txt="<?php esc_attr_e( 'Change', 'onepress' ); ?>" type="button"><# if ( ! field.value.url  ){ #> <?php esc_html_e( 'Add', 'onepress' ); ?> <# } else { #> <?php esc_html_e( 'Change', 'onepress' ); ?> <# } #> </button>
											<div style="clear:both"></div>
										</div>

										<# } else if ( field.type == 'textarea' || field.type == 'editor' ) { #>
										<textarea data-live-id="{{{ field.id }}}" data-repeat-name="_items[__i__][{{ field.id }}]">{{ field.value }}</textarea>
										<# }  else if ( field.type == 'icon'  ) { #>
										<#
										var icon_class = field.value;
										if ( icon_class.indexOf( 'fa-' ) != 0 ) {
										icon_class = 'fa-' + field.value;
										} else {
										icon_class = icon_class.replace( 'fa ', '' );
										}
										icon_class = icon_class.replace( 'fa-fa', '' );

										#>
										<div class="icon-wrapper">
											<i class="fa {{ icon_class }}"></i>
											<input data-live-id="{{ field.id }}" type="hidden" value="{{ field.value }}" data-repeat-name="_items[__i__][{{ field.id }}]" class="">
										</div>
										<a href="#" class="remove-icon"><?php esc_html_e( 'Remove', 'onepress' ); ?></a>
										<# }  #>

								</div>

								<# } #>
								<# } #>


								<div class="widget-control-actions">
									<div class="alignleft">
                                    <span class="remove-btn-wrapper">
                                        <a href="#" class="repeat-control-remove" title=""><?php esc_html_e( 'Remove', 'onepress' ); ?></a> |
                                    </span>
										<a href="#" class="repeat-control-close"><?php esc_html_e( 'Close', 'onepress' ); ?></a>
									</div>
									<br class="clear">
								</div>

							</div>
						</div>

					</div>

				</div>
		</li>
		<?php

	}

}
