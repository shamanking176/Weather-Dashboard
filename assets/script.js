searchButton = document.getElementById('search-button');
weatherTable = document.getElementById('weather-table');
var APIKey = "16bbdffe8d0c90cbe50af6d05b4b0908";
var city = $('.search-bar');
var tempEl = $('.temp');
var windEl = $('.wind');
var humidityEl = $('.humidity');
var pastEl = $("#past-search");
var citynameEl = $('.city-name');
var iconEl = $('.icon');
var day1 = $('.day1');
var day2 = $('.day2');
var day3 = $('.day3');
var day4 = $('.day4');
var day5 = $('.day5');
var dayofweek=[day1,day2,day3,day4,day5];
var currentDay = dayjs().format('MM/DD/YYYY');




// https://api.openweathermap.org/data/2.5/weather?q=atlanta&limit=1&units=imperial&appid=16bbdffe8d0c90cbe50af6d05b4b0908
    
function getAPI(cityname){
  
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ cityname + '&limit=1&units=imperial&appid=' + APIKey;
    fetch(weatherUrl)
    
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data); 
       
      var lat= data.coord.lat;
      var long= data.coord.lon;
    
      
      getApi2(lat,long);
     var temp = data.main.temp;
     var wind = data.wind.speed;
     var humidity = data.main.humidity;
     var icon = data.weather[0].icon;
     var img = document.createElement("img");
     img.setAttribute("src",  "https://openweathermap.org/img/wn/"+icon+"@2x.png")
        localStorage.setItem("cityname", cityname);
      tempEl.text("Temp:" + temp);
      windEl.text("Wind:" + wind);
      humidityEl.text("Humidity:" + humidity);
      citynameEl.text(cityname+"("+currentDay+")");
      citynameEl.append(img);

      var pastCity =localStorage.getItem("cityname");
      var recentBTN = document.createElement("button");
        recentBTN.setAttribute("class","past-searches");
        recentBTN.textContent=pastCity;
        pastEl.append(recentBTN);
      

        recentBTN.addEventListener("click",function(){
          // city.val()=recentBTN.textContent;
          var pastcity = recentBTN.textContent;
          getAPI(pastcity);
          console.log(city);
        });

    });

    



  };

  
        function getApi2(lat,long){
          var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long +'&appid=' +APIKey;
          fetch(weatherUrl)
    
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data);
        console.log(data.list[1].main.temp);
      for(i=1, j=0; i<6; i++, j++){
      
      var day = dayofweek[j];
      day[0].innerHTml="";
      var newDay = dayjs().add(i,'day').format('MM/DD/YYYY');
      console.log(day);
      var icon = data.list[i].weather[0].icon;
     var img = document.createElement("img");
     img.setAttribute("src",  "https://openweathermap.org/img/wn/"+icon+"@2x.png");
      var date = document.createElement("li")
       var temp= document.createElement("li");
       var wind= document.createElement("li");
       var humidity = document.createElement("li");
       date.textContent = newDay;
       temp.textContent=data.list[i].main.temp;
       wind.textContent=data.list[i].wind.speed;;
       humidity.textContent=data.list[i].main.humidity;
       day.append(date,img,temp,wind,humidity);
      }
        });
      };


      


  searchButton.addEventListener("click", function(){
    var cityname = city.val();
    getAPI(cityname);
    city.val('');
    
  });
 



