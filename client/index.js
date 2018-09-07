import { LitElement, html, property } from '@polymer/lit-element';
import './x-counter.js';

class XApp extends LitElement {
  customValue = 2;

  render() {
    return html`
      <x-counter
        @valueChange=${(e) => this.log(e)}
        .value="${this.customValue}">
      </x-counter>
    `;
  }

  log(e) {
    console.log(e);
  }
}

customElements.define('x-app', XApp);