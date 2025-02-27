const todoList = JSON.parse(localStorage.getItem("todoList")) || [];

renderTodoList();
function renderTodoList() {
  let todoListHTML = "";

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
        <p>${name}</p>
        <span>${dueDate}</span>
        <button class="delete-todo-button js-delete-todo-button">Delete</button>
    `;
    todoListHTML += html;
  });

  document.querySelector(".js-todo-list").innerHTML = todoListHTML;

  document
    .querySelectorAll(".js-delete-todo-button")
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        let confirmDel = confirm("Do you want to delete this item");
        if (!confirmDel) return;
        todoList.splice(index, 1);
        saveToStorage();
        renderTodoList();
      });
    });
}

document.querySelector(".js-add-todo-button").addEventListener("click", () => {
  if (
    !document.querySelector(".js-name-input").value ||
    !document.querySelector(".js-due-date-input").value
  ) {
    alert("Please fill in both fields");
    return;
  }
  addTodo();
});

function addTodo() {
  const inputElement = document.querySelector(".js-name-input");
  const name = inputElement.value;

  const dateInputElement = document.querySelector(".js-due-date-input");
  const dueDate = dateInputElement.value;

  todoList.push({
    name: name,
    dueDate: dueDate,
  });

  saveToStorage();
  inputElement.value = "";
  dateInputElement.value = "";
  renderTodoList();
}

function saveToStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
