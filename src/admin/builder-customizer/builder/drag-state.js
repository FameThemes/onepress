/** @type {'palette'|'reorder'|null} */
let builderDragMode = null;

/**
 * @param {'palette'|'reorder'|null} mode
 */
export function setBuilderDragMode( mode ) {
	builderDragMode = mode;
}

/**
 * @return {'palette'|'reorder'|null}
 */
export function getBuilderDragMode() {
	return builderDragMode;
}
