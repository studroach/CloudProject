window.onload = function() {

  //sets up communication with main electron process
  window.api.dataReturn("dataReturn", (data) => {
    //loadTweets(data);
  });

  let addEvent = document.getElementById("newEvent");
  addEvent.addEventListener("click", function(event){
    //ask the main process to spawn a new window
    window.api.windowRequest("windowRequest");
  });

}
//ask the main process to send over the tweets
//window.api.send("toMain", classification);
