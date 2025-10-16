import express from "express";
import { userRoutes } from "./users.route";
import { authRoute } from "./auth.route";

export const routes = (app: express.Express) => {
  app.use(express.json());
  app.use(authRoute);
  app.use(userRoutes);
}