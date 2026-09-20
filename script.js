const input = document.getElementById("countryInput");
const btn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");

btn.addEventListener("click", searchCountry);
input.addEventListener("keypress", (e) => { if(e.key === "Enter") searchCountry(); });

async function searchCountry(){
    let name = input.value.trim().toLowerCase();
    if(!name){ alert("Please enter country name"); return; }
    resultDiv.innerHTML = "<p>Loading...</p>";
    try{
        // v2 API - 100% stable
        let res = await fetch(`https://restcountries.com/v2/name/${name}`);
        if(!res.ok) throw new Error("Not found");
        let data = await res.json();
        let c = data[0];
        
        resultDiv.innerHTML = `
            <div class="card" style="text-align:left; padding:20px; background:white; border-radius:10px; max-width:400px; margin:20px auto;">
                <img src="${c.flag}" width="150" style="border:1px solid #ccc">
                <h2>${c.name}</h2>
                <p><b>Capital:</b> ${c.capital}</p>
                <p><b>Region:</b> ${c.region}</p>
                <p><b>Population:</b> ${c.population.toLocaleString()}</p>
                <p><b>Currency:</b> ${c.currencies[0].name} (${c.currencies[0].symbol})</p>
                <p><b>Languages:</b> ${c.languages.map(l=>l.name).join(", ")}</p>
            </div>
        `;
    }catch(err){
        resultDiv.innerHTML = `<p style="color:red;">Country not found! Try Pakistan, India, Japan</p>`;
        console.log(err);
    }
}