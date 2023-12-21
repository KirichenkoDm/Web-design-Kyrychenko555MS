const paymentInfoElem = document.getElementById("paymentInfo");
const resultSumElem = document.getElementById("resultSum")
const commissionElem = document.getElementById("commission")
let recipientElem = document.getElementById("recipient");

export const sendData = () => {
  //form body
  const sumVal = Number(resultSumElem.innerHTML.substring(0, resultSumElem.innerHTML.length - 4)) 
  const commissionVal = Number(commissionElem.innerHTML.substring(0, commissionElem.innerHTML.length - 4)) 
  let body = {
    recipient: recipientElem.innerHTML,
    resultSum: sumVal,
    commission: commissionVal,
  } 
  // send request
  fetch("/submit", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  //get responce + display
  .then(res => {
    if(!res.ok) {      
      throw new Error(res.status)
    } else
    return res.json();
  })
  .then(result => {
    paymentInfoElem.innerHTML = result.body;
    paymentInfoElem.style.color = "green";
  })
  .catch(e => {
    console.log("Код помилки: " + e);
    paymentInfoElem.innerHTML = "Перевод не вдався";
    paymentInfoElem.style.color = "red";
  })
}