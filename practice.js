const API_KEY = "KEY_GOES_HERE";

const weatherContainer = document.getElementById("weather");
const cityInputElement = document.getElementById("city");
const formElement = document.querySelector("form");

const getWeatherData = async (value) => {
  try {
    const responseData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_KEY}&units=metric`
    );

    if (!responseData.ok) {
      throw new Error("Network response was not ok.");
    }

    const weatherData = await responseData.json();
    const temperature = Math.floor(weatherData.main.temp);
    const desc = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const details = [
      `Feels like ${Math.floor(weatherData.main.feels_like)}`,
      `Humidity: ${weatherData.main.humidity}%`,
      `Wind speed: ${weatherData.wind.speed} m/s`,
    ];

    weatherContainer.querySelector(".icon").innerHTML = `
    <img src="http://openweathermap.org/img/wn/${icon}.png" alt="WeatherIcon" />
    `;
    weatherContainer.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;
    weatherContainer.querySelector(".description").textContent = `${desc}`;
    weatherContainer.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (err) {
    console.log(err);
  }
};

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityValue = cityInputElement.value;
  getWeatherData(cityValue);
});
