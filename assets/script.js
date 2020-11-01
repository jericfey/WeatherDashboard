$(document).ready(function () {
  //FUNCTIONS

  var newCity = function () {
    //get input info
    var cityInput = $("#city-input").val();
    //Store data
    localStorage.setItem("city", cityInput);
    // console.log("The city name has been saved." + cityInput);
    //generate button with city name
    $("#city-list").append(
      '<button class="list-group-item list-group-item-action bg-light" id=""></button>'
    );
    // $("#city-list").append(
    //   $(document.createElement("button")).prop({
    //     type: "button",
    //     innerHTML: cityInput,
    //     class: "list-group-item list-group-item-action bg-light",
    //     id: cityInput,
    //   })
    // );
  };

  // var callCity = function () {
  //   //call city from local storage
  //   alert("You selected: " + localStorage.getItem(cityInput));
  // };

  //EVENT LISTENERS
  //Event listener for city input on click
  $("#search").on("click", newCity);
  //Call cityname from storage when city button is clicked
  // $("#city-button").on("click", callCity);
});
