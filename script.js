import { initializeApp } from "https:/www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https:/www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://realtime-database-39365-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "ShoppingList");

document.getElementById("add-button").addEventListener("click", addButton);

function addButton() {
  let inputValue = document.getElementById("inp").value;
  if (inputValue == "") {
    alert("No items added");
  } else {
    push(shoppingListInDB, inputValue);
    clearInp();
  }
}

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    clearList();

    let inputValue = document.getElementById("inp").value;
    let itemsArray = Object.entries(snapshot.val());
    let arrayNumber = itemsArray.length;

    for (let index = 0; index < arrayNumber; index++) {
      let currentItem = itemsArray[index];
      let currentItemId = currentItem[0];
      let currentItemValue = currentItem[1];

      addItemToList(currentItem);
    }
  } else {
    listItems.innerHTML = `<p style="text-align: center;user-select: none;">No items here, yet!</p>`;
  }
});

function clearInp() {
  document.getElementById("inp").value = "";
}

function addItemToList(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;
  document.getElementById("listItems").append(newEl);

  newEl.addEventListener("click", deleteList);

  function deleteList() {
    let exactLocationOfItemInDB = ref(database, `ShoppingList/${itemID}`);
    remove(exactLocationOfItemInDB);
  }
}

function clearList() {
  document.getElementById("listItems").innerHTML = "";
}
