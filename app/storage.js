
async function getCitiesLocalStorage() {
    return fetch(`${BACK_URL}/favourites`)
        .then((response) => {
            let data = response.json();
            return data;
        });
}

function addCityToLocalStorage(city) {
    fetch(`${BACK_URL}/favourites?cityName=${city}`, {method: 'POST'});
}

function deleteCityFromLocalStorage(city) {
    fetch(`${BACK_URL}/favourites?cityName=${city}`, {method: 'DELETE'});
}

// const defaultLocalStorage = ['Moscow', 'Tokyo', 'Stockholm', 'Seoul'];
// const citiesLocalStorageKey = "favourite-cities";
// const localStorage = window.localStorage;
//
// function setCitiesLocalStorage(cities){
//     localStorage.setItem(citiesLocalStorageKey, JSON.stringify(cities));
// }
//
// function getCitiesLocalStorage() {
//     const citiesStorage = JSON.parse(localStorage.getItem(citiesLocalStorageKey));
//     if (!citiesStorage) {
//         localStorage.setItem(citiesLocalStorageKey, JSON.stringify(defaultLocalStorage));
//     }
//
//     return JSON.parse(localStorage.getItem(citiesLocalStorageKey));
// }
//
// function addCityToLocalStorage(city) {
//     if (city) {
//         const citiesStorage = getCitiesLocalStorage();
//         if(citiesStorage.includes(city)){
//             throw Error('This city already exists in your favorites');
//         }
//         citiesStorage.push(city);
//         setCitiesLocalStorage(citiesStorage);
//
//     } else throw Error('No such city in api');
// }
//
// function deleteCityFromLocalStorage(city) {
//     if (city) {
//         const citiesStorage = getCitiesLocalStorage();
//         const newCitiesStorage = citiesStorage.filter((item) => item !== city);
//         setCitiesLocalStorage(newCitiesStorage);
//
//     }
// }
