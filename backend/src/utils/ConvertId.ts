import { Schema } from "mongoose";

export default (_id: string) => {
    if (typeof _id !== 'string' || !_id || _id.length !== 12)
        throw new Error("ids/invalid-id")
    return new Schema.Types.ObjectId(_id)
}