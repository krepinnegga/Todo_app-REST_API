import express  from "express";
import { createCategory, getAllCategories, deleteCategory, updateCategory, getCategoryById } from '../controllers/category-controller';
import { authenticationMiddleware } from "../middleware";

const categoryRoutes = express.Router();

categoryRoutes.use(authenticationMiddleware);

categoryRoutes.route("/").get(getAllCategories);

categoryRoutes.route("/:id").get(getCategoryById)

categoryRoutes.route("/create").post(createCategory);

categoryRoutes.route("/:id").delete(deleteCategory);

categoryRoutes.route("/update").put(updateCategory);

export default categoryRoutes

