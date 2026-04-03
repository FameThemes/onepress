/**
 * @typedef {Object} BuilderColumn
 * @property {string}        id
 * @property {BuilderNode[]} children
 */

/** Min / max columns in a columns block. */
export const COLUMNS_COUNT_MIN = 2;
export const COLUMNS_COUNT_MAX = 6;

/**
 * @typedef {Object} BuilderNode
 * @property {string}            id
 * @property {string}            type
 * @property {Record<string, *>} props
 * @property {BuilderNode[]}     [children]
 * @property {BuilderColumn[]}   [columns]
 */

/**
 * @typedef {Object} BuilderTree
 * @property {number}      v
 * @property {BuilderNode} root
 */

/**
 * @param {unknown} raw
 * @return {BuilderTree}
 */
export function parseBuilderTree( raw ) {
	const fallback = defaultTree();
	if ( raw == null || raw === '' ) {
		return fallback;
	}
	let parsed = raw;
	if ( typeof raw === 'string' ) {
		try {
			parsed = JSON.parse( raw );
		} catch {
			return fallback;
		}
	}
	if (
		! parsed ||
		typeof parsed !== 'object' ||
		! ( /** @type {{root?:unknown}} */ ( parsed ).root )
	) {
		return fallback;
	}
	const root = /** @type {{root:BuilderNode}} */ ( parsed ).root;
	if (
		! root ||
		typeof root !== 'object' ||
		root.type !== 'onepress/section'
	) {
		return fallback;
	}
	return {
		v:
			typeof ( /** @type {{v?:number}} */ ( parsed ).v ) === 'number'
				? parsed.v
				: 1,
		root: cloneNode( root ),
	};
}

/**
 * @return {BuilderTree}
 */
export function defaultTree() {
	return {
		v: 1,
		root: {
			id: 'root',
			type: 'onepress/section',
			props: {},
			children: [],
		},
	};
}

/**
 * @param {BuilderNode} node
 * @return {BuilderNode}
 */
function cloneNode( node ) {
	return JSON.parse( JSON.stringify( node ) );
}

/**
 * @param {BuilderTree}       tree
 * @param {string}            nodeId
 * @param {Record<string, *>} patch
 * @return {BuilderTree}
 */
export function updateNodeProps( tree, nodeId, patch ) {
	return {
		...tree,
		root: mapNodeDeep( tree.root, ( n ) =>
			n.id === nodeId ? { ...n, props: { ...n.props, ...patch } } : n
		),
	};
}

/**
 * @param {BuilderNode}                     node
 * @param {(n: BuilderNode) => BuilderNode} mapFn
 * @return {BuilderNode}
 */
function mapNodeDeep( node, mapFn ) {
	const mapped = mapFn( node );
	if ( mapped.children ) {
		return {
			...mapped,
			children: mapped.children.map( ( c ) => mapNodeDeep( c, mapFn ) ),
		};
	}
	if ( mapped.columns ) {
		return {
			...mapped,
			columns: mapped.columns.map( ( col ) => ( {
				...col,
				children: col.children.map( ( c ) => mapNodeDeep( c, mapFn ) ),
			} ) ),
		};
	}
	return mapped;
}

/**
 * @param {BuilderTree} tree
 * @param {string}      targetId
 * @return {BuilderTree}
 */
export function removeNodeFromTree( tree, targetId ) {
	if ( tree.root.id === targetId ) {
		return tree;
	}
	return {
		...tree,
		root: removeFromNode( tree.root, targetId ),
	};
}

/**
 * @param {BuilderNode} node
 * @param {string}      targetId
 * @return {BuilderNode}
 */
function removeFromNode( node, targetId ) {
	if ( node.children ) {
		const idx = node.children.findIndex( ( c ) => c.id === targetId );
		if ( idx >= 0 ) {
			return {
				...node,
				children: node.children.filter( ( _, i ) => i !== idx ),
			};
		}
		return {
			...node,
			children: node.children.map( ( c ) =>
				removeFromNode( c, targetId )
			),
		};
	}
	if ( node.columns ) {
		return {
			...node,
			columns: node.columns.map( ( col ) => ( {
				...col,
				children: col.children
					.filter( ( c ) => c.id !== targetId )
					.map( ( c ) => removeFromNode( c, targetId ) ),
			} ) ),
		};
	}
	return node;
}

