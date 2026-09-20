const input = document.getElementById("countryInput");
const btn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");

const localData = {
  pakistan: { name: "Pakistan", capital: "Islamabad", region: "Asia", population: "220,892,340", currency: "Pakistani Rupee", language: "Urdu, English", flag: "https://flagcdn.com/w320/pk.png" },
  india: { name: "India", capital: "New Delhi", region: "Asia", population: "1,380,004,385", currency: "Indian Rupee", language: "Hindi, English", flag: "https://flagcdn.com/w320/in.png" },
  japan: { name: "Japan", capital: "Tokyo", region: "Asia", population: "125,836,021", currency: "Japanese Yen", language: "Japanese", flag: "https://flagcdn.com/w320/jp.png" },
  turkey: { name: "Turkey", capital: "Ankara", region: "Asia", population: "84,339,067", currency: "Turkish Lira", language: "Turkish", flag: "https://flagcdn.com/w320/tr.png" },
  usa: { name: "United States", capital: "Washington, D.C.", region: "Americas", population: "329,484,123", currency: "US Dollar", language: "English", flag: "https://flagcdn.com/w320/us.png" },
  uk: { name: "United Kingdom", capital: "London", region: "Europe", population: "67,886,011", currency: "British Pound", language: "English", flag: "https://flagcdn.com/w320/gb.png" },
  germany: { name: "Germany", capital: "Berlin", region: "Europe", population: "83,783,942", currency: "Euro", language: "German", flag: "https://flagcdn.com/w320/de.png" }
};

btn.addEventListener("click", searchCountry);
input.addEventListener("keypress", (e) => { if(e.key === "Enter") searchCountry(); });

async function searchCountry(){
    let name = input.value.trim().toLowerCase();
    if(!name){ alert("Please enter country name"); return; }
    resultDiv.innerHTML = "<p>Loading...</p>";

    // Pehle local data check karo
    if(localData[name]){
        let c = localData[name];
        showCard(c);
        return;
    }
    // Agar local me na ho to API try karo
    try{
        let res = await fetch(`https://restcountries.com/v2/name/${name}`);
        let data = await res.json();
        let c = data[0];
        let obj = { name: c.name, capital: c.capital, region: c.region, population: c.population.toLocaleString(), currency: c.currencies[0].name, language: c.languages.map(l=>l.name).join(", "), flag: c.flag };
        showCard(obj);
    }catch(err){
        resultDiv.innerHTML = `<p style="color:red;">Country not found! Try Pakistan, India, Japan, USA, UK, Turkey</p>`;
    }
}
function showCard(c){
    resultDiv.innerHTML = `
        <div style="text-align:left; padding:20px; background:white; border-radius:10px; max-width:400px; margin:20px auto; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
            <img src="${c.flag}" width="150" style="border:1px solid #ccc"><h2>${c.name}</h2>
            <p><b>Capital:</b> ${c.capital}</p><p><b>Region:</b> ${c.region}</p>
            <p><b>Population:</b> ${c.population}</p><p><b>Currency:</b> ${c.currency}</p>
            <p><b>Language:</b> ${c.language}</p>
        </div>`;
}