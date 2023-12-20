import data from "../Currency_to_UAH.json" assert {type: 'json'};

let currenciesListElem = document.getElementById("currenciesList");

export const loadCurrenciesToList = () => {
  data.forEach((currency) => {
    let listItem = document.createElement('li');
    listItem.innerHTML = `${currency.currencyName}(${currency.symbol}): <br> ${currency.rate}UAH`;
    currenciesListElem.appendChild(listItem);
  });
}