/**
 * OnePress layout builder — Customizer UI (theme_mod JSON tree).
 *
 * Portable module: paired with inc/mini-builder/mini-builder.php.
 * Block types use the `onepress/*` namespace; filters `onepress_builder_*`.
 */
import {
	createRoot,
	useCallback,
	useEffect,
	useRef,
	useState,
} from '@wordpress/element';

import Builder from './components/Builder.jsx';
import { registerDefaultBuilderItems } from './items/register-default-items.js';
import { createNodeFromTemplate } from './registry.js';
import './builder.css';
import {
	findNodeById,
	insertChildAt,
	moveNodeInTree,
	parseBuilderTree,
	removeNodeFromTree,
	setColumnsCount,
	updateNodeProps,
} from './tree-utils.js';

registerDefaultBuilderItems();

const MAX_BUILDER_UNDO = 50;

/**
 * @param {import('./tree-utils.js').BuilderTree} tree Source tree.
 * @return {import('./tree-utils.js').BuilderTree} Deep-cloned tree safe to mutate.
 */
function cloneBuilderTree( tree ) {
	return parseBuilderTree( JSON.stringify( tree ) );
}

/**
 * @param {Object}      ids `{ settingId, controlId, sectionId }` from Customizer control / DOM.
 * @param {HTMLElement} el  Root element.
 */
export function mountBuilderApp( ids, el ) {
	const root = createRoot( el );
	root.render(
		<BuilderApp
			settingId={ ids.settingId }
			customizerControlId={ ids.controlId }
			customizerSectionId={ ids.sectionId }
		/>
	);
	return root;
}

/**
 * @param {Object} props
 * @param {string} props.settingId
 * @param {string} props.customizerControlId
 * @param {string} props.customizerSectionId
 */
