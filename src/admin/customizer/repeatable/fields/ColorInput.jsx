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
		const readColor = () => {
			try {
				return $el.wpColorPicker('color') || $el.val() || '';
			} catch (e) {
				return $el.val() || '';
			}
		};
		const push = () => {
			onChangeRef.current(readColor());
		};
		let raf = 0;
		const pushRaf = () => {
			if (raf) {
				return;
			}
			raf = window.requestAnimationFrame(() => {
				raf = 0;
				push();
			});
		};
		$el.wpColorPicker({
			change: push,
			clear() {
				onChangeRef.current('');
			},
		});
		// wpColorPicker does not forward Iris drag events; while dragging, sync via the picker surface.
		const $wrap = $el.closest('.wp-picker-container');
		$wrap.on('mousemove.onepressRepeatable touchmove.onepressRepeatable', '.iris-picker', pushRaf);
		return () => {
			$wrap.off('.onepressRepeatable');
			if (raf) {
				window.cancelAnimationFrame(raf);
			}
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
