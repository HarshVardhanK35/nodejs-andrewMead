// ------------------------------------------ To perform CRUD operations

/*
  * short cut --- const { MongoClient, ObjectID } = require("mongodb");
*/
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectId

// Require 'dotenv'
require("dotenv").config();

// define "connectionURL" of the database we are trying to connect to...
const uri = process.env.MONGODB_URI;

// set database name
const databaseName = "task-manager";

// ObjectID constructor
const id = new ObjectID("66312a9b4ac98d5e1d6165b5")

// connect to mongodb atlas
MongoClient.connect(uri)
  .then((client) => {
    console.log("connected to database!");

    // accessing database through client.db()
    const db = client.db(databaseName);

    db.collection('users').findOne({ _id: id })
    .then((userData) => {
      if(userData !== null) {
        console.log('Data found...', userData)
      }
      else{
        console.log(`Once check the search query... found: ${userData}`)
      }
    })
    .catch((error) => {
      console.log('Unable to find data', error)
    })
  })
  .catch((error) => {
    console.log("error in connecting!", error);
  });
