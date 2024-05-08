import { Task } from "./components/Task.js";
import { getTasksFromStorage } from "./components/getTasks.js";
import { displayTasks } from "./components/displayTasks.js";
import { darkMode, clear } from './components/darkMode.js';

import {modal} from './components/modal.js';
import {deleteTaskModal} from './components/delete-task-modal.js';
import { toggleFilterMenu, clearFilters } from './components/filters.js'
import { switchSort } from "./components/sort.js"
import { initializeDragDrop } from './components/dragAndDrop.js';



initializeDragDrop();


// adds toggle on / off to filter icon
const filterButton = document.querySelector("#filter-toggle");
filterButton.addEventListener("click", () => {
    toggleFilterMenu();
})

// sets filters by default if no preferences stored in local storage
const filterPreferences = localStorage.getItem('taskFilters');
if (!filterPreferences) {
    clearFilters();
}

const sortDone = document.querySelector("#sort-done");
sortDone.addEventListener("click", (e) => {
    switchSort(sortDone);
})

const sortDoing = document.querySelector("#sort-doing");
sortDoing.addEventListener("click", (e) => {
    switchSort(sortDoing);
})

const sortTodo = document.querySelector("#sort-todo");
sortTodo.addEventListener("click", (e) => {
    switchSort(sortTodo);
})


displayTasks();

/*Donner lui le type de tache, le texte du bouton submit et 
l'index, à appeler lors de l'advEventListenner de l'ajout de tache et update*/
const addTask = document.querySelectorAll('.add');
    for (let i = 0; i < addTask.length; i++) {
        addTask[i].addEventListener('click', () => {
            modal('add', 'add-task', i);
    })
}

//Affiche le formulaire pour mettre à jour la tâche sélèctionnée
// const task = document.querySelectorAll('.task');
// const edit_task = document.querySelectorAll('.edit_task');
// for (let i = 0; i < edit_task.length; i++) {
//     edit_task[i].addEventListener('click', () => {
//         modal('update', 'update-task', task[i].id);
//     })
// }

//Supprime la tâche sélèctionnée
// const delete_task = document.querySelectorAll('.delete_task');
// for (let i = 0; i < delete_task.length; i++) {
//     delete_task[i].addEventListener('click', (e) => {
//         let id = (e.target.id.split("_")[1]);
//         deleteTaskModal('Delete this task ?', 'delete-task', i);
//         const deleteButton = document.querySelector("#delete-task");
//         deleteButton.addEventListener("click", () => {
//             const tasks = getTasksFromStorage();
//             let task = tasks.find(task => task.id === id);
//             task.deleteTask()
//             displayTasks();
//         })
//     }) 
// }

//Supprime toutes les tâches de la catégorie sélectionnée
const deleteAllTodo = document.getElementById('delete-all-todo');
const deleteAllDoing = document.getElementById('delete-all-doing');
const deleteAllDone = document.getElementById('delete-all-done');
deleteAllTodo.addEventListener('click', () => {
    deleteTaskModal('Delete all task todo ?', 'delete-all-todo-task');
})
deleteAllDoing.addEventListener('click', () => {
    deleteTaskModal('Delete all task doing ?', 'delete-all-doing-task');
})
deleteAllDone.addEventListener('click', () => {
    deleteTaskModal('Delete all task done ?', 'delete-all-done-task');
})
    


    
//Affiche quelque chose quand il n'y a rien dans une catègorie aide aussi pour le drag and drop
/*const taskContainer = document.querySelectorAll('.tasks-container');
for (let i = 0; i < taskContainer.length; i++) {
    if (taskContainer[i].childElementCount < 1) {
        taskContainer[i].innerHTML = "<div class='task' id='a' draggable='true'>Drag-on<p> No tasks at the moment ! </p></div>";
    } 
}*/



//Active le dark-mode
let buttonDarkMode = document.querySelector('.checkbox');
let isDarkModeEnabled = localStorage.getItem('darkModeEnabled');
if (isDarkModeEnabled === 'true') {
    darkMode();
    buttonDarkMode.checked = true;
} else {
    clear();
    buttonDarkMode.checked = false;
}

buttonDarkMode.addEventListener('change', () => {
    if (buttonDarkMode.checked) {
        darkMode();
    } else {
        clear();
    }
}) 

let now = new Date();
let year = now.getFullYear();
let month = (now.getMonth() + 1).toString().padStart(2, '0');
let day = now.getDate().toString().padStart(2, '0');

console.log(year + '-' + month + '-' + day);