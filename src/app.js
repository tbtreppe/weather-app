function formatDate(date) {
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = currentDate.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

let date = document.querySelector("#date");
let currentDate = new Date();
date.innerHTML = formatDate(currentDate);

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#desc").innerHTML = response.data.weather[0].main;
  document.querySelector("#image").innerHTML = response.data.weather.icon;
  // let image = response.data.weather.icon;

  //let currImage = document.querySelector("#image");

  //currImage.innerHTML = `${image}`;
}

function searchCity(city) {
  let apiKey = "ce144f0cf51fa43f03431f0488a36728";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

// let fahrenheit = document.querySelector("#fahrenheit");
// fahrenheit.addEventListener("click", function (event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
// });

// let celsius = document.querySelector("#celsius");
// celsius.addEventListener("click", function (event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
// });

function showLocation(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let unit = "metric";
  let apiKey = "ce144f0cf51fa43f03431f0488a36728";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let searchform = document.querySelector("#search-form");
searchform.addEventListener("submit", handleSubmit);

let currentBtn = document.querySelector("#getCurrent");
currentBtn.addEventListener("click", getCurrentLocation);
