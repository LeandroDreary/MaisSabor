import { Request, Response } from "express";
import { ObjectID } from "mongodb";
import ConvertId from "../utils/ConvertId";
import UserEntity from "./../Entities/User";
import { User } from "./../Models1/UserModel";
import DbConnect from "./../utils/dbConnect";

class UserController {
  async get(request: Request, response: Response) {
    const { _id } = request.query;

    // Connect to the database
    await DbConnect();

    // Verify if the data is valid
    if (typeof _id === "string") {
      const user = await User.findOne(ConvertId(_id)).exec()
      
      // Verifiy if found the user
      if (user)
        return response.send({ user: user.toJSON() });
      else
        throw new Error("users/not-found")
    }

    throw new Error("users/invalid-informations")
  }

  async post(request: Request, response: Response) {
    const { username, password, email } = request.body;

    // Connect to the database
    await DbConnect();

    const user = new UserEntity({
      username,
      password,
      email
    });

    // Validating the informations
    await user.validate()

    // Creating the schema
    const postUser = new User(user);

    // Saving the informations
    await postUser.save();

    // Return the data
    return response.send({ user: postUser.toJSON() });
  }
}

export { UserController };
