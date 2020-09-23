# weather-forecast-ajax

A weather forecast app based on the openweather free apis.

It features a city search and displays Temperature, wind speed, humidity, and the UV index.

Below the main weather display is a small 5 day forecast.

Iteration 1:

Show the current weather for atlanta when the page loads.

Show the city, date, weather icon, temp, humidity, wind speed


Iteration 2:

Search for any city and display the results.
Add form with search input and submit button.

Register event listener for submit event on the form.

When the form is submitted:
get the search input value
use it to create weather api url
send ajax request
display weather data using code from before

Iteration 3 (5-day forecast):

- add a variable to hold the search input value
- update form submit to assign the value to this varialbe
- build url for 5-day forecast query
- display forecast details on the page

