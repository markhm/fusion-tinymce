import { html, PropertyValues, property, customElement, unsafeCSS} from 'lit-element';

// import {html,PropertyValues,unsafeCSS} from 'lit';
// import {customElement,property} from 'lit/decorators';

import tinymce, {Editor} from 'tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/wordcount';
import skin from '!!raw-loader!tinymce/skins/ui/oxide/skin.css';
import contentStyle from '!!raw-loader!tinymce/skins/ui/oxide/content.css';
import contentStyle2 from '!!raw-loader!tinymce/skins/content/default/content.css';

import editorStyle from './tinymce-editor-component.css';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-custom-field';

import {Layout} from 'views/view';
// import {unsafeHTML} from 'lit/directives/unsafe-html.js';

@customElement('tinymce-editor-component')
export class TinymceEditorComponent extends Layout {

	static get styles() {
		return [unsafeCSS(skin), editorStyle];
	}

	@property({type: String}) label = '';
	@property({type: String}) value = 'Some really good value.';
	@property({type: Boolean}) required = false;
	@property({type: Boolean}) invalid = false;
	@property({type: String}) errorMessage = '';

	// GETTING THE CONTENT
	// https://stackoverflow.com/questions/60451091/how-to-get-content-from-a-tinymce-instance-within-an-iframe

	render() {
		console.log('this.value: ' + this.value);
		return html`
      <vaadin-custom-field
          style="width: 100%"
          id="tinymce-editor-component"
          .label="${this.label}"
          .value="${this.value}"
          @value-changed="${this.onValueChanged}"
          .required="${this.required}"
          .invalid="${this.invalid}"
          .errorMessage="${this.errorMessage}"
      >
        <div id="tinymceContent" style="height: 500px; width: 100%">${this.value}</div>
      </vaadin-custom-field>
		`;
	}

	// Local autosave: We need this.
	// https://www.tiny.cloud/docs/plugins/opensource/autosave/#autosave_retention

	firstUpdated(changedProps: PropertyValues) {
		super.firstUpdated(changedProps);

		const elem = this.shadowRoot?.getElementById('tinymceContent')!;

		tinymce.init({
			target: elem,
			height: '350',
			width: '100%',
			skin: false,
			menubar:false,
			statusbar: true,
			content_css: false,
			editor_css : 'tinymce-editor-component.css',
			content_style: contentStyle.toString() + '\n' + contentStyle2.toString(),
			plugins: 'lists, wordcount',
			setup: (editor: Editor) => this.setupFunction(editor),
			toolbar: 'undo redo | formatselect | ' +
				'bold italic underline | alignleft aligncenter ' +
				'alignright alignjustify | bullist numlist outdent indent | ' +
				'removeformat | wordcount',
		});
	}

	async connectedCallback() {
		super.connectedCallback();
	}

	async disconnectedCallback() {
		super.disconnectedCallback();
		// removing tinymce from the DOM when leaving the page, because otherwise it will need a hard refresh
		tinymce.remove();
	}

	setupFunction(editor: Editor) {
		// add the Vaadin border style (rounded 5px)
		editor.on('init', function() {
			editor.getContainer().className += ' with-border';
		});
		editor.on('change', () => this.onValueChanged());
	}

	/**
	 * We notify the parent component the content was updated via a 'content.updated' event.
	 */
	onValueChanged() {
		// For some reason, contentDiv is sometimes null.
		console.log('onValueChanged caught');
		if (tinymce.get('tinymceContent')) {
			console.log('tinymceContent = ' + tinymce.get('tinymceContent').getContent());
			this.value = tinymce.get('tinymceContent').getContent();
			let event = new CustomEvent('content.updated', {
				detail: {
					message: 'The content was updated',
					value: this.value
				}
			});
			this.dispatchEvent(event);
		}
	}

}
