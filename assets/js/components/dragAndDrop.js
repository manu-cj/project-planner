let items;
let dragSrcEl = null;
import { displayTasks } from "./displayTasks.js";
export function initializeDragDrop() {
    document.addEventListener('DOMContentLoaded', () => {
        let dragDiv = document.querySelectorAll('.dragDiv');
        function handleDragStart(e) {
            this.style.opacity = '0.1';
            dragDiv.forEach(drag => {
                drag.style.opacity = '0.5';
            });
            dragSrcEl = this;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', this.innerHTML);
        }

        function handleDragEnd(e) {
            this.style.opacity = '1';
            if (items) {
                items.forEach(function(item) {
                    item.classList.remove('over');
                });
            }
        }

        function handleDragOver(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        function handleDragEnter(e) {
            this.classList.add('over');
        }

        function handleDragLeave(e) {
            this.classList.remove('over');
        }

        function handleDrop(e) {
            e.stopPropagation();
            e.preventDefault();

            const srcParent = dragSrcEl.parentNode;
            const destParent = this.parentNode;

            const destinationColumnId = destParent.dataset.columnId;
            const itemId = dragSrcEl.id;

            const tasks = JSON.parse(localStorage.getItem('tasks'));
            const taskToUpdate = tasks.find(task => task.id === itemId);
            if (taskToUpdate) {
                taskToUpdate.status = destinationColumnId;
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }

            // Déplacement entre colonnes
            if (srcParent !== destParent) {
                let insertBeforeElement = this.nextSibling;
                let a = document.getElementById('a');
                if (!insertBeforeElement) {
                    destParent.appendChild(dragSrcEl);
                } else {
                    destParent.insertBefore(dragSrcEl, insertBeforeElement);
                    }
                 }
            

            // Déplacement dans une colonne
            if (dragSrcEl !== this) {
                if (srcParent === destParent) {
                    const tasksContainer = destParent;
                    const tasksList = Array.from(tasksContainer.querySelectorAll('.task'));

                    const srcIndex = tasksList.indexOf(dragSrcEl);
                    const destIndex = tasksList.indexOf(this);

                    if (srcIndex > -1 && destIndex > -1) {
                        tasksContainer.removeChild(dragSrcEl);
                        if (srcIndex < destIndex) {
                            tasksContainer.insertBefore(dragSrcEl, this.nextSibling);
                        } else {
                            tasksContainer.insertBefore(dragSrcEl, this);
                        }
                    }
                }
            }
            location.reload()
            return false;
        }

        /*const emptyContainer = document.querySelector('.tasks-container[data-column-id="done"]');
        let placeholder = null;
        let placeholderAdded = false;
    
        emptyContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            console.log('drag zone');
    
            // Vérifie si le placeholder n'a pas encore été ajouté
            if (!placeholderAdded) {
                // Crée et ajoute le placeholder à la zone de dépôt
                placeholder = createDraggablePlaceholder();
                emptyContainer.appendChild(placeholder);
                placeholderAdded = true; // Indique que le placeholder a été ajouté
            }
        });
    
        emptyContainer.addEventListener('drop', (e) => {
            e.preventDefault();
    
            // Supprime le placeholder s'il existe dans la zone de dépôt
            if (placeholder && placeholder.parentNode === emptyContainer) {
                emptyContainer.removeChild(placeholder);
                placeholderAdded = false; // Réinitialise l'indicateur
            }
    
            // Traite le déplacement de l'élément
            handleDrop(e);
        });
        
        // Création du placeholder draggable
        function createDraggablePlaceholder() {
            const placeholder = document.createElement('div');
            placeholder.textContent = 'Drop Here'; // Texte du placeholder
            placeholder.classList.add('task');
            placeholder.draggable = true; // Rendre le placeholder draggable

            // Gestionnaire d'événement pour le début du drag du placeholder
            placeholder.addEventListener('dragstart', function(e) {
                e.stopPropagation(); // Empêche le déclenchement de l'événement drag sur l'élément réel
            });

            return placeholder;
        }*/

        // Sélection de tous les éléments .task dans les .tasks-container
        items = document.querySelectorAll('.tasks-container .task');

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
    });

}


