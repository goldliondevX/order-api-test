// src/order/order.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from 'src/model/order.entity';
import { Product } from 'src/model/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
