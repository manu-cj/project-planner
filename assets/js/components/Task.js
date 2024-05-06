// Creates class for Task objects with methods : deleteTask / editTask / saveToLocalStorage.
class Task {
    // List of properties that are accessible to edit
    static properties = ["name", "description", "deadline", "status"]

    // Adds a constructor to build Task objects.
    constructor(name, deadline, description, id) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.deadline = deadline;
        this.status = "to do";
        this.saveToLocalStorage();
    }

    // Allows to edit value of any task property.
    editTask(property, newValue) {
        // checks if the property given in parameter actually exists and is editable.
        if (!Task.properties.includes(property)) {
            return "Error : the property you tried to edit does not exist. "
        }
        else {
            this[property] = newValue;
            this.saveToLocalStorage();
        }
    }

    // Deletes a Task from Storage
    deleteTask() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        // Filters list to exclude the object with its ID.
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

