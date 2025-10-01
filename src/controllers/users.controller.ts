import { NextFunction, Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import { ValidationError } from "../errors/validation.error";
import { NotFoundError } from "../errors/not-found.error";

type User = {
  id: number;
  nome: string;
  email: string;
};

export class UsersController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    const snapshot = await getFirestore().collection('users').get();
    const users = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    })
    res.send(users);
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const doc = await getFirestore().collection('users').doc(userId).get();
    
    if (doc.exists) {
      res.send({
      id: doc.id,
      ...doc.data()
    });
    } else {
      throw new NotFoundError("Usuário não encontrado");
    }
  }

  static async save(req: Request, res: Response, next: NextFunction) {
    const user = req.body;

    if (!user.nome || user.nome.length === 0) {
      throw new ValidationError("O nome do usuário é obrigatório");
    }

    if (!user.email || user.email.length === 0) {
      throw new ValidationError("O email do usuário é obrigatório");
    }

    const userSaved = await getFirestore().collection('users').add(user);
    res.status(201).send({ message: `Usuário ${userSaved.id} adicionado com sucesso!` });
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const updatedUser = req.body as User;

    let docRef = getFirestore().collection('users').doc(userId);

    if ((await docRef.get()).exists) {
      await docRef.set({
        nome: updatedUser.nome,
        email: updatedUser.email
      });
      res.send({ message: "Usuário atualizado com sucesso!" });
    } else {
      throw new NotFoundError("Usuário não encontrado");
    } 
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    
    await getFirestore().collection('users').doc(userId).delete();
    
    res.status(204).end();
  
  }
}