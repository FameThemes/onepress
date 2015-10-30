<?php
/**
 * Custom functions that act independently of the theme templates.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package OnePress
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function onepress_body_classes( $classes ) {
	// Adds a class of group-blog to blogs with more than 1 published author.
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}

	return $classes;
}
add_filter( 'body_class', 'onepress_body_classes' );


if ( ! function_exists( 'onepress_custom_excerpt_length' ) ) :
/**
 * Custom excerpt length for the theme
 */
function onepress_custom_excerpt_length( $length ) {
	return 30;
}
add_filter( 'excerpt_length', 'onepress_custom_excerpt_length', 999 );
endif;


if ( ! function_exists( 'onepress_new_excerpt_more' ) ) :
/**
 * Remove […] string using Filters
 */
function onepress_new_excerpt_more( $more ) {
	return ' ...';
}
add_filter('excerpt_more', 'onepress_new_excerpt_more');
endif;

/**
 * Count active widgets in a sidebar
 */
function onepress_count_sidebar_widgets( $sidebar_id, $echo = true ) {
    $the_sidebars = wp_get_sidebars_widgets();
    if( !isset( $the_sidebars[$sidebar_id] ) )
        return __( 'Invalid sidebar ID', 'onepress' );
    if( $echo )
        echo count( $the_sidebars[$sidebar_id] );
    else
        return count( $the_sidebars[$sidebar_id] );
}

/**
 * Count active widgets in a sidebar
 */
function onepress_widget_image_uploader( $arg, $value = "" ) {

	$defaults = array(
		'useid'               => false ,
		'hidden'              => true,
		'parent_div_class'    => 'custom-image-upload',
		'field_label'         => 'upload_image_field_label',        
		'field_name'          => 'upload_image_field',
		'field_id'            => 'upload_image_field',
		'field_class'         => 'upload_image_field',
		'upload_button_id'    => 'upload_logo_button',
		'upload_button_class' => 'upload_logo_button',
		'upload_button_text'  => 'Upload',
		'remove_button_id'    => 'remove_logo_button',
		'remove_button_class' => 'remove_logo_button',
		'remove_button_text'  => 'Remove',
		'preview_div_class'   => 'preview',
		'preview_div_class2'  => 'preview remove_box',
		'preview_div_id'      => 'preview'
    );
    $arguments = wp_parse_args($arg,$defaults);
    extract($arguments);

    ?>
    <div class="<?php echo $parent_div_class; ?>" id="<?php echo $parent_div_class; ?>">
    	<div class="<?php echo $preview_div_class; ?>" style="float: none; <?php  if ( $value == "") { ?> display: none; <?php } ?>">
    		<?php 
    		if ( $value != '' ) { 
    			$image_attributes = wp_get_attachment_image_src( $value, 'full' );
    			echo '<img src="'. $image_attributes[0] .'" style="margin: 0px 0px 10px 0px;" width="200" height="auto" alt="">';
    		} else {
    			echo '<img src="" style="margin: 0px 0px 10px 0px;" width="200" height="auto" alt="">';
    		}
    		?>
            <!-- <img src="<?php  echo stripslashes($value);  ?>" style="margin: 0px 0px 10px 0px;" width="200" height="auto" alt=""> -->

        </div>
        <input name="<?php echo $field_name; ?>" id="<?php echo $field_id; ?>" class="<?php echo $field_class; ?>" <?php if($hidden): ?>  type="hidden" <?php else: ?> type="text" <?php endif; ?> value="<?php if ( $value != "") { echo stripslashes($value); }  ?>" />
        <input type="button" class="button button-primary <?php echo $upload_button_class; ?>" id="<?php echo $upload_button_id; ?>"  value="<?php echo $upload_button_text; ?>">
        <input type="button" class="button <?php echo $remove_button_class; ?>" id="<?php echo $remove_button_id; ?>" <?php  if ( $value == "") {  ?> disabled="disabled" <?php } ?> value="<?php echo $remove_button_text; ?>">
        <div style="clear: both;"></div>
    </div>
    <?php
    $usesep = ($useid) ? "#" : ".";
	if($useid):
		$field_class = $field_id;
		$upload_button_class = $upload_button_id;
		$remove_button_class = $remove_button_id;
		$preview_div_class = $preview_div_id;
	endif;  
	?>
    <script type="text/javascript">
	    jQuery(document).ready(function($){
	        $('<?php echo $usesep.$remove_button_class; ?>').click(function(e) {
	            <?php if(!$useid): ?>
	           $(this).parent().find("<?php echo $usesep.$field_class; ?>").val(""); 
	           $(this).parent().find("<?php echo $usesep.$preview_div_class; ?> img").attr("src","").fadeOut("slow");
	           <?php else: ?>
	           $("<?php echo $usesep.$field_class; ?>").val(""); 
	           $("<?php echo $usesep.$preview_div_class; ?> img").attr("src","").fadeOut("slow");
	           <?php endif; ?>
	           $(this).attr("disabled","disabled");
	         return false;   
	        });

			var _custom_media = true,
		    _orig_send_attachment = wp.media.editor.send.attachment;
		    //console.log( _orig_send_attachment );
		    $('<?php echo $usesep.$upload_button_class; ?>').click(function(e) {
			    var send_attachment_bkp = wp.media.editor.send.attachment;
			    var button = $(this);
			    var id = button.attr('id').replace('_button', '');
			    _custom_media = true;
			    wp.media.editor.send.attachment = function(props, attachment){
					if ( _custom_media ) {

					<?php if(!$useid): ?>
						button.parent().find("<?php echo $usesep.$field_class; ?>").val(attachment.id);
						button.parent().find("<?php echo $usesep.$preview_div_class; ?> img").attr("src",attachment.url).fadeIn("slow");
						button.parent().find("<?php echo $usesep.$remove_button_class; ?>").removeAttr("disabled");
						if($('.preview img').length > 0){ $('.preview').css('display','block'); };
					<?php else: ?>
							$("<?php echo $usesep.$field_class; ?>").val(attachment.url);
							$("<?php echo $usesep.$preview_div_class; ?> img").attr("src",attachment.url).fadeIn("slow");        
							$("<?php echo $usesep.$remove_button_class; ?>").removeAttr("disabled");
					<?php endif; ?>
					} else {
					return _orig_send_attachment.apply( this, [props, attachment] );
					};
					$('.preview').removeClass('remove_box');
			    }
			    wp.media.editor.open(button);
			    return false;
	    	});
		});
	</script>
    <?php
}