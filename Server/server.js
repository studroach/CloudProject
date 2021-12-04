//Environment Resources
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//Mongo DB Resources
const { MongoClient } = require('mongodb');
const uri = "";
//const client = new MongoClient(uri);
//Init
const app = express();
const jsonParser = bodyParser.json();
app.use(express.static('public'));

//Start Server Listening
async function startServer() {

    app.listen(3000, function() {
      console.log('Task server now listening on port 3000');
    });

};
startServer();

//Data Requests/////////////////////////////////////////////////////////////////
async function getData(requestObject){

  try {
    //Accessing DB
    await client.connect();
    const collection = client.db("").collection("");//TODO

    const cursor = collection.find({});//TODO
    const result = await cursor.toArray();
    return result;
  } catch (e) {
    //Error
    console.error(e);
  } finally {
    //Close Connection
    await client.close();
  }
}

//Get and Post Methods//////////////////////////////////////////////////////////

async function onNewTask(req, res) {
  console.log(req.body);
}
app.post('/save', jsonParser, onNewTask);

async function onRequestData(req, res) {
  res.send({message:"I got the response!"});
  console.log("Sent response");
}
app.get('/request', onRequestData);

//Testing///////////////////////////////////////////////////////////////////////
// getData(0).then((value) => {
//   console.log(value);
// });
