let singleCountryData

const getCountry = (alpha) => {

    const countryFlag = document.getElementById('country-flag')
    
    fetch(`https://restcountries.com/v2/alpha/${alpha}`)
        .then(res => res.json())
        .then(data => {
            singleCountryData = data
            console.log(data.currencies[0].name)

            countryFlag.innerHTML = 
            
            `
                
                <img src="${singleCountryData.flags.svg}" class="country-flag-img"/>

                <section class="section-1">
                    <h2 class="country-h2">Some Country</h2>

                    <div class="info" id="country-info-name ">
                        <h4>Native Name: </h4>
                        <p>${singleCountryData.nativeName}</p>
                    </div>
                        
                    <div class="info" id="country-info-population ">
                        <h4>population: </h4>
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
                        <h4>capital: </h4>
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
                

            `

            singleCountryData.currencies.forEach(currency => {
                document.getElementById("currencies").textContent += currency.length > 1 ? `${currency.name}, ` : `${currency.name}`
                
             })

             singleCountryData.languages.forEach(language => {
                document.getElementById("languages").textContent += language.length > 1 ? `${language.name}, ` : `${language.name}`
                
             })
        }
        )

}

getCountry('BEL')


export default getCountry