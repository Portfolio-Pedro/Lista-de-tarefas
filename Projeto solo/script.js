document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");
  
    // Carregar tarefas do localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => renderTask(task));
  
    // Adicionar tarefa
    addTaskButton.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (taskText === "") {
        alert("Digite uma tarefa!");
        return;
      }
  
      const newTask = { text: taskText, completed: false };
      tasks.push(newTask);
      saveTasks();
      renderTask(newTask);
  
      taskInput.value = "";
    });
  
    // Renderizar uma tarefa
    function renderTask(task) {
      const taskItem = document.createElement("li");
  
      const taskText = document.createElement("span");
      taskText.textContent = task.text;
      taskText.classList.add("task-text");
  
      taskItem.appendChild(taskText);
  
      // Botão de concluir
      const completeButton = document.createElement("button");
      completeButton.textContent = "Concluir";
      completeButton.classList.add("complete-btn");
      completeButton.addEventListener("click", () => {
        task.completed = true;
        saveTasks();
        taskItem.classList.add("completed");
        completeButton.style.display = "none";  // Esconde o botão "Concluir"
        undoButton.style.display = "inline-block";  // Mostra o botão "Desmarcar"
      });
      taskItem.appendChild(completeButton);
  
      // Botão de desmarcar
      const undoButton = document.createElement("button");
      undoButton.textContent = "Desmarcar";
      undoButton.classList.add("undo-btn");
      undoButton.style.display = "none"; // Inicialmente escondido
      undoButton.addEventListener("click", () => {
        task.completed = false;
        saveTasks();
        taskItem.classList.remove("completed");
        completeButton.style.display = "inline-block";  // Mostra o botão "Concluir"
        undoButton.style.display = "none";  // Esconde o botão "Desmarcar"
      });
      taskItem.appendChild(undoButton);
  
      // Botão de excluir
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Excluir";
      deleteButton.classList.add("delete-btn");
      deleteButton.addEventListener("click", () => {
        showConfirmation(taskItem, task, completeButton, undoButton, deleteButton);
      });
      taskItem.appendChild(deleteButton);
  
      taskList.appendChild(taskItem);
    }
  
    // Função para mostrar os botões de confirmação
    function showConfirmation(taskItem, task, completeButton, undoButton, deleteButton) {
      // Ocultar os botões de "Concluir" e "Desmarcar" ao mostrar a confirmação
      completeButton.style.display = "none";
      undoButton.style.display = "none";
      deleteButton.style.display = "none";
  
      // Criar os botões de confirmação
      const confirmationButtons = document.createElement("div");
      confirmationButtons.classList.add("confirmation-buttons");
  
      const confirmButton = document.createElement("button");
      confirmButton.textContent = "Confirmar";
      confirmButton.classList.add("confirm-btn");
      confirmButton.addEventListener("click", () => {
        const index = tasks.indexOf(task);
        tasks.splice(index, 1);
        saveTasks();
        taskList.removeChild(taskItem);
      });
  
      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancelar";
      cancelButton.classList.add("cancel-btn");
      cancelButton.addEventListener("click", () => {
        // Restaurar os botões de "Concluir", "Desmarcar" e "Excluir"
        completeButton.style.display = "inline-block";
        undoButton.style.display = "none";
        deleteButton.style.display = "inline-block";
        
        // Remover os botões de confirmação
        taskItem.removeChild(confirmationButtons);
      });
  
      confirmationButtons.appendChild(confirmButton);
      confirmationButtons.appendChild(cancelButton);
  
      taskItem.appendChild(confirmationButtons);
    }
  
    // Salvar tarefas no localStorage
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });
  
  
  
  