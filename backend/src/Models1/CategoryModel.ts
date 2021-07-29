import mongoose from "mongoose";
import { CategoryModelT } from "../Entities1/Category";
import { CategorySchema } from "../Schemas/CategorySchema";

export let CategoryModel = () => {
  try {
    return mongoose.model<CategoryModelT>("categories");
  } catch (error) {
    return mongoose.model<CategoryModelT>("categories", CategorySchema);
  }
};

export const Category = CategoryModel();
