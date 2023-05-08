

const body = document.getElementById('body')
const filterBtn = document.getElementById('filter-btn')
const header = document.getElementById('header')
const darkLightModeBtn = document.getElementById('dark-light-mode')
const continentList = document.getElementById('continent-list')
// // 
let darkModeOn = '' 
localStorage.getItem('darkModeOn') == 'true' ? darkModeOn = true : darkModeOn = false
console.log(localStorage.getItem('darkModeOn'), 'storage')
console.log(darkModeOn, 'boolean')


let countryAlpha = ''

function openCountryPage(alpha) {
    console.log(alpha.id)
    // window.open("country.html")
    getCountry(alpha.id)
}

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
searchBox.addEventListener('click', function () {
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

newArray.forEach(function (el) {
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

    if (darkModeOn) {
        document.getElementById('loading').classList.add('light-img')
        document.getElementById('loading').classList.remove('dark-img')
    } else {
        document.getElementById('loading').classList.add('dark-img')
        document.getElementById('loading').classList.remove('light-img')
    }

    setTimeout(function () {
        document.getElementById('loading').style.display = "none"
    }, delay)
}

loading(10000)

function renderHTML(country) {


    countryContainer = document.getElementById('country-container')
    document.getElementById('flag-container').innerHTML += `
    
    <div class="country-container box-styles" id="${country.alpha3Code}" onClick="openCountryPage(${country.alpha3Code})">

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

    if(darkModeOn) {
        localStorage.setItem('darkModeOn', true)
    }else {
        localStorage.setItem('darkModeOn', false)
    }

    let flagContainer = document.getElementById('flag-container')
    const newFlagContainer = Array.from(flagContainer.children)

    newFlagContainer.map(function (country) {
        if (darkModeOn) {
            darkLightModeBtn.textContent = 'Light Mode'
            if (country.id) {
                addDarkElements(country.id)
            }

        }

        if (darkModeOn === false) {
            darkLightModeBtn.textContent = 'Dark Mode'
            if (country.id) {
                removeDarkElements(country.id)
            }
        }
    })

    let borderCountries = document.getElementById('border-countries')
    const newborderCountries = Array.from(borderCountries.children)

    newborderCountries.map(function (country) {
        if (darkModeOn) {
            darkLightModeBtn.textContent = 'Light Mode'
            if (country.id) {
                addDarkElements(country.id)
            }

        }

        if (darkModeOn === false) {
            darkLightModeBtn.textContent = 'Dark Mode'
            if (country.id) {
                removeDarkElements(country.id)
            }
        }
    })
}

function ifDarkModeOn(alpha) {
    if (darkModeOn) {
        if (alpha) {
            addDarkElements(alpha)
        }

    }

    if (!darkModeOn) {
        if (alpha) {
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

    document.getElementById('back-btn').classList.add('dark-mode-elements')

    document.getElementById(code).classList.remove('light-mode-elements')
    filterBtn.classList.remove('light-mode-elements')
    searchBox.classList.remove('light-mode-noShadow')
    searchBoxOuter.classList.remove('light-mode-elements')
    body.classList.remove('light-mode-body')
    header.classList.remove('light-mode-elements')
    continentList.classList.remove('light-mode-elements')

    document.getElementById('back-btn').classList.remove('light-mode-elements')
}

function removeDarkElements(code) {
    document.getElementById(code).classList.add('light-mode-elements')
    filterBtn.classList.add('light-mode-elements')
    searchBox.classList.add('light-mode-noShadow')
    searchBoxOuter.classList.add('light-mode-elements')
    body.classList.add('light-mode-body')
    header.classList.add('light-mode-elements')
    continentList.classList.add('light-mode-elements')

    document.getElementById('back-btn').classList.add('light-mode-elements')
    

    document.getElementById(code).classList.remove('dark-mode-elements')
    filterBtn.classList.remove('dark-mode-elements')
    searchBox.classList.remove('dark-mode-noShadow')
    searchBoxOuter.classList.remove('dark-mode-elements')
    body.classList.remove('dark-mode-body')
    header.classList.remove('dark-mode-elements')
    continentList.classList.remove('dark-mode-elements')

    document.getElementById('back-btn').classList.remove('dark-mode-elements')
}

// Single Country Page

let singleCountryData

const getCountry = (alpha) => {
    
    const countryFlag = document.getElementById('country-flag')
    const country = document.getElementById('country')
    const countries = document.getElementById('countries')
    
    country.classList.toggle('hide')
    countries.classList.toggle('hide')

    fetch(`https://restcountries.com/v2/alpha/${alpha}`)
        .then(res => res.json())
        .then(data => {
            singleCountryData = data

            countryFlag.innerHTML =

                `
                
                <img src="${singleCountryData.flags.svg}" class="country-flag-img"/>


                <div class="section-wrapper" id="section-wrapper">
                    <div class="info-wrapper">
                        <section class="section-1">
                            <h2 class="country-h2">${singleCountryData.name}</h2>

                            <div class="info" id="country-info-name ">
                                <h4>Native Name: </h4>
                                <p>${singleCountryData.nativeName}</p>
                            </div>
                                
                            <div class="info" id="country-info-population ">
                                <h4>Population: </h4>
                                <p>${singleCountryData.population}</p>
                            </div>

                            <div class="info" id="country-info-region ">
                                <h4>Region: </h4>
                                <p>${singleCountryData.region}</p>
                            </div>

                            <div class="info" id="country-info-sub-region">
                                <h4>Sub-Region: </h4>
                                <p>${singleCountryData.subregion}</p>
                            </div>

                            <div class="info" id="country-info-capital ">
                                <h4>Capital: </h4>
                                <p>${singleCountryData.capital}</p>
                            </div>
                        </section>

                        <section class="section-2">

                            <div class="info" id="country-info-tld ">
                                <h4>Top Level Domain: </h4>
                                <p>${singleCountryData.topLevelDomain}</p>
                            </div>
                                    
                            <div class="info" id="country-info-currencies ">
                                <h4>Currencies: </h4>
                                <p id="currencies"></p>
                            </div>

                            <div class="info" id="country-info-languages ">
                                <h4>Languages: </h4>
                                <p id="languages"></p>
                            </div>
                        </section>
                    </div>
                    
                    <section class="section-3" id="section-3">
                    
                        <h3>Border Countries:</h3>

                        <div class="border-countries" id="border-countries"></div>
                    
                    </section>
                </div>

            `

            singleCountryData.currencies.forEach(currency => {

                document.getElementById("currencies").textContent += currency.length > 1 ? `${currency.name}, ` : `${currency.name}`

            })
            console.log(singleCountryData)
            //convert to function later
            const currencies = document.getElementById("languages")
            let currenciesText = ''

            singleCountryData.currencies.forEach(currency => {

                currenciesText += `${currency.name}, `

            })

            currenciesText = currenciesText.slice(0, currenciesText.length - 2);
            currencies.textContent = currenciesText

            //convert to function later
            const languages = document.getElementById("languages")
            let languagesText = ''

            singleCountryData.languages.forEach(language => {

                languagesText += `${language.name}, `

            })

            languagesText = languagesText.slice(0, languagesText.length - 2);
            languages.textContent = languagesText

            let borderingCountry = document.getElementById('border-countries')
            
            singleCountryData.borders.forEach(borderCountry => {

                

                fetch(`https://restcountries.com/v2/alpha/${borderCountry}`)
                .then(res => res.json())
                .then(data => {
                    
                    borderingCountry.innerHTML += `<p id="${data.name}" class="box-styles ${darkModeOn ? 'dark-mode-elements' : 'light-mode-elements'}">${data.name}</p>`
                })

            })

            
        }
        )

}