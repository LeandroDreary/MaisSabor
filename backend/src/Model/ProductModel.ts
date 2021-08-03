import mongoose from "mongoose";
import { ProductModelT } from "../Entity/Product";
import { ProductSchema } from "../Schemas/ProductSchema";

export let ProductModel = () => {
  try {
    return mongoose.model<ProductModelT>("products");
  } catch (error) {
    return mongoose.model<ProductModelT>("products", ProductSchema);
  }
};

export const Product = ProductModel();
