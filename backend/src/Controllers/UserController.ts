import { Request, Response } from "express";
import UserEntity from "../entities/User";
import { User } from "../models/UserModel";
import DbConnect from "../utils/dbConnect";

class UserController {
  async get(request: Request, response: Response) {
    const { id } = request.query;
    await DbConnect();

    new UserEntity({
      username: "",
      image: "",
      password: "",
      link: "",
    });

    new User();

    return response.send({ bom: "dia" });
  }

  async post(request: Request, response: Response) {
    const { username, password, link } = request.body;
    await DbConnect();

    const user = new UserEntity({
      username,
      password,
      link,
    });

    const postUser = new User(user);

    postUser.save();

    return response.send({ user: postUser.toJSON() });
  }
}

export { UserController };
