import { Router } from "express";
import { UserController } from "./Controllers/UserController";
import { CategoryController } from "./Controllers/CategoryController";

const router = Router();

// Declaring the controllers
const userController = new UserController();
const categoryController = new CategoryController();

// User routes
router.get("/users", userController.get);
router.post("/users", userController.post);

// User routes
router.get("/categories/list", categoryController.query);
router.get("/categories", categoryController.get);
router.post("/categories", categoryController.post);
router.put("/categories", categoryController.update);
router.delete("/categories", categoryController.delete);

export { router };