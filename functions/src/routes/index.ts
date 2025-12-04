import express, { Router } from "express";
import { userRoutes } from "./users.route.js";
import { authRoute } from "./auth.route.js";
import { companiesRoutes } from "./companies.route.js";
import { categoriesRoutes } from "./categories.route.js";
import { productsRoutes } from "./products.route.js";
import { paymentMethodsRoutes } from "./payment-methods.route.js";
import { orderRoutes } from "./orders.route.js";
import { allowAnonymousUser } from "../middlewares/allow-anonymous-user.middleware.js";

export const routes = (app: express.Express) => {
  app.use(express.json({ limit: '5mb' }));
  app.use(authRoute);
  app.use(allowAnonymousUser);

  const authenticatedRoutes = Router();
  authenticatedRoutes.use(userRoutes);
  authenticatedRoutes.use(companiesRoutes)
  authenticatedRoutes.use(categoriesRoutes);
  authenticatedRoutes.use(productsRoutes);
  authenticatedRoutes.use(paymentMethodsRoutes);
  authenticatedRoutes.use(orderRoutes);
  app.use(
    // #swagger.security = [{ "bearerAuth": [] }]
    authenticatedRoutes
  );
}