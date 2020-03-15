import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../categories/categories.entity'

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => Category)
  @JoinTable()
  categories: Category[];

  @Column({ default: false })
  isOpen: boolean;

  @Column({ default: false })
  isActive: boolean;
}