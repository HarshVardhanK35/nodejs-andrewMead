// ------------------------------------------------- Weather -------------------------------------------------
const request = require("postman-request");
require('dotenv').config()

// Define latitude and longitude values
const weatherApiKey = process.env.WEATHER_API_KEY;

let latitude = 55.7558;
let longitude = 37.6176;

if (latitude !== undefined && longitude !== undefined) {
  const weatherOptions = {
    url: `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`,

    json: true // json --- true (automatically parses json responses)
  }

  request(weatherOptions, (err, res, body) => {
    if (err) {
      console.log('Error connecting to the weather service:', err.code);
      console.log('Please check your internet connection and try again.');
    }
    else if (res.statusCode !== 200) {
      console.log(`Status: ${res.statusCode}`);
      console.log(`Response: ${body}`);
    }
    else if (res.body.Error) {
      console.log(`Unable to find location: ${res.body.message}`);
    }
    else {
      const temp = res.body.main.temp;
      const feels_like = res.body.main.feels_like;
      console.log(`It is currently ${(temp - 273.15).toFixed(3)} degrees out. It feels like ${(feels_like - 273.15).toFixed(3)} degrees out`);
    }
  })
}
else {
  console.log('Error: Latitude or Longitude is not provided!');
}

// ------------------------------------------------- Geo-Location -------------------------------------------------

// const geoApiKey = process.env.GEOCODING_API_KEY;
// const geoCity = 'Los Angeles'

// const geoOptions = {
//   url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(geoCity)}.json?access_token=${geoApiKey}`,
//   json: true
// }

// request(geoOptions, (err, res, body) => {
//   if(!err){
//     const latitude = body.features[0].center[1]
//     const longitude = body.features[0].center[0];

//     console.log(latitude, longitude)

//   }
//   else if(res.statusCode !== 200){
//     console.log(`Status: ${res.statusCode}`)
//     console.log(`Response: ${body}`)
//   }
//   else{
//     console.log(err)
//   }
// })
