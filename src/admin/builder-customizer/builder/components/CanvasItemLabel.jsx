import { Icon } from '@wordpress/components';

/**
 * Canvas row: icon + label (no content preview).
 *
 * @param {Object} props
 * @param {*}      [props.icon]
 * @param {string} props.label
 */
export default function CanvasItemLabel( { icon, label } ) {
	return (
		<span className="opb-node__item-label">
			{ icon ? (
				<Icon
					className="opb-node__item-icon"
					icon={ icon }
					size={ 18 }
				/>
			) : null }
			<span className="opb-node__item-text">{ label }</span>
		</span>
	);
}
