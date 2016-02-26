

// Repeatable


var RepeatableCustomize = function (  control  ){
	var that = this;
	var $ = jQuery;
	var container =  control.container;
	var default_data =  control.params.fields;
	 //console.log( control.params.value );
	var values;
	try {
		 values = JSON.parse( control.params.value ) ;
	}catch ( e ) {
		values = {};
	}
	var max_item  = 0; // unlimited
    var limited_mg = control.params.limited_msg || '';

	if ( ! isNaN( parseInt( control.params.max_item ) ) ) {
		max_item = parseInt( control.params.max_item );
	}

	if ( control.params.changeable === 'no' ) {
		container.addClass( 'no-changeable' );
	}

	that.getData = function ( ){
		var f = $( '.form-data', container );
		var data =  $( 'input, textarea, select', f ).serialize();
		//console.log( data );
		return  JSON.stringify( data ) ;
	};

	that.rename = function(){
		$( '.list-repeatable li', container ).each( function( index ) {
			var li =  $( this );
			$( 'input, textarea, select', li ).each( function(){
				var input = $( this );
				var name = input.attr( 'data-repeat-name' ) || undefined;
				if(  typeof name !== "undefined" ) {
					name = name.replace(/__i__/g, index );
					input.attr( 'name',  name );
				}
			} );

		} );
	};

	var frame = wp.media({
		title: wp.media.view.l10n.addMedia,
		multiple: false,
		//library: {type: 'all' },
		//button : { text : 'Insert' }
	});

	frame.on('close', function () {
		// get selections and save to hidden input plus other AJAX stuff etc.
		var selection = frame.state().get('selection');
		// console.log(selection);
	});

	that.media_current = {};
	that.media_btn = {};
	frame.on( 'select', function () {
		// Grab our attachment selection and construct a JSON representation of the model.
		var media_attachment = frame.state().get('selection').first().toJSON();
		$( '.image_id', that.media_current  ).val( media_attachment.id );
		var preview, img_url;
		img_url = media_attachment.url;
		$( '.current', that.media_current  ).removeClass( 'hide').addClass( 'show' );
		$( '.image_url', that.media_current  ).val( img_url );
		if ( media_attachment.type == 'image' ) {
			preview = '<img src="' + img_url + '" alt="">';
			$('.thumbnail-image', that.media_current  ).html(preview);
		}
		$('.remove-button', that.media_current  ).show();
		$( '.image_id', that.media_current  ).trigger( 'change' );
		that.media_btn.text( that.media_btn.attr( 'data-change-txt' ) );
	});


	that.handleMedia = function( $context ) {
		$('.item-media', $context ).each( function(){
			var _item = $( this );
			// when remove item
			$( '.remove-button', _item ).on( 'click', function( e ){
				e.preventDefault();
				$( '.image_id, .image_url', _item ).val( '' );
				$( '.thumbnail-image', _item ).html( '' );
				$( '.current', _item ).removeClass( 'show' ).addClass( 'hide' );
				$( this).hide();
				$('.upload-button', _item ).text( $('.upload-button', _item ).attr( 'data-add-txt' ) );
				$( '.image_id', _item ).trigger( 'change' );
			} );

			// when upload item
			$('.upload-button, .attachment-media-view', _item ).on('click', function ( e ) {
				e.preventDefault();
				that.media_current = _item;
				that.media_btn = $( this );
				frame.open();
			});
		} );
	};

	that.colorPicker =  function( $context ){
		// Add Color Picker to all inputs that have 'color-field' class
		$('.color-field', $context).wpColorPicker( {
			change: function(event, ui){
				that.updateValue();
			},

		});
	};

	that.actions = function( $context ){

		$( '.widget .widget-action, .widget .repeat-control-close, .widget-title' , $context ).click( function( e ){
			//console.log( 'clicked' );
			var p =  $('.widget', $context );

			if ( p.hasClass( 'explained' ) ) {
				//console.log( 'has: explained' );
				$( '.widget-inside', p ).slideUp( 200, 'linear', function(){
					$( '.widget-inside', p ).removeClass( 'show').addClass('hide');
					p.removeClass( 'explained' );
				} );
			} else {
				// console.log( 'No: explained' );
				$( '.widget-inside', p ).slideDown( 200, 'linear', function(){
					$( '.widget-inside', p ).removeClass( 'hide').addClass('show');
					p.addClass( 'explained' );
				} );
			}

			return false;
		} );

		if ( control.params.live_title_id ) {

			//console.log( $( "[data-live-id='"+ control.params.live_title_id+"']").eq(0).val() );
			if ( control.params.live_title_id && $( "[data-live-id='"+ control.params.live_title_id+"']", $context ).length > 0 ) {
				var v;
				//console.log( $("[data-live-id='" + control.params.live_title_id + "']", $context).prop("tagName") );
				if (  $("[data-live-id='" + control.params.live_title_id + "']", $context).is( '.select-one' )  ){
					v = $("[data-live-id='" + control.params.live_title_id + "']", $context ).find('option:selected').eq(0).text();
				} else {
					 v = $("[data-live-id='" + control.params.live_title_id + "']", $context).eq(0).val();
				}

				if ( v == '' ) {
					v = 'Item';
				}

				if (typeof control.params.title_format !== "undefined" && control.params.title_format !== '') {
					v = control.params.title_format.replace('[live_title]', v);
				}
				$('.widget-title .live-title', $context).text( v );

				$context.on('keyup change', "[data-live-id='" + control.params.live_title_id + "']", function () {
					var v;

					if ( $(this).is( '.select-one' )  ){
						v = $(this).find('option:selected').eq( 0 ).text();
					} else {
						v = $(this).val();
					}

					if (v == '') {
						v = '[Untitled]';
					}

					if ( typeof control.params.title_format !== "undefined" && control.params.title_format !== '' ) {
						v = control.params.title_format.replace('[live_title]', v);
					}

					$('.widget-title .live-title', $context).text(v);
				});

				// console.log($("[data-live-id='" + control.params.live_title_id + "']", $context));
			} else {
				//console.log(  control.params.title_format );
				//$('.widget-title .live-title', $context).text( control.params.title_format );
			}

		} else {
			//console.log(  control.params.title_format );
			//$('.widget-title .live-title', $context).text( control.params.title_format );
		}

		// Remove item
		$context.on( 'click', '.repeat-control-remove' , function( e ){
			e.preventDefault();
			$context.remove();
			that.rename();
			that.updateValue();
			that._check_max_item();
		} );

	};

	that._check_max_item = function(){
		var n = $( '.list-repeatable > li.repeatable-customize-control', control.container).length;
		 //console.log( n );
		if ( n>= max_item ) {
			$( '.repeatable-actions', control.container ).hide();
            if ( $( '.limited-msg', control.container).length <= 0 ) {
                if ( limited_mg !== '' ) {
                    var msg = $( '<p class="limited-msg"/>' );
                    msg.html( limited_mg );
                    msg.insertAfter( $( '.repeatable-actions', control.container ) );
                    msg.show();
                }
            } else {
                $( '.limited-msg', control.container ).show();
            }

		} else {
			$( '.repeatable-actions', control.container ).show();
			$( '.limited-msg', control.container ).hide();
		}
		//console.log( max_item );
	};



	/**
	 * Function that loads the Mustache template
	 */
	that.repeaterTemplate = _.memoize(function () {
		var compiled,
		/*
		 * Underscore's default ERB-style templates are incompatible with PHP
		 * when asp_tags is enabled, so WordPress uses Mustache-inspired templating syntax.
		 *
		 * @see trac ticket #22344.
		 */
			options = {
				evaluate: /<#([\s\S]+?)#>/g,
				interpolate: /\{\{\{([\s\S]+?)\}\}\}/g,
				escape: /\{\{([^\}]+?)\}\}(?!\})/g,
				variable: 'data'
			};

		return function ( data ) {
			compiled = _.template( container.find('.repeatable-js-template').first().html(), null, options);
			return compiled( data );
		};
	});

	that.template = that.repeaterTemplate();

	that.newItem = function(){

		$( '.add-new-repeat-item', control.container ).click( function(){
			var $html = $( that.template( default_data ) );
			$( '.list-repeatable', control.container ).append( $html );
			that.int( $html );
			that.actions( $html );
			that.updateValue();
			that._check_max_item();
		} );
	};


	that.int = function( $context ){
		that.rename();
		that.colorPicker( $context );
		that.handleMedia( $context );
		//Special check element
		$( '[data-live-id="section_id"]', $context ).each( function(){
           // $context.addClass( 'section-'+$( this ).val() );
            $( this).closest( '.repeatable-customize-control').addClass( 'section-'+$( this ).val() );
			if ( $( this ).val() === 'map' ) {
				// console.log(  $( this).val() );
				$context.addClass( 'show-display-field-only' );
			}
		} );
	};

	$( '.list-repeatable li').each( function(){
		that.actions( $( this ) );
	} );

	that.updateValue = function(){
		var data = that.getData();
		//console.log( data );
		$( "[data-hidden-value]", container ).val( data );
		$( "[data-hidden-value]", container ).trigger( 'change' );
	};

	$( ".list-repeatable", container ).sortable({
		handle: ".widget-title",
		//containment: ".customize-control-repeatable",
		containment: container,
		/// placeholder: "sortable-placeholder",
		update: function( event, ui ) {
			that.rename();
			that.updateValue();
		}
	});


	if ( values.length ) {
		var _templateData, _values;


		for (var i = 0; i < values.length; i++) {

			_templateData = $.extend( true, {}, control.params.fields );

			_values = values[i];
			if ( values[i] ) {
				for ( var j in _values ) {
					if ( _templateData.hasOwnProperty( j ) && _values.hasOwnProperty( j ) ) {
						// console.log( _values[j] );
						_templateData[ j ].value = _values[j];
					}
				}
			}

			var $html = $( that.template( _templateData ) );
			$( '.list-repeatable', container ).append( $html );
			that.int( $html );
			that.actions( $html );

		}

	}

	that.newItem();
	that.int( container );

	$( '.list-repeatable', container ).on( 'keyup change', 'input, select, textarea', function( e ) {
		that.updateValue();
	});

	that._check_max_item();


};


( function( api ) {
	//console.log( api.controlConstructor );

	api.controlConstructor['repeatable'] = api.Control.extend( {
		ready: function() {
			var control = this;
			//console.log( settingValue );
			new RepeatableCustomize( control, jQuery );

		}
	} );

} )( wp.customize );


jQuery( window ).ready( function( $ ){
    if ( typeof onepress_customizer_settings !== "undefined" ) {
        if (onepress_customizer_settings.number_action > 0) {
            $('.control-section-themes h3.accordion-section-title').append('<a class="theme-action-count" href="' + onepress_customizer_settings.action_url + '">' + onepress_customizer_settings.number_action + '</a>');
        }
        if ( onepress_customizer_settings.is_plus_activated !== 'y' ) {
            $('#customize-info .accordion-section-title').append('<a target="_blank" style="text-transform: uppercase; background: #D54E21; color: #fff; font-size: 10px; line-height: 14px; padding: 2px 5px; display: inline-block;" href="https://www.famethemes.com/themes/onepress/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">Upgrade to OnePress plus</a>');
            $( '#accordion-section-onepress_order_styling > .accordion-section-title').append( '<span class="onepress-notice">Plus</span>' );
        }
    }

} );