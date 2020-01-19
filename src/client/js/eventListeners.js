import { json } from "body-parser";


const baseUrl = 'http://localhost:3000';
const handleSubmit = async function(event){
    const departingDate = document.getElementById("departing-date").value;
    const returningDate = document.getElementById("returning-date").value;
    const cityName = document.getElementById("travel-to-city").value;
    const url = `${baseUrl}?city=${cityName}&date=${departingDate}`;

    const clientData = {
      departingDate,
      returningDate,
      cityName
    }

    const postData = async (url= "", data={}) => { 
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      return await result.json()
    }
    postData("http://localhost:3000/test", clientData).then(myData => {
          console.log(myData.photoURL);
          console.log(myData.location);
          updateUI(myData);
    })
}


const updateUI = async function(trip){
  const innerHtml = document.getElementById("trip-results-container").innerHTML;
  document.getElementById("trip-results-container").innerHTML = innerHtml + createTripCard(trip);
  
}

const createTripCard = function (trip){
  const cardHtml =`<div class="card">
        <img src="${trip.photoURL}" id="destination-image" width="300" height="300">
        <div id="destination-info">
          <p>${trip.location}</p>
          <p>Lat: ${trip.cityLat} Lng: ${trip.cityLng}</p>
          <p>Temperature: ${trip.weather}</p>
          <p>Departing Date: ${trip.departDate}</p>
          <p>You have ${trip.daysToGo} days to go</p>
        </div>
      </div>`
  return cardHtml;
}

export {updateUI,handleSubmit};