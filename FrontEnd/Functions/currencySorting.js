const symbolOrder = ["UAH", "USD", "GBP", "EUR", "MXN", "ILS", "CNY", "TRY", "CZK"]

function customComparator(a, b) {
  const indexA = symbolOrder.indexOf(a.symbol);
  const indexB = symbolOrder.indexOf(b.symbol);

  if (indexA === -1 && indexB === -1) {
    // If both symbols are not in the specific order, maintain their original order
    return 0;
  } else if (indexA === -1) {
    // If only symbol A is not in the order, sort to the end
    return 1;
  } else if (indexB === -1) {
    // If only symbol B is not in the order, sort to the beginning
    return -1;
  } else {
    // Compare the indices for symbols in the specific order
    return indexA - indexB;
  }
}

//sort currency array un specific order
//so currencies available in form will be on top of the list
export const sortCurrency = (array) => {
  array.sort(customComparator)
  return array;
}