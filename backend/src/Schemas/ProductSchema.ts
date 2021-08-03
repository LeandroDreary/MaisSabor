import { Schema } from "mongoose";

export let ProductSchema = new Schema({
    name: { type: String },
    description: { type: String },
    category: { type: Schema.Types.ObjectId },
    price: { type: Number }
});
