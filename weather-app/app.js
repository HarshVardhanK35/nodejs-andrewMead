const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const cityName = process.argv[2];

if(!cityName){
  console.log("Please provide correct city name")
}
else if(cityName === "city"){
  console.log("Please enter correct city name!!!")
}
else{
  geoCode(cityName, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return console.log(error);
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }

      console.log(location);
      console.log(forecastData);
    });
  });
}
