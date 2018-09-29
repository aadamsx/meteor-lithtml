import { LitElement, html } from "@polymer/lit-element";
import { TodoInputStyles } from "./todo-input.js";

export default class TodoInput extends LitElement {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.value = "";
  }

  static get properties() {
    return {
      value: {
        type: String
      }
    };
  }

//   firstUpdated() {
//     fetch("/api/books")
//       .then(res => {
//         return res.json();
//       })
//       .then(res => {
//         this.value = res;
//       });
//   }

  // async fetchPosts() {
  //   const response = await fetch("https://www.reddit.com/r/javascript.json");
  //   const responseBody = await response.json();
  //   this.posts = responseBody.data.children;
  // }

  // firstRendered() {
    // this.fetchPosts();
  // }

  onSubmit(e) {
    const $input = this.shadowRoot.querySelector("input");
    e.preventDefault();
    if (!$input.value) return;
    this.dispatchEvent(new CustomEvent("submit", { detail: $input.value }));
    $input.value = "";
  }

  render() {
    const { val } = this.value;
    return html`
        ${TodoInputStyles}
        <form @submit="${this.onSubmit}">
            <input class=".red" type="text" placeholder="What needs to be done?" />
        </form>
      `;
  }
}
