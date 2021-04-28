const nameElement = document.querySelector("#main-name");
const iconElement = document.querySelector("#main-weather-icon");
const tempElement = document.querySelector("#main-weather-degree");

const windElement = document.querySelector("#weather-details-wind");
const cloudElement = document.querySelector("#weather-details-cloud");
const pressureElement = document.querySelector("#weather-details-pressure");
const humidityElement = document.querySelector("#weather-details-humidity");
const coordinateElement = document.querySelector("#weather-details-coordinates");

function convertDeg(deg) {
    const val = Math.floor((deg / 22.5) + 0.5);
    const arr = ["North", "North-east", "East", "South-east", "South", "South-west", "West", "North-west",];
    return arr[(val % 8)];
}

addWeatherByCoordinate(latitude, longitude);

function  updateCurrentGeolocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    }
}

function cityLoader() {
    const mainCityLoader = document.querySelector(".main-weather");
    const favouriteCityLoader = document.querySelector('.favourite-weather-cities');
    const loader = document.querySelector('.loader');

    loader.style.display = 'none';
    mainCityLoader.style.display = "grid";
    favouriteCityLoader.style.display = "grid";
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    addWeatherByCoordinate(latitude, longitude);
}

function showError(error){
    console.log(error.message);
}

function displayWeather(data){
    nameElement.innerHTML = `${data.name}`;
    iconElement.innerHTML = `<img src=" http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="160px"/>`;
    tempElement.innerHTML = `${Math.floor(data.main.temp)}°C`;

    windElement.innerHTML = `${data.wind.speed} m/s, ${convertDeg(data.wind.deg)}`;
    cloudElement.innerHTML = `${data.weather[0].description}`;
    pressureElement.innerHTML = `${data.main.pressure} hpa`;
    humidityElement.innerHTML = `${data.main.humidity}%`;
    coordinateElement.innerHTML = `[${data.coord.lat.toFixed(2)}, ${data.coord.lon.toFixed(2)}]`;
}

function addWeatherByCoordinate(latitude, longitude){
    getWeatherByCoordinateFromBack(latitude, longitude)
        .then((data) => {
            cityLoader();
            setTimeout(displayWeather(data), 1000);
        })
}
