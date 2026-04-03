import { Button, Icon } from '@wordpress/components';
import { plus } from '@wordpress/icons';
import { __, sprintf } from '@wordpress/i18n';

import { TYPE_COLUMNS, TYPE_SECTION } from '../constants.js';
import { getColumnWidthsForNode } from '../tree-utils.js';
import { getBuilderItemTemplate } from '../registry.js';
import CanvasItemLabel from './CanvasItemLabel.jsx';
import BuilderDropZone from './BuilderDropZone.jsx';
import BuilderItemActions from './BuilderItemActions.jsx';

function emptyDropLabel( isRoot ) {
	return (
		<>
			<Icon
				className="opb-dropzone__plus-icon"
				icon={ plus }
				size={ 18 }
			/>
			<span>
				{ isRoot
					? __( 'Drop blocks here or click to add item', 'onepress' )
					: __( 'Drop here or click to add', 'onepress' ) }
			</span>
		</>
	);
}

function emptyColumnDropLabel() {
	return (
		<>
			<Icon
				className="opb-dropzone__plus-icon"
				icon={ plus }
				size={ 18 }
			/>
			<span>{ __( 'Add to column', 'onepress' ) }</span>
		</>
	);
}

/**
 * @param {Object}                                 props
 * @param {import('../tree-utils.js').BuilderTree} props.tree
 * @param {import('../tree-utils.js').BuilderNode} props.node
 * @param {number}                                 props.depth
 * @param {string|null}                            props.selectedId
 * @param {string|null}                            [props.activeDropKey]
 * @param {Function}                               props.onSelect
 * @param {Function}                               props.onRemove
 * @param {Function}                               props.onDropItem
 * @param {Function}                               props.onReorderDrop
 * @param {Function}                               [props.onOpenPaletteModal] `( { parentId, index } )` opens add modal with insert target.
 */
