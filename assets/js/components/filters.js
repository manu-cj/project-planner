
const clickOut = (e) => {
    const filterMenu = document.querySelector(".filter-menu");
    const filterButton = document.querySelector("#filter-toggle");
    if (!filterMenu.contains(e.target) && e.target !== filterButton) {
        filterMenu.style.display = "none";
        // Remove event listener after closing filter menu
        document.removeEventListener("click", closeFilterMenuOutsideClick);
    }
}

const addFilterContent = () => {
    const content = document.createElement("div");
    content.classList.add("filter-content");
    content.innerHTML = `
    <h3>Filter Tasks</h3>
    <section class="filter">
        <h4>by keyword</h4>
        <input type="text" max-length="10" placeholder="Search" autofocus>
    </section>
    <section class="filter">
        <h4>by status</h4>
        <label><input type="checkbox"> To do</label>
        <label><input type="checkbox"> Doing</label>
        <label><input type="checkbox"> Done </label>
    </section>
    <section class="filter">
        <h4>by deadline</h4>
        <label><input type="checkbox"> Overdue</label>
        <label><input type="checkbox"> End of Day</label>
        <label><input type="checkbox"> Due in the next days </label>
    </section>
    `;
    return content;
}

const toggleFilterMenu = () => {
    const body = document.body;
    // toggles on or off the filter menu
    const filterMenu = document.querySelector(".filter-menu");
    if (filterMenu.style.display === "none") {
        filterMenu.style.display = "flex";
        document.addEventListener("click", clickOut);
        // adds content to the filter menu
        const menuContent = addFilterContent();
        filterMenu.innerHTML = "";
        filterMenu.appendChild(menuContent);
    }
    else {
        filterMenu.style.display = "none";
        document.removeEventListener("click", clickOut);
        return;
    }
}


export { toggleFilterMenu };