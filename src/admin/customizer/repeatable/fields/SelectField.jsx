export function SelectField({ field, value, onChange }) {
	const opts = field.options || {};
	const keys = Object.keys(opts);

	if (field.multiple) {
		const arr = Array.isArray(value) ? value : [];
		return (
			<select
				data-live-id={field.id}
				className="select-multiple"
				multiple
				value={arr}
				onChange={(e) => {
					const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
					onChange(selected);
				}}
			>
				{keys.map((k) => (
					<option key={k} value={k}>
						{opts[k]}
					</option>
				))}
			</select>
		);
	}

	return (
		<select
			data-live-id={field.id}
			className="select-one"
			value={value === undefined || value === null ? '' : value}
			onChange={(e) => onChange(e.target.value)}
		>
			{keys.map((k) => (
				<option key={k} value={k}>
					{opts[k]}
				</option>
			))}
		</select>
	);
}
