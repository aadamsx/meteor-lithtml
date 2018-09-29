import { LitElement, html, property } from '@polymer/lit-element';
// import { html } from 'lit-html';
// import {LitElement} from 'https://unpkg.com/@polymer/lit-element@~0.6.0-dev.6/lit-element.js?module';
// import {html} from 'https://unpkg.com/lit-html@latest/lit-html.js?module';

class XCounter extends LitElement {
  // If using TypeScript or Babel compile
  // steps advanced decorators are available
  // @property({type: Number})
  // value = 0;

  // If not using Babel or TypeScript you can
  // define properties with
  static get properties() {
    return {
      value: 0
    }
  }

  render() {
    return html`
      <style>
        button, p {
          display: inline-block;
        }
      </style>
      <button @click="${() => this.decrement()}" aria-label="decrement">-</button>
      <p>${this.value}</p>
      <button @click="${() => this.increment()}" aria-label="increment">+</button>
    `;
  }

  decrement() {
    this.value--;
    this._valueChanged();
  }

  increment() {
    this.value++;
    this._valueChanged();
  }

  _valueChanged() {
    console.log(`this.value is: ${this.value}`)
    // Fire a custom event for others to listen to
    this.dispatchEvent(new CustomEvent('valueChange', { detail: this.value }));
  }
}

customElements.define('x-counter', XCounter);



