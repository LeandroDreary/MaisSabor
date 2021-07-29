import { Schema } from "mongoose";
import ConvertId from "../utils/ConvertId";

export type CategoryModelT = {
    _id?: Schema.Types.ObjectId;
    name: string;
};

class UserEntity {
    readonly _id?: Schema.Types.ObjectId;

    readonly name: string;

    constructor({ _id, name }: { _id?: string, name: string }) {
        if (name.length < 3)
            throw new Error("category/invalid-name-length")
        if (_id)
            this._id = ConvertId(_id);

        this.name = name;
    }
}

export default UserEntity;