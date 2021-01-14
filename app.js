//Select DOM Elements
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listener to add New-Todo
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);
getTodos();

function addTodo(event) {
  // Prevent default behavior of refreshing on submitting
  event.preventDefault();

  // console.log(`Days:${dateDeadline}
  // Time:${time}`);

  // To-Do div - container 🗃
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create li - todo item 🍱
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value; // Change its innerText //Ignore this error
  newTodo.classList.add("todo-item"); // Give it a class
  todoDiv.appendChild(newTodo);

  //Check mark button ✔ ✅ 👍
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //Trash / Delete button 🗑
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // Taking Time inputs ⏲ 🕣
  const time = document.getElementById("time").value || "24:00"; //deadline time
  const dateDeadline = document.getElementById("date").value; // dateDeadline

  const currentDate = new Date(); //Timestamp on creation
  const deadline = new Date(
    `${time || "24:00"} ${dateDeadline || currentDate.getDate()}`
  ); // Defaults set in case of no input

  // console.log(`Date:
  //   ${currentDate.getDate()}
  // Deadline:
  // ${deadline}
  // `);

  // TODO data object
  const todoObj = {
    todo: todoInput.value,
    status: filterOption.value,
    timestamp: currentDate,
    deadline: {
      time: time,
      date: dateDeadline || currentDate.getDate(),
    },
  };

  console.log(JSON.stringify(todoObj));

  // TODO done insert Deadline here
  const deadlineContainer = document.createElement("div");
  const deadlineElement = document.createElement("span");
  const timeElement = document.createElement("span");
  const dateElement = document.createElement("span");

  deadlineContainer.classList.add("container");

  deadlineElement.id = "deadline";
  deadlineElement.innerText = "Deadline";
  deadlineContainer.appendChild(deadlineElement);

  timeElement.id = "time";
  timeElement.innerText = `Time:${todoObj.deadline.time}`;
  deadlineContainer.appendChild(timeElement);

  dateElement.id = "date";
  dateElement.innerText = `Date:${todoObj.deadline.date}`;
  deadlineContainer.appendChild(dateElement);

  // Append to todoList: Display on the screen💻
  // todoList.appendChild(todoDiv);
  todoList.insertBefore(deadlineContainer, todoList.firstChild);
  todoList.insertBefore(todoDiv, todoList.firstChild);

  //Save Local Todos
  // saveLocalTodos(todoInput.value); //Old
  saveLocalTodos(todoObj);

  //Clear the input Field
  todoInput.value = "";
}

// deleteCheck event
function deleteCheck(e) {
  const item = e.target; //item is the buttons container

  if (item.classList[0] === "trash-btn") {
    const todo_1 = item.parentElement; //items parent is the div container
    todo_1.classList.add("fall"); //Animation
    removeLocalTodo(todo_1);

    todo_1.addEventListener("transitionend", function () {
      //Remove the todo only after the animation ends
      todo_1.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement; //items parent is the div container
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes; //Array of todos

  // console.log(todos);

  todos.forEach(function (todo) {
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
  let todos;
  // Check if theres already a todo

  if (localStorage.getItem("todos" == null)) {
    // todos = [];
    todos = new Array();
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); //if there is then parse it into an array
  }
  if (todos == null) todos = [];
  // todo = JSON.stringify(todo);
  todos.unshift(todo);
  // console.log(`141: ${todos}`);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Load the todos saved in local storage
function getTodos() {
  let todos;

  // Check if theres already a todo
  if (localStorage.getItem("todos" == null)) {
    todos = []; //if not then create
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); //if there is then parse it into an array
  }
  if (todos == null) todos = [];

  console.log(`151: ${todos} `);

  // todos is the array of todoObj's
  todos.forEach(function (todo) {
    //Parse into JSON object 2.0
    // todo = JSON.parse(todo);
    console.log(todo);
    // To-Do div - container
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create li - todo item
    const newTodo = document.createElement("li");
    newTodo.innerText = todo.todo; // Change its innerText //Ignore this error
    console.log(`local todo : ${todo.todo}`);
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

    // TODO insert Deadline here
    const deadlineContainer = document.createElement("div");
    const deadlineElement = document.createElement("span");
    const timeElement = document.createElement("span");
    const dateElement = document.createElement("span");

    deadlineContainer.classList.add("container");

    deadlineElement.id = "deadline";
    deadlineElement.innerText = "Deadline";
    deadlineContainer.appendChild(deadlineElement);

    timeElement.id = "time";
    timeElement.innerText = `Time:${todo.deadline.time}`;
    deadlineContainer.appendChild(timeElement);

    dateElement.id = "date";
    dateElement.innerText = `Date:${todo.deadline.date}`;
    deadlineContainer.appendChild(dateElement);

    // Append to todoList
    todoList.appendChild(todoDiv);
    todoList.appendChild(deadlineContainer);
    // todoList.insertBefore(todoDiv, todoList.firstChild);

    // let DEADLINE = new Date();
    // console.log(`${Date.parse(todo.deadline)}
    // Deadline Date: ${DEADLINE.getDate()}
    // Deadline Time: ${DEADLINE.getHours()}
    // Deadline Time: ${DEADLINE.getMinutes()}
    // `);
  });
}

// Remove/ Delete todos from local storage
function removeLocalTodo(todo) {
  let todos;

  // Check if theres already a todo
  if (localStorage.getItem("todos" === null)) {
    todos = []; //if not then create
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); //if there is then parse it into an array
  }

  //Todo here is the div and we need to delete the innerText from it which is stored in local storage
  // console.log(todo.children[0].innerText);// Get the todo this way

  const todoIndex = todo.children[0].innerText; //navigate to todo elements text, find and delete it from local storage

  todos.forEach((obj) => {
    if (obj.todo == todoIndex) {
      // todos.splice(todos.indexOf(todoIndex), 1); //(start deleting from index, how many to delete)
      todos.splice(obj, 1); //ANCHOR Remove the whole object from local storage
    }
  });

  // Update the local storage array which this new todos array
  localStorage.setItem("todos", JSON.stringify(todos));
}

// console.log(new Date().getDate());
// console.log(new Date().getHours());
// console.log(new Date().getMinutes());

// const date1 = new Date();
// const date2 = new Date().setDate(date1.getDate() + 3);
// const diff = date2 - date1;
// console.log(`${date1}
// ${date2}
// ${diff}`);
