
export const generateListHtml = (data) => {
  // let page = "<html>";
  let innerHTMLelem = "<ul id='currenciesList' class='currenciesList'>";
  innerHTMLelem += ('<label for="currenciesList"><h2>Курси валют:</h2></label>');
  data.forEach((currency) => {
    let listItem = "<li>";
    listItem += `${currency.currencyName}(${currency.symbol}): <br> ${currency.rate}UAH`;
    listItem += "</li>"
    innerHTMLelem += listItem;
  });
  // page += innerHTMLelem + "</html>";
  // return page;
  return innerHTMLelem;
}

