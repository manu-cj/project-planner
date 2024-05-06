const deleteTaskModal = (textLabel, inputId, index) => {
    //Recherche des élèment du dom
    const body = document.querySelector('body');

    //Création des élèments
    let myModal = document.createElement('div');
    let modalSection = document.createElement('section');
    let closeDiv = document.createElement('div');
    let closeIcon = document.createElement('i');
    let form = document.createElement('form');
    let labelDelete = document.createElement('label');
    let inputYes = document.createElement('input');
    let inputNo = document.createElement('input');

    //Ajout de classe, id, paramétre, etc
    myModal.classList.add('my-modal');
    modalSection.classList.add('modal-section');
    closeDiv.classList.add('close-modal');
    closeIcon.classList.add('fas', 'fa-times');
    form.classList.add('form-delete');
    labelDelete.classList.add('label-delete');

    inputYes.type = 'submit';
    inputYes.id = inputId;
    inputYes.name = inputId;
    inputYes.value = 'Yes';
    
    inputNo.type = 'submit';
    inputNo.id = 'not-delete';
    inputNo.name = 'not-delete';
    inputNo.value = 'No';

    //Ajout du text
    labelDelete.htmlFor = inputId;
    labelDelete.textContent = textLabel
    


    //Implèmentation des élèments dans le document
    body.appendChild(myModal);
    myModal.appendChild(modalSection);
    modalSection.appendChild(closeDiv);
    closeDiv.appendChild(closeIcon);
    modalSection.appendChild(form);
    form.appendChild(labelDelete);
    form.appendChild(inputYes);
    form.appendChild(inputNo);



    //Fermeture de la modal et reset
    inputNo.addEventListener('click', () => {
        myModal.style.display = 'none';
        myModal.remove();
    })
    closeIcon.addEventListener('click', () => {
        myModal.style.display = 'none';
        myModal.remove();
    })
    window.addEventListener('click', (e) => {
        if (e.target === myModal) {
            myModal.style.display = 'none';
            myModal.remove();
        }
    })
}

export { deleteTaskModal };