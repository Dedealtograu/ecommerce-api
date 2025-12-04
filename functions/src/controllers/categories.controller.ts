import { Request, Response } from "express";
import { Category } from "../models/category.model.js";
import { CategoryService } from "../services/category.service.js";

export class CategoriesController {
  static async getAll(req: Request, res: Response) {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Endpoint para listar todas as categorias'
    // #swagger.description = 'Endpoint para obter uma lista de todas as categorias cadastradas no sistema.'
    res.send(await new CategoryService().getAll());
  }

  static async getById(req: Request, res: Response) {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Endpoint para obter uma categoria pelo id'
    // #swagger.description = 'Endpoint para obter os detalhes de uma categoria específica usando seu ID.'
    const categoryId = req.params.id;
    res.send(await new CategoryService().getById(categoryId));
  }

  static async save(req: Request, res: Response) {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Endpoint para adicionar uma nova categoria'
    // #swagger.description = 'Endpoint para criar uma nova categoria no sistema.'
    /*
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/addCategory"
            }  
          }
        }
      }
    */
    await new CategoryService().save(req.body);
    res.status(201).json({ message: "Categoria criada com sucesso" });
  }

  static async update(req: Request, res: Response) {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Endpoint para atualizar uma categoria existente'
    // #swagger.description = 'Endpoint para atualizar os detalhes de uma categoria existente no sistema.'
    /*
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/updateCategory"
            }  
          }
        }
      }
    */
    const categoryId = req.params.id;
    const category = req.body as Category;

    await new CategoryService().update(categoryId, category);

    res.json({ message: "Categoria atualizada com sucesso" });
  }

  static async delete(req: Request, res: Response) {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Endpoint para deletar uma categoria'
    // #swagger.description = 'Endpoint para remover uma categoria do sistema.'
    const categoryId = req.params.id;
    await new CategoryService().delete(categoryId );
    res.status(204).send();
  }

}