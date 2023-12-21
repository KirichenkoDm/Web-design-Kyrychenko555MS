import express, { response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'
import { generateListHtml } from './Functions/generateListHtml.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/file', function(req, res) {
  let jsonData = JSON.stringify(req.body, null, 2);
  fs.writeFile("./Currency_to_UAH.json", jsonData, function writeJSON(err) {
    if (err) return console.log(err);
    console.log("writing to Currency_to_UAH.json");
  });
});

app.post('/submit', function(req, res) {
  if(req.body) {
  let jsonData = JSON.stringify(req.body, null, 2);
  try {
    fs.writeFile("./Last_payment.json", jsonData, function writeJSON(err) {
      console.log("writing to Last_payment.json");
    });
    res.append('Content-Type', 'application/json');
    res.status(200).send({body: "Переказ успішний"})
  } catch (error) {
    res.status(500).send(error);
  }  
  } else {
    res.status(400).send(error);
  }
});

app.get('/file', function(req, res) {
  fs.readFile("./Currency_to_UAH.json", "utf-8", (err, data) => {
    if(data) {
      data = JSON.parse(data)
      //generating html page'
      let page = generateListHtml(data);
      console.log("sending data");
      res.append('Content-Type', 'application/json');
      res.send({body: page});
    } else res.status(404).send("file missing");
  })
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(port);
console.log('Server started at http://localhost:' + port);