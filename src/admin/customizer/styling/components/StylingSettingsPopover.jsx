/**
 * Popover: target (item name, base selector) + states (reorder, labels, suffixes).
 * Built-in pseudo states store per-state suffixes (e.g. :hover) combined with _meta.baseSelector when building CSS.
 * Optional `force_selector` on a state uses that full selector only (base + suffix ignored for output).
 */
import { Button, Icon, Popover, TextControl } from '@wordpress/components';
import { shouldIgnoreStylingPopoverFocusOutside } from '../stylingPopoverFocusOutside';
import { dragHandle, settings, trash } from '@wordpress/icons';
import { __, sprintf } from '@wordpress/i18n';
import { useCallback, useEffect, useMemo, useState } from '@wordpress/element';

function cloneValue(v) {
	return JSON.parse(JSON.stringify(v));
}

/**
 * @param {Array<Record<string, { label?: string, selector?: string }>>} entries
 * @returns {{ normal: Record<string, object> | null, rest: typeof entries }}
 */
function partitionStatesEntries(entries) {
	if (!Array.isArray(entries) || !entries.length) {
		return { normal: null, rest: [] };
	}
	const idx = entries.findIndex((e) => e && typeof e === 'object' && Object.keys(e)[0] === 'normal');
	if (idx === -1) {
		return { normal: null, rest: [...entries] };
	}
	const rest = entries.filter((_, i) => i !== idx);
	return { normal: entries[idx], rest };
}

/**
 * @param {Array<Record<string, unknown>> | undefined} entries
 */
function normalizeStatesEntriesOrder(entries) {
	if (!Array.isArray(entries) || !entries.length) {
		return [];
	}
	const { normal, rest } = partitionStatesEntries(entries);
	if (!normal) {
		return [...entries];
	}
	return [normal, ...rest];
}

const BUILTIN_PRESETS = [
	{ key: 'hover', label: __('Hover', 'onepress'), suffix: ':hover' },
	{ key: 'focus', label: __('Focus', 'onepress'), suffix: ':focus' },
	{ key: 'active', label: __('Active', 'onepress'), suffix: ':active' },
	{ key: 'focus-visible', label: __('Focus visible', 'onepress'), suffix: ':focus-visible' },
	{ key: 'disabled', label: __('Disabled', 'onepress'), suffix: ':disabled' },
	{ key: 'visited', label: __('Visited', 'onepress'), suffix: ':visited' },
];

/**
 * @param {string} raw
 * @returns {string}
 */
function sanitizeStateKey(raw) {
	let s = String(raw || '')
		.toLowerCase()
		.replace(/[^a-z0-9_-]+/g, '-')
		.replace(/-{2,}/g, '-')
		.replace(/^-+|-+$/g, '');
	if (s.length > 40) {
		s = s.slice(0, 40).replace(/-+$/g, '');
	}
	return s;
}

const RESERVED_STATE_KEYS = new Set(['_meta', '_onepressstyling']);

/**
 * @param {object} props
 * @param {Element | null} props.anchor
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 * @param {Record<string, unknown>} props.value
 * @param {(next: Record<string, unknown>) => void} props.commit
 * @param {string[]} props.previewDeviceIds
 * @param {string} props.activeStateKey
 * @param {(i: number) => void} props.setStateIndex
 * @param {boolean} [props.allowAddRemoveStates] When false, fixed state list: no presets/custom add, no remove.
 * @param {boolean} [props.multiple] Multi-target control: show item name field.
 * @param {string} [props.lockedBaseSelector] Non-empty when base selector is fixed in PHP (hide field).
 * @param {boolean} [props.editableBaseSelector]
 * @param {string} [props.metaBaseSelector]
 * @param {(v: string) => void} [props.onBaseSelectorChange]
 * @param {(v: string) => void} [props.onItemTitleChange]
 * @param {boolean} [props.showStatesSection] When false, hide states list and add-state UI (target settings only).
 */
