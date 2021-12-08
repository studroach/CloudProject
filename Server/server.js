//Environment Resources
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//Mongo DB Resources
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://daniyal123:DOsEWjbU6nWb3g9u@task.ubjgn.mongodb.net/Task?retryWrites=true&w=majority";
const client = new MongoClient(uri);
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
async function getData(){

  try {
    //Accessing DB
    await client.connect();
    const collection = client.db("Task").collection("Task");

    const cursor = collection.find();
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

//Save Data/////////////////////////////////////////////////////////////////////
async function onNewTask(req, res) {
  console.log("New task added:");
  console.log(req.body);
  try {
    await client.connect();
    const collection = client.db("Task").collection("Task");

    const result = await collection.insertOne(req.body);
    if (result) {
      return { message: "Task has been added" };
    }
    else {
      return { message: "Task not added" };
    }
  } catch (e) {
    //Error
    console.error(e);
  } finally {
    //Close Connection
    await client.close();
  }
}
app.post('/save', jsonParser, onNewTask);

//Get Data//////////////////////////////////////////////////////////////////////
async function onRequestData(req, res) {
  getData().then((value) => {
    res.send(value);
  });
  // res.send({message:"I got the response!"});
  console.log("Sent response");
}
app.get('/request', onRequestData);
