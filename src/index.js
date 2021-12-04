window.onload = function() {

  //sets up communication with main electron process
  window.api.dataReturn("dataReturn", (data) => {
    //load event data
    console.log(data);
  });

  let addEvent = document.getElementById("newEvent");
  addEvent.addEventListener("click", function(event){
    //ask the main process to spawn a new window
    window.api.windowRequest("windowRequest");
  });

  let daylist = document.querySelectorAll('p.date');

  const date = new DateManager();
  populateDates(date, daylist);

  const connection = new ServerCom();

}

let weekOffset = 0;

function populateDates(date, list, weekOffset){
  let array = date.getWeekArray(weekOffset);
  list.forEach((item, i) => {
    item.innerHTML = array[i];
  });

}
