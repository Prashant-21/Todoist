//Select DOM Elements
const todoInput = document.querySelector(".todo-input")!;
const todoButton = document.querySelector(".todo-button")!;
const todoList = document.querySelector(".todo-list")!;
const filterOption = document.querySelector(".filter-todo")!;

//Event Listener to add New-Todo
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

function addTodo(event) {
  // Prevent default behavior of refreshing on submitting
  event.preventDefault();

  // To-Do div - container
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create li - todo item
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value; // Change its innerText //Ignore this error
  newTodo.classList.add("todo-item"); // Give it a class
  todoDiv.appendChild(newTodo);

  //Save Local Todos
  saveLocalTodos(todoInput.value);

  //Check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //Check mark button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // Append to todoList
  todoList.appendChild(todoDiv);

  //Clear the input Field
  todoInput.value = "";
}

// deleteCheck event
function deleteCheck(e: any) {
  const item = e.target; //item is the delete button
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement; //items parent is the div container
    todo.classList.add("fall"); //Animation
    removeLocalTodo(todo);
    todo.addEventListener("transitionend", () => {
      //Remove the todo only after the animation ends
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement; //items parent is the div container
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes; //Array of todos
  console.log(todos);
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// Save the todos to local storage
function saveLocalTodos(todo) {
  let todos: string[];
  // Check if theres already a todo
  if (localStorage.getItem("todos" === null)) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); //if there is then parse it into an array
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Load the todos saved in local storage
function getTodos() {
  let todos: string[] | null;
  // Check if theres already a todo
  if (localStorage.getItem("todos" === null)) {
    todos = []; //if not then create
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); //if there is then parse it into an array
  }

  // todos is the array of innerText
  todos.forEach((todo) => {
    // To-Do div - container
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create li - todo item
    const newTodo = document.createElement("li");
    newTodo.innerText = todo; // Change its innerText //Ignore this error
    newTodo.classList.add("todo-item"); // Give it a class
    todoDiv.appendChild(newTodo);

    //Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Check mark button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append to todoList
    todoList.appendChild(todoDiv);
  });
}

// Remove/ Delete todos from local storage
function removeLocalTodo(todo) {
  let todos: string[];
  // Check if theres already a todo
  if (localStorage.getItem("todos" === null)) {
    todos = []; //if not then create
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); //if there is then parse it into an array
  }

  //Todo here is the div and we need to delete the innerText from it which is stored in local storage
  // console.log(todo.children[0].innerText);// Get the todo this way

  const todoIndex = todo.children[0].innerText; //navigate to todo's text, find and delete it from local storage
  todos.splice(todos.indexOf(todoIndex), 1); //(start deleting from index, how many to delete)

  // Update the local storage array which this new todos array
  localStorage.setItem("todos", JSON.stringify(todos));
}
