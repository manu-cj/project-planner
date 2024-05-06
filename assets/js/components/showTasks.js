import { getTasksFromStorage } from "./getTasks.js";

const displayTasks = () => {
    const tasks = getTasksFromStorage();
    const toDoTree = document.querySelector("#toDo");
    const doingTree = document.querySelector("#doing");
    const doneTree = document.querySelector("#done");
    for (let task of tasks) {
        console.log(task.status)
        const taskCard = document.createElement("div");
        taskCard.classList.add("task");
        taskCard.innerHTML = 
        `
            <p class="controls"><img title="Edit Task" class="edit_task" id="edit_${task.id}" src="assets/images/edit.svg"><img title="Delete Task" class="delete_task" id="delete_${task.id}" src="assets/images/delete.svg"</p>
            <h3>${task.name}</h3>
            <p>${task.description}</p>
            <p><img src="assets/images/clock.svg">${task.deadline}</p>
        `
        if (task.status === "done") {
            doneTree.insertBefore(taskCard, doneTree.querySelector(".add"));
        }
        else if (task.status === "doing") {
            doingTree.insertBefore(taskCard, doingTree.querySelector(".add"));
        }
        else {
            toDoTree.insertBefore(taskCard, toDoTree.querySelector(".add"));
        }
    }
}

export {displayTasks}