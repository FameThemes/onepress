import { useEffect, useRef } from '@wordpress/element';
import { normalizeMediaValue } from '../repeatable-values';

export function MediaField({ field, value, onChange, $ }) {
	const rootRef = useRef(null);
	const m = normalizeMediaValue(value);
	const isImage = !field.media || field.media === '' || field.media === 'image';

	useEffect(() => {
		const $root = $(rootRef.current);
		if (!$root.length) {
			return;
		}
		const sync = () => {
			onChange({
				url: String($root.find('input.image_url').first().val() || ''),
				id: String($root.find('input.image_id').first().val() || ''),
			});
		};
		$root.on('change.onepressR', 'input.image_url, input.image_id', sync);
		return () => $root.off('.onepressR');
	}, [onChange, $]);

	useEffect(() => {
		const $root = $(rootRef.current);
		if (!$root.length) {
			return;
		}
		const next = normalizeMediaValue(value);
		$root.find('input.image_url').first().val(next.url);
		$root.find('input.image_id').first().val(next.id);
	}, [value, $]);

	return (
		<div ref={rootRef} className="item-media">
			{isImage ? (
				<input type="hidden" className="image_url widefat" defaultValue={m.url} />
			) : (
				<input
					type="text"
					className="image_url widefat"
					value={m.url}
					onChange={(e) => onChange({ ...m, url: e.target.value })}
				/>
			)}
			<input type="hidden" data-live-id={field.id} className="image_id widefat" defaultValue={m.id} />
			{isImage ? (
				<div className={`current ${m.url ? 'show' : 'hide'}`}>
					<div className="container">
						<div className="attachment-media-view attachment-media-view-image landscape">
							<div className="thumbnail thumbnail-image">{m.url ? <img src={m.url} alt="" /> : null}</div>
						</div>
					</div>
				</div>
			) : null}
			<div className="actions">
				<button
					className="button remove-button"
					type="button"
					style={m.url ? undefined : { display: 'none' }}
					onClick={(e) => {
						e.preventDefault();
						onChange({ url: '', id: '' });
					}}
				>
					Remove
				</button>
				<button
					className="button upload-button"
					type="button"
					data-media={field.media || ''}
					data-add-txt="Add"
					data-change-txt="Change"
					onClick={(e) => {
						e.preventDefault();
						if (!window._upload_fame) {
							window._upload_fame = wp.media({
								title: wp.media.view.l10n.addMedia,
								multiple: false,
							});
						}
						const _item = $(e.target).closest('.item-media');
						window.media_current = _item;
						window.media_btn = $(e.target);
						window._upload_fame.open();
					}}
				>
					{m.url ? 'Change' : 'Add'}
				</button>
				<div style={{ clear: 'both' }} />
			</div>
		</div>
	);
}
