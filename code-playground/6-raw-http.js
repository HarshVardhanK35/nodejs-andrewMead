// 6-raw-http

const { error } = require('console');
const https = require('https');
require('dotenv').config()

const geoApiKey = process.env.GEOCODING_API_KEY;
const city = 'london';

const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${geoApiKey}`

const req = https.request(url, (res)=> {

  let data = '';

  res.on('data', (chunk) => {
    data = data + chunk.toString()
  })

  res.on('end', () => {
    const parsedRes = JSON.parse(data)
    console.log(parsedRes)
  })
})

req.on('error', (error) => {
  console.log('Error: ', error.message)
})

req.end()