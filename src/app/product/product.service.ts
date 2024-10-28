import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../model/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  // Create a new product
  async createProduct(productData: Partial<Product>): Promise<Product> {
    console.log(productData);
    const product = this.productRepo.create(productData);
    return this.productRepo.save(product);
  }

  // Get a single product by ID
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  // Get products by Name
  async findByName(name: string): Promise<Product[]> {
    const product = await this.productRepo.find({ where: { name: name } });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  // Get all products
  async findAll(): Promise<Product[]> {
    return this.productRepo.find();
  }

  // Update a product by ID
  async updateProduct(
    id: number,
    updatedData: Partial<Product>,
  ): Promise<Product> {
    const product = await this.findOne(id); // Reuse findOne method
    Object.assign(product, updatedData);
    return this.productRepo.save(product);
  }

  // Delete a product by ID
  async deleteProduct(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepo.remove(product);
  }
}
