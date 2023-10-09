let now = new Date();

let date = now.getDate();

let milliseconds = now.getMilliseconds();

let day = now.getDay();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDay = days[now.getDay()];

let year = now.getFullYear();

let month = now.getMonth();

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let monthName = months[now.getMonth()];
let h2 = document.querySelector("h2");
h2.innerHTML = `${weekDay}, ${monthName} ${date}, ${year}`;

//JS to toggle currentLocation button ON and OFF

function toggleButton() {
  let body = document.querySelector("body");
  if (body.classList[0] != "activeButton") {
    body.classList.add("activeButton");
  } else {
    body.classList.remove("activeButton");
  }
}
let btn = document.querySelector("#currentLocationButton");

btn.addEventListener("click", toggleButton);

//JS to toggle weatherDetails ON and OFF

function toggleDetails() {
  let tempBtn = document.querySelector(".temperatureDetails");
  tempBtn.style.textDecoration = "underline";
  precipBtn.style.textDecoration = "none";
  windBtn.style.textDecoration = "none";
  document.querySelectorAll(".forecastDiv").forEach(function (div){
    div.style.display = "block"
  })
  document.querySelectorAll(".precipitationDiv").forEach(function(div){
    div.style.display = "none"
  })
  document.querySelectorAll(".windDiv").forEach(function(div){
    div.style.display = "none"
  })
}
let tempBtn = document.querySelector(".temperatureDetails");

tempBtn.addEventListener("click", toggleDetails);

function toggleDetails2() {
  let precipBtn = document.querySelector(".precipitationDetails");
  tempBtn.style.textDecoration = "none";
  precipBtn.style.textDecoration = "underline";
  windBtn.style.textDecoration = "none";
  document.querySelectorAll(".forecastDiv").forEach(function (div){
    div.style.display = "none"
  })
  document.querySelectorAll(".precipitationDiv").forEach(function(div){
    div.style.display = "block"
  })
  document.querySelectorAll(".windDiv").forEach(function(div){
    div.style.display = "none"
  })
}
let precipBtn = document.querySelector(".precipitationDetails");

precipBtn.addEventListener("click", toggleDetails2);

function toggleDetails3() {
  tempBtn.style.textDecoration = "none";
  precipBtn.style.textDecoration = "none";
  windBtn.style.textDecoration = "underline";

  document.querySelectorAll(".forecastDiv").forEach(function (div){
    div.style.display = "none"
  })
  document.querySelectorAll(".precipitationDiv").forEach(function(div){
    div.style.display = "none"
  })
  document.querySelectorAll(".windDiv").forEach(function(div){
    div.style.display = "block"
  })
}
let windBtn = document.querySelector(".windDetails");

windBtn.addEventListener("click", toggleDetails3);

// JS to edit search field placeholder (não tá a funcionar como quero)

let form = document.querySelector("#search-bar");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let h1 = document.querySelector("#city");
  let selectedCity = document.querySelector("#search-text-input");
  h1.innerHTML = `${selectedCity.value}`;
});

//Give real weather for Porto as default
let portoTemperature = document.querySelector("#temperature");
let todayDescription= document.querySelector("#today-description");
let todayHumidityValue= document.querySelector("#today-humidity-value");
let todayWindValue= document.querySelector("#today-wind-value");
let todayLottieFile= document.querySelector("#today-lottie");


function showPortoTemperature(response) {
  celsiusLink.style.fontWeight = "bold";
  portoTemperature.innerHTML = Math.round(response.data.main.temp);
  todayHumidityValue.innerHTML = Math.round(response.data.main.humidity);
  todayWindValue.innerHTML = Math.round(response.data.wind.speed*3.6);
  todayDescription.innerHTML = response.data.weather[0].description;
let weatherDescriptionLottie = response.data.weather[0].main;
let source= getLottie(weatherDescriptionLottie);

document.getElementById("today-lottie").load(source);
  getForecast(response.data.coord.lat, response.data.coord.lon);
}

let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
let apiUrlPorto = `https://api.openweathermap.org/data/2.5/weather?q=porto&appid=${apiKey}&units=metric`;
axios.get(apiUrlPorto).then(showPortoTemperature);


//Get weather info from inputted city

