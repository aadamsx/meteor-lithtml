import { LitElement, html } from "@polymer/lit-element";
import { style } from "./todo-items-styles.js";
import { WiredButton } from "../components/wired-button";
import { WiredCard } from "../components/wired-card";
import { WiredListbox } from "../components/wired-listbox";
import { WiredItem } from "../components/wired-item";

export class ToDoItem extends LitElement {
  /**
   * Declare the properties that will be
   * available in the binding system
   */
  static get properties() {
    return {
      item: { type: String },
      deleteItem: { type: Function }
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
    ${style}
      <div>
      <p>${this.item}</p>
      <wired-button @click=${this.deleteItem}>-</wired-button>
      </div>
    `;

    // return html`
    // ${style}
    // <wired-listbox>
    //   <wired-item value="${this.item}" text="${this.item}">
    //       <wired-button
    //         @click=${this.deleteItem}>-
    //       </wired-button>
    //   </wired-item>
    // </wired-listbox>
    // `;
  }

  // async loadData() {
  //   const raw = await fetch(...);
  //   const data = await raw.json();
  //   this.data = data;
  //   this.requestUpdate();
  // }

  // render() {
  //   if (this.data === null) { loadData(); return 'Loading'; }
  //   return html`
  //     <link href="..." rel="stylesheet">
  //     ${this.data.map(...)}
  //   `;
  // }

}


customElements.define("to-do-item", ToDoItem);
