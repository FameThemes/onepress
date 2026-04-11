/**
 * Font picker: lists WordPress Font Library families from REST; optional lazy Google sheet previews for legacy entries.
 */
import {
	createPortal,
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __, _n, sprintf } from '@wordpress/i18n';
import kebabCase from 'lodash/kebabCase';

const PICKER_LINK_PREFIX = 'onepress-typo-picker-';

const FONT_FAMILIES_PATH = '/wp/v2/font-families';

const FONT_COLLECTION_GOOGLE_PATH =
	'/wp/v2/font-collections/google-fonts?_locale=user';

/**
 * @param {unknown} item REST font family or collection entry.
 * @returns {string}
 */
function displayNameFromFontFamilyItem(item) {
	if (!item || typeof item !== 'object') {
		return '';
	}
	const settings =
		'font_family_settings' in item && item.font_family_settings
			? item.font_family_settings
			: item;
	if (!settings || typeof settings !== 'object') {
		return '';
	}
	const name = String(settings.name || '').trim();
	if (name) {
		return name;
	}
	const ff = String(settings.fontFamily || '').trim();
	if (ff) {
		return ff.split(',')[0].replace(/^["']|["']$/g, '').trim() || ff;
	}
	return '';
}

/**
 * @param {unknown} item Google Fonts collection row.
 * @returns {string}
 */
function categoriesLabelFromCollectionItem(item) {
	if (!item || typeof item !== 'object' || !Array.isArray(item.categories)) {
		return '';
	}
	return item.categories
		.map((c) => (typeof c === 'string' ? c : String(c)))
		.filter(Boolean)
		.join(', ');
}

/**
 * @param {unknown} face
 * @returns {string}
 */
function fontFaceInstallKey(face) {
	if (!face || typeof face !== 'object') {
		return '';
	}
	const w = String(face.fontWeight ?? '400');
	const s = String(face.fontStyle ?? 'normal');
	return `${w}|${s}`;
}

/**
 * @param {string} url
 * @returns {string}
 */
function encodeFontSrcUrl(url) {
	const s = String(url || '').trim();
	if (!s) {
		return s;
	}
	if (s.startsWith('http') && !/%[0-9A-Fa-f]{2}/.test(s)) {
		try {
			return encodeURI(s);
		} catch {
			return s;
		}
	}
	return s;
}

/**
 * @param {unknown} face Raw face from font collection JSON.
 * @returns {Record<string, unknown>|null}
 */
function buildFontFacePayloadForRest(face) {
	if (!face || typeof face !== 'object') {
		return null;
	}
	const fontFamily = String(face.fontFamily || '').trim();
	let src = face.src;
	if (!fontFamily || src == null || src === '') {
		return null;
	}
	if (typeof src === 'string') {
		const u = encodeFontSrcUrl(src);
		if (!u) {
			return null;
		}
		src = u;
	} else if (Array.isArray(src)) {
		const arr = src
			.map((x) => encodeFontSrcUrl(String(x)))
			.filter(Boolean);
		if (arr.length === 0) {
			return null;
		}
		src = arr.length === 1 ? arr[0] : arr;
	} else {
		return null;
	}
	/** @type {Record<string, unknown>} */
	const out = {
		fontFamily,
		src,
		fontStyle:
			face.fontStyle != null && String(face.fontStyle).trim() !== ''
				? String(face.fontStyle)
				: 'normal',
		fontWeight:
			face.fontWeight != null && String(face.fontWeight).trim() !== ''
				? String(face.fontWeight)
				: '400',
	};
	if (face.preview && typeof face.preview === 'string' && face.preview.trim()) {
		out.preview = face.preview.trim();
	}
	if (
		face.fontDisplay &&
		typeof face.fontDisplay === 'string' &&
		face.fontDisplay.trim()
	) {
		out.fontDisplay = face.fontDisplay.trim();
	}
	return out;
}

/**
 * @param {number} familyId
 * @returns {Promise<Set<string>>}
 */
async function fetchInstalledFontFaceKeys(familyId) {
	const keys = new Set();
	let page = 1;
	const perPage = 100;
	for (; ;) {
		/** @type {unknown} */
		const batch = await apiFetch({
			path: `${FONT_FAMILIES_PATH}/${familyId}/font-faces?per_page=${perPage}&page=${page}&_locale=user`,
		});
		if (!Array.isArray(batch) || batch.length === 0) {
			break;
		}
		for (const row of batch) {
			if (row && typeof row === 'object' && row.font_face_settings) {
				keys.add(fontFaceInstallKey(row.font_face_settings));
			}
		}
		if (batch.length < perPage) {
			break;
		}
		page += 1;
	}
	return keys;
}

/**
 * @param {unknown} err
 * @returns {string}
 */
function restErrorMessage(err) {
	if (!err || typeof err !== 'object') {
		return '';
	}
	if ('message' in err && typeof err.message === 'string' && err.message.trim()) {
		return err.message.trim();
	}
	const data = /** @type {{ message?: string }} */ (err).data;
	if (data && typeof data.message === 'string' && data.message.trim()) {
		return data.message.trim();
	}
	return '';
}

/**
 * Install a Google Fonts collection entry: create family if needed, POST each missing face (remote URLs kept as src).
 *
 * @param {unknown} collectionItem
 * @returns {Promise<{ noop: boolean, slug: string, added: number, skippedErrors: number, name: string }>}
 */
async function installGoogleCollectionFontFamily(collectionItem) {
	if (!collectionItem || typeof collectionItem !== 'object') {
		throw new Error(__('Invalid font data.', 'onepress'));
	}
	const settings = collectionItem.font_family_settings;
	if (!settings || typeof settings !== 'object') {
		throw new Error(__('Invalid font data.', 'onepress'));
	}
	const slugRaw = String(settings.slug || '').trim();
	const name = String(settings.name || '').trim();
	const fontFamily = String(settings.fontFamily || '').trim();
	if (!slugRaw || !name || !fontFamily) {
		throw new Error(__('This font is missing required fields.', 'onepress'));
	}
	const slugKey = kebabCase(slugRaw);
	const rawFaces = Array.isArray(settings.fontFace) ? settings.fontFace : [];
	const faces = rawFaces
		.map((f) => buildFontFacePayloadForRest(f))
		.filter(Boolean);
	if (faces.length === 0) {
		throw new Error(__('No font files to install.', 'onepress'));
	}

	/** @type {unknown} */
	const existingList = await apiFetch({
		path: `${FONT_FAMILIES_PATH}?slug=${encodeURIComponent(slugKey)}&_locale=user`,
	});
	let familyId;
	let isNewFamily = false;
	let installedKeys = new Set();

	if (Array.isArray(existingList) && existingList.length > 0) {
		const first = existingList[0];
		familyId =
			first && typeof first === 'object' && first.id != null
				? Number(first.id)
				: NaN;
		if (!Number.isFinite(familyId) || familyId <= 0) {
			throw new Error(__('Could not read font family.', 'onepress'));
		}
		installedKeys = await fetchInstalledFontFaceKeys(familyId);
	} else {
		isNewFamily = true;
		const familyFd = new FormData();
		const familyPayload = {
			slug: slugKey,
			name,
			fontFamily,
		};
		if (settings.preview && typeof settings.preview === 'string' && settings.preview.trim()) {
			familyPayload.preview = settings.preview.trim();
		}
		familyFd.append('font_family_settings', JSON.stringify(familyPayload));
		/** @type {{ id?: number }} */
		const created = await apiFetch({
			path: `${FONT_FAMILIES_PATH}?_locale=user`,
			method: 'POST',
			body: familyFd,
		});
		familyId = created && created.id != null ? Number(created.id) : NaN;
		if (!Number.isFinite(familyId) || familyId <= 0) {
			throw new Error(__('Could not create font family.', 'onepress'));
		}
	}

	const facesToInstall = faces.filter(
		(f) => !installedKeys.has(fontFaceInstallKey(f))
	);

	if (facesToInstall.length === 0) {
		return {
			noop: true,
			slug: slugKey,
			added: 0,
			skippedErrors: 0,
			name: name || slugKey,
		};
	}

	let added = 0;
	let skippedErrors = 0;

	for (const face of facesToInstall) {
		const faceFd = new FormData();
		faceFd.append('font_face_settings', JSON.stringify(face));
		try {
			await apiFetch({
				path: `${FONT_FAMILIES_PATH}/${familyId}/font-faces?_locale=user`,
				method: 'POST',
				body: faceFd,
			});
			added += 1;
		} catch (err) {
			const code =
				err && typeof err === 'object' && 'code' in err
					? String(/** @type {{ code?: string }} */(err).code)
					: '';
			if (code === 'rest_duplicate_font_face') {
				added += 1;
			} else {
				skippedErrors += 1;
			}
		}
	}

	if (isNewFamily && added === 0) {
		try {
			await apiFetch({
				path: `${FONT_FAMILIES_PATH}/${familyId}?force=true&_locale=user`,
				method: 'DELETE',
			});
		} catch {
			// best effort cleanup
		}
		throw new Error(__('Could not install any font styles.', 'onepress'));
	}

	return {
		noop: false,
		slug: slugKey,
		added,
		skippedErrors,
		name: name || slugKey,
	};
}

/**
 * @param {string} filename
 * @returns {string}
 */
function baseNameFromFileName(filename) {
	return String(filename || '')
		.replace(/\.[^.]+$/i, '')
		.trim();
}

/**
 * @param {string} base
 * @returns {string}
 */
function formatDisplayNameFromFileBase(base) {
	const s = String(base || '').trim();
	if (!s) {
		return '';
	}
	return s.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim() || s;
}

/**
 * @param {unknown} record opentype.js name table entry (string or locale map).
 * @returns {string}
 */
function pickEnglishFromNameRecord(record) {
	if (record == null) {
		return '';
	}
	if (typeof record === 'string') {
		return record.trim();
	}
	if (typeof record === 'object') {
		const o = /** @type {Record<string, string>} */ (record);
		const direct =
			o.en ||
			o['en-US'] ||
			(typeof o[1033] === 'string' ? o[1033] : '');
		if (direct && String(direct).trim()) {
			return String(direct).trim();
		}
		const first = Object.values(o).find(
			(x) => typeof x === 'string' && x.trim()
		);
		return typeof first === 'string' ? first.trim() : '';
	}
	return '';
}

/**
 * @param {string} s
 * @returns {string}
 */
function sanitizeFontMetadataName(s) {
	return String(s || '')
		.replace(/\\/g, '')
		.replace(/"/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

/**
 * Typographic / full name from font file (TTF, OTF, WOFF). WOFF2 is not parsed by opentype.js → null (caller falls back to filename).
 *
 * @param {File} file
 * @returns {Promise<string|null>}
 */
async function getDisplayNameFromFontFile(file) {
	try {
		const mod = await import('opentype.js');
		const parseFn =
			typeof mod.parse === 'function'
				? mod.parse
				: mod.default && typeof mod.default.parse === 'function'
					? mod.default.parse
					: null;
		if (!parseFn) {
			return null;
		}
		const buffer = await file.arrayBuffer();
		const font = parseFn(buffer);
		const n = font.names;
		if (!n || typeof n !== 'object') {
			return null;
		}

		const full = sanitizeFontMetadataName(
			pickEnglishFromNameRecord(n.fullName)
		);
		if (full) {
			return full;
		}

		const prefFam = sanitizeFontMetadataName(
			pickEnglishFromNameRecord(n.preferredFamily)
		);
		const prefSub = sanitizeFontMetadataName(
			pickEnglishFromNameRecord(n.preferredSubfamily)
		);
		const fam =
			prefFam ||
			sanitizeFontMetadataName(
				pickEnglishFromNameRecord(n.fontFamily)
			);
		const sub =
			prefSub ||
			sanitizeFontMetadataName(
				pickEnglishFromNameRecord(n.fontSubfamily)
			);

		if (
			fam &&
			sub &&
			!/^(regular|normal|book|roman)$/i.test(sub)
		) {
			return sanitizeFontMetadataName(`${fam} ${sub}`);
		}
		if (fam) {
			return fam;
		}

		const ps = pickEnglishFromNameRecord(n.postScriptName);
		if (ps) {
			return sanitizeFontMetadataName(ps.replace(/-/g, ' '));
		}

		return null;
	} catch {
		return null;
	}
}

/**
 * @param {File} file
 * @returns {boolean}
 */
function isAllowedFontFile(file) {
	return (
		file &&
		typeof file.name === 'string' &&
		/\.(woff2|woff|ttf|otf)$/i.test(file.name)
	);
}

/**
 * @param {string} baseSlug
 * @returns {Promise<string>}
 */
async function allocateUniqueFontFamilySlug(baseSlug) {
	const root =
		baseSlug && String(baseSlug).trim()
			? kebabCase(String(baseSlug).trim())
			: 'custom-font';
	let candidate = root;
	for (let n = 0; n < 500; n += 1) {
		/** @type {unknown} */
		const list = await apiFetch({
			path: `${FONT_FAMILIES_PATH}?slug=${encodeURIComponent(
				candidate
			)}&_locale=user`,
		});
		if (!Array.isArray(list) || list.length === 0) {
			return candidate;
		}
		candidate = `${root}-${n + 1}`;
	}
	throw new Error(
		__('Could not allocate a unique font slug.', 'onepress')
	);
}

/**
 * One uploaded file → one font family + one face (400 / normal), file stored in uploads/fonts.
 *
 * @param {File} file
 * @returns {Promise<void>}
 */
async function installUploadedFontFile(file) {
	if (!isAllowedFontFile(file)) {
		throw new Error(
			__('Invalid font file type.', 'onepress')
		);
	}
	const rawBase = baseNameFromFileName(file.name);
	const fromFontMeta = await getDisplayNameFromFontFile(file);
	const displayName =
		(fromFontMeta && fromFontMeta.length > 0 ? fromFontMeta : null) ||
		formatDisplayNameFromFileBase(rawBase) ||
		rawBase ||
		'Custom Font';
	const safeName = displayName.replace(/\\/g, '').replace(/"/g, '').trim();
	if (!safeName) {
		throw new Error(__('Invalid font file name.', 'onepress'));
	}
	const slug = await allocateUniqueFontFamilySlug(
		kebabCase(safeName) || kebabCase(rawBase) || 'custom-font'
	);
	const fontFamilyCss = `"${safeName}", sans-serif`;

	const familyFd = new FormData();
	familyFd.append(
		'font_family_settings',
		JSON.stringify({
			slug,
			name: safeName,
			fontFamily: fontFamilyCss,
		})
	);
	/** @type {{ id?: number }} */
	const created = await apiFetch({
		path: `${FONT_FAMILIES_PATH}?_locale=user`,
		method: 'POST',
		body: familyFd,
	});
	const familyId =
		created && created.id != null ? Number(created.id) : NaN;
	if (!Number.isFinite(familyId) || familyId <= 0) {
		throw new Error(__('Could not create font family.', 'onepress'));
	}

	const fileId = 'file-0-0';
	const faceFd = new FormData();
	faceFd.append(fileId, file, file.name);
	faceFd.append(
		'font_face_settings',
		JSON.stringify({
			fontFamily: safeName,
			fontWeight: '400',
			fontStyle: 'normal',
			src: fileId,
		})
	);
	try {
		await apiFetch({
			path: `${FONT_FAMILIES_PATH}/${familyId}/font-faces?_locale=user`,
			method: 'POST',
			body: faceFd,
		});
	} catch (err) {
		try {
			await apiFetch({
				path: `${FONT_FAMILIES_PATH}/${familyId}?force=true&_locale=user`,
				method: 'DELETE',
			});
		} catch {
			// best effort cleanup
		}
		throw err;
	}
}

/**
 * @param {Array<unknown>} items REST collection items.
 * @returns {Record<string, object>}
 */
export function webfontsMapFromFontFamiliesRest(items) {
	const out = {};
	if (!Array.isArray(items)) {
		return out;
	}
	for (const item of items) {
		if (!item || typeof item !== 'object') {
			continue;
		}
		const settings = item.font_family_settings;
		if (!settings || typeof settings !== 'object') {
			continue;
		}
		const slug = String(settings.slug || '').trim();
		if (!slug) {
			continue;
		}
		const id = `wp-${slug}`;
		const name = String(settings.name || slug).trim() || slug;
		const fontFamily =
			typeof settings.fontFamily === 'string' && settings.fontFamily.trim()
				? settings.fontFamily.trim()
				: `"${name.replace(/"/g, '\\"')}", sans-serif`;
		out[id] = {
			name,
			fontFamily,
			font_type: 'wp_font_family',
			font_weights: ['400', '400italic', '700', '700italic'],
			subsets: [],
			url: '',
		};
	}
	return out;
}

/**
 * @returns {Promise<Array>}
 */
async function fetchAllFontFamiliesFromRest() {
	const all = [];
	let page = 1;
	const perPage = 100;
	for (; ;) {
		const path = `${FONT_FAMILIES_PATH}?per_page=${perPage}&page=${page}&_locale=user`;
		/** @type {unknown} */
		const batch = await apiFetch({ path });
		if (!Array.isArray(batch) || batch.length === 0) {
			break;
		}
		all.push(...batch);
		if (batch.length < perPage) {
			break;
		}
		page += 1;
	}
	return all;
}

/**
 * @returns {Promise<Record<string, object>>}
 */
export async function fetchFontFamiliesWebfontsMap() {
	const items = await fetchAllFontFamiliesFromRest();
	return webfontsMapFromFontFamiliesRest(items);
}

let fontFamiliesMapLoadPromise = null;

/**
 * One shared REST crawl per Customizer load for all typography controls.
 *
 * @returns {Promise<Record<string, object>>}
 */
export function loadFontFamiliesWebfontsMap() {
	if (!fontFamiliesMapLoadPromise) {
		fontFamiliesMapLoadPromise = fetchFontFamiliesWebfontsMap().catch(() => ({}));
	}
	return fontFamiliesMapLoadPromise;
}

/** Clears cached font map so the next `loadFontFamiliesWebfontsMap()` refetches (e.g. after installing a family). */
export function resetFontFamiliesLoadCache() {
	fontFamiliesMapLoadPromise = null;
}

export function pickerPreviewLinkId(controlId, fontId) {
	return `${PICKER_LINK_PREFIX}${controlId}-${fontId}`;
}

export function removeAllPickerPreviewLinks(controlId) {
	const prefix = `${PICKER_LINK_PREFIX}${controlId}-`;
	document.querySelectorAll('link[id]').forEach((el) => {
		if (el.id.startsWith(prefix)) {
			el.remove();
		}
	});
}

function removePickerPreviewLink(controlId, fontId) {
	const id = pickerPreviewLinkId(controlId, fontId);
	document.getElementById(id)?.remove();
}

function ensurePickerPreviewLink(controlId, fontId, url) {
	if (!url) {
		return;
	}
	const id = pickerPreviewLinkId(controlId, fontId);
	if (document.getElementById(id)) {
		return;
	}
	const link = document.createElement('link');
	link.id = id;
	link.rel = 'stylesheet';
	link.href = url;
	document.head.appendChild(link);
}

const SELECTED_LINK_PREFIX = 'onepress-typo-selected-';

export function selectedFontLinkId(controlId) {
	return `${SELECTED_LINK_PREFIX}${controlId}`;
}

export function removeSelectedFontLink(controlId) {
	document.getElementById(selectedFontLinkId(controlId))?.remove();
}

/** Keep a single stylesheet in the Customizer shell so the closed “font selector” row can render the chosen Google font. */
export function setSelectedGoogleFontLink(controlId, fontId, url) {
	const id = selectedFontLinkId(controlId);
	const existing = document.getElementById(id);
	if (!url || !fontId) {
		existing?.remove();
		return;
	}
	if (existing && existing.getAttribute('href') === url) {
		return;
	}
	existing?.remove();
	const link = document.createElement('link');
	link.id = id;
	link.rel = 'stylesheet';
	link.href = url;
	document.head.appendChild(link);
}

function FontPickerRow({
	controlId,
	fontId,
	name,
	fontMeta,
	isSelected,
	onPick,
	scrollRoot,
}) {
	const rowRef = useRef(null);
	const needsGoogleSheet =
		fontMeta &&
		fontMeta.font_type === 'google' &&
		typeof fontMeta.url === 'string' &&
		fontMeta.url.length > 0;

	useEffect(() => {
		if (!needsGoogleSheet || !scrollRoot) {
			return undefined;
		}
		const el = rowRef.current;
		if (!el) {
			return undefined;
		}
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						ensurePickerPreviewLink(controlId, fontId, fontMeta.url);
					} else {
						removePickerPreviewLink(controlId, fontId);
					}
				});
			},
			{
				root: scrollRoot,
				rootMargin: '80px 0px',
				threshold: 0.01,
			}
		);
		io.observe(el);
		return () => {
			io.disconnect();
			removePickerPreviewLink(controlId, fontId);
		};
	}, [needsGoogleSheet, controlId, fontId, fontMeta?.url, scrollRoot]);

	const stack =
		fontMeta && typeof fontMeta.fontFamily === 'string' && fontMeta.fontFamily.trim()
			? fontMeta.fontFamily
			: `"${name}", sans-serif`;

	return (
		<span
			ref={rowRef}
			className={
				'row' +
				(isSelected ? ' is-selected' : '')
			}
			onClick={() => onPick(fontId)}
		>
			{/* <span
				className="row-name"
			>
				{name}
			</span> */}
			<span
				className="sample"
				style={{ fontFamily: stack }}
			>
				{name}
			</span>
		</span>
	);
}

