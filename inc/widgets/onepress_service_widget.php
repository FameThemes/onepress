<?php
/**
 * OnePress Service Item widget.
 *
 * @package OnePress
 */


// Register the widget
add_action( 'widgets_init', create_function( '', 'return register_widget("OnePress_Service_Widget");'));

class OnePress_Service_Widget extends WP_Widget {

    public function __construct() {
        $widget_ops  = array( 'classname' => 'onepress_service_item' );
        $control_ops = array('width' => 400, 'height' => 350);
        parent::__construct( 'onepress_service_widget', 'OnePress: Service Item', $widget_ops, $control_ops );
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
        ?>
        <div class="grid-sm-6">
            <div class="service-item wow slideInUp">
                <?php if ( ! empty( $icon_class ) ) { ?>
                <div class="service-image">
                    <i class="fa <?php echo $icon_class ?> fa-5x"></i>
                </div>
                <?php } ?>
                <div class="service-content">
                    <?php if ( ! empty( $title ) ) { ?>
                    <h5 class="service-title"><?php echo $title; ?></h5>
                    <?php } ?>
                    <p><?php if ( ! empty( $text ) ) echo $text; ?></p>
                </div>
            </div>
        </div>
        <?php
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

        $instance               = $old_instance;
        $instance['title']      = strip_tags( $new_instance['title'] );
        $instance['icon_class'] = strip_tags( $new_instance['icon_class'] );
        $instance['text']       = stripslashes( wp_filter_post_kses( addslashes($new_instance['text']) ) );

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
            'title'      => '',
            'icon_class' => 'fa-bar-chart',
            'text'       => ''
        );
        $instance = wp_parse_args( (array) $instance, $defaults );

    ?>
        <p>
            <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:', 'onepress' ); ?></label>
            <input id="<?php echo $this->get_field_id( 'title' ); ?>" class="widefat" type="text"  name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php if ( ! empty( $instance['title'] ) ) { echo $instance['title']; } ?>" />
        </p>

        <p>
            <label for="<?php echo $this->get_field_id('icon_class'); ?>"><?php _e( 'FontAwesome icon class:', 'onepress' ); ?></label><br />
            <?php
            // if ( $instance['icon_class'] != '' ) {
            //     echo '<img class="media_upload_image" src="' . $instance['image_uri'] . '" style="margin:5px 0px;padding:0;max-width:100%;float:left;display:inline-block" /><br />';
            // }
            ?>
            <input id="<?php echo $this->get_field_id( 'icon_class' ); ?>" class="widefat" type="text"  name="<?php echo $this->get_field_name( 'icon_class' ); ?>" value="<?php if ( ! empty( $instance['icon_class'] ) ) { echo $instance['icon_class']; } ?>" />

        </p>
        <p>Go to <a target="_blank" href="http://fortawesome.github.io/Font-Awesome/cheatsheet/">Font-Awesome cheatsheet/</a> to choose icon, copy icon class ( example: <code>fa-bar-chart</code> ) and paste it to the above input field.</p>

        <p>
            <label for="<?php echo $this->get_field_id('text'); ?>"><?php _e( 'Content:', 'onepress' ); ?></label><br />
            <textarea name="<?php echo $this->get_field_name('text'); ?>" id="<?php echo $this->get_field_id('text'); ?>" class="widefat" rows="10" cols="20"><?php if( ! empty( $instance['text'] ) ) { echo ($instance['text']); } ?></textarea>
        </p>
       
    <?php
    }



} // End widget class.
?>