/**
 * @param {BuilderTree} tree
 * @param {string}      parentId
 * @param {number}      index
 * @param {BuilderNode} newNode
 * @return {BuilderTree}
 */
export function insertChildAt( tree, parentId, index, newNode ) {
	return {
		...tree,
		root: insertAt( tree.root, parentId, index, newNode ),
	};
}

/**
 * @param {BuilderNode} node
 * @param {string}      parentId
 * @param {number}      index
 * @param {BuilderNode} newNode
 * @return {BuilderNode}
 */
function insertAt( node, parentId, index, newNode ) {
	if ( node.id === parentId && node.children ) {
		const ch = [ ...node.children ];
		ch.splice( index, 0, newNode );
		return { ...node, children: ch };
	}
	if ( node.children ) {
		return {
			...node,
			children: node.children.map( ( c ) =>
				insertAt( c, parentId, index, newNode )
			),
		};
	}
	if ( node.columns ) {
		return {
			...node,
			columns: node.columns.map( ( col ) => {
				if ( col.id === parentId ) {
					const ch = [ ...col.children ];
					ch.splice( index, 0, newNode );
					return { ...col, children: ch };
				}
				return {
					...col,
					children: col.children.map( ( c ) =>
						insertAt( c, parentId, index, newNode )
					),
				};
			} ),
		};
	}
	return node;
}

export function getListLengthForParent( root, parentId ) {
	if ( root.id === parentId ) {
		return Array.isArray( root.children ) ? root.children.length : 0;
	}
	if ( root.children ) {
		for ( const c of root.children ) {
			const n = getListLengthForParent( c, parentId );
			if ( n >= 0 ) {
				return n;
			}
		}
	}
	if ( root.columns ) {
		for ( const col of root.columns ) {
			if ( col.id === parentId ) {
				return col.children.length;
			}
			for ( const c of col.children ) {
				const n = getListLengthForParent( c, parentId );
				if ( n >= 0 ) {
					return n;
				}
			}
		}
	}
	return -1;
}

export function findParentContext( root, targetId ) {
	if ( root.children ) {
		for ( let i = 0; i < root.children.length; i++ ) {
			const c = root.children[ i ];
			if ( c.id === targetId ) {
				return { parentId: root.id, index: i };
			}
			const inner = findParentContext( c, targetId );
			if ( inner ) {
				return inner;
			}
		}
	}
	if ( root.columns ) {
		for ( const col of root.columns ) {
			for ( let i = 0; i < col.children.length; i++ ) {
				const c = col.children[ i ];
				if ( c.id === targetId ) {
					return { parentId: col.id, index: i };
				}
				const inner = findParentContext( c, targetId );
				if ( inner ) {
					return inner;
				}
			}
		}
	}
	return null;
}

export function findNodeById( root, id ) {
	if ( root.id === id ) {
		return root;
	}
	if ( root.children ) {
		for ( const c of root.children ) {
			const f = findNodeById( c, id );
			if ( f ) {
				return f;
			}
		}
	}
	if ( root.columns ) {
		for ( const col of root.columns ) {
			for ( const c of col.children ) {
				const f = findNodeById( c, id );
				if ( f ) {
					return f;
				}
			}
		}
	}
	return null;
}

/**
 * All ids in the subtree rooted at `node` (includes column container ids).
 *
 * @param {BuilderNode} node
 * @return {Set<string>}
 */
export function collectSubtreeIdSet( node ) {
	const s = new Set();
	function walk( n ) {
		s.add( n.id );
		if ( n.children ) {
			n.children.forEach( walk );
		}
		if ( n.columns ) {
			for ( const col of n.columns ) {
				s.add( col.id );
				col.children.forEach( walk );
			}
		}
	}
	walk( node );
	return s;
}

/**
 * Move a node to `targetIndex` under `targetParentId` (reorder / reparent).
 *
 * @param {BuilderTree} tree
 * @param {string}      nodeId
 * @param {string}      targetParentId
 * @param {number}      targetIndex
 * @return {BuilderTree}
 */
