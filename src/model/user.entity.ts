import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // Add optional columns if needed
  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  createdAt: Date = new Date();

  // Hash password before saving
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
