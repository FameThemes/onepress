<?php
/**
 * Custom template tags for this theme.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package OnePress
 */

if ( ! function_exists( 'onepress_posted_on' ) ) :
/**
 * Prints HTML with meta information for the current post-date/time and author.
 */
function onepress_posted_on() {
	$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
	if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
		$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated hide" datetime="%3$s">%4$s</time>';
	}

	$time_string = sprintf( $time_string,
		esc_attr( get_the_date( 'c' ) ),
		esc_html( get_the_date() ),
		esc_attr( get_the_modified_date( 'c' ) ),
		esc_html( get_the_modified_date() )
	);

	$posted_on = sprintf(
		esc_html_x( 'Posted on %s', 'post date', 'onepress' ),
		'<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $time_string . '</a>'
	);

	$byline = sprintf(
		esc_html_x( 'by %s', 'post author', 'onepress' ),
		'<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'
	);

	echo '<span class="posted-on">' . $posted_on . '</span><span class="byline"> ' . $byline . '</span>'; // WPCS: XSS OK.

}
endif;

if ( ! function_exists( 'onepress_entry_footer' ) ) :
/**
 * Prints HTML with meta information for the categories, tags and comments.
 */
function onepress_entry_footer() {
	// Hide category and tag text for pages.
	if ( 'post' === get_post_type() ) {
		/* translators: used between list items, there is a space after the comma */
		$categories_list = get_the_category_list( esc_html__( ', ', 'onepress' ) );
		if ( $categories_list && onepress_categorized_blog() ) {
			printf( '<span class="cat-links">' . esc_html__( 'Posted in %1$s', 'onepress' ) . '</span>', $categories_list ); // WPCS: XSS OK.
		}

		/* translators: used between list items, there is a space after the comma */
		$tags_list = get_the_tag_list( '', esc_html__( ', ', 'onepress' ) );
		if ( $tags_list ) {
			printf( '<span class="tags-links">' . esc_html__( 'Tagged %1$s', 'onepress' ) . '</span>', $tags_list ); // WPCS: XSS OK.
		}
	}

	if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
		echo '<span class="comments-link">';
		comments_popup_link( esc_html__( 'Leave a comment', 'onepress' ), esc_html__( '1 Comment', 'onepress' ), esc_html__( '% Comments', 'onepress' ) );
		echo '</span>';
	}

}
endif;

/**
 * Returns true if a blog has more than 1 category.
 *
 * @return bool
 */
function onepress_categorized_blog() {
	if ( false === ( $all_the_cool_cats = get_transient( 'onepress_categories' ) ) ) {
		// Create an array of all the categories that are attached to posts.
		$all_the_cool_cats = get_categories( array(
			'fields'     => 'ids',
			'hide_empty' => 1,

			// We only need to know if there is more than one category.
			'number'     => 2,
		) );

		// Count the number of categories that are attached to the posts.
		$all_the_cool_cats = count( $all_the_cool_cats );

		set_transient( 'onepress_categories', $all_the_cool_cats );
	}

	if ( $all_the_cool_cats > 1 ) {
		// This blog has more than 1 category so onepress_categorized_blog should return true.
		return true;
	} else {
		// This blog has only 1 category so onepress_categorized_blog should return false.
		return false;
	}
}

/**
 * Flush out the transients used in onepress_categorized_blog.
 */
function onepress_category_transient_flusher() {
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	// Like, beat it. Dig?
	delete_transient( 'onepress_categories' );
}
add_action( 'edit_category', 'onepress_category_transient_flusher' );
add_action( 'save_post',     'onepress_category_transient_flusher' );


if ( ! function_exists( 'onepress_comment' ) ) :
/**
 * Template for comments and pingbacks.
 *
 * To override this walker in a child theme without modifying the comments template
 * simply create your own onepress_comment(), and that function will be used instead.
 *
 * Used as a callback by wp_list_comments() for displaying the comments.
 *
 * @return void
 */
function onepress_comment( $comment, $args, $depth ) {
    $GLOBALS['comment'] = $comment;
    switch ( $comment->comment_type ) :
        case 'pingback' :
        case 'trackback' :
        // Display trackbacks differently than normal comments.
    ?>
    <li <?php comment_class(); ?> id="comment-<?php comment_ID(); ?>">
        <p><?php _e( 'Pingback:', 'onepress' ); ?> <?php comment_author_link(); ?> <?php edit_comment_link( __( '(Edit)', 'onepress' ), '<span class="edit-link">', '</span>' ); ?></p>
    <?php
            break;
        default :
        // Proceed with normal comments.
        global $post;
    ?>
    <li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>">
        <article id="comment-<?php comment_ID(); ?>" class="comment clearfix">

            <?php echo get_avatar( $comment, 60 ); ?>

            <div class="comment-wrapper">

                <header class="comment-meta comment-author vcard">
                    <?php
                        printf( '<cite><b class="fn">%1$s</b> %2$s</cite>',
                            get_comment_author_link(),
                            // If current post author is also comment author, make it known visually.
                            ( $comment->user_id === $post->post_author ) ? '<span>' . __( 'Post author', 'onepress' ) . '</span>' : ''
                        );
                        printf( '<a class="comment-time" href="%1$s"><time datetime="%2$s">%3$s</time></a>',
                            esc_url( get_comment_link( $comment->comment_ID ) ),
                            get_comment_time( 'c' ),
                            /* translators: 1: date, 2: time */
                            sprintf( __( '%1$s', 'onepress' ), get_comment_date() )
                        );
                        comment_reply_link( array_merge( $args, array( 'reply_text' => __( 'Reply', 'onepress' ), 'after' => '', 'depth' => $depth, 'max_depth' => $args['max_depth'] ) ) );
                        edit_comment_link( __( 'Edit', 'onepress' ), '<span class="edit-link">', '</span>' );
                    ?>
                </header><!-- .comment-meta -->

                <?php if ( '0' == $comment->comment_approved ) : ?>
                    <p class="comment-awaiting-moderation"><?php _e( 'Your comment is awaiting moderation.', 'onepress' ); ?></p>
                <?php endif; ?>

                <div class="comment-content entry-content">
                    <?php comment_text(); ?>
                    <?php  ?>
                </div><!-- .comment-content -->

            </div><!--/comment-wrapper-->

        </article><!-- #comment-## -->
    <?php
        break;
    endswitch; // end comment_type check
}
endif;

