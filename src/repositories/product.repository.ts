import { CollectionReference, getFirestore, QuerySnapshot } from "firebase-admin/firestore";
import { Product } from "../models/product.model.js";

export class ProductRepository {
  private collection: CollectionReference;

  constructor() {
    this.collection = getFirestore().collection('products');
  }

  async getAll(): Promise<Product[]> {
    const snapshot = await this.collection.get();
    return this.snapshotToArray(snapshot);
  }

  async search(categoryId: string): Promise<Product[]> {
    const snapshot = await this.collection.where("categoria.id", "==", categoryId).get();
    return this.snapshotToArray(snapshot);
  }

  async getById(id: string): Promise<Product | null> {
    const doc = await this.collection.doc(id).get();
    if (doc.exists) {
      return {
        id: doc.id,
        ...doc.data()
      } as Product;
    } else {
      return null;
    }
  }

  async save(product: Product) {
    await this.collection.add(product);
  }

  async update(product: Product) {
    const docRef = this.collection.doc(product.id!);
    await docRef.set({
      nome: product.nome,
      descricao: product.descricao,
      preco: product.preco,
      imagem: product.imagem,
      categoria: product.categoria,
      ativo: product.ativo,
    });
  }

  async delete(id: string) {
    await this.collection.doc(id).delete();
  }

  private snapshotToArray(snapshot: QuerySnapshot): Product[] {
    return snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    }) as Product[];
  }

  async getCountByCategory(categoryId: string): Promise<number> {
    const countSnapshot = await this.collection.where("categoria.id", "==", categoryId).count().get();
    return countSnapshot.data().count;
  }
}