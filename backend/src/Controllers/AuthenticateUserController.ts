import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";
import { ShowloggedUserService } from "../services/ShowloggedUserService";

class AuthenticateUserController {
  async post(request: Request, response: Response) {
    const { username, email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const token = await authenticateUserService.execute({ username, email, password })

    return response.json({ token })
  }

  async get(request: Request, response: Response) {
    const showloggedUserService = new ShowloggedUserService();

    const { user_id } = request;

    const user = await showloggedUserService.execute(user_id);

    return response.json({ user });
  }
}

export { AuthenticateUserController };