if ( ! function_exists( 'onepress_hero_overlay_css' ) ) {

	add_action( 'wp_head', 'onepress_hero_overlay_css' );
	function onepress_hero_overlay_css( ) {

		if ( get_theme_mod( 'onepress_hero_overlay_color', '#000000' ) ) {
			$o = get_theme_mod( 'onepress_hero_overlay_opacity' , .3 );
			?>
			<style type="text/css">
				#main .video-section section.hero-slideshow-wrapper {
					background: transparent;
				}

				.hero-slideshow-wrapper:after {
					position: absolute;
					top: 0px;
					left: 0px;
					width: 100%;
					height: 100%;
					opacity: <?php echo floatval( $o); ?>;
					background-color: <?php echo get_theme_mod( 'onepress_hero_overlay_color' ); ?>;
					display: block;
					content: "";
				}
				.parallax-hero .hero-slideshow-wrapper:after {
					display: none !important;
				}
				.parallax-hero .parallax-mirror:after {
					position: absolute;
					top: 0px;
					left: 0px;
					width: 100%;
					height: 100%;
					opacity: <?php echo floatval( $o); ?>;
					background-color: <?php echo get_theme_mod( 'onepress_hero_overlay_color' ); ?>;
					display: block;
					content: "";
				}
			</style>
		<?php
		}
	}

}


/**
 * Get About data
 *
 * @return array
 */
function onepress_get_section_about_data(){
    $boxes = get_theme_mod( 'onepress_about_boxes' );
    if ( is_string( $boxes ) ) {
        $boxes = json_decode( $boxes , true );
    }
    $page_ids = array();
    if ( ! empty( $boxes ) && is_array( $boxes ) ) {
        foreach ( $boxes as $k => $v ) {
            if ( isset ( $v['content_page'] ) ) {
                $v['content_page'] = absint( $v['content_page'] );
                if ( $v['content_page'] > 0 )  {
                    $page_ids[ ] =  wp_parse_args( $v, array( 'enable_link'=> 0, 'hide_title' => 0 ) );
                }
            }
        }
    }

    if ( empty( $page_ids ) ) {
        $current_pos_id = get_the_ID();
        $args = array(
            'posts_per_page'   => 3,
            'orderby'          => 'date',
            'order'            => 'DESC',
            'exclude'          => $current_pos_id,
            'post_type'        => 'page',
        );
        $posts_array = get_posts( $args );
        foreach ( $posts_array as $p ) {
            $page_ids[] =  array( 'content_page' => $p->ID , 'enable_link'=> 0, 'hide_title' => 0 );
        }
    }
    return $page_ids;
}

/**
 * Get counter data
 *
 * @return array
 */
function onepress_get_section_counter_data(){
    $boxes = get_theme_mod( 'onepress_counter_boxes' );
    if ( is_string( $boxes ) ) {
        $boxes = json_decode( $boxes , true );
    }
    if ( empty( $boxes ) || ! is_array( $boxes ) ) {
        $boxes = array();
    }
    return $boxes;
}

/**
 * Get services data
 * @return array
 */
function onepress_get_section_services_data(){
    $services = get_theme_mod( 'onepress_services' );
    if ( is_string( $services ) ) {
        $services = json_decode( $services, true );
    }
    $page_ids = array();
    if ( ! empty( $services ) && is_array( $services ) ) {
        foreach ( $services as $k => $v ) {
            if ( isset ( $v['content_page'] ) ) {
                $v['content_page'] = absint( $v['content_page'] );
                if ( $v['content_page'] > 0 )  {
                    $page_ids[ ] =  wp_parse_args( $v, array(  'icon' => 'gg', 'enable_link' => 0 ) );
                }
            }
        }
    }
    // if still empty data then get some page for demo
    if ( empty( $page_ids ) ) {
        $current_pos_id = get_the_ID();
        $args = array(
            'posts_per_page'   => 4,
            'orderby'          => 'date',
            'order'            => 'DESC',
            'exclude'          => $current_pos_id,
            'post_type'        => 'page',
        );
        $posts_array = get_posts( $args );
        foreach ( $posts_array as $p ) {
            $page_ids[] =  array( 'content_page' => $p->ID , 'icon'=> 'gg', 'enable_link' => 0 );
        }
    }
    return $page_ids;
}

/**
 * Get team members
 *
 * @return array
 */
function onepress_get_section_team_data(){
    $members = get_theme_mod( 'onepress_team_members' );
    if ( is_string( $members ) ) {
        $members = json_decode( $members, true );
    }
    if ( ! is_array( $members ) ) {
        $members = array();
    }
    return $members;
}