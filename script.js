
const body = document.getElementById('body')
const filterBtn = document.getElementById('filter-btn')
const header = document.getElementById('header')
const darkLightModeBtn = document.getElementById('dark-light-mode')
const continentList = document.getElementById('continent-list')

let darkModeOn = true

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
    loading(10000)
}
let countryContainer = ''

function loading(delay) {

    if(darkModeOn) {
        document.getElementById('loading').classList.add('light-img')
        document.getElementById('loading').classList.remove('dark-img')
    }else {
        document.getElementById('loading').classList.add('dark-img')
        document.getElementById('loading').classList.remove('light-img')
    }
     
    setTimeout(function() {
        document.getElementById('loading').style.display = "none"
    }, delay)
}

loading(10000)

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
        darkLightModeBtn.textContent = 'Light Mode'
        if(country.id) {
            addDarkElements(country.id)
        }
        
    }

    if(darkModeOn === false) {
        darkLightModeBtn.textContent = 'Dark Mode'
        if(country.id) {
            removeDarkElements(country.id)
        }
    }
})
}

function ifDarkModeOn(alpha) {
    if(darkModeOn) {
        darkLightModeBtn.textContent = 'Light Mode'
        if(alpha) {
            addDarkElements(alpha)
        }
        
    }

    if(!darkModeOn) {
        darkLightModeBtn.textContent = 'Dark Mode'
        if(alpha) {
            removeDarkElements(alpha)
        }
    }
    
    
}

const searchBoxOuter = document.getElementById('search-box-outer')

function addDarkElements(code) {
    document.getElementById(code).classList.add('dark-mode-elements')
    filterBtn.classList.add('dark-mode-elements')
    searchBox.classList.add('dark-mode-noShadow')
    searchBoxOuter.classList.add('dark-mode-elements')
    body.classList.add('dark-mode-body')
    header.classList.add('dark-mode-elements')
    continentList.classList.add('dark-mode-elements')

    document.getElementById(code).classList.remove('light-mode-elements')
    filterBtn.classList.remove('light-mode-elements')
    searchBox.classList.remove('light-mode-noShadow')
    searchBoxOuter.classList.remove('light-mode-elements')
    body.classList.remove('light-mode-body')
    header.classList.remove('light-mode-elements')
    continentList.classList.remove('light-mode-elements')
}

function removeDarkElements(code) {
    document.getElementById(code).classList.add('light-mode-elements')
    filterBtn.classList.add('light-mode-elements')
    searchBox.classList.add('light-mode-noShadow')
    searchBoxOuter.classList.add('light-mode-elements')
    body.classList.add('light-mode-body')
    header.classList.add('light-mode-elements')
    continentList.classList.add('light-mode-elements')

    document.getElementById(code).classList.remove('dark-mode-elements')
    filterBtn.classList.remove('dark-mode-elements')
    searchBox.classList.remove('dark-mode-noShadow')
    searchBoxOuter.classList.remove('dark-mode-elements')
    body.classList.remove('dark-mode-body')
    header.classList.remove('dark-mode-elements')
    continentList.classList.remove('dark-mode-elements')
}