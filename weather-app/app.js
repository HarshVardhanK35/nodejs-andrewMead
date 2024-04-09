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
  geoCode(cityName, (error, data) => {
    if (error) {
      return console.log(error);
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }

      console.log(data.location);
      console.log(forecastData);
    });
  });
}
