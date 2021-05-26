function intro() {
  document.getElementById("intro").innerHTML = "Yes yes its me paxuy!";
}

function start() {
  var x = 0;
  while (x < 10) {
    setTimeout(peter(x), 0);
    x = x + 1;
  }
}

function peter(x) {
  document.getElementById("output").innerHTML = "x=" + x;
}

function typing() {
  document.getElementById("output").innerHTML = document.getElementById("textfield").value;
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}



$(document).ready(function(){

  $("#textfield").each(function () {
    var elem = $(this);
  
    // Save current value of element
    elem.data("oldVal", elem.val());
  
    // Look for changes in the value
    elem.bind("propertychange change click keyup input paste", function (event) {
      // If value has changed...
      if (elem.data("oldVal") != elem.val()) {
        // Updated stored value
        elem.data("oldVal", elem.val());
  
        typing();
      }
    });
  });




});


