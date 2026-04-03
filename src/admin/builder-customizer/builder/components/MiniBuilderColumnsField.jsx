import { Button, RangeControl, SelectControl } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

import {
	COLUMNS_COUNT_MAX,
	COLUMNS_COUNT_MIN,
	equalColumnWidths,
	getColumnWidthsForNode,
	redistributeColumnWidths,
} from '../tree-utils.js';

/**
 * Columns layout UI (driven by schema type `onepress_columns` from PHP).
 *
 * @param {Object}   props
 * @param {Object}   props.node
 * @param {Function} props.onChangeProps
 * @param {Function} props.onChangeColumnCount
 */
export default function MiniBuilderColumnsField( {
	node,
	onChangeProps,
	onChangeColumnCount,
} ) {
	const count =
		node.props?.columnCount ?? node.columns?.length ?? COLUMNS_COUNT_MIN;
	const widths = getColumnWidthsForNode( node );
	const countOptions = [];
	for ( let n = COLUMNS_COUNT_MIN; n <= COLUMNS_COUNT_MAX; n++ ) {
		countOptions.push( { label: String( n ), value: String( n ) } );
	}
	const nCols = Math.max( widths.length, count, 1 );

	return (
		<div className="opb-mini-builder-field opb-mini-builder-field--columns">
			<SelectControl
				label={ __( 'Number of columns', 'onepress' ) }
				value={ String( count ) }
				options={ countOptions }
				onChange={ ( v ) => onChangeColumnCount( parseInt( v, 10 ) ) }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
			<p className="opb-inspector__muted opb-inspector__columns-widths-hint">
				{ __(
					'These widths apply on the front end; the preview stacks columns vertically.',
					'onepress'
				) }
			</p>
			{ widths.map( ( pct, i ) => (
				<RangeControl
					key={ i }
					label={ sprintf(
						/* translators: %d: column index (1-based). */
						__( 'Column %d width', 'onepress' ),
						i + 1
					) }
					help={ __(
						'Percent of the row (all columns total 100%).',
						'onepress'
					) }
					value={ pct }
					onChange={ ( v ) => {
						if ( v == null ) {
							return;
						}
						onChangeProps( {
							columnWidths: redistributeColumnWidths(
								widths,
								i,
								v
							),
						} );
					} }
					min={ 5 }
					max={ 95 }
					step={ 1 }
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
			) ) }
			<Button
				variant="secondary"
				onClick={ () =>
					onChangeProps( {
						columnWidths: equalColumnWidths( nCols ),
					} )
				}
			>
				{ __( 'Equal widths', 'onepress' ) }
			</Button>
		</div>
	);
}
