/**
 * Customizer floating icon picker (Font Awesome / C_Icon_Picker + SVG code).
 */
import { useCallback, useEffect, useMemo, useState } from '@wordpress/element';
import { isSvgIconValue, normalizeSvgIconForStorage, ONEPRESS_ICON_COMMIT_EVENT } from '../repeatable/repeatable-values';

const SVG_KEY = 'svg';

function normalizeFontGroups() {
	if (typeof C_Icon_Picker === 'undefined' || !C_Icon_Picker.fonts) {
		return [];
	}
	return Object.keys(C_Icon_Picker.fonts).map((key) => {
		const raw = C_Icon_Picker.fonts[key] || {};
		const prefix = raw.prefix || '';
		const icons = String(raw.icons || '')
			.split('|')
			.filter(Boolean)
			.map((part) => (prefix ? `${prefix} ${part}`.trim() : part));
		return {
			key,
			name: raw.name || key,
			icons,
		};
	});
}

function dispatchIconCommit(wrapperEl, value) {
	if (!wrapperEl) {
		return;
	}
	window.dispatchEvent(
		new CustomEvent(ONEPRESS_ICON_COMMIT_EVENT, {
			bubbles: true,
			detail: { wrapperEl, value: String(value) },
		})
	);
}

export function IconPickerApp({ $ }) {
	const fontGroups = useMemo(normalizeFontGroups, []);
	const searchPlaceholder =
		typeof C_Icon_Picker !== 'undefined' && C_Icon_Picker.search ? C_Icon_Picker.search : 'Search';
	const showSvgOption =
		typeof C_Icon_Picker !== 'undefined' && Boolean(C_Icon_Picker.svg_code);
	const applySvgLabel =
		typeof C_Icon_Picker !== 'undefined' && C_Icon_Picker.apply_svg
			? C_Icon_Picker.apply_svg
			: 'Apply';
	const svgPlaceholder =
		typeof C_Icon_Picker !== 'undefined' && C_Icon_Picker.svg_placeholder
			? C_Icon_Picker.svg_placeholder
			: '';

	const defaultKey = fontGroups[0]?.key || (showSvgOption ? SVG_KEY : '');
	const [activeKey, setActiveKey] = useState(defaultKey);
	const [search, setSearch] = useState('');
	const [isPickerActive, setIsPickerActive] = useState(false);
	const [svgCode, setSvgCode] = useState('');

	const q = search.trim().toLowerCase();

	const closePicker = useCallback(() => {
		setIsPickerActive(false);
		window.editing_icon = false;
		$('body').find('.icon-wrapper').removeClass('icon-editing');
	}, [$]);

	const applySelection = useCallback(
		(fullName) => {
			const $wrap = window.editing_icon;
			if ($wrap && $wrap.length) {
				dispatchIconCommit($wrap.get(0), fullName);
			}
			closePicker();
		},
		[closePicker]
	);

	const applySvgCode = useCallback(() => {
		const $wrap = window.editing_icon;
		const raw = normalizeSvgIconForStorage(String(svgCode || '').trim());
		if ($wrap && $wrap.length) {
			dispatchIconCommit($wrap.get(0), raw);
		}
		closePicker();
	}, [svgCode, closePicker]);

	useEffect(() => {
		const onWrapperClick = (e) => {
			e.preventDefault();
			const $icon = $(e.currentTarget);
			window.editing_icon = $icon;
			const raw = normalizeSvgIconForStorage(String($icon.find('input').val() || '').trim());
			if (showSvgOption && isSvgIconValue(raw)) {
				setActiveKey(SVG_KEY);
				setSvgCode(raw);
			} else {
				setActiveKey(fontGroups[0]?.key || SVG_KEY);
				setSvgCode('');
			}
			setSearch('');
			setIsPickerActive(true);
			$('body').find('.icon-wrapper').removeClass('icon-editing');
			$icon.addClass('icon-editing');
		};
		$(document.body).on('click.onepressIconWrap', '.icon-wrapper', onWrapperClick);
		return () => $(document.body).off('click.onepressIconWrap', '.icon-wrapper');
	}, [$, fontGroups, showSvgOption]);

	useEffect(() => {
		const onPointerDownOutside = (e) => {
			const $t = $(e.target);
			if ($t.closest('.c-icon-picker').length || $t.closest('.icon-wrapper').length) {
				return;
			}
			if (!$('.c-icon-picker').hasClass('ic-active')) {
				return;
			}
			closePicker();
		};
		$(document).on('mousedown.onepressIconPickOut', onPointerDownOutside);
		return () => $(document).off('mousedown.onepressIconPickOut', onPointerDownOutside);
	}, [$, closePicker]);

	const onTypeChange = useCallback(
		(e) => {
			const v = e.target.value;
			setActiveKey(v);
			if (v === SVG_KEY) {
				const $w = window.editing_icon;
				if ($w && $w.length) {
					const cur = String($w.find('input').val() || '').trim();
					setSvgCode(isSvgIconValue(cur) ? cur : '');
				} else {
					setSvgCode('');
				}
			}
		},
		[]
	);

	if (!showSvgOption && fontGroups.length === 0) {
		return null;
	}

	const isSvgMode = showSvgOption && activeKey === SVG_KEY;

	return (
		<div className={`c-icon-picker${isPickerActive ? ' ic-active' : ''}`}>
			<div className="c-icon-type-wrap">
				<select className="c-icon-type" value={activeKey} onChange={onTypeChange}>
					{fontGroups.map((g) => (
						<option key={g.key} value={g.key}>
							{g.name}
						</option>
					))}
					{showSvgOption ? (
						<option value={SVG_KEY}>{C_Icon_Picker.svg_code}</option>
					) : null}
				</select>
			</div>
			{isSvgMode ? (
				<div className="c-icon-svg-editor">
					<textarea
						className="c-icon-svg-textarea widefat"
						rows={10}
						value={svgCode}
						onChange={(e) => setSvgCode(e.target.value)}
						placeholder={svgPlaceholder}
					/>
					<p className="c-icon-svg-actions">
						<button type="button" className="button button-primary" onClick={applySvgCode}>
							{applySvgLabel}
						</button>
					</p>
				</div>
			) : (
				<>
					<div className="c-icon-search">
						<input
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder={searchPlaceholder}
						/>
					</div>
					<div className="c-icon-list">
						{fontGroups.map((g) => (
							<div
								key={g.key}
								className="ic-icons-group"
								data-group-name={g.key}
								style={g.key === activeKey ? undefined : { display: 'none' }}
							>
								{g.icons.map((fullName, idx) => {
									const visible = !q || fullName.toLowerCase().includes(q);
									return (
										<span
											key={`${g.key}-${idx}-${fullName}`}
											title={fullName}
											data-name={fullName}
											style={{ display: visible ? undefined : 'none' }}
											onClick={(e) => {
												e.preventDefault();
												applySelection(fullName);
											}}
											role="button"
											tabIndex={0}
											onKeyDown={(e) => {
												if (e.key === 'Enter' || e.key === ' ') {
													e.preventDefault();
													applySelection(fullName);
												}
											}}
										>
											<i className={fullName} />
										</span>
									);
								})}
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}
