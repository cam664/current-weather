$(document).ready(function () {
    data.getLoc();
});

var data = (function () {
    //lookup users location, always calls getWeather() and passes it the city location
    function getLoc() {
        $.get('http://ip-api.com/json', function (response) {
            data.getWeather(response.city);
        })
    };    
    //getWeather() can be called in isolation to take a user input search parameter
    function getWeather(city) {
        $.get('http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=748aad33699f1e4210b6c4b402de9e70&units=metric', function(response) {
            view.render(response);
        });
    };
    
    return {
        getLoc: getLoc,
        getWeather: getWeather
    }
})();

var view = (function(){
    //all our lovely spans for the UI 
    var $temp = $('#temp-data');
    var $high = $('#high-data');
    var $low = $('#low-data');
    var $desc = $('#desc');
    var $wind = $('#wind-data');
    var $humid = $('#humid-data');
    var $city = $('#city-data');
    var $icon = $('#icon').find('i'); 

    function render(data) {
        var descCapitalize = data.weather[0].description.substring(0,1).toUpperCase();//openweathermap doesn't capitalize the first letter of it's description annoyingly
        
        $temp.html(Math.round(data.main.temp));//round because decimals are ugly
        $low.html(Math.round(data.main.temp_min));
        $high.html(Math.round(data.main.temp_max));
        $desc.html(descCapitalize + data.weather[0].description.substring(1));
        $wind.html(data.wind.speed);
        $humid.html(data.main.humidity);
        $city.html(data.name +', '+ data.sys.country);
        if(Date.now().toString().slice(0,10) > data.sys.sunrise && Date.now().toString().slice(0,10) < data.sys.sunset) {//for 'moon' and 'sun' icons respectively. Use only first 9 numbers of Date.now() because API only uses 9 numbers.
            $icon.removeClass().addClass('wi wi-owm-day-'+data.weather[0].id+'');
        } else {
            $icon.removeClass().addClass('wi wi-owm-night-'+data.weather[0].id+'');
        }    
    };
    
    return {
        render: render
    }
})();

var search = (function(){
    
    var $newCityForm = $('#new-city-form');
    var $newCityBtn = $('#new-city-btn');
    
    bindEvents();

    var form = document.querySelector('#new-city-form');//not using jquery in order to use .value

    function bindEvents() { 
        $newCityForm.on('focus', function () {
           form.value = ''; 
        });

        $(window).on('keyup', function (e) {
            var city = form.value;

            if(e.keyCode == 13) {//if it's enter, query open weather map with the input city name
                data.getWeather(city);
            }
        });
        
        $newCityBtn.on('click', function (e) {
            var city = form.value;

            data.getWeather(city);
        });
    }
})();
