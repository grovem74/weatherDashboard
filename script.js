// global variables
var apiKey = "3127401310a0db8d29f47f672b5f03ef";
var lon;
var lat;
var queryURLUV;
var currentCity;
var currentCityFormatted;
var recentCity;
var recentCities = [];
var recentCitiesLocal = [];
var savedCities = [];
var index = i + 1;

// set recent city name to empty string if there is no value
for (var i = 0; i < 8; i++) {

    var index = i + 1;
    if (("#city-" + index).text = "undefined") {
        $("#city-" + index).text("");
    };
};

// CLICK HANDLERS
$("#search-city").on("click", function (event) {
    event.preventDefault();

    // Set the query URLs based on the chosen city  
    currentCity = $("#city").val();

    queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + currentCity + "&APPID=" + apiKey;
    //queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?&lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey;
    queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + currentCity + "&APPID=" + apiKey;

    // Main API call
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            lon = response.coord.lon;
            lat = response.coord.lat;
            iconID = response.weather[0].icon;
            currentCityFormatted = response.name;
            weatherIcon = "http://openweathermap.org/img/wn/" + iconID + "@2x.png"
            queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?&lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey;
            // Transfer content to HTML
            $("#selected-city").html("<h3>" + response.name + " " + moment().format('(l)') + "</h3>");
            $("#temp").html("<h6>Temperature: </h6>" + Math.floor(response.main.temp) + "&deg; F");
            $("#icon").attr("src", weatherIcon);
            $("#humidity").html("<h6>Humidity: </h6>" + response.main.humidity + "%");
            $("#wind").html("<h6> Wind Speed: </h6>" + response.wind.speed + " MPH");
            //API call for UV index
            $.ajax({
                url: queryURLUV,
                method: "GET"
            })

                .then(function (response) {
                    uv = response.value;
                    // Transfer content to HTML     
                    $("#uv").text(uv);
                    if (uv <= 2) {
                        $("#uv").attr("class", "low")
                    } else if (uv > 2 && uv < 6) {
                        $("#uv").attr("class", "medium")
                    } else if (uv >= 6 && uv < 8) {
                        $("#uv").attr("class", "high")
                    } else if (uv >= 8 && uv < 11) {
                        $("#uv").attr("class", "very-high")
                    } else {
                        $("#uv").attr("class", "extreme")
                    };

                });


            recentCities.push(currentCityFormatted);

            recentCitiesLocal = JSON.stringify(recentCities);


            localStorage.setItem("cities", recentCitiesLocal);
            savedCities = JSON.parse(localStorage.getItem("cities"));
            console.log("saved cities 0:", savedCities[0]);  ///////////////////
            console.log(JSON.parse(localStorage["cities"]));
            console.log("savedCities", savedCities);

            //Set values for recent cities
            function recentCitiesList() {
                for (var i = 0; i < 8; i++) {
                    index = i + 1;
                    $("#city-" + index).text(savedCities[i]);
                };
            };

            recentCitiesList();

            $("#city").val("");
            $("#launch").attr("style", "display: none");
            $("#details-card").attr("style", "display: block");
            $("#five-day").attr("style", "display: block");
        });

    //API call for 5-day forecast
    $.ajax({
        url: queryURLForecast,
        method: "GET"
    })

        .then(function (response) {

            iconID = response.list[0].weather[0].icon;
            iconID2 = response.list[1].weather[0].icon;
            iconID3 = response.list[2].weather[0].icon;
            iconID4 = response.list[3].weather[0].icon;
            iconID5 = response.list[4].weather[0].icon;
            weatherIcon = "http://openweathermap.org/img/wn/" + iconID + "@2x.png"
            weatherIcon2 = "http://openweathermap.org/img/wn/" + iconID2 + "@2x.png"
            weatherIcon3 = "http://openweathermap.org/img/wn/" + iconID3 + "@2x.png"
            weatherIcon4 = "http://openweathermap.org/img/wn/" + iconID4 + "@2x.png"
            weatherIcon5 = "http://openweathermap.org/img/wn/" + iconID5 + "@2x.png"
            // Transfer content to HTML  
            $("#day-1").text(moment().add(1, 'days').format('l'));
            $("#day-2").text(moment().add(2, 'days').format('l'));
            $("#day-3").text(moment().add(3, 'days').format('l'));
            $("#day-4").text(moment().add(4, 'days').format('l'));
            $("#day-5").text(moment().add(5, 'days').format('l'));
            $("#temp-1").html("<span>Temp: </span>" + Math.floor(response.list[0].main.temp) + "&deg;");
            $("#temp-2").html("<span>Temp: </span>" + Math.floor(response.list[1].main.temp) + "&deg;");
            $("#temp-3").html("<span>Temp: </span>" + Math.floor(response.list[2].main.temp) + "&deg;");
            $("#temp-4").html("<span>Temp: </span>" + Math.floor(response.list[3].main.temp) + "&deg;");
            $("#temp-5").html("<span>Temp: </span>" + Math.floor(response.list[4].main.temp) + "&deg;");
            $("#wtr-1").attr("src", weatherIcon);
            $("#wtr-2").attr("src", weatherIcon2);
            $("#wtr-3").attr("src", weatherIcon3);
            $("#wtr-4").attr("src", weatherIcon4);
            $("#wtr-5").attr("src", weatherIcon5);
            $("#hum-1").html("<span>Humidity: </span>" + response.list[0].main.humidity + "%");
            $("#hum-2").html("<span>Humidity: </span>" + response.list[1].main.humidity + "%");
            $("#hum-3").html("<span>Humidity: </span>" + response.list[2].main.humidity + "%");
            $("#hum-4").html("<span>Humidity: </span>" + response.list[3].main.humidity + "%");
            $("#hum-5").html("<span>Humidity: </span>" + response.list[4].main.humidity + "%");

        });
});

