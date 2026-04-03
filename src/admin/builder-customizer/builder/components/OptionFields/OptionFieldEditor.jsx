import { BaseControl } from '@wordpress/components';
import { useEffect, useMemo, useRef } from '@wordpress/element';
import { OPTION_FIELD_CLASS } from './utils.js';

/**
 * @param {string} nodeId    Builder node id.
 * @param {string} fieldName Field `name` from schema.
 * @return {string} Safe unique DOM id for wp.editor.
 */
function makeEditorDomId( nodeId, fieldName ) {
	const raw = `${ nodeId }_${ fieldName }`.replace( /[^a-zA-Z0-9]+/g, '_' );
	const id = `opb_wpe_${ raw }`;
	return id.length > 80 ? id.slice( 0, 80 ) : id;
}

function waitForWpEditor( callback, maxFrames = 120 ) {
	let frames = 0;
	const tick = () => {
		const wp = window.wp;
		if (
			wp?.editor?.initialize &&
			typeof wp.editor.getDefaultSettings === 'function'
		) {
			callback();
			return;
		}
		frames += 1;
		if ( frames < maxFrames ) {
			window.requestAnimationFrame( tick );
		}
	};
	window.requestAnimationFrame( tick );
}

/** TinyMCE row 1; `wp_adv` toggles row 2 (kitchen sink). Omit `fullscreen` for Customizer overlay. */
const OPB_EDITOR_TINYMCE_TOOLBAR1 =
	'formatselect,bold,italic,underline,bullist,numlist,blockquote,alignleft,aligncenter,alignright,alignjustify,link,unlink,wp_adv';

/** TinyMCE row 2 — colors, hr, cleanup, indent, history. */
const OPB_EDITOR_TINYMCE_TOOLBAR2 =
	'strikethrough,hr,forecolor,pastetext,removeformat,charmap,outdent,indent,undo,redo';

/** Quicktags (HTML tab): blockquote, del/ins, lists, code, close tags. */
const OPB_EDITOR_QUICKTAGS_BUTTONS =
	'strong,em,link,block,del,ins,ul,ol,li,code,close';

/**
 * Rich text via core `wp.editor.initialize` (TinyMCE + Quicktags), with plain textarea fallback.
 *
 * @param {Object}                  props
 * @param {Record<string, unknown>} props.field
 * @param {Record<string, unknown>} props.propsBag
 * @param {Record<string, unknown>} props.node
 * @param {Function}                props.onChangeProps
 */
export default function OptionFieldEditor( {
	field,
	propsBag,
	node,
	onChangeProps,
} ) {
	const name = typeof field.name === 'string' ? field.name : '';
	const label = typeof field.label === 'string' ? field.label : '';
	const help = typeof field.help === 'string' ? field.help : undefined;
	const nodeId =
		node && typeof node.id === 'string' && node.id !== ''
			? node.id
			: 'unknown';
	const controlId = name ? `opb-field-editor-${ name }` : 'opb-field-editor';

	const editorId = useMemo(
		() => makeEditorDomId( nodeId, name || 'field' ),
		[ nodeId, name ]
	);

	const textareaRef = useRef( null );
	const onChangePropsRef = useRef( onChangeProps );
	const nameRef = useRef( name );
	const debounceRef = useRef( null );
	const mceActiveRef = useRef( false );

	useEffect( () => {
		onChangePropsRef.current = onChangeProps;
		nameRef.current = name;
	}, [ onChangeProps, name ] );

	const content =
		propsBag[ name ] !== undefined && propsBag[ name ] !== null
			? String( propsBag[ name ] )
			: '';

	const rows =
		typeof field.rows === 'number' && field.rows > 0 ? field.rows : 10;

	useEffect( () => {
		if ( ! name ) {
			return;
		}
		const el = textareaRef.current;
		if ( ! el ) {
			return;
		}

		mceActiveRef.current = false;
		el.value = content;

		let cancelled = false;

		const schedulePush = () => {
			if ( debounceRef.current !== null ) {
				window.clearTimeout( debounceRef.current );
			}
			debounceRef.current = window.setTimeout( () => {
				debounceRef.current = null;
				const wp = window.wp;
				let html;
				if ( mceActiveRef.current && wp?.editor?.getContent ) {
					html = wp.editor.getContent( editorId );
				} else {
					html = el.value;
				}
				if ( typeof html === 'string' ) {
					onChangePropsRef.current( {
						[ nameRef.current ]: html,
					} );
				}
			}, 300 );
		};

		const onNativeInput = () => {
			schedulePush();
		};

		el.addEventListener( 'input', onNativeInput );

		waitForWpEditor( () => {
			if (
				cancelled ||
				! textareaRef.current ||
				textareaRef.current !== el
			) {
				return;
			}
			const wp = window.wp;
			if ( ! wp?.editor?.initialize ) {
				return;
			}

			el.value = content;

			const tinymceHeight = Math.min( 400, Math.max( 160, rows * 22 ) );

			wp.editor.initialize( editorId, {
				tinymce: {
					height: tinymceHeight,
					toolbar1: OPB_EDITOR_TINYMCE_TOOLBAR1,
					toolbar2: OPB_EDITOR_TINYMCE_TOOLBAR2,
					setup( ed ) {
						ed.on( 'change undo redo keyup', schedulePush );
					},
				},
				quicktags: {
					buttons: OPB_EDITOR_QUICKTAGS_BUTTONS,
				},
				mediaButtons: true,
			} );

			mceActiveRef.current = true;
		} );

		return () => {
			cancelled = true;
			el.removeEventListener( 'input', onNativeInput );
			if ( debounceRef.current !== null ) {
				window.clearTimeout( debounceRef.current );
				debounceRef.current = null;
			}
			if ( mceActiveRef.current && window.wp?.editor?.remove ) {
				window.wp.editor.remove( editorId );
			}
			mceActiveRef.current = false;
		};
		// Re-init when the editor instance changes; omit `content` so typing does not re-run this effect.
		// eslint-disable-next-line react-hooks/exhaustive-deps -- content applied on mount via closure + el.value
	}, [ editorId, rows, name ] );

	if ( ! name ) {
		return null;
	}

	return (
		<BaseControl
			id={ controlId }
			className={ OPTION_FIELD_CLASS + ' opb-mini-builder-field--editor' }
			label={ label }
			help={ help }
			__nextHasNoMarginBottom
		>
			<div className="opb-field-editor">
				<textarea
					key={ editorId }
					ref={ textareaRef }
					id={ editorId }
					className="opb-field-editor__textarea wp-editor-area"
					defaultValue={ content }
					aria-label={ label }
					rows={ rows }
				/>
			</div>
		</BaseControl>
	);
}
