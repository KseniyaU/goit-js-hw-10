//npm i axios
import axios from "axios";
//ключ до api з котами
axios.defaults.headers.common["x-api-key"] = "live_0h6gWU7nqCgXTyBDNuNjMFGmNzBMJ1pY0FmHBqh87swJtLjlQOpuPp9ZMsqYbble";
const url = "https://api.thecatapi.com/v1/breeds"

function fetchBreeds() {
    return axios
        .get(url)
        .then(response => response.data)
        .catch(error => console.log(error))
        throw error; // Викидаємо помилку для обробки вище
}
// При необхідності можна додати експорт функції
export { fetchBreeds };