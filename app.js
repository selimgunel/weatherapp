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



// Eventler 

//select list değiştiği zaman çalışacak event
select.addEventListener("change", getCity);

//önümüzdeki günlerin hava tahmini için click eventi
follow.addEventListener("click", getFollowingDays);


function getCity(e) {
    // Select list'de değişim olduğunda çalışacak fonksiyon

    if (select.options[select.selectedIndex].value == "barcelona"
        || "amsterdam" || "brugge" || "stockholm" || "prague") {

        getBarcelona(select.options[select.selectedIndex].value);
    }

}

function getBarcelona(cityname) {
    
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

    temp.setAttribute('style','font-size: 100px;');
    

    if (select.options[select.selectedIndex].value == "barcelona") {
        
        let api = `${url}forecast?lat=41.38&lon=2.17&appid=${key}&units=metric`;
        fetch(api)
            .then(data => {
                return data.json();
            })
            .then(followingBarcelona);
            
    }

    if (select.options[select.selectedIndex].value == "amsterdam") {
        
        let api = `${url}forecast?lat=52.37&lon=4.89&appid=${key}&units=metric`;
        fetch(api)
            .then(data => {
                return data.json();
            })
            .then(followingAmsterdam);
            
    }
    if (select.options[select.selectedIndex].value == "brugge") {
        
        let api = `${url}forecast?lat=51.20&lon=3.22&appid=${key}&units=metric`;
        fetch(api)
            .then(data => {
                return data.json();
            })
            .then(followingBrugge);
            
    }
    if (select.options[select.selectedIndex].value == "stockholm") {
        
        let api = `${url}forecast?lat=51.20&lon=3.22&appid=${key}&units=metric`;
        fetch(api)
            .then(data => {
                return data.json();
            })
            .then(followingStockholm);
            
    }
    if (select.options[select.selectedIndex].value == "stockholm") {
        
        let api = `${url}forecast?lat=59.32&lon=18.07&appid=${key}&units=metric`;
        fetch(api)
            .then(data => {
                return data.json();
            })
            .then(followingStockholm);
            
    }
    if (select.options[select.selectedIndex].value == "prague") {
        
        let api = `${url}forecast?lat=50.08&lon=14.42&appid=${key}&units=metric`;
        fetch(api)
            .then(data => {
                return data.json();
            })
            .then(followingPrague);
            
    }

}

function followingBarcelona(nextdays){
    // Barcelona şehri için önümüzdeki günlerdeki hava tahmininin html elementlerine yazdırılması

    console.log(nextdays);

    follow.textContent = "";
    wind.textContent = "";

    temp.textContent = "Tomorrow " + Math.round(nextdays.list[0].main.temp) + " °C";
    temp.setAttribute('style','font-size: 50px;');

    desc.textContent = "The day after tomorrow " + Math.round(nextdays.list[1].main.temp) + " °C";
    temp.setAttribute('style','font-size: 35px;');
}

function followingAmsterdam(nextdays){
    // Amsterdam şehri için önümüzdeki günlerdeki hava tahmininin html elementlerine yazdırılması

    follow.textContent = "";
    wind.textContent = "";

    temp.textContent = "Tomorrow " + Math.round(nextdays.list[0].main.temp) + " °C";
    temp.setAttribute('style','font-size: 50px;');

    desc.textContent = "The day after tomorrow " + Math.round(nextdays.list[1].main.temp) + " °C";
    temp.setAttribute('style','font-size: 35px;');
}

function followingBrugge(nextdays){
    // Brugge şehri için önümüzdeki günlerdeki hava tahmininin html elementlerine yazdırılması

    follow.textContent = "";
    wind.textContent = "";

    temp.textContent = "Tomorrow " + Math.round(nextdays.list[0].main.temp) + " °C";
    temp.setAttribute('style','font-size: 50px;');

    desc.textContent = "The day after tomorrow " + Math.round(nextdays.list[1].main.temp) + " °C";
    temp.setAttribute('style','font-size: 35px;');
}

function followingStockholm(nextdays){
    // Stockholm şehri için önümüzdeki günlerdeki hava tahmininin html elementlerine yazdırılması

    follow.textContent = "";
    wind.textContent = "";

    temp.textContent = "Tomorrow " + Math.round(nextdays.list[0].main.temp) + " °C";
    temp.setAttribute('style','font-size: 50px;');

    desc.textContent = "The day after tomorrow " + Math.round(nextdays.list[1].main.temp) + " °C";
    temp.setAttribute('style','font-size: 35px;');
}
function followingPrague(nextdays){
    // Prag şehri için önümüzdeki günlerdeki hava tahmininin html elementlerine yazdırılması

    follow.textContent = "";
    wind.textContent = "";

    temp.textContent = "Tomorrow " + Math.round(nextdays.list[0].main.temp) + " °C";
    temp.setAttribute('style','font-size: 50px;');

    desc.textContent = "The day after tomorrow " + Math.round(nextdays.list[1].main.temp) + " °C";
    temp.setAttribute('style','font-size: 35px;');
}