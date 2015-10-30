<?php
/**
 * OnePress About Item widget.
 *
 * @package OnePress
 */


// Register the widget
add_action( 'widgets_init', create_function( '', 'return register_widget("OnePress_Project_Widget");'));

class OnePress_Project_Widget extends WP_Widget {

    public function __construct() {
        $widget_ops  = array( 'classname' => 'onepress_project_item' );
        //$control_ops = array('width' => 400, 'height' => 350);
        parent::__construct( 'onepress_project_widget', 'OnePress: Project', $widget_ops );
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
        $image_attributes_1 = wp_get_attachment_image_src( $project_image_1, 'onepress-medium' );

        ?>
        <div class="project-item wow slideInUp">
            <div class="project-content project-contents">
                <?php if ( ! empty( $project_image_1 ) ) : ?>
                <div class="project-thumb project-trigger">
                    <img src="<?php echo $image_attributes_1[0]; ?>" alt="<?php if ( ! empty( $title ) ) echo $title; ?>">
                </div>
                <?php endif; ?>

                <div class="project-header project-trigger">
                    <?php if ( ! empty( $title ) ) echo '<h5 class="project-small-title">'. $title .'</h5>'; ?>
                    <?php if ( ! empty( $project_meta ) ) echo '<div class="project-meta">'. $project_meta .'</div>'; ?>
                </div>
            </div>
            <div class="project-detail project-expander">
                <div class="grid-row project-expander-contents">
                    <div class="project-trigger-close close">close</div>
                    <div class="grid-sm-7">
                        <?php if ( ! empty( $project_image_1 ) ) : ?>
                        <img src="<?php echo $image_attributes_1[0]; ?>" alt="<?php if ( ! empty( $title ) ) echo $title; ?>">
                        <?php endif; ?>
                    </div>
                    <div class="grid-sm-5 project-detail-content">
                        <?php if ( ! empty( $title ) ) echo ' <h2 class="project-detail-title">'. $title .'</h2>'; ?>
                        <div class="project-detail-entry">
                            <?php if ( ! empty( $text ) ) echo $text; ?>
                        </div>
                    </div>
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

        $instance                    = $old_instance;
        $instance['title']           = strip_tags( $new_instance['title'] );
        $instance['project_image_1'] = strip_tags( $new_instance['project_image_1'] );
        $instance['project_meta']    = strip_tags( $new_instance['project_meta'] );
        $instance['text']            = stripslashes( wp_filter_post_kses( addslashes($new_instance['text']) ) );

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
            'title'           => 'Project Title 1',
            'project_image_1' => '',
            'project_meta'    => 'Graphic / Branding',
            'text'            => '<p>Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec <a href="#">vulputate eget</a> arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis.</p>
<p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae.</p>
<p><strong>Skills: </strong><i>WordPress, HTML, CSS, jQuery</i></p>
<p><strong>Client: </strong><i>FameThemes, LLC</i></p>
<p><strong>Website: </strong><a target="_blank" href="http://www.famethemes.com"><i>http://www.famethemes.com</i></a></p>');
        $instance = wp_parse_args( (array) $instance, $defaults );
        $project_image_1 = esc_attr($instance['project_image_1']);

    ?>
        <p>
            <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Project Title:', 'onepress' ); ?></label>
            <input id="<?php echo $this->get_field_id( 'title' ); ?>" class="widefat" type="text"  name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php if ( ! empty( $instance['title'] ) ) { echo $instance['title']; } ?>" />
        </p>

        <p>
            <label for=""><?php _e( 'Project Image:', 'onepress' ); ?></label>
            <?php
            $arg = array( 'field_name' => $this->get_field_name('project_image_1'), 'field_id' => $this->get_field_id('project_image_1') );
            onepress_widget_image_uploader( $arg, $project_image_1 );
            ?>
        </p>
        
        <p>
            <label for="<?php echo $this->get_field_id( 'project_meta' ); ?>"><?php _e( 'Project Meta:', 'onepress' ); ?></label>
            <input id="<?php echo $this->get_field_id( 'project_meta' ); ?>" class="widefat" type="text"  name="<?php echo $this->get_field_name( 'project_meta' ); ?>" value="<?php if ( ! empty( $instance['project_meta'] ) ) { echo $instance['project_meta']; } ?>" />
        </p>

        <p>
            <label for="<?php echo $this->get_field_id('text'); ?>"><?php _e( 'Project Content:', 'onepress' ); ?></label><br />
            <textarea name="<?php echo $this->get_field_name('text'); ?>" id="<?php echo $this->get_field_id('text'); ?>" class="widefat" rows="15" cols="20"><?php if( ! empty( $instance['text'] ) ) { echo ($instance['text']); } ?></textarea>
        </p>
       
    <?php
    }

} // End widget class.
?>