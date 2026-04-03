import { useCallback } from '@wordpress/element';

import { BUILDER_DRAG_MIME } from '../constants.js';
import { getBuilderDragMode } from '../drag-state.js';

/**
 * @param {Object}                    props
 * @param {string}                    props.dropKey
 * @param {string}                    props.parentId
 * @param {number}                    props.index
 * @param {string|null}               [props.activeDropKey]  From layout pointer tracking (single active zone).
 * @param {Function}                  props.onDropItem
 * @param {Function}                  [props.onReorderDrop]  ( nodeId, parentId, index )
 * @param {import('react').ReactNode} [props.label]
 * @param {Function}                  [props.onLabeledClick] e.g. open palette modal (labeled root empty).
 */
export default function BuilderDropZone( {
	dropKey,
	parentId,
	index,
	activeDropKey = null,
	onDropItem,
	onReorderDrop,
	label,
	onLabeledClick,
} ) {
	const over = activeDropKey === dropKey;

	const onDragOver = useCallback( ( e ) => {
		const dt = e.dataTransfer;
		const types = dt?.types ? Array.from( dt.types ) : [];
		const mode = getBuilderDragMode();
		if (
			types.includes( BUILDER_DRAG_MIME ) ||
			mode === 'palette' ||
			mode === 'reorder'
		) {
			e.preventDefault();
			dt.dropEffect = mode === 'palette' ? 'copy' : 'move';
		}
	}, [] );

	const onDrop = useCallback(
		( e ) => {
			e.preventDefault();
			const raw = e.dataTransfer.getData( BUILDER_DRAG_MIME );
			if ( ! raw ) {
				return;
			}
			try {
				const payload = JSON.parse( raw );
				if ( payload?.source === 'palette' && payload?.type ) {
					onDropItem( parentId, index, payload.type );
				} else if (
					payload?.source === 'reorder' &&
					payload?.nodeId &&
					onReorderDrop
				) {
					onReorderDrop( payload.nodeId, parentId, index );
				}
			} catch {
				// ignore
			}
		},
		[ parentId, index, onDropItem, onReorderDrop ]
	);

	const clickable = Boolean( label && onLabeledClick );

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			role={ clickable ? 'button' : 'presentation' }
			tabIndex={ clickable ? 0 : undefined }
			className={
				'opb-dropzone' +
				( over ? ' is-over' : '' ) +
				( label ? ' opb-dropzone--labeled' : '' ) +
				( clickable ? ' opb-dropzone--clickable' : '' )
			}
			data-drop-key={ dropKey }
			onDragOver={ onDragOver }
			onDrop={ onDrop }
			onClick={ clickable ? () => onLabeledClick() : undefined }
			onKeyDown={
				clickable
					? ( e ) => {
							if ( e.key === 'Enter' || e.key === ' ' ) {
								e.preventDefault();
								onLabeledClick();
							}
					  }
					: undefined
			}
		>
			{ label ? (
				<span className="opb-dropzone__label opb-dropzone__label--rich">
					{ label }
				</span>
			) : null }
		</div>
	);
}
