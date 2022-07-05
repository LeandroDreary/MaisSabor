import { Schema } from "mongoose";
import { User } from "../Model/UserModel";
import dbConnect from "../utils/dbConnect";

export type UserModelT = {
  _id?: Schema.Types.ObjectId;
  username: string;
  email: string;
  profilePicture?: string;
  password: string;
  link: string;
  admin?: boolean;
};

class UserEntity {
  readonly _id?: Schema.Types.ObjectId;

  readonly username: string;

  readonly email: string;

  readonly profilePicture?: string;

  readonly link: string;

  password: string;

  readonly admin?: boolean;

  // Validation function
  async validate() {
    // Connect to the database
    await dbConnect()

    if (!this._id) {
      // Verify if the username is already in use
      if ((await User.find({ _id: { $ne: this._id }, username: this.username }).exec()).length > 0)
        throw new Error("users/username-already-exist")

      // Verify if the email is already in use
      if ((await User.find({ _id: { $ne: this._id }, email: this.email }).exec()).length > 0)
        throw new Error("users/email-already-exist")
    }
  }

  constructor({ _id, username, email, profilePicture, password, link, admin }: UserModelT) {
    this._id = _id;
    this.link = link;
    this.email = email;
    this.admin = admin;
    this.username = username;
    this.password = password;
    this.profilePicture = profilePicture;
  }
}

export default UserEntity;
