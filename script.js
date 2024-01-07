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



const ObjectId = require('mongodb').ObjectId

function validateMongoDbIds(ids)
{
    for(let id of ids){
        if(!id)
        {
            return false;
        }
        if(!ObjectId.isValid(id))
        {
            return false;
        }
    }
    return true;
}

 

module.exports ={ validateMongoDbIds };


//////
dashboard.ejs
 <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Document</title>
     <link rel="stylesheet" href="/DashboardStyle.css">
 </head>
 <body  >
  <main>
      <div>Tweet</div>
      <div id="create--boxt">
        <label for="">Title: </label>
          <input  id="title" type="text" required> 
          <br/>
          <label for="">Text: </label>
          <input  id="text" type="text" required> 
          <br/>
          <br/>
           <button onclick="createTweet()">Create Tweet</button>  
      </div>

      <div id="search-box">
          <button onclick="getAllTweets()">My Tweets</button><button onclick="getTweetFeed()">TweetFeed</button>
      </div>
      <!-- display  tasks -->
      <div id="tweet-list-box">

      </div>
  </main>

  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
     <script src="/DashboardScript.js"></script>
 </body>
 </html>


/////login.ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <link rel="stylesheet" href="/LoginStyle.css">
</head>
<body>
    <div class="container">

      
        <br/>
        <div class="inputfield">
            <label for="">Username or Email id</label>
            <input type="text" id="loginId" placeholder="Enter your username">
        </div>
        <br/>
        <br/>
        <div class="inputfield">
            <label for="">Password</label>
            <input type="password"id="password" placeholder="Enter your Password">
        </div>
        <br/>
        <div>
            <button id="signinbtn" onclick="callLoginApi()">sign in</button>
        </div>
    </div>

    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="/LoginScript.js"></script>
</body>
</html>
///register.ejs
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    <title>REgister</title>
  </head>
  <body>
     

    <form action="/auth/register" method="POST">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>

    <!-- Optional JavaScript; choose one of the two! -->

    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

    <!-- Option 2: Separate Popper and Bootstrap JS -->
    <!--
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
    -->
  </body>
</html>

///privateconst
const dbURIbiml20000=`mongodb+srv://bimal:bimalkr@cluster0.tlc4fmt.mongodb.net/twitter?retryWrites=true&w=majority`
const SESSIONKEY=`Helloworld1`;

const bmlkumar2000Project0URI=`mongodb+srv://bmlkumar2000:brother@cluster0.b0wedxn.mongodb.net/twitter?retryWrites=true&w=majority`
const bmlkumar2000username=`bmlkumar2000`;
const password=`brother`;
const mongodbcompass='mongodb://localhost:27017';
module.exports= { dbURIbiml20000, SESSIONKEY, mongodbcompass };

//dshbrdscr
const config = {
    headers: {
        'content-type': 'application/json'
    }
}

window.onload = getAllTweets();

 

    function getAllTweets() {
    
    axios.post('/tweet/read', JSON.stringify({}), config).then(res => {
        if (res.data.status != 200)
        {
            alert('failed to read tweets . Please try again');
            return;
        }
        const dbTweetArr = res.data.data;
        console.log(dbTweetArr);
        document.getElementById('tweet-list-box').insertAdjacentHTML('beforeend', dbTweetArr.map(tweet => {
            return ` 
            <div>
            </br>
            <div class=${tweet._id}><span>Title : ${tweet.title}</span>
                      <div ><span>Text : ${tweet.text}</span></div>
            </div> 
             
            <button class=${tweet._id} onclick="editTweet(event)">Edit</button>
            <button  class=${tweet._id} onclick="deleteTweet(event)">x</button>
            </br>
            </div>
            `
        }).join(' '))

    }).catch (err=> {
        console.log(err);
    })
}
function editTweet(event) {
    
}
function createTweet() {
    const tweet = {
         title:document.getElementById('title').value,
         text:document.getElementById('text').value
    }

    axios.post('/tweet/create', JSON.stringify(tweet), config).then(res => {
        
        if (res.data.status === 200)
        {
            console.log(res.data.data);
            document.getElementById('tweet-list-box').insertAdjacentHTML('beforeend',
                `<div>
                 </br>
            <div class=${res.data.data.tweetId}><span>Title : ${res.data.data.title}</span>
            <div ><span>Text : ${res.data.data.text}</span></div>
            </div> 
   
           <button class=${res.data.data.tweetId} onclick="editTweet(event)">Edit</button>
          <button  class=${res.data.data.tweetId} onclick="deleteTweet(event)">x</button>
          </br>
  </div>
  `
            
            )
            return;
        }
        
        else {
            alert(res.message);
            return;
        }


    }).catch(err => {
        alert("Couldn't create tweet . please try again");
        return;
        
    })
    
}
function deleteTweet(event) {
     
    const tweetId = event.target.getAttribute('class');
    
    console.log(tweetId);

    axios.post('/tweet/delete', JSON.stringify({ tweetId }), config).then(res => {
        
        if (res.data.status === 200)
        {
            console.log(res.data);
            console.log(res.data.status);
            alert(res.data.message);
            event.target.parentNode.remove();
            return;

        }

    }).catch(err => {
        alert("some error occured while deleting");
        return;
    })
   


    
}
function sortTweet() {
    
}

function getTweetFeed() {

    axios.post('/tweet/tweetfeed', JSON.stringify({}), config).then(res => {
        
        
    })


}

////lgnscr
const config = {
    headers: {
        'content-type':'application/json'
    }
}
function callLoginApi() {
    const student = {
          loginId:document.getElementById("loginId").value,
          password:document.getElementById("password").value
    }

    axios.post('/auth/login', JSON.stringify(student),config).then(({ data }) =>
    {
        if (data.status === 200)
            window.alert(data.message+"  "+data.data.name);
        else{
            window.alert(data.error);
        }
            console.log(data);
        }).catch(err => {
            window.alert(err.error);
            console.log("Something went wrong please try again" + err);
        })

}






