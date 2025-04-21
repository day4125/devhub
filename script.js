document.addEventListener("DOMContentLoaded", () => {
  const listContainers = document.querySelectorAll(".tools");

  listContainers.forEach((container) => {
    const groceryInput = container.querySelector(".grocery-item-input");
    const groceryList = container.querySelector(".grocery-list");
    const addButton = container.querySelector(".add-button");
    const clearAllButton = container.querySelector(".clear-all-button");
    const storageKey = "groceryListItems";

    // Load from localStorage
    if (localStorage.getItem(storageKey)) {
      const savedItems = JSON.parse(localStorage.getItem(storageKey));
      savedItems.forEach((itemText) => {
        const listItem = document.createElement("li");
        listItem.textContent = itemText;

        const removeButton = document.createElement("button");
        removeButton.textContent = "X";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener("click", (event) => {
          event.stopPropagation();
          listItem.remove();
          saveGroceryList(); // Save after removing
        });

        listItem.appendChild(removeButton);
        groceryList.appendChild(listItem);
      });
    }

    // Function to save to localStorage
    function saveGroceryList() {
      const items = Array.from(groceryList.children).map(
        (li) => li.textContent.slice(0, -1).trim() //remove the X and any extra whitespace.
      );
      localStorage.setItem(storageKey, JSON.stringify(items));
    }

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
          saveGroceryList(); // Save after removing
        });

        listItem.appendChild(removeButton);
        groceryList.appendChild(listItem);
        groceryInput.value = "";
        saveGroceryList(); // Save after adding
      }
    });

    groceryInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        addButton.click();
      }
    });

    clearAllButton.addEventListener("click", () => {
      while (groceryList.firstChild) {
        groceryList.removeChild(groceryList.firstChild);
      }
      localStorage.removeItem(storageKey); // Clear from localStorage
    });
  });
});
