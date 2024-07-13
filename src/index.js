function updateWeather(response) {
  let tempElement = document.querySelector("#temperature");
  let temp = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let speed = response.data.wind.speed;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#icon");

  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;

  cityElement.innerHTML = response.data.city;

  timeElement.innerHTML = dateFormat(date);
  tempElement.innerHTML = Math.round(temp);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${Math.round(speed)}mph`;

  getForecast(response.data.city);
}

function dateFormat(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (hours >= 12) {
    period = "PM";
    if (hours > 12) {
      hours = hours - 12;
    }
  }

  if (hours === 0) {
    hours = 12; // Handle midnight case
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "ao845a73f82d076c60a25fbb55dt1569";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "ao845a73f82d076c60a25fbb55dt1569";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
 <div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            
            <img src = "${
              day.condition.icon_url
            }" class="weather-forecast-icon"/>
            
            <div class="weather-forecast-temps">
              <div class="weather-forecast-temp">
                <span class="bold">${Math.round(
                  day.temperature.maximum
                )}&deg</span>
              </div>
              <div class="weather-forecast-temp">${Math.round(
                day.temperature.minimum
              )}&deg</div>
            </div>
          </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

searchCity("Los Angeles");
