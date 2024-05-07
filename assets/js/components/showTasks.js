import { getTasksFromStorage } from "./getTasks.js";

const displayTasks = () => {
    const tasks = getTasksFromStorage();
    const toDoTree = document.querySelector("#toDo");
    const doingTree = document.querySelector("#doing");
    const doneTree = document.querySelector("#done");
    let buttonDarkMode = document.querySelector('.checkbox');
    for (let task of tasks) {
        let now = new Date();
        let deadline = new Date(task.deadline);
        // converts variables to milliseconds
        now = now.getTime();
        deadline = deadline.getTime();
        // calculate time delta 
        let delta = deadline-now;
        // converts delta to days
        delta = Math.ceil(delta / (1000 * 60* 60*24));
        const taskCard = document.createElement("div");
        taskCard.classList.add("task");
        taskCard.id = task.id;
        taskCard.setAttribute("draggable", true);
        taskCard.innerHTML = 
        `
            <div class="name_block"><h3>${task.name}</h3><span class="controls"><img title="Edit Task" class="edit_task" id="edit_${task.id}" src="assets/images/edit.svg"><img title="Delete Task" class="delete_task" id="delete_${task.id}" src="assets/images/delete.svg"</span>
            </div>
            <p class="task-description">${task.description}</p>
        `
        if (delta < 2) {
            taskCard.innerHTML += 
            `<p class="task-deadline important"><img src="assets/images/clock.svg">${delta} j</p>`
        }
        else {
            taskCard.innerHTML +=
            `<p class="task-deadline"><img src="assets/images/clock.svg">${delta} j</p>`
        } 

        if (task.status === "done") {
            const doneContainer = doneTree.querySelector(".tasks-container");
            doneContainer.appendChild(taskCard);
        }
        else if (task.status === "doing") {
            const doingContainer = doingTree.querySelector(".tasks-container");
            doingContainer.appendChild(taskCard);
        }

        
        else {
            const toDoContainer = toDoTree.querySelector(".tasks-container");
            toDoContainer.appendChild(taskCard);
        }      
    }
}

export {displayTasks}