import { Router } from "express";
import asyncHandler from "express-async-handler";
import { celebrate, Segments } from "celebrate";
import { CategoriesController } from "../controllers/categories.controller.js";
import { categorySchema, updateCategorySchema } from "../models/category.model.js";

export const categoriesRoutes = Router();

categoriesRoutes.get("/categories", asyncHandler(CategoriesController.getAll));
categoriesRoutes.get("/categories/:id", asyncHandler(CategoriesController.getById));
categoriesRoutes.post("/categories", celebrate({ [Segments.BODY]: categorySchema }), asyncHandler(CategoriesController.save));
categoriesRoutes.put("/categories/:id", celebrate({ [Segments.BODY]: updateCategorySchema }), asyncHandler( CategoriesController.update))
categoriesRoutes.delete("/categories/:id", asyncHandler(CategoriesController.delete));