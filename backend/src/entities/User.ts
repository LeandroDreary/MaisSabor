import { Schema } from "mongoose";

export type UserSchemaT = {
  _id?: Schema.Types.ObjectId;
  username?: string;
  image?: string;
  password?: string;
  link?: string;
};

class UserEntity {
  readonly _id?: Schema.Types.ObjectId;
  readonly username?: string;
  readonly image?: string;
  readonly password?: string;
  readonly link?: string;

  constructor({_id, username, image, password, link}: UserSchemaT){
    this._id = _id
    this.username = username
    this.image = image || ""
    this.password = password
    this.link = link
  }
}

export default UserEntity;
