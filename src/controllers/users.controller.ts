import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";

type User = {
  id: number;
  nome: string;
  email: string;
};

export class UsersController {
  static async getAll(req: Request, res: Response) {
    const snapshot = await getFirestore().collection('users').get();
    const users = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    })
    res.send(users);
  }

  static async getById(req: Request, res: Response) {
    const userId = req.params.id;
    const doc = await getFirestore().collection('users').doc(userId).get();
    
    res.send({
      id: doc.id,
      ...doc.data()
    });
  }

  static async save(req: Request, res: Response) {
    const user = req.body;
    const userSaved = await getFirestore().collection('users').add(user);
    res.send({ message: `Usuário ${userSaved} adicionado com sucesso!` });
  }

  static async update(req: Request, res: Response) {
    const userId = req.params.id;
    const updatedUser = req.body as User;

    await getFirestore().collection('users').doc(userId).set(updatedUser, { merge: true });
    
    res.send({ message: "Usuário atualizado com sucesso!" });
  }

  static async delete(req: Request, res: Response) {
    const userId = req.params.id;
    
    await getFirestore().collection('users').doc(userId).delete();
    
    res.send({ message: "Usuário deletado com sucesso!" });
  }
}