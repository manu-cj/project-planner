import { Task } from "./Task.js"

const getTasksFromStorage = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return tasks.map(taskObj => new Task(taskObj.name, taskObj.deadline, taskObj.description, taskObj.id, taskObj.status));
};

export { getTasksFromStorage };