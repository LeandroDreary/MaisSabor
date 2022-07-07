import mongoose from "mongoose";
import { IngredientModelT } from "../Entity/Ingredient";
import { IngredientSchema } from "../Schemas/IngredientSchema";

export let IngredientModel = () => {
  try {
    return mongoose.model<IngredientModelT>("ingredients");
  } catch (error) {
    return mongoose.model<IngredientModelT>("ingredients", IngredientSchema);
  }
};

export const Ingredient = IngredientModel();
