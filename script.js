window.onload = function () {
  var addButton = document.getElementById("add-button");
  addButton.addEventListener("click", addToDoItem);

  var toDoEntryBox = document.getElementById("todo-entry-box");
  var toDoList = document.getElementById("todo-list");

  function newToDoItem(itemText, completed) {
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    if (completed) {
      toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
  }

  function addToDoItem() {
    var itemText = toDoEntryBox.value;
    if (itemText.trim() !== "") {
      newToDoItem(itemText, false);
      toDoEntryBox.value = ""; // Clear the input box after adding a task
      saveList(); // Save the updated list to localStorage
    } else {
      alert("Please enter a task!");
    }
  }

  function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
      this.classList.remove("completed");
    } else {
      this.classList.add("completed");
    }
    saveList(); // Save the updated list to localStorage
  }

  function clearCompletedToDoItems() {
    var completedItems = toDoList.getElementsByClassName("completed");

    while (completedItems.length > 0) {
      completedItems.item(0).remove();
    }
    saveList(); // Save the updated list to localStorage
  }

  function emptyList() {
    var toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
      toDoItems.item(0).remove();
    }
    saveList(); // Save the updated list to localStorage
  }

  function saveList() {
    var toDos = [];

    for (var i = 0; i < toDoList.children.length; i++) {
      var toDo = toDoList.children.item(i);

      var toDoInfo = {
        task: toDo.innerText,
        completed: toDo.classList.contains("completed"),
      };

      toDos.push(toDoInfo);
    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
    console.log("List saved to localStorage");
  }

  function loadList() {
    if (localStorage.getItem("toDos") != null) {
      var toDos = JSON.parse(localStorage.getItem("toDos"));

      for (var i = 0; i < toDos.length; i++) {
        var toDo = toDos[i];
        newToDoItem(toDo.task, toDo.completed);
      }
    }
  }

  var clearButton = document.getElementById("clear-button");
  clearButton.addEventListener("click", clearCompletedToDoItems);

  var emptyButton = document.getElementById("empty-button");
  emptyButton.addEventListener("click", emptyList);

  var saveButton = document.getElementById("save-button");
  saveButton.addEventListener("click", saveList);

  loadList();
};
