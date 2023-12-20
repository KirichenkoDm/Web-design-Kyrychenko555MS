import { resultSumUpdate } from "../countResultSum.js";

let sumElem = document.getElementById("sum");
let recipientElem = document.getElementById("recipient");

export const focusoutSum = (e) => {
  //validation
  let errElem = document.getElementById("sumError");
  console.log(errElem);
  if(e.target.value > 0 && e.target.value < 5001) {
    //dom update
    resultSumUpdate();
    sumElem.innerHTML = e.target.value;
    if(errElem){errElem.remove()}
  } else if (!errElem) {
    let error = document.createElement("p");
    recipientElem.innerHTML = "Відсутній"
    error.id = "sumError";
    error.style.flexBasis = "100%";
    error.innerHTML = "Сума має бути більше 0, до 5000";
    sumElem.before(error);
  }  
}