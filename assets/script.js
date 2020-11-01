$(document).ready(function () {
  //FUNCTIONS

  var storeCity = function () {
    //get input info
    var cityInput = $("#city-input").val();
    //Store data
    localStorage.setItem("city", cityInput);
    alert("The city name has been saved.");
  };

  // var callCity = function () {
  //   //call city from local storage
  //   alert("You selected: " + localStorage.getItem(cityInput));
  // };

  //EVENT LISTENERS
  //Event listener for city input on click
  $("#search").on("click", storeCity());
  //Call cityname from storage when city button is clicked
  // $("#city-button").on("click", callCity);
});
