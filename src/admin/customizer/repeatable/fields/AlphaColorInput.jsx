import { useEffect, useLayoutEffect, useRef } from '@wordpress/element';

export function AlphaColorInput({ value, onChange, fieldId, $ }) {
	const ref = useRef(null);
	const onChangeRef = useRef(onChange);
	onChangeRef.current = onChange;
	useLayoutEffect(() => {
		const $el = $(ref.current);
		if (!$el.length) {
			return;
		}
		let c = value || '';
		c = String(c).replace(/^#/, '');
		$el.removeAttr('value');
		$el.prop('value', c);
		// $.fn.alphaColorPicker() ignores passed options; it always uses internal wpColorPicker callbacks
		// and triggers jQuery "color_change" (see alpha-color-picker.js).
		const onColorPlugin = () => {
			onChangeRef.current($el.val() || '');
		};
		$el.on('color_change.onepressRepeatable', onColorPlugin);
		// alpha-color-picker.js binds "input" for the opacity slider only; typing does not always fire color_change.
		$el.on('input.onepressRepeatable', onColorPlugin);
		$el.alphaColorPicker();
		let raf = 0;
		const pushRaf = () => {
			if (raf) {
				return;
			}
			raf = window.requestAnimationFrame(() => {
				raf = 0;
				onColorPlugin();
			});
		};
		const $picker = $el.closest('.wp-picker-container');
		if ($picker.length) {
			$picker.on('mousemove.onepressRepeatable touchmove.onepressRepeatable', '.iris-picker', pushRaf);
		}
		return () => {
			$picker.off('.onepressRepeatable');
			if (raf) {
				window.cancelAnimationFrame(raf);
			}
			$el.off('color_change.onepressRepeatable', onColorPlugin);
			$el.off('input.onepressRepeatable', onColorPlugin);
			try {
				$el.wpColorPicker('destroy');
			} catch (e) {
				// ignore
			}
			try {
				const $wrap = $el.parent('.alpha-color-picker-wrap');
				if ($wrap.length) {
					$el.unwrap();
				}
			} catch (e) {
				// ignore
			}
		};
	}, [$, fieldId]);
	useEffect(() => {
		try {
			const $el = $(ref.current);
			if ($el.length && $el.data('wpWpColorPicker')) {
				$el.wpColorPicker('color', value || '');
			}
		} catch (e) {
			// ignore
		}
	}, [value, $]);
	return <input ref={ref} data-live-id={fieldId} data-show-opacity="true" type="text" className="color-field c-coloralpha alpha-color-control" />;
}
