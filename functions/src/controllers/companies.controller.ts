import { Request, Response } from "express";
import { CompanyService } from "../services/company.service.js";

export class CompaniesController {
  static async getAll(req: Request, res: Response) {
    // #swagger.tags = ['Companies']
    // #swagger.summary = 'Endpoint para listar todas as empresas'
    // #swagger.description = 'Endpoint para obter uma lista de todas as empresas cadastradas no sistema.'
    res.send(await new CompanyService().getAll());
  }

  static async getById(req: Request, res: Response) {
    // #swagger.tags = ['Companies']    
    // #swagger.summary = 'Endpoint para obter uma empresa pelo id'
    // #swagger.description = 'Endpoint para obter os detalhes de uma empresa especifica usando seu ID.'
    const companyId = req.params.id;
    res.send(await new CompanyService().getById(companyId));
  }

  static async save(req: Request, res: Response) {
    // #swagger.tags = ['Companies']
    // #swagger.summary = 'Endpoint para adicionar uma nova empresa'
    // #swagger.description = 'Endpoint para criar uma nova empresa no sistema.'
    /*
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/addCompany"
            }  
          }
        }
      }
    */
    await new CompanyService().save(req.body);
    res.status(201).send({ message: "Empresa adicionada com sucesso!" });
  }

  static async update(req: Request, res: Response) {
    // #swagger.tags = ['Companies']
    // #swagger.summary = 'Endpoint para atualizar uma empresa existente'
    // #swagger.description = 'Endpoint para atualizar os detalhes de uma empresa existente no sistema.'
    /*
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/updateCompany"
            }  
          }
        }
      }
    */
    const companyId = req.params.id;
    const company = req.body;

    await new CompanyService().update(companyId, company);
    res.send({ message: "Empresa atualizada com sucesso!" });
  }
}