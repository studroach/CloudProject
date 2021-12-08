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

  let daylist = document.querySelectorAll('p.date');
  date = new DateManager();
  populateDates(daylist, 0);

  const connection = new ServerCom();

}

let date;
let weekOffset = 0;

function populateDates(list, weekOffset){
  date.weekArray = date.getWeekArray(weekOffset);
  list.forEach((item, i) => {
    item.innerHTML = date.weekArray[i];
  });
  if(weekOffset == 0){
    list[date.day].style.border = ".3vw solid #f54b1b"
  }
}

function populateEvents(data){

  let eventContainers = document.querySelectorAll(".eventContainer");

  if(Array.isArray(data)){
    data.forEach((task) => {
      if(date.weekArray.includes(`${parseInt(task.taskDay, 10)}/${task.taskMonth}`)) {
        const dayslot = date.weekArray.findIndex((element) => {
          if(element == `${parseInt(task.taskDay, 10)}/${task.taskMonth}`){return true;}
        });
        eventContainers[dayslot].innerHTML += `<p>${task.taskTitle}<br>${task.assignedTo}</p>`
      }
    });
  }else {
    if(date.weekArray.includes(`${parseInt(data.taskDay, 10)}/${data.taskMonth}`)) {
      const dayslot = date.weekArray.findIndex((element) => {
        if(element == `${parseInt(data.taskDay, 10)}/${data.taskMonth}`){return true;}
      });
      eventContainers[dayslot].innerHTML += `<p>${data.taskTitle}<br>${data.assignedTo}</p>`
    }
  }

}
