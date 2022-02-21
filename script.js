"use strict";

const dripsItems = [
  [
    {
      image: "./assets/Coffee-images/macchiato.jpeg",
      name: "driptastic macchiato",
      description: "A rich espresso dressed in foam",
      price: 2.99,
      imgAlt: "Macchiato drink",
    },
    {
      image: "./assets/Coffee-images/frappe.jpeg",
      name: "drippy pour-over",
      description: "Espresso and coffee mixed to perfection on ice",
      price: 4.99,
      imgAlt: "Frappe drink",
    },
  ],
  [
    {
      image: "./assets/Coffee-images/hot-brew.jpeg",
      name: "house brew",
      description: "Our flagship coffee using our in house grounds",
      price: 1.99,
      imgAlt: "Hot brew drink",
    },
    {
      image: "./assets/Coffee-images/espresso.jpeg",
      name: "espresso",
      description: "Full bodied espresso sold by the shot",
      price: 2.99,
      imgAlt: "Espresso drink",
    },
    {
      image: "./assets/Coffee-images/cappuccino.jpeg",
      name: "cappuccino",
      description: "A dark cappuccino covered in a thick milk foam",
      price: 2.99,
      imgAlt: "Cappuccino drink",
    },
    {
      image: "./assets/Coffee-images/latte.jpeg",
      name: "caffe latte",
      description: "Rich boldness and balance in an espresso",
      price: 3.29,
      imgAlt: "Latte drink",
    },
  ],
  [
    {
      image: "./assets/Coffee-images/iced-americano.jpeg",
      name: "cold brew",
      description: "Our house brew on the rocks",
      price: 1.99,
      imgAlt: "Cold brew drink",
    },
    {
      image: "./assets/Coffee-images/americano.jpeg",
      name: "iced americano",
      description: "A bold espresso stretched and chilled to perfection",
      price: 3.59,
      imgAlt: "Iced americano drink",
    },
    {
      image: "./assets/Coffee-images/iced-mocha.jpeg",
      name: "iced mocha",
      description: "A classic chocolate staple with added cream on ice",
      price: 4.59,
      imgAlt: "Iced mocha drink",
    },
    {
      image: "./assets/Coffee-images/iced-chai-tea-latte.jpeg",
      name: "iced chai tea latte",
      description: "A balance between savory and sweet",
      price: 2.59,
      imgAlt: "Iced chai tea latte drink",
    },
  ],
];

const checkOut = [];

const addButton = "assets/icons/add.button.svg";
const itemAmountNumber = document.querySelector(".cart-amount");

// ourDrinks[0][0]
window.addEventListener("load", (e) => {
  dripsItems.forEach((item, i) => {
    const indexNumber = i;
    const categoryDrinks =
      i === 0
        ? ".fancy-drinks-list"
        : i === 1
        ? ".hot-drinks-list"
        : ".cold-drinks-list";
    const dripsContainer = document.querySelector(categoryDrinks);
    console.log(categoryDrinks);
    item.forEach((objItem, i) => {
      const itemContainer = document.createElement("li");
      const imageContainer = document.createElement("div");
      const coffeeImage = document.createElement("img");
      const name = document.createElement("h4");
      const description = document.createElement("p");
      const price = document.createElement("p");
      const button = document.createElement("button");
      const addImage = document.createElement("img");
      itemContainer.classList.add("item-container");
      imageContainer.classList.add("img-container");
      description.classList.add("descrip-text");
      price.classList.add("price-text");

      itemContainer.setAttribute("data-outerIndex", indexNumber);
      itemContainer.setAttribute("data-innerIndex", i);
      name.textContent = objItem.name;
      addImage.setAttribute("src", addButton);
      addImage.setAttribute("class", "add-icon");
      addImage.setAttribute("alt", "add to cart");
      button.setAttribute("class", "add-button");
      coffeeImage.setAttribute("src", objItem.image);
      coffeeImage.setAttribute("alt", objItem.imgAlt);
      description.textContent = objItem.description;
      price.textContent = `$${objItem.price}`;

      button.append(addImage);
      itemContainer.append(imageContainer, name, description, price, button);
      imageContainer.append(coffeeImage);
      dripsContainer.append(itemContainer);
    });
  });
});

let counter = 0;
const main = document.querySelector("main");
const viewCart = document.querySelector(".view-cart");
const header = document.querySelector("header");

