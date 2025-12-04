import { Request, Response } from "express";
import { Order, QueryParamsOrder } from "../models/order.model.js";
import { OrderService } from "../services/order.service.js";

export class OrdersController {
  static async save(req: Request, res: Response) {
    // #swagger.tags = ['Orders']
    // #swagger.summary = 'Endpoint para salvar um novo pedido'
    // #swagger.description = 'Endpoint para criar um novo pedido no sistema.'
    /*
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/addOrder"
            }  
          }
        }
      }
    */
    const order = new Order(req.body);
    await new OrderService().save(order);
    
    res.status(201).send({
      message: "Pedido salvo com sucesso"
    });
  }

  static async search(req: Request, res: Response) {
    // #swagger.tags = ['Orders']
    // #swagger.summary = 'Endpoint para buscar pedidos'
    // #swagger.description = 'Endpoint para buscar pedidos com base em parâmetros de consulta.'
    /* #swagger.parameters['$ref'] = [
        '#components/parameters/empresaId', 
        '#components/parameters/dataInicio',
        '#components/parameters/dataFim',
        '#components/parameters/orderStatus'
      ]
    */
    const orders = await new OrderService().search(req.query as QueryParamsOrder);
    res.send(orders);
  }

  static async getOrderItems(req: Request, res: Response) {
    // #swagger.tags = ['Orders']
    // #swagger.summary = 'Endpoint para obter itens de um pedido'
    // #swagger.description = 'Endpoint para obter os itens associados a um pedido específico.'
    const orderId = req.params.id;
    const items = await new OrderService().getOrderItems(orderId);
    res.send(items);
  }

  static async getById(req: Request, res: Response) {
    // #swagger.tags = ['Orders']
    // #swagger.summary = 'Endpoint para obter um pedido pelo id'
    // #swagger.description = 'Endpoint para obter os detalhes de um pedido específico usando seu ID.'
    res.send(await new OrderService().getById(req.params.id));
  }

  static async changeStatus(req: Request, res: Response) {
    const orderId = req.params.id;
    const status = req.body.status;
    // #swagger.tags = ['Orders']
    // #swagger.summary = 'Endpoint para alterar o status de um pedido'
    // #swagger.description = 'Endpoint para atualizar o status de um pedido específico no sistema.'
    /*
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/updateOrderStatus"
            }  
          }
        }
      }
    */
    await new OrderService().changeStatus(orderId, status);
    res.status(204).end();
  }
}