import express  from "express";
import { createCategory, getAllCategories, deleteCategory, updateCategory } from '../controllers/category-controller';
import { authenticationMiddleware } from "../middleware";

const categoryRoutes = express.Router();

categoryRoutes.use(authenticationMiddleware);

categoryRoutes.route("/").get(getAllCategories);

categoryRoutes.route("/create").post(createCategory);

categoryRoutes.route("/:id").delete(deleteCategory);

categoryRoutes.route("/update").patch(updateCategory)

export default categoryRoutes

