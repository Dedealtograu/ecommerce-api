import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";

type User = {
  id: number;
  nome: string;
  email: string;
};

export class UsersController {
  static async getAll(req: Request, res: Response) {
    try {
      const snapshot = await getFirestore().collection('users').get();
      const users = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      })
      res.send(users);
    } catch {
      res.status(500).send({ message: "Erro interno do servidor" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const doc = await getFirestore().collection('users').doc(userId).get();
      
      res.send({
        id: doc.id,
        ...doc.data()
      });
    } catch {
      res.status(500).send({ message: "Erro interno do servidor" });
    }
  }

  static async save(req: Request, res: Response) {
    try {
      const user = req.body;
      const userSaved = await getFirestore().collection('users').add(user);
      res.status(201).send({ message: `Usuário ${userSaved} adicionado com sucesso!` });
    } catch {
      res.status(500).send({ message: "Erro interno do servidor" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const updatedUser = req.body as User;

      await getFirestore().collection('users').doc(userId).set(updatedUser, { merge: true });
      
      res.send({ message: "Usuário atualizado com sucesso!" });
    } catch {
      res.status(500).send({ message: "Erro interno do servidor" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      
      await getFirestore().collection('users').doc(userId).delete();
      
      res.status(204).end();
    } catch {
      res.status(500).send({ message: "Erro interno do servidor" });
    }
  }
}