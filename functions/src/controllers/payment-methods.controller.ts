import { Request, Response } from "express";
import { PaymentMethod } from "../models/payment-method.model.js";
import { PaymentMethodService } from "../services/payment-method.service.js";

export class PaymentMethodsController {
  static async getAll(req: Request, res: Response) {
    // #swagger.tags = ['PaymentMethods']
    // #swagger.summary = 'Endpoint para listar todas as formas de pagamento'
    // #swagger.description = 'Endpoint para obter uma lista de todas as formas de pagamento cadastradas no sistema.'
    res.send(await new PaymentMethodService().getAll());
  }

  static async getById(req: Request, res: Response) {
    const paymentMethodId = req.params.id;
    // #swagger.tags = ['PaymentMethods']
    // #swagger.summary = 'Endpoint para obter uma forma de pagamento pelo id'
    // #swagger.description = 'Endpoint para obter os detalhes de uma forma de pagamento específica usando seu ID.'
    res.send(await new PaymentMethodService().getById(paymentMethodId));
  }

  static async save(req: Request, res: Response) {
    // #swagger.tags = ['PaymentMethods']
    // #swagger.summary = 'Endpoint para adicionar uma nova forma de pagamento'
    // #swagger.description = 'Endpoint para criar uma nova forma de pagamento no sistema.'
    /*
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/addPaymentMethod"
            }  
          }
        }
      }
    */
    await new PaymentMethodService().save(req.body);
    res.status(201).send({
      message: "Forma de pagamento criada com sucesso"
    });
  }

  static async update(req: Request, res: Response) {
    const paymentMethodId = req.params.id;
    const paymentMethod = req.body as PaymentMethod;
    // #swagger.tags = ['PaymentMethods']
    // #swagger.summary = 'Endpoint para atualizar uma forma de pagamento existente'
    // #swagger.description = 'Endpoint para atualizar os detalhes de uma forma de pagamento existente no sistema.'
    /*
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/updatePaymentMethod"
            }  
          }
        }
      }
    */
    await new PaymentMethodService().update(paymentMethodId, paymentMethod);

    res.send({
      message: "Forma de pagamento atualizada com sucesso"
    });
  }

  static async delete(req: Request, res: Response) {
    const paymentMethodId = req.params.id;
    // #swagger.tags = ['PaymentMethods']
    // #swagger.summary = 'Endpoint para deletar uma forma de pagamento'
    // #swagger.description = 'Endpoint para remover uma forma de pagamento do sistema.'
    await new PaymentMethodService().delete(paymentMethodId);
    res.status(204).end();
  }
}