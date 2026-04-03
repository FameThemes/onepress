import { registerJqueryDeparam } from './jquery-deparam';
import { registerOnepressPlusSection } from './section-onepress-plus';
import { registerAlphaColorPicker } from './alpha-color-picker';
import { registerAlphaColorControl } from './control-alpha-color';
import { registerRepeatableControl } from './control-repeatable';
import { registerWpJsEditorPlugin } from './wp-js-editor-plugin';
import { registerCustomizeEditorBindings } from './customize-editor-bindings';
import { initUiConditionalControls } from './ui-conditional-controls';
import { initIconPicker } from './icon-picker';

const api = wp.customize;
const $ = jQuery;

registerJqueryDeparam( $ );
registerOnepressPlusSection( api );
registerAlphaColorPicker( $ );
registerAlphaColorControl( api, $ );
registerRepeatableControl( api, $ );
registerWpJsEditorPlugin( $ );
registerCustomizeEditorBindings( api, $ );
initUiConditionalControls( $ );
initIconPicker( $ );
