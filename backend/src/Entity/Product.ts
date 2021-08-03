import { Schema } from "mongoose";
import ConvertId from "../utils/ConvertId";

export type ProductModelT = {
    _id?: Schema.Types.ObjectId;
    name: string;
    image: string;
    category: Schema.Types.ObjectId;
    price: number;
    description: string;
};

class ProductEntity {
    readonly _id?: Schema.Types.ObjectId;

    readonly name: string;

    readonly image: string;

    readonly category: Schema.Types.ObjectId;

    readonly price: number;

    readonly description: string;

    constructor({ _id, name, price, image, description, category }: { _id?: string, name: string, image: string, price: number, description: string, category: string }) {
        if (name.length < 3)
            throw new Error("products/invalid-name-length")
        if (_id)
            this._id = ConvertId(_id);

        this.category = ConvertId(category);
        
        this.name = name;
        this.image = image;
        this.price = price;
        this.description = description;
    }
}

export default ProductEntity;