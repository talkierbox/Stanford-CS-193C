const apiKey = "450f95823b5845728035aecaa946c235";

let isFirstClick = true;

// This does not use jQuery! This is my helper function inside of hr-scripts.js!
$(`#btn-clear`).addEventListener("click", () => {
    $(`#inputBox`).value = "";
});

// This does not use jQuery! This is my helper function inside of hr-scripts.js!
$(`#btn-getWeather`).addEventListener("click", () => {
    if(isFirstClick) {
        $(`textarea`).innerHTML = ``;
        isFirstClick = false;
    }
    
    let zipToLookup = $(`#inputBox`).value;
    let lookupStr = `https://api.openweathermap.org/data/2.5/weather?zip=${parseInt(zipToLookup)},us&units=imperial&APPID=${apiKey}`;
    fetch(lookupStr).then((response) => response.json()).then((data) => {
        log(data);
        $(`textarea`).innerHTML += `${data.name}: ${data.main.temp}\n`;
    });
});