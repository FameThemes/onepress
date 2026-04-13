/**
 * Map styling device id → Dashicons class (wp-admin).
 *
 * @param {string} id
 * @returns {string}
 */
export function dashiconClassForDeviceId(id) {
	switch (String(id || '').toLowerCase()) {
		case 'tablet':
			return 'dashicons-tablet';
		case 'mobile':
			return 'dashicons-smartphone';
		case 'desktop':
		default:
			return 'dashicons-desktop';
	}
}
