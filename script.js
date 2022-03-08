storedTasks = [];
storedTasks = JSON.parse(localStorage.getItem('TaskList')) || [];


function loadTasks() {
  storedTasks.forEach(task => {
    let newTaskName = task.TaskName;
    let newTaskDate = task.TaskDate;

    let newTask = document.createElement("li");
    newTask.innerHTML = `<span> ${newTaskName} </span><span  > ${newTaskDate}</span>
      <button onclick="editTask(event)">Edit</button>
     <button onclick="deleteTask(event)">x</button>
     <input class="selected-task" type="checkbox"/>`;

    document.getElementById("task-list-box").appendChild(newTask);

  })
}


//Local storage of tasks

function updateTasks() {
  let taskArray = [];
  let tasks = document.getElementsByTagName("li");

  let taskList = Array.from(tasks);
  taskList.forEach(element => {
    let obj = {};
    obj.TaskName = element.children[0].innerText;
    obj.TaskDate = element.children[1].innerText;
    taskArray.push(obj);
  })
  localStorage.setItem('TaskList', JSON.stringify(taskArray));


}

function AddTask() {
  let TaskName = document.getElementById("task-name").value;
  let TaskDate = document.getElementById("task-date").value;
  let newTask = document.createElement("li");
  newTask.innerHTML = `<span> ${TaskName} </span><span  > ${TaskDate}</span>
        <button onclick="editTask(event)">Edit</button>
       <button onclick="deleteTask(event)">x</button>
       <input class="selected-task" type="checkbox"/>`;

  document.getElementById("task-list-box").appendChild(newTask);

  updateTasks();
}

//delete single task
function deleteTask(event) {
  event.target.parentNode.remove();
  updateTasks();
}
// updating task

function editTask(event) {
  let currentItem = event.target.parentNode;
  let currentTaskName = currentItem.children[0];
  let currentTaskDate = currentItem.children[1];

  // currentTaskName.innerTEXT="fgbfgb";
  // currentItem.children[0].remove(); its works but remove totally even the edit button itself 
  currentItem.innerHTML = `<span> ${currentItem.children[0].innerText}</span>
   <span> ${currentItem.children[1].innerText}</span>
   <input id="current-task-name" type="text" placeholder=${currentTaskName.innerText}/>
   <input id="current-task-date" type="date" placeholder=${currentTaskDate.innerText}/>
   <button onclick="saveTask(event)">save</button>
   <button onclick="deleteTask(event)">x</button>
    <input class="selected-task" type="checkbox"/>`

  currentTaskName = currentItem.children[0];
  currentTaskDate = currentItem.children[1];

  currentTaskName.style.display = "none";
  currentTaskDate.style.display = "none";

  updateTasks();

}


//Saving tasks
function saveTask(event) {
  let currentItem = event.target.parentNode;
  let currentItemTaskName = currentItem.children[0];
  let currentItemTaskDate = currentItem.children[1];

  let editedTaskName = currentItem.children[2];
  let editedTaskDate = currentItem.children[3];
  currentItemTaskName.innerText = editedTaskName.value;
  currentItemTaskDate.innerText = editedTaskDate.value;
  editedTaskName.remove();
  editedTaskDate.remove();
  currentItemTaskName.style.display = 'inline';
  currentItemTaskDate.style.display = 'inline';

  currentItem.children[2].setAttribute("onclick", "editTask(event)");
  currentItem.children[2].innerText = "Edit"; //it also works
  updateTasks();

}


//deleteMultipleTask

function deleteMultipleTask() {
  console.log("delete");
  let selectedTasks = document.querySelectorAll(".selected-task");
  selectedTasks.forEach(element => {
    if (element.checked) { element.parentNode.remove(); }
  });
  updateTasks();
}





