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
      `<button class="list-group-item list-group-item-action bg-light" id="city-name" value="${cityInput}">${cityInput}</button>`
    );
    //Clear input field
    $("#city-input").val("");

    //Call the function to display Weather for that city
    displayWeather();
  };

  var displayWeather = function () {
    //show cards once city has been entered
    $("#weather-cards").show();
    //clear div before start
    // $("#city-title").empty();
    $("#temp").empty();

    //Trying to call value from button pushed
    // alert($(this).attr("value"));

    //call city from local storage
    var cityInput = localStorage.getItem("city");

    //Store lat/lon coordinates for selected city to local storage
    var requestUrlLatLon = "http://ip-api.com/json/?city=" + cityInput;
    $.ajax({
      url: requestUrlLatLon,
      method: "GET",
    }).then(function (data) {
      // console.log(lat);
      // console.log(lon);
      localStorage.setItem("lat", data.lat);
      localStorage.setItem("lon", data.lon);
    });

    //Get UV index and save to local storage
    var lat = localStorage.getItem("lat");
    var lon = localStorage.getItem("lon");
    var requestUrlUv =
      "http://api.openweathermap.org/data/2.5/uvi?appid=3976a448c3612fdae22654b75c5eca9a&lat=" +
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
      var weatherCard = $("#temp");
      var temp = $("<span>");
      var temperature = data.main.temp;
      var humidity = data.main.humidity;
      var wind = data.wind.speed;
      var uv = localStorage.getItem("uv");

      //get data into element created above
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

      // $("#city-title").css("display", "inline-block");
    });
  };

  //EVENT LISTENERS
  //Event listener for city input on click
  $("#search").on("click", newCity);
  // $("#city-name").on("click", displayWeather);
});
