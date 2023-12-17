import express  from "express";
import { createCategory, getAllCategories } from '../controllers/category-controller';
import { authenticationMiddleware } from "../middleware";

const categoryRoutes = express.Router();

categoryRoutes.use(authenticationMiddleware);

categoryRoutes.route("/").get(getAllCategories);

categoryRoutes.route("/create").post(createCategory);

export default categoryRoutes

