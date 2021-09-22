import '!style-loader!css-loader!./tinymce-view.css';
import { customElement, html } from 'lit-element';
import { View } from '../../views/view';

import 'components/dev/tinymce-editor-component';

@customElement('tinymce-view')
export class TinymceView extends View {
  render() {
    return html`
      <div class="flex flex-col gap-m">
        <h3 class="mb-small">TinyMCE demo</h3>
        <br/>
        <hr/>
        <div>Integration as self-defined component</div>
        <br/>
        <tinymce-editor-component>
        </tinymce-editor-component>
      </div>
    `;
  }

  async connectedCallback() {
    super.connectedCallback();

  }

}
