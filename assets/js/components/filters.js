import { displayTasks } from "./displayTasks.js";
import { getTasksFromStorage } from "./getTasks.js";

// dismisses the filter menu when clicking outside the filter menu.
const clickOut = (e) => {
    const filterMenu = document.querySelector(".filter-menu");
    const filterButton = document.querySelector("#filter-toggle");
    if (!filterMenu.contains(e.target) && e.target !== filterButton) {
        filterMenu.style.display = "none";
        // Remove event listener after closing filter menu
        document.removeEventListener("click", closeFilterMenuOutsideClick);
    }
}

const clearFilters = () => {
    console.log("clearing filters");
}

const applyFilters = () => {
    const tasks = getTasksFromStorage();

    const toDoTree = document.querySelector("#toDo");
    const doingTree = document.querySelector("#doing");
    const doneTree = document.querySelector("#done");
    // Stores status of each filter into variables.
    const keyword = document.querySelector('#searchbar').value.toLowerCase();
    const todoChecked = document.querySelector('#todoBox').checked;
    const doingChecked = document.querySelector('#doingBox').checked;
    const doneChecked = document.querySelector('#doneBox').checked;
    const overdueChecked = document.querySelector('#overdueBox').checked;
    const endOfDayChecked = document.querySelector('#endOfDayBox').checked;
    const dueNextDaysChecked = document.querySelector('#dueNextDaysBox').checked;

    // Set display for containers based on allChecked
    if (!todoChecked) {
        toDoTree.style.display = "none";
    }
    if (!doingChecked) {
        doingTree.style.display = "none";
    }
    if (!doneChecked) {
        doneTree.style.display = "none";
    }

    for (let task of tasks) {
        const taskCard = document.getElementById(task.id);
        const taskName = task.name.toLowerCase();
        const taskDescription = task.description.toLowerCase();
        const now = new Date();
        const deadline = new Date(task.deadline);
        let delta = deadline - now;
        delta = Math.ceil(delta / (1000 * 60 * 60 * 24));

        const shouldDisplay = (
            (keyword === '' || taskName.includes(keyword) || taskDescription.includes(keyword)) 
            && 
            ((delta === 1 && endOfDayChecked) || (delta > 1 && dueNextDaysChecked) ||  (delta < 0 && overdueChecked))
        );

        if (shouldDisplay) {
            taskCard.style.display = 'block';
        } else {
            taskCard.style.display = 'none';
        }
    }
    // updateFilters();
};

const addFilterContent = () => {
    const content = document.createElement("div");
    content.classList.add("filter-content");
    // let filters = JSON.parse(localStorage.getItem('taskFilters'));
    // console.log(filters.todo);
    // let checked = "";
    // if (!filters.todo ) {
    //     checked = "";
    // }
    // else {
    //     checked = "checked";
    // }
    content.innerHTML = `
    <h3>Filter Tasks</h3>
    <section class="filter">
        <h4>by keyword</h4>
        <input id="searchbar" type="text" maxlength="10" placeholder="Search" autofocus>
    </section>
    <section class="filter">
        <h4>by status</h4>
        <label><input type="checkbox" id="todoBox" checked> To do</label>
        <label><input type="checkbox" id="doingBox" checked> Doing</label>
        <label><input type="checkbox" id="doneBox" checked> Done </label>
    </section>
    <section class="filter">
        <h4>by deadline</h4>
        <label><input type="checkbox" id="overdueBox" checked> Overdue</label>
        <label><input type="checkbox" id="endOfDayBox" checked> End of Day</label>
        <label><input type="checkbox" id="dueNextDaysBox" checked> Due in the next days </label>
    </section>
    <div class="buttons">
        <button id="clearFilters"type="submit">Clear filters</button>
        <button id="applyFilters"type="submit">Apply filters</button>
    </div>
    `;
    return content;
}

const toggleFilterMenu = () => {
    // toggles on or off the filter menu
    const filterMenu = document.querySelector(".filter-menu");
    if (filterMenu.style.display === "none") {
        filterMenu.style.display = "flex";
        document.addEventListener("click", clickOut);
        // adds content to the filter menu
        const menuContent = addFilterContent();
        filterMenu.innerHTML = "";
        filterMenu.appendChild(menuContent);

        // Adds event listener on filter buttons
        document.querySelector('#applyFilters').addEventListener("click", () => {
            filterMenu.style.display = "none"
            applyFilters();
        });
        document.querySelector('#clearFilters').addEventListener("click", () => {
            clearFilters();
        });
    }
    else {
        filterMenu.style.display = "none";
        document.removeEventListener("click", clickOut);
        return;
    }
}

// not used for now : to check || local storage?
const updateFilters = () => {
    const keyword = document.getElementById('searchbar').value.toLowerCase();
    const todo = document.getElementById('todoBox').checked;
    const doing = document.getElementById('doingBox').checked;
    const done = document.getElementById('doneBox').checked;
    const overdue = document.getElementById('overdueBox').checked;
    const endOfDay = document.getElementById('endOfDayBox').checked;
    const dueNextDays = document.getElementById('dueNextDaysBox').checked;
    localStorage.setItem('taskFilters', JSON.stringify({
        keyword,
        todo,
        doing,
        done,
        overdue,
        endOfDay,
        dueNextDays
    }));
}

export { toggleFilterMenu, updateFilters };