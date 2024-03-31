const request = require("postman-request");
require('dotenv').config()

// ------------------------------------------------- Weather -------------------------------------------------

// const weatherApiKey = process.env.WEATHER_API_KEY;

// let latitude = 34.053691
// let longitude = -118.242766

// if (latitude !== undefined && longitude !== undefined) {
//   const weatherOptions = {
//     url: `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`,

//     json: true // json --- true (automatically parses json responses)
//   }

//   request(weatherOptions, (err, res, body) => {
//     if (err) {
//       console.log('Error connecting to the weather service:', err.code);
//       console.log('Please check your internet connection and try again.');
//     }
//     else if (res.statusCode !== 200) {
//       console.log(`Status: ${res.statusCode}`);
//       console.log(`Response: ${body}`);
//     }
//     else if (res.body.Error) {
//       console.log(`Unable to find location: ${res.body.message}`);
//     }
//     else {
//       const temp = res.body.main.temp;
//       const feels_like = res.body.main.feels_like;
//       console.log(`In ${res.body.name}, it is currently ${(temp - 273.15).toFixed(2)} degrees out but it feels like ${(feels_like - 273.15).toFixed(2)} degrees out`);
//     }
//   })
// }
// else {
//   console.log('Error: Latitude or Longitude is not provided!');
// }

// ------------------------------------------------- Geo-Location -------------------------------------------------
const geoApiKey = process.env.GEOCODING_API_KEY;

let geoCity = '12'

if(geoCity !== undefined){

  const geoOptions = {
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${(geoCity)}.json?access_token=${geoApiKey}`,

    json: true // json --- true (automatically parses json responses)
  }

  request(geoOptions, (err, res, body) => {
    if(err){
      console.log('Error connecting to the location services :', err.code);
      console.log('Please check your internet connection and try again.');
    }
    // else if(res.statusCode !== 200){
    //   console.log(`Status: ${res.statusCode}`)
    //   console.log(`Response: ${body}`)
    // }
    else if (res.body.features.length === 0) {
      console.log(`Unable to find location: ${res.body.message}... Try another search`);
    }
    else{
      const latitude = body.features[0].center[1]
      const longitude = body.features[0].center[0];
      console.log(latitude, longitude)
    }
  })
}
else{
  console.log('Location is not provided!')
}