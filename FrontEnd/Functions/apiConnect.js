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
  fetch("/file", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: jsonData
  });
}

export const getCurrencyApi = () => {
  let request;
  if (window.XMLHttpRequest) { request = new XMLHttpRequest(); }
  
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let currencyArray = JSON.parse(this.responseText);
      currencyHandling(currencyArray);
    } else if (this.status == 404) {
      alert("Немає зв'язку з сервером, дані будуть взяті з локального файлу");
  }}

  request.open("GET", url, true);
  if(request) {
    return request;
  }
  else return null;
}