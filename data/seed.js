import { db } from "../firebase.js";

import {
  doc,
  setDoc
} from "firebase/firestore";

import { products } from "./catalogo.js";

products.forEach(async (product) => {
  try {

    await setDoc(
      doc(db, "products", product.id),
      product
    );

    console.log(
      `Product ${product.name} added successfully!`
    );

  } catch (error) {

    console.error(
      "Error adding product: ",
      error
    );

  }
});

