const modal = (actionType, submitValue, index) => {
    //Recherche des élèment du dom
    const body = document.querySelector('body');

    //Création des élèments
    let myModal = document.createElement('section');
    let modalSection = document.createElement('section');
    let closeDiv = document.createElement('div');
    let closeIcon = document.createElement('i');
    let form = document.createElement('form');
    let taskTitleLabel = document.createElement('label');
    let taskTitleInput = document.createElement('input');
    let taskDescriptionLabel = document.createElement('label');
    let taskDescriptionTextarea = document.createElement('textarea');
    let taskDateLabel = document.createElement('label');
    let taskDateInput = document.createElement('input');
    let submitInput = document.createElement('input');


    //Ajout de classe, id, paramètre, etc
    myModal.classList.add('my-modal');
    modalSection.classList.add('modal-section');
    closeDiv.classList.add('close-modal');
    closeIcon.classList.add('fas', 'fa-times');

    form.classList.add('form-task');
    taskTitleLabel.htmlFor = 'task-title';
    taskTitleInput.type = 'text';
    taskTitleInput.name = 'task-title';
    taskTitleInput.id = 'task-title';

    taskDescriptionLabel.htmlFor = 'task-description';
    taskDescriptionTextarea.name = 'task-description';
    taskDescriptionTextarea.id = 'task-description';
    taskDescriptionTextarea.cols = '20';
    taskDescriptionTextarea.rows = '10';

    taskDateLabel.htmlFor = 'task-date';
    taskDateInput.type = 'date';
    taskDateInput.name = 'task-date';
    taskDateInput.id = 'task-date';

    submitInput.type = 'submit';
    submitInput.name = actionType;
    submitInput.id = actionType;
    submitInput.value = submitValue;

    //Ajout du text dans le label
    taskTitleLabel.textContent = 'Task name : ';
    taskDescriptionLabel.textContent = 'Task description : ';
    taskDateLabel.textContent = 'Done for : ';

    //Ajout de placeholder
    taskTitleInput.placeholder = "A name for you'r task";
    taskDescriptionTextarea.placeholder = "What is this task ?";

    //Implèmentation des élèments dans le document
    body.appendChild(myModal);
    myModal.appendChild(modalSection);
    modalSection.appendChild(closeDiv);
    closeDiv.appendChild(closeIcon);

    modalSection.appendChild(form);
    form.appendChild(taskTitleLabel);
    form.appendChild(taskTitleInput);
    form.appendChild(taskDescriptionLabel);
    form.appendChild(taskDescriptionTextarea);
    form.appendChild(taskDateLabel);
    form.appendChild(taskDateInput);
    form.appendChild(submitInput);

    

    closeIcon.addEventListener('click', () => {
        myModal.style.display = 'none';
    })
    window.addEventListener('click', (e) => {
        if (e.target === myModal) {
            myModal.style.display = 'none';
        }
    })
}   

export default modal;