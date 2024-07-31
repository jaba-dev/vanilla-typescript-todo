
  const form = document.querySelector('.todo-form') as HTMLFormElement;
    const todoList = document.getElementById('todo-list') as HTMLUListElement;
   type Task = {
  id: string
  text: string,
  completed: boolean,
  createdAt: string,
  dueDateTime: string,
  priority: string
}
let tasks: Task[] = loadTasks()
console.log(tasks);


  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Retrieve values from form elements
    const todoText = (document.getElementById('todo-text') as HTMLInputElement).value;
    const dueDate = (document.getElementById('due-date') as HTMLInputElement).value;
    const dueTime = (document.getElementById('due-time') as HTMLInputElement).value;
    const priority = (document.getElementById('priority') as HTMLSelectElement).value;
    const todoCompleted = (document.getElementById('completed') as HTMLInputElement).checked;

    // Check if both date and time are provided
    if (!todoText || !dueDate || !dueTime) {
      alert('Please fill in all required fields.');
      return;
    }

    // Combine date and time into a single datetime string
    const dueDateTimeCombined = `${dueDate}T${dueTime}`;
    
 
    const newTask: Task = {
id: generateUniqueId(),
text: todoText,
completed: todoCompleted,
dueDateTime: dueDateTimeCombined,
createdAt: new Date().toISOString(),
priority: priority

    }
    console.log(newTask);
    addTask(newTask)
    
  });

 function addTask(task: Task):void {
  // Check for duplicates
  const isDuplicate = tasks.some(existingTask =>
    existingTask.text === task.text && existingTask.dueDateTime === task.dueDateTime
  );

  if (isDuplicate) {
    alert('A task with the same title and due time already exists.');
    return;
  }

  // Add the task if it's not a duplicate
  tasks.push(task);
  saveTasks();
}


  function saveTasks():void {
  localStorage.setItem("tasks", JSON.stringify(tasks))
  displayTasks()
}

// Display tasks function
function displayTasks(): void {
  console.log(tasks);
  
  const taskList = document.getElementById('todo-list'); // Ensure the ID matches your HTML
  if (taskList) {
    taskList.innerHTML = ''; // Clear existing tasks
    tasks.forEach(task => {
      const listItem = document.createElement('li');
      listItem.className = 'task-item';

      // Create and append task title
      const taskTitle = document.createElement('p');
      taskTitle.className = 'task-title';
      taskTitle.textContent = task.text; // Updated to `task.title`

      if (task.completed) {
        listItem.classList.add('completed');
      } else {
        listItem.classList.remove('completed');
      }

      // Create and append priority
      // const taskPriority = document.createElement('p');
      // taskPriority.className = 'task-priority';
      // taskPriority.textContent = `P: ${task.priority[0].toUpperCase()}`; 

      // Create and append created date
      // const taskCreated = document.createElement('p');
      // taskCreated.className = 'task-created';
      // taskCreated.textContent = `C: ${new Date(task.createdAt).toLocaleDateString()}`; 
      // Create and append due date and time
      const taskDueDateTime = document.createElement('p');
      taskDueDateTime.className = 'task-due';
      taskDueDateTime.textContent = `D: ${new Date(task.dueDateTime).toLocaleDateString()} ${new Date(task.dueDateTime).toLocaleTimeString()}`; // Show date and time

      // Create and append toggle button
      const toggleButton = document.createElement('button');
      toggleButton.className = 'toggle-button';
      toggleButton.innerHTML = task.completed ? '✔️' : '✔️'; // Use HTML entity for check mark
      toggleButton.addEventListener('click', () => {
        toggleTaskCompletion(task.id);
      });

      // Create and append delete button
      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-button';
      deleteButton.innerHTML = '❌'; // Use HTML entity for cross
      deleteButton.addEventListener('click', () => {
        deleteTask(task.id);
      });

      // Append all elements to list item
      listItem.appendChild(taskTitle);
      // listItem.appendChild(taskPriority);
      // listItem.appendChild(taskCreated);
      listItem.appendChild(taskDueDateTime);
      listItem.appendChild(toggleButton);
      listItem.appendChild(deleteButton);

      // Append list item to task list
      taskList.appendChild(listItem);
    });
  }
}

displayTasks()


// Toggle task completion function
function toggleTaskCompletion(id: string): void {
  tasks = tasks.map(task => {
   return task.id === id 
      ? { ...task, completed: !task.completed } 
      : task
  }
  );
  saveTasks();
  displayTasks();
}

// Delete task function
function deleteTask(id: string): void {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  displayTasks();
}

function loadTasks():Task[] {
  const taskJson = localStorage.getItem('tasks')
  if(taskJson === null){
   console.log("exec");
return []
  } else {
   console.log("exec");
 return JSON.parse(taskJson)
  }
  
}

  function generateUniqueId(): string {
  return  Date.now() + '-' + Math.floor(Math.random() * 1436249);
}

console.log(generateUniqueId());




