/* Global Variables */
const apiKey = '&appid=8dc8c5a6749b423f3f2025a0ae311fd8';
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const generateBtn = document.getElementById("generate");
const zipText = document.getElementById("zip");
const feelingsText = document.getElementById("feelings");

//Event listener when user clicks on the "Generate" button
generateBtn.addEventListener("click", () => {
    console.log('clicked');
    if (zipText.value.length == 0) {
        alert('Please, enter a zip code.');
    }
    else {
        const zipCode = zipText.value;
        const feelings = feelingsText.value;
        console.log(baseURL);
        getData(zipCode).then((data) => {
            postData('/addEntry', {
                temp: data.main.temp,
                date: newDate,
                userResponse: feelings
            })
        }).then(updateUI());
    }
});


//get weather data from API
const getData = async (zip) => {
    const res = await fetch(baseURL + zip + apiKey);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log("error ", error);
    }
}

const postData = async (url = '', data = {}) => {
    console.log("post data");
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    })
    try {
        console.log("inside try");
        const newData = await response.json();
        console.log("newData");
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

const updateUI = async ()=>{
    const request = await fetch('/all');
  try{
    const allData = await request.json();
    console.log("allData");
    console.log(allData);
    document.getElementById('date').innerHTML = allData[allData.length - 1].date;
    document.getElementById('temp').innerHTML = allData[allData.length - 1].temp;
    document.getElementById('content').innerHTML = allData[allData.length - 1].userResponse;

  }catch(error){
    console.log("error", error);
  }

}

