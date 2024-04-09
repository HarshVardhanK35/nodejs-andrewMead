const request = require('postman-request')
require("dotenv").config();

const geoApiKey = process.env.GEOCODING_API_KEY;

const geoCode = (city, callback) => {
  if (city !== undefined) {
    const geoOptions = {
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${geoApiKey}`,
      json: true, // json --- true (automatically parses json responses)
    };
    request(geoOptions, (err, res, body) => {
      if (err) {
        callback(`Error connecting services... Please check your internet connection: ${err.code}`, undefined);
      }
      else if (res.statusCode !== 200) {
        callback(`Status: ${res.statusCode}, Response: ${body}`, undefined);
      }
      else {
        callback(undefined, {
          latitude : body.features[0].center[1],
          longitude : body.features[0].center[0],
          location: body.features[0].place_name
        })
      }
    });
  }
  else{
    console.log('Location is not provided!')
  }
};

module.exports = geoCode