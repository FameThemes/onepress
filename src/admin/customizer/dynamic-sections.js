/**
 * Dynamic Customizer “option blocks” — pairs with {@see onepress_register_dynamic_option_blocks()} (PHP).
 *
 * @param {import('wp-customize').Customize} api  wp.customize
 * @param {Record<string, unknown>}          userCfg Same shape as ONEPRESS_DYNAMIC_BLOCKS[i]
 */
export function registerDynamicOptionBlocks(api, userCfg) {
	const $ = jQuery;
	const cfg = normalizeCfg(userCfg);

	const panelId = cfg.panelId;
	const orderSettingId = cfg.orderSettingId;
	const sectionTypeBlock = cfg.sectionTypeBlock;
	const sectionTypeNew = cfg.sectionTypeNew;
	const addSectionId = cfg.addSectionId;
	const sortableDataKey = 'onepressDynamicSortable_' + panelId;
	const deleteInnerControlType =
		'onepress_dyn_del_inner_' + panelId.replace(/[^a-z0-9]+/gi, '_');

	function escapeRe(s) {
		return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	function blockSectionId(blockId) {
		return cfg.blockSectionPrefix + String(blockId);
	}

	function blockOptionSettingBase(blockId) {
		return cfg.blockOptionPrefix + String(blockId);
	}

	function collectBlockIdsFromSettings() {
		const names = cfg.fieldNames;
		if (!names.length) {
			return [];
		}
		const fieldPat = names.map(escapeRe).join('|');
		const re = new RegExp(
			'^' + escapeRe(cfg.blockOptionPrefix) + '(\\d+)_(' + fieldPat + ')$'
		);
		const ids = {};
		api.each(function (setting, id) {
			const m = id.match(re);
			if (!m) {
				return;
			}
			const bid = m[1];
			const field = m[2];
			if (!ids[bid]) {
				ids[bid] = {};
			}
			ids[bid][field] = true;
		});
		const req = cfg.requiredFields;
		return Object.keys(ids).filter(function (bid) {
			return req.every(function (f) {
				return ids[bid][f];
			});
		});
	}

	function parseOrderSetting() {
		let order = [];
		try {
			const raw =
				api(orderSettingId) && api(orderSettingId).get
					? api(orderSettingId).get()
					: '[]';
			order = JSON.parse(raw || '[]');
		} catch (e) {
			order = [];
		}
		if (!Array.isArray(order)) {
			order = [];
		}
		return order
			.map(function (x) {
				return String(x);
			})
			.filter(function (id) {
				return /^\d+$/.test(id);
			});
	}

	function getOrderedBlockIds() {
		const order = parseOrderSetting();
		const fromSettings = collectBlockIdsFromSettings();
		if (order.length) {
			const set = {};
			fromSettings.forEach(function (id) {
				set[id] = true;
			});
			const merged = order.filter(function (id) {
				return set[id];
			});
			fromSettings.forEach(function (id) {
				if (merged.indexOf(id) === -1) {
					merged.push(id);
				}
			});
			return merged;
		}
		return fromSettings.sort(function (a, b) {
			return parseInt(a, 10) - parseInt(b, 10);
		});
	}

	function appendIdToOrder(blockId) {
		const sid = String(blockId);
		const order = parseOrderSetting();
		if (order.indexOf(sid) === -1) {
			order.push(sid);
		}
		api(orderSettingId).set(JSON.stringify(order));
	}

	function focusNewlyAddedSection(sectionInst, blockId) {
		const titleControlId = blockOptionSettingBase(blockId) + '_title';
		const deferFn =
			window._ && typeof window._.defer === 'function'
				? window._.defer.bind(window._)
				: function (fn) {
						setTimeout(fn, 0);
					};

		function afterPaint(fn) {
			if (typeof requestAnimationFrame === 'function') {
				requestAnimationFrame(function () {
					requestAnimationFrame(fn);
				});
			} else {
				setTimeout(fn, 32);
			}
		}

		function focusTitleControl() {
			api.control(titleControlId, function (control) {
				control.deferred.embedded.done(function () {
					afterPaint(function () {
						if (
							control.focus &&
							typeof control.focus === 'function'
						) {
							control.focus();
							return;
						}
						const $in = control.container
							.find('input, textarea')
							.filter(':visible')
							.first();
						if ($in.length) {
							$in.trigger('focus');
						}
					});
				});
			});
		}

		api.panel(panelId, function (panel) {
			function afterPanelReady() {
				sectionInst.deferred.embedded.done(function () {
					if (typeof api.reflowPaneContents === 'function') {
						api.reflowPaneContents();
					}
					deferFn(function () {
						sectionInst.expand({
							completeCallback: function () {
								deferFn(focusTitleControl);
							},
						});
					});
				});
			}

			if (panel.expanded && !panel.expanded()) {
				panel.expand({ completeCallback: afterPanelReady });
			} else {
				afterPanelReady();
			}
		});
	}

	function syncSectionTitle(section, bid, titleSid) {
		api(titleSid, function (setting) {
			function refresh() {
				const v = String(setting.get() || '').trim();
				const t = v || 'Untitled';
				section.params.title = t;

				const $headBtn = section.headContainer
					.find(
						'.accordion-section-title .accordion-trigger, .accordion-section-title button'
					)
					.first();
				if ($headBtn.length) {
					$headBtn.text(t);
				}

				const $pane = $('#sub-accordion-section-' + section.id);
				let $h3 = $pane.find('.customize-section-title h3').first();
				if (!$h3.length) {
					$h3 = section.contentContainer
						.find('.customize-section-title h3')
						.first();
				}
				if ($h3.length) {
					const $action = $h3.children('.customize-action').detach();
					$h3.empty();
					if ($action.length) {
						$h3.append($action);
					}
					$h3.append(document.createTextNode(t));
				}
			}
			setting.bind(refresh);
			refresh();
		});
	}

	function installDragHandle(section) {
		const h3 = section.headContainer
			.find('.accordion-section-title')
			.first();
		if (!h3.length || h3.find('.onepress-dynamic-drag-handle').length) {
			return;
		}
		const $grip = $(
			'<span class="onepress-dynamic-drag-handle" aria-hidden="true"></span>'
		);
		$grip.attr('title', 'Drag to reorder');
		h3.addClass('dynamic-section-title');
		h3.prepend($grip);
	}

	function bindExtraNoteActive(showSid, noteSid) {
		api.control(noteSid, function (noteControl) {
			const showSetting = api(showSid);
			function refresh() {
				const v = showSetting.get();
				const on =
					v === 1 ||
					v === '1' ||
					v === true ||
					String(v).toLowerCase() === 'true';
				noteControl.active.set(!!on);
			}
			showSetting.bind(refresh);
			refresh();
		});
	}

	function onPanelSortUpdate() {
		const $root = $('#sub-accordion-panel-' + panelId);
		if (!$root.length) {
			return;
		}
		const ids = [];
		const blockRe = new RegExp(
			'^accordion-section-(' +
				escapeRe(cfg.blockSectionPrefix) +
				'\\d+)$'
		);
		const addLid = 'accordion-section-' + addSectionId;
		$root.children('li.accordion-section').each(function () {
			const lid = this.id || '';
			if (lid === addLid) {
				return;
			}
			const m = lid.match(blockRe);
			if (!m) {
				return;
			}
			const full = m[1];
			const num = full.replace(
				new RegExp('^' + escapeRe(cfg.blockSectionPrefix)),
				''
			);
			if (/^\d+$/.test(num)) {
				ids.push(num);
			}
		});
		api(orderSettingId).set(JSON.stringify(ids));
		ids.forEach(function (bid, i) {
			const sid = blockSectionId(bid);
			if (api.section.has(sid)) {
				api.section(sid).priority.set(10 + i);
			}
		});
		if (typeof api.reflowPaneContents === 'function') {
			api.reflowPaneContents();
		}
	}

	function initPanelSortable() {
		const $root = $('#sub-accordion-panel-' + panelId);
		if (!$root.length) {
			return;
		}
		if ($root.data(sortableDataKey)) {
			if ($root.hasClass('ui-sortable')) {
				$root.sortable('refresh');
			}
			return;
		}
		$root.sortable({
			items:
				'> li.accordion-section:not(#accordion-section-' +
				addSectionId +
				')',
			handle: '.onepress-dynamic-drag-handle',
			axis: 'y',
			tolerance: 'pointer',
			placeholder: 'onepress-dynamic-sortable-placeholder',
			update: onPanelSortUpdate,
		});
		$root.data(sortableDataKey, true);
	}

	function scheduleInitSortable() {
		const deferFn =
			window._ && typeof window._.defer === 'function'
				? window._.defer.bind(window._)
				: function (fn) {
						setTimeout(fn, 0);
					};
		deferFn(initPanelSortable);
	}

	function refreshPanelSortable() {
		const $root = $('#sub-accordion-panel-' + panelId);
		if (
			$root.length &&
			$root.data(sortableDataKey) &&
			$root.hasClass('ui-sortable')
		) {
			$root.sortable('refresh');
		}
	}

	function sectionHiddenSettingId(bid) {
		return blockOptionSettingBase(bid) + '_section_hidden';
	}

	function removeDynamicBlock(blockId) {
		const sectionId = blockSectionId(blockId);
		const base = blockOptionSettingBase(blockId);
		const sec = api.section.has(sectionId)
			? api.section(sectionId)
			: null;

		const stripFromCustomizer = function () {
			const innerDelId = sectionId + '_delete_inner';
			if (api.control.has(innerDelId)) {
				api.control.remove(innerDelId);
			}
			cfg.fieldNames.forEach(function (field) {
				const sid = base + '_' + field;
				if (api.control.has(sid)) {
					api.control.remove(sid);
				}
				if (api.has(sid)) {
					api.remove(sid);
				}
			});
			const order = parseOrderSetting().filter(function (id) {
				return id !== String(blockId);
			});
			api(orderSettingId).set(JSON.stringify(order));
			refreshPanelSortable();
			if (typeof api.reflowPaneContents === 'function') {
				api.reflowPaneContents();
			}
		};

		const removeDomAndSection = function () {
			stripFromCustomizer();
			if (sec) {
				sec.container.remove();
				api.section.remove(sectionId);
			}
		};

		if (sec && sec.expanded && sec.expanded()) {
			sec.collapse({
				completeCallback: removeDomAndSection,
			});
		} else {
			removeDomAndSection();
		}
	}

	if (!api.controlConstructor[deleteInnerControlType]) {
		api.controlConstructor[deleteInnerControlType] = api.Control.extend({
			ready() {
				const control = this;
				const bid = control.params.block_id;
				const $btn = $(
					'<button type="button" class="button button-secondary onepress-dynamic-section-delete-inner" />'
				);
				$btn.append(
					'<span class="dashicons dashicons-trash" aria-hidden="true"></span> '
				);
				$btn.append(
					document.createTextNode('Remove this section')
				);
				control.container
					.addClass('customize-control-onepress-dynamic-delete-inner')
					.empty()
					.append(
						$(
							'<p class="description customize-control-description" />'
						).text(
							'Removes this block from the list. Save & Publish to update stored options.'
						)
					)
					.append($btn);
				$btn.on('click', function (e) {
					e.preventDefault();
					if (
						!window.confirm(
							'Remove this section from the list? Save & Publish to update stored options.'
						)
					) {
						return;
					}
					removeDynamicBlock(bid);
				});
			},
		});
	}

	function installSectionToolbar(section) {
		const bid = section.params.block_id;
		if (!bid || section._onepressDynamicToolbar) {
			return;
		}

		const h3 = section.headContainer.find('.accordion-section-title').first();
		if (!h3.length) {
			return;
		}

		const hasHidden = cfg.fieldNames.indexOf('section_hidden') !== -1;
		const showListDelete = cfg.deleteInList === true;

		if (!hasHidden && !showListDelete) {
			return;
		}

		section._onepressDynamicToolbar = true;

		const $grip = h3.find('.onepress-dynamic-drag-handle').first();
		let $vis = null;
		let $del = null;

		if (showListDelete) {
			$del = $(
				'<button type="button" class="button-link onepress-dynamic-section-delete" />'
			);
			$del.attr({
				'aria-label': 'Remove section',
				title: 'Remove section from list',
			});
			$del.append(
				'<span class="dashicons dashicons-trash" aria-hidden="true"></span>'
			);

			$del.on('click', function (e) {
				e.preventDefault();
				e.stopPropagation();
				if (
					!window.confirm(
						'Remove this section from the list? Save & Publish to update stored options.'
					)
				) {
					return;
				}
				removeDynamicBlock(bid);
			});
		}

		if (hasHidden) {
			$vis = $(
				'<button type="button" class="button-link onepress-dynamic-section-visibility" />'
			);
			$vis.attr({
				'aria-label': 'Toggle visibility in preview',
				title: 'Hide or show in preview',
			});
			const $icon = $(
				'<span class="dashicons dashicons-visibility" aria-hidden="true"></span>'
			);
			$vis.append($icon);

			function readHidden() {
				const sid = sectionHiddenSettingId(bid);
				if (!api.has(sid)) {
					return false;
				}
				const v = api(sid).get();
				return v === 1 || v === '1' || v === true;
			}

			function applyHiddenVisual(hidden) {
				section.container.toggleClass(
					'onepress-dynamic-section-is-hidden',
					hidden
				);
				$vis.toggleClass('is-section-hidden', hidden);
				$vis.attr('aria-pressed', hidden ? 'true' : 'false');
			}

			api(sectionHiddenSettingId(bid), function (setting) {
				setting.bind(function () {
					applyHiddenVisual(readHidden());
				});
			});
			applyHiddenVisual(readHidden());

			$vis.on('click', function (e) {
				e.preventDefault();
				e.stopPropagation();
				const sid = sectionHiddenSettingId(bid);
				if (!api.has(sid)) {
					return;
				}
				api(sid).set(readHidden() ? 0 : 1);
			});
		}

		if ($grip.length) {
			let $anchor = $grip;
			if ($vis && $vis.length) {
				$anchor.after($vis);
				$anchor = $vis;
			}
			if ($del && $del.length) {
				$anchor.after($del);
			}
		} else {
			if ($vis && $vis.length) {
				h3.prepend($vis);
			}
			if ($del && $del.length) {
				if ($vis && $vis.length) {
					$vis.after($del);
				} else {
					h3.prepend($del);
				}
			}
		}
	}

	const DynamicBlockSection = api.Section.extend({
		ready() {
			const section = this;
			section.populateControls();
			const bid = section.params.block_id;
			if (bid) {
				syncSectionTitle(
					section,
					bid,
					blockOptionSettingBase(bid) + '_title'
				);
			}
			installDragHandle(section);
			installSectionToolbar(section);

			section.active.validate = function () {
				const id = section.params.block_id;
				if (!id) {
					return false;
				}
				const t = blockOptionSettingBase(id) + '_title';
				return api.has(t) && api(t).get() !== false;
			};
		},

		populateControls() {
			const section = this;
			const bid = section.params.block_id;
			if (!bid) {
				return;
			}
			const base = blockOptionSettingBase(bid);
			let priority = 1;
			const bindExtraKey = '_onepressDynamicExtraNoteBound';

			cfg.fieldNames.forEach(function (field) {
				const sid = base + '_' + field;

				if (field === 'title') {
					if (!api.control.has(sid)) {
						api.control.add(
							new api.Control(sid, {
								type: 'text',
								label: 'Section title',
								description:
									'Updates the section label in the sidebar; saved as a theme option.',
								section: section.id,
								settings: { default: sid },
								priority: priority,
							})
						);
						api.control(sid).active.set(true);
					}
					priority += 1;
					return;
				}

				if (field === 'section_hidden') {
					// Toggled from the section row (eye); no duplicate control here.
					priority += 1;
					return;
				}

				if (field === 'show_extra') {
					if (!api.control.has(sid)) {
						api.control.add(
							new api.Control(sid, {
								type: 'checkbox',
								label: 'Show extra note field',
								description:
									'JS: toggles visibility of the next control (same idea as PHP active_callback).',
								section: section.id,
								settings: { default: sid },
								priority: priority,
							})
						);
						api.control(sid).active.set(true);
					}
					priority += 1;
					return;
				}

				if (field === 'extra_note') {
					if (!api.control.has(sid)) {
						api.control.add(
							new api.Control(sid, {
								type: 'text',
								label: 'Extra note',
								description:
									'Visible when “Show extra note field” is checked.',
								section: section.id,
								settings: { default: sid },
								priority: priority,
							})
						);
						api.control(sid).active.set(false);
					}
					priority += 1;
					return;
				}

				if (field === 'slider') {
					if (
						api.controlConstructor.onepress_slider &&
						!api.control.has(sid)
					) {
						api.control.add(
							new api.controlConstructor.onepress_slider(sid, {
								type: 'onepress_slider',
								label: 'Slider (max-width)',
								description: 'Theme option: ' + sid,
								section: section.id,
								settings: { default: sid },
								priority: priority,
								css_selector: '.site-header .site-branding',
								css_property: 'max-width',
								slider_min: 40,
								slider_max: 600,
								slider_step: 1,
							})
						);
						api.control(sid).active.set(true);
					}
					priority += 1;
					return;
				}

				if (!api.control.has(sid)) {
					api.control.add(
						new api.Control(sid, {
							type: 'text',
							label: field,
							section: section.id,
							settings: { default: sid },
							priority: priority,
						})
					);
					api.control(sid).active.set(true);
				}
				priority += 1;
			});

			const showSid = base + '_show_extra';
			const noteSid = base + '_extra_note';
			if (
				!section[bindExtraKey] &&
				api.control.has(noteSid) &&
				api.has(showSid)
			) {
				section[bindExtraKey] = true;
				bindExtraNoteActive(showSid, noteSid);
			}

			if (!cfg.deleteInList) {
				const delId = section.id + '_delete_inner';
				if (!api.control.has(delId)) {
					api.control.add(
						new api.controlConstructor[deleteInnerControlType](
							delId,
							{
								type: deleteInnerControlType,
								section: section.id,
								priority: 10000,
								settings: {},
								block_id: bid,
							}
						)
					);
					api.control(delId).active.set(true);
				}
			}
		},
	});

	const DynamicNewSection = api.Section.extend({
		attachEvents() {
			const section = this;
			const $title = section.headContainer.find('.accordion-section-title');
			$title.empty();
			const $h3 = $('<span class="onepress-dynamic-new-heading"></span>');
			const $btn = $(
				'<button type="button" class="button button-secondary customize-add-dynamic-block-button" aria-expanded="false"></button>'
			).text(cfg.addSectionTitle);
			$h3.append($btn);
			$title.append($h3);

			$btn.on('click', function (e) {
				e.preventDefault();
				e.stopPropagation();
				const id = placeholderBlockId();
				const maxPri = maxBlockPriorityInPanel();
				const newSection = addDynamicBlockSection(id, {
					skipCreateSettings: false,
					priority: maxPri + 1,
				});
				appendIdToOrder(id);
				const deferFn =
					window._ && typeof window._.defer === 'function'
						? window._.defer.bind(window._)
						: function (fn) {
								setTimeout(fn, 0);
							};
				deferFn(function () {
					if (typeof api.reflowPaneContents === 'function') {
						api.reflowPaneContents();
					}
					refreshPanelSortable();
					scheduleInitSortable();
				});
				focusNewlyAddedSection(newSection, id);
			});

			section.contentContainer.addClass('onepress-dynamic-new__content');
			api.Section.prototype.attachEvents.apply(section, arguments);
		},

		isContextuallyActive() {
			return true;
		},
	});

	api.sectionConstructor[sectionTypeBlock] = DynamicBlockSection;
	api.sectionConstructor[sectionTypeNew] = DynamicNewSection;

	function placeholderBlockId() {
		return Math.floor(Math.random() * 800000000) + 100000000;
	}

	function maxBlockPriorityInPanel() {
		let max = 9;
		api.section.each(function (s) {
			if (s.params.panel !== panelId) {
				return;
			}
			if (s.params.type !== sectionTypeBlock) {
				return;
			}
			const p = s.priority.get();
			if (p > max) {
				max = p;
			}
		});
		return max;
	}

	function addDynamicBlockSection(blockId, options) {
		const opts = options || {};
		const skipCreate = opts.skipCreateSettings === true;
		const sectionId = blockSectionId(blockId);

		if (api.section.has(sectionId)) {
			return api.section(sectionId);
		}

		if (!skipCreate) {
			cfg.fieldNames.forEach(function (field) {
				const sid = blockOptionSettingBase(blockId) + '_' + field;
				const def = Object.prototype.hasOwnProperty.call(
					cfg.fieldDefaults,
					field
				)
					? cfg.fieldDefaults[field]
					: '';
				if (!api.has(sid)) {
					api.create(sid, sid, def, {
						transport: 'refresh',
						previewer: api.previewer,
					});
				}
			});
		}

		const titleSid = blockOptionSettingBase(blockId) + '_title';
		const title =
			(api(titleSid) && api(titleSid).get && String(api(titleSid).get())) ||
			'';
		const pri =
			typeof opts.priority === 'number'
				? opts.priority
				: maxBlockPriorityInPanel() + 1;

		const section = new DynamicBlockSection(sectionId, {
			type: sectionTypeBlock,
			panel: panelId,
			title: title.trim()
				? title
				: 'Untitled',
			priority: pri,
			block_id: String(blockId),
			customizeAction: cfg.customizeAction,
		});

		api.section.add(section);
		return section;
	}

	api.bind('ready', function () {
		const ordered = getOrderedBlockIds();
		ordered.forEach(function (bid, i) {
			addDynamicBlockSection(bid, {
				skipCreateSettings: true,
				priority: 10 + i,
			});
		});

		api.section(addSectionId, function (addSection) {
			addSection.isContextuallyActive = function () {
				return true;
			};
			addSection.active.set(true);
		});

		api.panel(panelId, function (panel) {
			panel.active.set(true);
			panel.expanded.bind(function (ex) {
				if (ex) {
					scheduleInitSortable();
				}
			});
			if (panel.expanded && panel.expanded()) {
				scheduleInitSortable();
			}
		});
	});
}

function normalizeCfg(c) {
	if (!c || typeof c !== 'object') {
		return {
			panelId: '',
			orderSettingId: '',
			blockSectionPrefix: '',
			blockOptionPrefix: '',
			sectionTypeBlock: '',
			sectionTypeNew: '',
			addSectionId: '',
			addSectionTitle: 'Create new section',
			customizeAction: '',
			fieldNames: [],
			requiredFields: ['title', 'slider'],
			fieldDefaults: {},
			deleteInList: false,
		};
	}
	return {
		panelId: String(c.panelId || ''),
		orderSettingId: String(c.orderSettingId || ''),
		blockSectionPrefix: String(c.blockSectionPrefix || ''),
		blockOptionPrefix: String(c.blockOptionPrefix || ''),
		sectionTypeBlock: String(c.sectionTypeBlock || ''),
		sectionTypeNew: String(c.sectionTypeNew || ''),
		addSectionId: String(c.addSectionId || ''),
		addSectionTitle: String(
			c.addSectionTitle != null && c.addSectionTitle !== ''
				? c.addSectionTitle
				: 'Create new section'
		),
		customizeAction: String(c.customizeAction || ''),
		fieldNames: Array.isArray(c.fieldNames) ? c.fieldNames.map(String) : [],
		requiredFields: Array.isArray(c.requiredFields)
			? c.requiredFields.map(String)
			: ['title', 'slider'],
		fieldDefaults:
			c.fieldDefaults && typeof c.fieldDefaults === 'object'
				? c.fieldDefaults
				: {},
		deleteInList: c.deleteInList === true,
	};
}
