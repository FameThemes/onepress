<?php
/**
 * OnePress About Item widget.
 *
 * @package OnePress
 */


// Register the widget
add_action( 'widgets_init', create_function( '', 'return register_widget("OnePress_About_Widget");'));

class OnePress_About_Widget extends WP_Widget {

    public function __construct() {
        $widget_ops  = array( 'classname' => 'onepress_about_item' );
        $control_ops = array('width' => 400, 'height' => 350);
        parent::__construct( 'onepress_about_widget', 'OnePress: About Item', $widget_ops, $control_ops );
        add_action('admin_enqueue_scripts', array($this, 'onepress_about_scripts'));
    }

    // Media uploader scripts
    public function onepress_about_scripts() {
        wp_enqueue_media();
    }


    /**
     * Outputs the HTML for this widget.
     *
     * @param array  An array of standard parameters for widgets in this theme
     * @param array  An array of settings for this widget instance
     * @return void Echoes it's output
     **/
    public function widget( $args, $instance )
    {   
        extract($instance);
        $image_attributes = wp_get_attachment_image_src( $image_id, 'onepress-medium' );

        $grid_col = '';
        $about_items = onepress_count_sidebar_widgets('section_about', false);
        if ( $about_items == '1' ) $grid_col = '12';
        if ( $about_items == '2' ) $grid_col = '6';
        if ( $about_items == '3' ) $grid_col = '4';
        if ( $about_items == '4' ) $grid_col = '3';
        if ( $about_items >= '5' ) $grid_col = '3';

        echo '<div class="grid-sm-'. $grid_col .' wow slideInUp">';

            if ( ! empty( $image_id ) ) {
                ?>
                <div class="about-image">
                    <img src="<?php echo $image_attributes[0]; ?>" alt="<?php if ( ! empty( $title ) ) echo $title; ?>">
                </div>
                <?php
            }
            if ( ! empty( $title ) ) {
                echo '<h5>' . $title . '</h5>';
            }
            if ( ! empty( $text ) ) {
                echo '<p>' . $text . '</p>';
            }

        echo '</div>';
    }

    /**
     * Deals with the settings when they are saved by the admin. Here is
     * where any validation should be dealt with.
     *
     * @param array  An array of new settings as submitted by the admin
     * @param array  An array of the previous settings
     * @return array The validated and (if necessary) amended settings
     **/
    public function update( $new_instance, $old_instance ) {

        $instance             = $old_instance;
        $instance['title']    = strip_tags( $new_instance['title'] );
        $instance['image_id'] = strip_tags( $new_instance['image_id'] );
        $instance['text']     = stripslashes( wp_filter_post_kses( addslashes($new_instance['text']) ) );

        return $instance;
    }

    /**
     * Displays the form for this widget on the Widgets page of the WP Admin area.
     *
     * @param array  An array of the current settings for this widget
     * @return void
     **/
    public function form( $instance ) {

        /* Set up some default widget settings. */
        $defaults = array(
            'title'    => '',
            'image_id' => '',
            'text'     => ''
        );
        $instance = wp_parse_args( (array) $instance, $defaults );
        $image_id =  esc_attr($instance['image_id']);

    ?>
        <p>
            <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:', 'onepress' ); ?></label>
            <input id="<?php echo $this->get_field_id( 'title' ); ?>" class="widefat" type="text"  name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php if ( ! empty( $instance['title'] ) ) { echo $instance['title']; } ?>" />
        </p>
        
        <p>
            <label for=""><?php _e( 'Image:', 'onepress' ); ?></label>
            <?php
            $arg = array( 'field_name' => $this->get_field_name('image_id'), 'field_id' => $this->get_field_id('image_id') );
            onepress_widget_image_uploader( $arg, $image_id );
            ?>
        </p>

        <p>
            <label for="<?php echo $this->get_field_id('text'); ?>"><?php _e( 'Widget Content:', 'onepress' ); ?></label><br />
            <textarea name="<?php echo $this->get_field_name('text'); ?>" id="<?php echo $this->get_field_id('text'); ?>" class="widefat" rows="10" cols="20"><?php if( ! empty( $instance['text'] ) ) { echo ($instance['text']); } ?></textarea>
        </p>
       
    <?php
    }



} // End widget class.
?>