import express from "express";
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
  app.use(userRoutes);
  app.use(companiesRoutes)
  app.use(categoriesRoutes);
  app.use(productsRoutes);
  app.use(paymentMethodsRoutes);
  app.use(orderRoutes);
}