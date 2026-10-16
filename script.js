const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const clearCompletedButton = document.getElementById("clearCompleted");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
checkbox.type = "checkbox";

const taskSpan = document.createElement("span");
taskSpan.textContent = taskText;

checkbox.addEventListener("change", function() {
    taskSpan.classList.toggle("completed", checkbox.checked);
    updateTaskStats();
});

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function() {
        li.remove();
        updateTaskStats();
    });
li.appendChild(checkbox);
li.appendChild(taskSpan);
li.appendChild(deleteButton);

taskList.appendChild(li);

    taskInput.value = "";

    updateTaskStats();
}

clearCompletedButton.addEventListener("click", function() {
    const completedTasksList = document.querySelectorAll(".completed");

    completedTasksList.forEach(function(task) {
        task.parentElement.remove();
    });

    updateTaskStats();
});

function updateTaskStats() {
    const tasks = document.querySelectorAll("#taskList li");

    let completed = 0;

    tasks.forEach(function(task) {
        const taskText = task.querySelector("span");

        if (taskText && taskText.classList.contains("completed")) {
            completed++;
        }
    });

    const total = tasks.length;
    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}

updateTaskStats();