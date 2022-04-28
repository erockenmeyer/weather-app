// id variables from html page
var searchEl = document.querySelector("#city-search");
var cityEl = document.querySelector("#city");
var historyEl = document.querySelector("#history");
var todayEl = document.querySelector("#today");
var forecastEl = document.querySelector("#forecast");

// when city is searched, get the name and pass to get coordinates
var searchSubmitHandler = function(event) {
    event.preventDefault();

    // get the city name from input
    var city = cityEl.value.trim();

    if (!city) {
        alert("Please enter a city name!");
    }

    getCityCoords(city);
    cityEl.value = "";
};

// get city coordinates
var getCityCoords = function(city) {
    // format api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=87cbf5382a26348616956797afeee6f2"
    
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // put city name on html
                var cityName = document.createElement("h2")
                cityName.classList = "col-4"
                cityName.textContent = city;
                todayEl.appendChild(cityName);

                // grab coordinates and pass to get weather & forecast
                var cityLat = data.coord.lat;
                var cityLon = data.coord.lon;
                getCityWeather(cityLat, cityLon);
            })
        } else {
            alert("Error: City not found.");
        }
    })
    .catch(function(error) {
        alert("Unable to connect.");
    })
}

// using coords, get weather for that city
var getCityWeather = function(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=87cbf5382a26348616956797afeee6f2"

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // send today's weather to be displayed
                displayToday(data.current);
                // send forecast to be displayed
                displayForecast(data.daily);
            })
        } else {
            alert("Error: City not found.");
        }
    })
    .catch(function(error) {
        alert("Unable to connect.");
    })
}

// display today's weather in the todayEl
var displayToday = function(weather) {
    console.log(weather);
    // element for date
    var dateEl = document.createElement("h2");
    dateEl.classList = "col-4 text-muted"
    // date is in unix, convert to js date & pull only mm/dd/yyyy
    var date = new Date(weather.dt * 1000).toLocaleDateString();
    dateEl.textContent = date;
    todayEl.appendChild(dateEl);

    // get icon to also put up
    var iconEl = document.createElement("span");
    var iconNum = weather.weather[0].icon;
    iconEl.classList = "col-4";
    iconUrl = "http://openweathermap.org/img/wn/" + iconNum + ".png";
    iconEl.innerHTML = "<img src=" + iconUrl + ">";
    todayEl.appendChild(iconEl);

    // create ul for rest of info
    var cityInfo = document.createElement("ul");

    // show temperature 
    var tempEl = document.createElement("li");
    tempEl.textContent = "Temperature: " + weather.temp + " F";
    cityInfo.appendChild(tempEl);

    // show humidity
    var humidEl = document.createElement("li");
    humidEl.textContent = "Humidity: " + weather.humidity + "%";
    cityInfo.appendChild(humidEl);

    // show windspeed
    var windEl = document.createElement("li");
    windEl.textContent = "Windspeed: " + weather.wind_speed + " mph";
    cityInfo.appendChild(windEl);

    // show UV index
    var uvEl = document.createElement("li");
    var uvIndEl = document.createElement("span");
    uvIndEl.textContent = weather.uvi;
    // check severity of UV index
    if (weather.uvi <= 2) {
        uvIndEl.classList = "bg-success text-white";
    } else if (weather.uvi <= 6) {
        uvIndEl.classList = "bg-warning";
    } else {
        uvIndEl.classList = "bg-danger text-white";
    }
    uvEl.textContent = "UV Index: ";
    uvEl.appendChild(uvIndEl);
    cityInfo.appendChild(uvEl);

    // append ul to main body
    todayEl.appendChild(cityInfo);
}

// display the weather forecast in the forecastEl
var displayForecast = function(weather) {
    console.log(weather);

    // loop through and display 5 days' forecast
    for (var i = 0; i < 5; i++) {
        // show date

        // show weather icon

        // show temperature

        // show windspeed

        // show humidity
    }
}

// listeners
searchEl.addEventListener("submit", searchSubmitHandler);