export function moveNodeInTree( tree, nodeId, targetParentId, targetIndex ) {
	if ( nodeId === 'root' ) {
		return tree;
	}
	const node = findNodeById( tree.root, nodeId );
	if ( ! node ) {
		return tree;
	}
	const sourceCtx = findParentContext( tree.root, nodeId );
	if ( ! sourceCtx ) {
		return tree;
	}

	const forbidden = collectSubtreeIdSet( node );
	if ( forbidden.has( targetParentId ) ) {
		return tree;
	}

	const idx = Math.max( 0, Math.floor( targetIndex ) );
	if ( Number.isNaN( idx ) ) {
		return tree;
	}

	if ( sourceCtx.parentId === targetParentId ) {
		if ( idx === sourceCtx.index || idx === sourceCtx.index + 1 ) {
			return tree;
		}
	}

	const clone = JSON.parse( JSON.stringify( node ) );

	let insertIdx = idx;
	if ( sourceCtx.parentId === targetParentId && sourceCtx.index < idx ) {
		insertIdx = idx - 1;
	}

	const without = removeNodeFromTree( tree, nodeId );
	return insertChildAt( without, targetParentId, insertIdx, clone );
}

/**
 * Equal integer % widths summing to 100.
 *
 * @param {number} n
 * @return {number[]}
 */
export function equalColumnWidths( n ) {
	if ( n <= 0 ) {
		return [];
	}
	const base = Math.floor( 100 / n );
	const out = Array( n ).fill( base );
	out[ n - 1 ] = 100 - base * ( n - 1 );
	return out;
}

/**
 * @param {number[]} arr
 * @return {number[]}
 */
function normalizePercentWidths( arr ) {
	const n = arr.length;
	if ( n === 0 ) {
		return [];
	}
	const safe = arr.map( ( w ) => {
		const x = Math.round( Number( w ) ) || 0;
		return Math.max( 1, Math.min( 100, x ) );
	} );
	const s = safe.reduce( ( a, b ) => a + b, 0 );
	if ( s <= 0 ) {
		return equalColumnWidths( n );
	}
	const rounded = safe.map( ( w ) => Math.round( ( w / s ) * 100 ) );
	const drift = 100 - rounded.reduce( ( a, b ) => a + b, 0 );
	rounded[ n - 1 ] += drift;
	return rounded;
}

/**
 * @param {number[]|null|undefined} prev
 * @param {number}                  newCount
 * @return {number[]}
 */
function widthsAfterCountChange( prev, newCount ) {
	if ( newCount <= 0 ) {
		return [];
	}
	if ( ! prev || prev.length === 0 ) {
		return equalColumnWidths( newCount );
	}
	if ( prev.length === newCount ) {
		return normalizePercentWidths( prev );
	}
	if ( prev.length > newCount ) {
		const merged = prev.slice( 0, newCount );
		merged[ newCount - 1 ] += prev
			.slice( newCount )
			.reduce( ( a, b ) => a + b, 0 );
		return normalizePercentWidths( merged );
	}
	return equalColumnWidths( newCount );
}

/**
 * Resolved % widths for a columns node (defaults to equal split).
 *
 * @param {BuilderNode} node
 * @return {number[]}
 */
export function getColumnWidthsForNode( node ) {
	const cols = node.columns || [];
	const n = cols.length;
	if ( n === 0 ) {
		return [];
	}
	const raw = node.props?.columnWidths;
	if ( Array.isArray( raw ) && raw.length === n ) {
		return normalizePercentWidths( raw.map( ( x ) => Number( x ) ) );
	}
	return equalColumnWidths( n );
}

/**
 * Change one column %; redistribute others to keep sum 100.
 *
 * @param {number[]} widths
 * @param {number}   index
 * @param {number}   newVal
 * @return {number[]}
 */
