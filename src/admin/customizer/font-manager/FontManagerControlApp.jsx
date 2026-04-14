/**
 * Customizer control `font_manager`: saved font list + add/edit panel (picker, Google mode, variants).
 */
import { Button, CheckboxControl } from '@wordpress/components';
import { pencil, trash } from '@wordpress/icons';
import { useCallback, useEffect, useMemo, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { StylingGoogleFontFamilyControl } from '../styling/components/StylingGoogleFontFamilyControl';
import { findFamilyForModel } from '../styling/googleFontCollection';
import {
	fontManagerItemsToGoogleAxesPlainObject,
	normalizeFontWeightForGoogle,
	normalizeItalForGoogle,
} from '../styling/stylingGoogleFonts';
import { useGoogleFontFamilies } from '../styling/useGoogleFontFamilies';
import {
	defaultFontManagerValue,
	displayNameForItem,
	emptyFontItem,
	normalizeFontManagerItem,
	normalizeFontManagerValue,
	parseFontManagerSetting,
} from './fontManagerModel';
import { ONEPRESS_FONT_MANAGER_PREVIEW_MESSAGE } from './fontManagerPreviewConstants';

/** @typedef {import('./fontManagerModel').FontManagerItem} FontManagerItem */
/** @typedef {import('../styling/googleFontCollection').PickerFontFamily} PickerFontFamily */

/**
 * @param {import('../styling/googleFontCollection').GoogleFontFace} face
 * @returns {string}
 */
function axisPairFromFace(face) {
	return `${normalizeItalForGoogle(face.fontStyle)},${normalizeFontWeightForGoogle(face.fontWeight)}`;
}

/**
 * When the Font Library REST payload has no fontFace[], still offer common axes for Google CSS2.
 * @type {ReadonlyArray<{ fontWeight: string, fontStyle: string }>}
 */
const FALLBACK_GOOGLE_VARIATION_FACES = [
	{ fontWeight: '300', fontStyle: 'normal' },
	{ fontWeight: '400', fontStyle: 'normal' },
	{ fontWeight: '500', fontStyle: 'normal' },
	{ fontWeight: '600', fontStyle: 'normal' },
	{ fontWeight: '700', fontStyle: 'normal' },
	{ fontWeight: '400', fontStyle: 'italic' },
	{ fontWeight: '700', fontStyle: 'italic' },
];

/**
 * @param {PickerFontFamily | null | undefined} family
 * @returns {Array<{ fontWeight: string, fontStyle: string }>}
 */
function effectiveGoogleFacesForUi(family) {
	if (!family || family.isSystem) {
		return [];
	}
	const ff = family.fontFace;
	if (Array.isArray(ff) && ff.length > 0) {
		return ff;
	}
	return [...FALLBACK_GOOGLE_VARIATION_FACES];
}

/**
 * @param {PickerFontFamily | null | undefined} family
 * @returns {string[]}
 */
function allVariationKeysForGoogleFamily(family) {
	const faces = effectiveGoogleFacesForUi(family);
	const seen = new Set();
	const out = [];
	for (const f of faces) {
		const k = axisPairFromFace(f);
		if (!seen.has(k)) {
			seen.add(k);
			out.push(k);
		}
	}
	return out;
}

/**
 * @param {PickerFontFamily[] | null | undefined} families
 * @param {FontManagerItem | null} draft
 * @returns {PickerFontFamily | null}
 */
/**
 * Saved list + open editor draft so preview matches what the user is editing.
 *
 * @param {import('./fontManagerModel').FontManagerItem[]} rootItems
 * @param {['add' | 'edit', FontManagerItem] | null} editor
 */
function mergeItemsForPreview(rootItems, editor) {
	if (!editor) {
		return rootItems;
	}
	const [mode, draft] = editor;
	if (!draft) {
		return rootItems;
	}
	if (mode === 'add') {
		return [...rootItems, draft];
	}
	return rootItems.map((it) => (it.id === draft.id ? draft : it));
}

function findFontManagerFamily(families, draft) {
	if (!draft || !families?.length) {
		return null;
	}
	if (draft.googleSlug) {
		const bySlug = families.find((f) => f.slug === draft.googleSlug);
		if (bySlug) {
			return bySlug;
		}
	}
	return findFamilyForModel(families, draft.fontFamily);
}

/**
 * @param {JQueryStatic} $
 * @param {import('@wordpress/customize').Control} control
 * @param {Record<string, unknown>} dataObj
 */
function pushFontManagerPayload($, control, dataObj) {
	const setting = control.setting;
	if (!setting || typeof setting.set !== 'function' || typeof setting.get !== 'function') {
		return;
	}
	const normalized = normalizeFontManagerValue(dataObj);
	const payload = JSON.stringify(normalized);
	const before = setting.get();
	setting.set(payload);

	const $hidden = control.container.find('input[data-customize-setting-link]');
	if ($hidden.length) {
		$hidden.val(payload);
		$hidden.trigger('input').trigger('change');
	}

	const after = setting.get();
	const _ = typeof window !== 'undefined' ? window._ : null;
	if (_ && typeof _.isEqual === 'function') {
		const skipped = _.isEqual(before, after) && !_.isEqual(before, payload);
		if (skipped) {
			setting._value = payload;
			setting._dirty = true;
			if (setting.callbacks && typeof setting.callbacks.fireWith === 'function') {
				setting.callbacks.fireWith(setting, [payload, before]);
			}
		}
	}
}

/**
 * @param {object} props
 * @param {import('@wordpress/customize').Control} props.control
 * @param {JQueryStatic} props.$
 */
export function FontManagerControlApp({ control, $ }) {
	const paramsVal = control.params?.value;
	const [root, setRoot] = useState(() => {
		const fromSetting = parseFontManagerSetting(control.setting?.get?.());
		if (fromSetting.items?.length) {
			return fromSetting;
		}
		if (paramsVal && typeof paramsVal === 'object') {
			return normalizeFontManagerValue(paramsVal);
		}
		return defaultFontManagerValue();
	});

	/** @type {['add' | 'edit', FontManagerItem] | null} */
	const [editor, setEditor] = useState(null);

	const { families, loading, error } = useGoogleFontFamilies();

	useEffect(() => {
		const setting = control.setting;
		if (!setting || typeof setting.bind !== 'function') {
			return undefined;
		}
		const onChange = (raw) => {
			setRoot(parseFontManagerSetting(raw));
		};
		setting.bind(onChange);
		return () => {
			setting.unbind?.(onChange);
		};
	}, [control.setting]);

	const commitRoot = useCallback(
		/** @param {import('./fontManagerModel').FontManagerValue} next */(next) => {
			const normalized = normalizeFontManagerValue(next);
			setRoot(normalized);
			pushFontManagerPayload($, control, normalized);
		},
		[$, control]
	);

	const openAdd = useCallback(() => {
		setEditor(['add', emptyFontItem()]);
	}, []);

	const openEdit = useCallback(
		/** @param {FontManagerItem} item */(item) => {
			let next = normalizeFontManagerItem({ ...item });
			const fam = findFontManagerFamily(families, next);
			if (next.isGoogleFamily && fam && !fam.isSystem) {
				const keys = allVariationKeysForGoogleFamily(fam);
				if (next.variations.length === 0 && keys.length) {
					next = normalizeFontManagerItem({
						...next,
						variations: keys,
					});
				}
			}
			setEditor(['edit', next]);
		},
		[families]
	);

	const closeEditor = useCallback(() => {
		setEditor(null);
	}, []);

	const setDraft = useCallback(
		/** @param {FontManagerItem | ((prev: FontManagerItem) => FontManagerItem)} u */(u) => {
			setEditor((prev) => {
				if (!prev) {
					return prev;
				}
				const [, draft] = prev;
				const next = typeof u === 'function' ? u(draft) : u;
				return [prev[0], next];
			});
		},
		[]
	);

	const draft = editor?.[1] ?? null;
	const draftMode = editor?.[0] ?? null;

	const previewAxesByFamily = useMemo(() => {
		const items = mergeItemsForPreview(root.items, editor);
		return fontManagerItemsToGoogleAxesPlainObject(items);
	}, [root.items, editor]);

	useEffect(() => {
		const previewer =
			typeof wp !== 'undefined' && wp.customize && wp.customize.previewer
				? wp.customize.previewer
				: null;
		if (!previewer || typeof previewer.send !== 'function') {
			return undefined;
		}
		const id = window.requestAnimationFrame(() => {
			previewer.send(ONEPRESS_FONT_MANAGER_PREVIEW_MESSAGE, {
				settingId: String(control.id),
				axesByFamily: previewAxesByFamily,
			});
		});
		return () => window.cancelAnimationFrame(id);
	}, [previewAxesByFamily, control.id]);

	const draftResolvedFamily = useMemo(
		() => findFontManagerFamily(families, draft),
		[families, draft]
	);

	const variationFaces = useMemo(
		() =>
			draft?.isGoogleFamily && draftResolvedFamily && !draftResolvedFamily.isSystem
				? effectiveGoogleFacesForUi(draftResolvedFamily)
				: [],
		[draft?.isGoogleFamily, draftResolvedFamily]
	);

	const onPickFont = useCallback(
		/** @param {PickerFontFamily} font */(font) => {
			setDraft((d) => {
				if (!d) {
					return d;
				}
				const isGoogle = !font.isSystem;
				const base = {
					fontFamily: font.fontFamily,
					googleSlug: isGoogle ? font.slug : '',
					googleName: isGoogle ? font.name : '',
					isGoogleFamily: isGoogle,
				};
				if (isGoogle) {
					return normalizeFontManagerItem({
						...d,
						...base,
						variations: allVariationKeysForGoogleFamily(font),
					});
				}
				return normalizeFontManagerItem({
					...d,
					...base,
					variations: [],
				});
			});
		},
		[setDraft]
	);

	const noopFontPatch = useCallback(() => { }, []);

	const toggleVariation = useCallback(
		/** @param {string} key */(key) => {
			setDraft((d) => {
				const set = new Set(d.variations);
				if (set.has(key)) {
					set.delete(key);
				} else {
					set.add(key);
				}
				return normalizeFontManagerItem({ ...d, variations: [...set].sort() });
			});
		},
		[setDraft]
	);

	const saveDraft = useCallback(() => {
		if (!draft || !draftMode) {
			return;
		}
		const cleaned = normalizeFontManagerItem(draft);
		if (!cleaned.fontFamily.trim() && !cleaned.googleName && !cleaned.googleSlug) {
			// eslint-disable-next-line no-alert
			window.alert(__('Choose a font before saving.', 'onepress'));
			return;
		}
		let nextItems;
		if (draftMode === 'add') {
			nextItems = [...root.items, cleaned];
		} else {
			nextItems = root.items.map((it) => (it.id === cleaned.id ? cleaned : it));
		}
		commitRoot({ _onepressFontManager: true, items: nextItems });
		setEditor(null);
	}, [commitRoot, draft, draftMode, root.items]);

	const deleteItem = useCallback(
		/** @param {string} id */(id) => {
			// eslint-disable-next-line no-alert
			if (!window.confirm(__('Remove this font from the list?', 'onepress'))) {
				return;
			}
			commitRoot({
				_onepressFontManager: true,
				items: root.items.filter((it) => it.id !== id),
			});
			if (editor && editor[1].id === id) {
				setEditor(null);
			}
		},
		[commitRoot, editor, root.items]
	);

	const showVariationPanel = Boolean(draft?.isGoogleFamily && variationFaces.length);

	const showGoogleCategory = draft && draft.isGoogleFamily;

	const editorPanel =
		draft !== null ? (
			<div className="font-manager-editor flex flex-col gap-4">
				<div className="font-manager-editor__title font-bold">
					{draftMode === 'add' ? __('New font', 'onepress') : __('Edit font', 'onepress')}
				</div>

				<div className="font-manager-control__picker">
					<div className="field-title font-manager-control__picker-label">{__('Font Family', 'onepress')}</div>
					<StylingGoogleFontFamilyControl
						value={draft.fontFamily}
						onPatch={noopFontPatch}
						onPickFamily={onPickFont}
						families={families}
						loading={loading}
						error={error}
					/>
				</div>

				{showGoogleCategory ? (
					<div className="font-manager-editor__category">
						<span className="font-manager-editor__category-badge">
							{__('Google Font', 'onepress')}
						</span>
					</div>
				) : null}

				{showVariationPanel ? (
					<div className="font-manager-control__variations flex flex-col gap-2">
						<div className="field-title font-manager-control__variations-legend">
							{__('Variations', 'onepress')}
						</div>

						<div className="flex flex-col gap-2 font-manager-control__variation-list">
							{variationFaces.map((face, idx) => {
								const key = axisPairFromFace(face);
								const w = String(face.fontWeight ?? '400');
								const st = String(face.fontStyle || 'normal');
								const label =
									st === 'italic' || st === 'oblique'
										? sprintf(
											/* translators: 1: weight, 2: style */
											__('%1$s · %2$s', 'onepress'),
											w,
											st
										)
										: w;
								return (
									<div key={`${key}-${idx}`}>
										<CheckboxControl
											__nextHasNoMarginBottom
											label={label}
											checked={draft.variations.includes(key)}
											onChange={() => toggleVariation(key)}
										/>
									</div>
								);
							})}
						</div>
					</div>
				) : null}

				<div className="flex gap-2 justify-end font-manager-editor__actions">
					<Button variant="tertiary" onClick={closeEditor}
						size='small'
					>
						{__('Close', 'onepress')}
					</Button>
					<Button variant="primary" onClick={saveDraft} size='small'>
						{__('Save', 'onepress')}
					</Button>
				</div>
			</div>
		) : null;

	const inlineEditForId = draftMode === 'edit' && draft ? draft.id : null;

	return (
		<div className="font-manager-control font-manager-control--app">
			<p className="font-manager-control__list-heading">{__('Fonts saved', 'onepress')}</p>
			<div
				className={
					'font-manager-list' +
					(draftMode === 'edit' ? ' font-manager-list--expanded' : '')
				}
				role="region"
				aria-label={__('Fonts saved', 'onepress')}
			>
				{root.items.length === 0 ? (
					<div className="font-manager-list__empty">{__('No fonts yet.', 'onepress')}</div>
				) : (
					<div className="font-manager-list__units">
						{root.items.map((item) => {
							const label = displayNameForItem(item) || __('(unnamed)', 'onepress');
							const showFlyoutEditor = inlineEditForId === item.id;
							return (
								<div key={item.id} className="font-manager-list__unit">
									<div className="font-manager-list__item">
										<div className="font-manager-list__row">
											<span className="font-manager-list__name" title={item.fontFamily || label}>
												{label}
											</span>
											<span className="font-manager-list__spacer" aria-hidden />
											<Button
												className="font-manager-list__icon-btn"
												variant="tertiary"
												size="small"
												icon={pencil}
												label={__('Edit font', 'onepress')}
												disabled={draft !== null}
												onClick={() => openEdit(item)}
											/>
											<Button
												className="font-manager-list__icon-btn"
												variant="tertiary"
												size="small"
												icon={trash}
												label={__('Remove font', 'onepress')}
												disabled={draft !== null}
												onClick={() => deleteItem(item.id)}
											/>
										</div>
									</div>
									{showFlyoutEditor ? (
										<div
											className="font-manager-editor-flyout"
											role="group"
											aria-label={__('Font layout editor', 'onepress')}
										>
											<span className="font-manager-editor-flyout__arrow" aria-hidden="true">
												<span className="font-manager-editor-flyout__arrow-fill" />
											</span>
											<div className="font-manager-editor-flyout__panel">{editorPanel}</div>
										</div>
									) : null}
								</div>
							);
						})}
					</div>
				)}
			</div>

			{draft !== null && draftMode === 'add' ? (
				<div className="font-manager-control__editor-below-list">{editorPanel}</div>
			) : null}

			{draft === null ? (
				<div className="font-manager-control__add-wrap">
					<Button variant="secondary" onClick={openAdd}>
						{__('Add font', 'onepress')}
					</Button>
				</div>
			) : null}
		</div>
	);
}
