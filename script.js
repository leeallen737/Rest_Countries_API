

const filterBtn = document.getElementById('filter-btn')

filterBtn.addEventListener('click', () => {

    document.getElementById('continent-list').classList.toggle('hidden')

})


let countriesData

fetch('https://restcountries.com/v2/all')
    .then(res => res.json())
    .then(data => {

        countriesData = data

        data.map((country) => {
            renderHTML(country)
        })


    })


// Use Search Filter Function

function searchFilterCountry() {

    const searchBox = document.getElementById('search-box')
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

function renderHTML(country) {

    return document.getElementById('flag-container').innerHTML += `
    
    <div class="country-container  box-styles" id="${country.alpha3Code}" onClick="getCountry(${country.alpha3Code})">

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

}

// Data for single country page



// getCountry('bel')


// const countryFlag = document.getElementById('country-flag')



// console.log(singleCountryData)

// flag.innerHTML = `
// <p>hello</p>
// // <img src="${singleCountryData.flags.svg}" class="flag" id="flag"/>
// `