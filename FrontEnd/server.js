import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//make endpoint async
app.post('/file', async function(req, res) {
  await axios.post('http://localhost:3001/currencies', 
    JSON.stringify(req.body), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then( backendResponce => 
    console.log(backendResponce.status)
  );
});

app.get('/file', async function(req, res) {
  const backendResponce = await axios.get('http://localhost:3001/currencies');
  res.append('Content-Type', 'application/json');
  res.send({body: backendResponce.data});
});

app.post('/submit', async function(req, res) {
  if(req.body) {    
    await axios.post('http://localhost:3001/transfer', 
    JSON.stringify(req.body), {
    headers: {
      'Content-Type': 'application/json'
    }})
    .then( backendResponce => {
      res.append('Content-Type', 'application/json');
      res.status(backendResponce.status).send({body: "Переказ успішний"})
    });
  }
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(port);
console.log('Server started at http://localhost:' + port);