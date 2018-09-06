import { LitElement, html, property } from '@polymer/lit-element';

class XCounter extends LitElement {
  // Optional, if using TypeScript or Babel experimental decorators are available
  @property({type: Number})
  value = 0;

  // If not using Babel or TypeScript you can define properties with vanilla JS
  // static get properties() {
  //   return {
  //     value: 0
  //   }
  // }

  render() {
    return html`
      <style>
        button, p {
          display: inline-block;
        }
      </style>
      <button @click="${() => this.value--}" aria-label="decrement">-</button>
      <p>${this.value}</p>
      <button @click="${() => this.value++}" aria-label="increment">+</button>
    `;
  }
}

customElements.define('x-counter', XCounter);