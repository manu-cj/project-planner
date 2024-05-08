// Creates class for Task objects with methods : deleteTask / editTask / saveToLocalStorage.
class Task {
    // List of properties that are accessible to edit
    static properties = ["name", "description", "deadline", "status"]

    // Adds a constructor to build Task objects.
    constructor(name, deadline, description, id, status) {
        this.id = id;
        this.name = name;
        this.description = description;
        if (deadline === "") {
            // if no date, add today's date as default.
            let now = new Date();
            let year = now.getFullYear();
            let month = (now.getMonth() + 1).toString().padStart(2, '0');
            let day = now.getDate().toString().padStart(2, '0');
            // Concatenate the year, month, and day with hyphens
            this.deadline = year + '-' + month + '-' + day;
        }
        else {
            this.deadline = deadline;
        }
        if (!status) {
            this.status = "to do";
        }
        else {
            this.status = status;
        }
        this.saveToLocalStorage();
    }

    // Allows to edit value of any task property.
    editTask(property, newValue) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const index = tasks.findIndex(task => task.id === this.id);
        if (index === -1) {
            return "Error: Task not found.";
        }
        if (!Task.properties.includes(property)) {
            return "Error: The property you tried to edit does not exist.";
        }
        // Update the property value
        tasks[index][property] = newValue;
        // Save the modified tasks array back to localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));
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

