import mongoose, { Schema } from "mongoose";
import { UserSchemaT } from "../entities/User";


let UserSchema = new Schema({
  username: { type: String, unique: true },
  image: { type: String },
  password: { type: String },
  link: { type: String, unique: true },
});

export let UserModel = () => {
  try {
    return mongoose.model<UserSchemaT>("users");
  } catch (error) {
    return mongoose.model<UserSchemaT>("users", UserSchema);
  }
};

export const User = UserModel();
