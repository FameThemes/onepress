/**
 * Background image: wp.media + FocalPointPicker → background-position %.
 */
import { Button, FocalPointPicker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useCallback, useMemo } from '@wordpress/element';
import {
	extractUrlFromBackgroundImage,
	focalToBackgroundPosition,
	formatBackgroundImageFromUrl,
	parseBackgroundPositionToFocal,
} from '../stylingBackgroundImageUtils';
import { trash } from '@wordpress/icons';

/**
 * @param {object} props
 * @param {string} props.backgroundImage
 * @param {string} props.backgroundPosition
 * @param {(patch: Record<string, string>) => void} props.onPatch
 */
export function StylingBackgroundImageControl({
	backgroundImage,
	backgroundPosition,
	onPatch,
}) {
	const imageUrl = useMemo(
		() => extractUrlFromBackgroundImage(backgroundImage),
		[backgroundImage]
	);

	const focalValue = useMemo(
		() => parseBackgroundPositionToFocal(backgroundPosition),
		[backgroundPosition]
	);

	const onFocalChange = useCallback(
		(fp) => {
			onPatch({ backgroundPosition: focalToBackgroundPosition(fp) });
		},
		[onPatch]
	);

	const openMedia = useCallback(() => {
		if (typeof wp === 'undefined' || !wp.media) {
			return;
		}
		const frame = wp.media({
			title: __('Background image', 'onepress'),
			button: { text: __('Use image', 'onepress') },
			multiple: false,
			library: { type: 'image' },
		});
		frame.on('select', () => {
			const attachment = frame.state().get('selection').first().toJSON();
			const url = attachment && attachment.url ? String(attachment.url) : '';
			if (!url) {
				return;
			}
			const patch = {
				backgroundImage: formatBackgroundImageFromUrl(url),
			};
			if (!String(backgroundPosition || '').trim()) {
				patch.backgroundPosition = '50% 50%';
			}
			onPatch(patch);
		});
		frame.open();
	}, [backgroundPosition, onPatch]);

	const clearImage = useCallback(() => {
		onPatch({ backgroundImage: '', backgroundPosition: '' });
	}, [onPatch]);

	const hasMedia = Boolean(imageUrl);

	return (
		<div className="styling-bg-image">
			<div className="styling-bg-image__toolbar w-full flex items-center gap-2">
				<Button
					variant="secondary"
					className='grow text-center flex justify-center items-center'
					onClick={openMedia}>
					{hasMedia ? __('Change image', 'onepress') : __('Select image', 'onepress')}
				</Button>
				{hasMedia ? (
					<Button
						icon={trash}
						showTooltip={true}
						label={__('Remove image', 'onepress')}
						isDestructive
						variant='secondary'
						onClick={clearImage}>
					</Button>
				) : null}
			</div>
			{hasMedia ? (
				<FocalPointPicker
					__nextHasNoMarginBottom
					// label={__('Focal point', 'onepress')}
					url={imageUrl}
					value={focalValue}
					onChange={onFocalChange}

				/>
			) : null}
		</div>
	);
}
