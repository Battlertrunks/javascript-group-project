"use strict";

const dripsItems = [
  [
    {
      image: "./assets/Coffee-images/macchiato.jpeg",
      name: "driptastic macchiato",
      description: "A rich espresso dressed in foam",
      price: 2.99,
    },
    {
      image: "./assets/Coffee-images/frappe.jpeg",
      name: "drippy pour-over",
      description: "Espresso and coffee mixed to perfection on ice",
      price: 4.99,
    },
  ],
  [
    {
      image: "./assets/Coffee-images/hot-brew.jpeg",
      name: "house brew",
      description: "Our flagship coffee using our in house grounds",
      price: 1.99,
    },
    {
      image: "./assets/Coffee-images/espresso.jpeg",
      name: "espresso",
      description: "Full bodied espresso sold by the shot",
      price: 2.99,
    },
    {
      image: "./assets/Coffee-images/cappuccino.jpeg",
      name: "cappuccino",
      description: "A dark espresso covered in a thick milk foam",
      price: 2.99,
    },
    {
      image: "./assets/Coffee-images/latte.jpeg",
      name: "caffe latte",
      description: "Rich boldness and balance in an espresso",
      price: 3.29,
    },
  ],
  [
    {
      image: "./assets/Coffee-images/cold-brew.jpeg",
      name: "cold brew",
      description: "Our house brew on the rocks",
      price: 1.99,
    },
    {
      image: "./assets/Coffee-images/iced-americano.jpeg",
      name: "iced americano",
      description: "A bold espresso stretched and chilled to perfection",
      price: 3.59,
    },
    {
      image: "./assets/Coffee-images/iced-mocha.jpeg",
      name: "iced mocha",
      description: "A classic chocolate staple with added cream on ice",
      price: 4.59,
    },
    {
      image: "./assets/Coffee-images/iced-chai-tea-latte.jpeg",
      name: "iced chai tea latte",
      description: "A balance between savory and sweet",
      price: 2.59,
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
      const fancyCoffeeImage = document.createElement("img");
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
      button.setAttribute("class", "add-button");
      fancyCoffeeImage.setAttribute("src", objItem.image);
      description.textContent = objItem.description;
      price.textContent = `$${objItem.price}`;

      button.append(addImage);
      itemContainer.append(imageContainer, name, description, price, button);
      imageContainer.append(fancyCoffeeImage);
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
header.addEventListener("click", (e) => {
  if (e.target.id === "shopping-cart-icon") {
    viewCart.style.display = "block";
    viewCart.classList.add("slide-effect");
    body.classList.add("body-scroll-off");
  }
});

const cartItemContainer = document.querySelector(".cart-items-container");
let subtotal = 0;

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
  price.textContent = checkOut[checkOut.length - 1].price;
  remove.textContent = "remove";
  remove.setAttribute("class", "remove-Btn");

  detailsHolder.append(itemHeading, price, remove);
  listItem.append(previewImage, detailsHolder);
  cartItemContainer.appendChild(listItem);

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
const subtotalListing = document.querySelectorAll(".subtotal-p");
const taxListing = document.querySelectorAll(".tax-p");
const totalListing = document.querySelectorAll(".total-p");

// Creating the format of how the prices are being set up. Starting with
// subtotal, tax, then total.
const settingPrices = () => {
  tax = subtotal * 0.06;
  subtotalListing.forEach(
    (listing) => (listing.textContent = `$${subtotal.toFixed(2)}`)
  );
  taxListing.forEach((listing) => (listing.textContent = `$${tax.toFixed(2)}`));
  totalListing.forEach(
    (listing) => (listing.textContent = `$${(tax + subtotal).toFixed(2)}`)
  );
};

viewCart.addEventListener("click", (e) => {
  if (e.target.classList.contains("pay-with-card")) {
  }
});
