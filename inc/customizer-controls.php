<?php


/*-----------------------------------------------------------------------------------*/
/*  OnePress Customizer Controls
/*-----------------------------------------------------------------------------------*/

class OnePress_Misc_Control extends WP_Customize_Control {


	public $settings = 'blogname';
	public $description = '';
	public $group = '';

	/**
	 * Render the description and title for the sections
	 */
	public function render_content() {
		switch ( $this->type ) {
			default:

			case 'heading':
				echo '<span class="customize-control-title">' . $this->title . '</span>';
				break;

			case 'custom_message' :
				echo '<p class="description">' . $this->description . '</p>';
				break;

			case 'hr' :
				echo '<hr />';
				break;
		}
	}
}

class One_Press_Textarea_Custom_Control extends WP_Customize_Control
{
	public function render_content() {
		?>
		<label>
			<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
			<textarea class="large-text" cols="20" rows="5" <?php $this->link(); ?>>
				<?php echo esc_textarea( $this->value() ); ?>
			</textarea>
			<p class="description"><?php echo $this->description ?></p>
		</label>
		<?php
	}
}

class OnePress_Theme_Support extends WP_Customize_Control {
	public function render_content() {
		echo wp_kses_post( 'Upgrade to <a href="#">OnePress Plus</a> to be able to change the section order and styling!', 'onepress' );
	}
}

if ( ! function_exists( 'onepress_sanitize_checkbox' ) ) {
    function onepress_sanitize_checkbox( $input ) {
        if ( $input == 1 ) {
            return 1;
        } else {
            return 0;
        }
    }
}

/**
 * Sanitize CSS code
 *
 * @param $string
 * @return string
 */
function onepress_sanitize_css($string) {
    $string = preg_replace( '@<(script|style)[^>]*?>.*?</\\1>@si', '', $string );
    $string = strip_tags($string);
    return trim( $string );
}


function onepress_sanitize_color_alpha( $color ){
    $color = str_replace( '#', '', $color );
    if ( '' === $color ){
        return '';
    }

    // 3 or 6 hex digits, or the empty string.
    if ( preg_match('|^#([A-Fa-f0-9]{3}){1,2}$|', '#' . $color ) ) {
        // convert to rgb
        $colour = $color;
        if ( strlen( $colour ) == 6 ) {
            list( $r, $g, $b ) = array( $colour[0] . $colour[1], $colour[2] . $colour[3], $colour[4] . $colour[5] );
        } elseif ( strlen( $colour ) == 3 ) {
            list( $r, $g, $b ) = array( $colour[0] . $colour[0], $colour[1] . $colour[1], $colour[2] . $colour[2] );
        } else {
            return false;
        }
        $r = hexdec( $r );
        $g = hexdec( $g );
        $b = hexdec( $b );
        return 'rgba('.join( ',', array( 'r' => $r, 'g' => $g, 'b' => $b, 'a' => 1 ) ).')';

    }

    return strpos( trim( $color ), 'rgb' ) !== false ?  $color : false;
}


/**
 * Sanitize repeatable data
 *
 * @param $input
 * @param $setting object $wp_customize
 * @return bool|mixed|string|void
 */
