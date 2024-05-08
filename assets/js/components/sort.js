import { getDelta } from "./displayTasks.js"
import { displayTasks } from "./displayTasks.js";

const sortSelection = (tree, sortType) => {
    // Retrieve tasks list instances from Storage
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let toSortTasks = []
    // Find tasks in the tree we want to sort
    for (let task of tasks) {
        if (task.status === tree) {
            // If task belongs to the tree we want to sort, append to temp array.
            toSortTasks.push(task);
        }
    }

    if (sortType === "urgents") {
        // Sorts tasks from most urgent to least urgent
        toSortTasks.sort((task1, task2) => {
            let delta1 = getDelta(task1);
            let delta2 = getDelta(task2);
            return delta1 - delta2
        })
    }
    else if (sortType === "nonUrgents") {
        // Sorts tasks from least urgent to most urgent
        toSortTasks.sort((task1, task2) => {
            let delta1 = getDelta(task1);
            let delta2 = getDelta(task2);
            return delta2 - delta1
        })
    }

    mergeTasks(tasks, toSortTasks, tree)
    displayTasks();
}

const mergeTasks = (initTasks, sortedTasks, tree) => {
    // Merge the sorted tasks back into tasks list
    let index = 0;
    for (let i = 0; i < initTasks.length; i++) {
        if (initTasks[i].status === tree) {
            initTasks[i] = sortedTasks[index++];
        }
    }
    localStorage.setItem('tasks', JSON.stringify(initTasks));
}

const switchSort = (icon) => {
    if (icon.src.includes("non")) {
        icon.src = './assets/images/urgent_first.svg';
        sortSelection(icon.id.split("-")[1], "nonUrgents");
    }
    else {
        icon.src = './assets/images/non_urgent_first.svg';
        sortSelection(icon.id.split("-")[1], "urgents");
    }
}

export { switchSort };