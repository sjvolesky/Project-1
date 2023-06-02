// write your code here

let now = new Date();
let date = document.querySelector("#date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
date.innerHTML = `${day} ${hours}: ${minutes}`;

function currentStats(response) {
  let city = document.querySelector("#city");
  let percipitation = document.querySelector("#percipitation");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let temp = document.querySelector("#temperature");
  city.innerHTML = response.data.name;
  percipitation.innerHTML = `Percipitation: ${
    response.data.rain ? response.data.rain["1h"] : 0
  }`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}`;
  wind.innerHTML = `Wind: ${response.data.wind.speed}`;
  temp.innerHTML = Math.round(response.data.main.temp);
}
function displayCity(response) {
  let cityInput = document.querySelector("#city");
  let citySearch = document.querySelector("#city-search");
  cityInput.innerHTML = response.data.name;
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = response.data.main.temp;
}
let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

function searchCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-search").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=5da7b2dc058f07286fea39c4cee516a3&units=metric`;

  axios.get(url).then(currentStats);
}
function showCurrent(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5da7b2dc058f07286fea39c4cee516a3&units=metric`;
  console.log(url);
  axios.get(url).then(currentStats);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrent);
}

let button = document.querySelector("#current");
button.addEventListener("click", getCurrentPosition);
//Bonus

//function convertToF() {
//let temperatureElement = document.querySelector("#temperature");
//temperatureElement.innerHTML = 68;
//}

//function convertToC() {
//let temperatureElement = document.querySelector("#temperature");
//temperatureElement.innerHTML = 20;
//}

//let fahrenheitlink = document.querySelector("#fahrenheit-link");
//fahrenheitlink.addEventListener("click", convertToF);

//let celsiusLink = document.querySelector("#celsius-link");
//celsiusLink.addEventListener("click", convertToC);