import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Order, orderConverter, OrderStatus, QueryParamsOrder } from "../models/order.model.js";
import dayjs from "dayjs";
import { OrderItem, orderItemConverter } from "../models/order-item.model.js";
import { NotFoundError } from "../errors/not-found.error.js";

export class OrderRepository {
  private collection: CollectionReference<Order>;

  constructor() {
    this.collection = getFirestore().collection("orders").withConverter(orderConverter);
  }

  async save(order: Order) {

    const batch = getFirestore().batch();
    const orderRef = this.collection.doc();
    batch.create(orderRef, order);

    const itemsRef = orderRef.collection("items").withConverter(orderItemConverter);
    for (let item of order.itens!) {
      batch.create(itemsRef.doc(), item);
    }

    await batch.commit();

    // const orderRef = await this.collection.add(order);

    // for (let item of order.itens) {
    //   await orderRef.collection("items")
    //   .withConverter(orderItemConverter)
    //   .add(item);
    // }
  }

  async search(queryPrams: QueryParamsOrder): Promise<Order[]> {
    let query: FirebaseFirestore.Query<Order> = this.collection;

    if (queryPrams.empresaId) {
      query = query.where("empresa.id", "==", queryPrams.empresaId);
    }

    if (queryPrams.dataInicio) {
      console.log(`data inicio: ${queryPrams.dataInicio}`);
      queryPrams.dataInicio = dayjs(queryPrams.dataInicio).add(1, "day").startOf("day").toDate();
      console.log(`data inicio: ${queryPrams.dataInicio}`);
      query = query.where("data", ">=", queryPrams.dataInicio);
    }

    if (queryPrams.dataFim) {
      console.log(`data fim: ${queryPrams.dataFim}`);
      queryPrams.dataFim = dayjs(queryPrams.dataFim).add(1, "day").endOf("day").toDate();
      console.log(`data fim: ${queryPrams.dataFim}`);
      query = query.where("data", "<=", queryPrams.dataFim);
    }

    if (queryPrams.status) {
      query = query.where("status", "==", queryPrams.status);
    }

    const snapshot = await query.get();
    return snapshot.docs.map(doc => {
      return doc.data();
    });
  }

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    const orderRef = this.collection.doc(orderId);
    const snapshot = await orderRef.collection("items")
      .withConverter(orderItemConverter)
      .get();
    return snapshot.docs.map(doc => doc.data());
  }

  async getById(orderId: string): Promise<Order> {
    const order = (await this.collection.doc(orderId).get()).data();
    if (!order) {
      throw new NotFoundError("Pedido não encontrado");
    }
    order.itens = await this.getOrderItems(orderId);
    return order;
  }

  async changeStatus(orderId: string, status: OrderStatus) {
    await this.collection.withConverter(null).doc(orderId).set({ status: status }, { merge: true });
  }
}