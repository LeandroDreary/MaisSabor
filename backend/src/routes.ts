import { Router } from "express";
import { AuthenticateUserController } from "./Controllers/AuthenticateUserController";
import { UserController } from "./Controllers/UserController";
import { CategoryController } from "./Controllers/CategoryController";
import { ProductController } from "./Controllers/ProductController";
import { ensureAdminAuthenticated, ensureAuthenticated } from "./middlewares/ensureAutenticated";

const router = Router();

// Declaring the controllers
const authenticateUserController = new AuthenticateUserController();
const userController = new UserController();
const productController = new ProductController();
const categoryController = new CategoryController();

// Auth routes
router.post("/login", authenticateUserController.post);
router.get("/login", ensureAuthenticated, authenticateUserController.get);

// User routes
router.get("/users/list", userController.list);
router.get("/users", userController.get);
router.post("/users", userController.post);
router.put("/users", ensureAuthenticated, userController.update);
router.delete("/users", ensureAuthenticated, userController.delete);

// User routes
router.get("/products/list", productController.query);
router.get("/products", productController.get);
router.post("/products", ensureAdminAuthenticated, productController.post);
router.put("/products", ensureAdminAuthenticated, productController.update);
router.delete("/products", ensureAdminAuthenticated, productController.delete);

// Categories routes
router.get("/categories/list", categoryController.query);
router.get("/categories", categoryController.get);
router.post("/categories", ensureAdminAuthenticated, categoryController.post);
router.put("/categories", ensureAdminAuthenticated, categoryController.update);
router.delete("/categories", ensureAdminAuthenticated, categoryController.delete);

export { router };