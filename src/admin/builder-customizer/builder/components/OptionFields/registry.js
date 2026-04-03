import OptionFieldCheckboxGroup from './OptionFieldCheckboxGroup.jsx';
import OptionFieldColor from './OptionFieldColor.jsx';
import OptionFieldColumns from './OptionFieldColumns.jsx';
import OptionFieldEditor from './OptionFieldEditor.jsx';
import OptionFieldGallery from './OptionFieldGallery.jsx';
import OptionFieldImage from './OptionFieldImage.jsx';
import OptionFieldNumber from './OptionFieldNumber.jsx';
import OptionFieldRadio from './OptionFieldRadio.jsx';
import OptionFieldRange from './OptionFieldRange.jsx';
import OptionFieldSelect from './OptionFieldSelect.jsx';
import OptionFieldText from './OptionFieldText.jsx';
import OptionFieldTextarea from './OptionFieldTextarea.jsx';
import OptionFieldToggle from './OptionFieldToggle.jsx';

/**
 * Map schema `type` string → React component.
 * Extend via {@link registerOptionFieldType}.
 *
 * @type {Record<string, import('react').ComponentType<any>>}
 */
export const OPTION_FIELD_COMPONENTS = {
	text: OptionFieldText,
	color: OptionFieldColor,
	textarea: OptionFieldTextarea,
	editor: OptionFieldEditor,
	select: OptionFieldSelect,
	radio: OptionFieldRadio,
	range: OptionFieldRange,
	slider: OptionFieldRange,
	toggle: OptionFieldToggle,
	switch: OptionFieldToggle,
	image: OptionFieldImage,
	gallery: OptionFieldGallery,
	checkbox: OptionFieldCheckboxGroup,
	onepress_columns: OptionFieldColumns,
};

/** @type {Record<string, import('react').ComponentType<any>>} */
const registeredExtra = {};

/**
 * @param {string} type
 * @param {import('react').ComponentType<any>} Component
 */
export function registerOptionFieldType( type, Component ) {
	if ( typeof type !== 'string' || ! type ) {
		return;
	}
	registeredExtra[ type ] = Component;
}

/**
 * @param {string} type
 * @return {import('react').ComponentType<any>|null}
 */
export function getOptionFieldComponent( type ) {
	if ( typeof type !== 'string' || ! type ) {
		return null;
	}
	return (
		registeredExtra[ type ] ||
		OPTION_FIELD_COMPONENTS[ type ] ||
		null
	);
}
