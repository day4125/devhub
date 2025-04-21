document.addEventListener("DOMContentLoaded", () => {
  const listContainers = document.querySelectorAll(".tools");

  listContainers.forEach((container) => {
    const groceryInput = container.querySelector(".grocery-item-input");
    const groceryList = container.querySelector(".grocery-list");

    const addButton = document.querySelector(".add-button"); //Gets the first add button
    const clearAllButton = document.querySelector(".clear-all-button"); //Gets the first clear all button.

    addButton.addEventListener("click", () => {
      const itemName = groceryInput.value.trim();

      if (itemName !== "") {
        const listItem = document.createElement("li");
        listItem.textContent = itemName;

        const removeButton = document.createElement("button");
        removeButton.textContent = "X";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener("click", (event) => {
          event.stopPropagation();
          listItem.remove();
        });

        listItem.appendChild(removeButton);
        groceryList.appendChild(listItem);
        groceryInput.value = "";
      }
    });

    groceryInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        addButton.click();
      }
    });

    clearAllButton.addEventListener("click", () => {
      // Remove all child elements from the groceryList (which are the <li> items)
      while (groceryList.firstChild) {
        groceryList.removeChild(groceryList.firstChild);
      }
    });
  });
});
