import { NotFoundError } from "../errors/not-found.error.js";
import { Order, OrderStatus, QueryParamsOrder } from "../models/order.model.js";
import { OrderRepository } from "../repositories/order.repository.js";
import { CompanyRepository } from "../repositories/company.repository.js";
import { PaymentMethodRepository } from "../repositories/payment-method.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";
import { OrderItem } from "../models/order-item.model.js";

export class OrderService {
  private orderRepository: OrderRepository;
  private companyRepository: CompanyRepository;
  private paymentMethodRepository: PaymentMethodRepository;
  private productRepository: ProductRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.companyRepository = new CompanyRepository();
    this.paymentMethodRepository = new PaymentMethodRepository();
    this.productRepository = new ProductRepository();
  }

  async save(order: Order) {
    const company = await this.companyRepository.getById(order.empresa.id!);

    if (!company) {
      throw new NotFoundError("Empresa não encontrada");
    }
    order.empresa = company;

    const paymentMethod = await this.paymentMethodRepository.getById(order.formaPagamento.id!);

    if (!paymentMethod) {
      throw new NotFoundError("Forma de pagamento não encontrada");
    }
    order.formaPagamento = paymentMethod;

    for (let item of order.itens!) {
      const product = await this.productRepository.getById(item.produto.id!); 

      if (!product) {
        throw new NotFoundError("Produto não encontrado");
      }
      item.produto = product;
    }

    await this.orderRepository.save(order);
  }

  async search(query: QueryParamsOrder): Promise<Order[]> {
     return this.orderRepository.search(query);
  }

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    return this.orderRepository.getOrderItems(orderId);
  }

  async getById(orderId: string): Promise<Order> {
    return this.orderRepository.getById(orderId);
  }

  async changeStatus(orderId: string, status: OrderStatus) {
    await this.orderRepository.changeStatus(orderId, status);
  }
}