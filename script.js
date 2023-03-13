

const filterBtn = document.getElementById('filter-btn')
const header = document.getElementById('header')
const darkLightModeBtn = document.getElementById('dark-light-mode')
const continentList = document.getElementById('continent-list')

let darkModeHtml = false

filterBtn.addEventListener('click', () => {

    document.getElementById('continent-list').classList.toggle('hidden')

})


let countriesData = ''

fetch('https://restcountries.com/v2/all')
    .then(res => res.json())
    .then(data => {

        countriesData = data

        data.map((country) => {
            renderHTML(country)
        })

        
    })


// Use Search Filter Function

const searchBox = document.getElementById('search-box')
searchBox.addEventListener('click', function() {
    searchBox.value = ''
})

function searchFilterCountry() {

    
    document.getElementById('flag-container').innerHTML = ''

    countriesData.map((country) => {
        if (country.name.toLowerCase().includes(searchBox.value.toLowerCase())) {
            renderHTML(country)
        }
    })
}


// Filter By Region

let contList = document.getElementById('continent-list')

const newArray = Array.from(contList.children)

newArray.forEach(function(el) {
    el.addEventListener('click', (e) => {
        filterByRegion(e.target.textContent)
    })
})

function filterByRegion(selectedContinent) {
  
    document.getElementById('flag-container').innerHTML = ''

    countriesData.map((country) => {
        
        if (country.region.includes(selectedContinent)) {
            renderHTML(country)
                
        }
        
    })
    
}
let countryContainer = ''
function renderHTML(country) {

    
    countryContainer = document.getElementById('country-container')
    document.getElementById('flag-container').innerHTML += `
    
    <div class="country-container box-styles ${darkModeHtml ? 'dark-mode-elements':''}" id="${country.alpha3Code}" onClick="getCountry(${country.alpha3Code})">

        <div class="flag">
        <img src="${country.flag}" alt="" srcset="">
        </div>

        <span id="country-info">
            <h2 class="country-name"><span>${country.name}<span></h2>
            <p class="population"><span>Population:</span> ${country.population}</p>
            <p class="region"><span>Region:</span> ${country.region}</p>
            <p class="capital"><span>Capital:</span> ${country.capital}</p>
        </span>

    </div>

`
setTimeout(function() {
    searchBox.value = "Search for  country..."
}, 10000)

}


const body = document.getElementById('body')

function darkMode() {
    
    darkModeHtml = !darkModeHtml
    darkModeHtml ? darkLightModeBtn.textContent = 'Light Mode' : darkLightModeBtn.textContent = 'Dark Mode'
    console.log(darkModeHtml)

    filterBtn.classList.toggle('dark-mode-elements')
    searchBox.classList.toggle('dark-mode-elements')
    body.classList.toggle('dark-mode-body')
    header.classList.toggle('dark-mode-elements')
    continentList.classList.toggle('dark-mode-elements')
}



darkLightModeBtn.addEventListener('click', darkMode)