let input = document.querySelector('input');
let now = document.querySelector('.now');
let info = document.querySelector('.info');
let details = document.querySelector('.details');
let moreInfo = document.querySelector('.moreInfo');
let forecast = document.querySelector('.dforecast');
let currentData;
let forecastData;
let responseC;
let responseF;
let loc = undefined;


 function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('geolocation is not supported');
    }
 }


async function getInfo(i){
    //fetching the current.json with the parameter of user input (city) and saved to response
    responseC = await fetch('https://api.weatherapi.com/v1/current.json?' + new URLSearchParams({
        key: 'd2a5c92c57bd4b5e98694019220601',
        q: i
    }));
    console.log('this is current data');
    //the current.json with the (input.value) parameter
    currentData= await responseC.json();
    console.log(responseC.status);
    console.log(currentData);
    let current = currentData.current;
    let location = currentData.location;
    
 
    // now
    now.children[0].src = current.condition.icon.replace('//', 'https://');
    now.children[2].innerHTML = current.condition.text;
    //info 1.city 2.country 3.temperature
    info.children[0].children[0].innerHTML = location.name;
    info.children[0].children[2].innerHTML = location.country;
    info.children[1].children[0].innerHTML = current.temp_c +'°';
    //details 1.wind 2.realfeel 3.humidity
    details.children[0].children[1].innerHTML = `${current.wind_dir} ${current.wind_kph}Km/h`;
    details.children[1].children[1].innerHTML = `${current.feelslike_c}°C`
    details.children[2].children[1].innerHTML = `${current.humidity}%`;
    //more info 1.UV 2.pressure 3.Cloud 4.Time Zone 5. Local Time
    moreInfo.children[1].children[0].children[1].innerHTML = current.uv;
    moreInfo.children[1].children[1].children[1].innerHTML = `${current.pressure_mb}Mbar`;
    moreInfo.children[1].children[2].children[1].innerHTML =  current.cloud;
    moreInfo.children[2].children[0].children[1].innerHTML = location.tz_id;
    moreInfo.children[2].children[1].children[1].innerText = location.localtime;
    
    
    //forecast fetching 
    //fetching the forecast.json with the parameter of user input (city) and saved to response
    responseF = await fetch('https://api.weatherapi.com/v1/forecast.json?' + new URLSearchParams({
        key: 'd2a5c92c57bd4b5e98694019220601',
        q: i,
        days:10,
    }));
    
    forecastData = await responseF.json();
    console.log('this is forecast data');
    //request status
    console.log(responseF.status);
    //request content
    console.log(forecastData);
    
    let fcast = forecastData.forecast.forecastday;
    console.log(fcast);
    //day 1, 2 and 3
    for(i =0, j=2;j<7, i<3; i++, j+=2){
        forecast.children[j-1].children[0].src = fcast[i].day.condition.icon.replace('//', 'https://');
        forecast.children[j-1].children[1].innerHTML = fcast[i].date;
        forecast.children[j].children[0].innerHTML = `${fcast[i].day.avgtemp_c}°C`;
        forecast.children[j].children[2].innerHTML = fcast[i].day.condition.text;
    }
    
    
}


getInfo('Tangier')








