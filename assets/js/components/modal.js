import { Task } from "./Task.js";

let sanitizeInput = (inputValue) => {
  let verifiedInput = inputValue.replace(/(<([^>]+)>)/gi, "");
  return verifiedInput;
}

const modal = (actionType, submitValue, index) => {
  //Recherche des élèment du dom
  const body = document.querySelector("body");
  let buttonDarkMode = document.querySelector('.checkbox');

  //Création des élèments
  let myModal = document.createElement("div");
  let modalSection = document.createElement("section");
  let closeDiv = document.createElement("div");
  let closeIcon = document.createElement("i");
  let form = document.createElement("form");
  let taskTitleLabel = document.createElement("label");
  let taskTitleInput = document.createElement("input");
  let taskDescriptionLabel = document.createElement("label");
  let taskDescriptionTextarea = document.createElement("textarea");
  let taskDateLabel = document.createElement("label");
  let taskDateInput = document.createElement("input");
  let statusOptions = document.createElement("div");
  let submitInput = document.createElement("input");

  //Ajout de classe, id, paramètre, etc
  myModal.classList.add("my-modal");
  modalSection.classList.add("modal-section");
  closeDiv.classList.add("close-modal");
  closeIcon.classList.add("fas", "fa-times");

  form.classList.add("form-task");
  statusOptions.classList.add("change-status");
  taskTitleInput.maxLength = "20";
  taskTitleLabel.htmlFor = "task-title";
  taskTitleInput.type = "text";
  taskTitleInput.name = "task-title";
  taskTitleInput.id = "task-title";

  taskDescriptionLabel.htmlFor = "task-description";
  taskDescriptionTextarea.name = "task-description";
  taskDescriptionTextarea.id = "task-description";
  taskDescriptionTextarea.maxLength = "200"
  taskDescriptionTextarea.cols = "20";
  taskDescriptionTextarea.rows = "10";

  taskDateLabel.htmlFor = "task-date";
  taskDateInput.type = "date";
  taskDateInput.name = "task-date";
  taskDateInput.id = "task-date";
  // Adds today's date as min value for input
  let today = new Date().toISOString().split("T")[0];
  taskDateInput.min = today;

  submitInput.type = "submit";
  submitInput.name = actionType;
  submitInput.id = actionType;
  submitInput.value = submitValue;

  // Créer une fonction pour générer les options
  const createStatusOption = (value, labelText) => {
    let label = document.createElement("label");
    let radioInput = document.createElement("input");

    label.textContent = labelText;
    radioInput.type = "radio";
    radioInput.name = "status";
    radioInput.value = value;

    statusOptions.appendChild(radioInput);
    statusOptions.appendChild(label);
  };

  // Générer les options pour chaque état
  createStatusOption("todo", "To Do");
  createStatusOption("doing", "Doing");
  createStatusOption("done", "Done");

  //Ajout du text dans le label
  taskTitleLabel.textContent = "Task name : ";
  taskDescriptionLabel.textContent = "Task description : ";
  taskDateLabel.textContent = "Done for : ";

  //Ajout de placeholder
  taskTitleInput.placeholder = "A name for your task";
  taskDescriptionTextarea.placeholder = "What is this task ?";

  //fonction pour génèrer un token
  function generateToken(length) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      token += chars.charAt(randomIndex);
    }

    return token;
  }

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
  form.appendChild(statusOptions);

  form.appendChild(submitInput);

  let radioInputs = document.querySelectorAll('input[name="status"]');
  let radioValue = "";

  radioInputs.forEach((radio) => {
    if (index > -1 && index < 3) {
      radioInputs[index].checked = true;
    }
    if (radio.checked === true) {
        radioValue = radio.value;
    }
    radio.addEventListener("change", () => {
      radioValue = radio.value;
    });
  });

  //Gestion des couleurs du darkMode de la fenêtre
  if (buttonDarkMode.checked === true) {
    modalSection.classList.add('darkMode');
    modalSection.style.backgroundColor = '#242424';
    taskTitleInput.style.backgroundColor = '#344955';
    taskTitleInput.style.color = '#FFFFFF';
    
    taskTitleInput.style.placeholderColor = '#fff';
    taskDescriptionTextarea.style.backgroundColor = '#344955';
    taskDescriptionTextarea.style.color = '#FFFFFF';
    
    taskDescriptionTextarea.style.placeholderColor = '#CED4DA';
    taskDateInput.style.backgroundColor = '#344955';
    taskDateInput.style.color = '#FFFFFF'; 

    submitInput.style.backgroundColor = '#344955';
    submitInput.style.color = '#FFFFFF';

    submitInput.addEventListener('mouseover', () => {
      submitInput.style.backgroundColor = 'lightseagreen';
    })
    submitInput.addEventListener('mouseleave', () => {
      submitInput.style.backgroundColor = '#344955';
    })
  }


    //Ajout de la tache en localStorage
    if (actionType === "add") {
      submitInput.addEventListener("click", () => {
        console.log(radioValue)
        const newTask = new Task(
          taskTitleInput.value,
          taskDateInput.value,
          taskDescriptionTextarea.value,
          generateToken(11),
          radioValue
        );
      });
    }

 //Modification de la tache
if (actionType === "update") {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let idTask = -1;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === index) {
        idTask = i;
        break;
      }
    }
    //Récupération des données liées à la tâche
    if (idTask !== -1) {
      taskTitleInput.value = tasks[idTask].name;
      taskDescriptionTextarea.value = tasks[idTask].description;
      taskDateInput.value = tasks[idTask].deadline;
      if (tasks[idTask].status === "doing") {
        radioInputs[1].checked = true;
        radioValue = "doing";
      }
      if (tasks[idTask].status === "done") {
        radioInputs[2].checked = true;
        radioValue = "done";
      }
      

      //Ajout de la tâche
      submitInput.addEventListener("click", () => {
        console.log('1235');
        tasks[idTask].name = sanitizeInput(taskTitleInput.value);
        tasks[idTask].description = sanitizeInput(taskDescriptionTextarea.value);
        tasks[idTask].deadline = taskDateInput.value;
        tasks[idTask].status = radioValue;

        localStorage.setItem("tasks", JSON.stringify(tasks));
      });
    } else {
      console.log("Une erreur est survenue !");
    }
  }

  //Fermeture de la modal et reset
  closeIcon.addEventListener("click", () => {
    myModal.style.display = "none";
    myModal.remove();
  });
  window.addEventListener("click", (e) => {
    if (e.target === myModal) {
      myModal.style.display = "none";
      myModal.remove();
    }
  });
};

export { modal };