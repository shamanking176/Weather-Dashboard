searchButton = document.getElementById('search-button');
weatherTable = document.getElementById('weather-table');
var APIKey = "16bbdffe8d0c90cbe50af6d05b4b0908";
var city = $('.search-bar');
var tempEl = $('.temp');
var windEl = $('.wind');
var humidityEl = $('.humidity');
var pastEl = $("#past-search");




// https://api.openweathermap.org/data/2.5/weather?q=atlanta&limit=1&units=imperial&appid=16bbdffe8d0c90cbe50af6d05b4b0908
    
function getAPI(){
  var cityname = city.val();
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ cityname + '&limit=1&units=imperial&appid=' + APIKey;
    fetch(weatherUrl)
    
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data.main.temp); 
        
     var temp = data.main.temp;
     var wind = data.wind.speed;
     var humidity = data.main.humidity;
        localStorage.setItem("cityname", cityname);
      tempEl.textContent = "Temp:" + temp;
      windEl.textContent = "Wind:" + wind;
      humidityEl.textContent = "Humidity:" + humidity;


      var pastCity =localStorage.getItem("cityname");
      var recentBTN = document.createElement("button");
        recentBTN.setAttribute("class","past-searches");
        recentBTN.textContent=pastCity;
        pastEL.appendChild(recentBTN);
      
    });

    



  };

 
        


  searchButton.addEventListener("click", getAPI);
 



