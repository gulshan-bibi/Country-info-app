const input = document.getElementById("countryInput");
const btn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");

btn.addEventListener("click", getCountry);
input.addEventListener("keypress", (e) => { if(e.key === "Enter") getCountry(); });

async function getCountry(){
    let countryName = input.value.trim();
    if(!countryName){ alert("Please enter country name"); return; }

    resultDiv.innerHTML = "<p>Loading...</p>";

    try{
        // Naya fix API link
        let res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if(!res.ok) throw new Error("Country not found");
        let data = await res.json();
        let country = data[0];

        let currency = Object.values(country.currencies || {})[0];
        let currencyText = currency ? `${currency.name} (${currency.symbol || ''})` : "N/A";

        resultDiv.innerHTML = `
            <div class="card">
                <img src="${country.flags.svg}" class="flag">
                <h2>${country.name.common}</h2>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Currency:</strong> ${currencyText}</p>
                <p><strong>Languages:</strong> ${Object.values(country.languages || {}).join(", ")}</p>
            </div>
        `;
    } catch(err){
        resultDiv.innerHTML = `<p style="color:red;">Country not found! Try correct spelling.</p>`;
        console.log(err);
    }
}