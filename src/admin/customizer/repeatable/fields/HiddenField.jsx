export function HiddenField({ field, value, onChange }) {
	const t = field.type;
	return (
		<input
			data-live-id={field.id}
			type="hidden"
			value={value === undefined || value === null ? '' : value}
			onChange={(e) => onChange(e.target.value)}
			className={t === 'add_by' ? 'add_by' : ''}
		/>
	);
}
