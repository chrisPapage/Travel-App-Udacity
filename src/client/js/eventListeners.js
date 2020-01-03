

const baseUrl = 'http://localhost:3000';
const handleSubmit = async function(event){
    const departingDate = document.getElementById("new-travel-date").value;
    const cityName = document.getElementById("travel-to-city").value;
    const url = `${baseUrl}?city=${cityName}&date=${departingDate}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
    });
    const tripResult = await response.json();
    updateUI(tripResult);
}
export {handleSubmit};

const updateUI = async function(trip){
  document.getElementById("next-trip-holder").innerHTML = JSON.stringify(trip);
  document.getElementById("trip-image").setAttribute('src', trip.photoURL);
}
