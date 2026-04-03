export function registerRepeatableControl( api, $ ) {
	api.controlConstructor.repeatable = api.Control.extend( {
		ready() {
			const control = this;
			setTimeout( function () {
				control._init();
			}, 2500 );
		},

		eval( valueIs, valueShould, operator ) {
			switch ( operator ) {
				case 'not_in':
					valueShould = valueShould.split( ',' );
					if ( $.inArray( valueIs, valueShould ) < 0 ) {
						return true;
					}
					return false;

					break;
				case 'in':
					valueShould = valueShould.split( ',' );
					if ( $.inArray( valueIs, valueShould ) > -1 ) {
						return true;
					}
					return false;

					break;
				case '!=':
					return valueIs != valueShould;
				case '<=':
					return valueIs <= valueShould;
				case '<':
					return valueIs < valueShould;
				case '>=':
					return valueIs >= valueShould;
				case '>':
					return valueIs > valueShould;
				case '==':
				case '=':
					return valueIs == valueShould;
					break;
			}
		},

		compare( value1, cond, value2 ) {
			let equal = false;
			let _v;
			switch ( cond ) {
				case '===':
					equal = value1 === value2 ? true : false;
					break;
				case 'in':
					return value2.indexOf( value1 ) == -1 ? false : true;
					break;
				case '>':
					equal = value1 > value2 ? true : false;
					break;
				case '<':
					equal = value1 < value2 ? true : false;
					break;
				case '!=':
					equal = value1 != value2 ? true : false;
					break;
				case 'empty':
					_v = _.clone( value1 );
					if ( _.isObject( _v ) || _.isArray( _v ) ) {
						_.each( _v, function ( v, i ) {
							if ( _.isEmpty( v ) ) {
								delete _v[ i ];
							}
						} );

						equal = _.isEmpty( _v ) ? true : false;
					} else {
						equal = _.isNull( _v ) || _v == '' ? true : false;
					}

					break;
				case 'not_empty':
					_v = _.clone( value1 );
					if ( _.isObject( _v ) || _.isArray( _v ) ) {
						_.each( _v, function ( v, i ) {
							if ( _.isEmpty( v ) ) {
								delete _v[ i ];
							}
						} );
					}
					equal = _.isEmpty( _v ) ? false : true;
					break;
				default:
					equal = value1 == value2 ? true : false;
			}
			return equal;
		},
		multiple_compare( list, values ) {
			const control = this;
			let check = true;
			try {
				const test = list[ 0 ];
				check = true;
				if ( _.isString( test ) ) {
					check = false;
					const cond = list[ 1 ];
					const cond_val = list[ 2 ];
					let value;
					if ( ! _.isUndefined( values[ test ] ) ) {
						value = values[ test ];
						check = control.compare( value, cond, cond_val );
					}
				} else if ( _.isArray( test ) ) {
					check = true;
					_.each( list, function ( req ) {
						const cond_key = req[ 0 ];
						const cond_cond = req[ 1 ];
						const cond_val = req[ 2 ];
						let t_val = values[ cond_key ];

						if ( _.isUndefined( t_val ) ) {
							t_val = '';
						}

						if ( ! control.compare( t_val, cond_cond, cond_val ) ) {
							check = false;
						}
					} );
				}
			} catch ( e ) {
				check = false;
			}

			return check;
		},

		conditionize( $context ) {
			const control = this;

			if ( $context.hasClass( 'conditionized' ) ) {
				return;
			}
			$context.addClass( 'conditionized' );

			const $fields = $( '.field--item', $context );

			$context.on(
				'change condition_check',
				'input, select, textarea',
				function ( e ) {
					const f = $( '.form', $context );
					let data = $( 'input, textarea, select', f ).serialize();
					data = jQuery.deparam( data );
					let fieldData = {};
					if ( _.isObject( data ) ) {
						_.each( data._items, function ( value ) {
							fieldData = value;
						} );
					}

					$fields.each( function () {
						const $field = $( this );
						let check = true;
						let req = $field.attr( 'data-cond' ) || false;

						if ( ! _.isUndefined( req ) && req ) {
							req = JSON.parse( req );
							check = control.multiple_compare( req, fieldData );
							if ( ! check ) {
								$field
									.hide()
									.addClass( 'cond-hide' )
									.removeClass( 'cond-show' );
							} else {
								$field
									.slideDown()
									.removeClass( 'cond-hide' )
									.addClass( 'cond-show' );
							}
						}
					} );
				}
			);

			/**
			 * Current support one level only
			 */
			$( 'input, select, textarea', $context )
				.eq( 0 )
				.trigger( 'condition_check' );
		},

		remove_editor( $context ) {},
		editor( $textarea ) {},

		_init() {
			const control = this;

			const default_data = control.params.fields;

			let values;
			try {
				if ( typeof control.params.value === 'string' ) {
					values = JSON.parse( control.params.value );
				} else {
					values = control.params.value;
				}
			} catch ( e ) {
				values = {};
			}

			let max_item = 0; // unlimited
			const limited_mg = control.params.limited_msg || '';

			if ( ! isNaN( parseInt( control.params.max_item ) ) ) {
				max_item = parseInt( control.params.max_item );
			}

			if ( control.params.changeable === 'no' ) {
				// control.container.addClass( 'no-changeable' );
			}

			/**
			 * Toggle show/hide item
			 */
			control.container.on(
				'click',
				'.widget .widget-action, .widget .repeat-control-close, .widget-title',
				function ( e ) {
					e.preventDefault();
					const p = $( this ).closest( '.widget' );

					if ( p.hasClass( 'explained' ) ) {
						//console.log( 'has: explained' );
						$( '.widget-inside', p ).slideUp(
							200,
							'linear',
							function () {
								$( '.widget-inside', p )
									.removeClass( 'show' )
									.addClass( 'hide' );
								p.removeClass( 'explained' );
							}
						);
					} else {
						// console.log( 'No: explained' );
						$( '.widget-inside', p ).slideDown(
							200,
							'linear',
							function () {
								$( '.widget-inside', p )
									.removeClass( 'hide' )
									.addClass( 'show' );
								p.addClass( 'explained' );
							}
						);
					}
				}
			);

			/**
			 * Remove repeater item
			 */
			control.container.on(
				'click',
				'.repeat-control-remove',
				function ( e ) {
					e.preventDefault();
					const $context = $( this ).closest(
						'.repeatable-customize-control'
					);
					$( 'body' ).trigger( 'repeat-control-remove-item', [
						$context,
					] );
					control.remove_editor( $context );
					$context.remove();
					control.rename();
					control.updateValue();
					control._check_max_item();
				}
			);

			/**
			 * Get customizer control data
			 *
			 * @return {*}
			 */
			control.getData = function () {
				const f = $( '.form-data', control.container );
				const data = $( 'input, textarea, select', f ).serialize();
				return JSON.stringify( data );
			};

			/**
			 * Update repeater value
			 */
			control.updateValue = function () {
				const data = control.getData();
				//$("[data-hidden-value]", control.container).val(data);
				//$("[data-hidden-value]", control.container).trigger('change');

				control.setting.set( data );
			};

			/**
			 * Rename repeater item
			 */
			control.rename = function () {
				$( '.list-repeatable li', control.container ).each(
					function ( index ) {
						const li = $( this );
						$( 'input, textarea, select', li ).each( function () {
							const input = $( this );
							let name =
								input.attr( 'data-repeat-name' ) || undefined;
							if ( typeof name !== 'undefined' ) {
								name = name.replace( /__i__/g, index );
								input.attr( 'name', name );
							}
						} );
					}
				);
			};

			if ( ! window._upload_fame ) {
				window._upload_fame = wp.media( {
					title: wp.media.view.l10n.addMedia,
					multiple: false,
					//library: {type: 'all' },
					//button : { text : 'Insert' }
				} );
			}

			window._upload_fame.on( 'close', function () {
				// get selections and save to hidden input plus other AJAX stuff etc.
				const selection = window._upload_fame
					.state()
					.get( 'selection' );
				// console.log(selection);
			} );

			window.media_current = {};
			window.media_btn = {};

			window._upload_fame.on( 'select', function () {
				// Grab our attachment selection and construct a JSON representation of the model.
				const media_attachment = window._upload_fame
					.state()
					.get( 'selection' )
					.first()
					.toJSON();
				$( '.image_id', window.media_current ).val(
					media_attachment.id
				);
				let preview, img_url;
				img_url = media_attachment.url;
				$( '.current', window.media_current )
					.removeClass( 'hide' )
					.addClass( 'show' );
				$( '.image_url', window.media_current ).val( img_url );
				if ( media_attachment.type == 'image' ) {
					preview = '<img src="' + img_url + '" alt="">';
					$( '.thumbnail-image', window.media_current ).html(
						preview
					);
				}
				$( '.remove-button', window.media_current ).show();
				$( '.image_id', window.media_current ).trigger( 'change' );
				try {
					window.media_btn.text(
						window.media_btn.attr( 'data-change-txt' )
					);
				} catch ( e ) {}
			} );

			control.handleMedia = function ( $context ) {
				$( '.item-media', $context ).each( function () {
					const _item = $( this );
					// when remove item
					$( '.remove-button', _item ).on( 'click', function ( e ) {
						e.preventDefault();
						$( '.image_id, .image_url', _item ).val( '' );
						$( '.thumbnail-image', _item ).html( '' );
						$( '.current', _item )
							.removeClass( 'show' )
							.addClass( 'hide' );
						$( this ).hide();
						$( '.upload-button', _item ).text(
							$( '.upload-button', _item ).attr( 'data-add-txt' )
						);
						$( '.image_id', _item ).trigger( 'change' );
					} );

					// when upload item
					$( '.upload-button, .attachment-media-view', _item ).on(
						'click',
						function ( e ) {
							e.preventDefault();
							window.media_current = _item;
							window.media_btn = $( this );
							window._upload_fame.open();
						}
					);
				} );
			};

			/**
			 * Init color picker
			 *
			 * @param $context
			 */
			control.colorPicker = function ( $context ) {
				// Add Color Picker to all inputs that have 'color-field' class
				$( '.c-color', $context ).wpColorPicker( {
					change( event, ui ) {
						control.updateValue();
					},
					clear( event, ui ) {
						control.updateValue();
					},
				} );

				$( '.c-coloralpha', $context ).each( function () {
					const input = $( this );
					let c = input.val();
					c = c.replace( '#', '' );
					input.removeAttr( 'value' );
					input.prop( 'value', c );
					input.alphaColorPicker( {
						change( event, ui ) {
							control.updateValue();
						},
						clear( event, ui ) {
							control.updateValue();
						},
					} );
				} );
			};

			/**
			 * Live title events
			 *
			 * @param $context
			 */
			control.actions = function ( $context ) {
				if ( control.params.live_title_id ) {
					if ( ! $context.attr( 'data-title-format' ) ) {
						$context.attr(
							'data-title-format',
							control.params.title_format
						);
					}

					let format = $context.attr( 'data-title-format' ) || '';
					// Custom for special ID
					if ( control.id === 'onepress_section_order_styling' ) {
						if (
							$context.find( 'input.add_by' ).val() !== 'click'
						) {
							format = '[live_title]';
						}
					}

					// Live title
					if (
						control.params.live_title_id &&
						$(
							"[data-live-id='" +
								control.params.live_title_id +
								"']",
							$context
						).length > 0
					) {
						let v = '';

						if (
							$(
								"[data-live-id='" +
									control.params.live_title_id +
									"']",
								$context
							).is( '.select-one' )
						) {
							v = $(
								"[data-live-id='" +
									control.params.live_title_id +
									"']",
								$context
							)
								.find( 'option:selected' )
								.eq( 0 )
								.text();
						} else {
							v = $(
								"[data-live-id='" +
									control.params.live_title_id +
									"']",
								$context
							)
								.eq( 0 )
								.val();
						}

						if ( v == '' ) {
							v = control.params.default_empty_title;
						}

						if ( format !== '' ) {
							v = format.replace( '[live_title]', v );
						}

						$( '.widget-title .live-title', $context ).text( v );

						$context.on(
							'keyup change',
							"[data-live-id='" +
								control.params.live_title_id +
								"']",
							function () {
								let v = '';

								let format =
									$context.attr( 'data-title-format' ) || '';
								// custom for special ID
								if (
									control.id ===
									'onepress_section_order_styling'
								) {
									if (
										$context
											.find( 'input.add_by' )
											.val() !== 'click'
									) {
										format = '[live_title]';
									}
								}

								if ( $( this ).is( '.select-one' ) ) {
									v = $( this )
										.find( 'option:selected' )
										.eq( 0 )
										.text();
								} else {
									v = $( this ).val();
								}

								if ( v == '' ) {
									v = control.params.default_empty_title;
								}

								if ( format !== '' ) {
									v = format.replace( '[live_title]', v );
								}

								$( '.widget-title .live-title', $context ).text(
									v
								);
							}
						);
					} else {
					}
				} else {
					//$('.widget-title .live-title', $context).text( control.params.title_format );
				}
			};

			/**
			 * Check limit number item
			 *
			 * @private
			 */
			control._check_max_item = function () {
				const n = $(
					'.list-repeatable > li.repeatable-customize-control',
					control.container
				).length;
				//console.log( n );
				if ( n >= max_item ) {
					$( '.repeatable-actions', control.container ).hide();
					if ( $( '.limited-msg', control.container ).length <= 0 ) {
						if ( limited_mg !== '' ) {
							const msg = $( '<p class="limited-msg"/>' );
							msg.html( limited_mg );
							msg.insertAfter(
								$( '.repeatable-actions', control.container )
							);
							msg.show();
						}
					} else {
						$( '.limited-msg', control.container ).show();
					}
				} else {
					$( '.repeatable-actions', control.container ).show();
					$( '.limited-msg', control.container ).hide();
				}
			};

			/**
			 * Function that loads the Mustache template
			 */
			control.repeaterTemplate = _.memoize( function () {
				let compiled,
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
						variable: 'data',
					};

				return function ( data ) {
					if ( typeof window.repeater_item_tpl === 'undefined' ) {
						window.repeater_item_tpl = $(
							'#repeatable-js-item-tpl'
						).html();
					}
					compiled = _.template(
						window.repeater_item_tpl,
						null,
						options
					);
					return compiled( data );
				};
			} );
			control.template = control.repeaterTemplate();

			/**
			 * Init item events
			 *
			 * @param $context
			 */
			control.intItem = function ( $context ) {
				control.rename();
				control.conditionize( $context );
				control.colorPicker( $context );
				control.handleMedia( $context );
				//Special check element
				$( '[data-live-id="section_id"]', $context ).each( function () {
					$( this )
						.closest( '.repeatable-customize-control' )
						.addClass( 'section-' + $( this ).val() );
					if (
						$( this ).val() === 'map' ||
						$( this ).val() === 'slider'
					) {
						$context.addClass( 'show-display-field-only' );
					}
				} );

				// Custom for special IDs
				if ( control.id === 'onepress_section_order_styling' ) {
					if ( $context.find( 'input.add_by' ).val() !== 'click' ) {
						$context.addClass( 'no-changeable' );
						// Remove because we never use
						$( '.item-editor textarea', $context ).remove();
					} else {
						$context
							.find( '.item-title' )
							.removeClass( 'item-hidden ' );
						$context
							.find( '.item-title input[type="hidden"]' )
							.attr( 'type', 'text' );
						$context
							.find( '.item-section_id' )
							.removeClass( 'item-hidden ' );
						$context
							.find( '.item-section_id input[type="hidden"]' )
							.attr( 'type', 'text' );
					}
				}

				// Setup editor
				$( '.item-editor textarea', $context ).each( function () {
					control.editor( $( this ) );
				} );

				// Setup editor
				$( 'body' ).trigger( 'repeater-control-init-item', [
					$context,
				] );
			};

			/**
			 * Drag to sort items
			 */
			$( '.list-repeatable', control.container ).sortable( {
				handle: '.widget-title',
				//containment: ".customize-control-repeatable",
				containment: control.container,
				/// placeholder: "sortable-placeholder",
				update( event, ui ) {
					control.rename();
					control.updateValue();
				},
			} );

			/**
			 * Create existing items
			 * @changed 2.1.1
			 */

			$.each( values, function ( i, _values ) {
				const _templateData = $.extend(
					true,
					{},
					control.params.fields
				);
				_values = values[ i ];
				if ( _values ) {
					for ( const j in _values ) {
						if ( typeof _templateData[ j ] === 'undefined' ) {
							_templateData[ j ] = {};
						}

						_templateData[ j ].value = _values[ j ];
						/*
                        if (_templateData.hasOwnProperty(j) && _values.hasOwnProperty(j)) {
                            _templateData[j].value = _values[j];
                        }
                        */
					}
				}

				const $html = $( control.template( _templateData ) );
				if ( control.id === 'onepress_section_order_styling' ) {
					if ( typeof _templateData.__visibility !== 'undefined' ) {
						if ( _templateData.__visibility.value === 'hidden' ) {
							$html.addClass( 'visibility-hidden' );
						}
					}
				}

				$( '.list-repeatable', control.container ).append( $html );
				control.intItem( $html );
				control.actions( $html );
			} );

			/**
			 * Add new item
			 */
			control.container.on( 'click', '.add-new-repeat-item', function () {
				const controlbox_id = control.id;
				if ( 'onepress_map_items_address' === controlbox_id ) {
					const map_long = wp.customize( 'onepress_map_long' ).get();
					const map_lat = wp.customize( 'onepress_map_lat' ).get();
					if ( '' === map_long || '' === map_lat ) {
						$( '#customize-control-onepress_map_items_address' )
							.find( 'label' )
							.append(
								'<span class="onepress-customizer-notice">' +
									ONEPRESS_CUSTOMIZER_DATA.multiple_map_notice +
									'</span>'
							);
						return;
					}
					$( '#customize-control-onepress_map_items_address' )
						.find( '.onepress-customizer-notice' )
						.remove();
				}

				const $html = $( control.template( default_data ) );
				$( '.list-repeatable', control.container ).append( $html );

				// add unique ID for section if id_key is set
				if ( control.params.id_key !== '' ) {
					$html
						.find( '.item-' + control.params.id_key )
						.find( 'input' )
						.val( 'sid' + new Date().getTime() );
				}
				$html.find( 'input.add_by' ).val( 'click' );

				control.intItem( $html );
				control.actions( $html );
				control.updateValue();
				control._check_max_item();
			} );

			/**
			 * Update repeater data when any events fire.
			 */
			$( '.list-repeatable', control.container ).on(
				'keyup change color_change',
				'input, select, textarea',
				function ( e ) {
					control.updateValue();
				}
			);

			control._check_max_item();
		},
	} );
}
