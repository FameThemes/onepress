import { AlphaColorField } from './AlphaColorField';
import { CheckboxField } from './CheckboxField';
import { ColorField } from './ColorField';
import { HiddenField } from './HiddenField';
import { IconField } from './IconField';
import { MediaField } from './MediaField';
import { RadioField } from './RadioField';
import { SelectField } from './SelectField';
import { TextareaField } from './TextareaField';
import { TextField } from './TextField';

/**
 * Maps `field.type` (from PHP repeatable config) to the React control component.
 */
export const REPEATABLE_FIELD_COMPONENTS = {
	hidden: HiddenField,
	add_by: HiddenField,
	text: TextField,
	checkbox: CheckboxField,
	select: SelectField,
	radio: RadioField,
	color: ColorField,
	coloralpha: AlphaColorField,
	media: MediaField,
	textarea: TextareaField,
	editor: TextareaField,
	icon: IconField,
};

export function getRepeatableFieldComponent(type) {
	if (!type) {
		return null;
	}
	return REPEATABLE_FIELD_COMPONENTS[type] || null;
}
