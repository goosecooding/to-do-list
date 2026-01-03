// 1️⃣ Select elements from HTML
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const clearCompletedBtn = document.getElementById("clear-completed");
const progress = document.querySelector(".progress");


function updateItemsLeft() {
  const count = todos.filter(todo => !todo.completed).length;
  itemsLeft.textContent = `${count} items left`;
}


// 2️⃣ Load saved tasks from localStorage (or empty array)
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// 3️⃣ Show tasks when page loads
renderTodos();

// 4️⃣ Add task when form is submitted
form.addEventListener("submit", function (e) {
  e.preventDefault(); // stop page refresh

  const taskText = input.value.trim();
  if (taskText === "") return;

  const todo = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  todos.push(todo);
  saveTodos();
  renderTodos();

  input.value = "";
});

function updateProgress() {
  if (todos.length === 0) {
    progress.style.width = "0%";
    return;
  }

  const completed = todos.filter(todo => todo.completed).length;
  const percent = (completed / todos.length) * 100;

  progress.style.width = `${percent}%`;
}
// 5️⃣ Render tasks to the page
function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    if (todo.completed) {
      li.classList.add("done");
    }

    li.innerHTML = `
      <span>${todo.text}</span>
      <button class="delete">✖</button>
    `;

    // Toggle completed
    li.addEventListener("click", () => {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos();
    });

    // Delete task
    li.querySelector(".delete").addEventListener("click", (e) => {
      e.stopPropagation();
      todos = todos.filter((t) => t.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    list.appendChild(li);
  });
  updateItemsLeft();
  updateProgress();
}
clearCompletedBtn.addEventListener("click", () => {
  todos = todos.filter(todo => !todo.completed);
  saveTodos();
  renderTodos();
});

// 6️⃣ Save to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