function onepress_sanitize_repeatable_data_field( $input , $setting ){
    $control = $setting->manager->get_control( $setting->id );

    $fields = $control->fields;
    if ( is_string( $input ) ) {
        $input = json_decode( wp_unslash( $input ) , true );
    }
    $data = wp_parse_args( $input, array() );

    if ( ! is_array( $data ) ) {
        return false;
    }
    if ( ! isset( $data['_items'] ) ) {
        return  false;
    }
    $data = $data['_items'];

    foreach( $data as $i => $item_data ){
        foreach( $item_data as $id => $value ){

            if ( isset( $fields[ $id ] ) ){
                switch( strtolower( $fields[ $id ]['type'] ) ) {
                    case 'text':
                        $data[ $i ][ $id ] = sanitize_text_field( $value );
                        break;
                    case 'textarea':
                    case 'editor':
                        $data[ $i ][ $id ] = wp_kses_post( $value );
                        break;
                    case 'color':
                        $data[ $i ][ $id ] = sanitize_hex_color_no_hash( $value );
                        break;
                    case 'coloralpha':
                        $data[ $i ][ $id ] = onepress_sanitize_color_alpha( $value );
                        break;
                    case 'checkbox':
                        $data[ $i ][ $id ] =  onepress_sanitize_checkbox( $value );
                        break;
                    case 'select':
                        $data[ $i ][ $id ] = '';
                        if ( is_array( $fields[ $id ]['options'] ) && ! empty( $fields[ $id ]['options'] ) ){
                            // if is multiple choices
                            if ( is_array( $value ) ) {
                                foreach ( $value as $k => $v ) {
                                    if ( isset( $fields[ $id ]['options'][ $v ] ) ) {
                                        $value [ $k ] =  $v;
                                    }
                                }
                                $data[ $i ][ $id ] = $value;
                            }else { // is single choice
                                if (  isset( $fields[ $id ]['options'][ $value ] ) ) {
                                    $data[ $i ][ $id ] = $value;
                                }
                            }
                        }

                        break;
                    case 'radio':
                        $data[ $i ][ $id ] = sanitize_text_field( $value );
                        break;
                    case 'media':
                        $value = wp_parse_args( $value,
                            array(
                                'url' => '',
                                'id'=> false
                            )
                        );
                        $value['id'] = absint( $value['id'] );
                        $data[ $i ][ $id ]['url'] = sanitize_text_field( $value['url'] );

                        if ( $url = wp_get_attachment_url( $value['id'] ) ) {
                            $data[ $i ][ $id ]['id']   = $value['id'];
                            $data[ $i ][ $id ]['url']  = $url;
                        } else {
                            $data[ $i ][ $id ]['id'] = '';
                        }

                        break;
                    default:
                        $data[ $i ][ $id ] = wp_kses_post( $value );
                }

            }else {
                $data[ $i ][ $id ] = wp_kses_post( $value );
            }

            if ( count( $data[ $i ] ) !=  count( $fields ) ) {
                foreach ( $fields as $k => $f ){
                    if ( ! isset( $data[ $i ][ $k ] ) ) {
                        $data[ $i ][ $k ] = '';
                    }
                }
            }

        }
    }

    return $data;
}


class OnePress_Editor_Custom_Control extends WP_Customize_Control
{
    /**
     * The type of customize control being rendered.
     *
     * @since  1.0.0
     * @access public
     * @var    string
     */
    public $type = 'wp_editor';

    /**
     * Add support for palettes to be passed in.
     *
     * Supported palette values are true, false, or an array of RGBa and Hex colors.
     */
    public $mod;

    public function render_content() {
        $this->mod = strtolower( $this->mod );
        if( ! $this->mod = 'html' ) {
            $this->mod = 'tmce';
        }
        ?>
        <div class="wp-js-editor">
            <label>
                <span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
            </label>
            <textarea class="wp-js-editor-textarea large-text" data-editor-mod="<?php echo esc_attr( $this->mod ); ?>" <?php $this->link(); ?>><?php echo esc_textarea( $this->value() ); ?></textarea>
            <p class="description"><?php echo $this->description ?></p>
        </div>
    <?php
    }
}

/**
 * Alpha Color Picker Customizer Control
 *
 * This control adds a second slider for opacity to the stock WordPress color picker,
 * and it includes logic to seamlessly convert between RGBa and Hex color values as
 * opacity is added to or removed from a color.
 *
 * This Alpha Color Picker is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this Alpha Color Picker. If not, see <http://www.gnu.org/licenses/>.
 */
class OnePress_Alpha_Color_Control extends WP_Customize_Control {

    /**
     * Official control name.
     */
    public $type = 'alpha-color';

    /**
     * Add support for palettes to be passed in.
     *
     * Supported palette values are true, false, or an array of RGBa and Hex colors.
     */
    public $palette;

    /**
     * Add support for showing the opacity value on the slider handle.
     */
    public $show_opacity;

    /**
     * Enqueue scripts and styles.
     *
     * Ideally these would get registered and given proper paths before this control object
     * gets initialized, then we could simply enqueue them here, but for completeness as a
     * stand alone class we'll register and enqueue them here.
     */
    public function enqueue() {

    }

