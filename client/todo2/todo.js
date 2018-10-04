import {LitElement, html} from '@polymer/lit-element';
import {repeat} from 'lit-html/directives/repeat.js';
import {style} from './todo-styles.js';
import './todo-items.js';
// import Logo from './assets/logo.png';
import { WiredInput } from '../components/wired-input';
import { WiredButton } from '../components/wired-button';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/src/ckeditor';

export class ToDo extends LitElement {
  /**
  * Declare the properties that will be
  * available in the binding system
  */
  static get properties() {
    return {
      list: {type: Array},
      todo: {type: String},
    };
  }

  constructor() {
    super();
    this.list = [
      this.todoItem('clean the house'),
      this.todoItem('buy milk')
    ];
    this.todo = '';
    this.createNewToDoItem = this.createNewToDoItem.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleInput = this.handleInput.bind(this);

    DecoupledEditor
    .create( document.querySelector( '#editor' ) )
      .then( editor => {
          const toolbarContainer = document.querySelector( '#toolbar-container' );

          toolbarContainer.appendChild( editor.ui.view.toolbar.element );
      } )
      .catch( error => {
          console.error( error );
      } );
  }

  todoItem(todo) {
    return {todo}
  }

  createNewToDoItem() {
    this.list = [
      ...this.list,
      this.todoItem(this.todo)
    ];
    this.todo = '';
  }


  handleKeyPress(e) {
    if (e.target.value !== '') {
      if (e.key === 'Enter') {
        this.createNewToDoItem();
      }
    }
  }

  handleInput(e) {
    this.todo = e.target.value;
  }


  // this is now being emitted back to the parent from the child component
  deleteItem(indexToDelete) {
    this.list = this.list.filter((toDo, index) => index !== indexToDelete);
  }

  render() {
    return html`
    <div class="ToDo">
      <div class="ToDo-Container">
        <div class="ToDo-Content">
          ${repeat(
            this.list,
            (item, key) => {
              return html`
                <to-do-item
                  item=${item.todo}
                  .deleteItem=${this.deleteItem.bind(this, key)}
                ></to-do-item>
              `;
            }
          )}
        </div>
        <div>
          <wired-input
            type="text"
            .value=${this.todo}
            @input=${this.handleInput}
            @keypress=${this.handleKeyPress}
          /></wired-input>
          <wired-button
            class="ToDo-Add"
            @click=${this.createNewToDoItem}
          >+</wired-button>
        </div>
      </div>
      <textarea name="content" id="editor"></textarea>
    </div>
    `;
  }
}

customElements.define('to-do', ToDo);