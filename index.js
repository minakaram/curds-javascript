let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("submit");
let deleteAll = document.getElementById("delete-all");
let mood = "create";
let tmp;

function getPrice() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "rgb(190, 5, 5)";
  }
}

var dataPro = [];

if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.getItem("product"));
} else {
  dataPro = [];
}
create.onclick = function () {
  var newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value || 0,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value < 6
  ) {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mood = "create";
      count.style.display = "block";
      create.innerHTML = "create";
    }
    if (dataPro.count > 5) {
      alert("the max count is 5");
    }
    clearData();
  } else if (count.value > 5) {
    alert("the max count is 5");
  } else {
    title.focus();
  }
  localStorage.setItem("product", JSON.stringify(dataPro));
  console.log(dataPro);

  readData();
  //   total.style.backgroundColor = "rgb(190, 5, 5)";
};

//clear

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//read

function readData() {
  getPrice();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `<tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onClick="updateData(${i})" id="update">Update</button></td>
    <td><button onClick="deleteData(${i})" id="delete">Delete</button></td>
    </tr>
    `;
  }

  if (dataPro.length === 0) {
    table = `<div class="no-data"><tr><td colspan='10'>No data available</td></tr></div>`;
    deleteAll.style.display = "none";
  } else {
    deleteAll.style.display = "block";
    deleteAll.innerHTML = `Delete all (${dataPro.length})`;
  }
  document.getElementById("tbody").innerHTML = table;
}
readData();

//delete

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(dataPro));
  readData();
}

deleteAll.onclick = function () {
  dataPro.splice(0);
  localStorage.clear;
  //   localStorage.setItem("product", JSON.stringify(dataPro)); to delete permnent
  readData();
};

//update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  //   total.innerHTML = dataPro[i].total;
  getPrice();
  category.value = dataPro[i].category;
  count.style.display = "none";
  create.innerHTML = "update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search
let searchMood = "title";
let search = document.getElementById("search");
function searchPro(id) {
  if (id === "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "search by " + searchMood;
  search.focus();
  search.value = "";
  readData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood === "title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `<tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onClick="updateData(${i})" id="update">Update</button></td>
            <td><button onClick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>
            `;
      }
    } else {
      if (dataPro[i].category.includes(value)) {
        table += `<tr>
              <td>${i + 1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onClick="updateData(${i})" id="update">Update</button></td>
              <td><button onClick="deleteData(${i})" id="delete">Delete</button></td>
              </tr>
              `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
