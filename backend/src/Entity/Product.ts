import { Types } from "mongoose";
import { Category } from "../Model/CategoryModel";
import { Product } from "../Model/ProductModel";
import dbConnect from "../utils/dbConnect";

export type ProductModelT = {
    _id?: Types.ObjectId;
    name: string;
    image?: string;
    deleteImageUrl?: string;
    category: Types.ObjectId;
    price: number;
    description: string;
    ingredients: Types.ObjectId[];
};

class ProductEntity {
    readonly _id?: Types.ObjectId;

    readonly name: string;

    readonly category: Types.ObjectId;

    readonly price: number;

    readonly description: string;

    readonly ingredients: Types.ObjectId[];

    image?: string;

    deleteImageUrl?: string;

    async validate({ type }: { type: "create" | "edit" }) {
        // Connect to the database
        await dbConnect()

        if (this.name.length < 3) throw new Error("product/name/must-be-3-of-length")

        if (!(await Category.findById(this.category).exec())) throw new Error("category/not-found")

        // Validating id in case is editing informations
        if (type === "edit") {
            if (!this?._id) throw new Error("product/id/invalid-id")

            if (!(await Product.findById(this._id).exec())) throw new Error("product/not-found")
        }
    }

    constructor({ _id, name, price, image, deleteImageUrl, description, category, ingredients }: Omit<ProductModelT, "category" | "_id" | "ingredients"> & { _id?: string, category: string, ingredients: string[] }) {
        if (_id)
            this._id = Types.ObjectId(_id);

        this.category = Types.ObjectId(category);
        this.ingredients = ingredients.map(ingredient => Types.ObjectId(ingredient));

        this.name = name;
        this.image = image;
        this.deleteImageUrl = deleteImageUrl;
        this.price = price;
        this.description = description;
    }
}

export default ProductEntity;