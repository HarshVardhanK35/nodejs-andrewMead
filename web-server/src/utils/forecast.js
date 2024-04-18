const request = require("postman-request");
require("dotenv").config();

const weatherApiKey = process.env.WEATHER_API_KEY;

const forecast = (lat, long, callback) => {

  if (lat !== undefined && long !== undefined) {
    const weatherOptions = {
      url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=8c13c89a3627afaf6d03bcd426d2751b`,
      json: true, // json --- true (automatically parses json responses)
    };

    request(weatherOptions, (err, res, body) => {
      if (err) {
        callback(`Error connecting services... Please check your internet connection: ${err.code}`, undefined);
      }
      else if (res.statusCode !== 200) {
        callback(`${res.statusCode}; message: ${body.message}`, undefined);
      }
      else if (body.Error) {
        callback(`Unable to find location!`, undefined);
      }
      else {
        callback(undefined, (`It is currently ${(res.body.main.temp - 273.15).toFixed(2)} degrees out and it feels like ${(res.body.main.feels_like - 273.15).toFixed(2)} degrees out`));
      }
    });
  }
  else {
    callback('Error: Latitude or Longitude is not provided!', undefined);
  }
};

module.exports = forecast;