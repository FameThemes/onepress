import { Button } from '@wordpress/components';
// eslint-disable-next-line import/no-extraneous-dependencies -- @wordpress/icons is a WP peer dependency
import { redo, undo } from '@wordpress/icons';
import { useCallback, useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { BUILDER_DRAG_MIME } from '../constants.js';
import { getBuilderDragMode } from '../drag-state.js';
import { findNodeById } from '../tree-utils.js';
import BuilderCanvas from './BuilderCanvas.jsx';
import BuilderFloatingModal, {
	focusBuilderCustomizerControl,
} from './BuilderFloatingModal.jsx';
import BuilderInspector from './BuilderInspector.jsx';
import BuilderPalette from './BuilderPalette.jsx';

/**
 * @param {Object}                                 props
 * @param {import('../tree-utils.js').BuilderTree} props.tree
 * @param {string|null}                            props.selectedId
 * @param {Function}                               props.onSelect
 * @param {Function}                               props.onRemove
 * @param {Function}                               props.onDropItem
 * @param {Function}                               props.onReorderDrop
 * @param {Function}                               props.onChangeProps
 * @param {Function}                               props.onChangeColumnCount
 * @param {boolean}                                [props.canUndo]
 * @param {boolean}                                [props.canRedo]
 * @param {Function}                               [props.onUndo]
 * @param {Function}                               [props.onRedo]
 * @param {string}                                 props.customizerControlId Customize control id for this mount.
 * @param {string}                                 props.customizerSectionId Parent Customize section id for this mount.
 */
export default function Builder( {
	tree,
	selectedId,
	onSelect,
	onRemove,
	onDropItem,
	onReorderDrop,
	onChangeProps,
	onChangeColumnCount,
	canUndo = false,
	canRedo = false,
	onUndo,
	onRedo,
	customizerControlId,
	customizerSectionId,
} ) {
	const showDetail =
		selectedId !== null && selectedId !== undefined && selectedId !== '';
	const layoutRef = useRef( null );
	const floatingModalRef = useRef( null );
	const [ dragActive, setDragActive ] = useState( false );
	const [ activeDropKey, setActiveDropKey ] = useState( null );
	const activeDropKeyRef = useRef( null );
	const [ paletteModalOpen, setPaletteModalOpen ] = useState( false );
	const [ paletteInsertTarget, setPaletteInsertTarget ] = useState( null );

	useEffect( () => {
		activeDropKeyRef.current = activeDropKey;
	}, [ activeDropKey ] );

	const openPaletteModal = useCallback(
		( insertTarget ) => {
			onSelect( null );
			if (
				insertTarget &&
				typeof insertTarget.parentId === 'string' &&
				typeof insertTarget.index === 'number'
			) {
				setPaletteInsertTarget( {
					parentId: insertTarget.parentId,
					index: insertTarget.index,
				} );
			} else {
				setPaletteInsertTarget( null );
			}
			setPaletteModalOpen( true );
		},
		[ onSelect ]
	);

	const focusThisCustomizerControl = useCallback( () => {
		focusBuilderCustomizerControl(
			customizerSectionId,
			customizerControlId
		);
	}, [ customizerSectionId, customizerControlId ] );

	const canFocusCustomizerSidebar =
		typeof customizerSectionId === 'string' &&
		customizerSectionId !== '' &&
		typeof customizerControlId === 'string' &&
		customizerControlId !== '';

	const closePaletteModal = useCallback( () => {
		setPaletteModalOpen( false );
		setPaletteInsertTarget( null );
	}, [] );

	const handlePalettePickType = useCallback(
		( typeName ) => {
			if ( ! paletteInsertTarget ) {
				return;
			}
			onDropItem(
				paletteInsertTarget.parentId,
				paletteInsertTarget.index,
				typeName
			);
			closePaletteModal();
		},
		[ paletteInsertTarget, onDropItem, closePaletteModal ]
	);

	useEffect( () => {
		if ( selectedId ) {
			setPaletteModalOpen( false );
		}
	}, [ selectedId ] );

	useEffect( () => {
		const onDragStart = ( e ) => {
			if ( layoutRef.current?.contains( e.target ) ) {
				setDragActive( true );
				return;
			}
			if ( floatingModalRef.current?.contains( e.target ) ) {
				setDragActive( true );
			}
		};
		const onDragEnd = () => setDragActive( false );
		document.addEventListener( 'dragstart', onDragStart, true );
		document.addEventListener( 'dragend', onDragEnd, true );
		return () => {
			document.removeEventListener( 'dragstart', onDragStart, true );
			document.removeEventListener( 'dragend', onDragEnd, true );
		};
	}, [] );

	/**
	 * Resolve active drop line from pointer (throttled). Do not rely on
	 * dataTransfer.types — many UAs omit custom MIME during dragover.
	 */
	useEffect( () => {
		if ( ! dragActive ) {
			setActiveDropKey( null );
			return;
		}
		let rafId = null;
		/** @type {DragEvent|null} */
		let pending = null;
		const flush = () => {
			rafId = null;
			const e = pending;
			pending = null;
			if ( ! e ) {
				return;
			}
			const layout = layoutRef.current;
			if ( ! layout ) {
				setActiveDropKey( null );
				return;
			}
			const x = e.clientX;
			const y = e.clientY;
			let next = null;
			try {
				const stack = document.elementsFromPoint( x, y );
				for ( let i = 0; i < stack.length; i++ ) {
					const node = stack[ i ];
					if ( ! layout.contains( node ) ) {
						continue;
					}
					const dz = node.closest( '[data-drop-key]' );
					if ( dz && layout.contains( dz ) ) {
						next = dz.getAttribute( 'data-drop-key' );
						break;
					}
				}
			} catch {
				const el = document.elementFromPoint( x, y );
				if ( el && layout.contains( el ) ) {
					const dz = el.closest( '[data-drop-key]' );
					if ( dz && layout.contains( dz ) ) {
						next = dz.getAttribute( 'data-drop-key' );
					}
				}
			}
			/* Pointer on a block: pick the insert line closest to the cursor (one active slot). */
			if ( next === null || next === undefined ) {
				const nodes = layout.querySelectorAll( '[data-drop-key]' );
				let bestKey = null;
				let bestDistSq = 55 * 55;
				for ( const dz of nodes ) {
					if ( ! ( dz instanceof window.HTMLElement ) ) {
						continue;
					}
					const r = dz.getBoundingClientRect();
					let dx = 0;
					if ( x < r.left ) {
						dx = r.left - x;
					} else if ( x > r.right ) {
						dx = x - r.right;
					}
					let dy = 0;
					if ( y < r.top ) {
						dy = r.top - y;
					} else if ( y > r.bottom ) {
						dy = y - r.bottom;
					}
					const dSq = dx * dx + dy * dy;
					if ( dSq < bestDistSq ) {
						bestDistSq = dSq;
						bestKey = dz.getAttribute( 'data-drop-key' );
					}
				}
				next = bestKey;
			}
			setActiveDropKey( ( prev ) => ( prev === next ? prev : next ) );
		};
		const onDragOver = ( /** @type {DragEvent} */ e ) => {
			const layout = layoutRef.current;
			if ( layout?.contains( e.target ) ) {
				const dt = e.dataTransfer;
				if ( dt ) {
					const types = dt.types ? Array.from( dt.types ) : [];
					const mode = getBuilderDragMode();
					if (
						types.includes( BUILDER_DRAG_MIME ) ||
						mode === 'palette' ||
						mode === 'reorder'
					) {
						e.preventDefault();
						dt.dropEffect = mode === 'palette' ? 'copy' : 'move';
					}
				}
			}
			pending = e;
			if ( rafId !== null ) {
				return;
			}
			rafId = window.requestAnimationFrame( flush );
		};
		/* Bubble: runs after the active dropzone’s own dragover (preventDefault). */
		document.addEventListener( 'dragover', onDragOver );
		return () => {
			document.removeEventListener( 'dragover', onDragOver );
			if ( rafId !== null ) {
				window.cancelAnimationFrame( rafId );
			}
			setActiveDropKey( null );
		};
	}, [ dragActive ] );

	/**
	 * Drop often lands on a block while the highlighted line is a sibling dropzone.
	 * Route to activeDropKey when the event target is not that zone.
	 */
	useEffect( () => {
		if ( ! dragActive ) {
			return;
		}
		const onDropCapture = ( /** @type {DragEvent} */ e ) => {
			const raw = e.dataTransfer?.getData( BUILDER_DRAG_MIME );
			if ( ! raw ) {
				return;
			}
			const layout = layoutRef.current;
			if ( ! layout?.contains( e.target ) ) {
				return;
			}
			const key = activeDropKeyRef.current;
			if ( ! key ) {
				return;
			}
			const safeKey =
				typeof window !== 'undefined' &&
				window.CSS &&
				typeof window.CSS.escape === 'function'
					? window.CSS.escape( key )
					: key.replace( /\\/g, '\\\\' ).replace( /"/g, '\\"' );
			const zone = layout.querySelector(
				`[data-drop-key="${ safeKey }"]`
			);
			if ( ! zone ) {
				return;
			}
			const direct = e.target?.closest?.( '[data-drop-key]' );
			if ( direct === zone || zone.contains( e.target ) ) {
				return;
			}
			e.preventDefault();
			e.stopPropagation();
			const colon = key.lastIndexOf( ':' );
			if ( colon <= 0 ) {
				return;
			}
			try {
				const payload = JSON.parse( raw );
				const parentId = key.slice( 0, colon );
				const index = parseInt( key.slice( colon + 1 ), 10 );
				if ( Number.isNaN( index ) ) {
					return;
				}
				if ( payload?.source === 'palette' && payload?.type ) {
					onDropItem( parentId, index, payload.type );
				} else if (
					payload?.source === 'reorder' &&
					payload?.nodeId &&
					onReorderDrop
				) {
					onReorderDrop( payload.nodeId, parentId, index );
				}
			} catch {
				// ignore
			}
		};
		document.addEventListener( 'drop', onDropCapture, true );
		return () => {
			document.removeEventListener( 'drop', onDropCapture, true );
		};
	}, [ dragActive, onDropItem, onReorderDrop ] );

	useEffect( () => {
		if ( ! onUndo && ! onRedo ) {
			return;
		}
		const onKey = ( e ) => {
			const t = e.target;
			if ( t instanceof window.HTMLElement ) {
				if ( t.isContentEditable ) {
					return;
				}
				if ( t.closest( '[contenteditable="true"]' ) ) {
					return;
				}
				const tag = t.tagName;
				if (
					tag === 'INPUT' ||
					tag === 'TEXTAREA' ||
					tag === 'SELECT'
				) {
					return;
				}
			}
			const mod = e.metaKey || e.ctrlKey;
			if ( ! mod ) {
				return;
			}
			const k = e.key;
			if ( k === 'z' || k === 'Z' ) {
				if ( e.shiftKey ) {
					if ( canRedo && onRedo ) {
						e.preventDefault();
						onRedo();
					}
				} else if ( canUndo && onUndo ) {
					e.preventDefault();
					onUndo();
				}
				return;
			}
			if ( ( k === 'y' || k === 'Y' ) && canRedo && onRedo ) {
				e.preventDefault();
				onRedo();
			}
		};
		document.addEventListener( 'keydown', onKey, true );
		return () => document.removeEventListener( 'keydown', onKey, true );
	}, [ canUndo, canRedo, onUndo, onRedo ] );

	const rootChildCount = ( tree.root.children || [] ).length;
	const showAddItemButton = rootChildCount >= 1;
	const canShowSettings = showDetail && findNodeById( tree.root, selectedId );
	const floatingOpen = paletteModalOpen || canShowSettings;
	const isPaletteView = paletteModalOpen;

	return (
		<div className="opb-builder-root">
			<div className="opb-builder-header">
				<Button
					className="opb-builder-header__undo"
					icon={ undo }
					variant="tertiary"
					size="small"
					disabled={ ! canUndo }
					label={ __( 'Undo', 'onepress' ) }
					showTooltip
					onClick={ () => onUndo?.() }
				/>
				<Button
					className="opb-builder-header__redo"
					icon={ redo }
					variant="tertiary"
					size="small"
					disabled={ ! canRedo }
					label={ __( 'Redo', 'onepress' ) }
					showTooltip
					onClick={ () => onRedo?.() }
				/>
			</div>
			<div
				ref={ layoutRef }
				className={
					'opb-layout' +
					( dragActive ? ' opb-layout--drag-active' : '' )
				}
			>
				<div className="opb-layout__main">
					<div className="opb-layout__canvas-wrap">
						<BuilderCanvas
							tree={ tree }
							selectedId={ selectedId }
							activeDropKey={ activeDropKey }
							onSelect={ onSelect }
							onRemove={ onRemove }
							onDropItem={ onDropItem }
							onReorderDrop={ onReorderDrop }
							onOpenPaletteModal={ openPaletteModal }
						/>
					</div>
					{ showAddItemButton ? (
						<div className="opb-layout__add-item">
							<Button
								variant="secondary"
								onClick={ () =>
									openPaletteModal( {
										parentId: tree.root.id,
										index: tree.root.children?.length ?? 0,
									} )
								}
							>
								{ __( 'Add item', 'onepress' ) }
							</Button>
						</div>
					) : null }
				</div>
				{ floatingOpen ? (
					<BuilderFloatingModal
						ref={ floatingModalRef }
						customizerControlId={ customizerControlId }
						title={
							isPaletteView
								? __( 'Add blocks', 'onepress' )
								: __( 'Block settings', 'onepress' )
						}
						ariaLabel={
							isPaletteView
								? __( 'Add blocks', 'onepress' )
								: __( 'Block settings', 'onepress' )
						}
						closeLabel={
							isPaletteView
								? __( 'Close', 'onepress' )
								: __( 'Close settings', 'onepress' )
						}
						onClose={
							isPaletteView
								? closePaletteModal
								: () => onSelect( null )
						}
						onTitleClick={
							isPaletteView || ! canFocusCustomizerSidebar
								? undefined
								: focusThisCustomizerControl
						}
					>
						{ isPaletteView ? (
							<BuilderPalette
								onPickType={
									paletteInsertTarget
										? handlePalettePickType
										: undefined
								}
							/>
						) : (
							<BuilderInspector
								tree={ tree }
								selectedId={ selectedId }
								onBack={ () => onSelect( null ) }
								onChangeProps={ onChangeProps }
								onChangeColumnCount={ onChangeColumnCount }
								onRemove={ onRemove }
								variant="modal"
							/>
						) }
					</BuilderFloatingModal>
				) : null }
			</div>
		</div>
	);
}
