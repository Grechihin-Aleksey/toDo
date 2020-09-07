"use strict";

class ToDo {
  constructor(form, input, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);

    this.todoData = new Map(JSON.parse(localStorage.getItem("toDoList")));
  }

  addToStorage() {
    localStorage.setItem("toDoList", JSON.stringify([...this.todoData]));
  }

  render() {
    this.todoList.textContent = "";
    this.todoCompleted.textContent = "";
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }

  createItem(todo) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    // li.key = todo.key;

    li.setAttribute("key", todo.key);
    li.insertAdjacentHTML(
      "beforeend",
      `
        <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
    `
    );

    if (todo.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }

  addTodo(e) {
    e.preventDefault();
    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };
      this.todoData.set(newTodo.key, newTodo);
      this.render();
    } else {
      alert("Заполните поле.");
    }
  }

  generateKey() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  deleteItem(elem) {
    this.todoData.delete(elem);
    this.render();
  }

  completedItem(elem) {
    [...this.todoData].forEach(function (item) {
      if (elem === item[0]) {
        // console.log(elem);
        // console.log(item[0]);
        // console.log(item[1].completed);
        item[1].completed = !item[1].completed;
      }
    });
  }

  hendler() {
    let todoContainer = document.querySelector(".todo-container");
    todoContainer.addEventListener("click", (event) => {
      let target = event.target;

      if (target.closest(".todo-complete")) {
        this.completedItem(target.closest("li").getAttribute("key"));
      } else if (target.closest(".todo-remove")) {
        this.deleteItem(target.closest("li").getAttribute("key"));
      }
      this.render();
    });
  }

  init() {
    this.form.addEventListener("submit", this.addTodo.bind(this));

    this.render();
  }
}

const todo = new ToDo(
  ".todo-control",
  ".header-input",
  ".todo-list",
  ".todo-completed"
);

todo.hendler();
todo.init();
