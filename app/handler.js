// const BACK_URL = 'https://sleepy-headland-33699.herokuapp.com';
const BACK_URL = 'http://localhost:3000';

let latitude = 54.771648;
let longitude = 56.026932;

function getWeatherByCityFromBack(cityName){
    return fetch(`${BACK_URL}/weather/city?cityName=${cityName}`)
        .then(function(response) {
            let data = response.json();
            return data;
        })
}

function getWeatherByCoordinateFromBack(latitude, longitude){
     return fetch(`${BACK_URL}/weather/coordinates?lat=${latitude}&lon=${longitude}`)
        .then(function(response){
            let data = response.json();
            return data;
        })
}
