let items;
let dragSrcEl = null;

function handleDragStart(e) {
    this.style.opacity = '0.1';
    let dragDiv = document.querySelectorAll('.dragDiv');
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


export { handleDragStart, handleDragEnd, handleDragOver,handleDragEnter, handleDragLeave, handleDrop }