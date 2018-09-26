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
import { PropertyDeclaration } from './updating-element.js';
export declare type Constructor<T> = {
    new (...args: unknown[]): T;
};
/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * @param tagName the name of the custom element to define
 *
 * In TypeScript, the `tagName` passed to `customElement` must be a key of the
 * `HTMLElementTagNameMap` interface. To add your element to the interface,
 * declare the interface in this module:
 *
 *     @customElement('my-element')
 *     export class MyElement extends LitElement {}
 *
 *     declare global {
 *       interface HTMLElementTagNameMap {
 *         'my-element': MyElement;
 *       }
 *     }
 *
 */
export declare const customElement: (tagName: "object" | "a" | "abbr" | "acronym" | "address" | "applet" | "area" | "article" | "aside" | "audio" | "b" | "base" | "basefont" | "bdo" | "big" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "center" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "dfn" | "dir" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "font" | "footer" | "form" | "frame" | "frameset" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "isindex" | "kbd" | "keygen" | "label" | "legend" | "li" | "link" | "listing" | "map" | "mark" | "marquee" | "menu" | "meta" | "meter" | "nav" | "nextid" | "nobr" | "noframes" | "noscript" | "ol" | "optgroup" | "option" | "output" | "p" | "param" | "picture" | "plaintext" | "pre" | "progress" | "q" | "rt" | "ruby" | "s" | "samp" | "script" | "section" | "select" | "slot" | "small" | "source" | "span" | "strike" | "strong" | "style" | "sub" | "sup" | "table" | "tbody" | "td" | "template" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "track" | "tt" | "u" | "ul" | "var" | "video" | "wbr" | "xmp") => (clazz: Constructor<HTMLElement>) => any;
/**
 * A property decorator which creates a LitElement property which reflects a
 * corresponding attribute value. A `PropertyDeclaration` may optionally be
 * supplied to configure property features.
 */
export declare const property: (options?: PropertyDeclaration<any> | undefined) => (proto: Object, name: string) => void;
/**
 * A property decorator that converts a class property into a getter that
 * executes a querySelector on the element's renderRoot.
 */
export declare const query: (selector: string) => (proto: any, propName: string) => void;
/**
 * A property decorator that converts a class property into a getter
 * that executes a querySelectorAll on the element's renderRoot.
 */
export declare const queryAll: (selector: string) => (proto: any, propName: string) => void;
