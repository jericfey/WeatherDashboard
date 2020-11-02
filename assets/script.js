$(document).ready(function () {
  //Hide divs until input has been completed
  $("#weather-cards").hide();

  //FUNCTIONS

  var newCity = function () {
    //get input info
    var cityInput = $("#city-input").val();
    //Store data
    localStorage.setItem("city", cityInput);
    // console.log("The city name has been saved." + cityInput);
    //generate button with city name
    $("#city-list").append(
      `<button class="list-group-item list-group-item-action bg-light" id="${cityInput}">${cityInput}</button>`
    );
    //Clear input field
    $("#city-input").val("");

    //Call the function to display Weather for that city
    displayWeather();
  };

  var displayWeather = function () {
    //show cards once city has been entered
    $("#weather-cards").show();

    //call city from local storage
    var cityInput = localStorage.getItem("city");
    //Add city input into API request url
    var requestURL =
      "https://api.openweathermap.org/data/2.5/weather?appid=3976a448c3612fdae22654b75c5eca9a&q=" +
      cityInput +
      "&units=imperial";

    //AJAX call
    $.ajax({
      url: requestURL,
      method: "GET",
    }).then(function (data) {
      // console.log(data);
      //Format today's date
      var fullDate = new Date();
      // console.log(fullDate);
      var twoDigitMonth = fullDate.getMonth() + "";
      if (twoDigitMonth.length == 1) twoDigitMonth = "0" + twoDigitMonth;
      var twoDigitDate = fullDate.getDate() + "";
      if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
      var currentDate =
        twoDigitMonth + "/" + twoDigitDate + "/" + fullDate.getFullYear();
      // console.log(currentDate);

      //create icons
      var iconCode = data.weather[0].icon;
      var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";

      //VARIABLES

      var cityNameDiv = $("#city-title");
      var cityName = $("<span>");
      var weatherImage = $("<img>");
      var weatherDesc = $("<span>");

      //temperature, humidity, wind speed, UV index, city name, today's date

      //get data into element created above
      cityName.text(data.name);
      weatherDesc.text(data.weather[0].description);

      //modify image element attributes
      weatherImage.attr("src", iconURL);

      //append the HTML elements
      cityNameDiv.append(cityName);
      cityNameDiv.append("  " + currentDate);
      cityNameDiv.append(weatherImage);
      cityNameDiv.append(weatherDesc);

      // $("#city-title").css("display", "inline-block");
    });
  };

  //EVENT LISTENERS
  //Event listener for city input on click
  $("#search").on("click", newCity);
});
