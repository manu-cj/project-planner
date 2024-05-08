import { displayTasks } from "./displayTasks.js";
import { getTasksFromStorage } from "./getTasks.js";

// Dismisses the filter menu when clicking outside the filter menu.
const clickOut = (e) => {
    const filterMenu = document.querySelector(".filter-menu");
    const filterButton = document.querySelector("#filter-toggle");
    if (!filterMenu.contains(e.target) && e.target !== filterButton) {
        filterMenu.style.display = "none";
        // Remove event listener after closing filter menu
        document.removeEventListener("click", clickOut);
    }
}

// Resets any existing filters in the local Storage
const clearFilters = () => {
    const keyword = "";
    const todo = true; 
    const doing = true;
    const done = true; 
    const overdue = true; 
    const endOfDay = true; 
    const dueNextDays = true; 
    localStorage.setItem('taskFilters', JSON.stringify({
        keyword,
        todo,
        doing,
        done,
        overdue,
        endOfDay,
        dueNextDays
    }));
    displayTasks();
}

const applyFilters = () => {
    // Stores status of each filter into variables.
    const keyword = document.querySelector('#searchbar').value.toLowerCase();
    const todo = document.querySelector('#todoBox').checked;
    const doing = document.querySelector('#doingBox').checked;
    const done = document.querySelector('#doneBox').checked;
    const overdue = document.querySelector('#overdueBox').checked;
    const endOfDay= document.querySelector('#endOfDayBox').checked;
    const dueNextDays = document.querySelector('#dueNextDaysBox').checked;
    localStorage.setItem('taskFilters', JSON.stringify({
        keyword,
        todo,
        doing,
        done,
        overdue,
        endOfDay,
        dueNextDays,
    }));
    displayTasks();
};

// Generates content for the filter menu
const addFilterContent = () => {
    const content = document.createElement("div");
    content.classList.add("filter-content");
    let filters = JSON.parse(localStorage.getItem('taskFilters'));
    content.innerHTML = `
    <h3>Filter Tasks</h3>
    <section class="filter">
        <h4>by keyword</h4>
        <input id="searchbar" type="text" maxlength="10" autofocus placeholder="Search" value="${filters.keyword}">
    </section>
    <section class="filter">
        <h4>by status</h4>
        <label><input type="checkbox" id="todoBox" ${filters.todo ? 'checked' : ''}> To do</label>
        <label><input type="checkbox" id="doingBox" ${filters.doing ? 'checked' : ''}> Doing</label>
        <label><input type="checkbox" id="doneBox" ${filters.done ? 'checked' : ''}> Done </label>
    </section>
    <section class="filter">
        <h4>by deadline</h4>
        <label><input type="checkbox" id="overdueBox" ${filters.overdue ? 'checked' : ''}> Overdue</label>
        <label><input type="checkbox" id="endOfDayBox" ${filters.endOfDay ? 'checked' : ''}> End of Day</label>
        <label><input type="checkbox" id="dueNextDaysBox" ${filters.dueNextDays ? 'checked' : ''}> Due in the next days </label>
    </section>
    <div class="buttons">
        <button id="clearFilters"type="submit">Clear filters</button>
        <button id="applyFilters"type="submit">Apply filters</button>
    </div>
    `;
    return content;
}

// Displays / Hides the filter menu
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
            filterMenu.style.display = "none"
            clearFilters();
        });
    }
    else {
        filterMenu.style.display = "none";
        document.removeEventListener("click", clickOut);
    }
}


export { toggleFilterMenu, clearFilters };