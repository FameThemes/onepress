<?php
/**
 * Customizer control: visual layout picker (grid of cards).
 *
 * Supports choice content types: text, image (URL), svg (inline markup).
 * Grid columns: 1–3 via {@see Onepress_Customize_Layout_Control::$columns}.
 *
 * Example:
 *
 *     $wp_customize->add_setting( 'my_container_layout', array(
 *         'default'           => 'boxed',
 *         'sanitize_callback' => function ( $value ) {
 *             return in_array( $value, array( 'boxed', 'wide', 'full' ), true ) ? $value : 'boxed';
 *         },
 *         'transport'         => 'refresh',
 *     ) );
 *     $wp_customize->add_control( new Onepress_Customize_Layout_Control( $wp_customize, 'my_container_layout', array(
 *         'label'   => __( 'Container Layout', 'onepress' ),
 *         'section' => 'section_id',
 *         'columns' => 2,
 *         'choices' => array(
 *             array(
 *                 'value'   => 'boxed',
 *                 'label'   => __( 'Boxed', 'onepress' ),
 *                 'type'    => 'svg',
 *                 'content' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 40" aria-hidden="true">...</svg>',
 *             ),
 *             array( 'value' => 'wide', 'label' => __( 'Wide', 'onepress' ), 'type' => 'text', 'content' => __( 'Wide', 'onepress' ) ),
 *             array( 'value' => 'full', 'label' => __( 'Full', 'onepress' ), 'type' => 'image', 'content' => get_template_directory_uri() . '/assets/preview-full.png' ),
 *         ),
 *     ) ) );
 *
 * @package OnePress
 */

/**
 * Allowed tags/attributes for inline SVG in layout choice cells (Customizer only).
 *
 * @return array<string, array<string, bool>>
 */
function onepress_layout_control_svg_allowed_html() {
	return array(
		'svg'    => array(
			'class'       => true,
			'xmlns'       => true,
			'viewbox'     => true,
			'viewBox'     => true,
			'fill'        => true,
			'stroke'      => true,
			'width'       => true,
			'height'      => true,
			'aria-hidden' => true,
			'focusable'   => true,
			'role'        => true,
		),
		'g'      => array( 'class' => true, 'transform' => true, 'fill' => true, 'stroke' => true ),
		'path'   => array(
			'd'            => true,
			'fill'         => true,
			'stroke'       => true,
			'stroke-width' => true,
			'stroke-linecap' => true,
			'stroke-linejoin' => true,
		),
		'rect'   => array(
			'x'      => true,
			'y'      => true,
			'width'  => true,
			'height' => true,
			'rx'     => true,
			'ry'     => true,
			'fill'   => true,
			'stroke' => true,
		),
		'line'   => array( 'x1' => true, 'x2' => true, 'y1' => true, 'y2' => true, 'stroke' => true, 'stroke-width' => true ),
		'circle' => array( 'cx' => true, 'cy' => true, 'r' => true, 'fill' => true, 'stroke' => true ),
		'title'  => array(),
		'defs'     => array(),
		'clippath' => array( 'id' => true ),
		'use'      => array( 'href' => true, 'xlink:href' => true ),
	);
}

/**
 * Class Onepress_Customize_Layout_Control
 */
class Onepress_Customize_Layout_Control extends WP_Customize_Control {

	/**
	 * Control type (matches `controlConstructor` in customizer JS).
	 *
	 * @var string
	 */
	public $type = 'onepress-layout';

	/**
	 * Number of grid columns (1–3).
	 *
	 * @var int
	 */
	public $columns = 2;

	/**
	 * List of choices. Each item:
	 *   - `value` (string, required) — saved setting value
	 *   - `label` (string, optional) — accessible name / tooltip
	 *   - `type` (string) — `text`, `image`, or `svg`
	 *   - `content` (string) — label text, image URL, or SVG markup
	 *
	 * @var array<int, array<string, string>>
	 */
	public $choices = array();

	/**
	 * Enqueue is handled by the bundled `customizer` script.
	 */
	public function enqueue() {}

	/**
	 * @return void
	 */
	public function render_content() {
		if ( empty( $this->choices ) || ! is_array( $this->choices ) ) {
			return;
		}

		$cols = (int) $this->columns;
		if ( $cols < 1 ) {
			$cols = 1;
		} elseif ( $cols > 3 ) {
			$cols = 3;
		}

		$current = $this->value();
		$grid_id = 'opc-layout-grid-' . $this->id;
		?>
		<div class="opc-layout-control opc-control w-full">
			<?php if ( '' !== $this->label ) : ?>
				<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
			<?php endif; ?>
			<?php if ( '' !== $this->description ) : ?>
				<span class="description customize-control-description"><?php echo wp_kses_post( $this->description ); ?></span>
			<?php endif; ?>

			<div
				class="opc-layout-grid grid gap-3 mt-2 w-full"
				id="<?php echo esc_attr( $grid_id ); ?>"
				style="<?php echo esc_attr( 'grid-template-columns: repeat(' . $cols . ', minmax(0, 1fr));' ); ?>"
				role="radiogroup"
				aria-label="<?php echo esc_attr( $this->label ? $this->label : __( 'Layout', 'onepress' ) ); ?>"
			>
				<?php foreach ( $this->choices as $index => $choice ) : ?>
					<?php
					if ( ! is_array( $choice ) || empty( $choice['value'] ) ) {
						continue;
					}
					$value   = (string) $choice['value'];
					$label   = isset( $choice['label'] ) ? (string) $choice['label'] : $value;
					$ctype   = isset( $choice['type'] ) ? strtolower( (string) $choice['type'] ) : 'text';
					$content = isset( $choice['content'] ) ? (string) $choice['content'] : '';
					$is_on   = (string) $current === $value;
					$btn_id  = 'opc-layout-' . $this->id . '-' . $index;
					?>
					<button
						type="button"
						class="opc-layout-choice flex flex-col items-stretch cursor-pointer text-left w-full <?php echo $is_on ? 'is-selected' : ''; ?>"
						id="<?php echo esc_attr( $btn_id ); ?>"
						data-value="<?php echo esc_attr( $value ); ?>"
						role="radio"
						aria-checked="<?php echo $is_on ? 'true' : 'false'; ?>"
						title="<?php echo esc_attr( $label ); ?>"
					>
						<span class="opc-layout-choice-inner flex flex-col items-center justify-center gap-2 p-2 w-full h-full">
							<?php if ( 'image' === $ctype && $content !== '' ) : ?>
								<span class="opc-layout-choice-media flex items-center justify-center w-full">
									<img
										class="opc-layout-choice-img max-w-full"
										src="<?php echo esc_url( $content ); ?>"
										alt=""
										decoding="async"
										loading="lazy"
									/>
								</span>
							<?php elseif ( 'svg' === $ctype && $content !== '' ) : ?>
								<span class="opc-layout-choice-media opc-layout-choice-svg flex items-center justify-center w-full" aria-hidden="true">
									<?php echo wp_kses( $content, onepress_layout_control_svg_allowed_html() ); ?>
								</span>
							<?php else : ?>
								<span class="opc-layout-choice-text text-sm text-center font-medium truncate w-full"><?php echo esc_html( $content !== '' ? $content : $label ); ?></span>
							<?php endif; ?>
						</span>
					</button>
				<?php endforeach; ?>
			</div>

			<input
				type="hidden"
				class="opc-layout-input"
				<?php $this->link(); ?>
				value="<?php echo esc_attr( $current ); ?>"
			/>
		</div>
		<?php
	}
}
