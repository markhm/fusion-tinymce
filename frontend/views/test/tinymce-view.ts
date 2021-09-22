import {customElement, html} from 'lit-element';
import {Layout} from "Frontend/views/view";

import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';

import '@vaadin/vaadin-rich-text-editor';

import '@tinymce/tinymce-webcomponent/dist/tinymce-webcomponent.js';
import 'tinymce/tinymce';

import '../../components/dev/tinymce-editor-another';

// https://stackoverflow.com/questions/38733649/can-i-use-polymer-elements-webcomponents-with-tinymce

@customElement('tinymce-view')
export class TinymceView extends Layout {
	name: string = '';

	render() {
		return html`
        <div>
            <h3 class="mb-small">TinyMCE demo</h3>

            <tinymce-editor api-key="61qy8ghrmphqfko2svlyufgfdse2qgcwx1bokjmk63i34tnk" menubar="true"></tinymce-editor>
		        
		        <hr/>
		        <tinymce-editor-another>
		        </tinymce-editor-another>
        </div>

    `;
	}
	//

	async connectedCallback() {
		super.connectedCallback();

	}
}
