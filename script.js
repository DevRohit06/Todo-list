var TODOS = [];

window.addEventListener('load', function () {
  let Todos = localStorage.getItem('todos');
  if (Todos) {
    TODOS = JSON.parse(Todos);
    DisplayTodos();
  }
});

document.getElementById('add-todo-btn').addEventListener('click', addTodo);

function UpdateLocalStorage() {
  let TodoString = JSON.stringify(TODOS);
  localStorage.setItem('todos', TodoString);
}

function addTodo(event) {
  event.preventDefault();
  let TodoText = document.getElementById('todo-text').value;

  if (!TodoText) {
    ShowAlert('Please write a todo &#128528;', 'danger');
  } else {
    TODOS.push(TodoText);
    UpdateLocalStorage();
    DisplayTodos();
    ShowAlert('Todo added successfully 	&#128512;', 'success');
    document.getElementById('todo-text').value = '';
  }
}

function DisplayTodos() {
  TODOLIST = ``;
  TODOS.forEach((todo, index) => {
    TODOLIST += `    <div id="toast-default" class=" task-box task flex items-center w-full p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">

        <div class="text-sm font-normal">${todo}</div>
        <button onclick="DeleteTodo()" type="button" class="ml-auto -mx-1.5 -my-1.5 " data-dismiss-target="#toast-default" aria-label="Close">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <i class="fa-solid fa-trash text-center"></i> </div>
        </button>
    </div>
    <br>`;
  });
  document.getElementById('todo-list-container').innerHTML = TODOLIST;
}

function DeleteTodo(index) {
  TODOS.splice(index, 1);
  UpdateLocalStorage();
  DisplayTodos();
  ShowAlert('Todo deleted successfully &#128578;', 'danger');
}

function ShowAlert(text, type) {
  let Alert = document.createElement('div');
  Alert.classList.add('todo-alert', 'w-50', 'mx-auto');
  Alert.innerHTML = `    <div class="task flex justify-center">
  <div  x-data="{ nofifiction: true }"
  x-init="$watch('nofifiction', function(value){ if(value){ setTimeout(function(){ nofifiction=false; }, 4000) } })"
  class="">
  <div x-show="nofifiction" x-transition
    class="flex items-center justify-between max-w-xs p-4 bg-white border rounded-md shadow-sm">
    <div class="flex items-center">
      
      <p class="ml-3 text-sm font-bold text-grey-600">${text} </p>
    </div>
    <span @click="nofifiction=false;" class="inline-flex items-center cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>
  </div>

</div>
</div>`;
  document.querySelector('main').prepend(Alert);
}