/** @typedef {'library' | 'upload' | 'install'} ManageFontsTab */

/**
 * Full-screen overlay (portal) to browse installed families, upload placeholder, and Google collection.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {() => void} [props.onFontLibraryRefresh] Refresh Customizer font map after install.
 */
function ManageFontsModal({ open, onClose, onFontLibraryRefresh }) {
	const [tab, setTab] = useState('library');
	const [libraryItems, setLibraryItems] = useState([]);
	const [libraryLoading, setLibraryLoading] = useState(false);
	const [libraryQuery, setLibraryQuery] = useState('');

	const [installCollection, setInstallCollection] = useState(null);
	const [installLoading, setInstallLoading] = useState(false);
	const [installError, setInstallError] = useState(false);
	const [installQuery, setInstallQuery] = useState('');
	const [installingSlug, setInstallingSlug] = useState('');
	const [installActionMessage, setInstallActionMessage] = useState('');
	const [removingFamilyId, setRemovingFamilyId] = useState(null);
	const [libraryActionMessage, setLibraryActionMessage] = useState('');
	const [uploadDragging, setUploadDragging] = useState(false);
	const [uploadBusy, setUploadBusy] = useState(false);
	const [uploadActionMessage, setUploadActionMessage] = useState('');
	const [customizeControlsWidth, setCustomizeControlsWidth] = useState(300);

	const closeBtnRef = useRef(null);
	const uploadInputRef = useRef(null);
	const uploadRunRef = useRef(false);
	const installGenRef = useRef(0);

	useEffect(() => {
		if (!open) {
			return undefined;
		}
		document.body.classList.add('onepress-manage-fonts-modal-open');
		return () => {
			document.body.classList.remove('onepress-manage-fonts-modal-open');
		};
	}, [open]);

	useLayoutEffect(() => {
		if (!open) {
			return undefined;
		}
		const measure = () => {
			const el = document.getElementById('customize-controls');
			const w =
				el &&
					typeof el.offsetWidth === 'number' &&
					el.offsetWidth > 0
					? el.offsetWidth
					: 300;
			setCustomizeControlsWidth(w);
		};
		measure();
		const el = document.getElementById('customize-controls');
		let ro = null;
		if (el && typeof ResizeObserver !== 'undefined') {
			ro = new ResizeObserver(measure);
			ro.observe(el);
		}
		window.addEventListener('resize', measure);
		return () => {
			ro?.disconnect();
			window.removeEventListener('resize', measure);
		};
	}, [open]);

	useLayoutEffect(() => {
		if (open) {
			setTab('library');
			setLibraryQuery('');
			setInstallQuery('');
			setInstallActionMessage('');
			setInstallingSlug('');
			setLibraryActionMessage('');
			setRemovingFamilyId(null);
			setUploadActionMessage('');
			setUploadDragging(false);
			setUploadBusy(false);
		} else {
			installGenRef.current += 1;
			setInstallCollection(null);
			setInstallLoading(false);
			setInstallError(false);
			setInstallActionMessage('');
			setInstallingSlug('');
			setLibraryActionMessage('');
			setRemovingFamilyId(null);
			setUploadActionMessage('');
			setUploadDragging(false);
			setUploadBusy(false);
		}
	}, [open]);

	const reloadLibrarySnapshot = useCallback(() => {
		setLibraryLoading(true);
		return fetchAllFontFamiliesFromRest()
			.then((items) => {
				setLibraryItems(Array.isArray(items) ? items : []);
			})
			.catch(() => {
				setLibraryItems([]);
			})
			.finally(() => {
				setLibraryLoading(false);
			});
	}, []);

	useEffect(() => {
		if (!open) {
			return undefined;
		}
		reloadLibrarySnapshot();
	}, [open, reloadLibrarySnapshot]);

	useEffect(() => {
		if (!open || tab !== 'install') {
			return undefined;
		}
		if (installCollection !== null || installError) {
			return undefined;
		}
		const gen = ++installGenRef.current;
		setInstallLoading(true);
		setInstallError(false);
		apiFetch({ path: FONT_COLLECTION_GOOGLE_PATH })
			.then((data) => {
				if (installGenRef.current !== gen) {
					return;
				}
				setInstallCollection(
					data && typeof data === 'object' ? data : null
				);
				setInstallLoading(false);
			})
			.catch(() => {
				if (installGenRef.current !== gen) {
					return;
				}
				setInstallError(true);
				setInstallLoading(false);
			});
	}, [open, tab, installCollection, installError]);

	const installFamilies = useMemo(() => {
		const c = installCollection;
		if (!c || !Array.isArray(c.font_families)) {
			return [];
		}
		return c.font_families;
	}, [installCollection]);

	const libQ = libraryQuery.trim().toLowerCase();
	const filteredLibrary = useMemo(() => {
		if (!libQ) {
			return libraryItems;
		}
		return libraryItems.filter((item) =>
			displayNameFromFontFamilyItem(item).toLowerCase().includes(libQ)
		);
	}, [libraryItems, libQ]);

	const handleRemoveLibraryFont = useCallback(
		async (item) => {
			if (!item || typeof item !== 'object' || item.id == null) {
				return;
			}
			const id = Number(item.id);
			if (!Number.isFinite(id) || id <= 0 || removingFamilyId != null) {
				return;
			}
			const name = displayNameFromFontFamilyItem(item);
			const label = name || __('this font', 'onepress');
			if (
				!window.confirm(
					sprintf(
						/* translators: %s: Font family name. */
						__(
							'Remove "%s" from your library? This cannot be undone.',
							'onepress'
						),
						label
					)
				)
			) {
				return;
			}
			setRemovingFamilyId(id);
			setLibraryActionMessage('');
			try {
				await apiFetch({
					path: `${FONT_FAMILIES_PATH}/${id}?force=true&_locale=user`,
					method: 'DELETE',
				});
				await reloadLibrarySnapshot();
				if (typeof onFontLibraryRefresh === 'function') {
					onFontLibraryRefresh();
				}
				setLibraryActionMessage(
					sprintf(
						/* translators: %s: Font family name. */
						__('"%s" was removed.', 'onepress'),
						label
					)
				);
			} catch (e) {
				setLibraryActionMessage(
					restErrorMessage(e) ||
					__('Could not remove font.', 'onepress')
				);
			} finally {
				setRemovingFamilyId(null);
			}
		},
		[removingFamilyId, reloadLibrarySnapshot, onFontLibraryRefresh]
	);

	const processUploadFiles = useCallback(
		async (incoming) => {
			if (uploadRunRef.current) {
				return;
			}
			const files = Array.isArray(incoming)
				? incoming
				: incoming
					? Array.from(incoming)
					: [];
			const valid = files.filter(isAllowedFontFile);
			if (valid.length === 0) {
				if (files.length > 0) {
					setUploadActionMessage(
						__(
							'No valid font files. Use .woff2, .woff, .ttf, or .otf.',
							'onepress'
						)
					);
				}
				return;
			}
			uploadRunRef.current = true;
			setUploadBusy(true);
			setUploadActionMessage('');
			let ok = 0;
			/** @type {{ name: string, msg: string }[]} */
			const fails = [];
			try {
				for (const file of valid) {
					try {
						await installUploadedFontFile(file);
						ok += 1;
					} catch (e) {
						fails.push({
							name: file.name,
							msg:
								restErrorMessage(e) ||
								__(
									'Could not add font.',
									'onepress'
								),
						});
					}
				}
				await reloadLibrarySnapshot();
				if (typeof onFontLibraryRefresh === 'function') {
					onFontLibraryRefresh();
				}
				if (fails.length === 0) {
					setUploadActionMessage(
						sprintf(
							/* translators: %d: Number of fonts added. */
							_n(
								'Added %d font to your library.',
								'Added %d fonts to your library.',
								ok,
								'onepress'
							),
							ok
						)
					);
				} else {
					const failSummary = fails
						.slice(0, 4)
						.map((f) => `${f.name}: ${f.msg}`)
						.join(' · ');
					const more =
						fails.length > 4
							? sprintf(
								/* translators: %d: Additional failure count. */
								__(
									' …and %d more.',
									'onepress'
								),
								fails.length - 4
							)
							: '';
					if (ok > 0) {
						setUploadActionMessage(
							sprintf(
								/* translators: 1: Added count, 2: Fail count, 3: Details, 4: Optional "and N more". */
								__(
									'Added %1$d. Failed (%2$d): %3$s%4$s',
									'onepress'
								),
								ok,
								fails.length,
								failSummary,
								more
							)
						);
					} else {
						setUploadActionMessage(
							sprintf(
								/* translators: 1: Error details, 2: Optional suffix. */
								__(
									'Failed to add fonts: %1$s%2$s',
									'onepress'
								),
								failSummary,
								more
							)
						);
					}
				}
			} finally {
				uploadRunRef.current = false;
				setUploadBusy(false);
			}
		},
		[reloadLibrarySnapshot, onFontLibraryRefresh]
	);

	const instQ = installQuery.trim().toLowerCase();
	const filteredInstall = useMemo(() => {
		if (!instQ) {
			return installFamilies;
		}
		return installFamilies.filter((item) => {
			const name = displayNameFromFontFamilyItem(item).toLowerCase();
			const cats = categoriesLabelFromCollectionItem(item).toLowerCase();
			return name.includes(instQ) || cats.includes(instQ);
		});
	}, [installFamilies, instQ]);

	const handleInstallCollectionFont = useCallback(
		async (item) => {
			if (installingSlug) {
				return;
			}
			const settings =
				item && typeof item === 'object' ? item.font_family_settings : null;
			const slugRaw =
				settings && typeof settings === 'object'
					? String(settings.slug || '').trim()
					: '';
			if (!slugRaw) {
				return;
			}
			const slugKey = kebabCase(slugRaw);
			setInstallingSlug(slugKey);
			setInstallActionMessage('');
			try {
				const result = await installGoogleCollectionFontFamily(item);
				await reloadLibrarySnapshot();
				if (typeof onFontLibraryRefresh === 'function') {
					onFontLibraryRefresh();
				}
				if (result.noop) {
					setInstallActionMessage(
						sprintf(
							/* translators: %s: Font family name. */
							__(
								'"%s" is already installed with all styles.',
								'onepress'
							),
							result.name
						)
					);
				} else if (result.skippedErrors > 0) {
					setInstallActionMessage(
						sprintf(
							/* translators: 1: Font name, 2: Number installed, 3: Number failed. */
							__(
								'"%1$s": installed %2$d style(s); %3$d failed.',
								'onepress'
							),
							result.name,
							result.added,
							result.skippedErrors
						)
					);
				} else {
					setInstallActionMessage(
						sprintf(
							/* translators: 1: Font name, 2: Number of styles. */
							__(
								'"%1$s" installed (%2$d style(s)).',
								'onepress'
							),
							result.name,
							result.added
						)
					);
				}
			} catch (e) {
				setInstallActionMessage(
					restErrorMessage(e) ||
					__('Could not install font.', 'onepress')
				);
			} finally {
				setInstallingSlug('');
			}
		},
		[
			installingSlug,
			reloadLibrarySnapshot,
			onFontLibraryRefresh,
		]
	);

	useEffect(() => {
		if (!open) {
			return undefined;
		}
		const id = window.requestAnimationFrame(() => {
			closeBtnRef.current?.focus();
		});
		return () => window.cancelAnimationFrame(id);
	}, [open]);

	if (!open) {
		return null;
	}

	if (typeof document === 'undefined' || !document.body) {
		return null;
	}

	const tabs = /** @type {const} */ ([
		{ id: 'library', label: __('Library', 'onepress') },
		{ id: 'upload', label: __('Upload', 'onepress') },
		{ id: 'install', label: __('Install', 'onepress') },
	]);

	const onDialogKeyDown = (e) => {
		if (e.key === 'Escape') {
			e.stopPropagation();
			onClose();
		}
	};

	const modal = (
		<div
			className="onepress-manage-fonts-portal"
			role="presentation"
			style={
				/** @type {React.CSSProperties} */ ({
					'--onepress-mf-controls-left': `${customizeControlsWidth}px`,
				})
			}
		>
			<button
				type="button"
				className="onepress-manage-fonts-portal__backdrop"
				aria-label={__('Close', 'onepress')}
				onClick={onClose}
			/>
			<div
				className="onepress-manage-fonts-portal__dialog"
				role="dialog"
				aria-modal="true"
				aria-labelledby="onepress-manage-fonts-title"
				onMouseDown={(e) => e.stopPropagation()}
				onKeyDown={onDialogKeyDown}
			>
				<div className="onepress-manage-fonts-portal__head">
					<h2
						id="onepress-manage-fonts-title"
						className="onepress-manage-fonts-portal__title"
					>
						{__('Manage fonts', 'onepress')}
					</h2>
					<button
						ref={closeBtnRef}
						type="button"
						className="button-link onepress-manage-fonts-portal__close"
						onClick={onClose}
					>
						{__('Close', 'onepress')}
					</button>
				</div>
				<div
					className="onepress-manage-fonts-portal__tabs"
					role="tablist"
					aria-label={__('Font sources', 'onepress')}
				>
					{tabs.map((t) => (
						<button
							key={t.id}
							type="button"
							role="tab"
							id={`onepress-manage-fonts-tab-${t.id}`}
							aria-selected={tab === t.id}
							aria-controls={`onepress-manage-fonts-panel-${t.id}`}
							tabIndex={tab === t.id ? 0 : -1}
							className={
								'onepress-manage-fonts-portal__tab' +
								(tab === t.id ? ' is-active' : '')
							}
							onClick={() => setTab(/** @type {ManageFontsTab} */(t.id))}
						>
							{t.label}
						</button>
					))}
				</div>
				<div className="onepress-manage-fonts-portal__body">
					{tab === 'library' && (
						<div
							id="onepress-manage-fonts-panel-library"
							role="tabpanel"
							aria-labelledby="onepress-manage-fonts-tab-library"
							className="onepress-manage-fonts-portal__panel"
						>
							<p className="onepress-manage-fonts-portal__hint">
								{__(
									'Fonts currently available on your site (WordPress font families).',
									'onepress'
								)}
							</p>
							{libraryActionMessage ? (
								<p
									className="onepress-manage-fonts-portal__feedback"
									role="status"
								>
									{libraryActionMessage}
								</p>
							) : null}
							<label
								className="screen-reader-text"
								htmlFor="onepress-manage-fonts-library-search"
							>
								{__('Search library', 'onepress')}
							</label>
							<input
								id="onepress-manage-fonts-library-search"
								type="search"
								className="onepress-manage-fonts-portal__search"
								placeholder={__('Search…', 'onepress')}
								value={libraryQuery}
								onChange={(e) => setLibraryQuery(e.target.value)}
							/>
							{libraryLoading ? (
								<p className="onepress-manage-fonts-portal__status" role="status">
									{__('Loading…', 'onepress')}
								</p>
							) : filteredLibrary.length === 0 ? (
								<p className="onepress-manage-fonts-portal__status" role="status">
									{__(
										'No fonts in your library yet.',
										'onepress'
									)}
								</p>
							) : (
								<ul
									className="onepress-manage-fonts-portal__list"
									aria-label={__('Installed font families', 'onepress')}
								>
									{filteredLibrary.map((item, index) => {
										const name = displayNameFromFontFamilyItem(item);
										const key =
											item &&
												typeof item === 'object' &&
												'id' in item &&
												item.id != null
												? `lib-${item.id}`
												: `lib-${index}-${name}`;
										const rowId =
											item &&
												typeof item === 'object' &&
												item.id != null
												? Number(item.id)
												: NaN;
										const rowBusy =
											Number.isFinite(rowId) &&
											removingFamilyId === rowId;
										return (
											<li key={key}>
												<div className="onepress-manage-fonts-portal__list-row-main">
													<span className="onepress-manage-fonts-portal__list-name">
														{name ||
															__('(Unnamed font)', 'onepress')}
													</span>
												</div>
												<div className="onepress-manage-fonts-portal__list-row-actions">
													<button
														type="button"
														className="button button-small onepress-manage-fonts-portal__btn-remove"
														disabled={
															!Number.isFinite(rowId) ||
															removingFamilyId != null ||
															libraryLoading
														}
														onClick={() =>
															handleRemoveLibraryFont(item)
														}
													>
														{rowBusy
															? __(
																'Removing…',
																'onepress'
															)
															: __(
																'Remove',
																'onepress'
															)}
													</button>
												</div>
											</li>
										);
									})}
								</ul>
							)}
						</div>
					)}
					{tab === 'upload' && (
						<div
							id="onepress-manage-fonts-panel-upload"
							role="tabpanel"
							aria-labelledby="onepress-manage-fonts-tab-upload"
							className="onepress-manage-fonts-portal__panel"
						>
							<p className="onepress-manage-fonts-portal__hint">
								{__(
									'Drag font files here or choose files. The name is read from the font when possible (TTF, OTF, WOFF); otherwise the file name is used. WOFF2 uses the file name. Each file becomes one family (400, normal).',
									'onepress'
								)}
							</p>
							{uploadActionMessage ? (
								<p
									className="onepress-manage-fonts-portal__feedback"
									role="status"
								>
									{uploadActionMessage}
								</p>
							) : null}
							<div
								className={
									'onepress-manage-fonts-upload-zone' +
									(uploadDragging ? ' is-dragging' : '') +
									(uploadBusy ? ' is-busy' : '')
								}
								onDragEnter={(e) => {
									e.preventDefault();
									e.stopPropagation();
									if (!uploadBusy) {
										setUploadDragging(true);
									}
								}}
								onDragOver={(e) => {
									e.preventDefault();
									e.stopPropagation();
									if (!uploadBusy) {
										e.dataTransfer.dropEffect = 'copy';
									}
								}}
								onDragLeave={(e) => {
									e.preventDefault();
									e.stopPropagation();
									const { currentTarget, relatedTarget } = e;
									if (
										relatedTarget &&
										currentTarget.contains(
											/** @type {Node} */(relatedTarget)
										)
									) {
										return;
									}
									setUploadDragging(false);
								}}
								onDrop={(e) => {
									e.preventDefault();
									e.stopPropagation();
									setUploadDragging(false);
									if (!uploadBusy && e.dataTransfer?.files) {
										processUploadFiles(e.dataTransfer.files);
									}
								}}
								role="group"
								aria-label={__(
									'Drop font files here or use the select files button.',
									'onepress'
								)}
							>
								<input
									ref={uploadInputRef}
									type="file"
									accept=".woff2,.woff,.ttf,.otf,font/woff2,font/woff"
									multiple
									className="onepress-manage-fonts-upload-input"
									disabled={uploadBusy}
									onChange={(e) => {
										const { files } = e.target;
										if (files?.length) {
											processUploadFiles(files);
										}
										e.target.value = '';
									}}
									onClick={(e) => e.stopPropagation()}
								/>
								<p className="onepress-manage-fonts-upload-zone__title">
									{uploadBusy
										? __(
											'Uploading…',
											'onepress'
										)
										: __(
											'Drop font files here',
											'onepress'
										)}
								</p>
								<p className="onepress-manage-fonts-upload-zone__types">
									{__(
										'Supported: .woff2, .woff, .ttf, .otf',
										'onepress'
									)}
								</p>
								<button
									type="button"
									className="button onepress-manage-fonts-upload-zone__browse"
									disabled={uploadBusy}
									onClick={(e) => {
										e.stopPropagation();
										uploadInputRef.current?.click();
									}}
								>
									{__(
										'Select files',
										'onepress'
									)}
								</button>
							</div>
						</div>
					)}
					{tab === 'install' && (
						<div
							id="onepress-manage-fonts-panel-install"
							role="tabpanel"
							aria-labelledby="onepress-manage-fonts-tab-install"
							className="onepress-manage-fonts-portal__panel"
						>
							<p className="onepress-manage-fonts-portal__hint">
								{__(
									'Install fonts from the Google Fonts collection into your site library (files stay on your server).',
									'onepress'
								)}
							</p>
							{installActionMessage ? (
								<p
									className="onepress-manage-fonts-portal__feedback"
									role="status"
								>
									{installActionMessage}
								</p>
							) : null}
							<label
								className="screen-reader-text"
								htmlFor="onepress-manage-fonts-install-search"
							>
								{__('Search fonts to install', 'onepress')}
							</label>
							<input
								id="onepress-manage-fonts-install-search"
								type="search"
								className="onepress-manage-fonts-portal__search"
								placeholder={__('Search…', 'onepress')}
								value={installQuery}
								onChange={(e) => setInstallQuery(e.target.value)}
								disabled={installLoading}
							/>
							{installLoading ? (
								<p className="onepress-manage-fonts-portal__status" role="status">
									{__('Loading…', 'onepress')}
								</p>
							) : installError ? (
								<p className="onepress-manage-fonts-portal__status" role="alert">
									{__(
										'Could not load the font collection.',
										'onepress'
									)}
								</p>
							) : installFamilies.length === 0 ? (
								<p className="onepress-manage-fonts-portal__status" role="status">
									{__(
										'No fonts in this collection.',
										'onepress'
									)}
								</p>
							) : filteredInstall.length === 0 ? (
								<p className="onepress-manage-fonts-portal__status" role="status">
									{__(
										'No fonts match your search.',
										'onepress'
									)}
								</p>
							) : (
								<ul
									className="onepress-manage-fonts-portal__list"
									aria-label={__(
										'Google Fonts collection',
										'onepress'
									)}
								>
									{filteredInstall.map((item, index) => {
										const name = displayNameFromFontFamilyItem(item);
										const cats = categoriesLabelFromCollectionItem(item);
										const slugRaw =
											item &&
												typeof item === 'object' &&
												item.font_family_settings &&
												typeof item.font_family_settings === 'object' &&
												item.font_family_settings.slug
												? String(item.font_family_settings.slug).trim()
												: '';
										const slugKey = slugRaw ? kebabCase(slugRaw) : '';
										const rowBusy = Boolean(
											slugKey && installingSlug === slugKey
										);
										return (
											<li
												key={slugKey || `${name}-${index}`}
											>
												<div className="onepress-manage-fonts-portal__list-row-main">
													<span className="onepress-manage-fonts-portal__list-name">
														{name ||
															__('(Unnamed font)', 'onepress')}
													</span>
													{cats ? (
														<span className="onepress-manage-fonts-portal__list-meta">
															{cats}
														</span>
													) : null}
												</div>
												<div className="onepress-manage-fonts-portal__list-row-actions">
													<button
														type="button"
														className="button button-small"
														disabled={
															!slugKey ||
															Boolean(installingSlug) ||
															installLoading
														}
														onClick={() =>
															handleInstallCollectionFont(item)
														}
													>
														{rowBusy
															? __('Installing…', 'onepress')
															: __('Install', 'onepress')}
													</button>
												</div>
											</li>
										);
									})}
								</ul>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);

	return createPortal(modal, document.body);
}

/**
 * Font list UI (inline dropdown under font family row, or legacy modal wrapper).
 *
 * @param {object} props
 * @param {'dropdown'|'modal'} [props.variant]
 * @param {() => void} [props.onFontLibraryRefresh] After font install, refresh picker webfonts map.
 */
export function FontPickerPanel({
	open,
	controlId,
	webfonts,
	fontGroups,
	currentFontId,
	defaultLabel,
	onClose,
	onSelectFont,
	onFontLibraryRefresh,
	variant = 'dropdown',
}) {
	const searchRef = useRef(null);
	const [scrollRoot, setScrollRoot] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [manageFontsOpen, setManageFontsOpen] = useState(false);

	const normalizedQuery = searchQuery.trim().toLowerCase();

	const filteredGroups = useMemo(() => {
		if (!normalizedQuery) {
			return fontGroups;
		}
		return fontGroups
			.map((g) => ({
				...g,
				fonts: g.fonts.filter((f) =>
					String(f.name).toLowerCase().includes(normalizedQuery)
				),
			}))
			.filter((g) => g.fonts.length > 0);
	}, [fontGroups, normalizedQuery]);

	useLayoutEffect(() => {
		if (open) {
			setSearchQuery('');
		}
	}, [open]);

	useEffect(() => {
		if (!open) {
			return undefined;
		}
		const id = window.requestAnimationFrame(() => {
			const el = searchRef.current;
			if (el) {
				el.focus();
				el.select();
			}
		});
		return () => window.cancelAnimationFrame(id);
	}, [open]);

	useEffect(() => {
		if (!open) {
			return undefined;
		}
		const onKey = (e) => {
			if (e.key !== 'Escape') {
				return;
			}
			if (manageFontsOpen) {
				setManageFontsOpen(false);
				e.preventDefault();
				return;
			}
			if (searchQuery.trim()) {
				setSearchQuery('');
				e.preventDefault();
				return;
			}
			onClose();
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [open, onClose, searchQuery, manageFontsOpen]);

	if (!open) {
		return null;
	}

	const panelClass =
		variant === 'dropdown'
			? 'onepress-font-picker-dropdown'
			: 'onepress-font-picker-modal';

	return (
		<div
			className={panelClass}
			role="dialog"
			aria-modal={variant === 'modal'}
			aria-label={__('Font selector', 'onepress')}
			onMouseDown={(e) => e.stopPropagation()}
		>
			{manageFontsOpen && (
				<ManageFontsModal
					open={manageFontsOpen}
					onClose={() => setManageFontsOpen(false)}
					onFontLibraryRefresh={onFontLibraryRefresh}
				/>
			)}
			{/* <div className="head">
					<span className="title">
						{__( 'Font selector', 'onepress' )}
					</span>
					<button
						type="button"
						className="close button-link"
						onClick={onClose}
					>
						{__( 'Close', 'onepress' )}
					</button>
				</div> */}
			<div className="search-wrap onepress-font-picker-search-row">
				<label
					className="screen-reader-text"
					htmlFor={`onepress-typo-font-search-${controlId}`}
				>
					{__('Search fonts', 'onepress')}
				</label>
				<input
					ref={searchRef}
					id={`onepress-typo-font-search-${controlId}`}
					type="search"
					className="search"
					placeholder={__('Search fonts…', 'onepress')}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					autoComplete="off"
					autoCorrect="off"
					spellCheck="false"
				/>
				<button
					type="button"
					className="flex items-center justify-center"
					onClick={(e) => {
						e.stopPropagation();
						setManageFontsOpen(true);
					}}
					title={__('Manage fonts', 'onepress')}
				>
					<span class="dashicons dashicons-list-view"></span>

				</button>
			</div>
			{/* <div
					className="categories"
					role="tablist"
					aria-label={__( 'Font categories', 'onepress' )}
				>
					{categoryTabs.map((tab) => (
						<button
							key={tab.key}
							type="button"
							role="tab"
							aria-selected={categoryKey === tab.key}
							className={
								'cat' +
								(categoryKey === tab.key
									? ' is-active'
									: '')
							}
							onClick={() => setCategoryKey(tab.key)}
						>
							{tab.label}
						</button>
					))}
				</div> */}
			<div
				className="scroll"
				ref={setScrollRoot}
			>
				<span
					className={
						'row row-default' +
						(!currentFontId ? ' is-selected' : '')
					}
					onClick={() => onSelectFont('')}
				>
					<span className="row-name">
						{defaultLabel}
					</span>
				</span>
				{filteredGroups.length === 0 ? (
					<p className="empty" role="status">
						{__('No fonts found.', 'onepress')}
					</p>
				) : (
					filteredGroups.map((g) => (
						<div key={g.type} className="group">
							{/* <div className="group-label">
									{g.type}
								</div> */}
							{g.fonts.map((f) => (
								<FontPickerRow
									key={f.id}
									controlId={controlId}
									fontId={f.id}
									name={f.name}
									fontMeta={webfonts[f.id]}
									isSelected={currentFontId === f.id}
									onPick={onSelectFont}
									scrollRoot={scrollRoot}
								/>
							))}
						</div>
					))
				)}
			</div>
		</div>
	);
}

/** @deprecated Use FontPickerPanel; kept for external imports. */
export function FontPickerModal(props) {
	return <FontPickerPanel {...props} />;
}
