import { Request, Response } from "express";
import { CompanyService } from "../services/company.service.js";

export class CompaniesController {
  static async getAll(req: Request, res: Response) {
    res.send(await new CompanyService().getAll());
  }

  static async getById(req: Request, res: Response) {
    const companyId = req.params.id;
    res.send(await new CompanyService().getById(companyId));
  }

  static async save(req: Request, res: Response) {
    await new CompanyService().save(req.body);
    res.status(201).send({ message: "Empresa adicionada com sucesso!" });
  }

  static async update(req: Request, res: Response) {
    const companyId = req.params.id;
    const company = req.body;

    await new CompanyService().update(companyId, company);
    res.send({ message: "Empresa atualizada com sucesso!" });
  }
}