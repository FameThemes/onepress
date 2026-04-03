import { getMiniBuilderItemTemplates } from '../mini-builder-options-data.js';
import { registerBuilderItemFromTemplate } from '../registry.js';
import { miniBuilderIconByName } from './mini-builder-icons.js';
import { columnsTemplate } from './columns-template.js';
import { headingTemplate } from './heading-template.js';
import { sectionTemplate } from './section-template.js';
import { textTemplate } from './text-template.js';

/**
 * Register items from PHP options.php manifests when localized; else built-in JS templates.
 */
export function registerDefaultBuilderItems() {
	const fromPhp = getMiniBuilderItemTemplates();
	if ( fromPhp.length > 0 ) {
		fromPhp.forEach( ( t ) => {
			if ( ! t?.type ) {
				return;
			}
			const iconKey =
				typeof t.icon === 'string' ? t.icon : 'layout';
			registerBuilderItemFromTemplate( {
				name: t.type,
				label: t.label || t.type,
				category: t.category || 'layout',
				kind: t.kind || 'leaf',
				icon:
					miniBuilderIconByName[ iconKey ] ||
					miniBuilderIconByName.layout,
				defaultProps:
					t.defaultProps && typeof t.defaultProps === 'object'
						? { ...t.defaultProps }
						: {},
			} );
		} );
		return;
	}
	[ sectionTemplate, columnsTemplate, textTemplate, headingTemplate ].forEach(
		registerBuilderItemFromTemplate
	);
}
