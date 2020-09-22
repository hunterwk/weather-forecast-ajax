//Opening call function
$(function () {
    /* Day js isn't working for some reason.
    currentDay = " "
    currentDay.textContent = dayjs().format();
    console.log(currentDay)
    */
    var city = "San Diego";
    var apiKey = "ae72ba1c8b5248666070d873a02673f9";
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
            
            
        })

    }
    cityWeather();







})