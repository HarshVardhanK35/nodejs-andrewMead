// import express
const express = require('express');
const multer = require('multer')

require('./db/mongoose')
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

const app = express()
const port = process.env.PORT || 3000

// middleware functions --- to send a response that "site is under maintenance"
// app.use((req, res, next) => {
//   res.status(503).send("site is under maintenance... check back soon!")
// })

const upload = multer({
  dest: 'filesFromServer',
  limits: {
    fileSize: 100000000000 // given 1 million.. does not take files more than 1MB
  },
  fileFilter(req, file, cb){
    if(!file.originalname.endsWith('.pdf')){
      cb(new Error("Upload files only of PDF type!"))
    }
    cb(undefined, true)
  }
})
app.post('/upload', upload.single('upload'), (req, res) => {
  res.send()
})

// middleware - to parse the incoming JSON
app.use(express.json())

// middleware - to use routes
app.use(userRouter)

// middleware - to task routes
app.use(taskRouter)

// listen to the port: 3000
app.listen(port, () => {
  console.log(`Server up and listening on https://localhost:${port}`)
})

