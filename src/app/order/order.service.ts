import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../model/order.entity';
import { Product } from '../../model/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const product = await this.productRepo.findOne({
      where: { id: orderData.product.id },
    });

    if (!product) {
      throw new Error('Product does not exist');
    }

    if (product.stock < orderData.quantity) {
      throw new Error('Product out of stock');
    }

    product.stock -= orderData.quantity;
    await this.productRepo.save(product);

    const order = this.orderRepo.create(orderData);
    return this.orderRepo.save(order);
  }

  findOne(id: number) {
    return this.orderRepo.findOne({ where: { id: id } });
  }

  findAll() {
    return this.orderRepo.find();
  }

  async updateOrder(id: number, updatedData: Partial<Order>): Promise<Order> {
    // Retrieve the existing order
    const existingOrder = await this.orderRepo.findOne({
      where: { id },
      relations: ['product'],
    });
    if (!existingOrder) throw new Error('Order not found');

    // Retrieve the current product
    const currentProduct = await this.productRepo.findOne({
      where: { id: existingOrder.product.id },
    });
    if (!currentProduct) throw new Error('Current product not found');

    // Adjust stock of the existing product
    currentProduct.stock += existingOrder.quantity;

    // Check if the product has changed
    if (
      updatedData.product &&
      updatedData.product.id !== existingOrder.product.id
    ) {
      // Restore stock to the previous product
      await this.productRepo.save(currentProduct);

      // Find the new product and reduce stock
      const newProduct = await this.productRepo.findOne({
        where: { id: updatedData.product.id },
      });
      if (!newProduct) throw new Error('New product does not exist');
      if (newProduct.stock < (updatedData.quantity || existingOrder.quantity)) {
        throw new Error('New product out of stock');
      }

      newProduct.stock -= updatedData.quantity || existingOrder.quantity;
      await this.productRepo.save(newProduct);
      existingOrder.product = newProduct;
    } else {
      // If product is the same, update stock based on quantity difference
      const quantityDifference =
        (updatedData.quantity || existingOrder.quantity) -
        existingOrder.quantity;
      if (currentProduct.stock < quantityDifference) {
        throw new Error('Insufficient stock for this quantity update');
      }
      currentProduct.stock -= quantityDifference;
      await this.productRepo.save(currentProduct);
    }

    // Update the order with new data
    Object.assign(existingOrder, updatedData);
    return this.orderRepo.save(existingOrder);
  }

  async deleteOrder(id: number) {
    const order = await this.orderRepo.findOne({ where: { id: id } });
    if (order) {
      const product = await this.productRepo.findOne({
        where: { id: order.product.id },
      });
      product.stock += order.quantity;
      await this.productRepo.save(product);
      await this.orderRepo.remove(order);
    }
  }
}
