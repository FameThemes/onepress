export function CheckboxField({ field, value, onChange }) {
	return (
		<label className="checkbox-label">
			<input
				data-live-id={field.id}
				type="checkbox"
				checked={!!value}
				onChange={(e) => onChange(e.target.checked)}
				value="1"
				className=""
			/>
			<span dangerouslySetInnerHTML={{ __html: field.title || '' }} />
		</label>
	);
}
