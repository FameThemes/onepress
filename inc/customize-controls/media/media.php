<?php
/**
 * Customizer control: Media Library (image / video) with storage mode: url, id, or mixed (JSON id + url).
 */

/**
 * Guess image vs video from file URL path (fallback when MIME is unknown).
 *
 * @param string $url Media URL.
 * @return string 'image'|'video'|'none'
 */
function onepress_media_control_guess_kind_from_url( $url ) {
	$url = (string) $url;
	if ( $url === '' ) {
		return 'none';
	}
	$path = wp_parse_url( $url, PHP_URL_PATH );
	$ext  = strtolower( pathinfo( (string) $path, PATHINFO_EXTENSION ) );
	$video_exts = array( 'mp4', 'webm', 'ogv', 'ogg', 'mov', 'm4v', 'avi', 'mkv' );
	if ( in_array( $ext, $video_exts, true ) ) {
		return 'video';
	}
	$image_exts = array( 'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico' );
	if ( in_array( $ext, $image_exts, true ) ) {
		return 'image';
	}

	return 'image';
}

/**
 * Resolve preview URL and kind for the current setting value.
 *
 * @param mixed  $value   Raw setting value.
 * @param string $storage url|id|mixed.
 * @return array{ url: string, kind: string }
 */
function onepress_media_control_get_preview_data( $value, $storage ) {
	$url  = '';
	$mime = '';

	switch ( $storage ) {
		case 'url':
			$url = is_string( $value ) ? $value : '';
			break;
		case 'id':
			$id = absint( $value );
			if ( $id ) {
				$url  = (string) wp_get_attachment_url( $id );
				$mime = (string) get_post_mime_type( $id );
			}
			break;
		case 'mixed':
			$p = onepress_parse_media_control_value( $value );
			if ( $p['id'] ) {
				$mime = (string) get_post_mime_type( $p['id'] );
			}
			$url = $p['url'];
			if ( $url === '' && $p['id'] ) {
				$url = (string) wp_get_attachment_url( $p['id'] );
			}
			break;
	}

	$kind = 'none';
	if ( $url !== '' ) {
		if ( $mime !== '' && strpos( $mime, 'video/' ) === 0 ) {
			$kind = 'video';
		} elseif ( $mime !== '' && strpos( $mime, 'image/' ) === 0 ) {
			$kind = 'image';
		} else {
			$kind = onepress_media_control_guess_kind_from_url( $url );
			if ( 'none' === $kind && $url !== '' ) {
				$kind = 'image';
			}
		}
	}

	return array(
		'url'  => $url,
		'kind' => $kind,
	);
}

class OnePress_Media_Control extends WP_Customize_Control {

	/**
	 * @var bool
	 */
	protected static $inline_css_added = false;

	/**
	 * @var string Control type.
	 */
	public $type = 'onepress_media';

	/**
	 * How the setting is stored: 'url', 'id', or 'mixed' (JSON object).
	 *
	 * @var string
	 */
	public $storage = 'url';

	/**
	 * @inheritdoc
	 */
	public function to_json() {
		parent::to_json();
		$this->json['storage'] = $this->storage;
	}

