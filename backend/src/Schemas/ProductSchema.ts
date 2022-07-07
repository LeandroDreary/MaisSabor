import { Schema } from "mongoose";

export let ProductSchema = new Schema({
    name: { type: String },
    image: { type: String },
    deleteImageUrl: { type: String },
    description: { type: String },
    category: { type: Schema.Types.ObjectId },
    ingredients: [{ type: Schema.Types.ObjectId }],
    price: { type: Number },
    active: { type: Boolean }
});
