import data from '../Currency_to_UAH.json' assert {type: 'json'};

let sumElem = document.getElementById("sum");
let currElem= document.getElementById("currency");
let resultSumElem = document.getElementById("resultSum")
let commissionElem = document.getElementById("commission")

export const resultSumUpdate = () => {
  let index = data.findIndex((currency) => currency.symbol == currElem.options[currElem.selectedIndex].value);
  let resultSum = sumElem.value * data[index].rate;
  resultSumElem.innerHTML = (resultSum * 0.95).toFixed(2) + " UAH";
  commissionElem.innerHTML = (resultSum * 0.05).toFixed(2) + " UAH";
}
