document.addEventListener("DOMContentLoaded", function () {
  const addTaskBtn = document.getElementById("add-task-btn");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  renderTasks();

  // Add task
  addTaskBtn.addEventListener("click", addTask);

  /**
   * Add a new task to the list and save it to local storage.
   *
   * @returns {undefined}
   */
  function addTask() {
    const tasktext = todoInput.value.trim();
    if (tasktext === "") return;

    const newtask = {
      id: Date.now(),
      text: tasktext,
      completed: false,
    };

    // Add new task
    tasks.push(newtask);
    savetasks();
    renderTasks();

    todoInput.value = ""; // Clear the input field
  }

  /**
   * Render the task list, clearing the list to prevent duplicates.
   * @returns {undefined}
   */
  function renderTasks() {
    todoList.innerHTML = ""; // Clear the list to prevent duplicates

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.setAttribute("data-id", task.id);
      li.classList.toggle("completed", task.completed);
      li.innerHTML = `
        <span>${task.text}</span>
        <button class="delete-btn">Delete</button>
      `;
      todoList.appendChild(li);
    });
  }

  // Event delegation for toggle and delete functionality
  todoList.addEventListener("click", (e) => {
    const id = e.target.closest("li")?.getAttribute("data-id");
    if (!id) return;

    const taskIndex = tasks.findIndex((task) => task.id == id);
    if (taskIndex === -1) return;

    // Toggle completed status
    if (e.target.tagName === "SPAN") {
      tasks[taskIndex].completed = !tasks[taskIndex].completed;
      savetasks();
      renderTasks();
    }

    // Delete task
    if (e.target.classList.contains("delete-btn")) {
      tasks.splice(taskIndex, 1);
      savetasks();
      renderTasks();
    }
  });

  /**
   * Save the current state of the task list to local storage.
   * @returns {undefined}
   */
  function savetasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
