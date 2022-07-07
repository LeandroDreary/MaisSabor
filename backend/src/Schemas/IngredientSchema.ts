import { Schema } from "mongoose";

export let IngredientSchema = new Schema({
    name: { type: String },
    description: { type: String },
    active: { type: Boolean }
});
