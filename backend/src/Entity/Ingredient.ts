import { Types } from "mongoose";
import { Product } from "../Model/ProductModel";

export type IngredientModelT = {
    _id?: Types.ObjectId;
    name: string;
    description?: string;
    active: boolean;
};

class IngredientEntity {
    readonly _id?: Types.ObjectId;

    readonly name: string;

    readonly description: string;

    readonly active: boolean;

    async applyToDelete() {
        // Verify if there is an id to delete
        if (!this?._id) throw new Error("ingredient/id-not-found")
        // Verify if there any product related to this ingredient
        let ingredients = await Product.find({ ingredients: { "$in": [this._id] } }).exec()
        if (ingredients.length > 0) throw new Error("ingredient/delete/there-are-products")
    }

    constructor({ _id, name, description, active }: Omit<IngredientModelT, "active"> & { _id?: string, active?: boolean }) {
        if (name.length < 3)
            throw new Error("ingredient/invalid-name-length")
        if (_id)
            this._id = Types.ObjectId(_id);

        this.active = active ?? false;
        this.description = description ?? "";
        this.name = name;
    }
}

export default IngredientEntity;