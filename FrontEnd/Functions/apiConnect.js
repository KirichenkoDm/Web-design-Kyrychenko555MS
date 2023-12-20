//import fs from 'fs'
import { sortCurrency } from "./currencySorting.js";
const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
//put the only currency data we need from server to local file
function currencyHandling(currencyArray) {
  //select only needed data
  let neededData = currencyArray.map(currency => {
  return {
    symbol: currency.cc,
    currencyName: currency.txt,
    rate: currency.rate,
  }
  })
  //add UAH
  neededData.push({
    symbol: "UAH",
    currencyName: "Українська гривня",
    rate: 1.0,
  })
  //sort
  neededData = sortCurrency(neededData);
  //save to file
  let jsonData = JSON.stringify(neededData, null, 2);
  writeFile("../Currency_to_UAH.json", jsonData, function writeJSON(err) {
    if (err) return console.log(err);
    console.log("writing to ../Currency_to_UAH.json");
  });
}

export const getCurrencyApi = () => {
  let request;
  if (window.XMLHttpRequest) { request = new XMLHttpRequest(); }
  
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let currencyArray = JSON.parse(this.responseText);
      currencyHandling(currencyArray);
    }
  }
  request.open("GET", url, true);
  return request;
}