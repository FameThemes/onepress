/**
 * Font picker: modal list with lazy-loaded Google Font previews in the Customizer document.
 */
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const PICKER_LINK_PREFIX = 'onepress-typo-picker-';

/** Google Fonts API `category` values (kebab-case). */
const GOOGLE_CATEGORY_KEYS = [
	'sans-serif',
	'serif',
	'monospace',
	'display',
	'handwriting',
];

const SYSTEM_CATEGORY = 'system';

/**
 * @param {Array<{ type: string, fonts: Array<{ id: string, name: string }> }>} groups
 * @param {Record<string, object>} webfonts
 * @param {string} categoryKey  'all' | 'system' | GOOGLE_CATEGORY_KEYS
 */
function applyCategoryFilter(groups, webfonts, categoryKey) {
	if (!categoryKey || categoryKey === 'all') {
		return groups;
	}
	return groups
		.map((g) => {
			if (categoryKey === SYSTEM_CATEGORY) {
				if (g.type !== 'default') {
					return { ...g, fonts: [] };
				}
				return g;
			}
			if (g.type !== 'google') {
				return { ...g, fonts: [] };
			}
			const cat = String(categoryKey).toLowerCase();
			return {
				...g,
				fonts: g.fonts.filter((f) => {
					const meta = webfonts[f.id];
					if (!meta || meta.font_type !== 'google') {
						return false;
					}
					return (
						String(meta.category || '').toLowerCase() === cat
					);
				}),
			};
		})
		.filter((g) => g.fonts.length > 0);
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
	sampleText,
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
		fontMeta && fontMeta.font_type === 'default'
			? `"${name}", sans-serif`
			: `"${name}", sans-serif`;

	return (
		<span
			ref={rowRef}
			className={
				'fontpicker-row' +
				(isSelected ? ' is-selected' : '')
			}
			onClick={() => onPick(fontId)}
		>
			{/* <span
				className="fontpicker-row__name"
			>
				{name}
			</span> */}
			<span
				className="fontpicker-row__sample"
				style={{ fontFamily: stack }}
			>
				{name}
				{/* {sampleText} */}
			</span>
		</span>
	);
}

/**
 * Font list UI (inline dropdown under font family row, or legacy modal wrapper).
 *
 * @param {object} props
 * @param {'dropdown'|'modal'} [props.variant]
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
	variant = 'dropdown',
}) {
	const searchRef = useRef(null);
	const [scrollRoot, setScrollRoot] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [categoryKey, setCategoryKey] = useState('all');
	const sampleText = __(
		'The quick brown fox jumps over the lazy dog.',
		'onepress'
	);

	const normalizedQuery = searchQuery.trim().toLowerCase();

	const categoryTabs = useMemo(() => {
		const tabs = [
			{ key: 'all', label: __( 'All', 'onepress' ) },
			{ key: SYSTEM_CATEGORY, label: __( 'System', 'onepress' ) },
		];
		const labels = {
			'sans-serif': __( 'Sans-serif', 'onepress' ),
			serif: __( 'Serif', 'onepress' ),
			monospace: __( 'Monospace', 'onepress' ),
			display: __( 'Display', 'onepress' ),
			handwriting: __( 'Handwriting', 'onepress' ),
		};
		for (const k of GOOGLE_CATEGORY_KEYS) {
			tabs.push({ key: k, label: labels[k] || k });
		}
		return tabs;
	}, []);

	const filteredGroups = useMemo(() => {
		const afterCategory = applyCategoryFilter(
			fontGroups,
			webfonts,
			categoryKey
		);
		if (!normalizedQuery) {
			return afterCategory;
		}
		return afterCategory
			.map((g) => ({
				...g,
				fonts: g.fonts.filter((f) =>
					String(f.name).toLowerCase().includes(normalizedQuery)
				),
			}))
			.filter((g) => g.fonts.length > 0);
	}, [fontGroups, webfonts, categoryKey, normalizedQuery]);

	useLayoutEffect(() => {
		if (open) {
			setSearchQuery('');
			setCategoryKey('all');
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
			if (searchQuery.trim()) {
				setSearchQuery('');
				e.preventDefault();
				return;
			}
			if (categoryKey !== 'all') {
				setCategoryKey('all');
				e.preventDefault();
				return;
			}
			onClose();
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [open, onClose, searchQuery, categoryKey]);

	if (!open) {
		return null;
	}

	const panelClass =
		'fontpicker-panel' +
		(variant === 'dropdown' ? ' fontpicker-panel--dropdown' : ' fontpicker-modal');

	return (
		<div
			className={panelClass}
			role="dialog"
			aria-modal={variant === 'modal'}
			aria-label={__( 'Font selector', 'onepress' )}
			onMouseDown={(e) => e.stopPropagation()}
		>
				{/* <div className="fontpicker-head">
					<span className="fontpicker-title">
						{__( 'Font selector', 'onepress' )}
					</span>
					<button
						type="button"
						className="fontpicker-close button-link"
						onClick={onClose}
					>
						{__( 'Close', 'onepress' )}
					</button>
				</div> */}
				<div className="fontpicker-search-wrap">
					<label
						className="screen-reader-text"
						htmlFor={`onepress-typo-font-search-${controlId}`}
					>
						{__( 'Search fonts', 'onepress' )}
					</label>
					<input
						ref={searchRef}
						id={`onepress-typo-font-search-${controlId}`}
						type="search"
						className="fontpicker-search"
						placeholder={__( 'Search fonts…', 'onepress' )}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						autoComplete="off"
						autoCorrect="off"
						spellCheck="false"
					/>
				</div>
				{/* <div
					className="fontpicker-categories"
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
								'fontpicker-cat' +
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
					className="fontpicker-scroll"
					ref={setScrollRoot}
				>
					<span
						className={
							'fontpicker-row fontpicker-row--default' +
							(!currentFontId ? ' is-selected' : '')
						}
						onClick={() => onSelectFont('')}
					>
						<span className="fontpicker-row__name">
							{defaultLabel}
						</span>
					</span>
					{filteredGroups.length === 0 ? (
						<p className="fontpicker-empty" role="status">
							{__( 'No fonts found.', 'onepress' )}
						</p>
					) : (
						filteredGroups.map((g) => (
							<div key={g.type} className="fontpicker-group">
								{/* <div className="fontpicker-group-label">
									{g.type}
								</div> */}
								{g.fonts.map((f) => (
									<FontPickerRow
										key={f.id}
										controlId={controlId}
										fontId={f.id}
										name={f.name}
										fontMeta={webfonts[f.id]}
										sampleText={sampleText}
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
