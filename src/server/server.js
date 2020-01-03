const dotenv = require("dotenv");
dotenv.config();

var async  = require('express-async-await')
var fetch = require('node-fetch')
// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var path = require("path");

const geoNamesApiBaseUrl = `http://api.geonames.org/search?lang=en&username=${process.env.geonamesUserName}&type=json&name=`;
const pixabayApiBaseUrl = `https://pixabay.com/api/?key=${process.env.pixabayApiKey}&image_type=photo&q=`;
const darkSkyApiBaseUrl = `https://api.darksky.net/forecast/${process.env.darkSkyApiKey}`;

// Start up an instance of app
const app = express();
const distPath = path.join(__dirname, "..//..//dist");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static(distPath));

// Setup Server
const port = 3000;
const server = app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});

app.get('/', async (req, res) => {
    
    const geonamesUrl = `${geoNamesApiBaseUrl}${req.query.city}`;
    
    const geonamesResponse = await fetch(geonamesUrl, {
        method: "GET",
        headers: {
        "Content-Type": "application/json"}
    });
    const geonamesResult = await geonamesResponse.json();
    const firstGeonameCity = geonamesResult.geonames[0];
    console.log(firstGeonameCity);

    const darkSkyUrl = `${darkSkyApiBaseUrl}/${firstGeonameCity.lat},${firstGeonameCity.lng}`;
    const darkSkyResponse = await fetch(darkSkyUrl, {
        method: "GET",
        headers: {
        "Content-Type": "application/json"}
    });
    const darkSkyResult = await darkSkyResponse.json();
    console.log(darkSkyResult);

    const pixabayUrl = `${pixabayApiBaseUrl}${firstGeonameCity.name}`;
    const pixabayResponse = await fetch(pixabayUrl, {
        method: "GET",
        headers: {
        "Content-Type": "application/json"
        }
    });
    const pixabayResult = await pixabayResponse.json();
    const firstPixabayPhoto = pixabayResult.hits[0];
    console.log(pixabayResult);

    res.send(JSON.stringify({
        photoURL: firstPixabayPhoto.largeImageURL,
        location: `${firstGeonameCity.name}, ${firstGeonameCity.countryName}`,
        cityLng: firstGeonameCity.lng,
        cityLat: firstGeonameCity.lat,
        weather: darkSkyResult.currently.temperature,
        daysToGo: '122',
        departDate: req.query.date},))
});

