import { getTasksFromStorage } from "./getTasks.js";
import { modal } from "./modal.js"
import { deleteTaskModal } from "./delete-task-modal.js";
import { handleDragStart, handleDragEnd, handleDragOver,handleDragEnter, handleDragLeave, handleDrop } from "./dragAndDrop.js"

const getDelta = (task) => {
    let now = new Date();
    let deadline = new Date(task.deadline);
    // converts variables to milliseconds
    now = now.getTime();
    deadline = deadline.getTime();
    // calculate time delta 
    let delta = deadline-now;
    // converts delta to days
    return Math.ceil(delta / (1000 * 60* 60*24)); 
}

const displayTasks = () => {
    const tasks = getTasksFromStorage();
    const toDoTree = document.querySelector("#toDo");
    const doingTree = document.querySelector("#doing");
    const doneTree = document.querySelector("#done");
    const taskContainers =  document.querySelectorAll(".tasks-container");
    for (let taskContainer of taskContainers) {
        taskContainer.innerHTML = "";
    }
    // Get filter preferences from storage
    const filters = JSON.parse(localStorage.getItem('taskFilters'));
    const keyword = filters.keyword;
    const todoChecked = filters.todo;
    const doingChecked = filters.doing;
    const doneChecked = filters.done;
    const overdueChecked = filters.overdue;
    const endOfDayChecked = filters.endOfDay;
    const dueNextDaysChecked = filters.dueNextDays;
    
    // Sets display for sections depending on selected filter
    toDoTree.style.display = todoChecked ? "flex" : "none";
    doingTree.style.display = doingChecked ? "flex" : "none";
    doneTree.style.display = doneChecked ? "flex" : "none";
    for (let task of tasks) {
        let delta = getDelta(task);
        const shouldDisplay = (
            (keyword === '' || task.name.toLowerCase().includes(keyword) || task.description.includes(keyword)) 
            && 
            ((delta == 0 && endOfDayChecked) || (delta > 0 && dueNextDaysChecked) ||  (delta < 0 && overdueChecked))
        );
        if (shouldDisplay) {
            let taskCard = generateCard(task);
            taskCard.style.display = 'flex';
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
            
            // Event listener for editing task
            const editButton = taskCard.querySelector('.edit_task');
            editButton.addEventListener('click', () => {
                modal('update', 'update-task', task.id);
            });
            // Event listener for deleting task
            const deleteButton = taskCard.querySelector('.delete_task');
            deleteButton.addEventListener('click', (e) => {
                let id = e.target.id.split("_")[1];
                deleteTaskModal('Delete this task ?', 'delete-task', id);
                const deleteOption = document.querySelector("#delete-task");
                deleteOption.addEventListener("click", () => {
                    const tasks = getTasksFromStorage();
                    let taskIndex = tasks.findIndex(t => t.id === id);
                    tasks.splice(taskIndex, 1);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    displayTasks();
                });
            });
        }
    }
    displayNoTask();
    // let dragDiv = document.querySelectorAll('.dragDiv');
    // dragDiv.forEach(drag => {
    //     drag.style.opacity = '0.5';
    // });

    let items  =  document.querySelectorAll('.tasks-container .task');
    // Attache des gestionnaires d'événements aux éléments .task
    if (items) {
        items.forEach(item => {
            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragend', handleDragEnd);
            item.addEventListener('dragover', handleDragOver);
            item.addEventListener('dragenter', handleDragEnter);
            item.addEventListener('dragleave', handleDragLeave);
            item.addEventListener('drop', handleDrop);
    });
    }
}

const generateCard = (task) => {
    let delta = getDelta(task);
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
    if (delta < 0) {
        taskCard.innerHTML += 
        `<p class="task-deadline overdue"><span class="deadline"><img src="assets/images/clock.svg"><span>${delta} j</span></span></p>`
    }
    else if (delta > 1) {
        taskCard.innerHTML +=
        `<p class="task-deadline due-next-days"><span class="deadline"><img src="assets/images/clock.svg"><span>${delta} j</span></span></p>`
    }
    else {
        taskCard.innerHTML +=
        `<p class="task-deadline end-of-day"><span class="deadline"><img src="assets/images/clock.svg"><span>${delta} j</span></span></p>`
    }
    return taskCard;
}

//Affiche quelque chose quand il n'y a rien dans une catègorie aide aussi pour le drag and drop
const displayNoTask = () => {
    const taskContainer = document.querySelectorAll('.tasks-container');
    for (let i = 0; i < taskContainer.length; i++) {
        if (taskContainer[i].childElementCount < 1) {
            taskContainer[i].innerHTML = "<div class='task dragDiv' draggable='true'>Drag-here</div><p> No tasks at the moment ! </p>";
        }
    }
}

export {displayTasks, getDelta }