function BuilderApp( { settingId, customizerControlId, customizerSectionId } ) {
	const setting = wp.customize( settingId );
	const [ tree, setTree ] = useState( () =>
		parseBuilderTree( setting.get() )
	);
	const [ selectedId, setSelectedId ] = useState( null );
	const [ historyCounts, setHistoryCounts ] = useState( {
		undo: 0,
		redo: 0,
	} );

	const pastRef = useRef( [] );
	const futureRef = useRef( [] );
	const lastWrittenJsonRef = useRef( null );

	const syncHistoryCounts = useCallback( () => {
		setHistoryCounts( {
			undo: pastRef.current.length,
			redo: futureRef.current.length,
		} );
	}, [] );

	const persist = useCallback(
		( next ) => {
			const json = JSON.stringify( next );
			lastWrittenJsonRef.current = json;
			setting.set( json );
		},
		[ setting ]
	);

	/**
	 * @param {import('./tree-utils.js').BuilderTree} prev
	 * @param {import('./tree-utils.js').BuilderTree} next
	 * @return {import('./tree-utils.js').BuilderTree}
	 */
	const commitTreeChange = useCallback(
		( prev, next ) => {
			if ( next === prev ) {
				return prev;
			}
			pastRef.current.push( cloneBuilderTree( prev ) );
			if ( pastRef.current.length > MAX_BUILDER_UNDO ) {
				pastRef.current.shift();
			}
			futureRef.current = [];
			persist( next );
			syncHistoryCounts();
			return next;
		},
		[ persist, syncHistoryCounts ]
	);

	useEffect( () => {
		const raw = setting.get();
		lastWrittenJsonRef.current =
			typeof raw === 'string'
				? raw
				: JSON.stringify( parseBuilderTree( raw ) );
	}, [ setting ] );

	useEffect( () => {
		const onChange = ( value ) => {
			const str =
				typeof value === 'string'
					? value
					: JSON.stringify( value ?? '' );
			if ( str === lastWrittenJsonRef.current ) {
				return;
			}
			lastWrittenJsonRef.current = str;
			pastRef.current = [];
			futureRef.current = [];
			setHistoryCounts( { undo: 0, redo: 0 } );
			setTree( parseBuilderTree( value ) );
		};
		setting.bind( onChange );
		return () => setting.unbind( onChange );
	}, [ setting ] );

	useEffect( () => {
		if ( selectedId === null || selectedId === '' ) {
			return;
		}
		const exists = findNodeById( tree.root, selectedId );
		if ( ! exists ) {
			setSelectedId( null );
		}
	}, [ tree, selectedId ] );

	useEffect( () => {
		if ( selectedId === null || selectedId === '' ) {
			return;
		}
		const onKey = ( e ) => {
			if ( e.key === 'Escape' ) {
				e.preventDefault();
				setSelectedId( null );
			}
		};
		document.addEventListener( 'keydown', onKey );
		return () => document.removeEventListener( 'keydown', onKey );
	}, [ selectedId ] );

	const handleDropItem = useCallback(
		( parentId, index, typeName ) => {
			const newNode = createNodeFromTemplate( typeName );
			if ( ! newNode ) {
				return;
			}
			setTree( ( prev ) => {
				const next = insertChildAt( prev, parentId, index, newNode );
				return commitTreeChange( prev, next );
			} );
		},
		[ commitTreeChange ]
	);

	const handleReorderDrop = useCallback(
		( nodeId, targetParentId, targetIndex ) => {
			setTree( ( prev ) => {
				const next = moveNodeInTree(
					prev,
					nodeId,
					targetParentId,
					targetIndex
				);
				return commitTreeChange( prev, next );
			} );
		},
		[ commitTreeChange ]
	);

	const handleChangeProps = useCallback(
		( id, patch ) => {
			setTree( ( prev ) => {
				const next = updateNodeProps( prev, id, patch );
				return commitTreeChange( prev, next );
			} );
		},
		[ commitTreeChange ]
	);

	const handleChangeColumnCount = useCallback(
		( id, count ) => {
			setTree( ( prev ) => {
				const next = setColumnsCount( prev, id, count );
				return commitTreeChange( prev, next );
			} );
		},
		[ commitTreeChange ]
	);

	const handleRemove = useCallback(
		( id ) => {
			if ( id === 'root' ) {
				return;
			}
			setTree( ( prev ) => {
				const next = removeNodeFromTree( prev, id );
				return commitTreeChange( prev, next );
			} );
			setSelectedId( ( sid ) => ( sid === id ? null : sid ) );
		},
		[ commitTreeChange ]
	);

	const handleUndo = useCallback( () => {
		if ( pastRef.current.length === 0 ) {
			return;
		}
		const snapshot = pastRef.current.pop();
		setTree( ( current ) => {
			futureRef.current.push( cloneBuilderTree( current ) );
			persist( snapshot );
			syncHistoryCounts();
			return snapshot;
		} );
	}, [ persist, syncHistoryCounts ] );

	const handleRedo = useCallback( () => {
		if ( futureRef.current.length === 0 ) {
			return;
		}
		const snapshot = futureRef.current.pop();
		setTree( ( current ) => {
			pastRef.current.push( cloneBuilderTree( current ) );
			if ( pastRef.current.length > MAX_BUILDER_UNDO ) {
				pastRef.current.shift();
			}
			persist( snapshot );
			syncHistoryCounts();
			return snapshot;
		} );
	}, [ persist, syncHistoryCounts ] );

	return (
		<Builder
			tree={ tree }
			selectedId={ selectedId }
			onSelect={ setSelectedId }
			onRemove={ handleRemove }
			onDropItem={ handleDropItem }
			onReorderDrop={ handleReorderDrop }
			onChangeProps={ handleChangeProps }
			onChangeColumnCount={ handleChangeColumnCount }
			canUndo={ historyCounts.undo > 0 }
			canRedo={ historyCounts.redo > 0 }
			onUndo={ handleUndo }
			onRedo={ handleRedo }
			customizerControlId={ customizerControlId }
			customizerSectionId={ customizerSectionId }
		/>
	);
}
