/* Global Variables */
const apiKey = '8dc8c5a6749b423f3f2025a0ae311fd8';
let zipCode = '';
let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "&appid=" + apiKey;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const generateBtn = document.getElementById("generate");

const zipTxt = document.getElementById("zip");

generateBtn.addEventListener("click", ()=>{
    console.log('clicked');
    if(zipTxt.value.length == 0){
        alert('Please, enter a zip code.');
    }
    else{
        zipCode = zipTxt.value;
        baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "&appid=" + apiKey;
        console.log(baseURL);
        getData();
    }
});


//get weather data from API

const getData = async ()=>{
    const res = await fetch(baseURL);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.log("error ", error);
    }
}