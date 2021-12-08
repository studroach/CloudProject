window.onload = function() {

  //sets up communication with main electron process
  window.api.dataReturn("dataReturn", (data) => {
    console.log(data);
    populateEvents(data);
  });

  let addEvent = document.getElementById("newEvent");
  addEvent.addEventListener("click", function(event){
    //ask the main process to spawn a new window
    window.api.windowRequest("windowRequest");
  });

  let nextWeek = document.getElementById("next");
  nextWeek.addEventListener("click", function(event){
    weekOffset++;
    populateDates(daylist);
    populateEvents(tasks);
  });

  let prevWeek = document.getElementById("prev");
  prevWeek.addEventListener("click", function(event){
    weekOffset--;
    populateDates(daylist);
    populateEvents(tasks);
  });

  daylist = document.querySelectorAll('p.date');
  date = new DateManager();
  populateDates(daylist);

  const connection = new ServerCom();

}

let date,daylist,tasks;
let weekOffset = 0;

function populateDates(list){
  date.weekArray = date.getWeekArray(weekOffset);
  console.log(date.weekArray);
  list.forEach((item, i) => {
    item.innerHTML = date.weekArray[i];
  });
  if(weekOffset == 0){
    list[date.day].style.border = ".3vw solid #f54b1b"
  }else {
    list[date.day].style.border = ".3vw solid #2e2d2d"
  }
}

function populateEvents(data){
  let eventContainers = document.querySelectorAll(".eventContainer");

  if(Array.isArray(data)){
    tasks = data;
    eventContainers.forEach((item) => {
      item.innerHTML = "";
    });

    data.forEach((task) => {
      if(date.weekArray.includes(`${parseInt(task.taskDay, 10)}/${task.taskMonth}`)) {
        const dayslot = date.weekArray.findIndex((element) => {
          if(element == `${parseInt(task.taskDay, 10)}/${task.taskMonth}`){return true;}
        });
        eventContainers[dayslot].innerHTML += `<p>${task.taskTitle}<br>${task.assignedTo}</p>`
      }
    });
  }else {
    tasks.push(data);
    if(date.weekArray.includes(`${parseInt(data.taskDay, 10)}/${data.taskMonth}`)) {
      const dayslot = date.weekArray.findIndex((element) => {
        if(element == `${parseInt(data.taskDay, 10)}/${data.taskMonth}`){return true;}
      });
      eventContainers[dayslot].innerHTML += `<p>${data.taskTitle}<br>${data.assignedTo}</p>`
    }
  }

}
