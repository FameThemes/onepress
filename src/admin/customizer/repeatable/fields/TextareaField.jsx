export function TextareaField({ field, value, onChange, skipEditor }) {
	if (field.type === 'editor' && skipEditor) {
		return null;
	}
	return (
		<textarea
			data-live-id={field.id}
			value={value === undefined || value === null ? '' : value}
			onChange={(e) => onChange(e.target.value)}
		/>
	);
}
