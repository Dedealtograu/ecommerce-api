import { Joi } from "celebrate";

export type PaymentMethod = {
  id: string;
  descricao: string;
  ativo: boolean;
}

export const paymentMethodSchema = Joi.object().keys({
  descricao: Joi.string().trim().min(3).required(),
  ativo: Joi.boolean().only().allow(true).default(true),
});

export const updatePaymentMethodSchema = Joi.object().keys({
  descricao: Joi.string().trim().min(3).required(),
  ativo: Joi.boolean().required(),
});