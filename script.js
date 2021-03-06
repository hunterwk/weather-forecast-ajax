//Opening call function
$(function () {
    // Checks local storage for stored city variables and if it exists
    // runs the code to display the information from previous search
    var apiKey = "ae72ba1c8b5248666070d873a02673f9";
    function init() {
        var localCities = JSON.parse(window.localStorage.getItem("cities"));
        if (!localCities){
            return;
        }
        renderCities(localCities);
        cityWeather(localCities[localCities.length -1]);
    }; 
    init();
    function renderCities(cities) {
        $("#past-searches").empty()
        for (let i=0; i < cities.length; i++){
            let liEl = $("<li>")
            liEl.text(cities[i])
            liEl.addClass("list-group-item list-group-item-action")
            liEl.on("click", function() {
                cityWeather(liEl.text())
            })
            $("#past-searches").append(liEl)
        }

    }

    
    //initial function to call the temp,humidity and wind speed
    function cityWeather(city) {
        var queryUrl =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=imperial&appid=" +
            apiKey;
            //1st ajax call for initial information
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (data) {
            console.log(data);
            $("#selected-city-name").text(data.name + " " + (new Date().toLocaleDateString()))
            console.log(data.name)
            $("#selected-temperature").text("Temperature: " + data.main.temp);
            $("#selected-humidity").text("Humidity: " + data.main.humidity);
            $("#selected-wind-speed").text("Wind Speed: " + data.wind.speed);

            //using the called latitude and longitude
            //determine the UV index for user specified city
            var latitude = data.coord.lat
            var longitude = data.coord.lon
            // create url for uv index query
            var uvQueryUrl = "https://api.openweathermap.org/data/2.5/uvi?";
            uvQueryUrl += "lat=" + latitude;
            uvQueryUrl += "&lon=" + longitude;
            uvQueryUrl += "&appid=" + apiKey;
            // make 2nd ajax request for uv data
            $.ajax({
                url: uvQueryUrl,
                method: "GET",
            }).then(function (uvData) {
                console.log(uvData);
                $("#selected-uv-index").text("UV index: " + uvData.value);
            });

        })
        weeklyForecast(city);
    }
    function weeklyForecast(city) {
        let queryUrl =
            "https://api.openweathermap.org/data/2.5/forecast?q=" +
            city +
            "&units=imperial&appid=" +
            apiKey;
        $.ajax({
        url: queryUrl,
        method: "GET"
        }).then(function (weeklyData){
            $("#five-day").empty()
            
            console.log(dayjs(weeklyData.list[0].dt_txt).format("M/D/YYYY"))
            for (let i=0; i <= weeklyData.list.length; i += 8) {
                //first gather variables to print info for 5 day forecast
                var forecastTitle = $("<h6>").text(dayjs(weeklyData.list[i].dt_txt).format("M/D/YYYY"))
                var iconCode = weeklyData.list[i].weather[0].icon
                var iconUrl = "http://openweathermap.org/img/wn/"+ iconCode +".png";
                var forecastIcon = $("<img>").attr("src", iconUrl)
                var forecastTemp = $("<p>").text(weeklyData.list[i].main.temp +"°F")
                var forecastHumidity = $("<p>").text("Humidity: " + weeklyData.list[i].main.humidity)
                var forecastCardBody = $("<div class ='card-body'>")
                forecastCardBody.append(forecastTitle, forecastIcon, forecastTemp, forecastHumidity)
                var forecastCard = $("<div class ='card bg-primary col-auto text-white'>")
                forecastCard.append(forecastCardBody)
                

                 
                $("#five-day").append(forecastCard)
            }
            
        })

    }

    $("#search-form").on("submit", function (event) {
        event.preventDefault();
        //the users search value is assigned to the city variable
        var city = $("#search-input").val().trim();
        console.log(city)
        //do nothing if user has hit submit without entering anything
        if (city === "") {
            return;
          }
        
        savedCity(city)
        cityWeather(city)
    })
    function savedCity(city) {
        var cities = JSON.parse(window.localStorage.getItem("cities"))
        if (!cities){
            cities=[];
        } 
        cities.push(city)
        if (cities.length > 5) {
            cities = cities.slice(-5);
        }
        window.localStorage.setItem("cities", JSON.stringify(cities))
        init();
    }

    //cityWeather();







})