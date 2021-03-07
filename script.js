// Example http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=498b1b825511e066afa181c26c7685e4

// my key 498b1b825511e066afa181c26c7685e4 My key 

// api http://api.openweathermap.org/data/2.5/weather?q=

var m = moment();
console.log(moment());
console.log(m.format('MMM Do YY'));

var APIKey = "498b1b825511e066afa181c26c7685e4"
var city = $("#search").val();

$(document).ready(function () {

    // used from previous homewrok and class assisnment. 

    if (localStorage.getItem("Cities") === null) {
        var cities = [];
        var oldCities = [];
        localStorage.setItem("Cities", JSON.stringify(cities, oldCities));

    } else {
        var oldCities = JSON.parse(localStorage.getItem("Cities"));
        oldCities.forEach(city => {
            var newBtn = $(`<button type="button" class="btn btn-primary cityButtons"></button>`);
            newBtn.text(city);
            newBtn.appendTo(placeBtns);
        })

    }



    $("#searchBtn").on("click", function () {

        var searchInput = $("#search").val();
        var newBtn = $(`<button type="button" class="btn btn-primary cityButtons" id=${searchInput}></button>`);

        newBtn.text(searchInput);
        newBtn.appendTo(placeBtns);

        console.log(searchInput);
        // console.localStorage()

        var cities = [];
        var oldCities = JSON.parse(localStorage.getItem("Cities"));

        console.log(cities);

        cities.push(searchInput);
        localStorage.setItem("Cities", JSON.stringify([...oldCities, ...cities]));

        city = $("#search").val();


        getWeather();

    });

    $(document).on("click", ".cityButtons", function (e) {
        city = $(this).text();

        getWeather();
    });

    function getWeather() {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        


            // data to my index.html

            $("#todaysDate").html(moment().format("MMM Do YY"));

            var iconID = response.weather[0].icon;
            $('#icon').attr("src", "http://openweathermap.org/img/wn/" + iconID + "@2x.png");
            $("#cityName").text(response.name);
           
            var tempF = ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2);
            $("#temp").text("Temperature: " + tempF + "°F");
           
            var wind = ((response.wind.speed * 2.236936).toFixed(1));
            $("#wind").text("Wind Speed: " + wind + "mph");
            $("#humid").text("Humidity: " + response.main.humidity + "%");

            var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + APIKey;
           
        //    tutor helped me with this still not sure i get it

            // var tempFaren = Math.round(1.8 * (temperature - 273) + 32)  How can I do it in Celsius????


            var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + response.name + "&appid=" + APIKey;
            $.ajax({
                url: forecastURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                console.log(response.list);



                var icon0 = response.list[0].weather[0].icon;
                $('#d1i').attr("src", "http://openweathermap.org/img/wn/" + icon0 + "@2x.png");
               
                var tempF1 = ((response.list[0].main.temp - 273.15) * 1.80 + 32).toFixed(2);
                $("#d1t").text("Temp: " + tempF1 + "°F");
                $("#d1h").text("Humidity: " + response.list[0].main.humidity + "%");


                var icon1 = response.list[1].weather[0].icon;
                $('#d2i').attr("src", "http://openweathermap.org/img/wn/" + icon1 + "@2x.png");
               
                var tempF2 = ((response.list[1].main.temp - 273.15) * 1.80 + 32).toFixed(2);
                $("#d2t").text("Temp: " + tempF2 + "°F");
                $("#d2h").text("Humidity: " + response.list[1].main.humidity + "%");


                var icon2 = response.list[2].weather[0].icon;
                $('#d3i').attr("src", "http://openweathermap.org/img/wn/" + icon2 + "@2x.png");
               
                var tempF3 = ((response.list[2].main.temp - 273.15) * 1.80 + 32).toFixed(2);
                $("#d3t").text("Temp: " + tempF3 + "°F");
                $("#d3h").text("Humidity: " + response.list[2].main.humidity + "%");


                var icon3 = response.list[3].weather[0].icon;
                $('#d4i').attr("src", "http://openweathermap.org/img/wn/" + icon3 + "@2x.png");
               
                var tempF4 = ((response.list[3].main.temp - 273.15) * 1.80 + 32).toFixed(2);
                $("#d4t").text("Temp: " + tempF4 + "°F");
                $("#d4h").text("Humidity: " + response.list[3].main.humidity + "%");


                var icon4 = response.list[4].weather[0].icon;
                $('#d5i').attr("src", "http://openweathermap.org/img/wn/" + icon4 + "@2x.png");
               
                var tempF5 = ((response.list[4].main.temp - 273.15) * 1.80 + 32).toFixed(2);
                $("#d5t").text("Temp: " + tempF5 + "°F");
                $("#d5h").text("Humidity: " + response.list[4].main.humidity + "%");

                $("#dayOne").html(moment().add(1, 'days').format("MMM Do YY"));
            
                $("#dayTwo").html(moment().add(2, 'days').format("MMM Do YY"));
            
                $("#dayThree").html(moment().add(3, 'days').format("MMM Do YY"));
            
                $("#dayFour").html(moment().add(4, 'days').format("MMM Do YY"));
            
                $("#dayFive").html(moment().add(5, 'days').format("MMM Do YY"));

            });
        });
    }

});