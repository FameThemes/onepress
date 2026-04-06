import { useEffect, useLayoutEffect, useRef } from '@wordpress/element';

export function ColorInput({ value, onChange, fieldId, $ }) {
	const ref = useRef(null);
	const onChangeRef = useRef(onChange);
	onChangeRef.current = onChange;
	useLayoutEffect(() => {
		const $el = $(ref.current);
		if (!$el.length) {
			return;
		}
		$el.wpColorPicker({
			change() {
				onChangeRef.current($el.wpColorPicker('color') || '');
			},
			clear() {
				onChangeRef.current('');
			},
		});
		return () => {
			try {
				$el.wpColorPicker('destroy');
			} catch (e) {
				// ignore
			}
		};
	}, [$, fieldId]);
	useEffect(() => {
		try {
			$(ref.current).wpColorPicker('color', value || '');
		} catch (e) {
			// ignore
		}
	}, [value, $]);
	return <input ref={ref} data-live-id={fieldId} type="text" className="color-field c-color alpha-color-control" />;
}
