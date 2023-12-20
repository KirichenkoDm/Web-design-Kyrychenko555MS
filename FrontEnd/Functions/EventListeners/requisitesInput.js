const requisitesPattern = /\bUA\s?\d{2}\s?\d{6}\s?\d{19}\b/;

let requisitesElem = document.getElementById("requisites");
let recipientElem = document.getElementById("recipient");

export const focusOutRequisites = (e) => {
  //validation
  let errElem = document.getElementById("requisitesError");
  if(requisitesPattern.test(e.target.value)) {
    //dom update
    recipientElem.innerHTML = e.target.value;
    if(errElem){errElem.remove()}
  } else if (!errElem) {    
    recipientElem.innerHTML = "Відсутній"
    let error = document.createElement("p");
    error.id = "requisitesError";
    error.innerHTML = "Недійсні реквізити";
    requisitesElem.before(error);
  }  
}