import { Joi } from "celebrate";
import { Category } from "./category.model.js";

export type Product = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: Category;
  ativo: boolean;
}

export const productSchema = Joi.object().keys({
  nome: Joi.string().min(3).required(),
  descricao: Joi.string().allow(null).default(null),
  preco: Joi.number().positive().required(),
  imagem: Joi.string().base64().allow(null).default(null),
  categoria: Joi.object().keys({
    id: Joi.string().required()
  }).required(),
  ativo: Joi.boolean().only().allow(true).default(true)
})

export const updateProductSchema = Joi.object().keys({
  nome: Joi.string().min(3).optional(),
  descricao: Joi.string().allow(null).default(null),
  preco: Joi.number().positive().optional(),
  imagem: Joi.alternatives().try(
    Joi.string().base64().required(),
    Joi.string().uri().required()
  ).allow(null).default(null),
  categoria: Joi.object().keys({
    id: Joi.string().optional()
  }).optional(),
  ativo: Joi.boolean().default(true).optional()
});

export const searchQuerySchema = Joi.object().keys({
  categoryId: Joi.string().required()
});