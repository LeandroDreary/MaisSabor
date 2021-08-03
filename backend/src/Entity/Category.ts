import { Schema } from "mongoose";
import { Product } from "../Model/ProductModel";
import ConvertId from "../utils/ConvertId";

export type CategoryModelT = {
    _id?: Schema.Types.ObjectId;
    name: string;
};

class CategoryEntity {
    readonly _id?: Schema.Types.ObjectId;

    readonly name: string;

    async applyToDelete() {
        // Verify if there is an id to delete
        if (!this?._id) throw new Error("category/id-not-located")
        // Verify if there any product related to this category
        let categories = await Product.find({ category: this._id }).exec()
        if (categories.length > 0) throw new Error("category/delete/there-are-products")
    }

    constructor({ _id, name }: { _id?: string, name: string }) {
        if (name.length < 3)
            throw new Error("category/invalid-name-length")
        if (_id)
            this._id = ConvertId(_id);

        this.name = name;
    }
}

export default CategoryEntity;