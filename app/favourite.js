
async function addCityCard(name) {
    let data = await addCityToLocalStorage(name);
    createCityCard(data);
}

function handleKeyPress(e){
    let key=e.keyCode || e.which;
    if (key === 13){
        addCityByName();
        onclick = document.getElementById('#city-search').value = '';
    }
}

function addCityByName(name){
    let cityName = name || document.getElementById('#city-search').value;
    onclick = document.getElementById('#city-search').value = '';
    addCityCard(cityName);
}

function createCityCard(data) {
    if ('content' in document.createElement('template')) {
        const template = document.querySelector('#favourite-weather-cities-temp');

        const favouriteNameElement = template.content.querySelector(".favourite-weather-city h4");
        const favouriteTempElement = template.content.querySelector(".favourite-weather-degree");
        const favouriteIconElement = template.content.querySelector(".favourite-weather-icon");

        const favouriteWindElement = template.content.querySelector(".weather-details-wind");
        const favouriteCloudElement = template.content.querySelector(".weather-details-cloud");
        const favouritePressureElement = template.content.querySelector(".weather-details-pressure");
        const favouriteHumidityElement = template.content.querySelector(".weather-details-humidity");
        const favouriteCoordinateElement = template.content.querySelector(".weather-details-coordinate");

        favouriteNameElement.innerHTML = data.name;
        favouriteTempElement.innerHTML = `${Math.floor(data.main.temp)}°C`;
        favouriteIconElement.innerHTML = `<img src=" http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="80px">`;

        const degNESW = convertDeg(data.wind.deg);

        favouriteWindElement.innerHTML = `${data.wind.speed} m/s, ${degNESW}`;
        favouriteCloudElement.innerHTML = `${data.weather[0].description}`;
        favouritePressureElement.innerHTML = `${data.main.pressure} hpa`;
        favouriteHumidityElement.innerHTML = `${data.main.humidity}%`;
        favouriteCoordinateElement.innerHTML = `[${Number(data.coord.lat).toFixed(2)}, ${Number(data.coord.lon).toFixed(2)}]`;

        const clone = template.content.querySelector('div').cloneNode(true);
        const newTemplate = document.querySelector("#favourite-weather-cities");
        newTemplate.appendChild(clone);

        clone.querySelector("#cross-button").onclick = () => {
            newTemplate.removeChild(clone);
            deleteCityFromLocalStorage(data.name);
        };

    } else {
        throw new Error("Template isn't supported by the browser");
    }
}

async function createCitiesList() {
    let {data} = await getCitiesLocalStorage();
    const promiseArray = [];

    for (let i = 0; i < data.length; i++) {
        promiseArray.push(getWeatherByCityFromBack(data[i]));
    }
    Promise.all(promiseArray)
        .then((array) => array.forEach(item => {
            createCityCard(item);
        }))
        .catch((error) => alert(error))
}

createCitiesList();
