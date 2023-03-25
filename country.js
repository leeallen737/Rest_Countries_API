

let singleCountryData

const getCountry = (alpha) => {
    
    const countryFlag = document.getElementById('country-flag')

    fetch(`https://restcountries.com/v2/alpha/${alpha}`)
        .then(res => res.json())
        .then(data => {
            singleCountryData = data

            countryFlag.innerHTML =

                `
                
                <img src="${singleCountryData.flags.svg}" class="country-flag-img"/>


                <div class="section-wrapper">
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
                    
                    borderingCountry.innerHTML += `<p class="box-styles">${data.name}</p>`
                })
            })

            
        }
        )

}



getCountry('LUX')

