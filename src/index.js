import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_0h6gWU7nqCgXTyBDNuNjMFGmNzBMJ1pY0FmHBqh87swJtLjlQOpuPp9ZMsqYbble";

import { fetchBreeds } from "./cat-api";

const breedSelection = document.querySelector('select.breed-select')
const loading = document.querySelector(".loader")
const ERROR = document.querySelector(".error")
const informationForCat = document.querySelector(".cat-info")


breedSelection.style.display = "none"
ERROR.style.display = "none"


fetchBreeds()
    .then(resolve => {
        loading.style.display = "none"
        breedSelection.style.display = "block"
        const selectMarkup = resolve.map(
            //додаємо котиків
            item => `<option value="${item.id}">${item.name}</option>`
        ).join('');

        return breedSelection.innerHTML = selectMarkup;
    }).catch(error =>console.log(error) )