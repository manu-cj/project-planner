
import { Task } from "./components/Task.js";
import { getTasksFromStorage } from "./components/getTasks.js";
import { displayTasks } from "./components/showTasks.js";

import { modal } from './component/modal.js';

/*Donner lui le type de tache, le texte du bouton submit et 
l'index, à appeler lors de l'advEventListenner de l'ajout de tache et update*/
// let button = document.querySelector('button');
//     button.addEventListener('click', () => {
//         modal('todo', 'add-task', 1);
//     })git

displayTasks();
