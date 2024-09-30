
const placeInput = document.getElementById('placeInput');
const temperatureElement = document.querySelector('.temperature');
const rangeElement = document.querySelector('.range');
const dateElement = document.getElementById('dateTime');
const weatherDescriptionElement = document.getElementById('weatherDescription');
const feelsLikeElement = document.getElementById('feelsLike');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('windSpeed');


function setBackgroundBasedOnTime() {
  const currentHour = new Date().getHours(); 
  const body = document.body;
  

  if (currentHour >= 18 || currentHour < 6) {
    
    body.style.background = "url('./night-sky.jpg')";
    body.style.backgroundSize = 'cover';
  } else {
    body.style.background = "url('./sunny-weather.webp')";
    body.style.backgroundSize = 'cover';
  }
}

async function getWeather(city) {
  const apiKey = '06e38712692bde77afe6f64191c3cce0';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const weatherData = await response.json();
    console.log(weatherData);

    const temp = weatherData.main.temp;
    const tempMin = weatherData.main.temp_min;
    const tempMax = weatherData.main.temp_max;
    const feelsLike = weatherData.main.feels_like;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const description = weatherData.weather[0].description;

  
    const date = new Date().toLocaleString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric' 
    });
    
    temperatureElement.innerHTML = `${Math.round(temp)}<span class="degree">°C</span>`;
    rangeElement.innerHTML = `<p>&uarr;${Math.round(tempMax)}<sup>°c</sup></p><p>|</p><p>&darr;${Math.round(tempMin)}<sup>°c</sup></p>`;
    dateElement.textContent = date;
    weatherDescriptionElement.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    feelsLikeElement.textContent = `${Math.round(feelsLike)}°C`;
    humidityElement.textContent = `${humidity}%`;
    windSpeedElement.textContent = `${Math.round(windSpeed * 3.6)} km/h`;  

  } catch (error) {
    alert(error.message);
  }
}


placeInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    const city = placeInput.value.trim();
    if (city) {
      getWeather(city);
    }
  }
});


getWeather('Bangalore');
setBackgroundBasedOnTime();
