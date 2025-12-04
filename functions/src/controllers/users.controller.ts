import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";

export class UsersController {
  static async getAll(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Endpoint para listar todos os usuários'
    // #swagger.description = 'Endpoint para obter uma lista de todos os usuários cadastrados no sistema.'
    /*
      #swagger.responses[200] = {
        description: 'Lista de todos os usuários',
        content: {
          "application/json": {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        }
      }
    */
    res.send(await new UserService().getAll());
  }

  static async getById(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Endpoint para obter um usuário pelo id'
    // #swagger.description = 'Endpoint para obter os detalhes de um usuário específico usando seu ID.'
    /*
      #swagger.responses[200] = {
        description: 'Dados do usuário',
        content: {
        "application/json": {
            schema: {
              $ref: '#/components/schemas/User'
            }
          }
        }
      }
    */
    const userId = req.params.id;
    res.send(await new UserService().getById(userId));
  }

  static async save(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Endpoint para adicionar um novo usuário'
    // #swagger.description = 'Endpoint para criar um novo usuário no sistema.'
    /*
      #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/addUser"
            }  
          }
        }
      } 
    */
    await new UserService().save(req.body);
    res.status(201).send({ message: "Usuário adicionado com sucesso!" });
  }

  static async update(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Endpoint para atualizar um usuário existente'
    // #swagger.description = 'Endpoint para atualizar os detalhes de um usuário existente no sistema.'
    /*
      #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/updateUser"
            }  
          }
        }
      } 
    */
    const userId = req.params.id;
    const user = req.body;

    await new UserService().update(userId, user);
    res.send({ message: "Usuário atualizado com sucesso!" });
  }

  static async delete(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Endpoint para deletar um usuário'
    // #swagger.description = 'Endpoint para remover um usuário do sistema.'
    const userId = req.params.id;
    
    await new UserService().delete(userId);
    
    res.status(204).end();
  }
}