import express from "express";
import { userRoutes } from "./users.route.js";
import { authRoute } from "./auth.route.js";
import { companiesRoutes } from "./companies.route.js";

export const routes = (app: express.Express) => {
  app.use(express.json({ limit: '5mb' }));
  app.use(authRoute);
  app.use(userRoutes);
  app.use(companiesRoutes)
}