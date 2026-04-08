export function RadioField({ field, value, onChange }) {
	const opts = field.options || {};
	return Object.keys(opts).map((k) => (
		<label key={k}>
			<input
				data-live-id={field.id}
				type="radio"
				checked={value == k}
				value={k}
				onChange={() => onChange(k)}
				className="widefat"
			/>
			{opts[k]}
		</label>
	));
}
