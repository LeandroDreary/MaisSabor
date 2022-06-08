import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new Error("authentication/not-logged-in")
  }

  const [, token] = authToken.split(" ");
  try {
    const { sub } = verify(token, process.env.JSONWEBTOKEN_DECODE_KEY) as IPayload;

    request.user_id = sub;

    return next();
  } catch (e) {
    throw new Error("authentication/invalid-token")
  }
}