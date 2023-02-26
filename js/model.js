export default class Model {
  constructor() {
    this.view = null;
    this.loadTodos();
    if (!this.todos || this.todos.length < 1) {
      this.todos = [];
      this.currentId = 0;
    } else {
      this.currentId = this.todos[this.todos.length - 1].id + 1;
    }
  }

  loadTodos(){
    this.todos = JSON.parse(localStorage.getItem('todos'));
  }

  setView(view) {
    this.view = view;
  }

  getTodos() {
    return this.todos.map((todo) => ({ ...todo }));
  }

  findTodo(id) {
    return this.todos.findIndex((todo) => todo.id === id);
  }

  addTodo(title, description) {
    const todo = {
      id: this.currentId++,
      title,
      description,
      completed: false
    }

    this.todos.push(todo);
    this.save();
    return { ...todo };
  }

  removeTodo(id) {
    const index = this.findTodo(id);
    this.todos.splice(index, 1);
    this.save();
  }

  editTodo(id, title, description){
    const todo = {
      id: id,
      title,
      description,
      completed: false
    }
    this.todos.push(todo);
    this.save();
    return { ...todo };
  }
  

  toggleCompleted(id) {
    const index = this.findTodo(id);
    const todo = this.todos[index];
    todo.completed = !todo.completed;
    this.save();
  }

  save() {
    this.todos=this.todos.sort((a,b)=>(a.id>b.id)?1:-1);
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.loadTodos();
  }
}