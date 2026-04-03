import { __ } from '@wordpress/i18n';
import { paragraph } from '@wordpress/icons';

import { TYPE_TEXT } from '../constants.js';
import { defineBuilderItemTemplate } from '../registry.js';

export const textTemplate = defineBuilderItemTemplate( {
	name: TYPE_TEXT,
	label: __( 'Text', 'onepress' ),
	category: 'content',
	kind: 'leaf',
	icon: paragraph,
	defaultProps: { content: '' },
} );
