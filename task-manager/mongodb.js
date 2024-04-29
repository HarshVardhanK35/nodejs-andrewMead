// ------------------------------------------ To perform CRUD operations

// import mongodb
const mongodb = require('mongodb');

// Require 'dotenv'
require('dotenv').config();

// MongoClient -> gives function to connect to the database... so we can perform CRUD operations
const MongoClient = mongodb.MongoClient;

// define connectionURL of the database we are trying to connect to...
const uri = process.env.MONGODB_URI;

// set database name
const databaseName = 'task-manger';

// connect to mongodb atlas
MongoClient.connect(uri)
.then((client) => {

  console.log("connected to database!")

  // accessing "task-manager" database through client.db()
  const db = client.db(databaseName);

  // variable that represents a collection within a database ('task-manger')
  const collection = db.collection('users')

  // data to insert
  const data = { name: "John", age: 23 };

  // insert a single document into the MongoDB collection
  collection.insertOne(data)
  .then((result) => {
    console.log('Data inserted successfully', result)
    client.close()
  })
  .catch((error) => {
    console.error('error while inserting!', error);
    client.close()
  });
})
.catch((error) => {
  console.log("error in connecting!", error)
})