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

const addButton = "assets/icons/add.button.svg";

// ourDrinks[0][0]
window.addEventListener("load", (e) => {
  dripsItems.forEach((item, i) => {
    const categoryDrinks =
      i === 0
        ? ".fancy-drinks-list"
        : i === 1
        ? ".hot-drinks-list"
        : ".cold-drinks-list";
    const dripsContainer = document.querySelector(categoryDrinks);
    console.log(categoryDrinks);
    item.forEach((objItem) => {
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

      name.textContent = objItem.name;
      addImage.setAttribute("src", addButton);
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

// let counter = 0;
// const button = document.querySelectorAll(".add-button");
// console.log(button);

// button.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     counter++;
//     console.log(counter);
//   });
// });