main.addEventListener("click", (e) => {
  // When the user adds an menu item to their cart
  if (e.target.classList.contains("add-icon")) {
    counter++;
    const parentItem = e.target.parentNode.parentNode;
    checkOut.push(
      dripsItems[parentItem.dataset.outerindex][parentItem.dataset.innerindex]
    );
    addToListOfCart(parentItem);
  }
  // If the user has over 100 orders to their cart, it will default to 99+
  if (checkOut.length > 99) {
    itemAmountNumber.style.fontSize = "11px";
    itemAmountNumber.textContent = "99+";
  } else {
    itemAmountNumber.textContent = `${checkOut.length}`;
  }

  // When the user presses the X (close) button on payment screen
  if (e.target.id === "close-btn") {
    viewCart.classList.remove("slide-effect");
    body.classList.remove("body-scroll-off");
  }
});

const body = document.querySelector("body");
// When the user clicks on the shopping cart icon it will pop up the
// check out page for them to see their items they have in their cart,
// how much money is needed, and if they want to use card or cash.
const sideBarBtn = document.querySelector(".side-bar-icon");
const slidePage = document.querySelector(".slide-links-container");

header.addEventListener("click", (e) => {
  if (
    e.target.id === "shopping-cart-icon" ||
    e.target.classList.contains("cart-amount")
  ) {
    viewCart.style.display = "block";
    viewCart.classList.add("slide-effect");
    body.classList.add("body-scroll-off");
  }

  if (e.target.classList.contains("side-bar-icon")) {
    slidePage.classList.toggle("slide-links-on");
  }
});

const slideLinks = document.querySelectorAll(".links a");

slidePage.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.classList.contains("link")) {
    slidePage.classList.remove("slide-links-on");
  }
});

const cartItemContainer = document.querySelector(".cart-items-container");
let subtotal = 0;
const recieptListContainer = document.querySelector(".items-bought-container");

// When the user adds items to the cart, it will create
// new HTML elements to add into the list
const addToListOfCart = () => {
  const listItem = document.createElement("li");
  const previewImage = document.createElement("img");
  const detailsHolder = document.createElement("div");
  const itemHeading = document.createElement("h4");
  const price = document.createElement("p");
  const remove = document.createElement("button");

  listItem.dataset.elementNum = checkOut.length - 1;
  listItem.classList.add("item-in-checkout");
  previewImage.setAttribute("src", checkOut[checkOut.length - 1].image);
  itemHeading.textContent = checkOut[checkOut.length - 1].name;
  price.textContent = `$${checkOut[checkOut.length - 1].price}`;
  remove.textContent = "remove";
  remove.setAttribute("class", "remove-Btn");

  detailsHolder.append(itemHeading, price, remove);
  listItem.append(previewImage, detailsHolder);
  cartItemContainer.append(listItem);

  // Calculates the total price from the items in the cart
  calculateTotal();
};

// When the user presses the remove button on the checkout screen
// this will remove the item's HTML element and remove its array element.
cartItemContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-Btn")) {
    const elementLocationIndex = document.querySelectorAll(".item-in-checkout");
    checkOut.splice(e.target.dataset.elementNum, 1);
    e.target.parentNode.parentNode.remove();
    let indexPlacement = 0;
    elementLocationIndex.forEach((index) => {
      index.dataset.elementNum = indexPlacement;
      indexPlacement++;
    });
    calculateTotal();
  }
});

// Calculates the total of the price of all items that the user added
// to their cart
const calculateTotal = () => {
  subtotal = 0;
  checkOut.forEach((totalVal) => {
    subtotal += totalVal.price;
  });
  subtotal = parseFloat(Math.round(subtotal * 100) / 100);
  settingPrices();
};

// Getting variables and HTML classes to put price information on the
// checkout screen.
let tax = 0;
let total = 0;
const subtotalListing = document.querySelectorAll(".subtotal-p");
const taxListing = document.querySelectorAll(".tax-p");
const totalListing = document.querySelectorAll(".total-p");

// Creating the format of how the prices are being set up. Starting with
// subtotal, tax, then total.
const settingPrices = () => {
  tax = subtotal * 0.06;
  total = tax + subtotal;
  subtotalListing.forEach(
    (listing) => (listing.textContent = `$${subtotal.toFixed(2)}`)
  );
  taxListing.forEach((listing) => (listing.textContent = `$${tax.toFixed(2)}`));
  totalListing.forEach(
    (listing) => (listing.textContent = `$${total.toFixed(2)}`)
  );
};

