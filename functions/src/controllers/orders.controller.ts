import { Request, Response } from "express";
import { Order, QueryParamsOrder } from "../models/order.model.js";
import { OrderService } from "../services/order.service.js";

export class OrdersController {
  static async save(req: Request, res: Response) {
    const order = new Order(req.body);
    await new OrderService().save(order);
    
    res.status(201).send({
      message: "Pedido salvo com sucesso"
    });
  }

  static async search(req: Request, res: Response) {
    const orders = await new OrderService().search(req.query as QueryParamsOrder);
    res.send(orders);
  }

  static async getOrderItems(req: Request, res: Response) {
    const orderId = req.params.id;
    const items = await new OrderService().getOrderItems(orderId);
    res.send(items);
  }

  static async getById(req: Request, res: Response) {
    res.send(await new OrderService().getById(req.params.id));
  }

  static async changeStatus(req: Request, res: Response) {
    const orderId = req.params.id;
    const status = req.body.status;
    await new OrderService().changeStatus(orderId, status);
    res.status(204).end();
  }
}