const request = require("postman-request");

const options = {
  method: "GET",
  url: "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather",
  params: { city: "Seattle" },
  headers: {
    "X-RapidAPI-Key": "744850f453mshf93e44697219b34p15b512jsn64b8c41e66e0",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};

request(options, (error, response, body) => {
  if (error) {
    console.error("Error:", error);
  } else if (response.statusCode !== 200) {
    console.error("Status:", response.statusCode);
    console.error("Response:", body);
  } else {
    console.log("Body:", body);
    // Parse the JSON response
    const data = JSON.parse(body);
    console.log("Weather:", data.current); // Accessing the 'current' weather data
  }
});
