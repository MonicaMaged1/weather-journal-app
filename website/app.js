/* Global Variables */
const apiKey = "&appid=8dc8c5a6749b423f3f2025a0ae311fd8&units=metric";
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

const generateBtn = document.getElementById("generate");
const zipText = document.getElementById("zip");
const feelingsText = document.getElementById("feelings");

//Event listener when user clicks on the "Generate" button
generateBtn.addEventListener("click", () => {
    //Allert user if they didn't enter a zip code
    if (zipText.value.length == 0) {
        alert('Please, enter a zip code.');
    }
    else {
        const zipCode = zipText.value;
        const feelings = feelingsText.value;
        getData(zipCode).then((data) => {
            postData('/addEntry', {
                temp: data.main.temp,
                date: newDate,
                userResponse: feelings
            })
        }).then(() => updateUI());
    }
});


//get weather data from API
const getData = async (zip) => {
    const res = await fetch(baseURL + zip + apiKey);
    try {
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log("error ", error);
    }
}

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },       
        body: JSON.stringify(data),
    })
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

const updateUI = async () => {
    const request = await fetch('/all',);
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = "Date: " + allData.date;
        document.getElementById('temp').innerHTML = "Temperature: " + allData.temp + "°C";
        document.getElementById('content').innerHTML = "Feelings: " + allData.userResponse;

    } catch (error) {
        console.log("error", error);
    }

}

