import { Types } from "mongoose";

export type ProductModelT = {
    _id?: Types.ObjectId;
    name: string;
    image: string;
    deleteImageUrl: string;
    category: Types.ObjectId;
    price: number;
    description: string;
};

class ProductEntity {
    readonly _id?: Types.ObjectId;

    readonly name: string;

    readonly image: string;

    readonly deleteImageUrl: string;

    readonly category: Types.ObjectId;

    readonly price: number;

    readonly description: string;

    constructor({ _id, name, price, image, deleteImageUrl, description, category }: { _id?: string, name: string, image: string, deleteImageUrl: string, price: number, description: string, category: string }) {
        if (name.length < 3)
            throw new Error("products/invalid-name-length")
        if (_id)
            this._id = Types.ObjectId(_id);

        this.category = Types.ObjectId(category);

        this.name = name;
        this.image = image;
        this.deleteImageUrl = deleteImageUrl;
        this.price = price;
        this.description = description;
    }
}

export default ProductEntity;