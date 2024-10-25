import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  // Maintain relationship with Product entity
  @ManyToOne(() => Product, (product) => product.orders)
  @JoinColumn({ name: 'productId' }) // Explicitly define the join column
  product: Product;

  @Column({ type: 'int' })
  quantity: number;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
    default: 'Pending',
  })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateOrdered: Date;
}
