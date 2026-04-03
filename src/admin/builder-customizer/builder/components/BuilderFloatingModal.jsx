import { Button } from '@wordpress/components';
// eslint-disable-next-line import/no-extraneous-dependencies -- @wordpress/icons is a WP peer dependency
import { close } from '@wordpress/icons';
import {
	forwardRef,
	useCallback,
	useEffect,
	useState,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { createPortal } from 'react-dom';

/**
 * Expand Customizer sidebar to this builder control when needed.
 * If that section is already expanded, skip control.focus() to avoid sidebar scroll jump.
 *
 * @param {string} sectionId Customize section id (from PHP / control.params.section).
 * @param {string} controlId Customize control id (from PHP / control.id).
 */
export function focusBuilderCustomizerControl( sectionId, controlId ) {
	if (
		typeof sectionId !== 'string' ||
		typeof controlId !== 'string' ||
		sectionId === '' ||
		controlId === ''
	) {
		return;
	}
	try {
		const customize = window.wp?.customize;
		if ( ! customize ) {
			return;
		}
		const sec = customize.section( sectionId );
		const ctl = customize.control( controlId );

		const builderSectionActive =
			sec?.expanded &&
			typeof sec.expanded.get === 'function' &&
			sec.expanded.get();

		if ( builderSectionActive ) {
			return;
		}

		if ( ctl && typeof ctl.focus === 'function' ) {
			ctl.focus();
			return;
		}
		if ( sec && typeof sec.expand === 'function' ) {
			sec.expand( { allowMultiple: true } );
		}
	} catch {
		// ignore
	}
}

function getModalStorageKey( controlId ) {
	return controlId
		? `onepress_builder_settings_modal_rect:${ controlId }`
		: 'onepress_builder_settings_modal_rect';
}
const DEFAULT_W = 340;
const DEFAULT_H = 440;
const MIN_W = 260;
const MIN_H = 220;
const MIN_VISIBLE = 48;

function readStoredRect( storageKey ) {
	if ( typeof window === 'undefined' ) {
		return null;
	}
	try {
		const raw = window.localStorage.getItem( storageKey );
		if ( ! raw ) {
			return null;
		}
		const p = JSON.parse( raw );
		if (
			typeof p.x !== 'number' ||
			typeof p.y !== 'number' ||
			typeof p.w !== 'number' ||
			typeof p.h !== 'number'
		) {
			return null;
		}
		return {
			x: p.x,
			y: p.y,
			w: Math.max( MIN_W, p.w ),
			h: Math.max( MIN_H, p.h ),
		};
	} catch {
		return null;
	}
}

function writeStoredRect( storageKey, r ) {
	try {
		window.localStorage.setItem( storageKey, JSON.stringify( r ) );
	} catch {
		// ignore
	}
}

function clampRectToViewport( r ) {
	if ( typeof window === 'undefined' ) {
		return r;
	}
	const vw = window.innerWidth;
	const vh = window.innerHeight;
	const w = Math.max( MIN_W, Math.min( r.w, vw - 8 ) );
	const h = Math.max( MIN_H, Math.min( r.h, vh - 8 ) );
	const minX = MIN_VISIBLE - w;
	const maxX = vw - MIN_VISIBLE;
	const minY = MIN_VISIBLE - h;
	const maxY = vh - MIN_VISIBLE;
	let x = r.x;
	let y = r.y;
	if ( maxX < minX ) {
		x = Math.max( 0, ( vw - w ) / 2 );
	} else {
		x = Math.min( Math.max( minX, x ), maxX );
	}
	if ( maxY < minY ) {
		y = Math.max( 0, ( vh - h ) / 2 );
	} else {
		y = Math.min( Math.max( minY, y ), maxY );
	}
	return { x, y, w, h };
}

function defaultRect() {
	if ( typeof window === 'undefined' ) {
		return { x: 24, y: 80, w: DEFAULT_W, h: DEFAULT_H };
	}
	const w = DEFAULT_W;
	const h = DEFAULT_H;
	return clampRectToViewport( {
		x: Math.max( 8, window.innerWidth - w - 20 ),
		y: 96,
		w,
		h,
	} );
}

/**
 * Shared portaled panel: drag header, resize, no backdrop (so HTML5 drag can reach canvas).
 *
 * @param {Object}   props
 * @param {string}   props.title
 * @param {string}   props.ariaLabel
 * @param {string}   props.closeLabel
 * @param {Function} props.onClose
 * @param {Function} [props.onTitleClick]        Optional; title button runs this (e.g. focus Customizer control).
 * @param {string}   [props.customizerControlId] Optional; per-control localStorage key for modal position.
 */
const BuilderFloatingModal = forwardRef( function BuilderFloatingModal(
	{
		title,
		ariaLabel,
		closeLabel,
		onClose,
		onTitleClick,
		customizerControlId = '',
		children,
	},
	ref
) {
	const modalStorageKey = getModalStorageKey( customizerControlId );

	const [ rect, setRect ] = useState( () => {
		const stored = readStoredRect( modalStorageKey );
		if ( stored ) {
			return clampRectToViewport( stored );
		}
		return defaultRect();
	} );

	useEffect( () => {
		const onResize = () => {
			setRect( ( prev ) => clampRectToViewport( prev ) );
		};
		window.addEventListener( 'resize', onResize );
		return () => window.removeEventListener( 'resize', onResize );
	}, [] );

	useEffect( () => {
		const onKey = ( e ) => {
			if ( e.key === 'Escape' ) {
				e.preventDefault();
				onClose();
			}
		};
		document.addEventListener( 'keydown', onKey, true );
		return () => document.removeEventListener( 'keydown', onKey, true );
	}, [ onClose ] );

	const onDragHeaderPointerDown = useCallback(
		( e ) => {
			if ( e.button !== 0 ) {
				return;
			}
			const target = e.target;
			if (
				target.closest( 'button' ) ||
				target.closest( 'a' ) ||
				target.closest( 'input' ) ||
				target.closest( 'textarea' )
			) {
				return;
			}
			e.preventDefault();
			const header = e.currentTarget;
			const pid = e.pointerId;
			if ( typeof header.setPointerCapture === 'function' ) {
				try {
					header.setPointerCapture( pid );
				} catch {
					// ignore
				}
			}

			const startX = e.clientX;
			const startY = e.clientY;
			const base = { ...rect };

			const move = ( ev ) => {
				const dx = ev.clientX - startX;
				const dy = ev.clientY - startY;
				setRect(
					clampRectToViewport( {
						...base,
						x: base.x + dx,
						y: base.y + dy,
					} )
				);
			};

			let finished = false;
			const finish = () => {
				if ( finished ) {
					return;
				}
				finished = true;
				header.removeEventListener( 'pointermove', move );
				header.removeEventListener( 'pointerup', finish );
				header.removeEventListener( 'pointercancel', finish );
				header.removeEventListener( 'lostpointercapture', finish );
				try {
					if ( typeof header.releasePointerCapture === 'function' ) {
						header.releasePointerCapture( pid );
					}
				} catch {
					// ignore
				}
				setRect( ( prev ) => {
					const next = clampRectToViewport( prev );
					writeStoredRect( modalStorageKey, next );
					return next;
				} );
			};

			header.addEventListener( 'pointermove', move );
			header.addEventListener( 'pointerup', finish );
			header.addEventListener( 'pointercancel', finish );
			header.addEventListener( 'lostpointercapture', finish );
		},
		[ rect, modalStorageKey ]
	);

	const onResizePointerDown = useCallback(
		( e ) => {
			if ( e.button !== 0 ) {
				return;
			}
			e.preventDefault();
			e.stopPropagation();

			const handle = e.currentTarget;
			const pid = e.pointerId;
			if ( typeof handle.setPointerCapture === 'function' ) {
				try {
					handle.setPointerCapture( pid );
				} catch {
					// ignore
				}
			}

			const startX = e.clientX;
			const startY = e.clientY;
			const base = { ...rect };

			const move = ( ev ) => {
				const dw = ev.clientX - startX;
				const dh = ev.clientY - startY;
				setRect(
					clampRectToViewport( {
						...base,
						w: base.w + dw,
						h: base.h + dh,
					} )
				);
			};

			let finished = false;
			const finish = () => {
				if ( finished ) {
					return;
				}
				finished = true;
				handle.removeEventListener( 'pointermove', move );
				handle.removeEventListener( 'pointerup', finish );
				handle.removeEventListener( 'pointercancel', finish );
				handle.removeEventListener( 'lostpointercapture', finish );
				try {
					if ( typeof handle.releasePointerCapture === 'function' ) {
						handle.releasePointerCapture( pid );
					}
				} catch {
					// ignore
				}
				setRect( ( prev ) => {
					const next = clampRectToViewport( prev );
					writeStoredRect( modalStorageKey, next );
					return next;
				} );
			};

			handle.addEventListener( 'pointermove', move );
			handle.addEventListener( 'pointerup', finish );
			handle.addEventListener( 'pointercancel', finish );
			handle.addEventListener( 'lostpointercapture', finish );
		},
		[ rect, modalStorageKey ]
	);

	if ( typeof document === 'undefined' ) {
		return null;
	}

	const titleClick = typeof onTitleClick === 'function' ? onTitleClick : null;

	return createPortal(
		<div
			ref={ ref }
			className="opb-settings-modal"
			style={ {
				left: rect.x,
				top: rect.y,
				width: rect.w,
				height: rect.h,
			} }
			role="dialog"
			aria-label={ ariaLabel }
			aria-modal="false"
		>
			<div
				className="opb-settings-modal__header"
				onPointerDown={ onDragHeaderPointerDown }
			>
				<div className="opb-settings-modal__header-text">
					{ titleClick ? (
						<button
							type="button"
							className="opb-settings-modal__title"
							onPointerDown={ ( e ) => e.stopPropagation() }
							onClick={ () => titleClick() }
						>
							{ title }
						</button>
					) : (
						<span className="opb-settings-modal__title opb-settings-modal__title--static">
							{ title }
						</span>
					) }
					<span className="opb-settings-modal__drag-hint">
						{ __( 'Drag to move', 'onepress' ) }
					</span>
				</div>
				<Button
					className="opb-settings-modal__close"
					icon={ close }
					label={ closeLabel }
					onClick={ onClose }
					size="small"
					variant="tertiary"
				/>
			</div>
			<div className="opb-settings-modal__body">{ children }</div>
			<button
				type="button"
				className="opb-settings-modal__resize"
				aria-label={ __( 'Resize panel', 'onepress' ) }
				onPointerDown={ onResizePointerDown }
			/>
		</div>,
		document.body
	);
} );

export default BuilderFloatingModal;
