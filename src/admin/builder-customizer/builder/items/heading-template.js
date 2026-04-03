import { __ } from '@wordpress/i18n';
import { heading } from '@wordpress/icons';

import { TYPE_HEADING } from '../constants.js';
import { defineBuilderItemTemplate } from '../registry.js';

export const headingTemplate = defineBuilderItemTemplate( {
	name: TYPE_HEADING,
	label: __( 'Heading', 'onepress' ),
	category: 'content',
	kind: 'leaf',
	icon: heading,
	defaultProps: { content: '', level: 2 },
} );
