import { getTasksFromStorage } from "./getTasks.js";

const deleteTaskModal = (textLabel, inputId, index) => {
    //Recherche des élèment du dom
    const body = document.querySelector('body');
    let buttonDarkMode = document.querySelector('.checkbox');

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


     //Gestion des couleurs du darkMode de la fenêtre
  if (buttonDarkMode.checked === true) {
    modalSection.classList.add('darkMode');
    modalSection.style.backgroundColor = '#242424';
    modalSection.style.color = '#FFFFFF';

    inputYes.style.backgroundColor = '#344955';
    inputYes.style.color = '#FFFFFF';

    inputNo.style.backgroundColor = '#344955';
    inputNo.style.color = '#FFFFFF';

    inputYes.addEventListener('mouseover', () => {
      inputYes.style.backgroundColor = 'lightseagreen';
    })
    inputYes.addEventListener('mouseleave', () => {
      inputYes.style.backgroundColor = '#344955';
    })

    inputNo.addEventListener('mouseover', () => {
        inputNo.style.backgroundColor = 'tomato';
      })
      inputNo.addEventListener('mouseleave', () => {
        inputNo.style.backgroundColor = '#344955';
      })
  }


  function deleteAll(type, id) {
    let tasks = getTasksFromStorage();
    if (inputId === id) {
        inputYes.addEventListener('click', () => {   
            tasks.forEach(tas => {
                if (tas.status === type) {
                    tas.deleteTask();
                }
            });
        })
    }
  }

  deleteAll('todo', 'delete-all-todo-task');
  deleteAll('doing', 'delete-all-doing-task');
  deleteAll('done', 'delete-all-done-task');

    



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