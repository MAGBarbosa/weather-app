let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

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

function formatDate() {
  return `${weekDay}, ${monthName} ${date}, ${year}`;
}
console.log(formatDate(now));

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
  celsiusLink.style.textDecoration = "underline";

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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=metric`;
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
}

function requestLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", requestLocation);

//Convert Celsius to Fahrenheit

let fahrenheitLink = document.querySelector("#fahrenheit");
let celsiusLink = document.querySelector("#celsius");

function displayTemp(event) {
  event.preventDefault();
  if (fahrenheitLink.style.textDecoration !== "underline") {
    let celsiusValue = portoTemperature.innerHTML;
    let farenheitTemp = Math.round((celsiusValue * 9) / 5 + 32);
    portoTemperature.innerHTML = Math.round(farenheitTemp);
    fahrenheitLink.style.textDecoration = "underline";
    celsiusLink.style.textDecoration = "none";
  } else {
    farenheitTemp = portoTemperature.innerHTML;
    celsiusValue = ((farenheitTemp - 32) * 5) / 9;
    portoTemperature.innerHTML = Math.round(celsiusValue);
    celsiusLink.style.textDecoration = "underline";
    fahrenheitLink.style.textDecoration = "none";
  }
}

fahrenheitLink.addEventListener("click", displayTemp);
celsiusLink.addEventListener("click", displayTemp);
