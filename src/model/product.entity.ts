import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int' })
  stock: number;

  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];
}
