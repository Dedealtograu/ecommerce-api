import { Joi } from "celebrate";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";

export class PaymentMethod {
  id: string;
  descricao: string;
  ativo: boolean;

  constructor(data: PaymentMethod | any) {
    this.id = data.id;
    this.descricao = data.descricao;
    this.ativo = data.ativo ?? true;
  }
}

export const paymentMethodSchema = Joi.object().keys({
  descricao: Joi.string().trim().min(3).required(),
  ativo: Joi.boolean().only().allow(true).default(true),
});

export const updatePaymentMethodSchema = Joi.object().keys({
  descricao: Joi.string().trim().min(3).required(),
  ativo: Joi.boolean().required(),
});

export const paymentMethodConverter: FirestoreDataConverter<PaymentMethod> = {
  toFirestore(paymentMethod: PaymentMethod): DocumentData {
    return {
      descricao: paymentMethod.descricao,
      ativo: paymentMethod.ativo,
    };
  },

  fromFirestore(snapshot: QueryDocumentSnapshot): PaymentMethod {
    return new PaymentMethod({
      id: snapshot.id,
      ...snapshot.data()
    });
  }
}