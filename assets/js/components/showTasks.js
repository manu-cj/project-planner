import { getTasksFromStorage } from "./getTasks.js";


const displayTasks = () => {
    const tasks = getTasksFromStorage();
    const taskContainer = document.querySelector(".test-container");
    for (let task of tasks) {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task");
        taskCard.innerHTML = 
        `
        <h2>${task.name}</h2>
        <p>${task.description}</p>
        
        
        `


        taskContainer.appendChild(taskCard);
    }

}

export {displayTasks}