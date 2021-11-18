window.onload = function() {

  let closeWindow = document.getElementById('closeBtn');
  closeWindow.addEventListener('click', function(event){
    window.api.send("addSubmit");
  });

}
