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
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=87cbf5382a26348616956797afeee6f2"

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

var displayToday = function(weather) {
    console.log(weather);
}

var displayForecast = function(weather) {
    console.log(weather);
}

// listeners
searchEl.addEventListener("submit", searchSubmitHandler);