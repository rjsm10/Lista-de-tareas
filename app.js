document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e) {
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  console.log(description)

  let task = {
    title,
    description
    
     };

  if(localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks();
  document.getElementById('formTask').reset();
  e.preventDefault();

}
function deleteTask(title) {
  console.log(title)
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].title == title) {
      tasks.splice(i, 1);
    }
  }
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}


const lista = document.getElementById('tasks');

Sortable.create(lista,{
  animation: 150,
   onEnd: () => {
    console.log('Se inserto un elemento');
   },
   group: "Lista de tarea",
   store: {
    set: (sortable) => {
      const orden = sortable.toArray();
      localStorage.setItem(sortable.options.group.name, orden.join('+'));
    },
    get: (sortable) => {
     const orden = localStorage.getItem(sortable.options.group.name);
     return orden ? orden.split('+') : [];
    }
   }
  });


function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';
  for(let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title;
    let description = tasks[i].description;

    tasksView.innerHTML += `<div class="card mb-3">
        <div id="persona" class="card-body.active">
          <p>${title} - ${description}
          <a href="#" onclick="deleteTask('${title}')" class="btn btn-danger ml-5">Borrar</a>
          <label for="success" class="btn btn-success ml-5 mt-2">Hecha? <input type="checkbox" id="success" class="badgebox"><span class="badge">&check;</span></label>
          </p>
        </div>
      </div>

      
      `;
  }
}

getTasks();

