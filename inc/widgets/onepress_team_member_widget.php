<?php
/**
 * OnePress About Item widget.
 *
 * @package OnePress
 */


// Register the widget
add_action( 'widgets_init', create_function( '', 'return register_widget("OnePress_Team_Member_Widget");'));

class OnePress_Team_Member_Widget extends WP_Widget {

    public function __construct() {
        $widget_ops  = array( 'classname' => 'onepress_project_item' );
        //$control_ops = array('width' => 400, 'height' => 350);
        parent::__construct( 'onepress_team_member_widget', 'OnePress: Team Member', $widget_ops );
        add_action('admin_enqueue_scripts', array($this, 'onepress_project_scripts'));
    }

    // Media uploader scripts
    public function onepress_project_scripts() {
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
        $image_attributes = wp_get_attachment_image_src( $profile_image_id, 'onepress-small' );

        ?>
        <div class="team-member grid-sm-3 wow slideInUp">
            <div class="member-thumb">
                <?php if ( ! empty( $profile_image_id ) ) : ?>
                <img src="<?php echo $image_attributes[0]; ?>" alt="<?php if ( ! empty( $title ) ) echo $title; ?>">
                <?php endif; ?>
                <div class="member-profile">
                    <?php if ( ! empty( $profile_twitter ) ) echo '<a target="_blank" href="'. $profile_twitter .'"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x fa-inverse"></i></span></a>'; ?>
                    <?php if ( ! empty( $profile_facebok ) ) echo '<a target="_blank" href="'. $profile_facebok .'"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-facebook fa-stack-1x fa-inverse"></i></span></a>'; ?>
                    <?php if ( ! empty( $profile_google ) ) echo '<a target="_blank" href="'. $profile_google .'"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-google-plus fa-stack-1x fa-inverse"></i></span></a>'; ?>
                    <?php if ( ! empty( $profile_linkedin ) ) echo '<a target="_blank" href="'. $profile_linkedin .'"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-linkedin fa-stack-1x fa-inverse"></i></span></a>'; ?>
                </div>
            </div>
            <div class="member-info">
                <?php if ( ! empty( $title ) ) echo '<h5 class="member-name">'. $title .'</h5>'; ?>
                <?php if ( ! empty( $position ) ) echo '<span class="member-position">'. $position .'</span>'; ?>
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

        $instance                     = $old_instance;
        $instance['title']            = strip_tags( $new_instance['title'] );
        $instance['profile_image_id'] = strip_tags( $new_instance['profile_image_id'] );
        $instance['position']         = stripslashes( wp_filter_post_kses( addslashes($new_instance['position']) ) );
        $instance['profile_twitter']  = strip_tags( $new_instance['profile_twitter'] );
        $instance['profile_facebok']  = strip_tags( $new_instance['profile_facebok'] );
        $instance['profile_google']   = strip_tags( $new_instance['profile_google'] );
        $instance['profile_linkedin'] = strip_tags( $new_instance['profile_linkedin'] );

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
            'title'            => 'George Wells',
            'profile_image_id' => '',
            'position'         => 'User Experience',
            'profile_twitter'  => '',
            'profile_facebok'  => '',
            'profile_google'   => '',
            'profile_linkedin' => '',
        );
        $instance         = wp_parse_args( (array) $instance, $defaults );
        $profile_image_id = esc_attr($instance['profile_image_id']);

    ?>
        <p>
            <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Name:', 'onepress' ); ?></label>
            <input id="<?php echo $this->get_field_id( 'title' ); ?>" class="widefat" type="text"  name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php if ( ! empty( $instance['title'] ) ) { echo $instance['title']; } ?>" />
        </p>

        <p>
            <label for=""><?php _e( 'Profile Image:', 'onepress' ); ?></label>
            <?php
            $arg = array( 'field_name' => $this->get_field_name('profile_image_id'), 'field_id' => $this->get_field_id('profile_image_id') );
            onepress_widget_image_uploader( $arg, $profile_image_id );
            ?>
        </p>
        
        <p>
            <label for="<?php echo $this->get_field_id( 'position' ); ?>"><?php _e( 'Position:', 'onepress' ); ?></label>
            <input id="<?php echo $this->get_field_id( 'position' ); ?>" class="widefat" type="text"  name="<?php echo $this->get_field_name( 'position' ); ?>" value="<?php if ( ! empty( $instance['position'] ) ) { echo $instance['position']; } ?>" />
        </p>
        
        <hr>

        <p>
            <label for="<?php echo $this->get_field_id( 'profile_twitter' ); ?>"><?php _e( 'Twitter URL:', 'onepress' ); ?></label>
            <input id="<?php echo $this->get_field_id( 'profile_twitter' ); ?>" class="widefat" type="text"  name="<?php echo $this->get_field_name( 'profile_twitter' ); ?>" value="<?php if ( ! empty( $instance['profile_twitter'] ) ) { echo $instance['profile_twitter']; } ?>" />
        </p>
        

        <p>
            <label for="<?php echo $this->get_field_id( 'profile_facebok' ); ?>"><?php _e( 'Facebook URL:', 'onepress' ); ?></label>
            <input id="<?php echo $this->get_field_id( 'profile_facebok' ); ?>" class="widefat" type="text"  name="<?php echo $this->get_field_name( 'profile_facebok' ); ?>" value="<?php if ( ! empty( $instance['profile_facebok'] ) ) { echo $instance['profile_facebok']; } ?>" />
        </p>
        
        <p>
            <label for="<?php echo $this->get_field_id( 'profile_google' ); ?>"><?php _e( 'Google URL:', 'onepress' ); ?></label>
            <input id="<?php echo $this->get_field_id( 'profile_google' ); ?>" class="widefat" type="text"  name="<?php echo $this->get_field_name( 'profile_google' ); ?>" value="<?php if ( ! empty( $instance['profile_google'] ) ) { echo $instance['profile_google']; } ?>" />
        </p>

        <p>
            <label for="<?php echo $this->get_field_id( 'profile_linkedin' ); ?>"><?php _e( 'Linkedin URL:', 'onepress' ); ?></label>
            <input id="<?php echo $this->get_field_id( 'profile_linkedin' ); ?>" class="widefat" type="text"  name="<?php echo $this->get_field_name( 'profile_linkedin' ); ?>" value="<?php if ( ! empty( $instance['profile_linkedin'] ) ) { echo $instance['profile_linkedin']; } ?>" />
        </p>
       
    <?php
    }

} // End widget class.
?>