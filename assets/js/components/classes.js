// Creates class for Task with methods : deleteTask / editTask / update Storage.

class Task {
    // Adds a method to build Task objects. ID 
    constructor(name, deadline, description, id) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.deadline = deadline;
        this.status = "to do";
        this.saveToLocalStorage();
    }

    // Allows to edit value of any task property.
	// TO DO : add property check rule to check whether property actually exists !
    editTask(property, newValue) {
        this[property] = newValue;
        this.saveToLocalStorage();
    }

    deleteTask() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task.id !== this.id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Saves tasks to storage
    saveToLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const index = tasks.findIndex(task => task.id === this.id);
        if (index !== -1) {
            tasks[index] = this;
        }
        else {
            tasks.push(this);
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

}

export { Task }

