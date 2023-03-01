import Alert from "./alert.js";
import Model from "../model.js";

export default class AddTodo {
  constructor() {
    this.btn = document.getElementById('add');
    this.title = document.getElementById('title');
    this.description = document.getElementById('description');

    this.alert = new Alert();
    this.model = new Model();
  }

  onClick(callback) {
    this.btn.onclick = () => {
      if (this.title.value === '' || this.description.value === '') {
        this.alert.show('Title and description are required')
      }
      // else if(this.btn.textContent === 'update'){
      //   this.model.removeTodo(id);
      //   this.btn.textContent ='add'

      // }
      
      else {
        this.alert.hide();
        callback(this.title.value, this.description.value);
      }
    }
  }
}