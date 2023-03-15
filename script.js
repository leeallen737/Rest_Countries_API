

const filterBtn = document.getElementById('filter-btn')
const header = document.getElementById('header')
const darkLightModeBtn = document.getElementById('dark-light-mode')
const continentList = document.getElementById('continent-list')

let darkModeOn = false

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
    
    <div class="country-container box-styles" id="${country.alpha3Code}" onClick="getCountry(${country.alpha3Code})">

        <div class="flag">
        <img src="${country.flag}" alt="" srcset="">
        </div>

        <span class="country-info">
            <h2 class="country-name"><span>${country.name}<span></h2>
            <p class="population"><span>Population:</span> ${country.population}</p>
            <p class="region"><span>Region:</span> ${country.region}</p>
            <p class="capital"><span>Capital:</span> ${country.capital}</p>
        </span>

    </div>

`
ifDarkModeOn(country.alpha3Code)
}

darkLightModeBtn.addEventListener('click', darkMode)

function darkMode() {
    darkModeOn = !darkModeOn


    let flagContainer = document.getElementById('flag-container')
    const newFlagContainer = Array.from(flagContainer.children)

    newFlagContainer.map(function(country) {
    if(darkModeOn) {

        if(country.id) {
            document.getElementById(country.id).classList.add('dark-mode-elements')
        }
        
    }

    if(darkModeOn === false) {
        if(country.id) {
            document.getElementById(country.id).classList.remove('dark-mode-elements')
        }
    }
})
}

function ifDarkModeOn(alpha) {
    if(darkModeOn) {
        
        if(alpha) {
            document.getElementById(alpha).classList.add('dark-mode-elements')
        }
        
    }

    if(!darkModeOn) {
        if(alpha) {
            document.getElementById(alpha).classList.remove('dark-mode-elements')
        }
    }
    
    
}