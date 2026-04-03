import { BaseControl, Button } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { OPTION_FIELD_CLASS } from './utils.js';

/**
 * Single attachment ID with wp.media frame (Customizer: wp_enqueue_media).
 *
 * @param {Object} props
 * @param {Record<string, unknown>} props.field
 * @param {Record<string, unknown>} props.propsBag
 * @param {Function} props.onChangeProps
 */
export default function OptionFieldImage( {
	field,
	propsBag,
	onChangeProps,
} ) {
	const name =
		typeof field.name === 'string' ? field.name : '';
	if ( ! name ) {
		return null;
	}
	const label =
		typeof field.label === 'string' ? field.label : '';
	const help =
		typeof field.help === 'string' ? field.help : undefined;

	const raw = propsBag[ name ];
	const id = Math.max( 0, Math.floor( Number( raw ) || 0 ) );

	const [ previewUrl, setPreviewUrl ] = useState( '' );

	useEffect( () => {
		if ( id < 1 || typeof window === 'undefined' ) {
			setPreviewUrl( '' );
			return;
		}
		const wp = window.wp;
		if ( ! wp?.media?.attachment ) {
			setPreviewUrl( '' );
			return;
		}
		const attachment = wp.media.attachment( id );
		const applyUrl = () => {
			const sizes = attachment.get( 'sizes' );
			const thumb =
				sizes?.thumbnail?.url ||
				sizes?.medium?.url ||
				attachment.get( 'url' );
			setPreviewUrl( typeof thumb === 'string' ? thumb : '' );
		};
		if ( attachment.get( 'url' ) ) {
			applyUrl();
			return;
		}
		attachment
			.fetch()
			.then( applyUrl )
			.catch( () => setPreviewUrl( '' ) );
	}, [ id ] );

	const openFrame = () => {
		const wp = window.wp;
		if ( ! wp?.media ) {
			return;
		}
		const frame = wp.media( {
			title:
				label ||
				__( 'Select image', 'onepress' ),
			button: {
				text: __( 'Use image', 'onepress' ),
			},
			library: { type: 'image' },
			multiple: false,
		} );
		frame.on( 'open', () => {
			const selection = frame.state().get( 'selection' );
			selection.reset( [] );
			if ( id < 1 ) {
				return;
			}
			const att = wp.media.attachment( id );
			att.fetch().then( () => {
				selection.add( att );
			} );
		} );
		frame.on( 'select', () => {
			const selected = frame.state().get( 'selection' ).first();
			if ( ! selected ) {
				return;
			}
			const json = selected.toJSON();
			const nextId =
				typeof json.id === 'number'
					? json.id
					: parseInt( String( json.id ), 10 );
			onChangeProps( {
				[ name ]: Number.isFinite( nextId ) ? nextId : 0,
			} );
		} );
		frame.open();
	};

	const clear = () => {
		onChangeProps( { [ name ]: 0 } );
		setPreviewUrl( '' );
	};

	const mediaReady =
		typeof window !== 'undefined' && Boolean( window.wp?.media );

	return (
		<BaseControl
			className={
				OPTION_FIELD_CLASS + ' opb-mini-builder-field--image'
			}
			label={ label }
			help={ help }
			__nextHasNoMarginBottom
		>
			<div className="opb-field-image">
				{ previewUrl ? (
					<button
						type="button"
						className="opb-field-image__preview"
						onClick={ openFrame }
						aria-label={ __( 'Change image', 'onepress' ) }
					>
						<img src={ previewUrl } alt="" decoding="async" />
					</button>
				) : null }
				<div className="opb-field-image__actions">
					<Button
						variant="secondary"
						onClick={ openFrame }
						disabled={ ! mediaReady }
					>
						{ id
							? __( 'Replace image', 'onepress' )
							: __( 'Select image', 'onepress' ) }
					</Button>
					{ id ? (
						<Button
							variant="tertiary"
							isDestructive
							onClick={ clear }
						>
							{ __( 'Remove', 'onepress' ) }
						</Button>
					) : null }
				</div>
				{ ! mediaReady ? (
					<p className="opb-field-image__warn" role="note">
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
