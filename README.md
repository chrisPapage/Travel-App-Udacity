# Travel Planner Application
A website that shows you information related to your travel destination and departure date.

## Configuration

This project expects certain environment variables to be provided in the `.env` file in project root directory

    - darkSkyApiKey
    - geonamesUserName
    - pixabayApiKey

Keys can be obtained from: [Dark Sky API](https://darksky.net/dev), [GeoNames API](http://www.geonames.org/export/web-services.html) & [Pixabay API](https://pixabay.com/api/docs)
 
## Get Started

1. Clone this repo
2. `cd` into your local cloned repo:

    - `npm install` or `yarn install`

3. Create a new .env file and containing mentioned environment variables:

    - darkSkyApiKey
    - geonamesUserName
    - pixabayApiKey

4. Run: `npm run start` or `yarn run start`
    
## Functions

This project simply presents some information like country, weather or a photo about any destination in the world picked by user, in a certain departing and returning date.

## Extra function

The user is able to add more than one destinations in the same page, to compare any information, simply by hitting the save button again and again with a new city name.