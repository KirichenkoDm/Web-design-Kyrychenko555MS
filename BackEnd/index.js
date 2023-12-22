import express from 'express';
import { generateListHtml } from'./generateListHtml.js';
import fs from 'fs'
// const cors = require('cors')

const app = express()
// app.use(cors())

//all endpoints made async
app.use(express.json())
//send file

//save file
app.post('/currencies', async (req, res) => {
  //formatting
  let jsonData = JSON.stringify(req.body, null, 2);
  //save to file
  fs.writeFile("./Currency_to_UAH.json", jsonData, function writeJSON(err) {
    if (err) {
      console.log(err);
      res.status(500).send();
    }    
    res.status(200).send();
    console.log("writing to Currency_to_UAH.json");
  });  
})
app.get('/currencies', async (req, res) => {
  fs.readFile("./Currency_to_UAH.json", "utf-8", (err, data) => {
    if(data) {
      data = JSON.parse(data);
      //generating html page'
      let page = generateListHtml(data);
      res.append('Content-Type', 'application/json');
      res.status(200).send(page);
    } // else res.status(404).send("file missing");
  })
})
//send transfer
//unused
app.get('/transfer', (req,res) => {
  fs.readFile("./Last_payment.json", "utf-8", (err, data) => {
    if(data) {
      data = JSON.parse(data);
      res.append('Content-Type', 'application/json');
      res.status(200).send(data);
    } else res.status(404).send("file missing");
  })
})
//save transfer
app.post('/transfer', (req,res) => {
  //formatting
  let jsonData = JSON.stringify(req.body, null, 2);
  //save to file
  try {
    fs.writeFile("./Last_payment.json", jsonData, function writeJSON(err) {
      console.log("writing to Last_payment.json");
    });
    res.append('Content-Type', 'application/json');
    res.status(200).send({body: "Переказ успішний"})
  } catch (error) {
    res.status(500).send(error);
  }
})


app.listen(3001, () => {
  console.log('Server started at http://localhost:3001');
})