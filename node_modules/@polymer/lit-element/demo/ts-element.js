var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, property } from '../lit-element.js';
class TSElement extends LitElement {
    constructor() {
        super(...arguments);
        this.message = 'Hi';
        this.extra = '';
    }
    render() {
        const { message, extra } = this;
        return html `
      <style>
        :host {
          display: block;
        }
      </style>TSElement says: ${message} ${extra}
    `;
    }
}
__decorate([
    property()
], TSElement.prototype, "message", void 0);
__decorate([
    property({ attribute: 'more-info', type: (value) => `[${value}]` })
], TSElement.prototype, "extra", void 0);
customElements.define('ts-element', TSElement);
//# sourceMappingURL=ts-element.js.map