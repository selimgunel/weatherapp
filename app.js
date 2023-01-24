// Sayfa elementlerinin seçimi, api ve url 

const url = "https://api.openweathermap.org/data/2.5/";
const key = "8621bb96ebe530a02a52e42726465f90";
const select = document.getElementById("select");
const body = document.getElementById("body");
const follow = document.querySelector(".follow");
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const desc = document.querySelector('.description');
const wind = document.querySelector('.wind');
const barcelona = {lat : 41.38, lon : 2.17}
const amsterdam = {lat : 52.37, lon : 4.89}
const brugge = {lat : 51.20, lon : 3.22}
const stockholm = {lat : 59.32, lon : 18.07}
const prague = {lat : 50.08, lon: 14.42}



// Eventler 

//select list değiştiği zaman çalışacak event
select.addEventListener("change", getCity);

//önümüzdeki günlerin hava tahmini için click eventi
follow.addEventListener("click", getFollowingDays);


function getCity(e) {
    // Select list'de değişim olduğunda çalışacak fonksiyon

    if (select.options[select.selectedIndex].value == "barcelona"
        || "amsterdam" || "brugge" || "stockholm" || "prague") {

        getInfo(select.options[select.selectedIndex].value);
    }

}

function getInfo(cityname) {
    
    // Seçilen şehre göre arkaplan değişimi ve api'den bilgilerin getirilmesini sağlayan fonksiyon

    body.style.backgroundImage = `url('${cityname}.jpg')`;

    let api = `${url}weather?q=${cityname}&appid=${key}&units=metric`
    fetch(api)
        .then(data => {
            return data.json();
        })
        .then(info);
    
    follow.textContent = "Click here for following days";
    
    

}

function info(apikey) {

    // Api'den gelen bilgilerin html elementlerine yazdırılması
    
    city.textContent = `${apikey.name}, ${apikey.sys.country}`;
    
    temp.textContent = Math.round(`${apikey.main.temp}`) + " °C";

    desc.textContent = `${apikey.weather[0].description}`;

    wind.textContent = "Wind: " + Math.round(`${apikey.wind.speed}`) + " km/h";
}

function getFollowingDays(e) {

    // önümüzdeki günlerdeki hava tahmini için şehir sorgulanmasının yapılması 
    // ve api'den data isteğini gerçekleştiren fonksiyon

    

    const selectedCity = select.options[select.selectedIndex].value;
    

    const barcelonalat = barcelona.lat;
    const barcelonalon = barcelona.lon;
    const amsterdamlat = amsterdam.lat;
    const amsterdamlon = amsterdam.lon;
    const bruggelat = brugge.lat;
    const bruggelon = brugge.lon;
    const stockholmlat = stockholm.lat;
    const stockholmlon = stockholm.lon;
    const praguelat = prague.lat;
    const praguelon = prague.lon;

    const lat = (selectedCity === "barcelona") ? barcelonalat : null ||
     (selectedCity === "amsterdam") ? amsterdamlat : null ||
     (selectedCity === "brugge") ? bruggelat : null ||
     (selectedCity === "stockholm") ? stockholmlat : null ||
     (selectedCity === "prague") ? praguelat : null;

    const lon = (selectedCity === "barcelona") ? barcelonalon : null ||
    (selectedCity === "amsterdam") ? amsterdamlon : null ||
    (selectedCity === "brugge") ? bruggelon : null ||
    (selectedCity === "stockholm") ? stockholmlon : null ||
    (selectedCity === "prague") ? praguelon : null;;

    const api = `${url}forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;

    fetch(api)
    .then(data => {
        return data.json()
    })
    .then(followingInfo);


    temp.setAttribute('style','font-size: 100px;');

}

function followingInfo (nextdays) {
    desc.textContent = "Tomorrow " + Math.round(nextdays.list[0].main.temp) + " °C";
    desc.setAttribute('style','font-size: 32px;');

    wind.textContent = "The day after tomorrow " + Math.round(nextdays.list[1].main.temp) + " °C";
    wind.setAttribute('style','font-size: 28px;');

    follow.textContent = "";
    temp.textContent = "";
}