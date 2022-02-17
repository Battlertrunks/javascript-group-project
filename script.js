"use strict";

const fancyDripsItems = [
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
];

const dripsContainer = document.querySelector(".drips-container");

window.addEventListener("load", (e) => {
  fancyDripsItems.forEach((item) => {
    const itemContainer = document.createElement("li");
    const imageContainer = document.createElement("div");
    const fancyCoffeeImage = document.createElement("img");
    const name = document.createElement("h4");
    const description = document.createElement("p");
    const price = document.createElement("p");
    itemContainer.classList.add("item-container");
    imageContainer.classList.add("img-container");
    description.classList.add("descrip-text");
    price.classList.add("price-text");

    name.textContent = item.name;
    fancyCoffeeImage.setAttribute("src", item.image);
    description.textContent = item.description;
    price.textContent = item.price;

    itemContainer.append(imageContainer, name, description, price);
    imageContainer.append(fancyCoffeeImage);
    dripsContainer.append(itemContainer);
  });
});
