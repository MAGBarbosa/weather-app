let now = new Date();
console.log(now);

let date = now.getDate();
console.log(date);

let milliseconds = now.getMilliseconds();
console.log(milliseconds);

let day = now.getDay();
console.log(day);

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
console.log(year);

let month = now.getMonth();
console.log(month);

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
}
let tempBtn = document.querySelector(".temperatureDetails");

tempBtn.addEventListener("click", toggleDetails);

function toggleDetails2() {
  let precipBtn = document.querySelector(".precipitationDetails");
  tempBtn.style.textDecoration = "none";
  precipBtn.style.textDecoration = "underline";
  windBtn.style.textDecoration = "none";
}
let precipBtn = document.querySelector(".precipitationDetails");

precipBtn.addEventListener("click", toggleDetails2);

function toggleDetails3() {
  tempBtn.style.textDecoration = "none";
  precipBtn.style.textDecoration = "none";
  windBtn.style.textDecoration = "underline";
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

function showPortoTemperature(response) {
  celsiusLink.style.fontWeight = "bold";

  portoTemperature.innerHTML = Math.round(response.data.main.temp);
  console.log("else");
}

let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
let apiUrlPorto = `https://api.openweathermap.org/data/2.5/weather?q=porto&appid=${apiKey}&units=metric`;
axios.get(apiUrlPorto).then(showPortoTemperature);

//Get weather info from inputted city

function showCityTemperature(response) {
  let todayTempElement = document.querySelector("#temperature");
  let roundedTemperature = Math.round(response.data.main.temp);
  todayTempElement.innerHTML = `${roundedTemperature}`;
  console.log(response);
  if (fahrenheitLink.style.textDecoration === "underline") {
    todayTempElement.innerHTML = `${Math.round(
      (roundedTemperature * 9) / 5 + 32
    )}`;
  }
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
  if (fahrenheitLink.style.textDecoration === "underline") {
    units = "imperial";
  } else {
    units = "metric";
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityTemperature);
}

form.addEventListener("submit", searchCity);

//Get weather from Geolocation

function showTemperature(position) {
  let temperature = Math.round(position.data.main.temp);
  console.log(position.data.main.temp);
  let todayTempElement = document.querySelector("#temperature");
  todayTempElement.innerHTML = `${temperature}`;
  if (fahrenheitLink.style.textDecoration === "underline") {
    todayTempElement.innerHTML = `${Math.round((temperature * 9) / 5 + 32)}`;
  }
  let h1 = document.querySelector("h1");
  let city = position.data.name;
  h1.innerHTML = `${city}`;
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

//Convert Celsius to Fahrenheit

let fahrenheitLink = document.querySelector("#fahrenheit");
let celsiusLink = document.querySelector("#celsius");
//let weekForecastMaxTemp = document.querySelector(".max-temp");
//let weekForecastMinTemp = document.querySelector(".min-temp");

function convertTemp(event) {
  event.preventDefault();
  if (fahrenheitLink.style.fontWeight !== "bold") {
    let celsiusValue = portoTemperature.innerHTML;
    let farenheitTemp = Math.round((celsiusValue * 9) / 5 + 32);
    //let maxTemp = weekForecastMaxTemp.innerHTML;
    //let minTemp = weekForecastMinTemp.innerHTML;
    portoTemperature.innerHTML = Math.round(farenheitTemp);
    //weekForecastMaxTemp.innerHTML = Math.round((maxTemp * 9) / 5 + 32);
    //weekForecastMinTemp.innerHTML = Math.round((minTemp * 9) / 5 + 32);
    fahrenheitLink.style.fontWeight = "bold";
    celsiusLink.style.fontWeight = "normal";
  } else {
    farenheitTemp = portoTemperature.innerHTML;
    celsiusValue = ((farenheitTemp - 32) * 5) / 9;
    portoTemperature.innerHTML = Math.round(celsiusValue);
    //weekForecastMaxTemp.innerHTML = ((maxTemp - 32) * 5) / 9;
    //weekForecastMinTemp.innerHTML = ((minTemp - 32) * 5) / 9;
    celsiusLink.style.fontWeight = "bold";
    fahrenheitLink.style.fontWeight = "normal";
  }
}

fahrenheitLink.addEventListener("click", convertTemp);
celsiusLink.addEventListener("click", convertTemp);

// 6-days forecast

function displayForecast(coordinates) {
  console.log(coordinates);
  let forecast = document.querySelector(".weekly-forecast");
  let forecastHTML = `<div class="row">`;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  days.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="other-days">${day}</div>
            <lottie-player
              class="players"
              src="https://assets6.lottiefiles.com/temp/lf20_dgjK9i.json"
              background="transparent"
              speed="1"
              style="width: 70px; height: 70px"
              loop
              autoplay
            ></lottie-player>
            <div class="other-days"><span class="other-days temperatures max-temp">22</span>
            <span id="other-days temperatures">|<span>
            <span class="other-days temperatures min-temp">15</span>
            <span id="other-days temperatures celsius-symbol">ºC<span>
            <div>
          </div>
        </div>
  `;
      forecastHTML = forecastHTML + `</div>`;
      forecast.innerHTML = forecastHTML;
    }
  });
}

function getForecast(lat, lon) {
  let oneCallApiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
  let oneCallApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${oneCallApiKey}`;
  console.log(lat);
  axios.get(oneCallApiUrl).then(displayForecast);
}
