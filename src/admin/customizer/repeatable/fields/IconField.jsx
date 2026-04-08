import { useEffect, useRef } from '@wordpress/element';
import {
	iconPreviewClass,
	isSvgIconValue,
	ONEPRESS_ICON_COMMIT_EVENT,
	sanitizeSvgForCustomizerPreview,
} from '../repeatable-values';

export function IconField({ field, value, onChange }) {
	const wrapRef = useRef(null);
	const onChangeRef = useRef(onChange);
	onChangeRef.current = onChange;

	useEffect(() => {
		const handler = (e) => {
			if (!e.detail || e.detail.wrapperEl !== wrapRef.current) {
				return;
			}
			onChangeRef.current(e.detail.value);
		};
		window.addEventListener(ONEPRESS_ICON_COMMIT_EVENT, handler);
		return () => window.removeEventListener(ONEPRESS_ICON_COMMIT_EVENT, handler);
	}, []);

	const isSvg = isSvgIconValue(value);
	const ic = isSvg ? '' : iconPreviewClass(value);
	const svgPreview = isSvg ? sanitizeSvgForCustomizerPreview(value) : '';

	return (
		<div className="item-icon">
			<div className="icon-wrapper" ref={wrapRef}>
				{isSvg ? (
					svgPreview ? (
						<span className="onepress-svg-preview" dangerouslySetInnerHTML={{ __html: svgPreview }} />
					) : (
						<span className="onepress-svg-preview onepress-svg-preview--invalid" aria-hidden="true" />
					)
				) : (
					<i className={`fa ${ic}`} />
				)}
				<input
					data-live-id={field.id}
					type="hidden"
					value={value === undefined || value === null ? '' : value}
					onChange={(e) => onChange(e.target.value)}
					className=""
				/>
			</div>
			<a
				href="#"
				className="remove-icon"
				onClick={(e) => {
					e.preventDefault();
					onChange('');
				}}
			>
				Remove
			</a>
		</div>
	);
}
