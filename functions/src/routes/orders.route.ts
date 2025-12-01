import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import { changeStatusOrderSchema, orderSchema, searchOrderSchema } from "../models/order.model.js";
import expressAsyncHandler from "express-async-handler";
import { OrdersController } from "../controllers/orders.controller.js";

export const orderRoutes = Router();

orderRoutes.post("/orders", celebrate({ [Segments.BODY]: orderSchema }),
  expressAsyncHandler(OrdersController.save));

orderRoutes.get("/orders", celebrate({ [Segments.QUERY]: searchOrderSchema}),
  expressAsyncHandler(OrdersController.search));

orderRoutes.get("/orders/:id/itens", expressAsyncHandler(OrdersController.getOrderItems));

orderRoutes.get("/orders/:id", expressAsyncHandler(OrdersController.getById));

orderRoutes.post("/orders/:id/status",
  celebrate({ [Segments.BODY]: changeStatusOrderSchema }), 
  expressAsyncHandler(OrdersController.changeStatus)
);