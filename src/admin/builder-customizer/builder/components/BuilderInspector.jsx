import { Button, Icon } from '@wordpress/components';
import { chevronLeft, trash } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import { getMiniBuilderSchemaForType } from '../mini-builder-options-data.js';
import { getBuilderItemTemplate } from '../registry.js';
import { findNodeById, findParentContext } from '../tree-utils.js';
import MiniBuilderOptionFields from './MiniBuilderOptionFields.jsx';

/**
 * @param {Object}                                 props
 * @param {import('../tree-utils.js').BuilderTree} props.tree
 * @param {string}                                 props.selectedId
 * @param {Function}                               props.onBack
 * @param {Function}                               props.onChangeProps
 * @param {Function}                               props.onChangeColumnCount
 * @param {Function}                               props.onRemove
 * @param {'panel'|'modal'}                        [props.variant]
 */
export default function BuilderInspector( {
	tree,
	selectedId,
	onBack,
	onChangeProps,
	onChangeColumnCount,
	onRemove,
	variant = 'panel',
} ) {
	const node = findNodeById( tree.root, selectedId );
	if ( ! node ) {
		return null;
	}

	const tmpl = getBuilderItemTemplate( node.type );
	const Inspector = tmpl?.Inspector;
	const optionSchema = getMiniBuilderSchemaForType( node.type );
	const ctx = findParentContext( tree.root, selectedId );
	const isModal = variant === 'modal';

	return (
		<div
			className={
				'opb-inspector' + ( isModal ? ' opb-inspector--modal' : '' )
			}
		>
			{ ! isModal ? (
				<button
					type="button"
					className="opb-inspector__back"
					onClick={ onBack }
				>
					<Icon icon={ chevronLeft } size={ 20 } />
					<span>{ __( 'Back', 'onepress' ) }</span>
				</button>
			) : null }
			{ ! isModal ? (
				<p className="opb-inspector__heading">
					{ __( 'Block settings', 'onepress' ) }
				</p>
			) : null }
			<p className="opb-inspector__type">{ tmpl?.label || node.type }</p>
			{ optionSchema.length > 0 ? (
				<MiniBuilderOptionFields
					schema={ optionSchema }
					node={ node }
					onChangeProps={ ( patch ) =>
						onChangeProps( selectedId, patch )
					}
					onChangeColumnCount={ ( n ) =>
						onChangeColumnCount( selectedId, n )
					}
				/>
			) : Inspector ? (
				<Inspector
					node={ node }
					onChangeProps={ ( patch ) =>
						onChangeProps( selectedId, patch )
					}
					onChangeColumnCount={ ( n ) =>
						onChangeColumnCount( selectedId, n )
					}
				/>
			) : (
				<p className="opb-inspector__muted">
					{ __( 'No fields for this block.', 'onepress' ) }
				</p>
			) }

			{ selectedId !== 'root' && ctx ? (
				<div className="opb-inspector__footer">
					<p className="opb-inspector__footer-label">
						{ __( 'Structure', 'onepress' ) }
					</p>
					<p className="opb-inspector__hint">
						{ __(
							'Use the grip next to this block in the list to drag and reorder.',
							'onepress'
						) }
					</p>
					<Button
						icon={ trash }
						size="small"
						variant="secondary"
						isDestructive
						label={ __( 'Remove block', 'onepress' ) }
						onClick={ () => onRemove( selectedId ) }
					/>
				</div>
			) : null }
		</div>
	);
}
