/**
 * Icon-only link / unlink control with tooltip (TRBL spacing, border radius corners, etc.).
 */
import { Button, Tooltip } from '@wordpress/components';
import { link, linkOff } from '@wordpress/icons';

/**
 * @param {object} props
 * @param {boolean} props.linked
 * @param {(nextLinked: boolean) => void} props.onLinkedChange
 * @param {string} props.linkLabel — Tooltip (and aria) when unlinked: action to link
 * @param {string} props.unlinkLabel — When linked: action to unlink
 */
export function TrblLinkIconButton({ linked, onLinkedChange, linkLabel, unlinkLabel }) {
	const tooltipText = linked ? unlinkLabel : linkLabel;
	return (
		<Tooltip text={tooltipText}>
			<Button
				type="button"
				variant="tertiary"
				size="small"
				className="trbl-link-toggle"
				icon={linked ? linkOff : link}
				label={tooltipText}
				aria-pressed={linked}
				onClick={() => onLinkedChange(!linked)}
			/>
		</Tooltip>
	);
}