// run search if city in recent list is clicked
for (var i = 0; i < 8; i++) {
    index = i + 1;
    $("#city-" + [index]).on("click", function () {
        recentCity = $(this).text();
        recentSearch();
    });
};

function recentSearch() {
    // Set the query URLs based on the chosen city  

    queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + recentCity + "&APPID=" + apiKey;
    queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + recentCity + "&APPID=" + apiKey;

    // Main API call
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            lon = response.coord.lon;
            lat = response.coord.lat;
            iconID = response.weather[0].icon;
            weatherIcon = "http://openweathermap.org/img/wn/" + iconID + "@2x.png"
            queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?&lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey;
            // Transfer content to HTML
            $("#selected-city").html("<h3>" + response.name + " " + moment().format('(l)') + "</h3>");
            $("#temp").html("<h6>Temperature: </h6>" + Math.floor(response.main.temp) + "&deg; F");
            $("#icon").attr("src", weatherIcon);
            $("#humidity").html("<h6>Humidity: </h6>" + response.main.humidity + "%");
            $("#wind").html("<h6> Wind Speed: </h6>" + response.wind.speed + " MPH");

            //API call for UV index
            $.ajax({
                url: queryURLUV,
                method: "GET"
            })

                .then(function (response) {
                    uv = response.value;
                    console.log(uv);
                    // Transfer content to HTML     
                    $("#uv").text(uv);
                    if (uv <= 2) {
                        $("#uv").attr("class", "low")
                    } else if (uv > 2 && uv < 6) {
                        $("#uv").attr("class", "medium")
                    } else if (uv >= 6 && uv < 8) {
                        $("#uv").attr("class", "high")
                    } else if (uv >= 8 && uv < 11) {
                        $("#uv").attr("class", "very-high")
                    } else {
                        $("#uv").attr("class", "extreme")
                    };

                });
        });


    $("#launch").attr("style", "display: none");
    $("#details-card").attr("style", "display: block");
    $("#five-day").attr("style", "display: block");

    //API call for 5-day forecast
    $.ajax({
        url: queryURLForecast,
        method: "GET"
    })

        .then(function (response) {
            iconID = response.list[0].weather[0].icon;
            iconID2 = response.list[1].weather[0].icon;
            iconID3 = response.list[2].weather[0].icon;
            iconID4 = response.list[3].weather[0].icon;
            iconID5 = response.list[4].weather[0].icon;
            weatherIcon = "http://openweathermap.org/img/wn/" + iconID + "@2x.png"
            weatherIcon2 = "http://openweathermap.org/img/wn/" + iconID2 + "@2x.png"
            weatherIcon3 = "http://openweathermap.org/img/wn/" + iconID3 + "@2x.png"
            weatherIcon4 = "http://openweathermap.org/img/wn/" + iconID4 + "@2x.png"
            weatherIcon5 = "http://openweathermap.org/img/wn/" + iconID5 + "@2x.png"
            // Transfer content to HTML  
            $("#day-1").text(moment().add(1, 'days').format('l'));
            $("#day-2").text(moment().add(2, 'days').format('l'));
            $("#day-3").text(moment().add(3, 'days').format('l'));
            $("#day-4").text(moment().add(4, 'days').format('l'));
            $("#day-5").text(moment().add(5, 'days').format('l'));
            $("#temp-1").html("<span>Temp: </span>" + Math.floor(response.list[0].main.temp) + "&deg;");
            $("#temp-2").html("<span>Temp: </span>" + Math.floor(response.list[1].main.temp) + "&deg;");
            $("#temp-3").html("<span>Temp: </span>" + Math.floor(response.list[2].main.temp) + "&deg;");
            $("#temp-4").html("<span>Temp: </span>" + Math.floor(response.list[3].main.temp) + "&deg;");
            $("#temp-5").html("<span>Temp: </span>" + Math.floor(response.list[4].main.temp) + "&deg;");
            $("#wtr-1").attr("src", weatherIcon);
            $("#wtr-2").attr("src", weatherIcon2);
            $("#wtr-3").attr("src", weatherIcon3);
            $("#wtr-4").attr("src", weatherIcon4);
            $("#wtr-5").attr("src", weatherIcon5);
            $("#hum-1").html("<span>Humidity: </span>" + response.list[0].main.humidity + "%");
            $("#hum-2").html("<span>Humidity: </span>" + response.list[1].main.humidity + "%");
            $("#hum-3").html("<span>Humidity: </span>" + response.list[2].main.humidity + "%");
            $("#hum-4").html("<span>Humidity: </span>" + response.list[3].main.humidity + "%");
            $("#hum-5").html("<span>Humidity: </span>" + response.list[4].main.humidity + "%");

        });
};
