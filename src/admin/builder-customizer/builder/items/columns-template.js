import { __ } from '@wordpress/i18n';
import { columns } from '@wordpress/icons';

import { TYPE_COLUMNS } from '../constants.js';
import { defineBuilderItemTemplate } from '../registry.js';

export const columnsTemplate = defineBuilderItemTemplate( {
	name: TYPE_COLUMNS,
	label: __( 'Columns', 'onepress' ),
	category: 'layout',
	kind: 'columns',
	icon: columns,
	defaultProps: { columnCount: 2 },
} );