function showCityTemperature(response) {
  getForecast(response.data.coord.lat,response.data.coord.lon);
  let todayTempElement = document.querySelector("#temperature");
  let roundedTemperature = Math.round(response.data.main.temp);
  todayTempElement.innerHTML = `${roundedTemperature}`;
  if (fahrenheitLink.style.fontWeight === "bold") {
    todayTempElement.innerHTML = `${Math.round(
      (roundedTemperature * 9) / 5 + 32
    )}`;
    
  }
  todayHumidityValue.innerHTML = Math.round(response.data.main.humidity);
  todayWindValue.innerHTML = Math.round(response.data.wind.speed*3.6);
  todayDescription.innerHTML = response.data.weather[0].description;
  let weatherDescriptionLottie = response.data.weather[0].main;
  let source= getLottie(weatherDescriptionLottie);

document.getElementById("today-lottie").load(source);
}

function searchCity(context) {
  context.preventDefault();
  let h1 = document.querySelector("#city");
  let selectedCity = document.querySelector("#search-text-input");
  if (selectedCity.value === "") {
    selectedCity.value = "Porto";
  }
  let searchedCity = selectedCity.value.toLowerCase();
  let firstLetter = selectedCity.value[0].toUpperCase();
  let otherLetters = selectedCity.value.slice(1).toLowerCase();

  h1.innerHTML = `${firstLetter}${otherLetters}`;

  let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
  //forcing metric because main function will convert depending on user preference
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemperature);
}

form.addEventListener("submit", searchCity);

//Get weather from Geolocation

function showTemperature(position) {
  let temperature = Math.round(position.data.main.temp);
  let todayTempElement = document.querySelector("#temperature");
  todayTempElement.innerHTML = `${temperature}`;
  if (fahrenheitLink.style.fontWeight === "bold") {
    todayTempElement.innerHTML = `${Math.round((temperature * 9) / 5 + 32)}`;
  }
  let h1 = document.querySelector("h1");
  let city = position.data.name;
  h1.innerHTML = `${city}`;
  todayHumidityValue.innerHTML = Math.round(position.data.main.humidity);
  todayWindValue.innerHTML = Math.round(position.data.wind.speed*3.6);
  todayDescription.innerHTML = position.data.weather[0].description;
  let weatherDescriptionLottie = position.data.weather[0].main;
  let source= getLottie(weatherDescriptionLottie);

  document.getElementById("today-lottie").load(source);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
  let geolocationApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(geolocationApiUrl).then(showTemperature);
  getForecast(lat, lon);
}

function requestLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", requestLocation);


// 6-days forecast

