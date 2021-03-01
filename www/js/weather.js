var doweather = function () { //This function should be used to build your weather information in the content element
    const content = $('#content');
    content.empty();
    content.html(`<div class="jumbotron jumbotron-fluid cent" id="logo">
        <img src = "img/turtlelogo.png" id = "logoimg">
                        <h1>Turtle Weather</h1>
                        <p class="lead">Get local weather by ZIP, City, or GPS</p>
                    </div >
    <div class="container-fluid">
        <div class="row">
            <div id="weather" class="col-lg-12 col-lg-offset-12 cent">
            </div>
        </div>      
        <div class="row">
            <div class="col-lg-12 col-lg-offset-12 cent">
                <input placeholder="Enter ZIP code or City..." class="form-control" id="textbox"></input>
                <button id="gobutton" class="btn btn-info">Search</button>
                            </div>
            </div>
        </div>`);
    $(document).ready(function () {
        console.log('started');
        //Add event listeners for buttons
        document.getElementById("gobutton").onclick = onGoButtonClick;
        $('#textbox').keypress(function (e) {
            if (e.which == 13) {
                onGoButtonClick();
            }
        });
    });

    //Weather API KEY
    const WEATHER_API_KEY = "fe009205a0853e0137148bfffee0bcb9"

    //reads input from input box, called when the go button is pushed.
    function onGoButtonClick() {
        //from results screen
        if ($('#gobutton').text() === "Search Again") {

            resetWeatherContent();
            screenchg();
            $('#gobutton').text('Search');


        } else {
            //find the element
            var val = document.getElementById("textbox").value
            if (val === "") { //Check for empty string, if empty provide error message
                var e = $('#weather');
                e.text("Can't search for empty string");
                return;

            }
            if (isNaN(val)) { //If value is not a number, call weather API by CITY
                console.log("CITY Detected");
                var url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss?location=' + val + '&format=json';
                getWeatherInfo(url, onWeatherSuccess, onWeatherFail);

            }
            else { //ELSE CALL BY ZIP CODE
                console.log("ZIP Detected");
                var url = "https://api.openweathermap.org/data/2.5/weather?zip=" + val + "&appid=" + WEATHER_API_KEY;
                xmlRequest(url, onWeatherFail);
                
                
            }
        }

    }

    //Some helpers to aid in repeated tasks
    function addWeatherContent(header, info) {
        const th = $("<th></th>").text(header);
        const td = $("<td></td>").text(info);
        const tr = $("<tr></tr>").append(th, td);
        $("#weather").append(tr);

       
    }



    function resetWeatherContent() {
        $("#weather").empty();

        
    }

    function screenchg() {
        $('#textbox').toggle();

        $('#head').remove();

        $('#gobutton').text('Search Again');



    }

    //This function is called when the location button is pushed.
    function xmlRequest(url, onFailure) {
        var request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const data = (JSON.parse(this.responseText));
                const lon = data.coord.lon;
                const lat = data.coord.lat;
                url = "https://weather-ydn-yql.media.yahoo.com/forecastrss?lat=" + lat + "&lon=" + lon + "&format=json";
                getWeatherInfo(url, onWeatherSuccess, onWeatherFail);

            }
            else if (this.readyState == 4) {
                onFailure(this.status);

            }
        };

        request.open("GET", url, true);
        request.send();



    }


    



    //Get weather from Yahoo
    function getWeatherInfo(url, onSuccess, onFailure) {
        var token = window.sessionStorage.getItem("token");
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                onSuccess(JSON.parse(this.responseText));
            }
            else if (this.readyState == 4) {
                onFailure(this.status);
            }
        };
        xhr.open('GET', url);

        //Set header for OAuth
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.send();
    }




    function onWeatherSuccess(data) {
        console.log(data);

        resetWeatherContent();
        screenchg();

        const table = "<table></table>";
        const tableEle = $("#weather");
        tableEle.append(table);

        

        console.log($('#weather').html());
        tableEle.addClass("table table-striped table-bordered");

        

      

        var head = $('<div></div>');
        head.attr('id', 'head');
        head.html(`<h2>Weather for ${data.location.city}, ${data.location.country}</h2>`);
        console.log(head.html());

        $('#logo').append(head);

        head.append(data.location.city + ', ' + data.location.country + ' ' +  data.current_observation.condition.temperature + ' ' + 'degrees');


        console.log(head.html());




        addWeatherContent("Temperature ", data.current_observation.condition.temperature + "F");


        addWeatherContent("Pressure ", data.current_observation.atmosphere.pressure);

        addWeatherContent("Humidity ", data.current_observation.atmosphere.humidity + "%");

        addWeatherContent("Wind ", data.current_observation.wind.speed + " mph");

        addWeatherContent("Sunrise ", data.current_observation.astronomy.sunrise + "AM");

        addWeatherContent("Sunset ", data.current_observation.astronomy.sunset + "PM");

        addWeatherContent("GPS", "[" + data.location.lat + ', ' + data.location.long + "]");

        addWeatherContent("Description", data.current_observation.condition.text);
    }

    function onWeatherFail(status) {
        alert("Failed to get weather on Code " + toString(status));
    }


    function onLocationError(e) {
        alert("Error getting location");



    }
}

