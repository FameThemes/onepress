import { __ } from '@wordpress/i18n';

import { BUILDER_DRAG_MIME } from '../constants.js';
import { setBuilderDragMode } from '../drag-state.js';
import { getAllBuilderItemTemplates } from '../registry.js';

/**
 * @param {Object}            props
 * @param {Function|undefined} [props.onPickType] When set (modal opened with insert target), click a chip to insert.
 */
export default function BuilderPalette( { onPickType } ) {
	const items = getAllBuilderItemTemplates();

	const onDragStart = ( e, type ) => {
		setBuilderDragMode( 'palette' );
		e.dataTransfer.setData(
			BUILDER_DRAG_MIME,
			JSON.stringify( { source: 'palette', type } )
		);
		e.dataTransfer.effectAllowed = 'copy';
	};

	const onDragEnd = () => {
		setBuilderDragMode( null );
	};

	const byCat = {};
	for ( const t of items ) {
		const c = t.category || 'other';
		if ( ! byCat[ c ] ) {
			byCat[ c ] = [];
		}
		byCat[ c ].push( t );
	}

	const catLabel = {
		layout: __( 'Layout', 'onepress' ),
		content: __( 'Content', 'onepress' ),
		other: __( 'Other', 'onepress' ),
	};

	return (
		<div className="opb-palette">
			<p className="opb-palette__hint">
				{ onPickType
					? __(
							'Click a block to add it at the chosen place, or drag onto the canvas.',
							'onepress'
					  )
					: __(
							'Drag new blocks from here or use the grip to reorder. Click a block for settings.',
							'onepress'
					  ) }
			</p>
			{ Object.keys( byCat ).map( ( cat ) => (
				<div key={ cat } className="opb-palette__group">
					<span className="opb-palette__group-title">
						{ catLabel[ cat ] || cat }
					</span>
					<ul className="opb-palette__chips" role="list">
						{ byCat[ cat ].map( ( t ) => (
							<li
								key={ t.name }
								className="opb-palette__chip-wrap"
							>
								<div
									draggable
									onDragStart={ ( ev ) =>
										onDragStart( ev, t.name )
									}
									onDragEnd={ onDragEnd }
									className="opb-palette__chip"
									onClick={ ( ev ) => {
										if ( ! onPickType ) {
											return;
										}
										ev.preventDefault();
										ev.stopPropagation();
										onPickType( t.name );
									} }
									role={ onPickType ? 'button' : undefined }
									tabIndex={ onPickType ? 0 : undefined }
									onKeyDown={
										onPickType
											? ( ev ) => {
													if (
														ev.key === 'Enter' ||
														ev.key === ' '
													) {
														ev.preventDefault();
														onPickType( t.name );
													}
											  }
											: undefined
									}
								>
									{ t.label }
								</div>
							</li>
						) ) }
					</ul>
				</div>
			) ) }
		</div>
	);
}
