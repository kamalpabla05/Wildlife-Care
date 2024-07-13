var navLink = document.getElementById('navLink');
      function showMenu(){
        navLink.style.right="0";
}
      function hideMenu(){
        navLink.style.right="-200px";
}

Api_key="6d9337cbfb948aeca61b371de574349d";

function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success)=>{
        let{latitude,longitude}=success.coords;
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${Api_key}").then(res=>res.json()).then(data=>{
            console.log(data)
        }) 
    })
}

var x=document.getElementById('deviceOutput');

function useDeviceLocation() {
  document.getElementById("deviceLocation").style.display = "block"; 
  document.getElementById("manualLocation").style.display = "none"; 
}

function enterLocationManually() {
  document.getElementById("manualLocation").style.display = "block"; 
  document.getElementById("deviceLocation").style.display = "none"; 
}


function getLocation() {
  if (navigator.geolocation) {
      x.innerHTML = "Getting location...";
      navigator.geolocation.getCurrentPosition(showposition);
  } else {
      console.log("Browser doesn't support this feature. Please update your browser");
  }
}

var globalAverage = 25;

function displayAlertsAndSuggestions(temp, aqi) {
  var alertMessage = "";
  var suggestionMessage = "";

  if (temp > globalAverage) {
    alertMessage = "Red Alert: High Temperature";
    suggestionMessage = "Immediate environment resolutions:\n1. Stay hydrated and cool.\n2. Limit outdoor activities during peak heat hours.\n3. Use energy-efficient appliances to reduce heat emissions.\n4. Support renewable energy sources.";

    if (aqi === "Poor" || aqi === "Very Poor") {
      alertMessage += " and Poor Air Quality";
      suggestionMessage += "\n5. Use air purifiers indoors.\n6. Avoid outdoor activities in areas with poor air quality.";
    }
  } else if (temp >= globalAverage && aqi === "Moderate") {
    alertMessage = "Alert: Moderate Temperature and Air Quality";
    suggestionMessage = "Long-term environment resolutions:\n1. Support sustainable transportation methods (e.g., public transit, carpooling, cycling).\n2. Reduce energy consumption.\n3. Plant trees and support green spaces to improve air quality.";
  } else if (temp < globalAverage && (aqi === "Good" || aqi === "Fair" || aqi === "Poor")) {
    alertMessage = "Friendly Reminder: Continue Working Towards Environmental Betterment";
    suggestionMessage = "Let's continue working towards a better environment by:\n1. Reducing carbon footprint.\n2. Supporting eco-friendly initiatives.\n3. Practicing sustainable living habits.";
  } else {
    alertMessage = "Environmental Recommendations";
    suggestionMessage = "Here are some measures that can help ensure a good environment:<br>1. Conserve water and energy.<br>2. Reduce, reuse, and recycle.<br>3. Support clean energy sources.\n<br>4. Advocate for environmental policies.";
  }
  alert(alertMessage);
  x.innerHTML += "<br>" + suggestionMessage;
}

function showposition(position) {
  var x = document.getElementById('deviceOutput');
  var loc = "http://api.openweathermap.org/geo/1.0/reverse?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=6d9337cbfb948aeca61b371de574349d";
  var tempURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=6d9337cbfb948aeca61b371de574349d";
  var aqiURL = "http://api.openweathermap.org/data/2.5/air_pollution?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=6d9337cbfb948aeca61b371de574349d";

  var weatherData = {
    loc: "",
    temp: "",
    aqi: ""
  };

  $.get({
    url: loc,
    success: function (data) {
      console.log(data);
      weatherData.loc = data[0].name + ", " + data[0].state + ", " + data[0].country + "<br>";
      
      if (weatherData.loc && weatherData.temp && weatherData.aqi) {
        x.innerHTML = weatherData.loc + weatherData.temp + weatherData.aqi;
        displayAlertsAndSuggestions(weatherData.temp, weatherData.aqi);
      }
    }
  })

  $.get({
    url: tempURL,
    success: function (data0) {
      console.log(data0);
      weatherData.temp = "Temperature: " + data0.list[0].main.temp + "<br>";
      
      if (weatherData.loc && weatherData.temp && weatherData.aqi) {
        x.innerHTML = weatherData.loc + weatherData.temp + weatherData.aqi;
        displayAlertsAndSuggestions(weatherData.temp, weatherData.aqi);
      }
    }
  })

  $.get({
    url: aqiURL,
    success: function (data1) {
      console.log(data1);
      weatherData.aqi = "AQI: " + data1.list[0].main.aqi + "<br>Air Quality: ";
      if (data1.list[0].main.aqi == 1) weatherData.aqi += "Good";
      else if (data1.list[0].main.aqi == 2) weatherData.aqi += "Fair";
      else if (data1.list[0].main.aqi == 3) weatherData.aqi += "Moderate";
      else if (data1.list[0].main.aqi == 4) weatherData.aqi += "Poor";
      else weatherData.aqi += "Very Poor";
      
      if (weatherData.loc && weatherData.temp && weatherData.aqi) {
        x.innerHTML = weatherData.loc + weatherData.temp + weatherData.aqi;
        displayAlertsAndSuggestions(weatherData.temp, weatherData.aqi);
      }
    }
  })
}

function getWeather() {
  var location = document.getElementById("locationInput").value;
  document.getElementById("manualOutput").innerHTML = "Weather information for: " + location;
  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=6d9337cbfb948aeca61b371de574349d";

  $.get({
    url: apiUrl,
    success: function (data) {
      console.log(data);
      var x = document.getElementById('manualOutput');
      // x.innerHTML = "Temperature: " + (data.main.temp - 273.15).toFixed(2) + "°C<br>";
      x.innerHTML = "Temperature: " + data.main.temp + " K<br>";
      var aqi = "http://api.openweathermap.org/data/2.5/air_pollution?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=6d9337cbfb948aeca61b371de574349d";
      $.get({
        url: aqi,
        success: function (data1) {
          console.log(data1);
          x.innerHTML += "AQI: " + data1.list[0].main.aqi + "<br>Air Quality: ";
          if (data1.list[0].main.aqi == 1) x.innerHTML += "Good";
          else if (data1.list[0].main.aqi == 2) x.innerHTML += "Fair";
          else if (data1.list[0].main.aqi == 3) x.innerHTML += "Moderate";
          else if (data1.list[0].main.aqi == 4) x.innerHTML += "Poor";
          else x.innerHTML += "Very Poor";
        }
      });
    }
  });
}