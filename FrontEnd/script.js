import { resultSumUpdate } from './Functions/countResultSum.js';
import { getFromStorage, addToStorage } from './Functions/localStorageConnection.js';
import { focusOutRequisites } from './Functions/EventListeners/requisitesInput.js';
import { focusoutSum } from './Functions/EventListeners/sumInput.js';
import { getCurrencyApi } from './Functions/apiConnect.js';
import { loadCurrenciesToList } from './Functions/loadCurrenciesToUi.js';
import { sendData } from './Functions/sendFormRequest.js';
let requisitesElem = document.getElementById("requisites");
let sumElem = document.getElementById("sum");
let currElem = document.getElementById("currency");
let formElem = document.getElementById("form");

requisitesElem.addEventListener("focusout", focusOutRequisites);
sumElem.addEventListener("keyup", focusoutSum);
currElem.addEventListener("change", resultSumUpdate);
formElem.addEventListener("submit", (e) => {
  e.preventDefault();
  addToStorage(requisitesElem.value);
  sendData()
});

// localStorage.clear();
getFromStorage();

//Connect to api
let apiConnect = getCurrencyApi();
if(apiConnect){apiConnect.send()}

//load currencies to interface
loadCurrenciesToList();


