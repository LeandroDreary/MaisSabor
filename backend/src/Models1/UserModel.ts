import mongoose from "mongoose";
import { UserModelT } from "../Entities/User";
import { UserSchema } from "../Schemas/UserSchema";

export let UserModel = () => {
  try {
    return mongoose.model<UserModelT>("users");
  } catch (error) {
    return mongoose.model<UserModelT>("users", UserSchema);
  }
};

export const User = UserModel();
