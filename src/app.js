function displayTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let feelsLikeElement = document.querySelector("#feelslike");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  feelsLikeElement.innerHTML = Math.round(response.data.temperature.feels_like);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.temperature.humidity;
}
let apiKey = "ee44ot6560132a4246a0947ebe4a550f";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=London&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
