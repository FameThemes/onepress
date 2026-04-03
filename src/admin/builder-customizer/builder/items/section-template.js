import { __ } from '@wordpress/i18n';
import { layout } from '@wordpress/icons';

import { TYPE_SECTION } from '../constants.js';
import { defineBuilderItemTemplate } from '../registry.js';

export const sectionTemplate = defineBuilderItemTemplate( {
	name: TYPE_SECTION,
	label: __( 'Section', 'onepress' ),
	category: 'layout',
	kind: 'section',
	icon: layout,
	defaultProps: {},
} );
