const todoInput = document.getElementById('todo_input');
const taskList = document.getElementById('task_list');
const countRemaining = document.getElementById('items_left');
const clearComplete = document.getElementById('clear_completed');
const dropdown = document.getElementById('dropdown');

let currentView = 'all';
let tasks = [];
let flag = false;
let filter;
// Function to render tasks
function updateFilter(f) {
  filter = f;
}

function renderTasks() {
  taskList.innerHTML = '';
  let filteredTasks;
  switch (filter) {
    case 'active':
      currentView = 'active';
      filteredTasks = tasks.filter((task) => !task.completed);
      break;
    case 'completed':
      currentView = 'completed';
      filteredTasks = tasks.filter((task) => task.completed);
      break;
    default:
      currentView = 'all';
      filteredTasks = tasks;
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    const label = document.createElement('label');

    const deleteButton = document.createElement('button');

    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(index));

    deleteButton.innerText = 'x';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      deleteTask(index);
    });

    li.appendChild(checkbox);
    label.textContent = task.name;
    li.appendChild(label);
    li.appendChild(deleteButton);
    if (task.completed) {
      li.classList.toggle('strike_through');
      document.getElementById('clear_completed').style.display = 'inline-block';
    }
    li.classList.toggle('completed', task.completed);
    li.addEventListener('click', () => toggleTask(index));
    taskList.appendChild(li);
  });
  updateCount();
  updateFilterHilight();
}

// Function to add a task

function addTask(name) {
  tasks.unshift({ name, completed: false });
  renderTasks();
  document.getElementById('dropdown').style.display = 'inline-block';
  document.getElementById('items_left').style.display = 'inline-block';
  document.getElementById('all_btn').style.display = 'inline-block';
  document.getElementById('active_btn').style.display = 'inline-block';
  document.getElementById('completed_btn').style.display = 'inline-block';
}

// Function to toggle a task

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Function to clear completed tasks

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  flag ? renderTasks('completed') : renderTasks();
  flag = false;
  document.getElementById('clear_completed').style.display = 'none';
  // renderTasks('completed');
}

// Function to update the count of remaining tasks

function updateCount() {
  const remainingTasks = tasks.filter((task) => !task.completed).length;
  countRemaining.textContent = `${remainingTasks} item left`;
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Event listeners

todoInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    if (todoInput.value === '') {
      return;
    } else {
      addTask(todoInput.value);
      todoInput.value = '';
    }
  }
});

function selectAll() {
  tasks.forEach((task) => {
    // if(task.completed)
    task.completed = !task.completed;
  });
  renderTasks();
}

//

function updateFilterHilight() {
  const categoryButtons = document.querySelector('.bts');
  Array.from(categoryButtons.children).forEach((node) => {
    if (node.matches('button')) {
      const { filter } = node.dataset;
      if (filter === currentView) {
        node.classList.add('selected');
      } else {
        node.classList.remove('selected');
      }
    }
  });
}

document
  .getElementById('all_btn')
  .addEventListener('click', () => renderTasks('all'));
document
  .getElementById('active_btn')
  .addEventListener('click', () => renderTasks('active'));
document.getElementById('completed_btn').addEventListener('click', () => {
  console.log('comlete');
  flag = true;
  renderTasks('completed');
});
