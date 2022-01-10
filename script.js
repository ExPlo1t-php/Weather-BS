let input = document.querySelector('input');
let data;
let response;

async function getInfo(){
    //fetching the current.json with the parameter of user input (city) and saved to response
     response = await fetch('https://api.weatherapi.com/v1/current.json?' + new URLSearchParams({
        key: 'd2a5c92c57bd4b5e98694019220601',
        q: input.value,
    }));
    //the current.json with the (input.value) parameter
    data = await response.json();
    console.log(response.status);
    //adding a condition to display an error in case response = {400 / 500}
    console.log(data);
    let current = data.current;
    let location = data.location;
    console.log(current.condition.text);
    }



