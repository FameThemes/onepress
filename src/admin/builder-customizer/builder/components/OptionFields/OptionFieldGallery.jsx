import { BaseControl, Button, Icon } from '@wordpress/components';
// eslint-disable-next-line import/no-extraneous-dependencies -- @wordpress/icons is a WP peer dependency
import { closeSmall, dragHandle } from '@wordpress/icons';
import { useCallback, useEffect, useMemo, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { OPTION_FIELD_CLASS } from './utils.js';

/**
 * @param {unknown} raw Prop value from the tree.
 * @return {number[]} Sanitized positive attachment IDs.
 */
function normalizeGalleryIds( raw ) {
	if ( Array.isArray( raw ) ) {
		const out = [];
		for ( const x of raw ) {
			const n = Math.floor( Number( x ) || 0 );
			if ( n > 0 ) {
				out.push( n );
			}
		}
		return out;
	}
	if ( typeof raw === 'string' && raw.trim() !== '' ) {
		try {
			const parsed = JSON.parse( raw );
			return normalizeGalleryIds( parsed );
		} catch {
			return [];
		}
	}
	return [];
}

/**
 * @param {number[]} list      Current ID order.
 * @param {number}   fromIndex Drag source index.
 * @param {number}   toIndex   Drop target index.
 * @return {number[]} New order.
 */
function reorderIds( list, fromIndex, toIndex ) {
	if (
		fromIndex === toIndex ||
		fromIndex < 0 ||
		toIndex < 0 ||
		fromIndex >= list.length ||
		toIndex >= list.length
	) {
		return list;
	}
	const next = [ ...list ];
	const [ moved ] = next.splice( fromIndex, 1 );
	next.splice( toIndex, 0, moved );
	return next;
}

/**
 * @param {Object} props
 * @param {number} props.id Attachment ID.
 */
function GalleryThumb( { id } ) {
	const [ url, setUrl ] = useState( '' );

	useEffect( () => {
		if ( id < 1 || typeof window === 'undefined' ) {
			setUrl( '' );
			return;
		}
		const wp = window.wp;
		if ( ! wp?.media?.attachment ) {
			setUrl( '' );
			return;
		}
		const attachment = wp.media.attachment( id );
		const apply = () => {
			const sizes = attachment.get( 'sizes' );
			const thumb =
				sizes?.thumbnail?.url ||
				sizes?.medium?.url ||
				attachment.get( 'url' );
			setUrl( typeof thumb === 'string' ? thumb : '' );
		};
		if ( attachment.get( 'url' ) ) {
			apply();
			return;
		}
		attachment
			.fetch()
			.then( apply )
			.catch( () => setUrl( '' ) );
	}, [ id ] );

	if ( url ) {
		return (
			<img
				className="opb-field-gallery__thumb-img"
				src={ url }
				alt=""
				decoding="async"
				draggable={ false }
			/>
		);
	}

	return (
		<div className="opb-field-gallery__thumb-placeholder" aria-hidden>
			…
		</div>
	);
}

/**
 * Gallery: wp.media multi-select + drag-to-reorder attachment IDs.
 *
 * @param {Object}                  props
 * @param {Record<string, unknown>} props.field
 * @param {Record<string, unknown>} props.propsBag
 * @param {Function}                props.onChangeProps
 */
export default function OptionFieldGallery( {
	field,
	propsBag,
	onChangeProps,
} ) {
	const name = typeof field.name === 'string' ? field.name : '';
	const label = typeof field.label === 'string' ? field.label : '';
	const help = typeof field.help === 'string' ? field.help : undefined;
	const controlId = name
		? `opb-field-gallery-${ name }`
		: 'opb-field-gallery';

	const ids = useMemo(
		() => ( name ? normalizeGalleryIds( propsBag[ name ] ) : [] ),
		[ propsBag, name ]
	);

	const [ dragIndex, setDragIndex ] = useState( null );
	const [ dropIndex, setDropIndex ] = useState( null );

	const setIds = useCallback(
		( next ) => {
			if ( ! name ) {
				return;
			}
			onChangeProps( { [ name ]: next } );
		},
		[ name, onChangeProps ]
	);

	const openFrame = useCallback( () => {
		const wp = window.wp;
		if ( ! name || ! wp?.media ) {
			return;
		}
		const frame = wp.media( {
			title: label || __( 'Gallery images', 'onepress' ),
			button: {
				text: __( 'Use images', 'onepress' ),
			},
			library: { type: 'image' },
			multiple: true,
		} );

		frame.on( 'open', () => {
			const selection = frame.state().get( 'selection' );
			selection.reset( [] );
			if ( ids.length === 0 ) {
				return;
			}
			const fetches = ids.map( ( attachmentId ) =>
				wp.media.attachment( attachmentId ).fetch()
			);
			Promise.all( fetches ).then( () => {
				ids.forEach( ( attachmentId ) => {
					selection.add( wp.media.attachment( attachmentId ) );
				} );
			} );
		} );

		frame.on( 'select', () => {
			const selected = frame.state().get( 'selection' ).toJSON();
			const next = [];
			for ( const item of selected ) {
				const rawId = item?.id;
				const n =
					typeof rawId === 'number'
						? rawId
						: parseInt( String( rawId ), 10 );
				if ( Number.isFinite( n ) && n > 0 ) {
					next.push( n );
				}
			}
			setIds( next );
		} );

		frame.open();
	}, [ ids, label, name, setIds ] );

	const removeAt = useCallback(
		( index ) => {
			setIds( ids.filter( ( _, i ) => i !== index ) );
		},
		[ ids, setIds ]
	);

	const onDragStart = useCallback( ( e, index ) => {
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData( 'text/plain', String( index ) );
		setDragIndex( index );
		setDropIndex( null );
	}, [] );

	const onDragEnd = useCallback( () => {
		setDragIndex( null );
		setDropIndex( null );
	}, [] );

	const onDragOver = useCallback( ( e, index ) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
		setDropIndex( index );
	}, [] );

	const onDragLeave = useCallback( ( e ) => {
		const rel = e.relatedTarget;
		if ( rel && e.currentTarget.contains( rel ) ) {
			return;
		}
		setDropIndex( null );
	}, [] );

	const onDrop = useCallback(
		( e, index ) => {
			e.preventDefault();
			const from = parseInt( e.dataTransfer.getData( 'text/plain' ), 10 );
			if ( ! Number.isFinite( from ) ) {
				onDragEnd();
				return;
			}
			setIds( reorderIds( ids, from, index ) );
			onDragEnd();
		},
		[ ids, onDragEnd, setIds ]
	);

	const mediaReady =
		typeof window !== 'undefined' && Boolean( window.wp?.media );

	if ( ! name ) {
		return null;
	}

	return (
		<BaseControl
			id={ controlId }
			className={
				OPTION_FIELD_CLASS + ' opb-mini-builder-field--gallery'
			}
			label={ label }
			help={ help }
			__nextHasNoMarginBottom
		>
			<div className="opb-field-gallery">
				<div className="opb-field-gallery__actions">
					<Button
						variant="secondary"
						onClick={ openFrame }
						disabled={ ! mediaReady }
					>
						{ ids.length
							? __( 'Edit gallery', 'onepress' )
							: __( 'Select images', 'onepress' ) }
					</Button>
					{ ids.length ? (
						<Button
							variant="tertiary"
							onClick={ () => setIds( [] ) }
						>
							{ __( 'Clear all', 'onepress' ) }
						</Button>
					) : null }
				</div>

				{ ids.length ? (
					<ul className="opb-field-gallery__list">
						{ ids.map( ( attachmentId, index ) => (
							<li
								key={ `g-${ index }-${ attachmentId }` }
								className={
									'opb-field-gallery__item' +
									( dragIndex === index
										? ' is-dragging'
										: '' ) +
									( dropIndex === index &&
									dragIndex !== null &&
									dragIndex !== index
										? ' is-drop-target'
										: '' )
								}
								onDragOver={ ( e ) => onDragOver( e, index ) }
								onDragLeave={ onDragLeave }
								onDrop={ ( e ) => onDrop( e, index ) }
							>
								<span
									className="opb-field-gallery__grip"
									draggable
									aria-label={ __(
										'Drag to reorder',
										'onepress'
									) }
									title={ __(
										'Drag to reorder',
										'onepress'
									) }
									onDragStart={ ( e ) =>
										onDragStart( e, index )
									}
									onDragEnd={ onDragEnd }
								>
									<Icon icon={ dragHandle } size={ 18 } />
								</span>
								<div className="opb-field-gallery__thumb">
									<GalleryThumb id={ attachmentId } />
								</div>
								<Button
									className="opb-field-gallery__remove"
									icon={ closeSmall }
									size="small"
									variant="tertiary"
									label={ __( 'Remove image', 'onepress' ) }
									showTooltip
									onClick={ ( ev ) => {
										ev.stopPropagation();
										removeAt( index );
									} }
								/>
							</li>
						) ) }
					</ul>
				) : null }

				{ ! mediaReady ? (
					<p className="opb-field-gallery__warn" role="note">
						{ __(
							'Media library is not available in this context.',
							'onepress'
						) }
					</p>
				) : null }
			</div>
		</BaseControl>
	);
}
