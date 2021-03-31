// const favouriteCities = new array();

const list = document.querySelector("#favourite-weather-cities");
const input = document.querySelector("#city-search");

function addCityCard() {
    let cityName = document.getElementById('#city-search').value;

    createCityCard(cityName);
}


async function getWeatherByName(cityName){

    return fetch(`${API_url}&q=${cityName}`)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then((data) => {
            console.log(data);
            return data;
        })
}

function createCityCard(cityName) {

    getWeatherByName(cityName).then(data => {
        const div = document.createElement("div");
        div.id = "favourite-weather-city-" + `${data.name}`;

        const temp = `
            <div class="favourite-weather-city">
                <h4>${data.name}</h4>
                <div class="favourite-weather-degree">${Math.floor(data.main.temp)}°C</div>
                <div class="favourite-weather-icon">
                <img src=" http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="80px"/>
                </div>
                <div class="cross-button-block">
                    <button onclick="deleteCityCard(this.id)" id="${data.name}" class="cross-button">&times</button>
                </div>
            </div>
            <ul class="favourite-weather-info-list">
                <li class="favourite-weather-info">
                    <div class="weather-info">Ветер</div>
                    <div class="weather-details">${data.wind.speed} m/s, ${data.wind.deg}</div>
                </li>
                <li class="favourite-weather-info">
                    <div class="weather-info">Облачность</div>
                    <div class="weather-details">${data.weather[0].description}</div>
                </li>
                <li class="favourite-weather-info">
                    <div class="weather-info">Давление</div>
                    <div class="weather-details">${data.main.pressure} hpa</div>
                </li>
                <li class="favourite-weather-info">
                    <div class="weather-info">Влажность</div>
                    <div class="weather-details">${data.main.humidity}%</div>
                </li>
                <li class="favourite-weather-info">
                    <div class="weather-info">Координаты</div>
                    <div class="weather-details">[${Number(data.coord.lat).toFixed(2)}, ${Number(data.coord.lon).toFixed(2)}]</div>
                </li>
            </ul>`;

        div.innerHTML = temp;
        list.appendChild(div);
    })
}

function deleteCityCard(cityName) {
    list.remove("favourite-weather-city-" + cityName);
}
