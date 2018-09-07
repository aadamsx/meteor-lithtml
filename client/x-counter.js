import { LitElement, html, property } from '@polymer/lit-element';

class XCounter extends LitElement {
  // Decorator
  @property({type: Number})
  value = 0;

  // If not using Babel or TypeScript you can
  // define properties with
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
    // Fire a custom event for others to listen to
    this.dispatchEvent(new CustomEvent('valueChange', { detail: this.value }));
  }
}

customElements.define('x-counter', XCounter);