function displayForecast(response) {

  let forecast = document.querySelector(".weekly-forecast");
  let forecastHTML = `<div class="row">`;
  let days =  getDaysInOrder();
   toggleDetails();
  
  days.forEach(function (day, index) {
    let temp= response.data.daily[index].temp;
    let precipitation= Math.round((response.data.daily[index].pop)*100);
    let wind= Math.round((response.data.daily[index].wind_speed) *3.6);
    let maxTemp= Math.round(temp.max-273.15);
    let minTemp= Math.round(temp.min-273.15);
    let icon = response.data.daily[index].weather[0].main;
let iconUrl= getLottie(icon);
    if (fahrenheitLink.style.fontWeight === "bold") {
      maxTemp = `${Math.round((maxTemp * 9) / 5 + 32)}`;
      minTemp = `${Math.round((minTemp * 9) / 5 + 32)}`;
    }
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 forecastDiv" style="display:block">
          <div class="other-days">${day}</div>
            <lottie-player
              class="players"
              src="${iconUrl}"
              background="transparent"
              speed="1"
              style="width: 70px; height: 70px"
              loop
              autoplay
            ></lottie-player>
            <div class="other-days"><span class="other-days temperatures max-temp">${maxTemp}</span>
            <span id="other-days temperatures">|<span>
            <span class="other-days temperatures min-temp">${minTemp}</span>
            <span id="other-days temperatures celsius-symbol">º<span>
            <div>
          </div>
        </div>
  `;
      forecastHTML = forecastHTML + `</div>`;

      //Adding precipitation
      forecastHTML =
      forecastHTML +
      `<div class="col-2 precipitationDiv" style="display:none">
        <div class="other-days">${day}</div>
          <lottie-player
            class="players"
            src="${iconUrl}"
            background="transparent"
            speed="1"
            style="width: 70px; height: 70px"
            loop
            autoplay
          ></lottie-player>
          <div class="other-days"><span class="other-days temperatures">${precipitation}%</span>
          <div>
        </div>
      </div>
`;
forecastHTML = forecastHTML + `</div>`;

      //Adding wind
      forecastHTML =
      forecastHTML +
      `<div class="col-2 windDiv" style="display:none">
        <div class="other-days">${day}</div>
          <lottie-player
            class="players"
            src="${iconUrl}"
            background="transparent"
            speed="1"
            style="width: 70px; height: 70px"
            loop
            autoplay
          ></lottie-player>
          <div class="other-days"><span class="other-days temperatures">${wind} km/h</span>
          <div>
        </div>
      </div>
`;
    forecastHTML = forecastHTML + `</div>`;
      forecast.innerHTML = forecastHTML 
    }
  })
 
}

function getForecast(lat, lon) {
  let oneCallApiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
  let oneCallApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${oneCallApiKey}`;
  axios.get(oneCallApiUrl).then(displayForecast);
}

//Creating function that will get Weather Description as input and give the icon as output

function getLottie (weatherDescriptionLottie) {
let source;

  if (weatherDescriptionLottie === "Clear"){
  source="https://lottie.host/b203385b-4897-48c5-9472-c752e11f75de/OiudcrwV4p.json"
} else if (weatherDescriptionLottie === "Clouds") {
  source="https://lottie.host/c55bc277-1acc-4cb4-af39-3973054bffe8/44cws6Lkjh.json"
} else if (weatherDescriptionLottie === "Drizzle") {
  source="https://lottie.host/728ac43a-91dd-4785-9fbb-519df1a04605/nBItufbJYl.json" 
} else if (weatherDescriptionLottie === "Rain") {
  source="https://lottie.host/a29dc3ce-1abc-40e9-859e-287504dcf451/NL3VN9iVeY.json" 
} else if (weatherDescriptionLottie === "Thunderstorm") {
  source="https://lottie.host/35ac5c8c-8329-47e4-9784-7310a5337c2a/8VNo0LgZU1.json" 
} else if (weatherDescriptionLottie === "Snow") {
  source="https://lottie.host/5ee56a11-de15-41d1-9da6-dae922750802/0KbQ41uHIx.json" 
} else {
  source="https://lottie.host/5cd9a689-8db4-40a2-a04f-cbe380c0d6d1/gHAFK08eRV.json"
}
return source;
};

// Defining the next day from today for the daily forecast

function getDaysInOrder(){
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

let currentDay = new Date().getDay()+1; // so i get the next day from today
let finalWeekArray = [];
let restartDay = 0
for(i = 0 ; i < 7; i++){
  if(currentDay +i > 6){
    finalWeekArray[i] = days[restartDay++]
}else{
  finalWeekArray[i] = days[currentDay +i]
}

}

return finalWeekArray
}

//Convert Celsius to Fahrenheit

let fahrenheitLink = document.querySelector("#fahrenheit");
let celsiusLink = document.querySelector("#celsius");

function convertTemp(event) {
  event.preventDefault();
  let weekForecastMaxTemp = document.querySelectorAll(".max-temp");
  let weekForecastMinTemp = document.querySelectorAll(".min-temp");

  if (fahrenheitLink.style.fontWeight !== "bold") {
    let celsiusValue = portoTemperature.innerHTML;
    let farenheitTemp = Math.round((celsiusValue * 9) / 5 + 32);
    portoTemperature.innerHTML = Math.round(farenheitTemp);
    fahrenheitLink.style.fontWeight = "bold";
    celsiusLink.style.fontWeight = "normal";
    for(i=0;i<6;i++){
    let maxTemp = weekForecastMaxTemp[i].innerHTML;
    let minTemp = weekForecastMinTemp[i].innerHTML;
    weekForecastMaxTemp[i].innerHTML = Math.round((maxTemp * 9) / 5 + 32);
    weekForecastMinTemp[i].innerHTML = Math.round((minTemp * 9) / 5 + 32);
  }
  } else {
    farenheitTemp = portoTemperature.innerHTML;
    celsiusValue = ((farenheitTemp - 32) * 5) / 9;
    portoTemperature.innerHTML = Math.round(celsiusValue);
    celsiusLink.style.fontWeight = "bold";
    fahrenheitLink.style.fontWeight = "normal";
    for(i=0;i<6;i++){
    let maxTemp = weekForecastMaxTemp[i].innerHTML;
    let minTemp = weekForecastMinTemp[i].innerHTML;
    weekForecastMaxTemp[i].innerHTML = Math.round(((maxTemp - 32) * 5) / 9);
    weekForecastMinTemp[i].innerHTML = Math.round(((minTemp - 32) * 5) / 9);
  }
  }
}

fahrenheitLink.addEventListener("click", convertTemp);
celsiusLink.addEventListener("click", convertTemp);

