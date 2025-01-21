document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");
    const datetimeElement = document.getElementById("datetime");
  
    // Päivitä päivämäärä ja aika
    function updateDateTime() {
      const now = new Date();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
  
      // Muotoile päivämäärä ja aika
      const date = now.toLocaleDateString('fi-FI', options); // Suomalainen päivämäärä
      const time = now.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // 24-tunnin kellonaika
      datetimeElement.textContent = `${date}, ${time}`;
    }
  
    // Päivitä aika sekunnin välein
    setInterval(updateDateTime, 1000);
  
    // Lisää tehtävä napin painalluksella
    addTaskButton.addEventListener("click", addTask);
  
    // Lisää tehtävä myös Enter-näppäimellä
    taskInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        addTask();
      }
    });
  
    function addTask() {
      const taskText = taskInput.value.trim();
      if (!taskText) {
        alert("Anna tehtävä.");
        return;
      }
  
      const listItem = document.createElement("li");
      listItem.className = "flex items-center bg-blue-100 rounded-lg p-3";
  
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "h-5 w-5 text-blue-500 rounded focus:ring-blue-400";
      listItem.appendChild(checkbox);
  
      const taskSpan = document.createElement("span");
      taskSpan.textContent = taskText;
      taskSpan.className = "ml-3 text-gray-700 flex-1 text-lg";
      listItem.appendChild(taskSpan);
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Poista";
      deleteButton.className = "bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition";
      deleteButton.addEventListener("click", () => {
        taskList.removeChild(listItem);
      });
      listItem.appendChild(deleteButton);
  
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          taskSpan.classList.add("line-through", "text-gray-400");
        } else {
          taskSpan.classList.remove("line-through", "text-gray-400");
        }
      });
  
      taskList.appendChild(listItem);
      taskInput.value = "";
    }
  
    // Ensimmäinen ajan päivitys
    updateDateTime();
  });
  