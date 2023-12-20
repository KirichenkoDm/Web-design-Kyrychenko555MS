import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let jsonData = JSON.stringify({
  symbol: "UAH",
  currencyName: "Українська гривня",
  rate: 1.0,
})

fs.writeFile("/Currency_to_UAH.json", jsonData, function writeJSON(err) {
  if (err) return console.log(err);
  console.log("writing to ../Currency_to_UAH.json");
});

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(port);
console.log('Server started at http://localhost:' + port);