export function redistributeColumnWidths( widths, index, newVal ) {
	const n = widths.length;
	if ( n === 0 ) {
		return [];
	}
	const w = Math.min( 95, Math.max( 5, Math.round( newVal ) ) );
	if ( n === 1 ) {
		return [ 100 ];
	}
	const remaining = 100 - w;
	const otherIndices = [];
	for ( let i = 0; i < n; i++ ) {
		if ( i !== index ) {
			otherIndices.push( i );
		}
	}
	let sumOld = 0;
	for ( const i of otherIndices ) {
		sumOld += widths[ i ];
	}
	const next = [ ...widths ];
	next[ index ] = w;
	if ( sumOld <= 0 ) {
		const each = Math.floor( remaining / otherIndices.length );
		for ( let o = 0; o < otherIndices.length; o++ ) {
			next[ otherIndices[ o ] ] =
				o === otherIndices.length - 1
					? remaining - each * ( otherIndices.length - 1 )
					: each;
		}
		return next;
	}
	for ( const i of otherIndices ) {
		next[ i ] = Math.round( ( widths[ i ] / sumOld ) * remaining );
	}
	const drift = 100 - next.reduce( ( a, b ) => a + b, 0 );
	next[ otherIndices[ otherIndices.length - 1 ] ] += drift;
	return next;
}

/**
 * Resize columns container (preserves existing column children when possible).
 *
 * @param {BuilderTree} tree
 * @param {string}      nodeId
 * @param {number}      count
 * @return {BuilderTree}
 */
export function setColumnsCount( tree, nodeId, count ) {
	const c = Math.min(
		COLUMNS_COUNT_MAX,
		Math.max( COLUMNS_COUNT_MIN, Math.floor( count ) || COLUMNS_COUNT_MIN )
	);
	return {
		...tree,
		root: mapNodeDeep( tree.root, ( n ) => {
			if ( n.id !== nodeId || n.type !== 'onepress/columns' ) {
				return n;
			}
			const existing = n.columns || [];
			const prevWidths = Array.isArray( n.props?.columnWidths )
				? n.props.columnWidths.map( ( x ) => Number( x ) )
				: null;
			const nextCols = [];
			for ( let i = 0; i < c; i++ ) {
				nextCols.push(
					existing[ i ] || { id: `col-${ i + 1 }`, children: [] }
				);
			}
			const nextWidths = widthsAfterCountChange( prevWidths, c );
			return {
				...n,
				props: {
					...n.props,
					columnCount: c,
					columnWidths: nextWidths,
				},
				columns: nextCols,
			};
		} ),
	};
}

export function reorderInParent( tree, parentId, fromIndex, toIndex ) {
	return {
		...tree,
		root: reorderInNode( tree.root, parentId, fromIndex, toIndex ),
	};
}

/**
 * @param {BuilderNode} node
 * @param {string}      parentId
 * @param {number}      fromIndex
 * @param {number}      toIndex
 * @return {BuilderNode}
 */
function reorderInNode( node, parentId, fromIndex, toIndex ) {
	if ( node.id === parentId && node.children ) {
		const next = [ ...node.children ];
		if (
			fromIndex === toIndex ||
			fromIndex < 0 ||
			toIndex < 0 ||
			fromIndex >= next.length ||
			toIndex >= next.length
		) {
			return node;
		}
		const [ removed ] = next.splice( fromIndex, 1 );
		next.splice( toIndex, 0, removed );
		return { ...node, children: next };
	}
	if ( node.children ) {
		return {
			...node,
			children: node.children.map( ( c ) =>
				reorderInNode( c, parentId, fromIndex, toIndex )
			),
		};
	}
	if ( node.columns ) {
		return {
			...node,
			columns: node.columns.map( ( col ) => {
				if ( col.id === parentId ) {
					const next = [ ...col.children ];
					if (
						fromIndex === toIndex ||
						fromIndex < 0 ||
						toIndex < 0 ||
						fromIndex >= next.length ||
						toIndex >= next.length
					) {
						return col;
					}
					const [ removed ] = next.splice( fromIndex, 1 );
					next.splice( toIndex, 0, removed );
					return { ...col, children: next };
				}
				return {
					...col,
					children: col.children.map( ( c ) =>
						reorderInNode( c, parentId, fromIndex, toIndex )
					),
				};
			} ),
		};
	}
	return node;
}
