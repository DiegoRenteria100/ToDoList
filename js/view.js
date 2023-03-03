import AddTodo from "./components/addTodo.js";
export default class View {
  constructor() {
    this.model = null;

    this.table = document.getElementById('table');

    this.addTodoForm = new AddTodo();

    this.addTodoForm.onClick((title, description) => this.addTodo(title, description));

    this.editId = -10;

  }


  setModel(model) {
    this.model = model;
  }

  render() {
    const todos = this.model.getTodos();
    todos.forEach((todo) => this.createRow(todo));
  }

  addTodo(title, description) {
    if (this.editId == -10) {
      const todo = this.model.addTodo(title, description);
      this.createRow(todo);
    } else {
      const todo = this.model.editTodo(this.editId, title, description);
      document.getElementById("add").textContent = "Add";
      this.editRow(todo);
      this.editId = -10;
    }
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
  }

  editTodo(id, title, description) {
    document.getElementById('title').value = title;
    document.getElementById('description').value = description;
    document.getElementById("add").textContent = "Update";
    this.editId = id;
  }

  editRow(todo) {
    const row = document.getElementById(todo.id);
    row.children[0].innerHTML = todo.title;
    row.children[1].innerHTML = todo.description;
  }

  createRow(todo) {
    const row = this.table.insertRow();
    row.setAttribute('id', todo.id);
    row.setAttribute('class', "fila");
    row.innerHTML = `
      <td>${todo.title}</td>
      <td>${todo.description}</td>
      <td class="text-center"></td>
      <td class="text-center"></td>
    `;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.onclick = () => this.toggleCompleted(todo.id);
    row.children[2].appendChild(checkbox);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
    removeBtn.innerHTML = ` <i class="fa fa-trash"></i>`;
    removeBtn.onclick = () => this.removeTodo(todo.id);
    row.children[3].appendChild(removeBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'btn-warning', 'mb-1', 'ml-1');
    editBtn.innerHTML = ` <i class="fa fa-edit"></i>`;
    editBtn.onclick = () => {
      this.editTodo(todo.id, row.children[0].innerText, row.children[1].innerText);
    }
    row.children[3].appendChild(editBtn);
  }


  toggleCompleted(id) {
    this.model.toggleCompleted(id);
  }

  removeTodo(id) {
    if (this.editId == -10) {
      this.model.removeTodo(id);
      document.getElementById(id).remove();
    }
  }
}