export function StylingSettingsPopover({
	anchor,
	isOpen,
	onClose,
	value,
	commit,
	previewDeviceIds,
	activeStateKey,
	setStateIndex,
	allowAddRemoveStates = true,
	multiple = false,
	lockedBaseSelector = '',
	editableBaseSelector = true,
	metaBaseSelector = '',
	onBaseSelectorChange = () => {},
	onItemTitleChange = () => {},
	showStatesSection = true,
}) {
	const [draggedRestIndex, setDraggedRestIndex] = useState(null);
	const [customKeyDraft, setCustomKeyDraft] = useState('');
	const [customError, setCustomError] = useState('');
	/** @type {Record<string, boolean>} stateKey → row settings (selector) expanded */
	const [settingsOpenByKey, setSettingsOpenByKey] = useState(() => ({}));

	const normalizedEntries = useMemo(() => {
		const raw = value && value._meta && Array.isArray(value._meta.states) ? value._meta.states : [];
		return normalizeStatesEntriesOrder(raw);
	}, [value]);

	const { normal: normalEntry, rest } = useMemo(
		() => partitionStatesEntries(normalizedEntries),
		[normalizedEntries]
	);

	const takenKeys = useMemo(() => {
		const set = new Set();
		for (const e of normalizedEntries) {
			const k = Object.keys(e || {})[0];
			if (k) {
				set.add(sanitizeStateKey(k));
			}
		}
		return set;
	}, [normalizedEntries]);

	const syncIndexForKey = useCallback(
		(nextVal, key) => {
			const list = nextVal?._meta?.states;
			if (!Array.isArray(list)) {
				return;
			}
			const norm = normalizeStatesEntriesOrder(list);
			const idx = norm.findIndex((e) => Object.keys(e || {})[0] === key);
			if (idx >= 0) {
				setStateIndex(idx);
			}
		},
		[setStateIndex]
	);

	/** Persist Normal-first order if stored order differed (runs while popover is open). */
	useEffect(() => {
		if (!isOpen || !value?._meta?.states) {
			return;
		}
		const raw = value._meta.states;
		const norm = normalizeStatesEntriesOrder(raw);
		if (JSON.stringify(norm) === JSON.stringify(raw)) {
			return;
		}
		const next = cloneValue(value);
		next._meta.states = norm;
		commit(next);
		syncIndexForKey(next, activeStateKey);
	}, [isOpen, value, commit, activeStateKey, syncIndexForKey]);

	useEffect(() => {
		if (!isOpen) {
			setSettingsOpenByKey({});
		}
	}, [isOpen]);

	const toggleRowSettings = useCallback((stateKey) => {
		setSettingsOpenByKey((prev) => ({
			...prev,
			[stateKey]: !prev[stateKey],
		}));
	}, []);

	const applyNormalizedEntries = useCallback(
		(newNormEntries) => {
			const next = cloneValue(value);
			if (!next._meta) {
				next._meta = {};
			}
			next._meta.states = newNormEntries;
			commit(next);
			syncIndexForKey(next, activeStateKey);
		},
		[value, commit, activeStateKey, syncIndexForKey]
	);

	const onLabelChange = useCallback(
		(globalIndex, newLabel) => {
			const next = cloneValue(value);
			const states = normalizeStatesEntriesOrder(next._meta?.states || []);
			if (!states[globalIndex]) {
				return;
			}
			const entry = states[globalIndex];
			const stateKey = Object.keys(entry)[0];
			if (stateKey === 'normal') {
				return;
			}
			const row = entry[stateKey];
			const updated = states.map((e, i) =>
				i === globalIndex
					? {
							[stateKey]: {
								...row,
								label: newLabel,
							},
						}
					: e
			);
			next._meta.states = updated;
			commit(next);
		},
		[value, commit]
	);

	const onSelectorChange = useCallback(
		(globalIndex, newSelector) => {
			const next = cloneValue(value);
			const states = normalizeStatesEntriesOrder(next._meta?.states || []);
			if (!states[globalIndex]) {
				return;
			}
			const entry = states[globalIndex];
			const stateKey = Object.keys(entry)[0];
			const row = entry[stateKey];
			if (!next._meta) {
				next._meta = {};
			}
			if (stateKey === 'normal') {
				const trimmed = String(newSelector ?? '').trim();
				next._meta.baseSelector = trimmed === '' ? '.' : trimmed;
				const updated = states.map((e, i) =>
					i === globalIndex
						? {
								[stateKey]: {
									...row,
									selector: '',
								},
							}
						: e
				);
				next._meta.states = updated;
			} else {
				const sel = String(newSelector ?? '').trim();
				const updated = states.map((e, i) =>
					i === globalIndex
						? {
								[stateKey]: {
									...row,
									selector: sel,
								},
							}
						: e
				);
				next._meta.states = updated;
			}
			commit(next);
		},
		[value, commit]
	);

	const onRemoveAt = useCallback(
		(globalIndex) => {
			const next = cloneValue(value);
			const states = normalizeStatesEntriesOrder(next._meta?.states || []);
			if (!states[globalIndex]) {
				return;
			}
			const entry = states[globalIndex];
			const stateKey = Object.keys(entry)[0];
			if (stateKey === 'normal') {
				return;
			}
			states.splice(globalIndex, 1);
			next._meta.states = states;
			delete next[stateKey];
			if (next._meta.fontSlices && typeof next._meta.fontSlices === 'object') {
				delete next._meta.fontSlices[stateKey];
			}
			commit(next);
			const keep = activeStateKey === stateKey ? 'normal' : activeStateKey;
			const idx = states.findIndex((e) => Object.keys(e || {})[0] === keep);
			setStateIndex(idx >= 0 ? idx : 0);
		},
		[value, commit, activeStateKey, setStateIndex]
	);

	const mergeOrder = useCallback(
		(newRest) => {
			const ordered = normalEntry ? [normalEntry, ...newRest] : [...newRest];
			applyNormalizedEntries(ordered);
		},
		[normalEntry, applyNormalizedEntries]
	);

	const moveRestItem = useCallback(
		(from, to) => {
			if (from === to || from < 0 || to < 0) {
				return;
			}
			const copy = [...rest];
			const [item] = copy.splice(from, 1);
			copy.splice(to, 0, item);
			mergeOrder(copy);
		},
		[rest, mergeOrder]
	);

	const addState = useCallback(
		(stateKey, label, selector) => {
			const sk = sanitizeStateKey(stateKey);
			if (!sk || sk[0] === '_' || RESERVED_STATE_KEYS.has(sk)) {
				return false;
			}
			if (takenKeys.has(sk)) {
				return false;
			}
			const sel = String(selector || '').trim();
			const next = cloneValue(value);
			if (!next._meta) {
				next._meta = { baseSelector: '.', states: [] };
			}
			if (typeof next._meta.baseSelector !== 'string' || next._meta.baseSelector.trim() === '') {
				next._meta.baseSelector = '.';
			}
			const cur = normalizeStatesEntriesOrder(next._meta.states || []);
			const { normal: n0, rest: r0 } = partitionStatesEntries(cur);
			const newEntry = { [sk]: { label: label || sk, selector: sel } };
			const ordered = n0 ? [n0, ...r0, newEntry] : [...r0, newEntry];
			next._meta.states = ordered;
			next[sk] = {};
			for (const id of previewDeviceIds) {
				next[sk][id] = '';
			}
			commit(next);
			const idx = ordered.findIndex((e) => Object.keys(e || {})[0] === sk);
			if (idx >= 0) {
				setStateIndex(idx);
			}
			return true;
		},
		[value, commit, takenKeys, previewDeviceIds, setStateIndex]
	);

	const onAddPreset = useCallback(
		(preset) => {
			if (takenKeys.has(preset.key)) {
				return;
			}
			addState(preset.key, preset.label, preset.suffix);
		},
		[takenKeys, addState]
	);

	const onAddCustom = useCallback(() => {
		setCustomError('');
		const sk = sanitizeStateKey(customKeyDraft);
		if (!sk || sk[0] === '_') {
			setCustomError(
				__('Enter a valid id (letters, numbers, hyphens, underscores; may not start with _).', 'onepress')
			);
			return;
		}
		if (RESERVED_STATE_KEYS.has(sk)) {
			setCustomError(__('This id is reserved.', 'onepress'));
			return;
		}
		if (takenKeys.has(sk)) {
			setCustomError(__('This id is already in use.', 'onepress'));
			return;
		}
		if (addState(sk, sk, '')) {
			setCustomKeyDraft('');
		}
	}, [customKeyDraft, takenKeys, addState]);

	const restGlobalIndex = useCallback(
		(restIndex) => (normalEntry ? 1 + restIndex : restIndex),
		[normalEntry]
	);

	if (!isOpen || !anchor) {
		return null;
	}

	const normalRow = normalEntry?.normal;
	const showTargetSettings = multiple || !lockedBaseSelector;

	return (
		<Popover
			anchor={anchor}
			onClose={onClose}
			onFocusOutside={(e) => {
				if (shouldIgnoreStylingPopoverFocusOutside(e)) {
					return;
				}
				onClose();
			}}
			placement="bottom"
			offset={8}
			className="onepress-styling-settings-popover"
			shift
			noArrow={false}
		>
			<div className="onepress-styling-settings-popover__inner">
				<p className="onepress-styling-settings-popover__title">{__('Settings', 'onepress')}</p>

				{showTargetSettings ? (
					<div className="onepress-styling-settings-popover__target-settings flex flex-col gap-3">
						{multiple ? (
							<TextControl
								__nextHasNoMarginBottom
								className="styling-item-name-field"
								label={__('Item name', 'onepress')}
								help={__('Label shown in the list for this target.', 'onepress')}
								value={String(value?.title ?? '')}
								onChange={onItemTitleChange}
								autoComplete="off"
								spellCheck={false}
							/>
						) : null}
						{!lockedBaseSelector ? (
							<div className="field-base-selector">
								<TextControl
									__nextHasNoMarginBottom
									className="styling-selector-field"
									label={__('Base CSS selector', 'onepress')}
									help={
										showStatesSection
											? editableBaseSelector
												? __(
														'Rules apply to this target. Each state can add a suffix (e.g. :hover) in its settings or below when that tab is active.',
														'onepress'
													)
												: __(
														'The base selector is fixed for this control and cannot be changed here.',
														'onepress'
													)
											: editableBaseSelector
												? __(
														'Rules apply to this target. Enter the CSS selector for this item.',
														'onepress'
													)
												: __(
														'The base selector is fixed for this control and cannot be changed here.',
														'onepress'
													)
									}
									value={metaBaseSelector}
									onChange={onBaseSelectorChange}
									disabled={!editableBaseSelector}
									autoComplete="off"
									spellCheck={false}
								/>
							</div>
						) : null}
					</div>
				) : null}

				{showStatesSection ? (
					<>
				<p className="onepress-styling-settings-popover__subtitle">{__('States', 'onepress')}</p>

				<div className="onepress-styling-settings-popover__list flex flex-col gap-1" role="list">
					{normalEntry ? (
						<div
							key="normal"
							className="onepress-styling-settings-popover__row onepress-styling-settings-popover__row--locked"
						>
							<div className="w-full flex justify-between items-center">
								<span className="onepress-styling-settings-popover__drag-spacer" aria-hidden />
								<div className="onepress-styling-settings-popover__row-main font-bold">
									<span>{normalRow?.label}</span>
								</div>
							</div>
						</div>
					) : null}
					{rest.map((entry, restIndex) => {
						const stateKey = Object.keys(entry || {})[0];
						const row = stateKey ? entry[stateKey] : null;
						const label = (row && row.label) || stateKey;
						const gIdx = restGlobalIndex(restIndex);
						const settingsOpen = !!settingsOpenByKey[stateKey];
						return (
							<div
								key={stateKey}
								className="onepress-styling-settings-popover__row"
								onDragOver={(e) => {
									e.preventDefault();
									e.dataTransfer.dropEffect = 'move';
								}}
								onDrop={(e) => {
									e.preventDefault();
									if (draggedRestIndex === null || draggedRestIndex === restIndex) {
										return;
									}
									moveRestItem(draggedRestIndex, restIndex);
									setDraggedRestIndex(null);
								}}
							>
								<div className="w-full flex justify-between items-center">
									<span
										className="onepress-styling-settings-popover__drag"
										draggable
										aria-label={__('Drag to reorder', 'onepress')}
										role="img"
										onDragStart={(e) => {
											e.dataTransfer.effectAllowed = 'move';
											e.dataTransfer.setData('text/plain', String(restIndex));
											setDraggedRestIndex(restIndex);
										}}
										onDragEnd={() => setDraggedRestIndex(null)}
									>
										<Icon icon={dragHandle} size={20} />
									</span>
									<div className="grow onepress-styling-settings-popover__row-main font-bold">
										<span>{label}</span>
									</div>
									<div className="onepress-styling-settings-popover__row-actions">
										<Button
											className="onepress-styling-settings-popover__settings-toggle"
											icon={settings}
											variant="tertiary"
											size="small"
											isPressed={settingsOpen}
											aria-expanded={settingsOpen}
											label={__('State settings', 'onepress')}
											onClick={() => toggleRowSettings(stateKey)}
										/>
										{allowAddRemoveStates ? (
											<Button
												className="onepress-styling-settings-popover__remove"
												icon={trash}
												label={sprintf(
													/* translators: %s: state key */
													__('Remove state %s', 'onepress'),
													stateKey
												)}
												onClick={() => onRemoveAt(gIdx)}
												variant="tertiary"
												size="small"
												isDestructive
											/>
										) : null}
									</div>
								</div>
								{settingsOpen ? (
									<div className="flex flex-col gap-3 onepress-styling-settings-popover__row-settings">
										<TextControl
											__nextHasNoMarginBottom
											label={__('Tab label', 'onepress')}
											value={label}
											onChange={(v) => onLabelChange(gIdx, v)}
											autoComplete="off"
										/>
										{row &&
										typeof row.force_selector === 'string' &&
										row.force_selector.trim() !== '' ? (
											<TextControl
												__nextHasNoMarginBottom
												label={__('Fixed CSS selector', 'onepress')}
												help={__(
													'This state is pinned to this full selector by the theme; base target and suffix are not combined.',
													'onepress'
												)}
												value={String(row.force_selector)}
												readOnly
												autoComplete="off"
												spellCheck={false}
											/>
										) : (
											<TextControl
												__nextHasNoMarginBottom
												label={__('State selector', 'onepress')}
												help={__(
													'Suffix appended to the base (e.g. :hover). Leave empty to use the base only.',
													'onepress'
												)}
												value={String(row?.selector ?? '')}
												onChange={(v) => onSelectorChange(gIdx, v)}
												autoComplete="off"
												spellCheck={false}
											/>
										)}
									</div>
								) : null}
							</div>
						);
					})}
				</div>

				{allowAddRemoveStates ? (
					<div className="onepress-styling-settings-popover__presets">
						<p className="onepress-styling-settings-popover__subtitle">
							{__('Add pseudo-state', 'onepress')}
						</p>
						<div className="onepress-styling-settings-popover__preset-buttons">
							{BUILTIN_PRESETS.map((p) => (
								<Button
									key={p.key}
									variant="secondary"
									size="small"
									disabled={takenKeys.has(p.key)}
									onClick={() => onAddPreset(p)}
								>
									{p.label}
								</Button>
							))}
						</div>
					</div>
				) : null}

				{allowAddRemoveStates ? (
					<div className="onepress-styling-settings-popover__custom">
						<p className="onepress-styling-settings-popover__subtitle">
							{__('Custom state', 'onepress')}
						</p>
						{customError ? (
							<p className="description" role="alert">
								{customError}
							</p>
						) : null}
						<div className="flex gap-2 justify-between items-center">
							<div className="grow">
								<TextControl
									__nextHasNoMarginBottom
									value={customKeyDraft}
									onChange={(v) => {
										setCustomError('');
										setCustomKeyDraft(v);
									}}
									placeholder={__('e.g. my-state', 'onepress')}
									autoComplete="off"
									spellCheck={false}
								/>
							</div>
							<Button variant="primary" onClick={onAddCustom}>
								{__('Add', 'onepress')}
							</Button>
						</div>
					</div>
				) : null}
					</>
				) : null}
			</div>
		</Popover>
	);
}
