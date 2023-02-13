const filterBtn = document.getElementById('filter-btn')

filterBtn.addEventListener('click', () => {

    document.getElementById('continent-list').classList.toggle('hidden')

})

fetch('https://restcountries.com/v2/all')
    .then(res => res.json())
    .then(data => {
        
        // console.log(data)

        data.map((country) => {
            document.getElementById('flag-container').innerHTML += `
        
                <div class="flag-container box-styles">

                    <div class="flag">
                    <img src="${country.flag}" alt="" srcset="">
                    </div>

                    <span id="country-info">
                        <h2 class="country-name"><span>${country.name}<span></h2>
                        <p class="population"><span>Population:</span> ${country.population}</p>
                        <p class="region"><span>Region:</span> ${country.area}</p>
                        <p class="capital"><span>Capital:</span> ${country.capital}</p>
                    </span>

                </div>

        `
        })

        
    
    })

