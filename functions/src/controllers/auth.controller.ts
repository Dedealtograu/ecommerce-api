import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
  static async login(req: Request, res: Response) {
    // #swagger.tags = ['Auth']
    // #swagger.summary = 'Endpoint para login de usuário administradores'
    // #swagger.description = 'Endpoint para autenticação de usuários administradores no sistema.'
    /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/login"
            }  
          }
        }
      }
      #swagger.responses[200] = {
        description: 'Token do usuário autenticado',
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                'token': {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    */
    const { email, password } = req.body;

    const userRecord = await new AuthService().login(email, password);
    const token = await userRecord.user.getIdToken();

    res.send({ token });
  }

  static async recovery(req: Request, res: Response) {
    // #swagger.tags = ['Auth']
    // #swagger.summary = 'Endpoint para recuperação de senha'
    // #swagger.description = 'Endpoint para iniciar o processo de recuperação de senha para usuários.'
    /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/recovery"
            }  
          }
        }
      }
    */
    const { email } = req.body;

    await new AuthService().recovery(email);

    res.status(204).send();
  }

  static async signin(req: Request, res: Response) {
    // #swagger.tags = ['Auth']
    // #swagger.summary = 'Endpoint para criação de usuário administradores'
    // #swagger.description = 'Endpoint para criar um novo usuário administrador no sistema.'
    /*
      #swagger.responses[200] = {
        description: 'Token do usuário anônimo',
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                'token': {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    */
    const userRecord = await new AuthService().signin();
    const token = await userRecord.user.getIdToken(true);
    res.send({ token });
  }
}
