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
const today = document.querySelector(".today");
const tomorrow = document.querySelector(".following");
const tomorrowtemp = document.querySelector(".tomorrow");
const othertomorrowtemp = document.querySelector(".othertomorrow");
const followingcity = document.querySelector(".city2");
const back = document.querySelector(".back");
const firstbuton = document.querySelector("#butontoday");

const coordinates = {
    barcelona : {lat : 41.38, lon : 2.17},
    amsterdam : {lat : 52.37, lon : 4.89},
    brugge : {lat : 51.20, lon : 3.22},
    stockholm : {lat : 59.32, lon : 18.07},
    prague : {lat : 50.08, lon: 14.42}
    
}

tomorrow.style.display = "none";
firstbuton.style.display = "none";


// Eventler

//select list değiştiği zaman çalışacak event
select.addEventListener("change", getCity);

//önümüzdeki günlerin hava tahmini için click eventi
follow.addEventListener("click", getFollowingDays);

//back tuşuna basıldığında önceki sayfayı yükleyecek event
back.addEventListener("click",getCity);

addEventListener("DOMContentLoaded",getCity);


function getCity(e) {
    // Select list'de değişim olduğunda çalışacak fonksiyon

    if (select.options[select.selectedIndex].value == "barcelona"
        || "amsterdam" || "brugge" || "stockholm" || "prague") {

        getInfo(select.options[select.selectedIndex].value);
    }

    today.style.display = "block";
    tomorrow.style.display = "none";
    firstbuton.style.display = "block";

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

}

function info(apikey) {

    // Api'den gelen bilgilerin html elementlerine yazdırılması
    
    city.textContent = `${apikey.name}, ${apikey.sys.country}`;
    
    temp.textContent = Math.round(`${apikey.main.temp}`) + " °C";

    desc.textContent = `${apikey.weather[0].description}`;

    wind.textContent = "wind: " + Math.round(`${apikey.wind.speed}`) + " km/h";
}

function getFollowingDays(e) {

    // önümüzdeki günlerdeki hava tahmini için şehir sorgulanmasının yapılması 
    // ve api'den data isteğini gerçekleştiren fonksiyon

    stateChange();

    const selectedCity = select.options[select.selectedIndex].value;

    const lat = coordinates[selectedCity].lat;

    const lon = coordinates[selectedCity].lon;
    
    const api = `${url}forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;

    fetch(api)
    .then(data => {
        return data.json()
    })
    .then(followingInfo);
}

function followingInfo (nextdays) {
    
    tomorrowtemp.textContent = "Tomorrow " + Math.round(nextdays.list[0].main.temp) + " °C";
    
    othertomorrowtemp.textContent = "The day after tomorrow " + Math.round(nextdays.list[1].main.temp) + " °C";
   
}


function stateChange(){
    state = "tomorrow";

    if(state === "tomorrow"){
        tomorrow.style.display = "block";
        today.style.display = "none";
        
        
    }else{
        tomorrow.style.display = "none";
        today.style.display = "block";
        
    }
}