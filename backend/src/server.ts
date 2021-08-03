import express, { NextFunction, Request, Response } from "express"
import "express-async-errors"
import { GetError } from "./lang/index"
import { router } from "./routes"

const app = express();

app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      // Get error translated to the language you want
      const error: { message: string, status: number } | undefined = GetError(process.env.LANGUAGE, err.message)
      // If found the error
      if (error)
        return response.status(error.status).json({ code: err.message, message: error.message });

      return response.status(400).json({ message: err.message });
    }
    return next(response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    }));

  }
);

app.listen("3333", () => {
  console.log("Server is running.");
});
