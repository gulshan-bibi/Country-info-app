const input = document.getElementById("countryInput");
const btn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");

btn.addEventListener("click", searchCountry);
input.addEventListener("keypress", (e) => { if(e.key === "Enter") searchCountry(); });

async function searchCountry(){
    let name = input.value.trim();
    if(!name){ alert("Please enter country name"); return; }
    resultDiv.innerHTML = "<p>Loading...</p>";
    try{
        // 100% working API with fields
        let url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,region,population,flags,currencies,languages`;
        let res = await fetch(url);
        if(!res.ok) throw new Error("Not found");
        let data = await res.json();
        let c = data[0];
        let curr = Object.values(c.currencies || {})[0];
        let currText = curr ? `${curr.name} ${curr.symbol || ''}` : "N/A";
        
        resultDiv.innerHTML = `
            <div class="card">
                <img src="${c.flags.svg}" width="150">
                <h2>${c.name.common}</h2>
                <p><b>Capital:</b> ${c.capital ? c.capital[0] : "N/A"}</p>
                <p><b>Region:</b> ${c.region}</p>
                <p><b>Population:</b> ${c.population.toLocaleString()}</p>
                <p><b>Currency:</b> ${currText}</p>
                <p><b>Languages:</b> ${Object.values(c.languages || {}).join(", ")}</p>
            </div>
        `;
    }catch(err){
        resultDiv.innerHTML = `<p style="color:red;">Country not found! Try Pakistan, India, Japan</p>`;
    }
}