import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";

const productsCollection = collection(db, "products");

export const getProducts = async () => {
  try {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const snapshot = await getDocs(productsCollection);
    const product = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .find((product) => product.id === id);
    return product || null;
  } catch (error) {
    console.error("Error fetching product by ID: ", error);
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((product) => product.category === category);
  } catch (error) {
    console.error("Error fetching products by category: ", error);
    throw error;
  }
};

export const getProductsByBrand = async (brand) => {
  try {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((product) => product.brand === brand);
  } catch (error) {
    console.error("Error fetching products by brand: ", error);
    throw error;
  }
};

export const getProductsByPriceRange = async (minPrice, maxPrice) => {
  try {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter(
        (product) =>
          product.price >= minPrice && product.price <= maxPrice
      );
  } catch (error) {
    console.error("Error fetching products by price range: ", error);
    throw error;
  }
};

