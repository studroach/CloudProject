window.onload = function() {

  let closeWindow = document.getElementById('closeBtn');
  let submitButton = document.getElementById('submitButton');
  let taskName = document.getElementById('taskName');
  let date = document.getElementById('date');
  let owner = document.getElementById('taskOwner');
  let id = document.getElementById('ownerId');

  closeWindow.addEventListener('click', function(event){
    window.api.send("cancel");
  });
  submitButton.addEventListener('click', function(event){
    if(taskName.value !== "" && date.value !== "") {

      const dateParts = date.value.split('-');

      const submitObj = {
        taskTitle: taskName.value,
        taskYear: dateParts[0],
        taskMonth: dateParts[1],
        taskDay: dateParts[2],
        assignedTo: owner.value,
        "Employee ID": id.value
      }
      window.api.send("addSubmit", submitObj);
    }
  })

}
