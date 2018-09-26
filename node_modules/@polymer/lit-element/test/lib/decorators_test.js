/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, html, LitElement, query, queryAll } from '../../lit-element.js';
import { generateElementName } from '../test-helpers.js';
const assert = chai.assert;
suite('decorators', () => {
    let container;
    setup(() => {
        container = document.createElement('div');
        container.id = 'test-container';
        document.body.appendChild(container);
    });
    teardown(() => {
        if (container !== undefined) {
            container.parentElement.removeChild(container);
            container = undefined;
        }
    });
    suite('@customElement', () => {
        test('defines an element', () => {
            const tagName = generateElementName();
            let C0 = class C0 extends HTMLElement {
            };
            C0 = __decorate([
                customElement(tagName)
            ], C0);
            const DefinedC = customElements.get(tagName);
            assert.strictEqual(DefinedC, C0);
        });
    });
    suite('@query', () => {
        let C = class C extends LitElement {
            render() {
                return html `
          <div>Not this one</div>
          <div id="blah">This one</div>
        `;
            }
        };
        __decorate([
            query('#blah')
        ], C.prototype, "blah", void 0);
        __decorate([
            query('span')
        ], C.prototype, "nope", void 0);
        C = __decorate([
            customElement(generateElementName())
        ], C);
        test('returns an element when it exists', async () => {
            const c = new C();
            container.appendChild(c);
            await c.updateComplete;
            const div = c.blah;
            assert.instanceOf(div, HTMLDivElement);
            assert.equal(div.innerText, 'This one');
        });
        test('returns null when no match', async () => {
            const c = new C();
            container.appendChild(c);
            await c.updateComplete;
            const span = c.nope;
            assert.isNull(span);
        });
    });
    suite('@queryAll', () => {
        let C = class C extends LitElement {
            render() {
                return html `
          <div>Not this one</div>
          <div id="blah">This one</div>
        `;
            }
        };
        __decorate([
            queryAll('div')
        ], C.prototype, "divs", void 0);
        __decorate([
            queryAll('span')
        ], C.prototype, "spans", void 0);
        C = __decorate([
            customElement(generateElementName())
        ], C);
        test('returns elements when they exists', async () => {
            const c = new C();
            container.appendChild(c);
            await c.updateComplete;
            const divs = c.divs;
            // This is not true in ShadyDOM:
            // assert.instanceOf(divs, NodeList);
            assert.lengthOf(divs, 2);
        });
        test('returns empty NodeList when no match', async () => {
            const c = new C();
            container.appendChild(c);
            await c.updateComplete;
            const spans = c.spans;
            // This is not true in ShadyDOM:
            // assert.instanceOf(divs, NodeList);
            assert.lengthOf(spans, 0);
        });
    });
});
//# sourceMappingURL=decorators_test.js.map