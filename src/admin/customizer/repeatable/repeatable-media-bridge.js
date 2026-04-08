/**
 * Single wp.media bridge for repeatable item-media fields (shared across controls).
 */
export function installRepeatableMediaBridge($) {
	if (window._onepressRepeatableMediaInstalled) {
		return;
	}
	window._onepressRepeatableMediaInstalled = true;

	if (!window._upload_fame) {
		window._upload_fame = wp.media({
			title: wp.media.view.l10n.addMedia,
			multiple: false,
		});
	}

	window._upload_fame.on('select', function () {
		const media_attachment = window._upload_fame.state().get('selection').first().toJSON();
		const $ctx = window.media_current;
		if (!$ctx || !$ctx.length) {
			return;
		}
		$ctx.find('.image_id').val(media_attachment.id);
		const img_url = media_attachment.url;
		$ctx.find('.current').removeClass('hide').addClass('show');
		$ctx.find('.image_url').val(img_url);
		if (media_attachment.type === 'image') {
			$ctx.find('.thumbnail-image').empty().append($('<img>', { src: img_url, alt: '' }));
		}
		$ctx.find('.remove-button').show();
		$ctx.find('.image_id').trigger('change');
		try {
			if (window.media_btn && window.media_btn.length) {
				window.media_btn.text(window.media_btn.attr('data-change-txt'));
			}
		} catch (e) {
			// ignore
		}
	});
}
