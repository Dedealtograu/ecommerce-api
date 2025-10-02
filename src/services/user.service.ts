import { getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model";
import { NotFoundError } from "../errors/not-found.error";

export class UserService {
  async getAll(): Promise<User[]> {
    const snapshot = await getFirestore().collection('users').get();
    return snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      } as unknown as User;
    });
  }

  async getById(id: string): Promise<User | null> {
    const doc = await getFirestore().collection('users').doc(id).get();
    if (doc.exists) {
      return {
        id: doc.id,
        ...doc.data()
      } as unknown as User;
    } else {
      throw new NotFoundError("Usuário não encontrado");
    }
  }

  async save(user: User): Promise<void> {
    await getFirestore().collection('users').add(user);
  }

  async update(id: string, user: Omit<User, 'id'>): Promise<void> {
    const docRef = getFirestore().collection('users').doc(id);
    if ((await docRef.get()).exists) {
      await docRef.set(user);
    } else {
      throw new NotFoundError("Usuário não encontrado");
    }
  }

  async delete(id: string): Promise<void> {
    const docRef = getFirestore().collection('users').doc(id);
    if ((await docRef.get()).exists) {
      await docRef.delete();
    } else {
      throw new NotFoundError("Usuário não encontrado");
    }
  }
}