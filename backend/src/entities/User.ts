import { Schema } from "mongoose";
import { User } from "../Models1/UserModel";
import dbConnect from "../utils/dbConnect";

export type UserModelT = {
  _id?: Schema.Types.ObjectId;
  username: string;
  email: string;
  profilePicture?: string;
  password: string;
};

class UserEntity {
  readonly _id?: Schema.Types.ObjectId;

  readonly username: string;

  readonly email: string;

  readonly profilePicture?: string;

  readonly password: string;

  // Validation function
  async validate() {
    // Connect to the database
    await dbConnect()

    // Verify if the username is already in use
    if (!this._id)
      if ((await User.find({ _id: { $ne: this._id }, username: this.username }).exec()).length > 0)
        throw new Error("users/username-already-exist")
  }

  constructor({ _id, username, email, profilePicture, password }: UserModelT) {
    this._id = _id;
    this.email = email;
    this.username = username;
    this.profilePicture = profilePicture;
    this.password = password;
  }
}

export default UserEntity;
