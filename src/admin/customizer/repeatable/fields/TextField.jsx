export function TextField({ field, value, onChange }) {
	return (
		<input
			data-live-id={field.id}
			type="text"
			value={value === undefined || value === null ? '' : value}
			onChange={(e) => onChange(e.target.value)}
			className=""
		/>
	);
}
