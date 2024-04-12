const express = require('express');
const path = require('path');

// variable app which stores express application by calling express()
// express() - function - does not take any arguments - instead we configure our server
const app = express();

/*
 * ------------------- _STATIC FILES_ -------------------
 * path.join()-> Joins all the paths provided as args and results a normal path
 * path to public folder
*/
const publicDirectoryPath = path.join(__dirname, "../public")

// middleware to serve _STATIC_ files
app.use(express.static(publicDirectoryPath))

// _DYNAMIC_
// Set the views directory to the correct path
app.set('views', path.join(__dirname, '../views'));

// _DYNAMIC_
// app.set() >>> setting up hbs into express
app.set('view engine', 'hbs');

// to render index.hbs inside views directory
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather Application',
    name: "user-1"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "This is about page",
    name: "Weather-App organization"
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: "This is help page",
    number: "123-4567-890"
  })
})

/*
 * ------------------------------------ setup _STATIC_ files ------------------------------------
 * set up our server to send a response when user tries a specific route (access /home, /about )
 * app.get() takes 2 args... route and a callback fn which tell what to do when someone visits the specific route
 * the CB fn takes in 2 objects those are req, res...
     * req (request)  -> incoming request to the server
     * res (response) -> contains bunch of methods allows us to customize what we send back to the user
         * res.send()-> which sends some response to the user
  *
*/

// app.get('/', (req, res) => {
//   res.send("<h1>Home Page!</h1>")
// })

// app.get('/help', (req, res) => {
//   res.send(
//     [
//       {
//         userName: 'user1',
//         age: 23
//       },
//       {
//         userName: 'user2',
//         age: 22
//       }
//     ]
//   )
// })

// app.get('/about', (req, res) => {
//   res.send('<h1>About page!</h1>');
// })

// app.get('/weather', (req, res) => {
//   res.send(
//     {
//       forecast: "10 degrees out",
//       location: "London"
//     }
//   )
// })

/*
 * at last we start the server to start... we have to use one more function that is... app.listen()
 * this listens on to a port which will be port = 3000 or anything.
 * port 3000 is not a default port as there will different ports.
 * if there are any changes made in the code... restart the server.
*/
app.listen(3000, () => {
  console.log(`server up and running on: http://localhost:3000/`)
})
