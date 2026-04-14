import './customizer.scss';
import '../frontend/fontawesome-v6/css/all.min.css';

import { installAlphaColorPicker } from './customizer/alpha-color-picker';
import { registerAlphaColorControl } from './customizer/control-alpha-color';
import { initControlBindings } from './customizer/control-bindings';
import { registerRepeatableControl } from './customizer/control-repeatable';
import { registerFontManagerControl } from './customizer/control-font-manager';
import { registerStylingControl } from './customizer/control-styling';
import { initIconPicker } from './customizer/icon-picker';
import { installDeparam } from './customizer/jquery-deparam';
import { initModalEditors } from './customizer/modal-editor';
import { registerPlusSection } from './customizer/plus-section';
import { installWpEditor } from './customizer/wp-editor';

const api = wp.customize;
const $ = jQuery;

registerPlusSection(api);
installDeparam($);
installAlphaColorPicker($);
registerAlphaColorControl(api, $);
registerRepeatableControl(api, $);
registerFontManagerControl(api, $);
registerStylingControl(api, $);
installWpEditor($);
initModalEditors(api, $);

jQuery(window).ready(function () {
	initControlBindings($);
});

jQuery(document).ready(function () {
	initIconPicker($);
});