const displayOff = document.querySelector(".display-options-off");
const pickupOrderContainer = document.querySelector(".pick-up-order-container");
const payWithCardContainer = document.querySelector(".pay-with-card-container");
const payWithCashContainer = document.querySelector(".pay-with-cash-container");
const recieptDisplayContainer = document.querySelector(
  ".receipt-display-container"
);
const cartItemsContainer = document.querySelector(".cart-items-container");
const cashForm = document.querySelector(".cash-form");

// card form values
const cardInputs = [...document.querySelectorAll(".card-payment-form input")];

viewCart.addEventListener("click", (e) => {
  if (
    subtotal > 0 &&
    (e.target.classList.contains("pay-with-card") ||
      e.target.classList.contains("pay-with-cash"))
  ) {
    const removeBtns = document.querySelectorAll(".remove-Btn");
    if (e.target.classList.contains("pay-with-card")) {
      payWithCardContainer.classList.remove("display-options-off");
      pickupOrderContainer.classList.add("display-options-off");
      removeBtns.forEach((btn) => btn.classList.add("display-options-off"));
    } else if (e.target.classList.contains("pay-with-cash")) {
      payWithCashContainer.classList.remove("display-options-off");
      pickupOrderContainer.classList.add("display-options-off");
      removeBtns.forEach((btn) => btn.classList.add("display-options-off"));
    }
  }

  if (e.target.id === "close-btn") {
    const removeBtns = document.querySelectorAll(".remove-Btn");
    if (!recieptDisplayContainer.classList.contains("display-options-off")) {
      checkOut.splice(0, checkOut.length);
      itemAmountNumber.textContent = checkOut.length;
      calculateTotal();
      cartItemsContainer.classList.remove("display-options-off");
      const elementLocationIndex =
        document.querySelectorAll(".item-in-checkout");
      elementLocationIndex.forEach((list) => list.remove());
    }
    recieptDisplayContainer.classList.add("display-options-off");
    payWithCardContainer.classList.add("display-options-off");
    payWithCashContainer.classList.add("display-options-off");
    pickupOrderContainer.classList.remove("display-options-off");
    removeBtns.forEach((btn) => btn.classList.remove("display-options-off"));
  }
});

payWithCardContainer.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("card-pay-btn")) {
    const valuesEnteredCorrectly = cardInputs.some(
      (input) => String(input.value).length > 0
    );
    if (valuesEnteredCorrectly) {
      displayRecieptCard();
    }
  } else if (
    e.target.classList.contains("apple-pay") ||
    e.target.classList.contains("google-pay")
  ) {
    displayRecieptCard();
  }
});

const displayRecieptCard = () => {
  recieptDisplayContainer.classList.remove("display-options-off");
  cartItemsContainer.classList.add("display-options-off");
  payWithCardContainer.classList.add("display-options-off");
  receieptItemsDisplay();
};

let finishPayment = false;

payWithCashContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("finish-cash-btn") && finishPayment) {
    recieptDisplayContainer.classList.remove("display-options-off");
    cartItemsContainer.classList.add("display-options-off");
    payWithCashContainer.classList.add("display-options-off");
    finishPayment = false;
    receieptItemsDisplay();
  }
});

const depositedMoney = document.querySelector(".cash-deposited");
const cashBack = document.querySelector(".cash-back");
const cashAmountText = document.querySelector(".cash-amount-text");

cashForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const depositedAmount = parseFloat(
    document.querySelector("#cash-amount").value
  );
  depositedMoney.textContent = `$${depositedAmount.toFixed(2)}`;
  if (depositedAmount > total) {
    cashBack.textContent = `$${(depositedAmount - parseFloat(total)).toFixed(
      2
    )}`;
    cashAmountText.style.color = "#8f8f8f";
    finishPayment = true;
  } else {
    cashAmountText.style.color = "red";
  }
});

const recieptNum = document.querySelector(".recipet-number");
const recieptDate = document.querySelector(".reciept-date");
const recieptWorker = document.querySelector(".reciept-served-by");
const recieptNumTrans = document.querySelector(".recipet-number-trans");
const recieptDateTrans = document.querySelector(".reciept-date-trans");

const receieptItemsDisplay = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  recieptListContainer.append(cartItemContainer.cloneNode(true));
  recieptNum.textContent = Math.floor(Math.random() * 100000 + 1);
  recieptDate.textContent = `${month}/${day}/${year}`;
  recieptWorker.textContent = `id${Math.floor(Math.random() * 100000 + 1)}`;
  recieptNumTrans.textContent = recieptNum.textContent;
  recieptDateTrans.textContent = recieptDate.textContent;
};
