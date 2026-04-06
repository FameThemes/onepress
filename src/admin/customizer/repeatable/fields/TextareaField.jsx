import { useEffect, useRef } from '@wordpress/element';

export function TextareaField({ field, value, onChange, skipEditor, $ }) {
	const ref = useRef(null);
	const onChangeRef = useRef(onChange);
	onChangeRef.current = onChange;

	// Modal TinyMCE (modal-editor.js + wp-editor.js) syncs with
	// settings.sync_id.val(html).trigger("change") (jQuery). That does not invoke
	// native addEventListener handlers, so a controlled React textarea never updates
	// state or the Customizer setting — bind the same callback via jQuery as well.
	useEffect(() => {
		if (field.type !== 'editor' || skipEditor) {
			return;
		}
		const el = ref.current;
		if (!el) {
			return;
		}
		const push = () => {
			onChangeRef.current(el.value);
		};
		el.addEventListener('change', push);
		el.addEventListener('input', push);
		let $el;
		if ($ && typeof $.fn?.on === 'function') {
			$el = $(el);
			$el.on('change.onepressRepeaterEditor input.onepressRepeaterEditor', push);
		}
		return () => {
			el.removeEventListener('change', push);
			el.removeEventListener('input', push);
			if ($el) {
				$el.off('.onepressRepeaterEditor');
			}
		};
	}, [field.type, skipEditor, $]);

	if (field.type === 'editor' && skipEditor) {
		return null;
	}
	return (
		<textarea
			ref={ref}
			data-live-id={field.id}
			value={value === undefined || value === null ? '' : value}
			onChange={(e) => onChange(e.target.value)}
		/>
	);
}
