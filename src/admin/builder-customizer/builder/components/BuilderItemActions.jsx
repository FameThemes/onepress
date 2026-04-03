import { Button, Icon } from '@wordpress/components';
import { dragHandle, trash } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import { BUILDER_DRAG_MIME } from '../constants.js';
import { setBuilderDragMode } from '../drag-state.js';

/**
 * Drag grip (reorder in canvas) + remove. Up/down arrows replaced by drag-and-drop.
 *
 * @param {Object}   props
 * @param {string}   props.nodeId
 * @param {Function} props.onRemove
 */
export default function BuilderItemActions( { nodeId, onRemove } ) {
	const onDragStart = ( e ) => {
		e.stopPropagation();
		setBuilderDragMode( 'reorder' );
		e.dataTransfer.setData(
			BUILDER_DRAG_MIME,
			JSON.stringify( { source: 'reorder', nodeId } )
		);
		e.dataTransfer.effectAllowed = 'move';
	};

	const onDragEnd = () => {
		setBuilderDragMode( null );
	};

	return (
		<div
			className="opb-node__actions opb-node__actions--icons"
			onClick={ ( e ) => e.stopPropagation() }
			onKeyDown={ ( e ) => e.stopPropagation() }
		>
			<button
				type="button"
				className="opb-drag-handle"
				draggable
				onDragStart={ onDragStart }
				onDragEnd={ onDragEnd }
				onClick={ ( e ) => e.stopPropagation() }
				aria-label={ __( 'Drag to reorder', 'onepress' ) }
				title={ __( 'Drag to reorder', 'onepress' ) }
			>
				<Icon icon={ dragHandle } size={ 20 } />
			</button>
			<Button
				icon={ trash }
				size="small"
				variant="tertiary"
				isDestructive
				label={ __( 'Remove', 'onepress' ) }
				showTooltip
				onClick={ () => onRemove( nodeId ) }
			/>
		</div>
	);
}
