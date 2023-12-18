// import count_sum from "./Functions/count_sum";
import data from './Currency_to_UAH.json' assert {type: 'json'};

const requisitesPattern = /\bUA\s?\d{2}\s?\d{6}\s?\d{19}\b/;
var dataArray = [];
let requisitesElem = document.getElementById("requisites");
let sumElem = document.getElementById("sum");
let currELEM = document.getElementById("currency");
let formELEM = document.getElementById("form");

const resultSumUpdate = () => {
  let currency = currELEM.options[currELEM.selectedIndex].value;
  let resultSum = sumElem.value * data.currency_to_uah_coofittient[currency]
  document.getElementById("resultSum").innerHTML = (resultSum * 0.95).toFixed(2) + " UAH";
  document.getElementById("commission").innerHTML = (resultSum * 0.05).toFixed(2) + " UAH";
}

const getFromStorage = () => {
  let list = document.getElementById("requisitesList")
  let storageData = localStorage.getItem("list_or_req");
  console.log(storageData);
  if(storageData) {
    dataArray = JSON.parse(storageData)
    console.log("2");
    console.log(dataArray);
    dataArray.forEach((val)=>{
      let option = document.createElement('option');
      option.text = val;
      option.value = val;
      list.appendChild(option);
    })
  }  
}
// localStorage.clear();
getFromStorage();


const addToStorage = (requisites) => {
  let storageData = []
  let option = document.createElement('option');
  option.text = requisites;
  option.value = requisites;
  document.getElementById("requisitesList").appendChild(option);
  let listData = Array.from(document.getElementById("requisitesList").options)
  listData.forEach((elem) => {
    storageData.push(elem.value);
  })
  let uniq = [...new Set(storageData)];
  console.log(uniq);
  console.log(JSON.stringify(uniq));
  localStorage.setItem("list_or_req", JSON.stringify(uniq));
}

requisitesElem.addEventListener("focusout", function(e) {
  let err = document.getElementById("requisitesError")
  //validation
  if(requisitesPattern.test(e.target.value)) {
    //dom update
    document.getElementById("recipient").innerHTML = e.target.value;
    if(err){err.remove()}
  } else if (!err) {    
    document.getElementById("recipient").innerHTML = "Відсутній"
    let error = document.createElement("p");
    error.id = "requisitesError";
    error.innerHTML = "Недійсні реквізити";
    requisitesElem.before(error);
  }  
});

sumElem.addEventListener("focusout", function(e) {
  let err = document.getElementById("sumError")
  //validation
  if(e.target.value > 0 && e.target.value < 5001) {
    //dom update
    resultSumUpdate();
    document.getElementById("sum").innerHTML = e.target.value;
    if(err){err.remove()}
  } else if (!err) {
    let error = document.createElement("p");
    document.getElementById("recipient").innerHTML = "Відсутній"
    error.id = "sumError";
    error.style.flexBasis = "100%";
    error.innerHTML = "Сума має бути більше 0, до 5000";
    sumElem.before(error);
  }  
});

currELEM.addEventListener("change", resultSumUpdate)

formELEM.addEventListener("submit", function(e) {
  e.preventDefault();
  addToStorage(requisitesElem.value);
});






