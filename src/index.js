function updateWeather(response) {
  let tempElement = document.querySelector("#temperature");
  let temp = response.data.temperature.current;
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(temp);
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);
searchCity("Los Angeles");