export default function BuilderTreeNode( {
	tree,
	node,
	depth = 0,
	selectedId,
	activeDropKey = null,
	onSelect,
	onRemove,
	onDropItem,
	onReorderDrop,
	onOpenPaletteModal,
} ) {
	const isRoot = node.id === 'root';
	const selected = selectedId === node.id;
	const tmpl = getBuilderItemTemplate( node.type );

	if ( node.type === TYPE_SECTION ) {
		const children = node.children || [];
		return (
			<div
				className={
					'opb-node opb-node--section' +
					( selected && ! isRoot ? ' is-selected' : '' )
				}
			>
				{ ! isRoot ? (
					<div className="opb-node__bar">
						<div
							className="opb-node__title"
							onClick={ () => onSelect( node.id ) }
						>
							<CanvasItemLabel
								icon={ tmpl?.icon }
								label={ tmpl?.label || node.type }
							/>
						</div>
						{ onOpenPaletteModal ? (
							<Button
								className="opb-node__add"
								icon={ plus }
								size="small"
								variant="tertiary"
								label={ __( 'Add block', 'onepress' ) }
								showTooltip
								onClick={ ( e ) => {
									e.stopPropagation();
									onOpenPaletteModal( {
										parentId: node.id,
										index: children.length,
									} );
								} }
							/>
						) : null }
						<BuilderItemActions
							nodeId={ node.id }
							onRemove={ onRemove }
						/>
					</div>
				) : (
					<></>
				) }

				<div
					className={
						'opb-node__body opb-node__body--section' +
						( isRoot ? ' opb-node__body--root' : '' )
					}
				>
					<BuilderDropZone
						dropKey={ `${ node.id }:0` }
						parentId={ node.id }
						index={ 0 }
						activeDropKey={ activeDropKey }
						onDropItem={ onDropItem }
						onReorderDrop={ onReorderDrop }
						label={
							children.length === 0 && onOpenPaletteModal
								? emptyDropLabel( isRoot )
								: undefined
						}
						onLabeledClick={
							children.length === 0 && onOpenPaletteModal
								? () =>
										onOpenPaletteModal( {
											parentId: node.id,
											index: 0,
										} )
								: undefined
						}
					/>
					{ children.map( ( child, i ) => (
						<div key={ child.id } className="opb-node__slot">
							<BuilderTreeNode
								tree={ tree }
								node={ child }
								depth={ depth + 1 }
								selectedId={ selectedId }
								activeDropKey={ activeDropKey }
								onSelect={ onSelect }
								onRemove={ onRemove }
								onDropItem={ onDropItem }
								onReorderDrop={ onReorderDrop }
								onOpenPaletteModal={ onOpenPaletteModal }
							/>
							<BuilderDropZone
								dropKey={ `${ node.id }:${ i + 1 }` }
								parentId={ node.id }
								index={ i + 1 }
								activeDropKey={ activeDropKey }
								onDropItem={ onDropItem }
								onReorderDrop={ onReorderDrop }
							/>
						</div>
					) ) }
				</div>
			</div>
		);
	}

	if ( node.type === TYPE_COLUMNS ) {
		const cols = node.columns || [];
		const colWidths = getColumnWidthsForNode( node );
		return (
			<div
				className={
					'opb-node opb-node--columns' +
					( selected ? ' is-selected' : '' )
				}
			>
				<div className="opb-node__bar">
					<div
						className="opb-node__title"
						onClick={ () => onSelect( node.id ) }
					>
						<CanvasItemLabel
							icon={ tmpl?.icon }
							label={ tmpl?.label || node.type }
						/>
					</div>
					{ onOpenPaletteModal && cols[ 0 ] ? (
						<Button
							className="opb-node__add"
							icon={ plus }
							size="small"
							variant="tertiary"
							label={ __( 'Add block to first column', 'onepress' ) }
							showTooltip
							onClick={ ( e ) => {
								e.stopPropagation();
								const first = cols[ 0 ];
								const n = first.children?.length ?? 0;
								onOpenPaletteModal( {
									parentId: first.id,
									index: n,
								} );
							} }
						/>
					) : null }
					<BuilderItemActions
						nodeId={ node.id }
						onRemove={ onRemove }
					/>
				</div>
				<div className="opb-columns opb-node__body--columns">
					{ cols.map( ( col, colIndex ) => (
						<div key={ col.id } className="opb-columns__col">
							<div className="opb-columns__col-head">
								<span className="opb-columns__col-label">
									{ sprintf(
										/* translators: 1: column number, 2: width percent. */
										__( 'Column %1$d (%2$d%%)', 'onepress' ),
										colIndex + 1,
										colWidths[ colIndex ] ??
											Math.round( 100 / cols.length )
									) }
								</span>
								{ onOpenPaletteModal ? (
									<Button
										className="opb-columns__col-add"
										icon={ plus }
										size="small"
										variant="tertiary"
										label={ __( 'Add block', 'onepress' ) }
										showTooltip
										onClick={ ( e ) => {
											e.stopPropagation();
											const n = col.children?.length ?? 0;
											onOpenPaletteModal( {
												parentId: col.id,
												index: n,
											} );
										} }
									/>
								) : null }
							</div>

							<div className="opb-columns__content">
								<BuilderDropZone
									dropKey={ `${ col.id }:0` }
									parentId={ col.id }
									index={ 0 }
									activeDropKey={ activeDropKey }
									onDropItem={ onDropItem }
									onReorderDrop={ onReorderDrop }
									label={
										( col.children || [] ).length === 0 &&
										onOpenPaletteModal
											? emptyColumnDropLabel()
											: undefined
									}
									onLabeledClick={
										( col.children || [] ).length === 0 &&
										onOpenPaletteModal
											? () =>
													onOpenPaletteModal( {
														parentId: col.id,
														index: 0,
													} )
											: undefined
									}
								/>
								{ ( col.children || [] ).map( ( child, i ) => (
									<div
										key={ child.id }
										className="opb-node__slot"
									>
										<BuilderTreeNode
											tree={ tree }
											node={ child }
											depth={ depth + 1 }
											selectedId={ selectedId }
											activeDropKey={ activeDropKey }
											onSelect={ onSelect }
											onRemove={ onRemove }
											onDropItem={ onDropItem }
											onReorderDrop={ onReorderDrop }
											onOpenPaletteModal={
												onOpenPaletteModal
											}
										/>
										<BuilderDropZone
											dropKey={ `${ col.id }:${ i + 1 }` }
											parentId={ col.id }
											index={ i + 1 }
											activeDropKey={ activeDropKey }
											onDropItem={ onDropItem }
											onReorderDrop={ onReorderDrop }
										/>
									</div>
								) ) }
							</div>
						</div>
					) ) }
				</div>
			</div>
		);
	}

	return (
		<div
			className={
				'opb-node opb-node--leaf' + ( selected ? ' is-selected' : '' )
			}
		>
			<div className="opb-node__bar opb-node__bar--leaf">
				<div
					className="opb-node__select-hit"
					onClick={ () => onSelect( node.id ) }
				>
					<CanvasItemLabel
						icon={ tmpl?.icon }
						label={ tmpl?.label || node.type }
					/>
				</div>
				<BuilderItemActions nodeId={ node.id } onRemove={ onRemove } />
			</div>
		</div>
	);
}
