import BuilderTreeNode from './BuilderTreeNode.jsx';

/**
 * @param {Object}                                 props
 * @param {import('../tree-utils.js').BuilderTree} props.tree
 * @param {string|null}                            props.selectedId
 * @param {string|null}                            [props.activeDropKey]
 * @param {Function}                               props.onSelect
 * @param {Function}                               props.onRemove
 * @param {Function}                               props.onDropItem
 * @param {Function}                               props.onReorderDrop
 * @param {Function}                               [props.onOpenPaletteModal]
 */
export default function BuilderCanvas( {
	tree,
	selectedId,
	activeDropKey = null,
	onSelect,
	onRemove,
	onDropItem,
	onReorderDrop,
	onOpenPaletteModal,
} ) {
	return (
		<div className="opb-canvas">
			<BuilderTreeNode
				tree={ tree }
				node={ tree.root }
				depth={ 0 }
				selectedId={ selectedId }
				activeDropKey={ activeDropKey }
				onSelect={ onSelect }
				onRemove={ onRemove }
				onDropItem={ onDropItem }
				onReorderDrop={ onReorderDrop }
				onOpenPaletteModal={ onOpenPaletteModal }
			/>
		</div>
	);
}
