let currenciesListElem = document.getElementById("currenciesListContainer");

export const loadCurrenciesToList = () => {
  fetch("/file", {
    method: "GET",
    // headers: { 'Content-Type': 'application/json' },
  })
  .then(res => {
    if (!res.ok) {    
      throw new Error("Network response was not OK");
    } else 
    return res.json();
  }) 
  .then(result => currenciesListElem.innerHTML = result.body); 
  
  // data.forEach((currency) => {
  //   let listItem = document.createElement('li');
  //   listItem.innerHTML = `${currency.currencyName}(${currency.symbol}): <br> ${currency.rate}UAH`;
  //   currenciesListElem.appendChild(listItem);
  // });
}