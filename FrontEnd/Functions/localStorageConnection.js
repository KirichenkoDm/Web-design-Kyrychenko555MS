export const getFromStorage = () => {
  let list = document.getElementById("requisitesList");
  let dataArray = [];  

  let storageData = localStorage.getItem("list_or_req");

  if(storageData) {
    dataArray = JSON.parse(storageData)
    dataArray.forEach((val)=>{
      let option = document.createElement('option');
      option.text = val;
      option.value = val;
      list.appendChild(option);
    })
  }  
}

export const addToStorage = (requisites) => {
  let option = document.createElement('option');
  let list = document.getElementById("requisitesList");
  let storageData = [];
    
  option.text = requisites;
  option.value = requisites;
  list.appendChild(option);
  let listData = Array.from(list.options)
  listData.forEach((elem) => {
    storageData.push(elem.value);
  })
  let uniq = [...new Set(storageData)];
  localStorage.setItem("list_or_req", JSON.stringify(uniq));
}