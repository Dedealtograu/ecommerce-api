import express from "express";
import { CompaniesController } from "../controllers/companies.controller.js";
import asyncHandler from "express-async-handler"; 
import { celebrate, Segments } from "celebrate";
import { companySchema } from "../models/company.model.js";

export const companiesRoutes = express.Router();

companiesRoutes.get("/companies", asyncHandler(CompaniesController.getAll));
companiesRoutes.get("/companies/:id", asyncHandler(CompaniesController.getById));
companiesRoutes.post("/companies",
  celebrate({ [Segments.BODY]: companySchema }),
  asyncHandler(CompaniesController.save));
companiesRoutes.put("/companies/:id",
  celebrate({ [Segments.BODY]: companySchema }),
  asyncHandler(CompaniesController.update));