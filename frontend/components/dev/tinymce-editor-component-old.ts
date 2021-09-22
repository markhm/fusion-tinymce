import { html } from 'lit-element';

import '@vaadin/vaadin-rich-text-editor';

import tinymce from "tinymce";
import {Layout} from "Frontend/views/view";

class TinymceEditorComponentOld extends Layout {

	render() {

		return html`
				<div>Inside the self-defined component</div>
        <div id="default">Hello, World!</div>
        <br/>
        
		`;
	}

	async connectedCallback() {
		super.connectedCallback();

		this.init();
	}

	init() {
		tinymce.init({
			selector: 'div#default'
		});

		// tinymce.init({
		// 	selector: 'div#default',
		// 	height: 500,
		// 	menubar: false,
		// 	plugins: [
		// 		'advlist autolink lists link image charmap print preview anchor',
		// 		'searchreplace visualblocks code fullscreen',
		// 		'insertdatetime media table paste code help wordcount'
		// 	],
		// 	toolbar: 'undo redo | formatselect | ' +
		// 		'bold italic backcolor | alignleft aligncenter ' +
		// 		'alignright alignjustify | bullist numlist outdent indent | ' +
		// 		'removeformat | help',
		// 	content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
		// });
	}
}

customElements.define('tinymce-editor-component', TinymceEditorComponentOld);

