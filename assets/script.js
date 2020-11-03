$(document).ready(function () {
  //Hide divs until input has been completed
  $("#weather-cards").hide();

  //FUNCTIONS

  var newCity = function () {
    //get input from user into variable
    var cityInput = $("#city-input").val();

    //Store data from input into local storage
    localStorage.setItem("city", cityInput);

    //generate button with city name
    $("#city-list").append(
      `<button class="list-group-item list-group-item-action bg-light" id="city-name" value="${cityInput}">${cityInput}</button>`
    );
    //Clear input field after click
    $("#city-input").val("");

    //Call the function to display Weather for that city
    getWeather();
  };

  var getWeather = function () {
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
      var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";

      //VARIABLES

      var cityNameDiv = $("#city-title");
      var cityName = $("<span>");
      var weatherImage = $("<img>");
      var weatherDesc = $("<span>");
      var weatherCard = $("#temp");
      // var temp = $("<span>");
      var temperature = localStorage.setItem("temp", data.main.temp);
      var humidity = localStorage.setItem("humidity", data.main.humidity);
      var wind = localStorage.setItem("wind", data.wind.speed);
      var lat = localStorage.setItem("lat", data.coord.lat);
      var lon = localStorage.setItem("lon", data.coord.lon);
      //Get UV index and save to local storage
      var lat = localStorage.getItem("lat");
      var lon = localStorage.getItem("lon");
      var requestUrlUv =
        "https://api.openweathermap.org/data/2.5/uvi?appid=3976a448c3612fdae22654b75c5eca9a&lat=" +
        lat +
        "&lon=" +
        lon;
      // console.log(requestUrlUv);
      $.ajax({
        url: requestUrlUv,
        method: "GET",
      }).then(function (data) {
        // console.log(data.value);
        localStorage.setItem("uv", data.value);
      });

      //show cards once city has been entered
      $("#weather-cards").show();
      //clear div before start
      $("#city-title").empty();
      $("#temp").empty();
      var uv = localStorage.getItem("uv");

      //get data into html element
      cityName.text(data.name);
      weatherDesc.text(data.weather[0].description);
      // temp.text(data.main.temp);

      //modify image element attributes
      weatherImage.attr("src", iconURL);

      //append the HTML elements
      cityNameDiv.append(cityName);
      cityNameDiv.append("  " + currentDate);
      cityNameDiv.append(weatherImage);
      cityNameDiv.append(weatherDesc);
      weatherCard.append(`Temperature: ${temperature} &deg;F <br>`);
      weatherCard.append(`Humidity: ${humidity} % <br>`);
      weatherCard.append(`Wind Speed: ${wind} MPH <br>`);
      weatherCard.append(`UV Index: ${uv}`);
    });
  };

  var clickedCity = function () {
    console.log("This was clicked");
  };
  //EVENT LISTENERS
  //Event listener for city input on click
  $("#search").on("click", newCity);
  $("#city-name").on("click", clickedCity);
});

//Cannot get on click function to work for button id="city-name"
