
import { Task } from "./components/Task.js";
import { getTasksFromStorage } from "./components/getTasks.js";
import { displayTasks } from "./components/showTasks.js";


import {modal} from './components/modal.js';
import {deleteTaskModal} from './components/delete-task-modal.js';



displayTasks();

/*Donner lui le type de tache, le texte du bouton submit et 
l'index, à appeler lors de l'advEventListenner de l'ajout de tache et update*/
 const addTask = document.querySelectorAll('.add');
 for (let i = 0; i < addTask.length; i++) {
    addTask[i].addEventListener('click', () => {
        modal('todo', 'add-task', i);
    })
 }
 

 const edit_task = document.querySelectorAll('.edit_task');
 for (let i = 0; i < edit_task.length; i++) {
    edit_task[i].addEventListener('click', () => {
        console.log('hi');
        modal('update', 'update-task', i);
    })
 }

//Donner lui La phrase du label, l'id du bouton yes et l'index à supprimé si il n'y a qu'un élement
const deleteAllTask = document.querySelectorAll('.btnDelete');
for (let i = 0; i < deleteAllTask.length; i++) {
    deleteAllTask[i].addEventListener('click', () => {
        deleteTaskModal('Delete all task ?', 'delete-all-task', i);
    })
    
}

const delete_task = document.querySelectorAll('.delete_task');
for (let i = 0; i < delete_task.length; i++) {
    delete_task[i].addEventListener('click', () => {
        deleteTaskModal('Delete this task ?', 'delete-task', i);
    })
    
}


