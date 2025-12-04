import { Request, Response } from "express";
import { ProductService } from "../services/product.service.js";
import { Product } from "../models/product.model.js";

export class ProductsController {
  static async getAll(req: Request, res: Response) {
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Endpoint para listar todos os produtos'
    // #swagger.description = 'Endpoint para obter uma lista de todos os produtos cadastrados no sistema.'
    res.send(await new ProductService().getAll());
  }

  static async search(req: Request, res: Response) {
    const categoryId = req.query.categoryId as string;
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Endpoint para buscar produtos por categoria'
    // #swagger.description = 'Endpoint para buscar produtos filtrando por categoria específica.'
    res.send(await new ProductService().search(categoryId));
  }

  static async getById(req: Request, res: Response) {
    const productId = req.params.id;
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Endpoint para obter um produto pelo id'
    // #swagger.description = 'Endpoint para obter os detalhes de um produto específico usando seu ID.'
    res.send(await new ProductService().getById(productId));
  }

  static async save(req: Request, res: Response) {
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Endpoint para adicionar um novo produto'
    // #swagger.description = 'Endpoint para criar um novo produto no sistema.'
    /*
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/addProduct"
            }  
          }
        }
      }
    */
    await new ProductService().save(req.body);
    res.status(201).send({ message: "Produto criado com sucesso" });
  }

  static async update(req: Request, res: Response) {
    const productId = req.params.id;
    const product = req.body as Product;
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Endpoint para atualizar um produto existente'
    // #swagger.description = 'Endpoint para atualizar os detalhes de um produto existente no sistema.'
    /*
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/updateProduct"
            }  
          }
        }
      }
    */
    await new ProductService().update(productId, product);

    res.send({ message: "Produto atualizado com sucesso" });
  }

  static async delete(req: Request, res: Response) {
    const productId = req.params.id;
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Endpoint para deletar um produto'
    // #swagger.description = 'Endpoint para remover um produto do sistema.'
    await new ProductService().delete(productId);
    res.status(204).send();
  }
}