    /**
     * Render the control.
     */
    public function render_content() {

        // Process the palette
        if ( is_array( $this->palette ) ) {
            $palette = implode( '|', $this->palette );
        } else {
            // Default to true.
            $palette = ( false === $this->palette || 'false' === $this->palette ) ? 'false' : 'true';
        }

        // Support passing show_opacity as string or boolean. Default to true.
        $show_opacity = ( false === $this->show_opacity || 'false' === $this->show_opacity ) ? 'false' : 'true';

        // Begin the output. ?>
        <label>
            <?php // Output the label and description if they were passed in.
            if ( isset( $this->label ) && '' !== $this->label ) {
                echo '<span class="customize-control-title">' . sanitize_text_field( $this->label ) . '</span>';
            }
            if ( isset( $this->description ) && '' !== $this->description ) {
                echo '<span class="description customize-control-description">' . sanitize_text_field( $this->description ) . '</span>';
            } ?>
            <input class="alpha-color-control" type="text" data-show-opacity="<?php echo $show_opacity; ?>" data-palette="<?php echo esc_attr( $palette ); ?>" data-default-color="<?php echo esc_attr( $this->settings['default']->default ); ?>" <?php $this->link(); ?>  />
        </label>
    <?php
    }
}



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
                <span class="description customize-control-description"><?php echo $this->description; ?></span>
            <?php endif; ?>
        </label>
        <input data-hidden-value type="hidden" <?php $this->input_attrs(); ?> value="" <?php $this->link(); ?> />
        <div class="form-data">
            <ul class="list-repeatable"></ul>
        </div>
        <div class="repeatable-actions">
            <span class="button-secondary add-new-repeat-item"><?php _e( 'Add an item', 'onepress' ); ?></span>
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
                        <h4 class="live-title"><?php _e( 'Item', 'onepress' ); ?></h4>
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
                                    if ( field.required  && field.required.length >= 3 ) {
                                        #>
                                        <div class="conditionize item item-{{ field.type }} item-{{ field.id }}" data-cond-option="{{ field.required[0] }}" data-cond-operator="{{ field.required[1] }}" data-cond-value="{{ field.required[2] }}" >
                                        <#
                                    } else {
                                        #>
                                        <div class="item item-{{ field.type }} item-{{ field.id }}" >
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
                                                <button class="button remove-button " <# if ( ! field.value.url ){ #> style="display:none"; <# } #> type="button"><?php _e( 'Remove', 'onepress' ) ?></button>
                                                <button class="button upload-button" data-media="{{field.media}}" data-add-txt="<?php esc_attr_e( 'Add', 'onepress' ); ?>" data-change-txt="<?php esc_attr_e( 'Change', 'onepress' ); ?>" type="button"><# if ( ! field.value.url  ){ #> <?php _e( 'Add', 'onepress' ); ?> <# } else { #> <?php _e( 'Change', 'onepress' ); ?> <# } #> </button>
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
                                        <a href="#" class="repeat-control-remove" title=""><?php _e( 'Remove', 'onepress' ); ?></a> |
                                    </span>
                                    <a href="#" class="repeat-control-close"><?php _e( 'Close', 'onepress' ); ?></a>
                                </div>
                                <br class="clear">
                            </div>

                        </div>
                    </div><!-- .form -->

                </div>

            </div>
        </li>
        <?php

    }

}


function onepress_enqueue_editor(){
    if( ! isset( $GLOBALS['__wp_mce_editor__'] ) || ! $GLOBALS['__wp_mce_editor__'] ) {
        $GLOBALS['__wp_mce_editor__'] = true;
        ?>
        <script id="_wp-mce-editor-tpl" type="text/html">
            <?php wp_editor('', '__wp_mce_editor__'); ?>
        </script>
        <?php
    }
}


class OnePress_Editor_Scripts
{
    /**
     * Enqueue scripts/styles.
     *
     * @since  1.0.0
     * @access public
     * @return void
     */
    public static function enqueue() {

        if ( ! class_exists( '_WP_Editors' ) ) {
            require(ABSPATH . WPINC . '/class-wp-editor.php');
        }

        add_action( 'customize_controls_print_footer_scripts', array( __CLASS__, 'enqueue_editor' ),  2 );
        add_action( 'customize_controls_print_footer_scripts', array( '_WP_Editors', 'editor_js' ), 50 );
        add_action( 'customize_controls_print_footer_scripts', array( '_WP_Editors', 'enqueue_scripts' ), 1 );
    }

    public  static function enqueue_editor(){
        if( ! isset( $GLOBALS['__wp_mce_editor__'] ) || ! $GLOBALS['__wp_mce_editor__'] ) {
            $GLOBALS['__wp_mce_editor__'] = true;
            ?>
            <script id="_wp-mce-editor-tpl" type="text/html">
                <?php wp_editor('', '__wp_mce_editor__'); ?>
            </script>
            <?php
        }
    }
}


function onepres_customizer_control_scripts(){
    wp_enqueue_media();
    wp_enqueue_script( 'jquery-ui-sortable' );
    wp_enqueue_script( 'wp-color-picker' );
    wp_enqueue_style( 'wp-color-picker' );

    wp_enqueue_script( 'onepress-customizer', get_template_directory_uri() . '/assets/js/customizer.js', array( 'customize-controls', 'wp-color-picker' ) );
    wp_enqueue_style( 'onepress-customizer',  get_template_directory_uri() . '/assets/css/customizer.css' );

}

add_action( 'customize_controls_enqueue_scripts', 'onepres_customizer_control_scripts', 99 );
add_action( 'customize_controls_enqueue_scripts', array( 'OnePress_Editor_Scripts', 'enqueue' ), 95 );

