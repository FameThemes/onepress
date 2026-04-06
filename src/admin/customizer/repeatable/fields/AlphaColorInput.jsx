import { useLayoutEffect, useRef } from '@wordpress/element';

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
		$el.alphaColorPicker({
			change() {
				onChangeRef.current($el.val() || '');
			},
			clear() {
				onChangeRef.current('');
			},
		});
		return () => {
			try {
				$el.off();
			} catch (e) {
				// ignore
			}
		};
	}, [$, fieldId]);
	return <input ref={ref} data-live-id={fieldId} data-show-opacity="true" type="text" className="color-field c-coloralpha alpha-color-control" />;
}
