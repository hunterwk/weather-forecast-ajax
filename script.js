//Opening call function
$(function () {
    // Checks local storage for stored city variables and if it exists
    // runs the code to display the information from previous search
    init();
    function init() {

    };
    
    //CITY VAR WILL BE ENTERED BY USER
    var city = "San Diego";
    var apiKey = "YOUR_API_KEY";
    //initial function to call the temp,humidity and wind speed
    function cityWeather() {
        var queryUrl =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=imperial&appid=" +
            apiKey;
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (data) {
            console.log(data);
            $("#selected-city-name").text(data.name)
            console.log(data.name)
            $("#selected-temperature").text(data.main.temp);
            $("#selected-humidity").text(data.main.humidity);
            $("#selected-wind-speed").text(data.wind.speed);

            //using the called latitude and longitude
            //determine the UV index for user specified city
            var latitude = data.coord.lat
            var longitude = data.coord.lon

        })

    }
    cityWeather();







})