import MiniBuilderColumnsField from '../MiniBuilderColumnsField.jsx';

/**
 * @param {Object} props
 * @param {Record<string, unknown>} props.field
 * @param {Object} props.node
 * @param {Function} props.onChangeProps
 * @param {Function} props.onChangeColumnCount
 */
export default function OptionFieldColumns( {
	node,
	onChangeProps,
	onChangeColumnCount,
} ) {
	return (
		<MiniBuilderColumnsField
			node={ node }
			onChangeProps={ onChangeProps }
			onChangeColumnCount={ onChangeColumnCount }
		/>
	);
}
