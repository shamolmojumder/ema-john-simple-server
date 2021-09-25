const express = require('express')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4xoys.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()
app.use(bodyParser.json());
app.use(cors());




const port = 5000;


app.get('/',(req,res)=>{
  res.send("hello from ema server")
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productsCollection = client.db("emaJohnStore").collection("products");
  app.post('/addProduct',(req,res)=>{
    const products=req.body;
    productsCollection.insertMany(products)
    .then(result=>{
      console.log(result.insertedCount);
      res.send(result.insertedCount);
    })
  })
});


app.listen(port)