	/**
	 * Enqueue control scripts.
	 */
	public function enqueue() {
		wp_enqueue_media();
		$css = '
			.onepress-media-wrap { margin-top: 6px; }
			.onepress-media-preview {
				margin-bottom: 10px;
				border: 1px solid #c3c4c7;
				border-radius: 2px;
				background: #f6f7f7;
				min-height: 120px;
				display: flex;
				align-items: center;
				justify-content: center;
				overflow: hidden;
			}
			.onepress-media-preview-empty {
				color: #646970;
				font-size: 13px;
				padding: 16px;
				text-align: center;
			}
			.onepress-media-preview.is-empty .onepress-media-preview-empty { display: block; }
			.onepress-media-preview:not(.is-empty) .onepress-media-preview-empty { display: none !important; }
			.onepress-media-preview-img,
			.onepress-media-preview-video {
				display: block;
				max-width: 100%;
				height: auto;
				max-height: 220px;
				margin: 0 auto;
				vertical-align: middle;
			}
			.onepress-media-preview-video { width: 100%; background: #000; }
			.onepress-media-preview.is-image .onepress-media-preview-img { display: block; }
			.onepress-media-preview.is-image .onepress-media-preview-video { display: none !important; }
			.onepress-media-preview.is-video .onepress-media-preview-video { display: block; }
			.onepress-media-preview.is-video .onepress-media-preview-img { display: none !important; }
			.onepress-media-preview.is-empty .onepress-media-preview-img,
			.onepress-media-preview.is-empty .onepress-media-preview-video { display: none !important; }
		';
		if ( ! self::$inline_css_added ) {
			self::$inline_css_added = true;
			wp_add_inline_style( 'customize-controls', $css );
		}
		parent::enqueue();
	}

	/**
	 * Serialized value kept for Customizer transport (hidden, not shown).
	 *
	 * @param mixed $value Setting value.
	 * @return string
	 */
	protected function format_hidden_value( $value ) {
		switch ( $this->storage ) {
			case 'id':
				return ( $value !== '' && $value !== null ) ? (string) absint( $value ) : '';
			case 'mixed':
				if ( $value === '' || $value === null ) {
					return '';
				}
				if ( is_string( $value ) ) {
					$decoded = json_decode( $value, true );
					if ( is_array( $decoded ) ) {
						return wp_json_encode(
							array(
								'id'  => isset( $decoded['id'] ) ? absint( $decoded['id'] ) : 0,
								'url' => isset( $decoded['url'] ) ? (string) $decoded['url'] : '',
							)
						);
					}
				}

				return '';
			case 'url':
			default:
				return is_string( $value ) ? $value : '';
		}
	}

	/**
	 * Render control markup.
	 */
	public function render_content() {
		$setting_id = $this->setting->id;
		$storage    = in_array( $this->storage, array( 'url', 'id', 'mixed' ), true ) ? $this->storage : 'url';
		$hidden_val = $this->format_hidden_value( $this->value() );
		$preview    = onepress_media_control_get_preview_data( $this->value(), $storage );
		$kind       = $preview['kind'];
		$purl       = $preview['url'];
		$wrap_class = 'onepress-media-preview is-empty';
		if ( 'image' === $kind ) {
			$wrap_class = 'onepress-media-preview is-image';
		} elseif ( 'video' === $kind ) {
			$wrap_class = 'onepress-media-preview is-video';
		}
		?>
		<?php if ( ! empty( $this->label ) ) : ?>
			<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
		<?php endif; ?>
		<?php if ( ! empty( $this->description ) ) : ?>
			<span class="description customize-control-description"><?php echo wp_kses_post( $this->description ); ?></span>
		<?php endif; ?>
		<div
			class="onepress-media-wrap"
			data-setting-id="<?php echo esc_attr( $setting_id ); ?>"
			data-storage="<?php echo esc_attr( $storage ); ?>"
		>
			<div class="<?php echo esc_attr( $wrap_class ); ?>" aria-live="polite">
				<span class="onepress-media-preview-empty"><?php esc_html_e( 'No file selected', 'onepress' ); ?></span>
				<img class="onepress-media-preview-img" src="<?php echo esc_url( 'image' === $kind ? $purl : '' ); ?>" alt="" />
				<video class="onepress-media-preview-video" controls preload="metadata" src="<?php echo esc_url( 'video' === $kind ? $purl : '' ); ?>"></video>
			</div>
			<input type="hidden" class="onepress-media-value-display" value="<?php echo esc_attr( $hidden_val ); ?>" />
			<p>
				<button type="button" class="button onepress-media-select"><?php esc_html_e( 'Select from Media Library', 'onepress' ); ?></button>
				<button type="button" class="button onepress-media-clear"><?php esc_html_e( 'Clear', 'onepress' ); ?></button>
			</p>
		</div>
		<?php
	}
}

/**
 * Footer script: wp.media + wp.customize for OnePress_Media_Control.
 */
function onepress_media_control_footer_scripts() {
	static $printed = false;
	if ( $printed ) {
		return;
	}
	$printed = true;

	$title  = esc_js( __( 'Choose image or video', 'onepress' ) );
	$button = esc_js( __( 'Use this file', 'onepress' ) );
	?>
	<script>
	(function ( $, api ) {
		function guessKind( url, mime ) {
			if ( mime && mime.indexOf( 'video/' ) === 0 ) {
				return 'video';
			}
			if ( mime && mime.indexOf( 'image/' ) === 0 ) {
				return 'image';
			}
			if ( ! url ) {
				return 'none';
			}
			var path = String( url ).split( '?' )[0];
			var m = path.match( /\.([a-z0-9]+)$/i );
			var ext = m ? m[1].toLowerCase() : '';
			var vid = [ 'mp4', 'webm', 'ogv', 'ogg', 'mov', 'm4v', 'avi', 'mkv' ];
			if ( vid.indexOf( ext ) !== -1 ) {
				return 'video';
			}
			return 'image';
		}

		function applyPreview( $box, kind, url ) {
			var $img = $box.find( '.onepress-media-preview-img' );
			var $vid = $box.find( '.onepress-media-preview-video' );
			$box.removeClass( 'is-empty is-image is-video' );
			$img.attr( 'src', '' );
			$vid.removeAttr( 'src' );
			if ( $vid[0] ) {
				try {
					$vid[0].pause();
					$vid[0].load();
				} catch ( e ) {}
			}
			if ( ! url || kind === 'none' ) {
				$box.addClass( 'is-empty' );
				return;
			}
			if ( kind === 'video' ) {
				$box.addClass( 'is-video' );
				$vid.attr( 'src', url );
				if ( $vid[0] ) {
					try {
						$vid[0].load();
					} catch ( e2 ) {}
				}
			} else {
				$box.addClass( 'is-image' );
				$img.attr( 'src', url );
			}
		}

		function updatePreview( $wrap, storage, v ) {
			var $box = $wrap.find( '.onepress-media-preview' );
			var url = '';
			var mime = '';

			function finish() {
				var k = ( ! url ) ? 'none' : guessKind( url, mime );
				applyPreview( $box, k, url );
			}

			if ( storage === 'url' ) {
				url = v ? String( v ) : '';
				finish();
				return;
			}

			if ( storage === 'id' ) {
				var aid = parseInt( v, 10 ) || 0;
				if ( ! aid ) {
					applyPreview( $box, 'none', '' );
					return;
				}
				if ( wp.media && wp.media.attachment ) {
					wp.media.attachment( aid ).fetch().done( function () {
						var att = this.attributes;
						url = att.url || '';
						mime = att.mime || '';
						finish();
					} );
				} else {
					applyPreview( $box, 'none', '' );
				}
				return;
			}

			var mid = 0;
			if ( v && typeof v === 'object' ) {
				mid = parseInt( v.id, 10 ) || 0;
				url = v.url || '';
				mime = v.mime || '';
			} else if ( typeof v === 'string' && v !== '' ) {
				try {
					var o = JSON.parse( v );
					mid = parseInt( o.id, 10 ) || 0;
					url = o.url || '';
				} catch ( err ) {}
			}

			if ( url ) {
				finish();
				return;
			}
			if ( mid && wp.media && wp.media.attachment ) {
				wp.media.attachment( mid ).fetch().done( function () {
					var att = this.attributes;
					url = att.url || '';
					mime = att.mime || '';
					finish();
				} );
				return;
			}
			applyPreview( $box, 'none', '' );
		}

		function bindWrap( $wrap ) {
			var id = $wrap.data( 'setting-id' );
			if ( ! id || ! api( id ) ) {
				return;
			}
			var storage = $wrap.data( 'storage' ) || 'url';
			var s = api( id );
			var $input = $wrap.find( '.onepress-media-value-display' );
			s.bind( function ( v ) {
				var show = '';
				if ( storage === 'id' ) {
					show = v === 0 || v === '0' || v === '' || v === null ? '' : String( v );
				} else if ( storage === 'mixed' ) {
					if ( v && typeof v === 'object' ) {
						show = JSON.stringify( { id: v.id || 0, url: v.url || '' } );
					} else if ( typeof v === 'string' && v !== '' ) {
						show = v;
					}
				} else {
					show = v ? String( v ) : '';
				}
				$input.val( show );
				updatePreview( $wrap, storage, v );
			} );
			updatePreview( $wrap, storage, s.get() );
		}

		function pushValue( settingId, storage, att ) {
			var url = att.url || '';
			var attId = parseInt( att.id, 10 ) || 0;
			if ( storage === 'url' ) {
				if ( url ) {
					api( settingId ).set( url );
				}
				return;
			}
			if ( storage === 'id' ) {
				if ( attId ) {
					api( settingId ).set( attId );
				}
				return;
			}
			if ( storage === 'mixed' ) {
				api( settingId ).set(
					JSON.stringify( { id: attId, url: url } )
				);
			}
		}

		function openFrame( $wrap ) {
			var id = $wrap.data( 'setting-id' );
			if ( ! id || ! api( id ) ) {
				return;
			}
			var storage = $wrap.data( 'storage' ) || 'url';
			var frame = wp.media( {
				title: '<?php echo $title; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>',
				button: { text: '<?php echo $button; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>' },
				library: { type: [ 'image', 'video' ] },
				multiple: false
			} );
			frame.on( 'select', function () {
				var att = frame.state().get( 'selection' ).first().toJSON();
				pushValue( id, storage, att );
			} );
			frame.open();
		}

		function clearValue( settingId, storage ) {
			if ( storage === 'id' ) {
				api( settingId ).set( 0 );
			} else {
				api( settingId ).set( '' );
			}
		}

		api.bind( 'ready', function () {
			$( '.onepress-media-wrap' ).each( function () {
				bindWrap( $( this ) );
			} );
		} );

		$( document ).on( 'click', '.onepress-media-select', function ( e ) {
			e.preventDefault();
			openFrame( $( this ).closest( '.onepress-media-wrap' ) );
		} );

		$( document ).on( 'click', '.onepress-media-clear', function ( e ) {
			e.preventDefault();
			var $wrap = $( this ).closest( '.onepress-media-wrap' );
			var sid = $wrap.data( 'setting-id' );
			var storage = $wrap.data( 'storage' ) || 'url';
			if ( sid && api( sid ) ) {
				clearValue( sid, storage );
			}
		} );
	})( jQuery, wp.customize );
	</script>
	<?php
}
add_action( 'customize_controls_print_footer_scripts', 'onepress_media_control_footer_scripts', 55 );

/** @deprecated 2.3.18 Use OnePress_Media_Control with storage "url". */
class OnePress_Media_Url_Control extends OnePress_Media_Control {
	public $storage = 'url';
}
