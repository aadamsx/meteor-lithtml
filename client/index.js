import { LitElement, html } from '@polymer/lit-element';
// import {LitElement} from 'https://unpkg.com/@polymer/lit-element@~0.6.0-dev.6/lit-element.js?module';
// import {html} from 'https://unpkg.com/lit-html@latest/lit-html.js?module';

import './x-counter.js';

// imperative way to interact with web component
const counter = document.querySelector('x-counter');
counter.value = 10;
counter.addEventListener('valueChange', (e) => console.log(e));


// Declareative template binding to interact with web component
class XApp extends LitElement {
  // constructor() {
  //   super();
  //   this.customValue = 5;
  // }
  customValue = 5;

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