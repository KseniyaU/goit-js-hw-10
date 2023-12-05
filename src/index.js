import axios from "axios";
//бібліотека для обробки селекту
//npm install slim-select
import SlimSelect from 'slim-select'
//npm i notiflix
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
axios.defaults.headers.common["x-api-key"] = "live_0h6gWU7nqCgXTyBDNuNjMFGmNzBMJ1pY0FmHBqh87swJtLjlQOpuPp9ZMsqYbble";




const breedSelection = document.querySelector('select.breed-select')
const loading = document.querySelector(".loader")
const ERROR = document.querySelector(".error")
const informationForCat = document.querySelector(".cat-info")


breedSelection.style.display = "none"
ERROR.style.display = "none"

new SlimSelect({
    select: '#selectElement'
});
fetchBreeds()
    .then(resolve => {
        loading.style.display = "none"
        breedSelection.style.display = "block"
        const selectMarkup = resolve.map(
            //додаємо котиків
            item => `<option value="${item.id}">${item.name}</option>`
        ).join('');

        return breedSelection.innerHTML = selectMarkup;
    }).catch(error =>{
        ERROR.style.display = "block"
        breedSelection.style.display = "none"
        loading.style.display = "none"
        Notiflix.Notify.warning('Oops! Something went wrong! Try reloading the page!')
        console.log(error)
    })
breedSelection.addEventListener("change", handleSelection)
     
function handleSelection(event) {
   
    loading.style.display = "block"
    breedSelection.style.display = "none"
    ERROR.style.display = "none"
     
     const breedId = event.target.value
    fetchCatByBreed(breedId)
        .then(catData => {
            loading.style.display = "none"
            breedSelection.style.display = "block"
            ERROR.style.display = "none"

            const { breeds, url } = catData;
            const { description, name, temperament } = breeds[0];
            const catInfo = `
            <img src = "${url}" alt = "${name}" width ="500" heght ="300">
            <div>
                <h1>${name}</h1>
                <p>${description}</p>
                <h3>${temperament}</h3>
            </div>
            `;
            return informationForCat.innerHTML = catInfo;
        }).catch(error => {
            console.log(error)
            Notiflix.Notify.warning('Oops! Something went wrong! Try reloading the page!')
            ERROR.style.display = "block"
            breedSelection.style.display = "none"
        
        })
}
