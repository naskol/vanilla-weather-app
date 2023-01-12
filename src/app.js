function showDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let currantTime = document.querySelector("#date");
  currantTime.innerHTML = `${day} ${hours}:${minutes}`;
}
showDate();

function formatDate(timestemp) {
  let date = new Date(timestemp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;

  forecastHTML = `<div class="row">

        <div class="col">
        <div class="frame-forecast">
          <div class="weather-forecast-day">
              ${formatDate(forecast[1].time)}
          </div>
          <img src=${
            forecast[1].condition.icon_url
          } width="40" class="forecast-img" />
          <div class="weather-forecast-temperature">
            <div class="weather-forecast-temperature-min">
                <span class="arrow-down">↓</span>${Math.round(
                  forecast[1].temperature.minimum
                )}°
                </div>
                <div class="weather-forecast-temperature-max">
                <span class="arrow-up">↑</span>${Math.round(
                  forecast[1].temperature.maximum
                )}°
                </div>
          </div>
        </div>
        </div>

        <div class="col">
        <div class="frame-forecast">
          <div class="weather-forecast-day">
              ${formatDate(forecast[2].time)}
          </div>
          <img src=${
            forecast[2].condition.icon_url
          } width="40" class="forecast-img" />
          <div class="weather-forecast-temperature">
            <div class="weather-forecast-temperature-min">
                <span class="arrow-down">↓</span>${Math.round(
                  forecast[2].temperature.minimum
                )}°
                </div>
                <div class="weather-forecast-temperature-max">
                <span class="arrow-up">↑</span>${Math.round(
                  forecast[2].temperature.maximum
                )}°
                </div>
          </div>
        </div>
        </div>

        <div class="col">
        <div class="frame-forecast">
          <div class="weather-forecast-day">
              ${formatDate(forecast[3].time)}
          </div>
          <img src=${
            forecast[3].condition.icon_url
          } width="40" class="forecast-img" />
          <div class="weather-forecast-temperature">
            <div class="weather-forecast-temperature-min">
                <span class="arrow-down">↓</span>${Math.round(
                  forecast[3].temperature.minimum
                )}°
                </div>
                <div class="weather-forecast-temperature-max">
                <span class="arrow-up">↑</span>${Math.round(
                  forecast[3].temperature.maximum
                )}°
                </div>
          </div>
          </div>
        </div>

        <div class="col">
        <div class="frame-forecast">
          <div class="weather-forecast-day">
              ${formatDate(forecast[4].time)}
          </div>
          <img src=${
            forecast[4].condition.icon_url
          } width="40" class="forecast-img"/>
          <div class="weather-forecast-temperature">
            <div class="weather-forecast-temperature-min">
                <span class="arrow-down">↓</span>${Math.round(
                  forecast[4].temperature.minimum
                )}°
                </div>
                <div class="weather-forecast-temperature-max">
                <span class="arrow-up">↑</span>${Math.round(
                  forecast[4].temperature.maximum
                )}°
                </div>
          </div>
        </div>
        </div>

        <div class="col">
        <div class="frame-forecast">
          <div class="weather-forecast-day">
              ${formatDate(forecast[5].time)}
          </div>
          <img src=${
            forecast[5].condition.icon_url
          } width="40" class="forecast-img" />
          <div class="weather-forecast-temperature">
            <div class="weather-forecast-temperature-min">
                <span class="arrow-down">↓</span>${Math.round(
                  forecast[5].temperature.minimum
                )}°
                </div>
                <div class="weather-forecast-temperature-max">
                <span class="arrow-up">↑</span>${Math.round(
                  forecast[5].temperature.maximum
                )}°
                </div>
          </div>
        </div>
        </div>
</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let longitude = coordinates.longitude;
  let latitude = coordinates.latitude;
  let apiKey = `ee44ot6560132a4246a0947ebe4a550f`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let feelsLikeElement = document.querySelector("#feelslike");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;
  celsiusFellsLikeTemperature = response.data.temperature.feels_like;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  feelsLikeElement.innerHTML = Math.round(celsiusFellsLikeTemperature);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.temperature.humidity;
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.icon);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "ee44ot6560132a4246a0947ebe4a550f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  search(city);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  let feelsLikeElement = document.querySelector("#feelslike");
  feelsLikeElement.innerHTML = Math.round(
    (celsiusFellsLikeTemperature * 9) / 5 + 32
  );
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  getForecastFahrenheit();
}

function displayCelsiusTemperature(event) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let feelsLikeElement = document.querySelector("#feelslike");
  feelsLikeElement.innerHTML = Math.round(celsiusFellsLikeTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;
let celsiusFellsLikeTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Kyiv");
