//variables

var queryURL;
var queryURLUV;
var apiKey = "3127401310a0db8d29f47f672b5f03ef";
var recentCities = [];
var recentCitiesLocal = [];
var lon;
var lat;
//$("#city-1").text(recentCitiesLocal[0]);
//$("#city-2").text(recentCitiesLocal[1]);
//$("#city-3").text(recentCitiesLocal[2]);
//$("#city-4").text(recentCitiesLocal[3]);
//$("#city-5").text(recentCitiesLocal[4]);
//$("#city-6").text(recentCitiesLocal[5]);
//$("#city-7").text(recentCitiesLocal[6]);
//$("#city-8").text(recentCitiesLocal[7]);
// CLICK HANDLERS
$("#search-city").on("click", function (event) {
    event.preventDefault();

    // Set the query URLs based on the chosen city  
    var currentCity = $("#city").val();
    queryURL = "http://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + currentCity + "&APPID=" + apiKey;
    queryURLUV = "http://api.openweathermap.org/data/2.5/uvi?&lat=$" + lat + "&lon=" + lon + "&APPID=" + apiKey;
    queryURLForecast = "http://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + currentCity + "&APPID=" + apiKey;

    // Main API call
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            lon = response.coord.lon;
            lat = response.coord.lat;
            //queryURLUV = "http://api.openweathermap.org/data/2.5/uvi?&lat=$" + lat + "&lon=" + lon + "&APPID=" + apiKey;
            // Transfer content to HTML
            $("#selected-city").html("<h3>" + response.name + " " + moment().format('(l)') + "</h3>");
            $("#temp").html("<h6>Temperature: </h6>" + response.main.temp + "&deg; F");
            $("#humidity").html("<h6>Humidity: </h6>" + response.main.humidity + "%");
            $("#wind").html("<h6> Wind Speed: </h6>" + response.wind.speed + " MPH");
        });

    // add the current city to recent Cities array.    

    (recentCities).push(currentCity);
    localStorage.setItem("city-1", recentCities[0]);
    localStorage.setItem("city-2", recentCities[1]);
    localStorage.setItem("city-3", recentCities[2]);
    localStorage.setItem("city-4", recentCities[3]);
    localStorage.setItem("city-5", recentCities[4]);
    localStorage.setItem("recent-cities", recentCities);
    $("#city").val("");
    $("#city-1").text(recentCities[0]);
    $("#city-2").text(recentCities[1]);
    $("#city-3").text(recentCities[2]);
    $("#city-4").text(recentCities[3]);
    $("#city-5").text(recentCities[4]);
    $("#city-6").text(recentCities[5]);
    $("#city-7").text(recentCities[6]);
    $("#city-8").text(recentCities[7]);
    $("#launch").attr("style", "display: none");
    $("#details-card").attr("style", "display: block");
    $("#five-day").attr("style", "display: block");

    console.log("queryURL outside function: " + queryURL);
    console.log("queryURLUV outside function: " + queryURLUV);
    console.log("queryURLForecast outside function: " + queryURLForecast);

    /*//API call for UV index
    $.ajax({
        url: queryURLUV,
        method: "GET"
    })

        .then(function (response) {
            // Transfer content to HTML     
            console.log(response.value);
        }); */

    //API call for 5-day forecast
    $.ajax({
        url: queryURLForecast,
        method: "GET"
    })

        .then(function (response) {
            // Transfer content to HTML  
            $("#day-1").text(moment().add(1, 'days').format('l'));
            $("#day-2").text(moment().add(2, 'days').format('l'));
            $("#day-3").text(moment().add(3, 'days').format('l'));
            $("#day-4").text(moment().add(4, 'days').format('l'));
            $("#day-5").text(moment().add(5, 'days').format('l'));
            $("#temp-1").html("<span>Temp: </span>" + response.list[0].main.temp + "&deg;");
            $("#temp-2").html("<span>Temp: </span>" + response.list[1].main.temp + "&deg;");
            $("#temp-3").html("<span>Temp: </span>" + response.list[2].main.temp + "&deg;");
            $("#temp-4").html("<span>Temp: </span>" + response.list[3].main.temp + "&deg;");
            $("#temp-5").html("<span>Temp: </span>" + response.list[4].main.temp + "&deg;");
            $("#wtr-1").text(response.list[0].weather[0].main);
            $("#wtr-2").text(response.list[1].weather[0].main);
            $("#wtr-3").text(response.list[2].weather[0].main);
            $("#wtr-4").text(response.list[3].weather[0].main);
            $("#wtr-5").text(response.list[4].weather[0].main);
            $("#hum-1").html("<span>Humidity: </span>" + response.list[0].main.humidity + "%");
            $("#hum-2").html("<span>Humidity: </span>" + response.list[1].main.humidity + "%");
            $("#hum-3").html("<span>Humidity: </span>" + response.list[2].main.humidity + "%");
            $("#hum-4").html("<span>Humidity: </span>" + response.list[3].main.humidity + "%");
            $("#hum-5").html("<span>Humidity: </span>" + response.list[4].main.humidity + "%");

        });
});


