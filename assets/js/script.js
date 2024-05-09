import { displayTasks } from "./components/displayTasks.js";
import { darkMode, clear } from './components/darkMode.js';

import {modal} from './components/modal.js';
import {deleteTaskModal} from './components/delete-task-modal.js';
import { toggleFilterMenu, clearFilters } from './components/filters.js'
import { switchSort } from "./components/sort.js"


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