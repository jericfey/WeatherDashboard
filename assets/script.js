$(document).ready(function () {
  //FUNCTIONS

  var storeCity = function () {
    localStorage.setItem("cityInput", JSON.stringify());
  };

  //EVENT LISTENERS
  //Event listener for city input on click
  $("#search").on("click", storeCity);
});
